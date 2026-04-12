# Sarah Fell Website Build Spec

## Current state
- Next.js TypeScript app
- source in `src/`
- static assets in `public/`
- deployed via GitHub + Vercel
- recruiter-led website
- jobs not yet built

## Goal
Create a clean jobs foundation without disrupting the current website structure or locked brand/design elements.

## Locked items
Do not change:
- branding
- colors
- fonts
- hero line
- section order
- deployment config

## Required work now
1. Inspect current repo structure
2. Identify actual files controlling:
   - homepage
   - About page
   - Book a Call section/page
   - navigation
3. Determine whether repo uses App Router or Pages Router
4. Add a Jobs page/route
5. Add Jobs to site navigation
6. Create a local typed jobs data source
7. Render jobs from that source
8. Filter for:
   - active = true
   - public = true
9. Show a clean empty state when no active public jobs exist

## Jobs foundation requirements
The jobs system should be easy to update manually for now.

Recommended structure:
- data file in a clear location such as:
  - `src/data/jobs.ts`
  - or equivalent existing pattern in repo
- page component that consumes the jobs data
- card/list UI matching current site style

Recommended job fields:
- id
- title
- location
- type
- summary
- active
- public
- href

## UX requirements
- minimal and clean
- recruiter/professional tone
- easy to scan
- no clutter
- no overdesigned components

## Constraints
- no broad refactor
- no deployment config changes
- no unnecessary package installs
- preserve existing branding and page order

## Future phase
After local jobs foundation is stable, the jobs source can later be upgraded to Google Sheets if needed.

## Acceptance criteria
- Jobs link appears in navigation
- Jobs page builds successfully
- empty state works
- populated state works
- only active/public roles render
- existing site structure remains intact
- locked items remain unchanged