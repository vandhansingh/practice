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
    primary: "bg-charcoal text-cream hover:bg-charcoal-2",
    light: "bg-cream text-charcoal hover:bg-white",
    outline: "border border-border text-charcoal hover:border-charcoal",
    "outline-dark": "border border-border-dark text-cream hover:border-cream",
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
        "group inline-flex items-center gap-3 rounded-card py-1.5 pl-5 pr-1.5 text-[0.875rem] font-medium transition-colors duration-300 ease-power3",
        variants[variant],
        className
      )}
    >
      <span>{children}</span>
      {arrow && (
        <span
          className={clsx(
            "flex h-8 w-8 items-center justify-center rounded-[2px] transition-transform duration-500 ease-expo group-hover:translate-x-0.5",
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
