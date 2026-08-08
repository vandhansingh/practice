import Link from "next/link";
import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";
import { AnchorHTMLAttributes } from "react";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  light?: boolean;
  className?: string;
  showArrow?: boolean;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">;

export function Button({
  href,
  children,
  variant = "primary",
  light = false,
  className,
  showArrow = true,
  ...rest
}: ButtonProps) {
  const base =
    "group inline-flex items-center gap-2.5 rounded-full text-[14px] font-semibold transition-all duration-300 ease-power3-out px-6 py-3.5 whitespace-nowrap";

  const variants = {
    primary: light
      ? "bg-cream text-accent hover:bg-white"
      : "bg-accent text-cream hover:bg-foreground",
    secondary: light
      ? "border border-cream/30 text-cream hover:border-cream hover:bg-cream/5"
      : "border border-border text-foreground hover:border-accent hover:bg-surface",
    ghost: light
      ? "text-cream hover:text-cream/70"
      : "text-foreground hover:text-accent px-0 py-0",
  };

  return (
    <Link href={href} className={clsx(base, variants[variant], className)} {...rest}>
      <span>{children}</span>
      {showArrow && (
        <ArrowUpRight
          size={16}
          className="transition-transform duration-300 ease-power3-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      )}
    </Link>
  );
}
