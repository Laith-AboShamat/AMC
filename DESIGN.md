# Reusable Design Brief

## Purpose

Use this file as a portable design brief for landing pages, portfolio sites, and service-led product marketing sites. It captures a visual system that feels editorial, premium, and controlled without locking you into one brand name or one exact industry.

The core direction is: build something that feels deliberate, high-trust, and slightly architectural rather than generic SaaS.

## Creative North Star

Design for "editorial authority."

That means:

- Use asymmetry on purpose. Avoid overly rigid, evenly split layouts unless the content is operational or data-heavy.
- Let spacing do part of the branding. The interface should feel calm because elements have room to breathe.
- Prefer tonal layering over obvious decoration. The page should feel composed, not busy.
- Treat each section like a distinct material plane, not a stack of bordered boxes.
- Keep the mood intelligent and composed rather than playful, glossy, or hyper-animated.

## Visual Personality

This system works best when the product or company should feel:

- credible
- strategic
- polished
- premium
- restrained
- modern without looking trendy

It is a poor fit for brands that need to feel loud, youthful, chaotic, or cartoonish.

## Color System

Start with a dark anchor color, a muted supporting tone, and a layered neutral system.

Suggested base tokens:

```text
--color-primary: #011844;
--color-primary-soft: #1a2e5a;
--color-secondary: #4a5d8b;
--color-surface: #f7f9fc;
--color-surface-low: #f2f4f7;
--color-surface-lowest: #ffffff;
--color-text: #191c1e;
--color-text-muted: #445066;
--color-outline: rgba(1, 24, 68, 0.15);
--color-accent-warm: #c9a86a;
```

### Rules

- Do not use pure black for body text. Keep text slightly softened.
- Do not use visible section dividers by default. Separate sections with surface changes, spacing, or tonal contrast.
- Use gradients sparingly and only where they add depth to hero areas, overlays, or calls to action.
- If the brand needs a warmer expression, introduce one controlled accent color rather than multiple saturated accents.

### Surface Hierarchy

- `surface` is the page canvas.
- `surface-low` is for grouped content blocks.
- `surface-lowest` is for cards, floating panels, and high-focus content.
- `primary` and `primary-soft` are for emphasis, not for painting the whole interface.

## Typography

Use a two-family system when possible: one display face with character, and one practical text face.

Recommended approach:

- Display: elegant serif or refined geometric sans.
- Body: neutral sans that stays readable in dense layouts.

Example pairing:

- Display: Baskervville, Fraunces, or Manrope
- Body/UI: Inter, DM Sans, or Cairo for Arabic support

### Hierarchy

- Hero headlines should feel editorial, not app-like.
- Section labels can be small, uppercase, and lightly tracked if the language supports it.
- Body copy should stay compact and readable, usually in the 16px to 18px range.
- Use stronger contrast in scale before using stronger contrast in color.

### Multilingual Notes

- If Arabic is supported, swap to a more suitable Arabic family like Cairo instead of forcing Latin typography rules.
- Reduce or remove artificial letter spacing in Arabic.
- Avoid uppercase-dependent styling for Arabic interfaces.

## Layout Principles

### Asymmetry

- Favor offset compositions: text block left, media or accent block right.
- Let one item in a grid break the rhythm through span, contrast, or vertical emphasis.
- Keep alignment disciplined even when the layout is asymmetrical.

### Spacing

- Generosity is part of the aesthetic.
- Section padding should feel slightly more generous than expected.
- When a layout looks correct but still ordinary, add space before adding decoration.

### Section Construction

- Alternate section density so the page breathes.
- Use full-bleed tonal areas to reset the eye between content-heavy sections.
- Cards should sit on quieter backgrounds so contrast comes from structure, not noise.

## Depth, Texture, and Motion

### Depth

Depth should come from tonal contrast first.

- Put bright cards on slightly darker neutral surfaces.
- Use large, diffuse shadows only for floating elements.
- Use thin outline treatment only when contrast needs help.

Suggested shadow:

```text
0 12px 40px rgba(1, 24, 68, 0.06)
```

### Texture

- Use subtle radial gradients or soft highlight blooms in hero areas.
- Avoid noisy patterns, hard mesh gradients, or excessive glass effects.
- Background detail should disappear into the composition, not become the composition.

### Motion

- Keep motion minimal and structural.
- Prefer fade, lift, and gentle translate effects over bounce, spin, or oversized scaling.
- Hover states should sharpen focus rather than entertain.

## Component Guidance

### Buttons

- Primary button: solid dark fill, light text, medium corner radius.
- Secondary button: tonal surface fill with no heavy border.
- Tertiary button: text-led treatment with a subtle underline, bottom bar, or directional accent.

### Cards

- Avoid card overload. Use cards when grouping genuinely separate ideas.
- Prefer spacing between items over divider lines.
- Hover states can slightly lift the card or intensify the background tone.

### Navigation

- Keep top navigation light and understated.
- Floating or sticky headers can use translucent light surfaces with backdrop blur.
- Navigation should feel precise, not bulky.

### Inputs

- Use filled neutral surfaces rather than stark outlined inputs.
- Reveal stronger outlines on focus only.
- Keep radii tighter than on marketing-heavy consumer UIs.

### Metrics and Progress

- Use sharp, simple markers for process and milestones.
- Prefer bars, rectangular steps, or disciplined numeric callouts over playful badges.

## Copy Tone

This visual language works best with copy that is:

- clear
- confident
- direct
- low-hype
- outcome-focused

Avoid marketing copy that sounds inflated, vague, or aggressively trendy.

Good pattern:

- state the operational or strategic value
- explain the mechanism briefly
- end on the real outcome

## Accessibility Baseline

- Maintain strong text contrast on all surface combinations.
- Ensure hover-only affordances also have focus-visible states.
- Do not rely on color alone to signal meaning.
- Respect reduced-motion preferences for reveals and hover transitions.
- Keep interactive targets comfortably sized on mobile.

## Implementation Notes

If you are porting this brief into another repo, keep these translation rules:

- Convert the color system into CSS variables or theme tokens first.
- Pick the typography pair before building components.
- Establish surface tokens before designing sections.
- Recreate the layout attitude with spacing and section contrast before adding any special effects.
- If the new repo already has a design system, map these ideas to existing tokens instead of duplicating them.

## Do

- Use tonal shifts instead of borders for most section separation.
- Build hero sections with one strong headline, one supporting paragraph, and one visual anchor.
- Let one section per page feel more dramatic than the others.
- Keep corners restrained and intentional.
- Make the design feel expensive through discipline, not decoration.

## Don't

- Do not stack every idea into isolated cards.
- Do not use default SaaS gradients, oversized pills, or excessive blur.
- Do not mix too many accent colors.
- Do not rely on heavy shadows to create hierarchy.
- Do not let animations become the personality of the page.

## Fast Adaptation Checklist

Before using this file in another repo, replace or confirm these items:

1. Brand name and product positioning.
2. Primary color, warm accent, and neutral surface palette.
3. Display font and body font.
4. Whether the product needs bilingual support.
5. Whether the tone should lean more editorial, more technical, or more luxurious.
6. Which section types the new site actually needs: hero, services, proof, methodology, outcomes, contact.

## One-Sentence Prompt Version

If you need to hand this to another designer or agent quickly, use this:

> Design a premium editorial marketing site with asymmetrical layouts, soft neutral surfaces, restrained navy-led contrast, elegant typography, minimal motion, and hierarchy created through spacing and tonal layering instead of borders.