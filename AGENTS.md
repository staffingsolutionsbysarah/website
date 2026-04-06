# AGENTS.md

## Project
This repository powers the Sarah Fell website, deployed through GitHub and Vercel.

Tech stack:
- Next.js
- TypeScript
- source code in `src/`
- static assets in `public/`
- configs/workflows at repo root

## Core objective
Maintain and improve this website as a recruiter-led business development site.

This is not a generic portfolio site.
Every change must support clarity, credibility, and conversion.

## Locked / Untouchable
Do not change these unless explicitly instructed:
- branding
- colors
- fonts
- hero line
- section order
- deployment config

## Operating rules
1. Do not guess unknown repo structure or integrations.
2. Inspect actual files before changing anything.
3. Prefer small, production-safe edits.
4. Do not broad-refactor the repo unless explicitly told.
5. Light refactors are allowed only if required to implement a clean jobs foundation.
6. Keep the website minimal, readable, and professional.
7. Keep the site buyer-facing first. Jobs are secondary to client conversion.
8. Output final code only unless asked for explanation.

## Task classification
Internally classify each request as one of:
- copy
- layout
- jobs
- deployment
- architecture
- mixed

Also classify scope as:
- NEW
- UPDATE
- REDO

Definitions:
- NEW = build from scratch
- UPDATE = preserve structure, change targeted parts only
- REDO = replace the current implementation fully

## Editing behavior
Before editing:
- identify the actual files involved
- identify what must remain untouched
- identify whether the task is NEW / UPDATE / REDO

During editing:
- touch only the files relevant to the task
- preserve working patterns already used in the repo
- avoid introducing unnecessary dependencies

## Website intent by page
- Home = orient and convert
- About = establish recruiter credibility
- Jobs = show active public roles only
- Book a Call = convert quickly with minimal friction

## Copy rules
Write in a way that is:
- direct
- recruiter-led
- buyer-aware
- clear
- not fluffy
- not generic

## Layout rules
Protect a minimal, professional layout:
- clean spacing
- readable hierarchy
- no clutter
- no decorative overbuild
- desktop-first, still responsive

## Jobs system rules
Current requirement:
- Jobs page/foundation needs to be created
- no jobs currently exist on site
- implement a simple local typed jobs data source first

Default jobs logic:
- use a local TypeScript or JSON data file first
- render only jobs with active: true and public: true
- keep cards scan-friendly
- support easy migration later to Google Sheets

Recommended fields:
- id
- title
- location
- type
- summary
- active
- public
- href

If there are no active public jobs:
- show a clean empty state message

## Deployment rules
- preserve GitHub + Vercel workflow
- do not modify deployment config
- separate content/code edits from infrastructure edits
- call out anything that could affect build or routing

## QA rules
Before finishing, verify:
- build-safe code
- no unnecessary repo-wide changes
- locked items untouched
- jobs page works with empty and populated states
- nav includes Jobs if required by task
- output fits existing project structure

## Preferred implementation order for jobs
1. inspect repo structure
2. identify router type and current page structure
3. add Jobs page
4. add nav link
5. add typed local jobs data source
6. render cards / empty state
7. verify no locked design rules were altered

## Response preference
Return final code/results only unless explicitly asked for explanation.