"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { prefersReducedMotion, registerGsap } from "@/lib/gsap/gsap";
import { pageLoad } from "@/lib/gsap/pageLoad";
import { scrollReveal } from "@/lib/gsap/scrollReveal";
import { imageReveal } from "@/lib/gsap/imageReveal";
import { parallax, heroScrollOut } from "@/lib/gsap/parallax";
import { counter } from "@/lib/gsap/counter";
import { hover } from "@/lib/gsap/hover";
import { pageTransition } from "@/lib/gsap/pageTransition";
import { brutDrop, drawMark, splitWords } from "@/lib/gsap/brut";
import { marquee } from "@/lib/gsap/marquee";

/**
 * Single motion entry point for the whole site.
 *
 * Sections stay Server Components and simply declare intent with data
 * attributes; this one client component reads them and builds every animation
 * inside a single gsap.context() that is reverted on route change. That keeps
 * ScrollTrigger instances proportional to the content actually on the page
 * rather than to the number of components.
 */
export function MotionController() {
  const pathname = usePathname();
  const firstLoad = useRef(true);

  useEffect(() => {
    const root = document.documentElement;

    // Reduced motion: the inline head script never adds .js-motion, so content
    // is already visible. Nothing to build.
    if (prefersReducedMotion()) {
      firstLoad.current = false;
      return;
    }

    const { gsap, ScrollTrigger } = registerGsap();
    let ctx: gsap.Context | undefined;
    let mm: gsap.MatchMedia | undefined;
    let onLoad: (() => void) | undefined;

    try {
      const isFirst = firstLoad.current;

      ctx = gsap.context(() => {
        pageTransition(isFirst);
        if (isFirst) pageLoad();
        // Before scrollReveal: this one rewrites text nodes into spans, and a
        // ScrollTrigger created first would have measured the old heights.
        splitWords();
        scrollReveal();
        imageReveal();
        counter();
        heroScrollOut();
        brutDrop();
        drawMark();
      });

      // Responsive-only motion. matchMedia tears these down automatically
      // when the query stops matching (e.g. on resize to mobile).
      mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => parallax());
      mm.add("(min-width: 1024px) and (pointer: fine)", () => hover());
      // The ticker is the only continuously-running animation on the page, so
      // it is the one worth cutting on a phone: it would otherwise keep a
      // compositor thread awake for the entire visit.
      mm.add("(min-width: 640px)", () => marquee());

      // Late-arriving webfonts and images change element heights, which
      // invalidates every start/end position ScrollTrigger measured.
      onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);
      ScrollTrigger.refresh();
    } catch {
      // If motion setup fails for any reason, drop the pre-state class so the
      // page renders fully visible instead of stranding hidden content.
      root.classList.remove("js-motion");
    }

    firstLoad.current = false;

    return () => {
      if (onLoad) window.removeEventListener("load", onLoad);
      mm?.kill();
      ctx?.revert();
    };
  }, [pathname]);

  return null;
}
