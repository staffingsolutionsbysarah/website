# CLAUDE.md - Sarah Fell Website AI Agent Instructions

## Project Overview
This repository powers the Staffing Solutions by Sarah website — a recruitment-focused business development site for Ontario employers and candidates.

**Live Site:** https://sarah-fell-website-vercel-clone.vercel.app  
**GitHub Org:** https://github.com/staffingsolutionsbysarah

---

## 🎨 BRAND COLORS

### Core Palette (Primary)
| Color | Hex | Usage |
|-------|-----|-------|
| Charcoal | `#2C3434` | Primary dark, text, headers |
| Gold | `#C6A64A` | Primary accent, highlights, CTAs |
| Brand Green | `#3D7A65` | Secondary accent |

### Extended Palette (Earth Tones)
| Color | Hex | Usage |
|-------|-----|-------|
| Espresso Brown | `#4A3B34` | Dark sections, footer |
| Soft Mushroom Taupe | `#B5A79A` | Muted backgrounds |
| Parchment Ivory | `#F5EEDF` | Warm light surfaces |
| Muted Clay Beige | `#CBB8A3` | Subtle fills |
| Aged Brass Highlight | `#A8894E` | Gold alternative accent |
| Dusty Bronze | `#8A6F58` | Warm accents |
| Crease | `#BFB39C` | Soft beige backgrounds |
| Khaki | `#C3B091` | Dividers, borders |
| Stone Veil | `#B7ADA3` | Borders, secondary text |
| Champagne Haze | `#D8C6AE` | Soft highlights |
| Smoked Umber | `#4E433B` | Dark text alternative |

**Flexibility:** These are guidelines. AI can suggest complementary additions (warm neutrals, muted greens, etc.) but core brand identity must remain recognizable.

---

## 📐 DESIGN DIRECTION

### Visual Style
- **Industrial luxury, editorial, cinematic**
- Think: Architectural consultancy meets recruitment expertise
- Clean lines, intentional asymmetry
- Premium feel without being sterile

### Animation Philosophy
- Smooth, cinematic transitions
- Scroll-triggered reveals with stagger
- Parallax depth layers
- Liquid glass effects
- GSAP + Framer Motion
- No abrupt animations — everything flows

### Typography
- **Headings:** Cormorant (serif)
- **Body:** Manrope (sans-serif)

---

## 🔗 REFERENCE SITES

### Design Inspiration
- `thomasmamfredas.com` — Cinematic scroll storytelling, full-bleed imagery
- `jordangilroy.com` — Smooth section reveals, minimalist elegance
- `21st.dev` — Gallery-quality design, premium interactions
- `godly.website` — Scroll effect patterns, creative transitions

### Functionality Reference
- `codegridpro.com` — GSAP horizontal scroll with sticky pinning
- `igniterec2rec.com` — Scroll-stop behavior

---

## 🚫 CONSTRAINTS

### DO NOT CHANGE
- Core brand colors (charcoal, gold, brand green)
- Primary fonts (Cormorant for headings, Manrope for body)
- Hero headline/copy
- Section order and structure
- Overall brand positioning

### DO NOT
- Add competing accent colors that clash with earth tones
- Introduce decorative fonts or playful typography
- Remove scroll animations or parallax effects
- Make changes that reduce premium/luxury feel
- Break mobile responsiveness
- Change the buyer-facing nature of the site

---

## ✅ GUIDANCE

### AI CAN
- Suggest additional earth-tone accents that harmonize with existing palette
- Propose animation variations within the GSAP/Framer Motion framework
- Recommend micro-interactions that enhance UX
- Offer layout refinements that improve visual hierarchy
- Suggest copy tweaks that improve conversion (within brand voice)
- Add new sections that enhance scroll experience

### Brand Voice
Direct, recruiter-led, buyer-aware, professional. Not fluffy or generic.

---

## 📁 ASSETS

### Images (in `public/images/`)
```
hero-employer-hiring-toronto.png
hero-industrial-manufacturing-ontario.png
hero-ontario-toronto-skyline.png
hero-trades-construction-plans.png
industrial-trades-blueprints.png
industrial-factory-control-panel.png
retail-supermarket-teamwork-ontario.png
location-windsor-ambassador-bridge.png
location-london-ontario-king-street.png
business-planning-strategy-flatlay.png
portrait-sarah-fell-recruitment.png
texture-emerald-leather-dark.png
texture-white-marble-carrara.png
```

### Logos (in `public/` or `public/brand/`)
- `logo-mark.svg` — Logo mark
- `S-logo-sf.png` — Favicon/logo

---

## 🗺️ SITE MAP

### Main Navigation
```
/ (Home)
├── /hire-talent
├── /find-work
├── /services
├── /industries
├── /locations
├── /about
└── /book-a-call (CTA)
```

### Hub Pages
```
/industries
├── /industries/manufacturing-skilled-trades
├── /industries/food-grocery-retail
├── /industries/construction
├── /industries/finance-accounting
├── /industries/it-technology
├── /industries/sales-marketing
└── /industries/administrative-support

/locations
├── /locations/vaughan
├── /locations/toronto-gta
├── /locations/belleville
├── /locations/chatham-kent
└── /locations/windsor
```

### Conversion Pages
```
/book-a-call
/contact
/submit-resume
```

### Authority Pages
```
/insights
/case-studies
/our-process
/about
```

---

## 🏗️ TECH STACK

### Current
- **Frontend:** Next.js + TypeScript + Vercel
- **Animations:** GSAP + Framer Motion
- **Styling:** Tailwind CSS
- **Fonts:** Cormorant (headings), Manrope (body)

### Future Integration
- **PocketBase** — Database, storage, auth
- **Make.com** — Workflow automation
- **Common Room** — Visitor intelligence
- **Linear** — ATS / candidate tracking
- **Cal.com** — Scheduling

---

## 📋 WORKFLOW

### Making Changes
1. Make changes to code
2. Commit with descriptive message
3. Push to GitHub — Vercel auto-deploys

### Before Any Edit
1. Identify actual files involved
2. Identify what must remain untouched
3. Classify task: NEW / UPDATE / REDO

### Before Finishing
- Run `npm run build` to verify
- Check no locked items changed
- Verify mobile responsiveness
- Ensure build passes

---

## 🔒 SECRETS MANAGEMENT

Never commit to GitHub:
- `.env` files
- API keys
- Database credentials
- Auth tokens

Use Vercel Environment Variables for secrets.

---

## 📞 EXTERNAL LINKS

- **LinkedIn:** https://www.linkedin.com/in/sarah-fell-3b8a5810
- **Vercel:** Connected to GitHub
- **Domain:** staffingsolutionsbysarah.com (Netfirms)

---

## 📝 VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-04-16 | Initial AI Studio instructions |
