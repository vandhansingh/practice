"use client";

import { DURATION, EASE, gsap, outsideHero, queryAll } from "./gsap";

/**
 * Editorial image reveal: the wrapper clips open from the bottom while the
 * visual inside settles down from a slight scale-up. Both ends of both
 * tweens are stated explicitly so the CSS pre-state can hold the closed
 * position without the tween disagreeing about where to land.
 */
export function imageReveal() {
  const wrappers = outsideHero(queryAll("[data-image-reveal]"));

  wrappers.forEach((wrapper) => {
    const inner = wrapper.firstElementChild;
    if (!inner) return;

    const tl = gsap.timeline({
      scrollTrigger: { trigger: wrapper, start: "top 88%", once: true },
    });

    tl.fromTo(
      inner,
      { clipPath: "inset(0 0 100% 0)" },
      { clipPath: "inset(0 0 0% 0)", duration: DURATION.image, ease: EASE.expo },
      0
    ).fromTo(
      inner,
      { scale: 1.12 },
      { scale: 1, duration: DURATION.image + 0.25, ease: EASE.power3 },
      0
    );
  });
}
