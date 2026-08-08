"use client";

import { EASE, gsap, queryAll } from "./gsap";

/**
 * Desktop hover choreography for editorial list items and cards.
 *
 * CSS transitions would handle each property individually; running them on a
 * single paused GSAP timeline keeps the image scale, arrow travel and text
 * shift on one shared ease so the whole card moves as one object instead of
 * three things that happen to start together.
 *
 * Registered via gsap.matchMedia() for fine pointers only, so touch devices
 * never build these timelines.
 */
export function hover() {
  const cards = queryAll("[data-hover-card]");
  const teardown: Array<() => void> = [];

  cards.forEach((card) => {
    const image = card.querySelector("[data-hover-image]");
    const arrow = card.querySelector("[data-hover-arrow]");
    const shift = card.querySelector("[data-hover-shift]");

    const tl = gsap.timeline({ paused: true, defaults: { ease: EASE.power3, duration: 0.55 } });

    if (image) tl.to(image, { scale: 1.04 }, 0);
    if (arrow) tl.to(arrow, { x: 8, y: -8 }, 0);
    if (shift) tl.to(shift, { x: 6 }, 0);

    const enter = () => tl.play();
    const leave = () => tl.reverse();

    card.addEventListener("pointerenter", enter);
    card.addEventListener("pointerleave", leave);
    card.addEventListener("focusin", enter);
    card.addEventListener("focusout", leave);

    teardown.push(() => {
      card.removeEventListener("pointerenter", enter);
      card.removeEventListener("pointerleave", leave);
      card.removeEventListener("focusin", enter);
      card.removeEventListener("focusout", leave);
      tl.kill();
    });
  });

  // Returned to gsap.matchMedia(), which calls it when the query stops matching.
  return () => teardown.forEach((fn) => fn());
}
