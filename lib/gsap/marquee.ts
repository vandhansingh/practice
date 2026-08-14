"use client";

import { gsap, queryAll } from "./gsap";

/**
 * Infinite horizontal ticker.
 *
 *   [data-marquee]        the clipping frame
 *   [data-marquee-track]  the strip that moves; must contain the content twice
 *   data-marquee-speed    seconds for one full pass (default 26)
 *   data-marquee-reverse  present to run right-to-left
 *
 * Linear easing and no fade at the edges, on purpose: an eased marquee reads as
 * a mistake, and a fade mask is the soft treatment this design rejects. The
 * strip is translated by exactly -50%, which is why the content has to be
 * duplicated — at -50% the second copy sits precisely where the first started,
 * so the loop point is invisible.
 *
 * Content-driven, not decorative: it repeats the service names, which is
 * information a visitor scanning the page can use.
 */
export function marquee() {
  const teardown: Array<() => void> = [];

  queryAll("[data-marquee]").forEach((frame) => {
    const track = frame.querySelector<HTMLElement>("[data-marquee-track]");
    if (!track) return;

    const speed = Number(frame.dataset.marqueeSpeed) || 26;
    const reverse = frame.hasAttribute("data-marquee-reverse");

    const tween = gsap.fromTo(
      track,
      { xPercent: reverse ? -50 : 0 },
      {
        xPercent: reverse ? 0 : -50,
        duration: speed,
        ease: "none",
        repeat: -1,
      }
    );

    // Slow rather than stop on hover: a hard halt loses the read of a
    // continuous strip, and stopping dead also strands whatever the pointer is
    // over mid-glyph.
    const slow = () => gsap.to(tween, { timeScale: 0.25, duration: 0.4, overwrite: true });
    const resume = () => gsap.to(tween, { timeScale: 1, duration: 0.6, overwrite: true });

    frame.addEventListener("pointerenter", slow);
    frame.addEventListener("pointerleave", resume);
    frame.addEventListener("focusin", slow);
    frame.addEventListener("focusout", resume);

    teardown.push(() => {
      frame.removeEventListener("pointerenter", slow);
      frame.removeEventListener("pointerleave", resume);
      frame.removeEventListener("focusin", slow);
      frame.removeEventListener("focusout", resume);
      tween.kill();
    });
  });

  return () => teardown.forEach((fn) => fn());
}
