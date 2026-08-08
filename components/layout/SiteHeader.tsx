"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { site } from "@/lib/data/site";
import { DesktopNavigation } from "./DesktopNavigation";
import { MobileNavigation } from "./MobileNavigation";

/**
 * Compact floating navigation.
 *
 * Reads as an object sitting on top of the page rather than a full-width bar
 * fused to the top edge: inset from all three sides, dark against the cream
 * ground, with a small radius and a shadow that deepens slightly once the page
 * has scrolled. It stays present for the whole scroll journey — it never hides.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      data-nav-shell
      className="fixed inset-x-0 top-0 z-[80] px-[var(--gutter)] pt-4 sm:pt-5"
    >
      <div className="mx-auto max-w-container">
        <div
          className={clsx(
            "flex items-center justify-between rounded-card bg-charcoal pl-5 pr-2 transition-shadow duration-500 ease-power3",
            "h-[58px] sm:h-[62px]",
            // A hairline keeps the floating container legible as an object on
            // dark-hero pages, where charcoal-on-charcoal would otherwise make
            // the bar disappear entirely.
            "border border-white/[0.08]",
            scrolled ? "shadow-[0_10px_40px_-12px_rgba(27,26,24,0.55)]" : "shadow-none"
          )}
        >
          <Link
            href="/"
            className="flex items-baseline gap-3"
            aria-label={`${site.name} — home`}
          >
            <span className="font-display text-[1.375rem] leading-none tracking-[-0.02em] text-cream">
              {site.name}
            </span>
            <span
              aria-hidden="true"
              className="hidden h-3 w-px bg-border-dark sm:block"
            />
            <span className="hidden text-label uppercase text-muted-light sm:block">
              {site.discipline}
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <DesktopNavigation />

            <Link
              href={site.cta.href}
              className="hidden items-center rounded-[2px] bg-accent px-4 py-2.5 text-[0.8125rem] font-medium text-charcoal transition-colors duration-300 hover:bg-accent-deep sm:inline-flex"
            >
              {site.cta.label}
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="relative flex h-10 w-10 flex-col items-center justify-center gap-[6px] lg:hidden"
            >
              <span
                className={clsx(
                  "h-px w-5 bg-cream transition-transform duration-400 ease-expo",
                  menuOpen && "translate-y-[3.5px] rotate-45"
                )}
              />
              <span
                className={clsx(
                  "h-px w-5 bg-cream transition-transform duration-400 ease-expo",
                  menuOpen && "-translate-y-[3.5px] -rotate-45"
                )}
              />
            </button>
          </div>
        </div>
      </div>

      <MobileNavigation open={menuOpen} onClose={() => setMenuOpen(false)} mounted={mounted} />
    </header>
  );
}
