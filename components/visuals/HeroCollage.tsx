import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

/**
 * Hero artwork.
 *
 * If a real collage file has been dropped into /public/images (any of the
 * names below), it is used directly and this component gets out of the way.
 * Otherwise it renders a procedural stand-in in the same visual language —
 * cream paper, a stippled ink profile, a staircase rising out of the head,
 * one red disc, and a stippled galaxy.
 *
 * The existence check runs at build time on the server, so dropping the file
 * in and rebuilding is the only step required — no code change.
 */

const CANDIDATES = [
  "hero-collage.png",
  "hero-collage.jpg",
  "hero-collage.jpeg",
  "hero-collage.webp",
];

const ALT =
  "Collage: one figure helps another up a staircase rising from a human profile toward a galaxy";

function findArtwork(): string | null {
  try {
    const dir = path.join(process.cwd(), "public", "images");
    for (const name of CANDIDATES) {
      if (fs.existsSync(path.join(dir, name))) return `/images/${name}`;
    }
  } catch {
    // Filesystem unavailable (edge runtime) — fall through to the drawn version.
  }
  return null;
}

export function HeroCollage({ className }: { className?: string }) {
  const src = findArtwork();

  if (src) {
    return (
      <div className={className}>
        <Image
          src={src}
          alt={ALT}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-contain object-bottom"
        />
      </div>
    );
  }

  return <DrawnCollage className={className} />;
}

/** Procedural stand-in. Replaced automatically once the real file exists. */
function DrawnCollage({ className }: { className?: string }) {
  return (
    <div className={className}>
      <svg
        viewBox="0 0 900 1200"
        preserveAspectRatio="xMidYMax meet"
        className="h-full w-full"
        role="img"
        aria-label={ALT}
      >
        <defs>
          {/* Halftone fields. Two densities so tone can vary across a form. */}
          <pattern id="hc-dots" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.9" fill="#14110F" />
          </pattern>
          <pattern id="hc-dots-sparse" width="13" height="13" patternUnits="userSpaceOnUse">
            <circle cx="2.5" cy="2.5" r="1.5" fill="#14110F" />
          </pattern>

          {/* Star field for the galaxy: cream specks on ink. */}
          <pattern id="hc-stars" width="17" height="17" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="4" r="1.1" fill="#EDE4D2" />
            <circle cx="11" cy="9" r="0.7" fill="#EDE4D2" />
            <circle cx="7" cy="14" r="0.5" fill="#EDE4D2" />
            <circle cx="15" cy="2" r="0.6" fill="#EDE4D2" />
          </pattern>

          {/* Stipple thins out left-to-right, so the face reads as tone and the
              back of the head stays solid ink. */}
          <linearGradient id="hc-fade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="42%" stopColor="#fff" stopOpacity="0.92" />
            <stop offset="72%" stopColor="#fff" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          {/* Spans the full head including the nose. An earlier version started
              at x=180 and the nose tip (x=140) fell outside it, rendering as a
              detached solid wedge instead of stippled tone. */}
          <mask id="hc-face-mask">
            <rect x="90" y="640" width="810" height="560" fill="url(#hc-fade)" />
          </mask>

          {/* Galaxy core: a bright, elongated bulge rather than a lit sphere. */}
          <radialGradient id="hc-core" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#F4EEE1" stopOpacity="0.95" />
            <stop offset="30%" stopColor="#F4EEE1" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#F4EEE1" stopOpacity="0" />
          </radialGradient>

          <clipPath id="hc-galaxy-clip">
            <circle cx="716" cy="190" r="112" />
          </clipPath>
          <clipPath id="hc-head-clip">
            <path d={HEAD_PATH} />
          </clipPath>
        </defs>

        {/* ---- Galaxy disc ---- */}
        <g clipPath="url(#hc-galaxy-clip)">
          <rect x="604" y="78" width="224" height="224" fill="#14110F" />
          <ellipse
            cx="716"
            cy="190"
            rx="110"
            ry="41"
            fill="url(#hc-core)"
            transform="rotate(-28 716 190)"
          />
          <ellipse
            cx="716"
            cy="190"
            rx="48"
            ry="18"
            fill="#F4EEE1"
            opacity="0.5"
            transform="rotate(-28 716 190)"
          />
          <rect x="604" y="78" width="224" height="224" fill="url(#hc-stars)" opacity="0.85" />
        </g>

        {/* ---- Red disc: the single red in the composition ---- */}
        <circle cx="360" cy="430" r="96" fill="#E5231B" />

        {/* ---- Staircase rising out of the head ---- */}
        <path d={STAIR_PATH} fill="#14110F" />

        {/* ---- Figures ----
            Both stand clear of the red disc (which ends at x=456) so neither
            is drawn red-on-red, and both sit above their step so they read
            against cream rather than against the stair mass. */}
        <Figure x={470} y={474} color="#E5231B" reaching="up" />
        <Figure x={620} y={350} color="#14110F" reaching="down" />

        {/* ---- Head ---- */}
        <path d={HEAD_PATH} fill="#14110F" />
        <g clipPath="url(#hc-head-clip)">
          <g mask="url(#hc-face-mask)">
            <rect x="90" y="640" width="810" height="560" fill="#EDE4D2" />
            <rect x="90" y="640" width="810" height="560" fill="url(#hc-dots)" />
          </g>
          {/* Sparse stipple carries the tone a little further right. */}
          <rect x="470" y="640" width="200" height="560" fill="url(#hc-dots-sparse)" opacity="0.5" />

          {/* Eye and ear.
              These are what actually make the silhouette read as a head — a
              profile edge alone, however well articulated, still scans as a
              shaped mass until there is an interior feature to anchor it. */}
          <g fill="#14110F">
            <path d="M 232 812 q 26 -22, 54 -4 q -24 24, -54 4 Z" />
            <circle cx="262" cy="806" r="7" />
          </g>
          <path
            d="M 402 872 q 34 -14, 40 22 q 5 40, -26 52 q -6 -30, 2 -44 q 6 -12, -16 -30 Z"
            fill="#14110F"
            opacity="0.9"
          />
          <path
            d="M 414 894 q 16 -4, 16 18 q 0 16, -10 22"
            fill="none"
            stroke="#EDE4D2"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Brow */}
          <path
            d="M 226 776 q 30 -14, 62 -6"
            fill="none"
            stroke="#14110F"
            strokeWidth="7"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}

/**
 * Left-facing profile with a flat crown for the staircase to land on, cropped
 * by the bottom of the frame.
 *
 * Deliberately built from straight segments with only the skull curved. Smooth
 * beziers through the features produce a rounded blob; a profile only reads
 * when brow, nose, philtrum, lips and chin meet at angles — and the faceted
 * result also sits closer to the cut-paper feel of the rest of the collage.
 */
const HEAD_PATH = `
  M 250 660
  Q 205 690, 198 760
  L 210 792
  L 202 812
  L 208 838
  L 140 918
  L 200 934
  L 188 950
  L 205 964
  L 186 982
  L 200 1006
  L 224 1048
  Q 258 1104, 330 1146
  L 368 1200
  L 900 1200
  L 900 660
  Z
`;

/** Six steps rising left-to-right off the crown, closing into a solid mass. */
const STAIR_PATH = `
  M 250 660
  L 250 598 L 334 598
  L 334 536 L 418 536
  L 418 474 L 502 474
  L 502 412 L 586 412
  L 586 350 L 670 350
  L 670 288 L 754 288
  L 754 660
  Z
`;

/**
 * Striding figure, anchored by the feet at (x, y) so it can be placed directly
 * on a step edge.
 *
 * Drawn with thick round-capped strokes rather than a filled silhouette:
 * hand-authoring anatomy as bezier fills at this scale reliably produces
 * something misshapen, whereas limbs as weighted strokes read cleanly and stay
 * easy to re-pose. `reaching` sets which way the free arm extends — the upper
 * figure offers a hand down, the lower one reaches up for it.
 */
function Figure({
  x,
  y,
  color,
  reaching,
}: {
  x: number;
  y: number;
  color: string;
  reaching: "up" | "down";
}) {
  const arm = reaching === "up" ? "M 0 -82 L 30 -104" : "M 0 -82 L 32 -62";

  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cx="0" cy="-100" r="11" fill={color} />
      <g
        stroke={color}
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <path d="M 0 -89 L 3 -50" />
        <path d="M 3 -50 L -12 -25 L -15 0" />
        <path d="M 3 -50 L 16 -27 L 13 0" />
        <path d="M 0 -82 L -16 -58" />
        <path d={arm} />
      </g>
    </g>
  );
}
