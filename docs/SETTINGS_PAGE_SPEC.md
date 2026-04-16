# Sarah Fell Website — Settings/Admin Page Specification

## Overview

This document defines the scope, structure, and implementation approach for an admin/settings interface for the Sarah Fell recruitment website.

**Current integration status:**
- Cal.com: SET UP (booking system configured)
- Make.com: NOT YET CONFIGURED (webhooks defined but empty)
- PocketBase: NOT YET SET UP (schema designed but not deployed)
- Linear: SET UP (issue tracking pipeline active)
- Common Room: Defined in env but not yet integrated

**Implementation approach:** This spec recommends a **hybrid approach**:
- Phase 1: Pure frontend settings page (UI for viewing/editing env vars stored in a JSON config file, with admin authentication)
- Phase 2: Backend admin API with PocketBase as the persistence layer for user-configurable settings

---

## Section 1: Booking Configuration (Cal.com)

### Purpose
Manage scheduling behavior and booking notifications.

### Fields

| Field Name | Env Variable | Type | Description |
|------------|--------------|------|-------------|
| Timezone | `BOOKING_TIMEZONE` | Select | Dropdown of IANA timezones (default: America/Toronto) |
| Slot Duration | `BOOKING_SLOT_MINUTES` | Number | Minutes per booking slot (default: 30) |
| Lead Time | `BOOKING_LEAD_HOURS` | Number | Hours before booking required (default: 24) |
| Lookahead | `BOOKING_LOOKAHEAD_DAYS` | Number | Days ahead bookings visible (default: 14) |
| Weekly Hours | `BOOKING_WEEKLY_HOURS` | Structured input | Day=HH:MM-HH:MM format per day |
| Blackout Dates | `BOOKING_BLACKOUT_DATES` | Date picker | Comma-separated ISO dates |
| Rate Limit Max | `BOOKING_RATE_LIMIT_MAX` | Number | Max bookings per window (default: 6) |
| Rate Limit Window | `BOOKING_RATE_LIMIT_WINDOW_MS` | Number | Window in ms (default: 600000 = 10 min) |
| Notification Email | `BOOKING_NOTIFICATION_TO` | Email | Receives booking alerts |
| From Email | `BOOKING_FROM_EMAIL` | Email | Sender for booking confirmations |
| Reply-to Email | `BOOKING_REPLY_TO_EMAIL` | Email | Reply-to for booking emails |
| Allow Log-Only Mode | `BOOKING_ALLOW_LOG_ONLY` | Toggle | When on, bookings are logged but not confirmed |

### UI Layout
```
┌─ Cal.com Booking Settings ──────────────────────────────────────┐
│ Timezone:           [America/Toronto                      ▼]     │
│ Slot Duration:      [30] minutes                              │
│ Minimum Lead Time:  [24] hours                                │
│ Show Available For: [14] days ahead                           │
│                                                                     │
│ Weekly Schedule:                                               │
│   MON [09:00] - [16:00]  □                                 │
│   TUE [09:00] - [16:00]  □                                 │
│   WED [09:00] - [16:00]  □                                 │
│   THU [09:00] - [16:00]  □                                 │
│   FRI [09:00] - [13:00]  □                                 │
│   SAT [ ] - [ ]          □                                 │
│   SUN [ ] - [ ]          □                                 │
│                                                                     │
│ Blackout Dates:  [Select dates...              ]                 │
│                                                                     │
│ Rate Limiting:                                               │
│   Max bookings: [6] per [10] minutes                         │
│                                                                     │
│ Notifications:                                                │
│   Send alerts to: [sarah.fell@staffingsolutionsbysarah.com  ] │
│   From email:    [                                  ]         │
│   Reply-to:      [                                  ]         │
│                                                                     │
│ □ Log-only mode (don't confirm bookings)                       │
└─────────────────────────────────────────────────────────────────┘
```

### Priority: HIGH (Phase 1)
Booking is the primary conversion point. Admin needs to adjust availability without redeploying.

---

## Section 2: Form Integrations (Make.com Webhooks)

### Purpose
Configure where form submissions are forwarded for automation processing.

### Fields

| Field Name | Env Variable | Type | Description |
|------------|--------------|------|-------------|
| Contact Form Webhook | `MAKE_WEBHOOK_CONTACT` | URL | Endpoint for contact form submissions |
| Resume Upload Webhook | `MAKE_WEBHOOK_RESUME` | URL | Endpoint for resume form submissions |
| Talent Request Webhook | `MAKE_WEBHOOK_TALENT_REQUEST` | URL | Endpoint for talent request submissions |
| Booking Events Webhook | `MAKE_WEBHOOK_CALENDLY` | URL | Endpoint for Cal.com booking events |

### UI Layout
```
┌─ Make.com Form Integrations ────────────────────────────────────┐
│ Status indicators: ● Connected  ○ Not configured  ⚠ Error     │
│                                                                     │
│ Contact Form:                                                   │
│   URL: [https://hook.eu1.make.com/xxxxxxx                   ]   │
│   Status: ○ Not configured                                     │
│   Test: [Send Test]                                              │
│                                                                     │
│ Resume Upload:                                                  │
│   URL: [https://hook.eu1.make.com/xxxxxxx                   ]   │
│   Status: ○ Not configured                                     │
│   Test: [Send Test]                                              │
│                                                                     │
│ Talent Request:                                                 │
│   URL: [https://hook.eu1.make.com/xxxxxxx                   ]   │
│   Status: ○ Not configured                                     │
│   Test: [Send Test]                                              │
│                                                                     │
│ Cal.com Bookings:                                               │
│   URL: [https://hook.eu1.make.com/xxxxxxx                   ]   │
│   Status: ○ Not configured                                     │
│   Test: [Send Test]                                              │
└─────────────────────────────────────────────────────────────────┘
```

### Priority: HIGH (Phase 1)
Forms are the primary lead capture mechanism. Admin needs to connect Make.com scenarios.

---

## Section 3: Cal.com Webhook Security

### Purpose
Authenticate incoming Cal.com webhook payloads.

### Fields

| Field Name | Env Variable | Type | Description |
|------------|--------------|------|-------------|
| Webhook Secret | `CAL_WEBHOOK_SECRET` | Password | Secret for HMAC signature verification |

### UI Layout
```
┌─ Cal.com Webhook Security ──────────────────────────────────────┐
│ Webhook Secret:  [•••••••••••••••••••••••••••••••] [Show]     │
│                                                                     │
│ ℹ Found in Cal.com dashboard under Webhooks → Advanced settings    │
│                                                                     │
│ [Test Webhook Signature]                                            │
└─────────────────────────────────────────────────────────────────┘
```

### Priority: MEDIUM (Phase 1)
Security configuration, needed once during setup.

---

## Section 4: Database (PocketBase)

### Purpose
Configure self-hosted database for form data persistence.

### Fields

| Field Name | Env Variable | Type | Description |
|------------|--------------|------|-------------|
| PocketBase URL | `POCKETBASE_URL` | URL | Server address (default: http://127.0.0.1:8090) |
| Admin Email | `POCKETBASE_ADMIN_EMAIL` | Email | PocketBase admin account |
| Admin Password | `POCKETBASE_ADMIN_PASSWORD` | Password | PocketBase admin password |

### Connection Status
Display connection status badge:
- `● Connected` — Successfully authenticates
- `○ Not configured` — No credentials entered
- `⚠ Connection failed` — Invalid credentials or server unreachable
- `○ Disabled` — Configured but user toggled off

### UI Layout
```
┌─ PocketBase Database ───────────────────────────────────────────┐
│ Status: ○ Not configured                                        │
│                                                                     │
│ Server URL:    [http://127.0.0.1:8090                        ]   │
│ Admin Email:   [admin@example.com                             ]   │
│ Admin Password: [••••••••••••••                             ]   │
│                                                                     │
│ ☑ Enable PocketBase storage                                       │
│                                                                     │
│ [Test Connection]  [Open Admin Dashboard]                          │
│                                                                     │
│ Data Collections:                                                │
│   • candidates         (Candidate profiles & resumes)             │
│   • employer_leads     (Client company leads)                     │
│   • jobs               (Job postings)                              │
│   • bookings           (Calendar bookings)                        │
│   • newsletter_subscribers (Email list)                          │
└─────────────────────────────────────────────────────────────────┘
```

### Priority: MEDIUM (Phase 2)
Backend API depends on this. Phase 1 can skip with local-only storage.

---

## Section 5: Linear Issue Tracking

### Purpose
Manage recruiting pipeline and candidate tracking.

### Fields

| Field Name | Env Variable | Type | Description |
|------------|--------------|------|-------------|
| API Key | `LINEAR_API_KEY` | Password | Linear API authentication |
| Team ID | `LINEAR_TEAM_ID` | String | Target Linear team identifier |

### Connection Status
Display:
- Connection status
- Team name
- Active issue count

### Pipeline Status Mapping (for display)
| Linear State | UI Label |
|--------------|----------|
| backlog | Backlog |
| unstarted | In Review |
| started | In Progress |
| completed | Hired |
| cancelled | Rejected |

### UI Layout
```
┌─ Linear Issue Tracking ──────────────────────────────────────────┐
│ Status: ● Connected                                              │
│ Team: Recruiting (SF)                                            │
│ Active Issues: 12                                                │
│                                                                     │
│ API Key:    [••••••••••••••••••••••••••••••••••••••         ]   │
│ Team ID:    [xxxxxxxx                                        ]   │
│                                                                     │
│ Pipeline Stages:                                                  │
│   1. Backlog      (issues created)                                │
│   2. In Review   (screening)                                     │
│   3. In Progress (interviewing)                                  │
│   4. Hired       (completed)                                     │
│   5. Rejected    (cancelled)                                     │
│                                                                     │
│ [View in Linear ↗]  [Sync Now]                                    │
└─────────────────────────────────────────────────────────────────┘
```

### Priority: HIGH (Phase 1)
Linear is already set up and active. Admin needs visibility and configuration control.

---

## Section 6: Candidate Intelligence (Common Room)

### Purpose
Candidate engagement and talent intelligence tracking.

### Fields

| Field Name | Env Variable | Type | Description |
|------------|--------------|------|-------------|
| API Key | `COMMONROOM_API_KEY` | Password | Common Room API authentication |
| Workspace ID | `COMMONROOM_WORKSPACE_ID` | String | Target workspace identifier |

### UI Layout
```
┌─ Common Room ────────────────────────────────────────────────────┐
│ Status: ○ Not configured                                        │
│                                                                     │
│ API Key:       [••••••••••••••••••••••••••••••••••••••      ]   │
│ Workspace ID:  [                                   ]             │
│                                                                     │
│ ☑ Enable candidate intelligence tracking                          │
│                                                                     │
│ ℹ Used for candidate engagement and talent sourcing               │
└─────────────────────────────────────────────────────────────────┘
```

### Priority: LOW (Phase 2)
Defined in env but not integrated yet.

---

## Section 7: Email Delivery (Resend)

### Purpose
Configure transactional email delivery for form confirmations and notifications.

### Fields

| Field Name | Env Variable | Type | Description |
|------------|--------------|------|-------------|
| Resend API Key | `RESEND_API_KEY` | Password | Resend API authentication |

### UI Layout
```
┌─ Email Delivery (Resend) ────────────────────────────────────────┐
│ Status: ○ Not configured                                          │
│                                                                     │
│ API Key:  [••••••••••••••••••••••••••••••••••••••            ]   │
│                                                                     │
│ Email Templates:                                                 │
│   • Contact form auto-reply                                       │
│   • Resume submission confirmation                                │
│   • Talent request acknowledgment                                 │
│   • Booking reminder (24hr before)                               │
│                                                                     │
│ [Configure Templates]                                             │
└─────────────────────────────────────────────────────────────────┘
```

### Priority: MEDIUM (Phase 2)
Needed for good UX on form submissions.

---

## Section 8: Feature Toggles

### Purpose
Enable/disable UI features without code changes.

### Toggles

| Toggle Name | Env Variable | Default | Description |
|-------------|---------------|---------|-------------|
| Partnership Preloader | `FEATURE_PRELOADER_ENABLED` | true | Show preloader on page load |
| Marquee Animations | `FEATURE_MARQUEE_ENABLED` | true | Enable scrolling marquee text |
| Jobs Page | `FEATURE_JOBS_ENABLED` | false | Show Jobs link in nav/footer |
| Insights Blog | `FEATURE_INSIGHTS_ENABLED` | false | Enable blog/insights section |
| Case Studies | `FEATURE_CASE_STUDIES_ENABLED` | false | Show case studies page |
| Newsletter Signup | `FEATURE_NEWSLETTER_ENABLED` | false | Enable newsletter form |
| Book a Call Widget | `FEATURE_BOOKING_WIDGET_ENABLED` | true | Show floating booking button |

### UI Layout
```
┌─ Feature Toggles ────────────────────────────────────────────────┐
│                                                                     │
│ Display Features                                                  │
│   ☑ Partnership preloader on load                                 │
│   ☑ Scrolling marquee animations                                  │
│   ☑ Floating "Book a Call" button                                  │
│                                                                     │
│ Pages & Sections                                                  │
│   ☐ Jobs board (public job listings)                              │
│   ☐ Insights / Blog                                               │
│   ☐ Case Studies                                                  │
│   ☐ Newsletter signup form                                        │
│                                                                     │
│ [Save Changes]                                                     │
└─────────────────────────────────────────────────────────────────┘
```

### Priority: MEDIUM (Phase 1)
Allows admin to stage features for launch.

---

## Section 9: Analytics & Tracking

### Purpose
Configure analytics and conversion tracking.

### Fields

| Field Name | Env Variable | Type | Description |
|------------|--------------|------|-------------|
| Google Analytics ID | `GA_MEASUREMENT_ID` | String | GA4 measurement ID (G-XXXXXXXXXX) |
| Google Tag Manager ID | `GTM_ID` | String | GTM container ID |
| Facebook Pixel ID | `FB_PIXEL_ID` | String | Meta/Facebook pixel |
| LinkedIn Insight Tag | `LINKEDIN_PARTNER_ID` | String | LinkedIn conversion tracking |
| Hotjar Site ID | `HOTJAR_SITE_ID` | String | Hotjar analytics |

### UI Layout
```
┌─ Analytics & Tracking ───────────────────────────────────────────┐
│                                                                     │
│ Google Analytics                                                  │
│   Measurement ID: [G-XXXXXXXXXX                              ]   │
│   ☑ Enable enhanced measurements                                   │
│   ☑ Track outbound link clicks                                    │
│   ☐ Enable debug mode (staging only)                              │
│                                                                     │
│ Google Tag Manager                                                │
│   Container ID: [GTM-XXXXXXX                                 ]   │
│                                                                     │
│ Conversion Tracking                                                │
│   Facebook Pixel: [XXXXXXXXXX                                ]   │
│   LinkedIn Insight: [XXXXXXXXXX                             ]   │
│   Hotjar Site ID: [XXXXXXX                                   ]   │
│                                                                     │
│ [Preview Events in DebugView]                                      │
└─────────────────────────────────────────────────────────────────┘
```

### Priority: MEDIUM (Phase 1)
Analytics setup is common during initial deployment.

---

## Section 10: Branding & Content

### Purpose
Manage editable brand assets and site content.

### Fields

| Field Name | Storage | Type | Description |
|------------|---------|------|-------------|
| Logo URL | PocketBase or env | URL | Primary logo image |
| Logo Mark URL | PocketBase or env | URL | Favicon/logo mark (used in nav) |
| Hero Headline | PocketBase | Text | Main hero headline (LOCKED per AGENTS.md) |
| Hero Subline | PocketBase | Text | Hero supporting text |
| About Section | PocketBase | Rich text | About page content |
| Footer Tagline | PocketBase | Text | Footer company description |
| LinkedIn URL | PocketBase | URL | Company LinkedIn profile |

### UI Layout
```
┌─ Branding & Content ─────────────────────────────────────────────┐
│                                                                     │
│ Logo & Assets                                                    │
│   Main Logo:     [________________] [Upload] [Preview]            │
│   Logo Mark:    [________________] [Upload] [Preview]             │
│   (Used in navigation as favicon)                                 │
│                                                                     │
│ Content Sections                                                  │
│   Footer tagline:                                                 │
│   [Ontario-first recruitment support for industrial...        ]   │
│                                                                     │
│   Footer year: [2026] (updates copyright)                          │
│                                                                     │
│ Social Links                                                      │
│   LinkedIn: [https://linkedin.com/in/sarah-fell-3b8a5810      ]   │
│                                                                     │
│ ℹ Note: Hero headline and brand colors are locked per brand guide │
└─────────────────────────────────────────────────────────────────┘
```

### Priority: LOW (Phase 2)
Locking brand elements per AGENTS.md reduces need for this section.

---

## Section 11: Lead Management Rules

### Purpose
Define automation behavior when new leads arrive.

### Fields

| Field Name | Type | Description |
|------------|------|-------------|
| New Contact Assignment | Select | Route to team member or leave unassigned |
| Resume Auto-Screening | Toggle | Auto-move to screening status |
| Talent Request Priority | Select | Default priority (normal/urgent) |
| Auto-Reply Email Template | Rich text | Confirmation sent to new lead |
| Notify On New Lead | Toggle | Send admin notification |
| Lead Assignment Rule | Select | Round-robin / territory-based / unassigned |

### UI Layout
```
┌─ Lead Management ─────────────────────────────────────────────────┐
│                                                                     │
│ New Contact Handling                                              │
│   Auto-assign to: [Unassigned              ▼]                     │
│   Notify admin:   ☑ Send email on new contact                     │
│                                                                     │
│ Resume Submissions                                                │
│   Auto-status:    [New → Screening        ▼]                      │
│   ☑ Create Linear issue automatically                              │
│                                                                     │
│ Talent Requests                                                   │
│   Default priority: [Normal ▼]                                    │
│   ☑ Create Linear issue for each request                          │
│                                                                     │
│ Auto-Reply Template                                              │
│   [Thank you for your interest...                            ]   │
│   [                                                    ]          │
│   [                                                    ]          │
│                                                                     │
│ [Save Automation Rules]                                            │
└─────────────────────────────────────────────────────────────────┘
```

### Priority: MEDIUM (Phase 2)
Depends on Make.com and PocketBase being configured.

---

## Section 12: Data & Retention

### Purpose
Manage data retention policies and export capabilities.

### Fields

| Field Name | Type | Description |
|------------|------|-------------|
| Candidate Retention | Select | 1 year / 2 years / 5 years / indefinitely |
| Lead Retention | Select | 1 year / 2 years / 5 years / indefinitely |
| Booking History | Select | 6 months / 1 year / 2 years / indefinitely |
| Auto-Archive Inactive | Toggle | Move stale leads to archived status |
| Archive Threshold | Number | Days before auto-archive (default: 90) |

### UI Layout
```
┌─ Data Retention ──────────────────────────────────────────────────┐
│                                                                     │
│ Retention Policies                                                │
│   Candidates:    [Keep for 2 years              ▼]               │
│   Employer Leads: [Keep for 2 years              ▼]               │
│   Bookings:      [Keep for 1 year                ▼]               │
│                                                                     │
│ Auto-Archiving                                                  │
│   ☑ Auto-archive inactive records                                 │
│   Archive after: [90] days of inactivity                          │
│                                                                     │
│ Data Export                                                      │
│   [Export Candidates (CSV)]                                        │
│   [Export Employer Leads (CSV)]                                   │
│   [Export Bookings (CSV)]                                          │
│   [Export Newsletter Subscribers (CSV)]                           │
│                                                                     │
│ [Request Full Backup]                                              │
└─────────────────────────────────────────────────────────────────┘
```

### Priority: LOW (Phase 2)
Important for compliance but not blocking for initial launch.

---

## Section 13: Admin Access

### Purpose
Manage who can access the settings panel.

### Fields

| Field Name | Type | Description |
|------------|------|-------------|
| Admin Email(s) | Email list | Comma-separated emails with access |
| Password | Password | Settings panel password |
| Two-Factor Required | Toggle | Require 2FA for admin access |
| Session Duration | Select | 1 hour / 8 hours / 30 days |
| Last Login | Display | Timestamp of last admin login |

### UI Layout
```
┌─ Admin Access ────────────────────────────────────────────────────┐
│                                                                     │
│ Security                                                         │
│   Admin Password: [••••••••••••••••••••••••••••] [Change]        │
│   Require 2FA:   ☑                                                │
│   Session:       [8 hours ▼]                                       │
│                                                                     │
│ Access Log                                                        │
│   Last login: April 15, 2026 at 2:34 PM (this device)            │
│   Previous: April 14, 2026 at 9:12 AM                             │
│                                                                     │
│ [View Full Access Log]                                            │
└─────────────────────────────────────────────────────────────────┘
```

### Priority: HIGH (Phase 1)
Essential for security before going live.

---

## Implementation Approach

### Phase 1: Frontend-Only Settings (MVP)

**Stack:**
- Next.js API route for settings
- JSON file (`/data/site-settings.json`) for storage
- Basic password protection
- No database dependency

**Route:** `/admin/settings` (protected by password)

**API Endpoints:**
```
GET    /api/admin/settings          → Fetch all settings (masked passwords)
PUT    /api/admin/settings          → Update settings (merge patch)
POST   /api/admin/settings/test-webhook → Test webhook connectivity
POST   /api/admin/settings/export   → Export data as CSV
POST   /api/admin/settings/validate → Validate credentials
```

**Authentication:**
- Single admin password (env: `ADMIN_SETTINGS_PASSWORD`)
- Cookie-based session with 8-hour expiry
- Optional: IP whitelist (env: `ADMIN_ALLOWED_IPS`)

**Data Flow:**
1. Admin enters password → set session cookie
2. GET settings → read from JSON file, mask sensitive fields
3. PUT settings → write to JSON file, trigger Vercel redeploy if needed
4. For webhook URLs, validate format only (not actual connectivity)

### Phase 2: Backend Admin API

**Stack:**
- PocketBase as admin settings store
- Settings collection with JSON field for flexibility
- Environment variables for sensitive keys (read-only from admin UI)
- Real-time validation against actual services (Linear, Make.com, etc.)

**Enhancements:**
- Real connection status indicators
- Test buttons that make actual API calls
- Audit log for all setting changes
- User management for multiple admins

---

## Priority Order for Implementation

| Priority | Section | Reason |
|----------|---------|--------|
| 1 | Admin Access | Security gate required before anything else |
| 2 | Booking Configuration | Cal.com is live, needs tuning capability |
| 3 | Linear Issue Tracking | Already active, needs visibility |
| 4 | Form Integrations | Lead capture depends on Make.com |
| 5 | Feature Toggles | Allows staging features |
| 6 | Cal.com Webhook Security | Completes booking setup |
| 7 | Analytics & Tracking | Common initial setup task |
| 8 | Email Delivery | Improves form UX |
| 9 | Lead Management Rules | Automates workflow |
| 10 | PocketBase Database | Backend persistence |
| 11 | Branding & Content | Content management |
| 12 | Common Room | Future integration |
| 13 | Data & Retention | Compliance, not blocking |

---

## File Structure

```
src/
├── app/
│   ├── admin/
│   │   └── settings/
│   │       └── page.tsx          # Settings page component
│   └── api/
│       └── admin/
│           └── settings/
│               └── route.ts      # Settings API endpoints
├── components/
│   └── admin/
│       ├── SettingsLayout.tsx    # Tabbed settings layout
│       ├── sections/
│       │   ├── BookingSettings.tsx
│       │   ├── FormIntegrations.tsx
│       │   ├── LinearSettings.tsx
│       │   ├── FeatureToggles.tsx
│       │   ├── AnalyticsSettings.tsx
│       │   ├── LeadManagement.tsx
│       │   ├── DataRetention.tsx
│       │   └── AdminAccess.tsx
│       └── ui/
│           ├── SettingsSection.tsx
│           ├── SettingsField.tsx
│           ├── StatusBadge.tsx
│           └── TestButton.tsx
├── lib/
│   ├── admin-auth.ts             # Password verification
│   ├── settings-store.ts        # JSON file read/write
│   └── validators/
│       ├── linear.ts
│       ├── pocketbase.ts
│       └── make.ts
data/
└── site-settings.json            # Settings storage (Phase 1)
```

---

## Environment Variables Required

```bash
# Admin Authentication
ADMIN_SETTINGS_PASSWORD=           # Password for settings panel
ADMIN_ALLOWED_IPS=                 # Optional comma-separated IP whitelist

# Existing (read by settings page)
LINEAR_API_KEY=
LINEAR_TEAM_ID=
POCKETBASE_URL=
POCKETBASE_ADMIN_EMAIL=
POCKETBASE_ADMIN_PASSWORD=
MAKE_WEBHOOK_CONTACT=
MAKE_WEBHOOK_RESUME=
MAKE_WEBHOOK_TALENT_REQUEST=
CAL_WEBHOOK_SECRET=
RESEND_API_KEY=
COMMONROOM_API_KEY=
COMMONROOM_WORKSPACE_ID=

# New (settings-specific)
GA_MEASUREMENT_ID=
GTM_ID=
FB_PIXEL_ID=
LINKEDIN_PARTNER_ID=
HOTJAR_SITE_ID=

# Feature flags
FEATURE_PRELOADER_ENABLED=true
FEATURE_MARQUEE_ENABLED=true
FEATURE_JOBS_ENABLED=false
FEATURE_INSIGHTS_ENABLED=false
FEATURE_CASE_STUDIES_ENABLED=false
FEATURE_NEWSLETTER_ENABLED=false
FEATURE_BOOKING_WIDGET_ENABLED=true
```

---

## Success Criteria

1. **Security**: Settings page protected by password, no env vars exposed to client
2. **Usability**: Admin can configure Make.com webhooks without code changes
3. **Visibility**: Connection status for all integrations visible at a glance
4. **Reliability**: Settings persist across redeploys (JSON file or PocketBase)
5. **Performance**: Settings page loads < 2 seconds, saves < 1 second
