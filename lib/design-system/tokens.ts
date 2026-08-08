/**
 * Single source of truth for the visual system.
 *
 * These values are mirrored as CSS custom properties in app/globals.css and
 * consumed through Tailwind's theme in tailwind.config.ts. Components should
 * reference the Tailwind names (bg-cream, text-muted, ...) rather than raw
 * hex, so a palette change happens in one place.
 */

export const color = {
  cream: "#F3EFE7",
  creamDark: "#E8E0D2",
  white: "#F8F6F1",
  charcoal: "#1B1A18",
  charcoal2: "#24211F",
  charcoal3: "#302C29",
  muted: "#77736B",
  mutedLight: "#A8A29A",
  border: "#D7D0C3",
  borderDark: "#3A3531",
  accent: "#F2A329",
  accentDeep: "#D8871A",
} as const;

/** Fluid display sizes. Paired with the serif face, tight leading. */
export const displayScale = {
  hero: "clamp(3.1rem, 7.4vw, 7.2rem)",
  xl: "clamp(2.6rem, 5.2vw, 5rem)",
  lg: "clamp(2.2rem, 4vw, 3.8rem)",
  md: "clamp(1.9rem, 3vw, 2.9rem)",
  sm: "clamp(1.6rem, 2.2vw, 2.1rem)",
  metric: "clamp(3rem, 5.6vw, 5.4rem)",
} as const;

export const motion = {
  /** Refined easings only — no bounce, no elastic. */
  ease: {
    power3: "power3.out",
    power4: "power4.out",
    expo: "expo.out",
    circ: "circ.out",
  },
  /** CSS equivalents for transition-based micro-interactions. */
  cssEase: {
    power3: "cubic-bezier(0.215, 0.61, 0.355, 1)",
    expo: "cubic-bezier(0.16, 1, 0.3, 1)",
  },
  duration: {
    micro: 0.3,
    hover: 0.5,
    text: 0.9,
    image: 1.25,
    transition: 0.6,
  },
  stagger: {
    tight: 0.08,
    normal: 0.12,
    loose: 0.16,
  },
} as const;

export const layout = {
  container: "1320px",
  containerNarrow: "880px",
} as const;
