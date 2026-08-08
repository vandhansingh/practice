"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { site } from "@/lib/data/site";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // The menu is portaled to <body> rather than rendered inline: the header
  // gains backdrop-blur (a CSS "backdrop-filter") once scrolled or open,
  // and per spec that makes the header a new containing block for any
  // position:fixed descendant — which would collapse the full-screen menu
  // down to the header's own ~76px box. Portaling sidesteps that entirely.
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-power3-out",
        scrolled || menuOpen
          ? "border-b border-border/70 bg-cream/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-[76px] w-full max-w-container items-center justify-between px-5 sm:px-8 lg:px-16">
        <Link
          href="/"
          className="text-[19px] font-semibold tracking-tightest text-foreground"
          aria-label={`${site.name} — home`}
        >
          {site.name}
          <span className="ml-2 hidden text-[11px] font-medium uppercase tracking-label text-muted sm:inline">
            {site.tagline}
          </span>
        </Link>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "relative text-[14px] font-medium text-foreground/80 transition-colors hover:text-foreground",
                "after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300",
                "hover:after:w-full",
                pathname === item.href && "text-foreground after:w-full"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href={site.ctaPrimary.href}
            className="hidden rounded-full bg-accent px-5 py-2.5 text-[13px] font-semibold text-cream transition-colors duration-300 hover:bg-foreground sm:inline-flex"
          >
            {site.ctaPrimary.label}
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <span
              className={clsx(
                "h-px w-6 bg-foreground transition-transform duration-300",
                menuOpen && "translate-y-[3px] rotate-45"
              )}
            />
            <span
              className={clsx(
                "h-px w-6 bg-foreground transition-transform duration-300",
                menuOpen && "-translate-y-[3px] -rotate-45"
              )}
            />
          </button>
        </div>
      </div>

      {mounted &&
        createPortal(
          <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />,
          document.body
        )}
    </header>
  );
}
