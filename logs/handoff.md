# Current Handoff

## Backend
- Current state: No backend changes made. Site is static Next.js — no API routes modified.
- What changed: Nothing in backend domain.
- What frontend needs to know: Jobs page fetches from opensheet.elk.sh proxy (third-party, no SLA). Consider a Next.js route handler as a wrapper for resilience.

## Frontend
- Current state: REDESIGN branch (stitch-testing) contains full prototype HTML files for all 4 pages. Production src/ pages are unchanged.
- What changed: Added REDESIGN/ prototypes, audit-notes.md, new logo SVG, Stitch exports. PR #2 open.
- What backend needs to know: No contract changes. Jobs data source is Google Sheets via opensheet proxy — flagged as fragile in audit-notes.md.

## Next priority
1. Apply audit-notes.md fixes to production src/ pages (background consistency, broken interactions, green color correction)
2. Replace opensheet.elk.sh jobs proxy with a Next.js route handler or direct Sheets API call
3. Merge PR #2 after review
