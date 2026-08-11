# Cornerstone — Operations Consulting

A premium editorial marketing site for an operations consultancy, built with
Next.js (App Router), TypeScript, Tailwind CSS and GSAP.

## Stack

- **Next.js 14** (App Router) + **TypeScript** + **React 18**
- **Tailwind CSS**, with design tokens in `lib/design-system/tokens.ts`
- **GSAP** + ScrollTrigger, organised under `lib/gsap/`
- **Lucide React** icons
- **next/font** (Instrument Serif + Instrument Sans) — no runtime font CDN

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Design system

Palette is sampled from the hero collage — cream paper, warm near-black ink,
and one pure red:

| Token | Value | Use |
| --- | --- | --- |
| `cream` / `cream-dark` | `#EDE4D2` / `#E4D9C3` | page grounds |
| `charcoal` | `#14110F` | ink: type, dark sections, nav, footer |
| `muted` / `muted-light` | `#6E665B` / `#A69C8C` | secondary text |
| `border` | `#D2C6AE` | hairlines |
| `accent` / `accent-deep` | `#E5231B` / `#C2160F` | punctuation only |

**Red is never a surface for text.** Cream-on-red measures 3.4:1 and
ink-on-red 4.3:1, both short of WCAG AA at label size. Red appears as the
eyebrow rule, large step numbers, icons, and the small box behind button
arrows — all of which only need 3:1. `accent-deep` (4.55:1 on cream) is the
variant for anything at body size, such as form errors.

Type is Instrument Serif for display and Instrument Sans for interface and
data — a designed-together superfamily.

## The hero artwork

`components/visuals/HeroCollage.tsx` looks for a real image at:

```
public/images/hero-collage.png   (or .jpg / .jpeg / .webp)
```

**Drop the file in and rebuild — that is the only step.** The component
checks for it on the server at build time and switches to `next/image`
automatically; no code change is needed.

Until then it renders a procedural stand-in in the same visual language
(stippled profile, staircase, red disc, stippled galaxy). The stand-in exists
so the layout holds and the preview isn't empty — it is not a reproduction of
the intended artwork.

Make sure you hold the rights to whatever image you place there before the
site goes live.

## Other imagery

Section imagery (`components/visuals/ArchitecturalImage.tsx`) is likewise
generated rather than photographed, because this build had no network access
to fetch licensed photography. Aspect ratios, crops and reveal wrappers are
already sized for `next/image`, so swapping in real photography is a local
change per usage site.

## Motion

Sections stay Server Components and declare intent with data attributes;
`components/motion/MotionController.tsx` reads them and builds every animation
inside one `gsap.context()`.

| Attribute | Effect |
| --- | --- |
| `data-reveal` | fade + rise (`left` / `right` / `scale` / `fade` variants) |
| `data-reveal-group` | staggers descendants under one ScrollTrigger |
| `data-reveal-lines` / `data-reveal-line` | line-by-line display-type reveal |
| `data-image-reveal` | clip-path open + scale settle |
| `data-parallax` | scrubbed drift (≥1024px only) |
| `data-counter` | count-up on entry |
| `data-hover-card` | coordinated hover timeline (fine pointers only) |

Two rules worth knowing before editing motion:

1. **Never set `transform` in a CSS pre-state for an element GSAP animates.**
   GSAP treats an existing transform as a baseline and composes onto it, so
   the tween lands offset by whatever CSS declared. Pre-states hide with
   `opacity` only.
2. **One tween per element per transform.** Two tweens writing transform on
   the same node compose rather than override — that's why the hero visual has
   separate drift and scale wrappers.

Content is visible in the served HTML and only hidden once an inline pre-paint
script adds `.js-motion`, which never runs under `prefers-reduced-motion` or
with JS disabled.

## Content

All editable copy lives in `lib/data/`: `site.ts`, `services.ts`,
`caseStudies.ts`, `testimonials.ts`, `team.ts`, `pricing.ts`, `faq.ts`,
`blog.ts`, `metrics.ts`. Edit those rather than the components.

Metrics and case-study figures are illustrative composites, marked as such in
the data files and disclosed in the footer. Replace them with audited numbers
before launch.

## Not yet wired

The contact form is UI-only — validation, loading, success and error states
all work, but there is no backend. `components/forms/ContactForm.tsx` has the
POST commented in place of the simulated delay.
