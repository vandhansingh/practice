"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
 * fused to the top edge: inset from all three sides, square, dark against the
 * cream ground, and lifted off the page by a hard red offset once it has
 * scrolled. It stays present for the whole scroll journey — it never hides.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pressed, setPressed] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  // One passive listener drives both the shadow and the progress rail. The rail
  // is written to a CSS custom property rather than React state: scroll fires
  // far more often than it is worth re-rendering a tree for, and a variable
  // change only invalidates the one transform that reads it.
  useEffect(() => {
    const bar = barRef.current;
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      if (!bar) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.setProperty("--progress", max > 0 ? String(Math.min(1, window.scrollY / max)) : "0");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Stable identity: the overlay keys its focus effect on this, and a fresh
  // closure each render would tear that effect down mid-open — cancelling the
  // focus move and bouncing focus back out to this button.
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header
      data-nav-shell
      className="fixed inset-x-0 top-0 z-[80] px-[var(--gutter)] pt-4 sm:pt-5"
    >
      <div className="mx-auto max-w-container">
        <div
          ref={barRef}
          className={clsx(
            "relative flex items-center justify-between rounded-card bg-charcoal pl-5 pr-2 transition-shadow duration-200 ease-linear",
            "h-[58px] sm:h-[62px]",
            // A hairline keeps the floating container legible as an object on
            // dark-hero pages, where charcoal-on-charcoal would otherwise make
            // the bar disappear entirely.
            "border border-white/[0.08]",
            // Once the page has moved the bar lifts off it — a hard red offset
            // rather than the blurred drop it used to carry. Red is the only
            // shadow that reads against both cream and ink grounds, and it
            // carries no text, so its 3.6:1 is irrelevant here.
            scrolled ? "shadow-brut-red" : "shadow-none"
          )}
        >
          {/*
            Read depth. Sits on the bar's bottom edge and scales from the left,
            so it costs one composited transform per scroll frame and no layout.
            Decorative — the same information is in the scrollbar.
          */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] origin-left bg-accent"
            style={{ transform: "scaleX(var(--progress, 0))" }}
          />

          <Link
            href="/"
            // py-1 buys the 24x24 minimum without changing the bar height.
            className="flex items-baseline gap-3 py-1"
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
              className="hidden items-center rounded-card border-2 border-charcoal bg-accent px-4 py-2.5 text-[0.8125rem] font-semibold text-charcoal transition-[transform,background-color] duration-100 ease-linear hover:bg-accent-deep active:translate-x-0.5 active:translate-y-0.5 motion-reduce:transition-none sm:inline-flex"
            >
              {site.cta.label}
            </Link>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              onPointerDown={() => setPressed(true)}
              onPointerUp={() => setPressed(false)}
              onPointerLeave={() => setPressed(false)}
              onPointerCancel={() => setPressed(false)}
              onBlur={() => setPressed(false)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="relative -mr-0.5 flex h-11 w-11 touch-manipulation items-center justify-center lg:hidden"
            >
              {/*
                Press state lives on its own wrapper so it never composes with
                the stroke transforms below. It compresses in 100ms — faster
                than any perceptual threshold, so the icon feels physically
                connected to the finger — and releases over 400ms.
              */}
              <span
                aria-hidden="true"
                className={clsx(
                  "relative block h-[7px] w-5 transition-transform ease-standard motion-reduce:transition-none",
                  pressed ? "scale-[0.84] duration-100" : "scale-100 duration-400"
                )}
              >
                <IconStroke open={menuOpen} edge="top" />
                <IconStroke open={menuOpen} edge="bottom" />
              </span>
            </button>
          </div>
        </div>
      </div>

      <MobileNavigation
        open={menuOpen}
        onClose={closeMenu}
        mounted={mounted}
        triggerRef={menuButtonRef}
      />
    </header>
  );
}

/**
 * One stroke of the menu icon, morphing between two bars and a cross.
 *
 * The move is deliberately two-phase rather than one blended tween: the strokes
 * slide together first, then pivot. Doing both at once is what makes most
 * hamburger icons read as a smear — the eye can't track a point that is
 * translating and rotating simultaneously over 400ms, so the shape reads as
 * mush in the middle. Separated, it reads as a mechanism: close, then turn.
 *
 * Translate and rotate therefore live on separate elements. They are distinct
 * `transform` values on distinct nodes, which is the only way to give them
 * independent durations and delays — two transforms on one node compose rather
 * than sequence.
 *
 * Timings are asymmetric and mirrored. Opening leads with the slide (180ms) and
 * overlaps the pivot slightly at 140ms so the phases read as one continuous
 * gesture instead of two beats. Closing reverses the order and runs shorter in
 * total (340ms vs 400ms): dismissal should feel like it got out of the way,
 * not like it was replayed backwards.
 *
 * These are CSS transitions rather than a JS timeline on purpose. A transition
 * always interpolates from the current computed value, so hammering the button
 * mid-morph redirects smoothly from wherever the strokes actually are — there
 * is no state to reconcile and nothing snaps.
 */
function IconStroke({ open, edge }: { open: boolean; edge: "top" | "bottom" }) {
  const top = edge === "top";

  return (
    <span
      aria-hidden="true"
      className={clsx(
        "absolute inset-x-0 block transition-transform ease-apple motion-reduce:transition-none",
        top ? "top-0" : "bottom-0",
        open
          ? clsx("duration-180 delay-0", top ? "translate-y-[3px]" : "-translate-y-[3px]")
          : "translate-y-0 duration-220 delay-120"
      )}
    >
      <span
        className={clsx(
          "block h-px w-full origin-center bg-cream transition-transform ease-apple motion-reduce:transition-none",
          open
            ? clsx("duration-260 delay-140", top ? "rotate-45" : "-rotate-45")
            : "rotate-0 duration-200 delay-0"
        )}
      />
    </span>
  );
}
