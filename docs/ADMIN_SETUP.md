# Sarah Fell Website - Admin Setup Guide

## Overview

This document covers all integrations you'll need to set up and manage for the Sarah Fell website.

---

## Quick Start

### 1. Clone the repo
```bash
git clone https://github.com/staffingsolutionsbysarah/website.git
cd website
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp .env.example .env.local
# Edit .env.local with your credentials (see below)
```

### 4. Start development
```bash
npm run dev
```

---

## Environment Variables

### Make.com Webhooks
Get these from your Make.com account > Scenario > Webhook settings.

```
MAKE_WEBHOOK_CONTACT=https://hook.eu1.make.com/YOUR_CONTACT_ID
MAKE_WEBHOOK_RESUME=https://hook.eu1.make.com/YOUR_RESUME_ID
MAKE_WEBHOOK_TALENT_REQUEST=https://hook.eu1.make.com/YOUR_TALENT_ID
MAKE_WEBHOOK_CALENDLY=https://hook.eu1.make.com/YOUR_CALENDLY_ID
```

### Cal.com
Get webhook secret from Cal.com > Settings > Webhooks.

```
CAL_WEBHOOK_SECRET=your_cal_webhook_secret
```

### PocketBase (Optional - for local development)
```
POCKETBASE_URL=http://127.0.0.1:8090
POCKETBASE_ADMIN_EMAIL=admin@sarahfell.com
POCKETBASE_ADMIN_PASSWORD=your_password
```

### Linear (Optional - for candidate tracking)
Get API key from Linear > Settings > API.

```
LINEAR_API_KEY=lin_api_xxxxx
LINEAR_TEAM_ID=team_xxxxx
```

---

## Make.com Setup

### Import Scenarios

1. Go to [Make.com](https://make.com)
2. Create a new scenario
3. Click the first module > "Choose from the list of apps" > "Import a scenario from JSON"
4. Import from `docs/make-com/*.json`

### Scenario Files

| File | Purpose |
|------|---------|
| `contact-intake.json` | Contact form → Notion |
| `resume-intake.json` | Resume submission → Notion + email |
| `talent-request-intake.json` | Talent request → Notion |
| `booking-created.json` | Cal.com booking → Linear + Notion |

### Required Connections

After importing, you'll need to set up:
1. **Webhook** - Click "Add" to create a new webhook URL
2. **Notion** - Connect your Notion account and select databases
3. **Gmail/Email** - Connect email for notifications

### Replace Placeholders

In each scenario JSON, search for placeholders and replace:
- `YOUR_NOTION_CONNECTION_ID` - Your Notion connection
- `YOUR_DATABASE_ID` - Notion database IDs
- `YOUR_EMAIL_CONNECTION` - Email connection

---

## Cal.com Webhook Setup

1. Go to Cal.com > Settings > Webhooks
2. Click "Add Webhook"
3. Set URL: `https://YOUR_SITE.com/api/webhooks/cal`
4. Add triggers:
   - `BOOKING_CREATED`
   - `BOOKING_CANCELLED`
   - `BOOKING_CONFIRMED`
5. Copy the signing key to `CAL_WEBHOOK_SECRET`

---

## PocketBase Setup (Optional)

For local development with the database:

```bash
cd docs
./pocketbase-setup.sh
```

This will:
- Download PocketBase
- Start the server on port 8090
- Create admin account
- Set up all collections

Admin UI: http://127.0.0.1:8090/_/

---

## Common Room Setup (Optional)

For lead intelligence tracking:

1. Go to [Common Room](https://commonroom.io)
2. Create workspace
3. Get API key from Settings > Integrations > API
4. Add to environment: `COMMONROOM_API_KEY=xxx`

---

## Vercel Deployment

1. Connect repo to Vercel
2. Add all environment variables in Vercel dashboard
3. Deploy

---

## Troubleshooting

### Forms not submitting
- Check browser console for errors
- Verify Make.com webhook URLs are correct
- Test webhooks with Make.com's "Run once" feature

### Cal.com webhooks not working
- Verify webhook URL is publicly accessible
- Check webhook secret matches exactly
- Check Cal.com webhook logs

### Build errors
- Run `npm run build` locally
- Check TypeScript errors: `npm run typecheck`

---

## Support

For issues, check:
- Vercel logs
- Make.com scenario execution history
- Cal.com webhook logs
- PocketBase logs (if running locally)
