# Cornerstone Digital Agency

Marketing site for Cornerstone Digital Agency — websites, branding, digital
strategy, SEO and content. Built with Next.js (App Router), TypeScript,
Tailwind CSS and GSAP, following the supplied brand board.

## Stack

- **Next.js 14** (App Router) + **TypeScript** + **React 18**
- **Tailwind CSS**, with design tokens in `lib/design-system/tokens.ts`
- **GSAP** + ScrollTrigger, organised under `lib/gsap/`
- **Lucide React** icons
- **next/font** (Archivo) — one grotesque across the whole site, no runtime font CDN

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Design system

Palette is sampled from the brand board — warm paper, near-neutral ink, a
signal red, and an amber dot:

| Token | Value | Use |
| --- | --- | --- |
| `cream` / `cream-dark` | `#F2EFE9` / `#E8E4DC` | page grounds |
| `charcoal` | `#151515` | ink: type, dark sections, nav, footer |
| `muted` / `muted-light` | `#636363` / `#9A9A9A` | secondary text |
| `border` | `#DCD7CD` | hairlines |
| `accent` / `accent-deep` | `#F42B1C` / `#C4180C` | the signal red |
| `amber` | `#E8A22B` | decorative dots only |

Contrast rules the components rely on. Every one is measured against
**`cream-dark`, not `cream`** — the deeper paper is the binding case, and
checking only the lighter one is what let three of these drift below AA:

- **red on paper is 3.6:1** — large text, icons and graphics only, never a
  surface behind label-size text. Buttons are ink with a red arrow box, and
  where red *is* the ground (the promise panel) the type on it is ink at
  4.5:1, never cream at 3.5:1.
- **`accent-deep` is 4.8:1** on the deeper paper — the variant for anything at
  body size (form errors, step numbers, meta).
- **`muted` is 4.7:1** on the deeper paper, and is for **light grounds only**.
  On ink it measures 3.4:1, so every dark section carries `data-dark`, which
  swaps it for `muted-light` (6.5:1) through a single unlayered rule in
  `globals.css`. Mark a new dark section with `data-dark` and its secondary
  text is correct automatically.
- **amber is 1.8:1** — decorative dots only. Never text, never an icon.

Type is Archivo throughout, at multiple weights. Display and body are
separated by weight and tracking rather than by family, matching the board's
monolithic sans setting. Everything is square-cornered — `rounded-card` is 0.

Three motifs carry the identity (`components/visuals/Motifs.tsx`): the red
corner bracket, a small red square, and the amber dot.

### The neubrutalist half

Half of neubrutalism is taken and half is deliberately refused, so it reads as
a sharpened version of the board rather than a different site wearing its
colours. `edge` and `shadow` in `lib/design-system/tokens.ts` hold the values,
and the split is documented there.

**Taken** — hard offset shadows with zero blur (`shadow-brut`, and the
`-light` / `-red` variants for the grounds they sit on); structural ink borders
at 2–3px; a mechanical press that translates a control by exactly its own
shadow offset and drops the shadow, so it lands flat; heavy weights on labels,
buttons and figures; no blur or gradient anywhere.

**Refused** — the pop palette, anti-design asymmetry, uppercase-everything, and
rotation on anything but the one pricing badge.

The shadow colour follows the **ground, not the object**: an ink shadow is
invisible on a dark section, so anything on ink takes `shadow-brut-light`, and
`BrandImage` takes a matching `frame="ink" | "cream" | "none"`.

Canonical brutalism also specifies `transition: none`. That is refused too, and
the reason is worth knowing: instant state changes are a critical interaction
anti-pattern. Motion stays, made mechanical instead — 100ms, linear, which is
what `edge.press` encodes.

## Images

`components/visuals/BrandImage.tsx` owns the board's photo treatment —
grayscale, lifted contrast, a halftone dot screen, and a flat red shape offset
behind the subject.

Drop real photography into `public/images` named for its slot and rebuild —
that is the only step, no code change:

```
public/images/workspace.jpg     hero — designer at work
public/images/blocks.jpg        hand placing a red block on a stack
public/images/stone.jpg         the cornerstone
public/images/wireframes.jpg    sketching wireframes on a wall
public/images/screen.jpg        laptop showing the work
public/images/skyline.jpg       city skyline
public/images/tower.jpg         tower from below
```

`.jpg`, `.jpeg`, `.png`, `.webp` and `.avif` all resolve. Until a file exists,
the slot renders a geometric stand-in in the same language — deliberately
abstract rather than an attempt at the photographic subject, which at this
scale reads as a botched illustration rather than a placeholder.

Make sure you hold the rights to whatever imagery you place there.

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

The nav is the exception to the data-attribute system and is worth reading
before touching it. The menu icon is a pure CSS transition — a transition
always interpolates from the current computed value, so mashing the button
mid-morph redirects rather than snaps. It runs in two phases on separate
elements (slide, then pivot) because a single node can only hold one
`transform`, and the phases are mirrored on close: 180/260ms opening,
200/220ms closing. `lib/design-system/tokens.ts` owns both curves.

The overlay's tweens are all `.to()`, never `.fromTo()` — a `fromTo` jumps back
to its start values on the frame it begins, which is exactly the snap a fast
double-tap exposes. Rows are only re-armed to their entrance offset at the end
of a *completed* exit. And because `autoAlpha` parks an element at
`visibility: hidden`, the panel and its rows are unhidden synchronously before
the timeline builds; otherwise nothing inside can take focus.

## Content

All editable copy lives in `lib/data/`: `site.ts`, `services.ts`,
`caseStudies.ts`, `testimonials.ts`, `team.ts`, `pricing.ts`, `faq.ts`,
`blog.ts`, `metrics.ts`. Edit those rather than the components.

Metrics and case-study figures are illustrative composites, marked as such in
the data files and disclosed in the footer. Replace them with audited numbers
before launch.

## Design reference

`.claude/skills/` carries the
[ui-ux-pro-max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) plugin
(v2.13.0, MIT), installed by copying its skills in — `/plugin` is unavailable in
the web environment. Its searchable database is what the neubrutalist values
above are drawn from, and its accessibility checklist is what the QA sweep
audits against.

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "agency landing page" -d style
```

`ui-styling/canvas-fonts` (5.5MB of font binaries for canvas poster rendering)
is omitted; nothing here uses it.

## Not yet wired

The contact form is UI-only — validation, loading, success and error states
all work, but there is no backend. `components/forms/ContactForm.tsx` has the
POST commented in place of the simulated delay.
