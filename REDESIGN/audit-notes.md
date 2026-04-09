# Page Audit — Production src/ Issues
_Branch: stitch-testing — reviewed against redesign goals_

---

## Cross-page (systemic)

| # | Issue | Files affected | Severity |
|---|-------|---------------|----------|
| 1 | **Three different page backgrounds** — home uses `#FAFAFA`, about/jobs use `#F4F2ED`, book-a-call uses `#F3EFE6`. No consistent canvas. | all pages | High |
| 2 | **Dark section color inconsistency** — about uses `#1F2628`, book-a-call uses `#202628`. 2-digit hex drift. | about, book-a-call | Low |
| 3 | **Gold heading inconsistency in dark panels** — about uses `#E4CF8C`, book-a-call uses `#E7D08A`. Neither matches the design token `#C6A64A`. | about, book-a-call | Medium |
| 4 | **Fractional opacity sprawl** — `bg-white/74`, `/78`, `/82`, `/86` used interchangeably with no system. Non-standard Tailwind fractions may compile inconsistently. | about, book-a-call | Medium |
| 5 | **Brand green absent from interior pages** — `#4B635E` (dark sage) appears in globals.css as `--color-accent`. No use of the vibrant `#3D7A65` on any interior page. | about, jobs, book-a-call | High |
| 6 | **No-Line rule violations** — `border border-black/10` used as dividers between sections (about dark section uses `border-y`), contradicting the tonal-only separation principle in DESIGN.md. | about, book-a-call | Medium |

---

## About (`src/app/about/page.tsx`)

| # | Issue | Line | Fix |
|---|-------|------|-----|
| 1 | Image frame uses `border border-black/10` — decorative border on photo container breaks No-Line rule | 34 | Remove border, rely on shadow + tonal background |
| 2 | Dark values section uses `border-y border-black/10` — section separator borders | 69 | Remove border-y, tonal contrast is sufficient |
| 3 | Gold overline uses `text-[#C6A64A]` but section headings inside dark panel use `text-[#E4CF8C]` — inconsistent gold | 47, 77, 81 | Standardise to `#C6A64A` throughout |
| 4 | `bg-[#F4F2ED]` page background doesn't match homepage `bg-[#FAFAFA]` | 25 | Unify to `#FAF9F6` |
| 5 | "Book a Call" CTA button links to `/#book` (anchor on homepage), not `/book-a-call` | 58 | Change href to `/book-a-call` |
| 6 | Cards inside bottom section use `bg-[#F9F7F1]` — a fourth off-white variant not in the design token set | 97, 105 | Replace with `#FAF9F6` |

---

## Jobs (`src/app/jobs/page.tsx`)

| # | Issue | Line | Fix |
|---|-------|------|-----|
| 1 | Brand green `#3D7A65` never used — entire page is monochrome charcoal/gold. No visual signal of which recruiter firm this belongs to | entire page | Add green accents (sector tags, active state on search, dot indicators) |
| 2 | `border-black/12` — non-standard Tailwind opacity fraction | 150 | Use `/10` or `/15` |
| 3 | Empty state hover button: `hover:bg-[#C6A64A] hover:text-[#1F2628]` — gold fill background on a dark button is jarring, reads as warning | 121 | Replace hover with opacity or green variant |
| 4 | `bg-white/74` — non-standard Tailwind fraction | 108, 139 | Round to `/75` or use explicit rgba |
| 5 | Search input `motion.div` wrapper at line 81 uses `variants={fadeUp}` but is missing `transition` — inherits parent stagger which may fire too early | 81 | Add explicit `transition` prop or move outside stagger container |
| 6 | `SHEET_URL` points to a third-party opensheet proxy (`opensheet.elk.sh`) — no SLA, can go down silently. No timeout or error UI shown to user during fetch | 9 | Add error state UI; consider direct Google Sheets API or a route handler with fallback |

---

## Book a Call (`src/app/book-a-call/page.tsx`)

| # | Issue | Line | Fix |
|---|-------|------|-----|
| 1 | **Hero headline is self-referential/meta**: "A booking page that actually feels like a booking page." — sounds like copywriter commentary, not recruiter copy | 61 | Replace with intent-focused headline, e.g. "Talk through the role before the search begins." |
| 2 | `bg-[#F3EFE6]` — unique background not matching any other page | 46 | Unify to `#FAF9F6` |
| 3 | `orbital-ring` CSS animation on a professional recruiter booking page — belongs on a SaaS product, not a staffing firm | 94–95 | Remove entirely |
| 4 | Floating `animate={{ y: [0, -9, 0] }}` on the info card — distracting on a conversion page | 98–99 | Remove float animation; page intent is low-friction booking |
| 5 | Card gradient `bg-[linear-gradient(160deg,#fcf8ef_0%,#ece2cb_54%,#dfe8e4_100%)]` includes `#dfe8e4` (teal-tinted) — inconsistent with warm off-white palette | 100 | Replace with warm tonal gradient staying within the `#FAF9F6 → #EDE9E1` range |
| 6 | `border-white/18` and `bg-white/8` — non-standard Tailwind fractions | 185 | Use `/20` and `/10` |
| 7 | `InlineWidget` Calendly embed has fixed height `780px` — may clip on 768px tablets | 202 | Add `min-height` + allow scroll, or reduce to `700px` with `overflow: auto` wrapper |
| 8 | `ArrowRight` icon used as the icon for "Outcome: clear next step" detail card | 34 | Replace with a checkmark or target icon — ArrowRight implies navigation, not completion |
| 9 | `#202628` dark closing section doesn't match `#1F2628` used in about page | 210 | Standardise to `#1F2628` |

---

## What the redesign files fix

| Behaviour | Production | REDESIGN |
|-----------|------------|---------|
| Page canvas | 3 different off-whites | `#FAF9F6` everywhere |
| Brand green | Dark sage `#4B635E` / absent | Vibrant `#3D7A65` consistently |
| Section dividers | `border-black/10` lines | Tonal background shifts only |
| Dark panel gold | `#E4CF8C` / `#E7D08A` (varies) | `#C6A64A` only |
| Dark section colour | `#1F2628` / `#202628` (varies) | `#1F2628` everywhere |
| Book a Call headline | Meta/self-referential | Intent-focused recruiter copy |
| Orbital-ring animation | Present | Removed |
| Floating card animation | Present on booking page | Removed |
| Calendly on mobile | Fixed 780px, may clip | 700px with fallback CTA |
| Opacity fractions | Non-standard sprawl | Rounded to standard values |
| Jobs search filter | Client-side only, no empty state feedback | Live filter with clear empty/no-results state |
| Scroll reveal | Framer Motion (requires JS bundle) | IntersectionObserver (zero dependency) |
