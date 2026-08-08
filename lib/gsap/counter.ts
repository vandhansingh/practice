"use client";

import { EASE, gsap, queryAll } from "./gsap";

/**
 * Counts a metric up to its final value on entry.
 *
 * The final, formatted value is what's rendered server-side, so the number is
 * correct and readable with JS off or motion reduced; this only replaces the
 * text while the tween is in flight and restores the exact original string on
 * completion. `data-counter-prefix` / `-suffix` keep symbols out of the maths.
 */
export function counter() {
  queryAll("[data-counter]").forEach((el) => {
    const target = Number(el.dataset.counter);
    if (!Number.isFinite(target)) return;

    const prefix = el.dataset.counterPrefix ?? "";
    const suffix = el.dataset.counterSuffix ?? "";
    const decimals = Number(el.dataset.counterDecimals ?? 0);
    const original = el.textContent ?? "";
    const state = { value: 0 };

    gsap.to(state, {
      value: target,
      duration: 1.4,
      ease: EASE.power3,
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
      onUpdate: () => {
        el.textContent = `${prefix}${state.value.toFixed(decimals)}${suffix}`;
      },
      onComplete: () => {
        el.textContent = original;
      },
    });
  });
}
