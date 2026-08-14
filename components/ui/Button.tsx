import Link from "next/link";
import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";

type Variant = "primary" | "light" | "outline" | "outline-dark";

/**
 * Compact editorial button.
 *
 * The arrow sits in its own small box rather than floating beside the label,
 * which keeps the shape architectural instead of reading as a rounded SaaS
 * pill — and that box is where the red lives, echoing the single disc in the
 * hero collage.
 *
 * Red is deliberately not a button surface: cream-on-red measures 3.4:1 and
 * ink-on-red 4.3:1, both short of AA for label-sized text. As a graphic box
 * behind an icon it only needs 3:1, which it clears comfortably.
 *
 * The hard offset shadow and the press that collapses it are the neubrutalist
 * half of the system. The shadow colour follows the ground, not the button: an
 * ink shadow is invisible on a dark section, so `light` and `outline-dark`
 * carry the cream one.
 *
 *   primary → ink button, for light (cream) sections
 *   light   → cream button, for dark (ink) sections
 */
export function Button({
  href,
  children,
  variant = "primary",
  className,
  arrow = true,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
}) {
  const variants: Record<Variant, string> = {
    primary: "border-2 border-charcoal bg-charcoal text-cream shadow-brut hover:bg-charcoal-2",
    light: "border-2 border-cream bg-cream text-charcoal shadow-brut-light hover:bg-white",
    outline: "border-2 border-charcoal text-charcoal shadow-brut hover:bg-cream-dark",
    "outline-dark": "border-2 border-cream text-cream shadow-brut-light hover:bg-charcoal-2",
  };

  const boxes: Record<Variant, string> = {
    primary: "bg-accent text-charcoal",
    light: "bg-accent text-charcoal",
    outline: "bg-accent text-charcoal",
    "outline-dark": "bg-accent text-charcoal",
  };

  return (
    <Link
      href={href}
      className={clsx(
        "group inline-flex items-center gap-3 rounded-card py-1.5 pl-5 pr-1.5 text-[0.875rem] font-semibold",
        // The press travels exactly the shadow's offset and drops the shadow,
        // so the object lands flat on the page instead of merely dimming.
        // Linear and 100ms: a click is mechanical, not eased.
        "transition-[transform,box-shadow,background-color] duration-100 ease-linear",
        "active:translate-x-1 active:translate-y-1 active:shadow-none",
        "motion-reduce:transition-none",
        variants[variant],
        className
      )}
    >
      <span>{children}</span>
      {arrow && (
        <span
          className={clsx(
            "flex h-8 w-8 items-center justify-center rounded-card transition-transform duration-500 ease-expo group-hover:translate-x-0.5",
            boxes[variant]
          )}
        >
          <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
        </span>
      )}
    </Link>
  );
}

/** Minimal text link with an animated rule, for secondary actions. */
export function TextLink({
  href,
  children,
  className,
  onDark = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <Link
      href={href}
      className={clsx(
        "link-underline text-[0.875rem] font-medium",
        onDark ? "text-cream" : "text-charcoal",
        className
      )}
    >
      {children}
    </Link>
  );
}
