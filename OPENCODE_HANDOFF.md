# OpenCode Worker Handoff — Staffing Solutions by Sarah Fell
## Project: `/Users/TTTG/JA/Claude/sfsite/`

---

## What This Is

You are the worker agent for a premium Ontario recruitment website. The main agent (Claude) has already:
- Cloned and wired the full Next.js project
- Built the complete home page (GlobeHero, Preloader, ProcessSection, TestimonialsCarousel, TrustBlock, DeliveryModelsSection, HorizontalStackingCards, ServicesIndustriesSection, ClientLogosSection)
- Built all 25 routes (all pages render without 404, `npm run build` passes cleanly)
- Established the full design system, Navbar, Footer, and shared component library

**Your job**: Polish and improve the secondary pages that exist but need quality upgrades. Every task below is an improvement to existing files — no new pages needed.

---

## Tech Stack

- **Next.js 14** App Router + TypeScript
- **Tailwind CSS v4** (utility-first, `@theme` token block in globals.css)
- **Framer Motion** for scroll reveals, hover states, page transitions
- **GSAP** for hero and preloader animations
- **Lucide React** for icons
- **`npm run build`** must pass after every edit

---

## Design System — Non-Negotiables

### CSS Tokens (from `src/app/globals.css`)
```
--color-gold: #C6A64A         ← Primary accent. Gold on dark bg only.
--color-gold-light: #E7D08A   ← Eyebrows on dark sections
--color-dark: #2C3434         ← Primary text, headings
--color-dark-panel: #1F2628   ← Dark sections (hero, footer, dark CTAs)
--color-bg: #FAFAFA           ← Page background
--color-section: #F4F2ED      ← Alternate section background (warm parchment)
--color-brand-green: #3D7A65  ← Hover states, proof strip bg
--color-accent: #4B635E       ← Eyebrow text on light bg (a muted forest green)
--color-parchment: #F5EEDF    ← Warm parchment
--ease-cinematic: cubic-bezier(0.22, 1, 0.36, 1)
```

### CSS Component Classes (do not recreate these)
```
.depth-plane       ← White layered card, 34px radius, shadow, gold radial highlight
.depth-plane-dark  ← Same card on dark bg
.depth-inset       ← Recessed panel feel (e.g. checklist sidebar)
.depth-canvas      ← Section wrapper with isolation
.editorial-rule    ← Full-width gradient divider line (use between content blocks)
.liquid-glass      ← Frosted glass panel (backdrop-blur + rgba)
.btn-primary       ← Dark charcoal button with ArrowRight pattern
.btn-gold          ← Gold-filled button
.btn-secondary     ← Outlined dark button
.btn-outline       ← Minimal outline button
```

### Typography Rules
- **Headings**: `font-serif` = Cormorant Garamond. Large: `tracking-[-0.045em]`, tight leading `0.88–0.95`
- **Body**: Manrope (default body font)
- **Eyebrows**: `text-[10px] md:text-[11px] font-bold uppercase tracking-[0.4em]` — gold on dark, `--color-accent` on light
- **Sentence case** for headlines. **ALL CAPS wide tracking** for labels/eyebrows. **Title Case** for nav only.
- **No emoji** anywhere in UI

### Animation Rules (Emil Kowalski principles)
- **Micro (hover/press)**: `180ms ease`
- **Cards**: `300ms ease-out`
- **Scroll reveals**: `600–900ms cubic-bezier(0.22,1,0.36,1)` — always `once: true, margin: '-100px'`
- **Hero/page entries**: `1.0–1.4s` with `delay: 0.1–0.3s`
- **Stagger**: `delay: i * 0.09` or `i * 0.12` for card grids
- **Fade-up pattern**: `initial={{ opacity: 0, y: 20 }}` → `whileInView={{ opacity: 1, y: 0 }}`
- **GSAP ease strings**: `'power3.out'`, `'power2.out'` — never use array form for GSAP ease

### 8pt Spacing Grid
All padding/gap values must be multiples of 8: `8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128px`
Tailwind equivalents: `p-2=8, p-4=16, p-6=24, p-8=32, p-10=40, p-12=48, p-16=64, p-20=80, p-24=96`

---

## Shared Components Available (import from these paths)

```tsx
import PageHero from '@/components/site/PageHero';
// Props: eyebrow, title, description, breadcrumbs[], actions[]?, theme?:'light'|'dark'

import CallToActionPanel from '@/components/site/CallToActionPanel';
// Props: eyebrow, title, body, actions[]

import LinkCardGrid from '@/components/site/LinkCardGrid';
// Props: title, description, cards[]: {href, title, description, eyebrow}

import { MarqueeSection } from '@/components/ui/MarqueeSection';
// Props: variant:'dark'|'light', speed:number

import { LegalPageShell } from '@/components/site/LegalPageShell';
// Props: title, eyebrow, lastUpdated, children (ReactNode)
```

---

## Tasks — Priority Order

### TASK 1: About page — Remove intro overlay, upgrade visual layout
**File**: `src/app/about/page.tsx`

The `PartnershipIntro` overlay fires on every About page visit and feels intrusive. Remove it. Also upgrade the visual quality:

1. Remove `PartnershipIntro` import, state, useEffect, and JSX usage entirely
2. Add `'use client'` stays, keep Framer Motion
3. Add a proper hero section before the image/text grid:
   - Full-width dark `#1F2628` banner, 50vh minimum height
   - Eyebrow: "About Sarah Fell"
   - Large serif h1: `"Building Ontario's industrial workforce, one right hire at a time."`
   - Subtle gold radial top-right
   - No image needed here — text only
4. The existing image + text grid (portrait + bio) becomes the second section on `#F4F2ED` bg
5. Keep the dark "What clients can expect" values section
6. Keep the employer/HR split cards section
7. Add an `editorial-rule` between the values section and split cards
8. Add a proper CTA section at bottom: dark `#1F2628`, serif h2 "Start the conversation.", two buttons: `btn-gold` → `/book-a-call` + `btn-outline` → `/hire-talent`

---

### TASK 2: Services page — Add font-serif to h1
**File**: `src/app/services/page.tsx`

The hero h1 "How we build teams." uses default body font. Fix:
```tsx
// Change line ~49:
<h1 className="mt-8 font-serif font-light text-[3.5rem] leading-[0.88] tracking-[-0.05em] md:text-[6rem] lg:text-[7.5rem]">
```

Also add `font-serif font-light` to the h2 titles inside each delivery model block (line ~109).

---

### TASK 3: Hire Talent page — Deeper visual polish
**File**: `src/app/hire-talent/page.tsx`

1. Add `font-serif` to the three `h2` titles in the `valueCards` grid
2. The `depth-inset` checklist sidebar is good — add a small `editorial-rule` above it
3. Add Framer Motion `whileInView` fade-up stagger to the three value cards (currently no animation)
4. After the main content sections, add a **Process preview** strip before `CallToActionPanel`:
   - Dark `#1F2628` background section
   - Eyebrow: "The search process"
   - h2: "Four steps. One recruiter. No handoffs."
   - 4 inline steps as flex row (stacked on mobile):
     1. Discovery — Role intake and brief alignment
     2. Search — Market outreach and candidate identification  
     3. Vetting — Structured screening against role criteria
     4. Placement — Offer management and close
   - Each step: gold number `01`–`04` in serif italic, then label, then body
   - `editorial-rule` divider below

---

### TASK 4: Find Work page — Candidate trust signals
**File**: `src/app/find-work/page.tsx`

1. Add `font-serif` to the three `h2` step titles
2. Add Framer Motion stagger to the three step cards
3. Replace the generic "Active roles" + "Resume path" text-only cards with a more visual layout:
   - Left card (`depth-plane`): Header "Browse active jobs" + body + a styled link row → `/jobs` with `ArrowRight` icon
   - Right card (`depth-inset`): Header "Submit your resume" + body + a styled link row → `/submit-resume`
   - Both cards should have a small gold eyebrow label

---

### TASK 5: Contact page — Verify fix + typography
**File**: `src/app/contact/page.tsx`

The duplicate `contactOptions` section was already removed. Verify the page now reads:
1. `PageHero`
2. `contactOptions` grid (once)
3. `ContactForm` centered
4. `CallToActionPanel`

Add `font-serif` to the three `h2` option titles. Add Framer Motion stagger to the cards.

---

### TASK 6: Legal pages — Verify shell component used correctly
**Files**: 
- `src/app/privacy/page.tsx`
- `src/app/terms/page.tsx`  
- `src/app/disclaimer/page.tsx`

These should already use `LegalPageShell`. Check each file. If any page has raw content without the shell, wrap it. The shell handles the typography hierarchy and max-width container.

If any legal page is just a stub with minimal content, add realistic placeholder body text for each section (Privacy: Data collected, How used, Cookies, Contact; Terms: Services, Limitations, Governing law; Disclaimer: No guarantee of results, Confidentiality).

---

### TASK 7: Jobs page client — Loading state polish
**File**: `src/app/jobs/JobsPageClient.tsx` (find this file)

The jobs page delegates to `JobsPageClient`. Read that component and ensure:
1. There is a proper empty state (no jobs currently posted) that looks intentional, not broken
2. Empty state text: eyebrow "Active Openings" + h2 "No roles posted right now." + body "New roles are added as they open. Submit your resume to stay connected for upcoming opportunities." + two buttons: Browse → `/submit-resume` and Contact → `/contact`
3. The empty state should use `depth-plane` card with `#F4F2ED` section bg
4. Do NOT invent fake job listings

---

### TASK 8: Insights page — Add editorial-rule dividers
**File**: `src/app/insights/page.tsx`

1. Add `font-serif font-light` to the h1
2. Add an `editorial-rule` between the hero section and the articles grid
3. The article cards currently have no read link — add a bottom row to each card with a muted "Read note →" link (using `ArrowRight` icon, `text-[#C6A64A]`) even though no article detail pages exist yet (link to `#` is fine)
4. Increase stagger delay to `i * 0.12` to match design system

---

### TASK 9: Case Studies page — h1 font-serif fix
**File**: `src/app/case-studies/page.tsx`

1. Add `font-serif font-light` to the h1
2. Add `editorial-rule` below the hero section
3. The outcome column is already gold-tinted — good. Verify all three cards render cleanly.

---

### TASK 10: Newsletter page — Visual upgrade
**File**: `src/app/newsletter/page.tsx`

1. Add `font-serif font-light` to the h1
2. The mail icon panel feels too plain. Replace the plain email link with a proper subscribe form placeholder:
   ```tsx
   <div className="space-y-4">
     <input 
       type="email" 
       placeholder="Your email address"
       className="w-full rounded-[16px] border border-black/12 bg-white/80 px-5 py-4 text-sm outline-none focus:border-[#C6A64A] focus:ring-2 focus:ring-[#C6A64A]/20 transition-all"
       disabled
     />
     <button className="btn-primary w-full justify-center py-5 text-sm" disabled>
       Join the list — coming soon
     </button>
     <p className="text-[10px] text-center text-black/40 leading-relaxed">
       Form setup in progress. Email <a href="mailto:Sarah.fell@staffingsolutionsbysarah.com" className="underline">Sarah.fell@staffingsolutionsbysarah.com</a> to subscribe directly.
     </p>
   </div>
   ```
3. Add `editorial-rule` divider between the two columns

---

### TASK 11: Book a Call page — Minor polish
**File**: `src/app/book-a-call/page.tsx`

1. Add `font-serif` to the h1 "Book a Strategy Call"
2. The three Clock3 icons all use the same icon — change to:
   - Item 1: `BookOpen` icon
   - Item 2: `Clock3` icon
   - Item 3: `Users` icon
3. Add breadcrumbs manually at top (no PageHero component — keep the existing sticky layout):
   ```tsx
   <p className="mb-8 text-[10px] font-semibold uppercase tracking-[0.22em] text-black/40">
     <Link href="/" className="hover:text-[#C6A64A] transition-colors">Home</Link>
     {' · '}
     Book a Call
   </p>
   ```

---

### TASK 12: Industry detail pages — Add Delivery Models list
**File**: `src/app/industries/[slug]/page.tsx`

After the "For Employers / For Candidates" cards, add a third section showing which delivery models are relevant:
```tsx
<section className="px-6 py-16 md:py-24" style={{ background: '#F4F2ED' }}>
  <div className="mx-auto max-w-[1380px]">
    <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#8B764C]">Delivery Options</p>
    <h2 className="mt-4 font-serif text-3xl font-light tracking-tight text-[#2C3434] md:text-4xl">
      How we typically support this sector
    </h2>
    <div className="editorial-rule mt-8 mb-10" />
    {/* 3-column grid: Direct Hire, Retained Search, Contract & Temp-to-Perm */}
    <div className="grid gap-6 md:grid-cols-3">
      {[
        { num: '01', title: 'Direct Hire', body: 'Full-time permanent placement with direct recruiter ownership.' },
        { num: '02', title: 'Retained Search', body: 'Priority search for executive and hard-to-fill roles.' },
        { num: '03', title: 'Contract & Temp-to-Perm', body: 'Flexible staffing for project coverage or interim needs.' },
      ].map((model) => (
        <div key={model.num} className="depth-plane p-8">
          <span className="font-serif text-3xl font-light text-[#C6A64A]/40">{model.num}</span>
          <h3 className="mt-3 font-serif text-xl font-light text-[#2C3434]">{model.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-black/60">{model.body}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

---

## Build Verification

After all tasks, run:
```bash
cd /Users/TTTG/JA/Claude/sfsite && npm run build
```

Expected output: `✓ Compiled successfully`, 42+ pages, zero errors. Fix any TypeScript errors before finishing.

---

## What NOT to Change

- `src/app/page.tsx` (home page) — already polished
- `src/components/home/GlobeHero.tsx` — rebuilt, do not touch
- `src/components/home/Preloader.tsx` — rebuilt, do not touch
- `src/components/home/ProcessSection.tsx` — rebuilt, do not touch
- `src/components/home/TestimonialsCarousel.tsx` — rebuilt, do not touch
- `src/components/home/TrustBlock.tsx` — rebuilt, do not touch
- `src/components/home/DeliveryModelsSection.tsx` — rebuilt, do not touch
- `src/app/globals.css` — design system, do not modify
- `src/components/Navbar.tsx` — complete, do not touch
- `src/components/Footer.tsx` — complete, do not touch
- Any file in `src/data/` — data layer, do not modify

---

## Copy & Tone Rules

- No invented statistics or metrics unless they already exist in the codebase
- Sarah's email: `Sarah.fell@staffingsolutionsbysarah.com`
- Company: "Staffing Solutions by Sarah Fell, Inc."
- Ontario-first framing throughout
- Headline copy = sentence case. Labels = ALL CAPS. 
- No exclamation marks in copy
- No buzzwords: "synergy", "revolutionary", "world-class", "cutting-edge"
- Tone: direct, confident, expert — like a senior recruiter briefing a hiring manager

---

*Handoff generated by main Claude agent after completing Steps 1–9 of the build plan.*
*Build verified: `npm run build` → 42 pages, 0 errors, 0 TypeScript warnings.*
