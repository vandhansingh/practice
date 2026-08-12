/**
 * Single source of truth for the visual system.
 *
 * Sampled from the Cornerstone brand board: warm paper, near-neutral ink, a
 * bright signal red, and an amber dot used purely as punctuation.
 *
 * Contrast rules that the components rely on:
 *   red   on paper  = 3.6:1 → large text, icons and graphics only
 *   red-deep on paper = 5.0:1 → safe for body-size text (form errors, meta)
 *   amber on paper  = 1.8:1 → decorative dots ONLY, never text or icons
 *
 * Key names are unchanged from earlier palettes so the component tree keeps
 * working; only the values moved.
 */

export const color = {
  /** Page ground — the board's paper stock. */
  cream: "#F2EFE9",
  /** Slightly deeper paper for alternating sections. */
  creamDark: "#E8E4DC",
  /** Lifted paper for raised surfaces. */
  white: "#FAF8F4",
  /** Ink — near-neutral, not warm. */
  charcoal: "#151515",
  charcoal2: "#232323",
  charcoal3: "#2F2F2F",
  muted: "#6B6B6B",
  mutedLight: "#9A9A9A",
  border: "#DCD7CD",
  borderDark: "#333333",
  /** The signal red: brackets, blocks, key words, photo underlays. */
  accent: "#F42B1C",
  /** Darker red for anything at body size. */
  accentDeep: "#D01D10",
  /** Amber dot. Decorative punctuation only. */
  amber: "#E8A22B",
} as const;

/**
 * Fluid display sizes.
 *
 * The board sets headlines in a light-weight grotesque at generous size with
 * tight tracking, so the scale is paired with negative letter-spacing in the
 * Tailwind config rather than relying on the face's defaults.
 */
export const displayScale = {
  hero: "clamp(2.75rem, 5.6vw, 5.4rem)",
  xl: "clamp(2.35rem, 4.4vw, 4.1rem)",
  lg: "clamp(2rem, 3.4vw, 3.1rem)",
  md: "clamp(1.7rem, 2.6vw, 2.4rem)",
  sm: "clamp(1.4rem, 1.9vw, 1.75rem)",
  metric: "clamp(2.75rem, 5vw, 4.75rem)",
} as const;

export const motion = {
  /** Refined easings only — no bounce, no elastic. */
  ease: {
    power3: "power3.out",
    power4: "power4.out",
    expo: "expo.out",
    circ: "circ.out",
  },
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
