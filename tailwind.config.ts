import type { Config } from "tailwindcss";
import { color, displayScale, layout, motion } from "./lib/design-system/tokens";

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
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      fontSize: {
        "display-hero": [displayScale.hero, { lineHeight: "0.96", letterSpacing: "-0.025em" }],
        "display-xl": [displayScale.xl, { lineHeight: "1.0", letterSpacing: "-0.022em" }],
        "display-lg": [displayScale.lg, { lineHeight: "1.04", letterSpacing: "-0.02em" }],
        "display-md": [displayScale.md, { lineHeight: "1.1", letterSpacing: "-0.018em" }],
        "display-sm": [displayScale.sm, { lineHeight: "1.2", letterSpacing: "-0.015em" }],
        metric: [displayScale.metric, { lineHeight: "0.92", letterSpacing: "-0.03em" }],
        label: ["0.6875rem", { lineHeight: "1.2", letterSpacing: "0.16em" }],
        "label-lg": ["0.75rem", { lineHeight: "1.2", letterSpacing: "0.14em" }],
      },
      maxWidth: {
        container: layout.container,
        narrow: layout.containerNarrow,
      },
      transitionTimingFunction: {
        power3: motion.cssEase.power3,
        expo: motion.cssEase.expo,
      },
      borderRadius: {
        card: "3px",
        pill: "999px",
      },
    },
  },
  plugins: [],
};

export default config;
