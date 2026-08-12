import clsx from "clsx";

/**
 * The three repeating marks from the brand board.
 *
 * They carry the identity more than any single layout does, so they're kept as
 * primitives rather than inlined: a red corner bracket that anchors the top-left
 * of a panel, a small red square, and an amber dot.
 *
 * All three are decorative and are hidden from assistive tech.
 */

/** The signature L-shaped corner mark. */
export function CornerBracket({
  className,
  size = 28,
  weight = 8,
  color = "accent",
}: {
  className?: string;
  size?: number;
  weight?: number;
  color?: "accent" | "cream";
}) {
  const fill = color === "accent" ? "bg-accent" : "bg-cream";
  return (
    <span
      aria-hidden="true"
      className={clsx("pointer-events-none relative block", className)}
      style={{ width: size, height: size }}
    >
      <span className={clsx("absolute left-0 top-0", fill)} style={{ width: size, height: weight }} />
      <span className={clsx("absolute left-0 top-0", fill)} style={{ width: weight, height: size }} />
    </span>
  );
}

/** Small solid red square. */
export function RedSquare({ className, size = 10 }: { className?: string; size?: number }) {
  return (
    <span
      aria-hidden="true"
      className={clsx("pointer-events-none block bg-accent", className)}
      style={{ width: size, height: size }}
    />
  );
}

/**
 * Amber dot.
 *
 * Purely decorative — amber measures 1.8:1 on paper, so it must never carry
 * text or an icon.
 */
export function AmberDot({ className, size = 14 }: { className?: string; size?: number }) {
  return (
    <span
      aria-hidden="true"
      className={clsx("pointer-events-none block rounded-full bg-amber", className)}
      style={{ width: size, height: size }}
    />
  );
}
