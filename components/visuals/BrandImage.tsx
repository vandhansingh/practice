import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import clsx from "clsx";

/**
 * Brand image slot.
 *
 * The board's photography has a consistent treatment: black-and-white, screened
 * to a visible halftone dot, with a flat red shape sitting behind and offset
 * from the subject. This component owns that treatment so every image on the
 * site reads as one system.
 *
 * If a real photo exists at /public/images/<slot>.<ext> it is used and given the
 * duotone + halftone treatment. Otherwise a geometric stand-in is drawn in the
 * same language. The lookup happens on the server at build time, so dropping
 * files in and rebuilding is the only step — no code change.
 */

export type ImageSlot =
  | "workspace"
  | "blocks"
  | "stone"
  | "wireframes"
  | "screen"
  | "skyline"
  | "tower";

type Underlay = "silhouette" | "block" | "corner" | "none";

const EXTENSIONS = ["jpg", "jpeg", "png", "webp", "avif"];

const ALT: Record<ImageSlot, string> = {
  workspace: "A designer at work on a strategy layout",
  blocks: "A hand placing a red block on top of a stack",
  stone: "A single large stone",
  wireframes: "A designer sketching wireframes on a wall",
  screen: "A laptop displaying the site",
  skyline: "A city skyline",
  tower: "A tower seen from below",
};

function findPhoto(slot: ImageSlot): string | null {
  try {
    const dir = path.join(process.cwd(), "public", "images");
    for (const ext of EXTENSIONS) {
      if (fs.existsSync(path.join(dir, `${slot}.${ext}`))) return `/images/${slot}.${ext}`;
    }
  } catch {
    // Filesystem unavailable — fall through to the drawn stand-in.
  }
  return null;
}

export function BrandImage({
  slot,
  underlay = "block",
  className,
  aspect = "aspect-[4/3]",
  priority = false,
  alt,
  reveal = true,
  frame = "ink",
}: {
  slot: ImageSlot;
  underlay?: Underlay;
  className?: string;
  aspect?: string;
  priority?: boolean;
  alt?: string;
  /**
   * The hard frame around the photo. Follows the ground it sits on — an ink
   * border and ink shadow vanish on a dark section, so those take `cream`.
   * `none` is for images that are already bounded by something else.
   */
  frame?: "ink" | "cream" | "none";
  /**
   * Set false inside a [data-hero]. The generic scroll passes deliberately skip
   * the hero subtree, so emitting reveal attributes there would let the CSS
   * pre-state hide the image with nothing ever animating it back — the hero
   * timeline animates the whole visual instead.
   */
  reveal?: boolean;
}) {
  const src = findPhoto(slot);
  const label = alt ?? ALT[slot];

  return (
    <div className={clsx("relative", aspect, className)}>
      <Underlayer kind={underlay} reveal={reveal} />

      {/* The reveal is scoped to the photo, not the whole frame: the red
          underlay is deliberately offset outside the bounds, and a clip-path on
          the outer element would shear it off. */}
      <div
        className={clsx(
          "absolute inset-0",
          frame === "ink" && "border-2 border-charcoal shadow-brut",
          frame === "cream" && "border-2 border-cream shadow-brut-light"
        )}
        data-image-mask
        {...(reveal ? { "data-image-reveal": true } : {})}
      >
        <div className="relative h-full w-full">
          {src ? (
            <>
              <Image
                src={src}
                alt={label}
                fill
                priority={priority}
                sizes="(max-width: 1024px) 100vw, 55vw"
                // Grayscale + lifted contrast is the base of the board's
                // treatment; the dot screen is layered over the top.
                className="object-cover grayscale contrast-[1.18]"
              />
              <HalftoneOverlay />
            </>
          ) : (
            <DrawnSlot slot={slot} label={label} />
          )}
        </div>
      </div>
    </div>
  );
}

/** Flat red shape behind the subject, offset so it reads as a printed layer. */
function Underlayer({ kind, reveal }: { kind: Underlay; reveal: boolean }) {
  if (kind === "none") return null;

  const revealProps = reveal ? { "data-reveal": "fade" } : {};

  if (kind === "corner") {
    return (
      <span
        aria-hidden="true"
        {...revealProps}
        className="absolute -right-3 -top-3 z-0 h-1/2 w-1/2 bg-accent"
      />
    );
  }

  if (kind === "silhouette") {
    return (
      <span
        aria-hidden="true"
        {...revealProps}
        className="absolute -left-4 -top-5 z-0 h-full w-[86%] bg-accent"
        style={{ clipPath: "polygon(18% 0, 100% 0, 100% 100%, 0 100%, 0 22%)" }}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      {...revealProps}
      className="absolute -bottom-4 -left-4 z-0 h-3/5 w-3/5 bg-accent"
    />
  );
}

/**
 * Dot screen laid over a real photograph. `multiply` keeps the dots reading as
 * ink on the light areas while leaving the shadows alone, which is what makes
 * it look printed rather than like a texture pasted on top.
 */
function HalftoneOverlay() {
  return (
    <span
      aria-hidden="true"
      className="absolute inset-0 mix-blend-multiply opacity-[0.55]"
      style={{
        backgroundImage: "radial-gradient(#151515 1px, transparent 1.15px)",
        backgroundSize: "4px 4px",
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Drawn stand-ins                                                     */
/*                                                                     */
/* Geometry only — stacked cubes, a monolith, towers, a screen. Chosen  */
/* deliberately over attempting photographic subjects, which at this    */
/* scale reads as a failed illustration rather than a placeholder.      */
/* ------------------------------------------------------------------ */

function DrawnSlot({ slot, label }: { slot: ImageSlot; label: string }) {
  const uid = `bi-${slot}`;
  return (
    <svg
      viewBox="0 0 800 800"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      role="img"
      aria-label={label}
    >
      <defs>
        <pattern id={`${uid}-dots`} width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="1.8" cy="1.8" r="1.7" fill="#151515" />
        </pattern>
        <pattern id={`${uid}-dots-light`} width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="#151515" />
        </pattern>
      </defs>

      <rect width="800" height="800" fill="#E8E4DC" />

      {slot === "blocks" && <Blocks uid={uid} />}
      {slot === "stone" && <Stone uid={uid} />}
      {slot === "tower" && <Tower uid={uid} />}
      {slot === "skyline" && <Skyline uid={uid} />}
      {slot === "screen" && <Screen uid={uid} />}
      {slot === "workspace" && <Workspace uid={uid} />}
      {slot === "wireframes" && <Wireframes uid={uid} />}
    </svg>
  );
}

/** Isometric cube, anchored by the centre of its top face. */
function Cube({
  cx,
  cy,
  s,
  h,
  fill,
  uid,
}: {
  cx: number;
  cy: number;
  s: number;
  h: number;
  fill: string;
  uid: string;
}) {
  const half = s / 2;
  const top = `${cx},${cy - half} ${cx + s},${cy} ${cx},${cy + half} ${cx - s},${cy}`;
  const left = `${cx - s},${cy} ${cx},${cy + half} ${cx},${cy + half + h} ${cx - s},${cy + h}`;
  const right = `${cx},${cy + half} ${cx + s},${cy} ${cx + s},${cy + h} ${cx},${cy + half + h}`;
  const solid = fill !== "dots";

  return (
    <g>
      <polygon points={top} fill={solid ? fill : "#B9B3A8"} />
      <polygon points={left} fill={solid ? fill : "#8E887D"} />
      <polygon points={right} fill={solid ? fill : "#6E6960"} />
      {!solid && (
        <>
          <polygon points={top} fill={`url(#${uid}-dots-light)`} opacity="0.5" />
          <polygon points={left} fill={`url(#${uid}-dots)`} opacity="0.45" />
          <polygon points={right} fill={`url(#${uid}-dots)`} opacity="0.6" />
        </>
      )}
      <polygon points={top} fill="none" stroke="#151515" strokeWidth="2" opacity="0.35" />
    </g>
  );
}

/** Three stone cubes with a red one being set on top. */
function Blocks({ uid }: { uid: string }) {
  return (
    <g>
      <Cube uid={uid} cx={400} cy={640} s={130} h={90} fill="dots" />
      <Cube uid={uid} cx={400} cy={520} s={130} h={90} fill="dots" />
      <Cube uid={uid} cx={400} cy={400} s={130} h={90} fill="dots" />
      {/* The red block sits lifted above the stack — the placing gesture is
          implied by the gap rather than by drawing an arm, which at this scale
          reads as a shape rather than a limb. */}
      <Cube uid={uid} cx={400} cy={214} s={112} h={78} fill="#F42B1C" />
    </g>
  );
}

/** Angular monolith with a red square behind its shoulder. */
function Stone({ uid }: { uid: string }) {
  const rock = "M 205 640 L 150 385 L 268 200 L 470 150 L 640 300 L 615 545 L 430 660 Z";
  return (
    <g>
      <rect x="470" y="240" width="230" height="230" fill="#F42B1C" />
      <path d={rock} fill="#8E887D" />
      <path d={rock} fill={`url(#${uid}-dots)`} opacity="0.55" />
      {/* Facets */}
      <path d="M 268 200 L 400 360 L 205 640" fill="#151515" opacity="0.22" />
      <path d="M 470 150 L 400 360 L 615 545" fill="#151515" opacity="0.12" />
      <path d={rock} fill="none" stroke="#151515" strokeWidth="3" opacity="0.5" />
    </g>
  );
}

/** Tower seen from below, with a red panel behind. */
function Tower({ uid }: { uid: string }) {
  return (
    <g>
      <rect x="420" y="120" width="200" height="470" fill="#F42B1C" />
      <polygon points="250,800 250,180 520,110 520,800" fill="#A49E93" />
      <polygon points="250,800 250,180 520,110 520,800" fill={`url(#${uid}-dots)`} opacity="0.5" />
      <polygon points="520,800 520,110 610,150 610,800" fill="#4E4A44" />
      {/* Window bands */}
      {Array.from({ length: 15 }).map((_, i) => (
        <rect
          key={i}
          x="262"
          y={210 + i * 40}
          width="246"
          height="10"
          fill="#151515"
          opacity="0.3"
        />
      ))}
      <polygon points="250,800 250,180 520,110 520,800" fill="none" stroke="#151515" strokeWidth="3" opacity="0.5" />
    </g>
  );
}

/** City skyline row. */
function Skyline({ uid }: { uid: string }) {
  const towers = [
    [60, 470, 90], [160, 380, 70], [240, 520, 60], [310, 300, 96],
    [416, 430, 74], [500, 360, 64], [574, 500, 80], [664, 400, 76],
  ];
  return (
    <g>
      {towers.map(([x, y, w]) => (
        <g key={x}>
          <rect x={x} y={y} width={w} height={800 - y} fill="#5C574F" />
          <rect x={x} y={y} width={w} height={800 - y} fill={`url(#${uid}-dots)`} opacity="0.45" />
          {Array.from({ length: Math.floor((800 - y) / 34) }).map((_, r) => (
            <rect
              key={r}
              x={x + 8}
              y={y + 18 + r * 34}
              width={w - 16}
              height={8}
              fill="#151515"
              opacity="0.32"
            />
          ))}
        </g>
      ))}
    </g>
  );
}

/** Laptop with a red field on screen. */
function Screen({ uid }: { uid: string }) {
  return (
    <g>
      <polygon points="180,180 620,180 620,520 180,520" fill="#2F2F2F" />
      <rect x="204" y="204" width="392" height="292" fill="#F42B1C" />
      <path d="M 300 460 L 380 340 L 452 420 L 500 372 L 560 460 Z" fill="#151515" opacity="0.55" />
      <rect x="204" y="204" width="392" height="292" fill={`url(#${uid}-dots-light)`} opacity="0.3" />
      {/* Base */}
      <polygon points="120,520 680,520 740,596 60,596" fill="#8E887D" />
      <polygon points="120,520 680,520 740,596 60,596" fill={`url(#${uid}-dots)`} opacity="0.4" />
      <rect x="330" y="540" width="140" height="12" fill="#151515" opacity="0.35" />
    </g>
  );
}

/** Desk, monitor and seated figure, reduced to flat masses. */
function Workspace({ uid }: { uid: string }) {
  return (
    <g>
      {/* Monitor */}
      <rect x="430" y="180" width="320" height="230" fill="#2F2F2F" />
      <rect x="448" y="198" width="284" height="194" fill="#E8E4DC" />
      <rect x="464" y="214" width="118" height="20" fill="#F42B1C" />
      {Array.from({ length: 6 }).map((_, i) => (
        <rect key={i} x="464" y={250 + i * 22} width={i % 2 ? 180 : 240} height="9" fill="#151515" opacity="0.3" />
      ))}
      <rect x="556" y="410" width="68" height="42" fill="#2F2F2F" />
      <rect x="500" y="452" width="180" height="14" fill="#2F2F2F" />
      {/* Desk */}
      <rect x="60" y="470" width="740" height="18" fill="#151515" opacity="0.85" />
      {/* Deliberately no figure: a hand-drawn person at this scale reads as a
          botched illustration rather than a placeholder. The desk objects carry
          the scene instead. */}
      <rect x="110" y="330" width="200" height="140" fill="#5C574F" />
      <rect x="110" y="330" width="200" height="140" fill={`url(#${uid}-dots)`} opacity="0.5" />
      <rect x="126" y="352" width="120" height="10" fill="#151515" opacity="0.4" />
      <rect x="126" y="378" width="168" height="10" fill="#151515" opacity="0.3" />
      <rect x="126" y="404" width="96" height="10" fill="#151515" opacity="0.3" />
      {/* Mug */}
      <rect x="700" y="424" width="46" height="46" fill="#151515" />
    </g>
  );
}

/** Wireframe sketches pinned to a wall. */
function Wireframes({ uid }: { uid: string }) {
  const sheets = [
    [90, 120], [320, 120], [550, 120],
    [90, 380], [320, 380], [550, 380],
  ];
  return (
    <g>
      <rect width="800" height="800" fill="#F2EFE9" />
      {sheets.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <rect x={x} y={y} width="160" height="200" fill="#FAF8F4" stroke="#151515" strokeWidth="2.5" />
          <rect x={x + 14} y={y + 16} width="132" height="12" fill="#151515" opacity="0.5" />
          <path
            d={`M ${x + 14} ${y + 44} L ${x + 146} ${y + 44} L ${x + 146} ${y + 118} L ${x + 14} ${y + 118} Z`}
            fill="none"
            stroke="#151515"
            strokeWidth="2"
          />
          <path
            d={`M ${x + 14} ${y + 44} L ${x + 146} ${y + 118} M ${x + 146} ${y + 44} L ${x + 14} ${y + 118}`}
            stroke="#151515"
            strokeWidth="2"
            opacity="0.55"
          />
          {[0, 1, 2].map((r) => (
            <rect key={r} x={x + 14} y={y + 134 + r * 18} width={r === 2 ? 82 : 132} height="8" fill="#151515" opacity="0.35" />
          ))}
        </g>
      ))}
      <rect width="800" height="800" fill={`url(#${uid}-dots-light)`} opacity="0.18" />
    </g>
  );
}
