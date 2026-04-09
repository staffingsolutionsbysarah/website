# Design System Document: The Industrial Editorial

## 1. Overview & Creative North Star
**Creative North Star: "The Architectural Curator"**
This design system moves away from the "database" feel of traditional recruitment and toward the aesthetic of a high-end architectural digest or a luxury industrial monograph. It celebrates the grit of industry through the lens of extreme refinement.

To break the "template" look, we utilize **Intentional Asymmetry**. Rather than perfectly centered grids, we use generous, offset white space to guide the eye. Overlapping elements—such as a `display-lg` headline bleeding over a `rounded-lg` image container—create a sense of physical depth and custom curation. This system is designed to feel "built," not just "rendered."

---

## 2. Colors
Our palette is a study in restrained masculine elegance. It uses earthy, industrial tones filtered through a high-end lens.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections. Boundaries must be felt, not seen. Use the transition from `surface` (#FAF9F6) to `surface-container-low` (#F4F3F1) to signal a new content area. 

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked, premium papers.
*   **Base:** `surface` (#FAF9F6) is your primary canvas.
*   **The Inset:** Use `surface-container-low` (#F4F3F1) for full-width editorial sections.
*   **The Card:** Use `surface-container-lowest` (#FFFFFF) for interactive elements sitting atop a stone background to create a "lifted" effect without heavy shadows.

### The "Glass & Gradient" Rule
For floating navigation or high-end overlays, use **Glassmorphism**. Apply `surface` at 80% opacity with a `24px` backdrop blur. For primary CTAs, avoid flat fills; use a subtle linear gradient from `primary` (#171F1F) to `primary-container` (#2C3434) at a 45-degree angle to provide a metallic, industrial sheen.

---

## 3. Typography
The tension between the high-contrast `Newsreader` serif and the technical precision of `Manrope` sans-serif defines our authority.

*   **Display (Newsreader):** Used for "Statement Typography." Set with tight letter-spacing (-0.02em) to emphasize the elegant thick-and-thin strokes of the serif. This is the "Voice of the Firm."
*   **Headlines (Newsreader):** Used for section titles. Ensure large vertical breathing room above and below.
*   **Title & Body (Manrope):** The "Voice of the Expert." Manrope provides a modern, geometric clarity that balances the serif’s romanticism.
*   **Labels (Manrope):** Always set in `label-md` or `label-sm` with slightly increased letter-spacing (+0.05em) and uppercase styling for a technical, "blueprinted" look.

---

## 4. Elevation & Depth
Depth is achieved through **Tonal Layering** and ambient physics, never through harsh black shadows.

*   **The Layering Principle:** To highlight a candidate profile or job card, do not draw a box. Instead, place a `surface-container-lowest` card on a `surface-container` background. The subtle shift from ivory to pure white creates a natural, soft lift.
*   **Ambient Shadows:** If a floating element (like a modal) requires a shadow, use the `on-surface` color (#1A1C1A) at 4% opacity with a `40px` blur and `12px` Y-offset. It should feel like a soft glow of light blocked by a heavy object.
*   **The "Ghost Border" Fallback:** If a divider is mechanically necessary (e.g., in a complex data table), use the `outline-variant` (#C3C7C7) at **15% opacity**.
*   **Curvature:** Use the `lg` (1rem) token for images and the `md` (0.75rem) token for interactive containers. This "soft rounding" removes the clinical edge of industrial design while maintaining a professional structure.

---

## 5. Components

### Buttons
*   **Primary:** Gradient fill (Primary to Primary-Container), white text, `md` corner radius. High-end motion: On hover, the button scales by 1.02x with a slow ease-out.
*   **Secondary:** `on-secondary-container` text on a `secondary-fixed-dim` background. No border.
*   **Tertiary:** Text-only in `secondary`, with a `2px` underline in `tertiary-container` (Gold) that expands on hover.

### Cards & Lists
*   **Editorial Cards:** Forbid divider lines. Use a `1.5rem` (xl) vertical gap between list items. Use a small `tertiary` (Gold) accent square or icon to denote the start of a list item instead of a bullet.
*   **Input Fields:** Use `surface-container-high` for the field fill. The label should sit in `label-md` comfortably above the field, never inside it.

### Editorial Motion
*   **Arrivals:** As the user scrolls, elements should not "pop" in. Use a `30px` vertical slide-in combined with a `fade-in` over 600ms.
*   **Focus:** Interactive elements (cards/buttons) should use a subtle `scale-up` (1.01x) to signal reactivity.

---

## 6. Do's and Don'ts

### Do:
*   **Do** use massive margins. If you think there is enough white space, add 20% more.
*   **Do** mix font weights—use a `display-lg` Newsreader headline next to a `label-md` Manrope sub-tag in Gold.
*   **Do** allow images to be asymmetrical. A tall portrait image can break the grid of a horizontal text block.

### Don't:
*   **Don't** use 100% black. Use `primary` (#171F1F) for all dark elements to maintain the charcoal warmth.
*   **Don't** use standard "drop shadows" or 1px borders. If you can't see the section shift, adjust the background tone, not the border.
*   **Don't** crowd the "Gold" accent. Use it sparingly for call-to-actions and high-level markers to maintain its "premium" status.