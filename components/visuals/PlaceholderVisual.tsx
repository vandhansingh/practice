import clsx from "clsx";

type Tone = "moss" | "sand" | "clay" | "ink" | "paper";

const TONES: Record<Tone, { from: string; to: string; line: string }> = {
  moss: { from: "#2b4239", to: "#1c2d27", line: "#c9d6c9" },
  sand: { from: "#d9cfb8", to: "#c2b491", line: "#5b5138" },
  clay: { from: "#a9673f", to: "#7c4a2c", line: "#f0ddca" },
  ink: { from: "#26241f", to: "#141310", line: "#e7e2d4" },
  paper: { from: "#ece8de", to: "#d8d3c8", line: "#77746d" },
};

/**
 * Stand-in for editorial photography. This build has no network access to
 * fetch licensed imagery, so every "photo" slot renders a tasteful abstract
 * composition instead — a warm duotone field, a fine grain texture, and a
 * restrained line drawing. Swap for real photography in /public/images by
 * replacing this component's usage with <Image>.
 */
export function PlaceholderVisual({
  tone = "sand",
  pattern = "grid",
  className,
  label,
}: {
  tone?: Tone;
  pattern?: "grid" | "arc" | "nodes" | "diagonal" | "contour";
  className?: string;
  label?: string;
}) {
  const t = TONES[tone];
  const id = `${tone}-${pattern}`;

  return (
    <div
      className={clsx("relative w-full overflow-hidden", className)}
      role="img"
      aria-label={label ?? "Abstract editorial visual"}
    >
      <svg
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id={`grad-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={t.from} />
            <stop offset="100%" stopColor={t.to} />
          </linearGradient>
          <filter id={`grain-${id}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
        <rect width="800" height="600" fill={`url(#grad-${id})`} />
        <rect width="800" height="600" filter={`url(#grain-${id})`} opacity="0.045" />

        <g stroke={t.line} strokeWidth="1" fill="none" opacity="0.5">
          {pattern === "grid" && (
            <>
              {Array.from({ length: 7 }).map((_, i) => (
                <line key={`v${i}`} x1={i * 120} y1="0" x2={i * 120} y2="600" />
              ))}
              {Array.from({ length: 6 }).map((_, i) => (
                <line key={`h${i}`} x1="0" y1={i * 110} x2="800" y2={i * 110} />
              ))}
            </>
          )}
          {pattern === "arc" && (
            <>
              <circle cx="600" cy="300" r="220" />
              <circle cx="600" cy="300" r="150" />
              <circle cx="600" cy="300" r="80" />
              <line x1="0" y1="300" x2="800" y2="300" opacity="0.3" />
            </>
          )}
          {pattern === "nodes" && (
            <>
              <line x1="120" y1="120" x2="400" y2="260" />
              <line x1="400" y1="260" x2="680" y2="140" />
              <line x1="400" y1="260" x2="300" y2="480" />
              <line x1="400" y1="260" x2="600" y2="480" />
              <circle cx="120" cy="120" r="7" fill={t.line} stroke="none" />
              <circle cx="400" cy="260" r="10" fill={t.line} stroke="none" />
              <circle cx="680" cy="140" r="7" fill={t.line} stroke="none" />
              <circle cx="300" cy="480" r="7" fill={t.line} stroke="none" />
              <circle cx="600" cy="480" r="7" fill={t.line} stroke="none" />
            </>
          )}
          {pattern === "diagonal" && (
            <>
              {Array.from({ length: 14 }).map((_, i) => (
                <line key={i} x1={-200 + i * 90} y1="0" x2={i * 90} y2="600" />
              ))}
            </>
          )}
          {pattern === "contour" && (
            <>
              <path d="M 0 420 C 200 340, 300 500, 500 380 S 750 300, 800 360" />
              <path d="M 0 480 C 220 400, 320 540, 520 440 S 760 360, 800 420" opacity="0.6" />
              <path d="M 0 540 C 240 470, 340 580, 540 500 S 770 420, 800 470" opacity="0.35" />
            </>
          )}
        </g>
      </svg>
    </div>
  );
}
