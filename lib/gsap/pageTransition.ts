"use client";

import { EASE, gsap } from "./gsap";

/**
 * Arrival transition for client-side navigation.
 *
 * A deliberate choice: this animates the incoming content rather than covering
 * the screen with an overlay and intercepting link clicks. Intercepting
 * navigation to play an exit animation makes every click wait on decoration —
 * exactly the "never make the website feel slow" failure mode. A 0.5s fade-up
 * on arrival reads as a transition and costs the visitor nothing.
 *
 * Skipped on first load, where pageLoad()'s hero timeline is the entrance.
 */
export function pageTransition(isFirstLoad: boolean) {
  if (isFirstLoad) return;

  const main = document.getElementById("main-content");
  if (!main) return;

  gsap.fromTo(
    main,
    { opacity: 0, y: 18 },
    { opacity: 1, y: 0, duration: 0.5, ease: EASE.expo, clearProps: "transform" }
  );
}
