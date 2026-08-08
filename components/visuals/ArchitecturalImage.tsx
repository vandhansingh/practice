import clsx from "clsx";

/**
 * Generative stand-in for editorial architectural photography.
 *
 * This build has no outbound network access, so no licensed photography could
 * be fetched. Rather than drop in flat placeholder blocks, each "photograph"
 * is composed from the things that actually make architectural imagery read:
 * one-point perspective, directional light with falloff across each surface,
 * atmospheric haze on the receding planes, film grain and a vignette.
 *
 * Every instance requires a unique `uid` because SVG gradient and filter ids
 * are document-global — two instances sharing an id would silently steal each
 * other's fills.
 *
 * To swap in real photography later, replace usages with next/image; the
 * aspect ratios, crops and reveal wrappers are already in place.
 */

type Tone = "dusk" | "night" | "sand" | "stone";
type Motif = "facade" | "colonnade" | "interior" | "stair" | "surface";

type ToneShape = {
  /** Background wash, top → bottom. */
  bg: [string, string];
  /** Surface catching direct light. */
  lit: string;
  /** Surface turned away from the light. */
  shade: string;
  /** Deepest recess / cast shadow. */
  recess: string;
  /** Warm light colour, shared across tones so the accent stays consistent. */
  light: string;
  lightOpacity: number;
  vignette: number;
  line: string;
  /** Haze colour for the receding side of the frame. */
  haze: string;
};

/**
 * Value range is what makes these read as photographs rather than flat fills:
 * each tone spans from a genuinely lit surface to a near-black recess, so the
 * geometry has somewhere to fall off to. Haze is kept low — it flattens the
 * whole frame quickly if pushed.
 */
const TONES: Record<Tone, ToneShape> = {
  dusk: {
    bg: ["#4A3E33", "#15120F"],
    lit: "#B2946E",
    shade: "#2A241E",
    recess: "#0B0908",
    light: "#F2A329",
    lightOpacity: 0.24,
    vignette: 0.5,
    line: "#C2A882",
    haze: "#7A6449",
  },
  night: {
    bg: ["#312A24", "#0C0B0A"],
    lit: "#7A6753",
    shade: "#191614",
    recess: "#060505",
    light: "#F2A329",
    lightOpacity: 0.16,
    vignette: 0.58,
    line: "#8A7660",
    haze: "#4A3E33",
  },
  sand: {
    bg: ["#F7F2E7", "#B8A88C"],
    lit: "#FFFDF7",
    shade: "#96835F",
    recess: "#5E4F38",
    light: "#F2A329",
    lightOpacity: 0.2,
    vignette: 0.18,
    line: "#6E5F48",
    haze: "#E2D6BE",
  },
  stone: {
    bg: ["#E8DFCE", "#827764"],
    lit: "#F8F4E9",
    shade: "#6E6553",
    recess: "#3E382D",
    light: "#F2A329",
    lightOpacity: 0.16,
    vignette: 0.24,
    line: "#4E4639",
    haze: "#D2C7B2",
  },
};

export function ArchitecturalImage({
  uid,
  tone = "dusk",
  motif = "facade",
  className,
  label,
  decorative = false,
}: {
  uid: string;
  tone?: Tone;
  motif?: Motif;
  className?: string;
  /** Required unless `decorative` — an empty label on role="img" is worse than no role at all. */
  label?: string;
  /** True for repeated thumbnails that add nothing for a screen reader. */
  decorative?: boolean;
}) {
  const t = TONES[tone];

  return (
    <div
      className={clsx("relative overflow-hidden", className)}
      {...(decorative ? { "aria-hidden": true } : { role: "img", "aria-label": label })}
    >
      <svg
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`bg-${uid}`} x1="0" y1="0" x2="0.25" y2="1">
            <stop offset="0%" stopColor={t.bg[0]} />
            <stop offset="100%" stopColor={t.bg[1]} />
          </linearGradient>

          {/* Directional light: warm, upper-left, falling off fast. */}
          <radialGradient id={`light-${uid}`} cx="0.18" cy="0.1" r="0.95">
            <stop offset="0%" stopColor={t.light} stopOpacity={t.lightOpacity} />
            <stop offset="45%" stopColor={t.light} stopOpacity={t.lightOpacity * 0.35} />
            <stop offset="100%" stopColor={t.light} stopOpacity="0" />
          </radialGradient>

          {/* Atmospheric haze building toward the receding side. Kept light —
              past about 0.2 it flattens the whole frame. */}
          <linearGradient id={`haze-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={t.haze} stopOpacity="0" />
            <stop offset="100%" stopColor={t.haze} stopOpacity="0.16" />
          </linearGradient>

          <radialGradient id={`vig-${uid}`} cx="0.5" cy="0.45" r="0.78">
            <stop offset="55%" stopColor="#000000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity={t.vignette} />
          </radialGradient>

          <filter id={`grain-${uid}`} x="0" y="0" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>

        <rect width="1600" height="1000" fill={`url(#bg-${uid})`} />

        {motif === "facade" && <Facade uid={uid} t={t} />}
        {motif === "colonnade" && <Colonnade t={t} />}
        {motif === "interior" && <Interior uid={uid} t={t} />}
        {motif === "stair" && <Stair t={t} />}
        {motif === "surface" && <Surface uid={uid} t={t} />}

        <rect width="1600" height="1000" fill={`url(#haze-${uid})`} />
        <rect width="1600" height="1000" fill={`url(#light-${uid})`} />
        <rect width="1600" height="1000" fill={`url(#vig-${uid})`} />
        <rect width="1600" height="1000" filter={`url(#grain-${uid})`} opacity="0.055" />
      </svg>
    </div>
  );
}

/**
 * Vertical fin facade in one-point perspective.
 *
 * Fin positions follow x = W·t^0.72, so spacing compresses toward the right —
 * the way a louvered facade reads when you stand at its near end. Each fin
 * carries its own gradient so its lit leading edge and shadowed return face
 * fall off independently, and the lit amount decays with distance from the
 * light source.
 */
function Facade({ uid, t }: { uid: string; t: ToneShape }) {
  const WIDTH = 1600;
  const COUNT = 30;

  const xs: number[] = [];
  for (let i = 0; i <= COUNT; i++) {
    xs.push(WIDTH * Math.pow(i / COUNT, 0.72));
  }

  const fins = [];
  for (let i = 0; i < COUNT; i++) {
    const x = xs[i];
    const span = xs[i + 1] - x;
    const w = Math.max(span * 0.56, 1.2);
    const litAmount = Math.max(0, 1 - i / (COUNT * 0.8));

    fins.push(
      <g key={i}>
        <linearGradient id={`fin-${uid}-${i}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={t.lit} stopOpacity={0.5 + litAmount * 0.5} />
          <stop offset="40%" stopColor={t.lit} stopOpacity={0.18 + litAmount * 0.22} />
          <stop offset="100%" stopColor={t.shade} stopOpacity="0.98" />
        </linearGradient>

        {/* The gap between fins is a deep recess, not background — this is what
            gives the facade actual depth rather than reading as stripes. */}
        <rect x={x + w} y={-20} width={Math.max(span - w, 0.8)} height={1040} fill={t.recess} />

        <rect x={x} y={-20} width={w} height={1040} fill={`url(#fin-${uid}-${i})`} />

        {/* Specular leading edge, brightest on the fins nearest the source. */}
        <rect
          x={x}
          y={-20}
          width={Math.max(w * 0.14, 1)}
          height={1040}
          fill={t.light}
          opacity={0.14 + litAmount * 0.4}
        />
        {/* Contact shadow where the fin meets its own recess. */}
        <rect
          x={x + w - Math.max(w * 0.08, 0.6)}
          y={-20}
          width={Math.max(w * 0.08, 0.6)}
          height={1040}
          fill="#000000"
          opacity="0.35"
        />
      </g>
    );
  }

  // Floor divisions gathered toward the horizon rather than evenly spaced.
  const bands = [0.2, 0.42, 0.6, 0.735, 0.83, 0.9].map((p, i) => (
    <rect
      key={p}
      x="0"
      y={1000 * p}
      width="1600"
      height="1.5"
      fill={t.line}
      opacity={0.16 - i * 0.018}
    />
  ));

  return (
    <g>
      {bands}
      {fins}
    </g>
  );
}

/** Receding arcade — arches shrinking toward a vanishing point. */
function Colonnade({ t }: { t: ToneShape }) {
  const arches = [];
  const COUNT = 7;

  for (let i = 0; i < COUNT; i++) {
    const scale = 1 - i * 0.115;
    const w = 300 * scale;
    const h = 760 * scale;
    const x = 90 + i * 205;
    const y = 1000 - h - 60 * (1 - scale) * 2.2;
    const r = w / 2;
    const opacity = 1 - i * 0.1;

    const arch = `M ${x} ${y + h} L ${x} ${y + r} A ${r} ${r} 0 0 1 ${x + w} ${y + r} L ${x + w} ${y + h}`;

    arches.push(
      <g key={i} opacity={opacity}>
        {/* Lit pier faces flanking each opening — the bright edges the eye
            reads as depth. Drawn first so the opening sits on top of them. */}
        <rect x={x - 26 * scale} y={y} width={26 * scale} height={h} fill={t.lit} opacity="0.9" />
        <rect x={x + w} y={y} width={22 * scale} height={h} fill={t.shade} opacity="0.85" />

        {/* The opening itself: near-black, so the piers have contrast to work against */}
        <path d={`${arch} Z`} fill={t.recess} opacity="0.97" />
        <path d={arch} fill="none" stroke={t.lit} strokeWidth={3 * scale} opacity="0.72" />

        {/* Light spilling through onto the floor */}
        <rect x={x} y={y + h} width={w} height={32 * scale} fill={t.light} opacity={0.22 * opacity} />
        <rect x={x} y={y + h} width={w} height={4 * scale} fill="#FFFFFF" opacity={0.3 * opacity} />
      </g>
    );
  }

  return <g>{arches}</g>;
}

/**
 * Interior with tall apertures. The windows are deliberately blown out toward
 * white — a bright exterior read against a dark interior wall is the single
 * strongest cue that you're looking at a photographed room rather than a
 * diagram, so the value gap here is pushed hard.
 */
function Interior({ uid, t }: { uid: string; t: ToneShape }) {
  return (
    <g>
      <defs>
        <linearGradient id={`shaft-${uid}`} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
          <stop offset="60%" stopColor={t.light} stopOpacity="0.12" />
          <stop offset="100%" stopColor={t.light} stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`glass-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.96" />
          <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.78" />
          <stop offset="100%" stopColor={t.light} stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* Interior wall, well below the window value */}
      <rect x="0" y="0" width="1600" height="1000" fill={t.shade} opacity="0.82" />
      {/* Floor plane */}
      <rect x="0" y="655" width="1600" height="345" fill={t.recess} opacity="0.72" />
      <rect x="0" y="653" width="1600" height="2" fill={t.line} opacity="0.35" />

      {[0, 1, 2].map((i) => {
        const x = 150 + i * 430;
        return (
          <g key={i}>
            {/* Reveal shadow around the aperture gives the wall thickness */}
            <rect x={x - 10} y="110" width="270" height="450" fill="#000000" opacity="0.3" />
            <rect x={x} y="120" width="250" height="430" fill={`url(#glass-${uid})`} />
            {/* Mullions read dark against the blown-out glass */}
            <rect x={x + 122} y="120" width="6" height="430" fill={t.recess} opacity="0.85" />
            <rect x={x} y="328" width="250" height="6" fill={t.recess} opacity="0.85" />
          </g>
        );
      })}

      {/* Pools of light skewed to imply a low sun */}
      <path d="M 150 655 L 400 655 L 640 1000 L 250 1000 Z" fill={`url(#shaft-${uid})`} />
      <path d="M 580 655 L 830 655 L 1070 1000 L 680 1000 Z" fill={`url(#shaft-${uid})`} />
      <path d="M 1010 655 L 1260 655 L 1500 1000 L 1110 1000 Z" fill={`url(#shaft-${uid})`} />
    </g>
  );
}

/** Diagonal stair geometry — strong graphic shadow steps. */
function Stair({ t }: { t: ToneShape }) {
  const steps = [];

  for (let i = 0; i < 14; i++) {
    const x = i * 118;
    const y = 1000 - (i + 1) * 66;
    steps.push(
      <g key={i}>
        <rect x={x} y={y} width="118" height="66" fill={t.lit} opacity={0.34 - i * 0.016} />
        <rect x={x} y={y} width="118" height="7" fill={t.light} opacity={0.2 - i * 0.011} />
        <rect x={x} y={y} width="4" height="66" fill={t.recess} opacity="0.5" />
      </g>
    );
  }

  return <g>{steps}</g>;
}

/**
 * Board-formed concrete in raking light.
 *
 * A flat wash plus faint seams read as a gradient, not a wall. What sells this
 * surface is board structure: each timber board leaves a slightly different
 * value, a lit top arris and a shadow under its lower edge. Repeated across the
 * frame with a directional wash over the top, that's enough relief to read as
 * a photographed surface.
 */
function Surface({ uid, t }: { uid: string; t: ToneShape }) {
  const BOARDS = 13;
  const boardHeight = 1000 / BOARDS;

  // Fixed pseudo-random variation, so each board differs but the output stays
  // identical between server and client renders.
  const variance = [0.06, -0.04, 0.02, -0.07, 0.05, 0, -0.03, 0.07, -0.05, 0.03, -0.02, 0.04, -0.06];

  return (
    <g>
      <defs>
        <linearGradient id={`wash-${uid}`} x1="0" y1="0" x2="0.85" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.22" />
          <stop offset="45%" stopColor={t.light} stopOpacity="0.06" />
          <stop offset="100%" stopColor={t.recess} stopOpacity="0.55" />
        </linearGradient>
      </defs>

      <rect width="1600" height="1000" fill={t.shade} opacity="0.5" />

      {Array.from({ length: BOARDS }).map((_, i) => {
        const y = i * boardHeight;
        return (
          <g key={i}>
            <rect
              x="0"
              y={y}
              width="1600"
              height={boardHeight}
              fill={t.lit}
              opacity={0.3 + variance[i]}
            />
            {/* Lit top arris */}
            <rect x="0" y={y} width="1600" height="2" fill="#FFFFFF" opacity="0.22" />
            {/* Shadow cast under the board's lower edge */}
            <rect
              x="0"
              y={y + boardHeight - 4}
              width="1600"
              height="4"
              fill={t.recess}
              opacity="0.55"
            />
          </g>
        );
      })}

      {/* Pour joints across the panel */}
      {[boardHeight * 4, boardHeight * 9].map((y) => (
        <g key={y}>
          <rect x="0" y={y - 2} width="1600" height="4" fill={t.recess} opacity="0.6" />
          <rect x="0" y={y + 2} width="1600" height="1.5" fill="#FFFFFF" opacity="0.14" />
        </g>
      ))}

      {/* Tie-rod recesses: a shadowed socket with a lit lower lip */}
      {[boardHeight * 2.5, boardHeight * 6.5, boardHeight * 10.5].map((y) =>
        [260, 660, 1060, 1460].map((x) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r="11" fill={t.recess} opacity="0.62" />
            <path
              d={`M ${x - 11} ${y} A 11 11 0 0 0 ${x + 11} ${y}`}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2"
              opacity="0.2"
            />
          </g>
        ))
      )}

      <rect width="1600" height="1000" fill={`url(#wash-${uid})`} />
    </g>
  );
}
