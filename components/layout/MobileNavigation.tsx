"use client";

import { useEffect, useRef, type RefObject } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { gsap, registerGsap, prefersReducedMotion, EASE } from "@/lib/gsap/gsap";
import { site } from "@/lib/data/site";

/** Entrance travel for a menu row, in px. Short — the stagger carries the read. */
const ITEM_RISE = 26;

/**
 * Full-screen mobile navigation.
 *
 * Portaled to <body> rather than rendered inside the header: the header is a
 * transformed, backdrop-filtered element, and per spec either of those makes it
 * the containing block for position:fixed descendants — which would collapse
 * this overlay to the height of the header bar.
 */
export function MobileNavigation({
  open,
  onClose,
  mounted,
  triggerRef,
}: {
  open: boolean;
  onClose: () => void;
  mounted: boolean;
  triggerRef: RefObject<HTMLButtonElement>;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const initialised = useRef(false);

  // Lock the page behind the overlay. The panel itself declares
  // `overscroll-contain`, which is what actually stops a touch drag from
  // chaining through to the document on iOS — `overflow: hidden` alone never
  // did. Deliberately *not* the position:fixed body trick: that resets
  // window.scrollY to 0, and this page has scrubbed ScrollTriggers that would
  // visibly rewind and replay around it.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  /*
   * Entrance and exit.
   *
   * Every tween is a `.to()`, never a `.fromTo()`. A `fromTo` jumps the element
   * back to its `from` values on the frame it starts, so toggling mid-flight
   * snaps; a `to` picks up from wherever the element currently sits, which is
   * what makes a fast double-tap read as a redirect rather than a glitch.
   *
   * The rows are re-armed to their offscreen offset only at the very end of a
   * *completed* exit, once they're already invisible. An interrupted exit
   * skips that set and simply tweens back from where it was.
   */
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const items = gsap.utils.toArray<HTMLElement>("[data-mobile-item]", panel);

    if (!initialised.current) {
      initialised.current = true;
      gsap.set(panel, { autoAlpha: 0, pointerEvents: "none" });
      gsap.set(items, { autoAlpha: 0, y: ITEM_RISE });
      if (!open) return;
    }

    if (prefersReducedMotion()) {
      gsap.set(panel, { autoAlpha: open ? 1 : 0, pointerEvents: open ? "auto" : "none" });
      gsap.set(items, { autoAlpha: open ? 1 : 0, y: 0 });
      return;
    }

    registerGsap();
    timeline.current?.kill();

    const tl = gsap.timeline();
    timeline.current = tl;

    if (open) {
      // Unhidden synchronously rather than from inside the timeline: a timeline
      // `.set()` still waits for the next tick, and a visibility:hidden subtree
      // cannot take focus — which silently dropped the focus move below on the
      // floor. The rows need it as much as the panel, since autoAlpha parks
      // each one at visibility:hidden while it's at opacity 0. Opacity still
      // does all the visible work; this only makes them reachable.
      gsap.set(panel, { visibility: "visible", pointerEvents: "auto" });
      gsap.set(items, { visibility: "visible" });

      // Ground first, content second. The ground only needs to establish that
      // the page behind is gone — 220ms — and the rows start before it lands so
      // the panel never sits blank.
      tl.to(panel, { autoAlpha: 1, duration: 0.22, ease: "power1.out", overwrite: "auto" })
        .to(
          items,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.42,
            ease: EASE.expo,
            stagger: 0.045,
            overwrite: "auto",
          },
          0.06
        );
    } else {
      // Roughly half the entrance, and the rows leave last-first so the exit
      // unwinds the order it arrived in rather than restaging it.
      tl.to(items, {
        autoAlpha: 0,
        y: 10,
        duration: 0.16,
        ease: "power2.in",
        stagger: { each: 0.022, from: "end" },
        overwrite: "auto",
      })
        .to(panel, { autoAlpha: 0, duration: 0.2, ease: "power2.in", overwrite: "auto" }, 0.05)
        .set(panel, { pointerEvents: "none" })
        .set(items, { y: ITEM_RISE });
    }

    return () => {
      tl.kill();
    };
    // `mounted` matters: the panel is portaled only once it flips true, so an
    // effect keyed on `open` alone would first run against a null ref and then
    // never re-run to lay down the closed state.
  }, [open, mounted]);

  // Escape to close, focus into the overlay on open and back to the trigger on
  // close, and Tab cycles the trigger plus the overlay's own controls. Without
  // the cycle, tabbing past the last row reaches the page behind — which is
  // still fully focusable, just covered.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const focusable = () =>
      [
        triggerRef.current,
        ...Array.from(panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")),
      ].filter((el): el is HTMLElement => Boolean(el));

    // Deferred a frame so focus lands after the row is on screen, not while
    // it's still at its entrance offset.
    const id = window.setTimeout(
      () => panel.querySelector<HTMLElement>("a[href]")?.focus({ preventScroll: true }),
      0
    );

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const nodes = focusable();
      if (!nodes.length) return;

      // Tab is driven entirely by hand rather than only wrapped at the ends.
      // Native order runs trigger → page content, because the overlay is
      // portaled to the end of <body> while the header sits near the start —
      // so wrapping the ends alone would still leak into the covered page on
      // the very first Tab.
      event.preventDefault();
      const index = nodes.indexOf(document.activeElement as HTMLElement);
      const next = index < 0 ? 0 : (index + (event.shiftKey ? -1 : 1) + nodes.length) % nodes.length;
      nodes[next].focus({ preventScroll: true });
    };

    document.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(id);
      document.removeEventListener("keydown", onKey);
      if (panel.contains(document.activeElement)) {
        triggerRef.current?.focus({ preventScroll: true });
      }
    };
  }, [open, mounted, onClose, triggerRef]);

  if (!mounted) return null;

  return createPortal(
    <div
      id="mobile-menu"
      ref={panelRef}
      className="pointer-events-none fixed inset-0 z-[70] flex flex-col justify-between overflow-y-auto overscroll-contain bg-charcoal px-[var(--gutter)] pb-12 pt-28 opacity-0 lg:hidden"
      aria-hidden={!open}
    >
      <nav aria-label="Mobile" className="flex flex-col">
        {site.nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            tabIndex={open ? 0 : -1}
            data-mobile-item
            className="border-b border-border-dark py-6 font-display text-[clamp(2.4rem,11vw,3.4rem)] leading-none tracking-[-0.02em] text-cream"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div data-mobile-item className="mt-12 flex flex-col gap-8">
        <Link
          href={site.cta.href}
          onClick={onClose}
          tabIndex={open ? 0 : -1}
          className="flex w-full items-center justify-center rounded-card bg-accent px-6 py-4 text-[0.9375rem] font-medium text-charcoal"
        >
          {site.ctaLong.label}
        </Link>
        <div className="flex flex-col gap-1 text-[0.8125rem] text-muted-light">
          <a href={`mailto:${site.email}`} tabIndex={open ? 0 : -1}>
            {site.email}
          </a>
          <span>{site.location}</span>
        </div>
      </div>
    </div>,
    document.body
  );
}
