import type { Config } from "tailwindcss";
import { color, displayScale, edge, layout, motion, shadow } from "./lib/design-system/tokens";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: color.cream,
        "cream-dark": color.creamDark,
        white: color.white,
        charcoal: color.charcoal,
        "charcoal-2": color.charcoal2,
        "charcoal-3": color.charcoal3,
        muted: color.muted,
        "muted-light": color.mutedLight,
        border: color.border,
        "border-dark": color.borderDark,
        accent: color.accent,
        "accent-deep": color.accentDeep,
        amber: color.amber,
      },
      fontFamily: {
        // One grotesque across the whole site, matching the board's monolithic
        // sans setting. `display` and `sans` point at the same family and are
        // separated only by weight and tracking.
        display: ["var(--font-sans)", "Helvetica Neue", "Arial", "sans-serif"],
        sans: ["var(--font-sans)", "Helvetica Neue", "Arial", "sans-serif"],
      },
      fontSize: {
        "display-hero": [displayScale.hero, { lineHeight: "1.02", letterSpacing: "-0.035em" }],
        "display-xl": [displayScale.xl, { lineHeight: "1.05", letterSpacing: "-0.032em" }],
        "display-lg": [displayScale.lg, { lineHeight: "1.1", letterSpacing: "-0.028em" }],
        "display-md": [displayScale.md, { lineHeight: "1.16", letterSpacing: "-0.024em" }],
        "display-sm": [displayScale.sm, { lineHeight: "1.24", letterSpacing: "-0.018em" }],
        metric: [displayScale.metric, { lineHeight: "0.94", letterSpacing: "-0.04em" }],
        label: ["0.6875rem", { lineHeight: "1.2", letterSpacing: "0.15em" }],
        "label-lg": ["0.75rem", { lineHeight: "1.2", letterSpacing: "0.13em" }],
      },
      maxWidth: {
        container: layout.container,
        narrow: layout.containerNarrow,
      },
      transitionTimingFunction: {
        power3: motion.cssEase.power3,
        expo: motion.cssEase.expo,
        apple: motion.cssEase.apple,
        standard: motion.cssEase.standard,
      },
      transitionDuration: {
        // Tailwind's stock scale jumps 300 → 500, so `duration-400` compiled to
        // nothing at all and the elements carrying it snapped instantly. The
        // icon choreography needs the values in between.
        100: "100ms",
        180: "180ms",
        200: "200ms",
        220: "220ms",
        260: "260ms",
        400: "400ms",
      },
      transitionDelay: {
        120: "120ms",
        140: "140ms",
      },
      borderRadius: {
        // The board is square-cornered throughout — no rounding anywhere.
        card: "0px",
        pill: "999px",
      },
      boxShadow: {
        // Zero blur, always. A blurred shadow is the one thing this treatment
        // cannot contain — it reads as the soft SaaS depth the board rejects.
        "brut-sm": shadow.brutSm,
        brut: shadow.brut,
        "brut-lg": shadow.brutLg,
        "brut-light": shadow.brutLight,
        "brut-light-sm": shadow.brutLightSm,
        "brut-red": shadow.brutRed,
        "brut-red-lg": shadow.brutRedLg,
      },
      borderWidth: {
        3: edge.width.control,
      },
    },
  },
  plugins: [],
};

export default config;
