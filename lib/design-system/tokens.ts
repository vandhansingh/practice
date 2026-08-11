/**
 * Single source of truth for the visual system.
 *
 * The palette is sampled from the hero collage: warm cream paper, a warm
 * near-black ink, and one pure red. Red is punctuation only — in the artwork
 * it appears exactly once, as the disc, and the site keeps that discipline:
 * it marks eyebrow rules, step numbers and a single graphic motif, and is
 * never a surface for body text.
 *
 * Key names are deliberately unchanged from the previous palette so the whole
 * component tree keeps working; only the values moved.
 *
 * Mirrored as CSS custom properties in app/globals.css and consumed through
 * Tailwind in tailwind.config.ts.
 */

export const color = {
  /** Page ground — the paper of the collage. */
  cream: "#EDE4D2",
  /** Slightly deeper paper for alternating sections. */
  creamDark: "#E4D9C3",
  /** Lifted paper for raised surfaces. */
  white: "#F4EEE1",
  /** The ink of the silhouette — warm, not neutral black. */
  charcoal: "#14110F",
  charcoal2: "#1F1B18",
  charcoal3: "#2C2723",
  /** Warm grey that sits correctly on cream rather than on white. */
  muted: "#6E665B",
  mutedLight: "#A69C8C",
  border: "#D2C6AE",
  borderDark: "#332E29",
  /** The single red. Used as a mark, never as a text background. */
  accent: "#E5231B",
  accentDeep: "#C2160F",
} as const;

/** Fluid display sizes. Paired with the serif face, tight leading. */
export const displayScale = {
  hero: "clamp(2.9rem, 6.2vw, 6.2rem)",
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
