import Link from "next/link";
import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";

type Variant = "primary" | "light" | "outline" | "outline-dark";

/**
 * Compact editorial button. The arrow sits in its own small box rather than
 * floating next to the label, which keeps the shape architectural instead of
 * reading as a rounded SaaS pill.
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
    primary: "bg-accent text-charcoal hover:bg-accent-deep",
    light: "bg-cream text-charcoal hover:bg-white",
    outline: "border border-border text-charcoal hover:border-charcoal",
    "outline-dark": "border border-border-dark text-cream hover:border-cream",
  };

  const boxes: Record<Variant, string> = {
    primary: "bg-charcoal/10",
    light: "bg-charcoal/10",
    outline: "bg-charcoal/5",
    "outline-dark": "bg-cream/10",
  };

  return (
    <Link
      href={href}
      className={clsx(
        "group inline-flex items-center gap-3 rounded-card pl-5 pr-1.5 py-1.5 text-[0.875rem] font-medium transition-colors duration-300 ease-power3",
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
