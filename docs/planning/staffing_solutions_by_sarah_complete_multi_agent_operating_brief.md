# Staffing Solutions by Sarah - Complete Multi-Agent Operating Brief

## Purpose

This is the single source of truth for Gemini CLI, Claude Code, Codex, and the GSAP animation skill.

Use this document to align all agents on:

- the website goal
- the site architecture
- the page inventory
- what already exists
- what is missing
- who does what
- what must never be changed

This document exists to stop duplicate work, random redesigns, broken routing, token waste, and confusion between agents.

---

# 1. PROJECT IDENTITY

## Brand / Site

**Staffing Solutions by Sarah**

## Business Positioning

A **multi-sector, Ontario-wide Workforce Solutions provider**.

## Strategic Goal

Pivot from a niche specialist impression into an **industry-agnostic authority** without losing legacy SEO value.

## Core Business Objective

Build a website that:

- converts **employers**
- converts **candidates**
- establishes **trust and authority**
- supports **Ontario-wide local SEO**
- scales across industries and locations

## Brand Voice

- Authoritative
- High-energy
- Professional
- Resourceful
- Strategic Talent Partner, not just recruiter

## Visual Tone

- Clean
- Premium
- Modern
- Corporate-industrial

---

# 2. CORE UX MODEL

## Homepage Logic

The homepage is **not** a traditional long landing page.

It is a **router via scroll**.

That means:

- Each section is a **mini landing page preview**
- Scrolling moves users through previews
- Clicking goes to the **full page**

## Core Rule

**Scroll = preview**
**Click = full page**

Do not turn homepage sections into full long-form pages.

## CTA Priority

### Employer path

- Request Talent Profile
- Book Strategy Call

### Candidate path

- Submit Resume
- Browse Jobs

## Core User Flows

1. Employer lands on Home → clicks Hire Talent → Book Strategy Call
2. Candidate lands on Home → clicks Find Work → Submit Resume or Browse Jobs
3. Visitor lands on Home → clicks About → goes to Contact
4. Visitor lands on Home → clicks Specialization preview → goes to industry page
5. Visitor lands on Home → clicks Location preview → goes to location page

---

# 3. WHAT ALREADY EXISTS

## Existing repo context

Known repo:

- `laughjaja/sarah-fell-website`

Known branches:

- `websitev2`
- `website-updates-final`
- `stitch-testing`
- `main`
- `Trial`
- `codex/Term-Mini/diablo-desktop/isolated-pages-work`

Recommended working source:

- **websitev2**

Recommended safe practice pattern:

- base from `websitev2`
- create a new branch if needed

## Existing mock-up state

A current HTML mock-up already exists and proves the concept.
It already includes:

- fixed top nav
- scroll-snap sections
- hero
- trust strip
- about preview
- hire talent preview
- find work preview
- specializations preview
- locations preview
- process preview
- testimonials
- final CTA
- placeholder CTA routes
- Sarah photo placeholder
- employer / candidate split

This mock-up is a **prototype**, not the final build.

## Existing legal draft

A full legal draft exists for:

- Privacy Policy
- Terms of Use
- Recruitment Disclaimer

These must become real pages or a clearly implemented legal utility layer.

## Existing visual direction

The following direction is already locked:

- Hero: handshake / business-meets-industry montage
- About Sarah: authentic environmental portrait
- Hire Talent: strategic consultant look
- Find Work: future-self aspirational work imagery
- Specializations: contextual action shots, not generic stock
- Locations: real landmarks, not generic skyline clichés
- Process: blueprint / notebook / coffee / pen flat-lay
- Insights / Newsletter: data and knowledge visual language

---

# 4. FULL PAGE INVENTORY

This is the complete page system all agents must work from.

## A. Public / primary pages

These are the main experience pages.

- Home
- Hire Talent
- Find Work
- Specializations
- Locations
- About
- Contact
- Book Strategy Call
- Jobs
- Our Process

## B. Industry pages

Each must have its own URL.

- Manufacturing & Skilled Trades
- Food, Grocery & Retail
- Finance & Accounting
- IT & Technology
- Sales & Marketing
- Administrative & Support

## C. Location pages

Each must have its own URL.

- Vaughan
- Toronto / GTA
- Belleville
- Windsor
- Chatham-Kent

## D. SEO / authority pages

These are important and should not be forgotten.

- Insights / Blog
- Newsletter / Ontario Labor Market Report
- Case Studies / Multi-Sector Proof

## E. Hidden conversion / support pages

These are not main navigation pages but must exist.

- Request Talent Profile
- Submit Resume
- Booking Success
- Resume Submission Success
- Contact Success

## F. Legal / footer pages

These must exist as real pages or clearly implemented legal views.

- Privacy Policy
- Terms of Use
- Recruitment Disclaimer

## G. Optional but recommended

- 404 page
- generic Thank You fallback page
- future jobs search / filter page
- sitemap / utility implementation later

---

# 5. HOMEPAGE SECTION INVENTORY

The homepage should preview the system using these sections:

1. Hero
2. Trust / credibility strip
3. About preview
4. Hire Talent preview
5. Find Work preview
6. Specializations preview
7. Locations preview
8. Process preview
9. Testimonials / proof
10. Final CTA

Each section must connect to its corresponding full page.

---

# 6. SEO AND STRUCTURE RULES

## Silo rules

- Every industry page must be its own URL
- Every location page must be its own URL
- Do not collapse all industries into one generic page
- Do not collapse all locations into one generic page

## Breadcrumb logic

Use:

- Home > Specializations > [Industry]
- Home > Locations > [Location]

## Internal linking rules

- Blog / Insights should link back to industry pages
- Blog / Insights should link back to location pages
- Newsletter / reports should support sector-specific lead capture

## Positioning bridge phrase

Use the internal bridge concept:

- **Scaling Ontario’s Workforce**

---

# 7. FOOTER AND UTILITY LAYER

The footer is not optional. It is part of the site architecture and conversion/support system.

## Footer must include

- Privacy Policy
- Terms of Use
- Recruitment Disclaimer
- Contact link
- Book Strategy Call link
- copyright line
- optional LinkedIn or business social link if approved

## Footer should also support

- Newsletter / Ontario Labor Market Report signup entry point
- short trust microcopy
- clean utility navigation

## Footer rules

- do not treat footer as an afterthought
- do not leave legal links as placeholders
- do not bury the legal layer in unfinished anchors
- footer must feel premium, minimal, and clean
- footer should connect the public site to the utility layer

## Footer microcopy reference

Use the approved legal/support microcopy direction from the legal draft where appropriate, including:

- privacy handling reference
- analytics disclosure reference
- CASL-aware communication note if relevant
- copyright line

# 8. LEGAL AND COMPLIANCE RULES

The legal file already established that the site should include:

- Privacy Policy
- Terms of Use
- Recruitment Disclaimer

Important legal implementation notes:

- legal pages should live in the footer / utility layer
- analytics disclosure must be included clearly
- if resume uploads go live, privacy copy must support that
- if marketing emails or newsletters go live, consent and unsubscribe logic must be reviewed

The current privacy/contact email in the draft is temporary and must be updated when finalized.

---

# 9. SHARED INPUTS ALL AGENTS MUST USE

All agents must work from the same core materials already provided in this project.

## Required shared inputs

- existing repo and branch context
- current HTML mock-up
- complete multi-agent operating brief
- website architecture + visual direction + Mermaid build guide
- legal copy draft
- locked CTA hierarchy
- locked homepage router model
- existing Sarah photo / hero / industry context already discussed
- footer and legal utility requirements

## Important rule

No agent should ask questions that are already answered by these shared inputs before reviewing them.

# 10. MOTION SYSTEM

The site must not feel like one repeated scroll template.

It should use a **controlled motion system**, not random animations.

## Allowed motion families

### 1. Cinematic

Use for:

- Hero
- Final CTA

### 2. Lateral movement

Use for:

- Hire Talent
- Find Work
- Locations

### 3. Diagonal / corner reveal

Use for:

- About
- Process
- Sarah-related editorial sections

### 4. Layered / pinned

Use for:

- Specializations
- Testimonials
- proof-driven sections

## Motion rules

- do not animate every section the same way
- do not over-animate
- keep readability and conversion first
- GSAP skill should handle execution of motion

---

# 11. IMAGE AND ASSET RULES

## Image direction rules

Use contextual visuals, not generic clichés.

### Hero

- handshake or people/business bridge
- blurred warehouse or bright office background

### Specializations

- contextual action shots by sector
- technology + skill, not low-effort stock visuals

### Hire Talent

- consultant / executive strategy scene

### Find Work

- aspirational future-self work imagery

### Locations

- real landmarks and recognizable local signals

### Process

- organized, calm, methodical visual language

### About Sarah

- environmental portrait, not flat studio look

### Insights / Newsletter

- data and knowledge aesthetic

## Image naming rule

Always name files with keywords before upload.

Examples:

- manufacturing-recruitment-belleville-ontario.jpg
- grocery-staffing-vaughan-ontario.jpg
- finance-recruitment-toronto-gta.jpg
- windsor-staffing-solutions-ambassador-bridge.jpg

---

# 12. AGENT ROLE SPLIT

This is the most important coordination layer.

## Gemini CLI - repo mapper and scaffolder

### Purpose

Gemini is the **first-pass repo cartographer and scaffolder**.

### Gemini must do

- scan the repo from `websitev2`
- inventory pages, sections, routes, assets, and current structure
- identify what exists vs what is partial vs what is missing
- create a reuse-first map
- scaffold missing pages and folders only where needed
- produce an asset manifest
- propose a safe file structure

### Gemini must not do

- redesign the site
- decide final UX logic
- alter CTA hierarchy
- invent alternate architecture
- implement animations

### Gemini outputs

- inventory report
- gap list
- keep / partial / missing list
- scaffold plan
- asset manifest

---

## Claude Code - architect and controller

### Purpose

Claude is the **system architect, reviewer, and controller**.

### Claude must do

- review Gemini’s inventory and scaffold plan
- decide what stays, what gets refactored, and what is deferred
- define page hierarchy and component map
- protect CTA logic
- protect SEO silo rules
- assign motion family by section
- review Codex work before merge
- keep codebase aligned to the project brief

### Claude must use

- the repo
- the mock-up
- the architecture brief
- the legal pages
- the visual direction
- the GSAP skill for motion implementation planning

### Claude must not do

- rebuild the whole site
- duplicate Codex’s implementation work
- output giant rewrites unnecessarily

### Claude outputs

- reuse / refactor plan
- component map
- page map
- motion map
- review notes
- merge guidance

---

## Codex - builder and implementer

### Purpose

Codex is the **execution engine**.

### Codex must do

- build missing pages
- scaffold reusable templates
- wire links, routes, and buttons
- convert repeated blocks into reusable structures
- clean CSS and layout issues within approved structure
- build support pages and utility pages
- handle repetitive implementation efficiently

### Codex must not do

- redesign architecture
- change CTA logic
- flatten silo pages
- invent a conflicting page system

### Codex outputs

- page scaffolds
- reusable templates
- route wiring
- cleaned structures
- support page implementations

---

## GSAP skill - motion executor

### Purpose

GSAP skill is responsible for **motion implementation only**.

### GSAP skill must do

- implement motion assigned by Claude
- follow the allowed motion families
- keep motion intentional and premium

### GSAP skill must not do

- decide architecture
- redesign layouts
- animate everything equally

---

# 13. WORKING SEQUENCE

## Phase 1

Gemini CLI:

- inventory
- gap analysis
- scaffold plan

## Phase 2

Claude Code:

- review inventory
- define keep / refactor / defer
- define component map
- define motion map

## Phase 3

Codex:

- build missing pages
- implement templates
- wire routes and support pages

## Phase 4

Claude Code:

- review all implementation
- fix inconsistencies
- align structure for merge

## Phase 5

GSAP skill:

- implement approved motion system

---

# 14. WHAT MUST NEVER HAPPEN

All agents must avoid these failure modes:

- rebuilding the site from scratch
- ignoring current repo structure
- treating homepage sections like full long-form pages
- flattening industries or locations into one page
- breaking employer vs candidate CTA hierarchy
- inventing alternate page systems
- animating every section the same way
- using generic stock-looking design patterns
- forgetting legal pages
- forgetting success pages
- forgetting blog / insights / case studies / newsletter pages
- forgetting the footer utility layer
- leaving footer legal or support links unfinished

---

# 15. FINAL SUCCESS STATE

The final site should:

- feel like a guided scroll experience
- preserve the homepage router concept
- clearly separate employer and candidate paths
- support Ontario-wide multi-sector SEO
- include real industry and location pages
- include legal and support pages
- include a complete footer and utility layer
- carry forward the shared inputs already established in this project
- reuse most existing code
- be scalable and production-ready

---

# 16. EXECUTION REMINDER

This document is the complete target.

Use it before making changes.
Do not ask basic structural questions already answered here.
If there is uncertainty, preserve current working code and choose the reuse-first path.

Source of truth:

- docs/ai-briefs/complete-multi-agent-operating-brief.md

Supporting references:

- docs/planning/staffing-solutions-sarah-mermaid-build-guide.md
- docs/legal/staffing-solutions-by-sarah-legal-copy.md
- docs/technical/booking-api.md
- docs/ai-briefs/sarah-fell-build-spec.md
