# Make.com Scenario Import Guide

## Overview

This directory contains ready-to-import Make.com scenario configurations for automating your Sarah Fell staffing business workflows using **PocketBase** as the database.

## Files

| File | Description |
|------|-------------|
| `contact-intake.json` | Contact form → PocketBase leads |
| `resume-intake.json` | Resume submissions → PocketBase candidates + email |
| `talent-request-intake.json` | Talent requests → PocketBase + Linear tasks |
| `booking-created.json` | Cal.com bookings → PocketBase + Linear tasks |

## How to Import

1. **Open Make.com** and go to Scenarios
2. Click **"Import Blueprint"** in the top right
3. Select the JSON file you want to import
4. Configure the connections

## Required Configuration

### Placeholders to Replace

| Placeholder | Description |
|-------------|-------------|
| `YOUR_POCKETBASE_URL` | Your PocketBase URL (e.g., `https://pocketbase.yoursite.com`) |
| `YOUR_POCKETBASE_ADMIN_TOKEN` | PocketBase admin token |
| `YOUR_LINEAR_CONNECTION_ID` | Your Linear API connection |
| `YOUR_LINEAR_TEAM_ID` | Linear team ID |
| `YOUR_GMAIL_CONNECTION_ID` | Your Gmail OAuth connection |

## PocketBase Setup

Run the setup script first:

```bash
cd docs
./pocketbase-setup.sh
```

This creates all collections: `candidates`, `employer_leads`, `bookings`, `jobs`, `newsletter_subscribers`

### Finding PocketBase URL & Token

1. Start PocketBase: `./pocketbase serve`
2. Admin UI: http://127.0.0.1:8090/_/
3. Settings → API Tokens → Create new token
4. Copy URL (e.g., `http://127.0.0.1:8090`) and token

### Collection Schema

See `../pocketbase-schema.json` for full schema.

## Linear Setup

- **Team ID**: Linear Settings → Teams → Copy team ID
- **Create labels**: `intake`, `screening`, `sourced`, `interviewing`, `hired`, `archived`, `urgent`

## Webhook URLs

After importing, copy each webhook URL to your website `.env.local`:

```
MAKE_WEBHOOK_CONTACT=https://hook.make.com/YOUR_CONTACT_ID
MAKE_WEBHOOK_RESUME=https://hook.make.com/YOUR_RESUME_ID
MAKE_WEBHOOK_TALENT_REQUEST=https://hook.make.com/YOUR_TALENT_ID
MAKE_WEBHOOK_CALENDLY=https://hook.make.com/YOUR_CALENDLY_ID
```

## Testing

1. Configure all connections
2. Turn on the scenario
3. Submit a test form from your website
4. Check PocketBase for new records
5. Verify email notifications are sent
6. Check Linear for new tasks (if applicable)

## Support

- Make.com Documentation: https://help.make.com/
- PocketBase Docs: https://pocketbase.io/docs/
- Linear API: https://developers.linear.app/
