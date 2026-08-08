"use client";

import { DURATION, EASE, gsap, queryAll } from "./gsap";

/**
 * Choreographed hero entrance.
 *
 * Deliberately not a single fade of the whole page — each element enters on
 * its own beat, on the timeline positions from the brief:
 *
 *   0.10  navigation
 *   0.20  eyebrow
 *   0.30  headline line 1
 *   0.40  headline line 2  (via stagger)
 *   0.60  supporting paragraph
 *   0.75  CTA
 *   0.90  hero visual settles
 */
export function pageLoad() {
  const hero = document.querySelector("[data-hero]");
  const tl = gsap.timeline({ defaults: { ease: EASE.expo } });

  const nav = document.querySelector("[data-nav-shell]");
  if (nav) {
    tl.fromTo(nav, { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: 0.7 }, 0.1);
  }

  if (!hero) return tl;

  const eyebrow = hero.querySelector('[data-hero-item="eyebrow"]');
  const lines = queryAll("[data-reveal-line] > *", hero);
  const body = hero.querySelector('[data-hero-item="body"]');
  const cta = queryAll('[data-hero-item="cta"] > *', hero);
  const visual = hero.querySelector('[data-hero-item="visual"]');
  const visualInner = hero.querySelector('[data-hero-item="visual"] [data-hero-visual-inner]');

  if (eyebrow) {
    tl.fromTo(eyebrow, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.2);
  }

  if (lines.length) {
    tl.fromTo(
      lines,
      { opacity: 0, yPercent: 100 },
      { opacity: 1, yPercent: 0, duration: 1.05, stagger: 0.1 },
      0.3
    );
  }

  if (body) {
    tl.fromTo(body, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 0.6);
  }

  if (cta.length) {
    tl.fromTo(
      cta,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
      0.75
    );
  }

  // The hero image is already on screen at load; it settles rather than
  // wipes in, so the page never looks like it's still loading.
  if (visual) {
    tl.fromTo(
      visual,
      { opacity: 0 },
      { opacity: 1, duration: DURATION.image },
      0
    );
  }
  if (visualInner) {
    tl.fromTo(
      visualInner,
      { scale: 1.12 },
      { scale: 1, duration: 1.8, ease: EASE.power3 },
      0
    );
  }

  return tl;
}
