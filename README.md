# Halyard — AI Systems & Automation Studio

A premium, editorial marketing site for an AI automation / digital systems
consultancy, built with Next.js (App Router), TypeScript, Tailwind CSS, and
GSAP. Design direction takes cues from high-end consulting/agency sites —
warm neutral palette, oversized editorial typography, asymmetric layouts,
restrained motion — rather than a typical glowing-gradient "AI SaaS" look.

## Stack

- **Next.js 14** (App Router) + **TypeScript** + **React 18**
- **Tailwind CSS** for styling, with design tokens in `tailwind.config.ts`
- **GSAP** (+ ScrollTrigger) for the hero timeline, scroll-driven metric
  counters, and process-step progression; most other reveals use a
  lightweight CSS + IntersectionObserver hook (`lib/animations/gsap-utils.ts`)
  to keep GSAP out of the critical path
- **Lucide React** for icons
- **next/font** (Manrope + Newsreader) — no external font CDN calls at runtime

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (25 statically generated routes)
npm run start    # serve the production build
```

## Content

All editable copy lives under `lib/data/*.ts` — site info & nav
(`site.ts`), services (`services.ts`), case studies (`case-studies.ts`),
testimonials, team, pricing tiers, FAQ, blog posts, and homepage metrics.
Update those files rather than the components to change content.

## Imagery

This build has no network access to license real photography, so every
"photo" slot renders an abstract editorial composition instead — a warm
duotone field, fine grain, and a restrained line drawing
(`components/visuals/PlaceholderVisual.tsx` and `HeroVisual.tsx`). Swap
these for real photography via `next/image` when licensed images are
available; aspect ratios and crop treatments are already set up for it.

## Structure

```
app/                  routes (home, services, case-studies, pricing, contact, blog, privacy, terms, 404)
components/
  layout/              header, mobile menu (portaled), footer
  hero/                homepage hero
  sections/            reusable page sections (metrics, process, FAQ, CTA, ...)
  cards/                service / case-study / team / pricing cards
  buttons/, faq/, testimonials/, forms/, motion/, visuals/, ui/
lib/
  data/                editable content
  animations/          GSAP utilities + reveal hooks
```

## Notes

- Metrics on the homepage and one case study's figures are marked
  illustrative in the data files — swap in real numbers once available.
- The contact form is UI-only (no backend wired up yet); it simulates a
  submission locally. Wire `ContactForm.tsx`'s `handleSubmit` to a real
  endpoint before launch.
