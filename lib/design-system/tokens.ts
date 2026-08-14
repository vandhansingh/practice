/**
 * Single source of truth for the visual system.
 *
 * Sampled from the Cornerstone brand board: warm paper, near-neutral ink, a
 * bright signal red, and an amber dot used purely as punctuation.
 *
 * Contrast rules that the components rely on:
 *   red   on paper  = 3.6:1 → large text, icons and graphics only
 *   red-deep on paper = 5.3:1, and 4.8:1 on the deeper paper → safe at body size
 *                     (form errors, step numbers, meta). #D01D10 only made 4.3:1 there.
 *   amber on paper  = 1.8:1 → decorative dots ONLY, never text or icons
 *   muted on paper  = 5.2:1, and 4.7:1 on the deeper paper — the second number
 *                     is the binding one, and #6B6B6B only made 4.2:1 there
 *   muted is for LIGHT grounds only. On ink it measures 3.4:1; dark sections
 *                     carry data-dark, which swaps it for muted-light (6.5:1).
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
  muted: "#636363",
  mutedLight: "#9A9A9A",
  border: "#DCD7CD",
  borderDark: "#333333",
  /** The signal red: brackets, blocks, key words, photo underlays. */
  accent: "#F42B1C",
  /** Darker red for anything at body size. */
  accentDeep: "#C4180C",
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
    /**
     * Apple's present/dismiss curve. Leaves immediately and settles for a long
     * time without overshooting, so a short move still reads as deliberate.
     * Used for the nav icon morph.
     */
    apple: "cubic-bezier(0.32, 0.72, 0, 1)",
    /** Symmetric curve for very short mechanical moves — the press state. */
    standard: "cubic-bezier(0.4, 0, 0.2, 1)",
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

/**
 * The neubrutalist half.
 *
 * Half the style is taken and half is deliberately refused, so it lands as a
 * sharpened version of the brand board rather than a different site wearing its
 * colours. Written down because the split is the whole design decision:
 *
 * TAKEN — hard offset shadows with zero blur; structural ink borders at 2–3px;
 * a mechanical press that translates an object by its own shadow offset so it
 * lands flat on the page; heavy weights on labels, buttons and figures; zero
 * radius (the board already had this); no blur or gradient anywhere.
 *
 * REFUSED — the pop palette (yellow / blue / violet); "anti-design" asymmetry
 * and ugly-cute chaos, which would throw away the Swiss grid and the editorial
 * whitespace the board is built on; uppercase-everything; and rotation on
 * anything but a single badge.
 *
 * One refusal is worth spelling out. Canonical brutalism specifies
 * `transition: none` — instant state changes. That directly contradicts the
 * same reference's own accessibility priorities, which list "instant state
 * changes (0ms)" as a critical interaction anti-pattern. Motion is kept, and
 * made mechanical instead: `press` below is the whole budget for a press, short
 * and linear enough to read as a physical click rather than an ease.
 */
export const edge = {
  /** Offsets, in px. The press translation must equal the shadow offset. */
  offset: { sm: 2, md: 4, lg: 8 },
  /** Border weights. 2px is structural, 3px is a primary control. */
  width: { structural: "2px", control: "3px" },
  /** Mechanical press. Deliberately not one of the editorial easings. */
  press: { duration: "100ms", ease: "linear" },
} as const;

const hard = (px: number, hex: string) => `${px}px ${px}px 0 0 ${hex}`;

/**
 * Hard shadows, keyed by the ground they sit on: an ink shadow is invisible on
 * a dark section, so dark surfaces take the cream variant instead.
 */
export const shadow = {
  brutSm: hard(edge.offset.sm, color.charcoal),
  brut: hard(edge.offset.md, color.charcoal),
  brutLg: hard(edge.offset.lg, color.charcoal),
  /** For objects on ink grounds. */
  brutLight: hard(edge.offset.md, color.cream),
  brutLightSm: hard(edge.offset.sm, color.cream),
  /** Reserved for the two loudest objects on the page — the nav and the
   *  featured engagement. Red carries no text here, so 3.6:1 is irrelevant. */
  brutRed: hard(edge.offset.md, color.accent),
  brutRedLg: hard(edge.offset.lg, color.accent),
} as const;
