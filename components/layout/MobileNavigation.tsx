"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { gsap, registerGsap, prefersReducedMotion, EASE } from "@/lib/gsap/gsap";
import { site } from "@/lib/data/site";

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
}: {
  open: boolean;
  onClose: () => void;
  mounted: boolean;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  // Escape to close, and lock the page behind the overlay.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  // Staggered entrance / reversed exit.
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    if (prefersReducedMotion()) {
      gsap.set(panel, { autoAlpha: open ? 1 : 0 });
      gsap.set(panel.querySelectorAll("[data-mobile-item]"), { autoAlpha: 1, y: 0 });
      return;
    }

    registerGsap();
    timeline.current?.kill();

    const items = panel.querySelectorAll("[data-mobile-item]");

    if (open) {
      const tl = gsap.timeline();
      tl.set(panel, { pointerEvents: "auto" })
        .fromTo(panel, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, ease: EASE.expo })
        .fromTo(
          items,
          { autoAlpha: 0, y: 34 },
          { autoAlpha: 1, y: 0, duration: 0.7, ease: EASE.expo, stagger: 0.07 },
          0.1
        );
      timeline.current = tl;
    } else {
      const tl = gsap.timeline();
      tl.to(items, { autoAlpha: 0, y: 18, duration: 0.28, ease: "power2.in", stagger: 0.03 })
        .to(panel, { autoAlpha: 0, duration: 0.3, ease: "power2.in" }, 0.1)
        .set(panel, { pointerEvents: "none" });
      timeline.current = tl;
    }

    return () => {
      timeline.current?.kill();
    };
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <div
      id="mobile-menu"
      ref={panelRef}
      className="pointer-events-none fixed inset-0 z-[70] flex flex-col justify-between bg-charcoal px-[var(--gutter)] pb-12 pt-28 opacity-0 lg:hidden"
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

      <div data-mobile-item className="flex flex-col gap-8">
        <Link
          href={site.cta.href}
          onClick={onClose}
          tabIndex={open ? 0 : -1}
          className="flex w-full items-center justify-center rounded-card bg-accent px-6 py-4 text-[0.9375rem] font-medium text-charcoal"
        >
          {site.ctaLong.label}
        </Link>
        <div className="flex flex-col gap-1 text-[0.8125rem] text-muted-light">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <span>{site.location}</span>
        </div>
      </div>
    </div>,
    document.body
  );
}
