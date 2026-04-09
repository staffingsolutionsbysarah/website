# Design System Specification: Industrial Prestige Editorial

## 1. Overview & Creative North Star

### Creative North Star: "The Architectural Curator"
This design system rejects the ephemeral, "clicky" nature of modern SaaS interfaces in favor of a permanent, authoritative editorial presence. It is inspired by high-end architectural journals and precision industrial engineering. 

We break the "template" look through **intentional asymmetry** and **tonal depth**. The interface should feel like a curated workspace where information isn't just displayed, but "installed." We achieve this by moving away from rigid, centered grids and instead utilizing weighted layouts where large serif typography anchors the eye, while sharp sans-serif data points provide industrial clarity.

## 2. Colors

The palette is rooted in heritage and stability. It utilizes deep, heavy tones balanced by a warm, breathable foundation.

### Palette Strategy
*   **Primary Charcoal (#2C3434):** Used for primary surfaces and high-authority text. It provides the "Industrial" weight.
*   **Deep Sage (#4B635E):** Our "Professional Neutral." Used for secondary actions and environmental backgrounds to soften the starkness of charcoal.
*   **Gold Accents (#C6A64A):** To be used sparingly as a "Master Craftsman’s Mark." It identifies critical path actions and premium callouts.
*   **Surface Background (#FAFAFA):** A warm off-white that prevents the "clinical" feel of pure white, providing an editorial, paper-like quality.

### The "No-Line" Rule
Designers are prohibited from using 1px solid borders for sectioning. Boundaries must be defined through **background color shifts**. For example, a `surface-container-low` section should sit directly against a `surface` background. The change in tone is the divider.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of fine materials. 
*   **Level 0 (Surface):** The base "paper."
*   **Level 1 (Surface-Container-Low):** Large content blocks.
*   **Level 2 (Surface-Container-Highest):** Interactive cards or floating panels.
By nesting a `surface-container-lowest` card inside a `surface-container-low` section, we create a soft, natural lift that feels architectural rather than digital.

### The "Glass & Gradient" Rule
To add visual "soul," use subtle linear gradients (e.g., `primary` to `primary-container`) on large buttons or hero backgrounds. For floating navigation or over-image overlays, apply **Glassmorphism**: use semi-transparent surface colors (60-80% opacity) with a `20px` backdrop-blur to allow the rich industrial imagery to bleed through the UI.

## 3. Typography

The typography is a dialogue between the "Established Recruiter" (Serif) and the "Precision Engineer" (Sans-Serif).

*   **Display & Headlines (Newsreader):** These must be set with tight letter-spacing and generous line heights. The serif is our voice of authority and prestige.
*   **Title & Body (Plus Jakarta Sans):** A high-contrast sans-serif that provides "Industrial Credibility." It should be used for data, labels, and instructional text where legibility is paramount.

**Hierarchy Intent:** Use `display-lg` for curated statements, often set in asymmetrical layouts (e.g., left-aligned with a wide right margin) to create white space that feels expensive.

## 4. Elevation & Depth

### The Layering Principle
Depth is achieved through **Tonal Layering**. Avoid traditional shadows where possible. Instead, "stack" your tokens. A card should feel like it is resting on a surface because it is a different shade of grey/white, not because it has a black shadow.

### Ambient Shadows
When a floating effect is mandatory (e.g., a modal or a primary CTA), use **Ambient Shadows**. 
*   **Blur:** 40px - 60px.
*   **Opacity:** 4% - 8%.
*   **Color:** Use a tinted version of `on-surface` (e.g., a very dark Sage) rather than pure black to keep the light feeling natural.

### The "Ghost Border" Fallback
If a container requires a border for accessibility (e.g., input fields), use the **Ghost Border**: the `outline-variant` token at **15% opacity**. 100% opaque, high-contrast borders are strictly forbidden.

## 5. Components

### Buttons
*   **Primary:** `primary-container` background with `on-primary` text. Softly rounded (`0.5rem`). No border.
*   **Secondary:** `secondary-container` background.
*   **Tertiary:** Ghost style. No background, `primary` text, with a `gold` underline on hover to signify "Editorial Prestige."

### Input Fields
*   **Styling:** Background-fill using `surface-container-low`. 
*   **Border:** A bottom-only "Ghost Border" (1px at 20% opacity).
*   **State:** On focus, the bottom border transitions to `tertiary` (Gold).

### Cards & Lists
*   **Rule:** Forbid divider lines. 
*   **Implementation:** Separate list items using the `8px` or `16px` spacing scale. Use a subtle background hover state (`surface-container-high`) to define the interactive area. 
*   **Layout:** Cards should use `xl` (1.5rem) or `lg` (1rem) roundedness to soften the industrial "Prestige."

### Premium Component: The "Insight Badge"
Small, `gold` accented badges (e.g., "Sarah's Insight") that float over imagery using Glassmorphism. These act as recruiter-led annotations, reinforcing the brand's professional expertise.

## 6. Do's and Don'ts

### Do:
*   **Do** use overlapping elements (e.g., an image overlapping two different colored background sections) to break the grid.
*   **Do** use high-quality, desaturated industrial photography.
*   **Do** leverage large amounts of white space to signal "Prestige."

### Don't:
*   **Don't** use "Techy" gradients (vibrant purples/blues). 
*   **Don't** use drop shadows with high opacity. It makes the design look dated and "SaaS-like."
*   **Don't** use standard icons. Opt for thin-stroke, custom industrial iconography.
*   **Don't** center-align everything. Editorial design lives in the tension of asymmetrical layouts.