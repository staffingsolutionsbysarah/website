# Make.com Setup Guide

This guide covers how to set up Make.com scenarios to receive data from the Sarah Fell website.

## Prerequisites

You need these environment variables configured in Vercel:

| Variable | Description |
|----------|-------------|
| `MAKE_WEBHOOK_CONTACT` | Webhook URL for contact form submissions |
| `MAKE_WEBHOOK_RESUME` | Webhook URL for resume submissions |
| `MAKE_WEBHOOK_TALENT_REQUEST` | Webhook URL for talent request form |
| `MAKE_WEBHOOK_CALENDLY` | Webhook URL for Cal.com booking events |
| `CAL_WEBHOOK_SECRET` | Secret from Cal.com webhook settings |

---

## 1. Creating Webhooks in Make.com

### Step 1: Create a New Scenario

1. Log in to [Make.com](https://make.com)
2. Click **Scenarios** → **Create a new scenario**
3. Search for **Webhooks** and select **Custom Webhook**

![Screenshot: Make.com scenario builder with Webhooks highlighted](./images/make-webhook-trigger.png)

### Step 2: Configure the Webhook

1. Click the webhook module to configure
2. Click **Add** to create a new webhook
3. Name it descriptively (e.g., `SF - Contact Form Webhook`)
4. Copy the generated webhook URL
5. Click **Save** and copy the URL to your clipboard

### Step 3: Connect to Vercel

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add the webhook URL with the corresponding variable name (see table above)
4. Redeploy the site to apply changes

---

## 2. Webhook Data Payloads

### Contact Form (`/api/contact`)

**Trigger:** Website visitor submits contact form

```json
{
  "kind": "contact",
  "receivedAt": "2026-04-16T10:30:00.000Z",
  "firstName": "John",
  "lastName": "Smith",
  "workEmail": "john@acmecorp.com",
  "company": "Acme Corp",
  "phone": "+1234567890",
  "message": "Interested in recruiting services for our engineering team.",
  "source": "website"
}
```

**Required fields:** `firstName`, `lastName`, `workEmail`, `message`

---

### Resume Submission (`/api/resume`)

**Trigger:** Candidate submits resume via Jobs page

```json
{
  "kind": "resume",
  "receivedAt": "2026-04-16T10:30:00.000Z",
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane.doe@email.com",
  "phone": "+1234567890",
  "location": "San Francisco, CA",
  "linkedinUrl": "https://linkedin.com/in/janedoe",
  "resumeUrl": "https://dropbox.com/s/abc123/resume.pdf",
  "targetRole": "Senior Product Manager",
  "notes": "Open to remote work",
  "source": "website"
}
```

**Required fields:** `firstName`, `lastName`, `email`

---

### Talent Request (`/api/talent-request`)

**Trigger:** Employer submits hiring request via Hire Talent page

```json
{
  "kind": "talent-request",
  "receivedAt": "2026-04-16T10:30:00.000Z",
  "companyName": "TechStart Inc",
  "contactName": "Mike Wilson",
  "workEmail": "mike@techstart.io",
  "phone": "+1234567890",
  "roleTitle": "Staff Software Engineer",
  "roleType": "Full-time",
  "timeline": "2-4 weeks",
  "budget": "$150k-$200k",
  "roleDescription": "Looking for experienced full-stack engineer...",
  "hiringNeeds": "2 engineers for AI team",
  "source": "website"
}
```

**Required fields:** `companyName`, `contactName`, `workEmail`, `roleTitle`

---

### Cal.com Bookings (`/api/webhooks/cal`)

**Trigger:** New booking, cancellation, confirmation, or reschedule

```json
{
  "kind": "cal-booking",
  "event": "BOOKING_CREATED",
  "receivedAt": "2026-04-16T10:30:00.000Z",
  "booking": {
    "id": "abc123def456",
    "title": "Intro Call with Sarah",
    "description": "Initial consultation",
    "startTime": "2026-04-18T14:00:00Z",
    "endTime": "2026-04-18T14:30:00Z",
    "eventType": "30min",
    "status": "ACCEPTED",
    "location": {
      "type": "video",
      "link": "https://cal.com/sarah-fell/abc123"
    },
    "meetingId": "abc123"
  },
  "attendee": {
    "name": "John Smith",
    "email": "john@acmecorp.com",
    "timeZone": "America/Los_Angeles"
  },
  "organizer": {
    "name": "Sarah Fell",
    "email": "sarah@staffingsolutions.com"
  }
}
```

**Supported events:** `BOOKING_CREATED`, `BOOKING_CANCELLED`, `BOOKING_CONFIRMED`, `BOOKING_REQUESTED`

---

## 3. Connecting to Notion

Create separate scenarios for employer leads and candidates.

### Scenario A: Employer Leads (Contact + Talent Request)

1. **Trigger:** Custom Webhook receiving `kind: "contact"` or `kind: "talent-request"`
2. **Filter:** Add a Router to branch based on `kind`

#### For Contact Form:
1. Add **Notion > Create a Page** module
2. Connect your Notion account
3. Select the **Employer Leads** database
4. Map fields:
   - Name: `{{firstName}} {{lastName}}`
   - Email: `{{workEmail}}`
   - Company: `{{company}}`
   - Phone: `{{phone}}`
   - Message: `{{message}}`
   - Source: `website`
   - Date Received: `{{receivedAt}}`
   - Status: `New`

#### For Talent Request:
1. Add another **Notion > Create a Page** branch
2. Select the **Employer Leads** database
3. Map fields:
   - Name: `{{contactName}}`
   - Company: `{{companyName}}`
   - Email: `{{workEmail}}`
   - Phone: `{{phone}}`
   - Role Title: `{{roleTitle}}`
   - Role Type: `{{roleType}}`
   - Timeline: `{{timeline}}`
   - Budget: `{{budget}}`
   - Description: `{{roleDescription}}`
   - Hiring Needs: `{{hiringNeeds}}`
   - Source: `website`
   - Status: `New`

![Screenshot: Notion database setup with columns for lead tracking](./images/notion-leads-database.png)

---

### Scenario B: Candidates (Resume Submissions)

1. **Trigger:** Custom Webhook receiving `kind: "resume"`
2. **Action:** Add **Notion > Create a Page** module
3. Select the **Candidates** database
4. Map fields:
   - Name: `{{firstName}} {{lastName}}`
   - Email: `{{email}}`
   - Phone: `{{phone}}`
   - Location: `{{location}}`
   - LinkedIn: `{{linkedinUrl}}`
   - Resume: `{{resumeUrl}}`
   - Target Role: `{{targetRole}}`
   - Notes: `{{notes}}`
   - Source: `website`
   - Status: `New`
   - Date Received: `{{receivedAt}}`

---

## 4. Creating Linear Tasks from Bookings

This creates a task in Linear when a new Cal.com booking is confirmed.

1. **Trigger:** Custom Webhook receiving `kind: "cal-booking"`
2. **Filter:** Add a filter to only proceed when `event = "BOOKING_CREATED"` or `"BOOKING_CONFIRMED"`

### Configure Linear Module:

1. Add **Linear > Create an Issue** module
2. Connect your Linear account
3. Configure:
   - **Team:** Select your team (e.g., `Sarah Fell Recruiting`)
   - **Project:** Select a project (e.g., `Client Outreach`)
   - **Title:** `Call with {{attendee.name}} - {{booking.title}}`
   - **Description:**
     ```
     ## Booking Details
     - **Date:** {{booking.startTime}}
     - **Attendee:** {{attendee.name}}
     - **Email:** {{attendee.email}}
     - **Time Zone:** {{attendee.timeZone}}
     - **Event Type:** {{booking.eventType}}
     - **Location:** {{booking.location.link}}

     ## Description
     {{booking.description}}
     ```
   - **Labels:** Add `meeting`, `follow-up`
   - **Due Date:** Set to `{{booking.startTime}}`
   - **Priority:** Medium

4. Click **OK** to save

![Screenshot: Linear issue creation in Make.com](./images/linear-task-setup.png)

---

## 5. Setting Up Email Notifications

### Option A: Email via Make.com (Simple)

1. Add **Email > Send an Email** module after your Notion/Linear modules
2. Configure:
   - **From:** Your Make.com registered email
   - **To:** `sarah@staffingsolutions.com`
   - **Subject:** `[{{kind}}] New submission from {{firstName}} {{lastName}}`
   - **Content:** Map all relevant fields from the webhook payload

### Option B: Gmail Integration (Recommended)

1. Add **Gmail > Send Email** module
2. Connect your Google account
3. Configure with rich formatting:

```text
Subject: New {{kind}} Submission - {{firstName}} {{lastName}}

Hi Sarah,

You received a new {{kind}} submission:

---
{{#if firstName}}Name: {{firstName}} {{lastName}}{{/if}}
{{#if workEmail}}Email: {{workEmail}}{{/if}}
{{#if company}}Company: {{company}}{{/if}}
{{#if message}}Message: {{message}}{{/if}}
{{#if targetRole}}Target Role: {{targetRole}}{{/if}}
---

Submitted: {{receivedAt}}
Source: Website
```

### Option C: Slack Notifications

1. Add **Slack > Send a Message** module
2. Configure:
   - **Webhook:** Your Slack incoming webhook URL
   - **Channel:** `#leads` or `#submissions`
   - **Text:** Format as rich message with blocks

```json
{
  "blocks": [
    {
      "type": "header",
      "text": { "type": "plain_text", "text": "New {{kind}} Submission" }
    },
    {
      "type": "section",
      "fields": [
        { "type": "mrkdwn", "text": "*Name:*\n{{firstName}} {{lastName}}" },
        { "type": "mrkdwn", "text": "*Email:*\n{{workEmail}}" }
      ]
    }
  ]
}
```

---

## 6. Complete Scenario Example

Here's one recommended setup for processing all webhooks:

```
[Webhook] → [Router by kind] → [Notion Create] → [Gmail Send]
                                    ↘ [Linear Create Issue] (if cal-booking)
                                    ↘ [Slack Notify] (if talent-request)
```

### Router Configuration:

| Route | Condition | Actions |
|-------|-----------|---------|
| Contact | `kind = "contact"` | Notion + Email |
| Resume | `kind = "resume"` | Notion + Email |
| Talent Request | `kind = "talent-request"` | Notion + Email + Slack |
| Cal Booking | `kind = "cal-booking"` | Linear + Email |

---

## 7. Testing Your Webhooks

### Test Mode in Make.com

1. Open your scenario in Make.com
2. Click the **Webhooks** module
3. Click **Debug** to enter test mode
4. Submit a form on the website
5. Verify data flows through all modules

### Testing from the Website

1. Ensure webhooks are configured in Vercel
2. Submit test data through each form
3. Check Make.com execution history for errors
4. Verify data appears in Notion/Linear

---

## 8. Troubleshooting

| Issue | Solution |
|-------|----------|
| Webhook not triggering | Verify environment variable is set in Vercel |
| 401 error on Cal.com | Ensure `CAL_WEBHOOK_SECRET` matches Cal.com settings |
| Notion create failing | Check database ID and column names match |
| Missing data in payload | Verify form fields are not empty (required fields) |

---

## Quick Reference

| Form | API Endpoint | Kind | Notion Database |
|------|--------------|------|-----------------|
| Contact | `/api/contact` | `contact` | Employer Leads |
| Resume | `/api/resume` | `resume` | Candidates |
| Hire Talent | `/api/talent-request` | `talent-request` | Employer Leads |
| Cal.com | `/api/webhooks/cal` | `cal-booking` | N/A (Linear tasks) |