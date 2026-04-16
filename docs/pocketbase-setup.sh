#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PB_DIR="$SCRIPT_DIR/pocketbase"
PB_BINARY="$PB_DIR/pocketbase"
PB_DATA="$PB_DIR/pb_data"
SCHEMA_FILE="$SCRIPT_DIR/pocketbase-schema.json"
ADMIN_EMAIL="admin@sarahfell.com"
ADMIN_PASSWORD="SarahFell2026!"

echo "============================================"
echo "  PocketBase Setup Script for Sarah Fell"
echo "============================================"
echo ""

# Step 1: Check if PocketBase is already downloaded
if [ -f "$PB_BINARY" ]; then
    echo "[1/5] PocketBase binary already exists, skipping download."
else
    # Step 1: Download PocketBase for macOS
    echo "[1/5] Downloading PocketBase for macOS..."
    
    # Get the latest version URL
    PB_VERSION=$(curl -s https://api.github.com/repos/pocketbase/pocketbase/releases/latest | grep -o '"tag_name": "v[^"]*' | cut -d'"' -f4)
    DOWNLOAD_URL="https://github.com/pocketbase/pocketbase/releases/download/${PB_VERSION}/pocketbase_${PB_VERSION#v}_darwin_amd64.zip"
    
    # Download and extract
    TEMP_ZIP="/tmp/pocketbase.zip"
    curl -L -o "$TEMP_ZIP" "$DOWNLOAD_URL"
    unzip -o "$TEMP_ZIP" -d "$PB_DIR"
    rm "$TEMP_ZIP"
    
    # Make executable
    chmod +x "$PB_BINARY"
    echo "    Downloaded PocketBase $PB_VERSION"
fi

# Step 2: Initialize PocketBase data directory
echo "[2/5] Initializing PocketBase data directory..."
mkdir -p "$PB_DATA"

# Step 3: Start PocketBase server in background
echo "[3/5] Starting PocketBase server..."
if pgrep -f "pocketbase serve" > /dev/null; then
    echo "    PocketBase is already running."
else
    "$PB_BINARY" serve --http="127.0.0.1:8090" --dir="$PB_DATA" &
    PB_PID=$!
    echo "    PocketBase started with PID $PB_PID"
    
    # Wait for server to be ready
    echo "    Waiting for server to be ready..."
    for i in {1..30}; do
        if curl -s http://127.0.0.1:8090/api/health > /dev/null 2>&1; then
            echo "    Server is ready!"
            break
        fi
        sleep 1
    done
fi

# Step 4: Create admin account
echo "[4/5] Creating admin account..."
ADMIN_RESPONSE=$(curl -s -X POST http://127.0.0.1:8090/api/admins \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"$ADMIN_EMAIL\",\"password\":\"$ADMIN_PASSWORD\",\"passwordConfirm\":\"$ADMIN_PASSWORD\"}" || true)

if echo "$ADMIN_RESPONSE" | grep -q "id"; then
    echo "    Admin account created successfully."
else
    # Check if admin already exists
    ADMIN_CHECK=$(curl -s -X POST http://127.0.0.1:8090/api/admins/auth-with-password \
        -H "Content-Type: application/json" \
        -d "{\"identity\":\"$ADMIN_EMAIL\",\"password\":\"$ADMIN_PASSWORD\"}" || true)
    
    if echo "$ADMIN_CHECK" | grep -q "token"; then
        echo "    Admin account already exists."
    else
        echo "    Could not create admin account: $ADMIN_RESPONSE"
    fi
fi

# Get admin token for API calls
ADMIN_TOKEN=$(curl -s -X POST http://127.0.0.1:8090/api/admins/auth-with-password \
    -H "Content-Type: application/json" \
    -d "{\"identity\":\"$ADMIN_EMAIL\",\"password\":\"$ADMIN_PASSWORD\"}" | grep -o '"token":"[^"]*' | cut -d'"' -f4)

# Step 5: Import collections from schema
echo "[5/5] Importing collections from schema..."

if [ -f "$SCHEMA_FILE" ]; then
    # Import collections via PocketBase admin API
    # First, we need to get collection IDs to replace placeholders in relations
    
    # Create collections one by one
    COLLECTIONS=$(cat "$SCHEMA_FILE" | grep -o '"name": "[^"]*"' | cut -d'"' -f4 | tail -n +2)
    
    for COLLECTION in $COLLECTIONS; do
        echo "    Creating collection: $COLLECTION"
        
        # Extract fields for this collection from schema
        COLLECTION_DATA=$(cat "$SCHEMA_FILE" | jq ".collections[] | select(.name == \"$COLLECTION\")")
        FIELDS=$(echo "$COLLECTION_DATA" | jq -c '.fields')
        
        # Create collection via API
        curl -s -X POST "http://127.0.0.1:8090/api/collections" \
            -H "Content-Type: application/json" \
            -H "Authorization: $ADMIN_TOKEN" \
            -d "{\"name\":\"$COLLECTION\",\"type\":\"base\",\"system\":false}" > /dev/null || true
    done
    
    # Now add fields to each collection
    for COLLECTION in $COLLECTIONS; do
        COLLECTION_DATA=$(cat "$SCHEMA_FILE" | jq ".collections[] | select(.name == \"$COLLECTION\")")
        FIELDS=$(echo "$COLLECTION_DATA" | jq '.fields')
        
        # Get the collection ID
        COLLECTION_ID=$(curl -s "http://127.0.0.1:8090/api/collections" \
            -H "Authorization: $ADMIN_TOKEN" | jq -r ".list[] | select(.name == \"$COLLECTION\") | .id")
        
        if [ -n "$COLLECTION_ID" ] && [ "$COLLECTION_ID" != "null" ]; then
            # Add each field to the collection
            echo "$FIELDS" | jq -c '.[]' | while read FIELD; do
                FIELD_NAME=$(echo "$FIELD" | jq -r '.name')
                FIELD_TYPE=$(echo "$FIELD" | jq -r '.type')
                
                curl -s -X PATCH "http://127.0.0.1:8090/api/collections/$COLLECTION_ID" \
                    -H "Content-Type: application/json" \
                    -H "Authorization: $ADMIN_TOKEN" \
                    -d "{\"fields\":[$FIELD]}" > /dev/null || true
            done
            echo "    Configured fields for: $COLLECTION"
        fi
    done
    
    echo "    Collections imported successfully!"
else
    echo "    Warning: Schema file not found at $SCHEMA_FILE"
fi

echo ""
echo "============================================"
echo "  Setup Complete!"
echo "============================================"
echo ""
echo "PocketBase is running at: http://127.0.0.1:8090"
echo "Admin email: $ADMIN_EMAIL"
echo "Admin password: $ADMIN_PASSWORD"
echo ""
echo "To manage PocketBase, use these commands:"
echo ""
echo "  Start PocketBase:"
echo "    $PB_BINARY serve --http=127.0.0.1:8090 --dir=$PB_DATA &"
echo ""
echo "  Stop PocketBase:"
echo "    pkill -f 'pocketbase serve'"
echo ""
echo "  View logs:"
echo "    tail -f $PB_DATA/logs/app.log"
echo ""
echo "  Access Admin UI:"
echo "    http://127.0.0.1:8090/_/"
echo ""