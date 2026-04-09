# Design System Strategy: High-End Editorial

## 1. Overview & Creative North Star

### Creative North Star: "The Architectural Curator"
This design system moves away from the "software-as-a-service" aesthetic toward a "bespoke consultancy" experience. It is rooted in the concept of **Architectural Curation**—where every element is placed with the intentionality of an art gallery or a high-end architectural firm. 

The system rejects the standard rigid grid in favor of a **Layered Editorial Layout**. We achieve this through:
*   **Intentional Asymmetry:** Off-setting text and imagery to create visual tension and interest.
*   **Breathable Luxury:** Massive use of white space (`surface` and `surface-container-lowest`) to signal "Quiet Luxury."
*   **Industrial Credibility:** Pairing the warmth of ivory and sage with the structural weight of charcoal and gold.

---

## 2. Colors & Surface Philosophy

The palette is anchored in environmental tones—Sage, Charcoal, and Ivory—providing a sense of grounded, industrial authority.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections or containers. 
*   **Separation through Tonal Shift:** Define a section transition by moving from `surface` (#FAF9F6) to `surface-container-low` (#F4F3F1).
*   **Subtle Elevation:** Content blocks should be distinguished by color blocks, never by lines. This ensures the interface feels like a cohesive document rather than a fragmented app.

### Surface Hierarchy & Nesting
Treat the UI as physical layers of premium cardstock.
*   **Base:** `surface` (#FAF9F6).
*   **Content Sections:** `surface-container-low` (#F4F3F1).
*   **High-Priority Cards:** `surface-container-lowest` (#FFFFFF) placed on top of `surface-container-low` to create a crisp, "lifted" feel.

### The "Glass & Gold" Rule
*   **Glassmorphism:** For floating elements like sticky headers or overlay modals, use a 70% opacity version of `surface` with a 20px backdrop-blur. This softens the transition between layers.
*   **Signature Textures:** Use the Gold accent (`tertiary-container` / #C6A64A) only for micro-interactions (hover states on icons) or a single high-impact "signature line" at the top of a page.

---

## 3. Typography

The typography scale is designed to mimic a high-end B2B journal. It balances the "humanity" of a serif with the "precision" of a modern sans-serif.

*   **Display & Headlines (Newsreader):** The Serif is our voice of authority. Use `display-lg` for hero statements. Tighten the letter-spacing slightly (-0.02em) to give it a custom, editorial feel.
*   **Body & Labels (Manrope):** The Sans-Serif is our voice of efficiency. Use `body-lg` for general reading. For `label-sm` (used in meta-data), increase letter-spacing (+0.05em) and use uppercase to evoke a "blueprint" or industrial marking style.

**Hierarchy Goal:** Large, Serif headlines should dominate the page, while Sans-Serif body text remains tucked into structured, narrow columns to maintain the "Consultant’s Report" aesthetic.

---

## 4. Elevation & Depth

We eschew "material" depth for **Tonal Layering**.

*   **The Layering Principle:** Depth is achieved by "stacking." A `primary-container` (Dark Sage) block can overlap two different surface tones to create a sense of three-dimensional space without using shadows.
*   **Ambient Shadows:** If a card must float (e.g., a "Apply Now" drawer), use an ultra-diffused shadow:
    *   `box-shadow: 0px 20px 40px rgba(44, 52, 52, 0.06);`
    *   The shadow is a tinted version of our Charcoal (`on-surface`), ensuring the light feels natural and atmospheric.
*   **The Ghost Border Fallback:** Only where accessibility requires it, use a 1px border using `outline-variant` at **15% opacity**. It should be barely perceptible.

---

## 5. Components

### Buttons
*   **Primary:** Solid `primary` (#344B47) with `on-primary` text. Shape: `md` (0.375rem). No shadow.
*   **Secondary:** Ghost-style with a `primary` label. No border. On hover, apply a `surface-container-high` background transition.
*   **Tertiary (Signature):** `body-sm` bold text in `tertiary` (Gold) with a 1px Gold underline that expands on hover.

### Input Fields
*   **Styling:** Do not use four-sided boxes. Use a `surface-container-low` background with a 2px bottom-border only in `outline`.
*   **Focus State:** The bottom border transitions to `tertiary` (Gold).

### Cards & Lists
*   **Card Containers:** Use `surface-container-highest` for background.
*   **Forced Spacing:** Instead of dividers, use a minimum of `2rem` vertical space between list items. Use the `title-sm` (Manrope) for list headers to maintain professional rigor.

### Immersive Components
*   **The "Curated Quote":** An editorial block using `display-sm` (Newsreader) in `primary`, centered with significant padding (80px+) and no containing box.
*   **Industrial Stats:** Large numbers in `primary` paired with small uppercase labels in `secondary`.

---

## 6. Do’s and Don’ts

### Do
*   **Do** use asymmetrical margins. For example, a headline might be offset 10% from the left, while the body text is offset 20%.
*   **Do** use the Sage Green (`primary-container`) as a full-bleed background for high-impact transition sections.
*   **Do** use high-quality, desaturated industrial or professional photography that mirrors the Sage/Charcoal palette.

### Don’t
*   **Don’t** use black (#000000). Use Charcoal (#2C3434) for all "black" needs to maintain the soft, luxury feel.
*   **Don’t** use standard icons. Use "thin-stroke" custom SVG icons that match the weight of the Manrope typeface.
*   **Don’t** use bright, saturated colors. If an error state is needed, use the muted `error` token (#BA1A1A) to ensure it doesn't break the "Quiet Luxury" atmosphere.
*   **Don't** use sharp 90-degree corners. Everything must have at least a `sm` (0.125rem) or `md` (0.375rem) radius to feel approachable.