"use client";

import { gsap, queryAll } from "./gsap";

/**
 * Very restrained image drift. Registered through gsap.matchMedia() by the
 * caller so it exists on pointer-capable large screens only and is torn down
 * automatically below the breakpoint — mobile never pays for it.
 */
export function parallax() {
  queryAll("[data-parallax]").forEach((el) => {
    const amount = Number(el.dataset.parallax) || 6;
    gsap.fromTo(
      el,
      { yPercent: -amount },
      {
        yPercent: amount,
        ease: "none",
        scrollTrigger: {
          trigger: el.closest("[data-image-mask]") || el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  });
}

/**
 * Hero departure: as the first viewport scrolls away the headline drifts up
 * and fades slightly while the backdrop sinks, so the next section feels like
 * it arrives over the top rather than simply following.
 */
export function heroScrollOut() {
  const hero = document.querySelector("[data-hero]");
  if (!hero) return;

  const content = hero.querySelector("[data-hero-content]");
  // Deliberately the drift wrapper, not [data-hero-visual-inner] — that one is
  // owned by the load timeline's scale tween, and two tweens writing transform
  // on one element compose rather than override.
  const visual = hero.querySelector("[data-hero-visual-drift]");

  if (content) {
    gsap.to(content, {
      y: -70,
      opacity: 0.35,
      ease: "none",
      scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
    });
  }

  if (visual) {
    gsap.to(visual, {
      y: 90,
      scale: 1.06,
      ease: "none",
      scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
    });
  }
}
