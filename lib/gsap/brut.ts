"use client";

import { EASE, gsap, outsideHero, queryAll } from "./gsap";

/**
 * Motion derived from the hard-shadow system rather than bolted on top of it.
 *
 * Every element in this file already carries a static `4px 4px 0` shadow. That
 * shadow is the resting state, so the entrance is the object arriving *at* it:
 * it starts displaced down-and-right, sitting on top of where its own shadow
 * will be, and slides up-and-left to reveal it. The shadow never animates —
 * `box-shadow` is a paint property and animating it on a grid of cards is the
 * classic way to drop frames. Only transform and opacity move, both of which
 * the compositor handles.
 */

/**
 * [data-brut-drop]        a group; its [data-brut-item] children land in sequence
 * data-brut-distance      px of travel (default 14)
 */
export function brutDrop() {
  outsideHero(queryAll("[data-brut-drop]")).forEach((group) => {
    const items = queryAll("[data-brut-item]", group);
    if (!items.length) return;

    const distance = Number(group.dataset.brutDistance) || 14;

    gsap.fromTo(
      items,
      { opacity: 0, x: distance, y: distance },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.62,
        ease: EASE.expo,
        stagger: 0.09,
        // The cards keep a hard shadow that must not sit on a fractional
        // pixel, and a lingering matrix() also blocks the hover timelines.
        clearProps: "transform",
        scrollTrigger: { trigger: group, start: "top 80%", once: true },
      }
    );
  });
}

/**
 * [data-draw-mark] on a CornerBracket. Its two arms are plain divs, so the draw
 * is a scale from the shared corner — mechanical, and transform-only.
 */
export function drawMark() {
  outsideHero(queryAll("[data-draw-mark]")).forEach((mark) => {
    const arms = Array.from(mark.children) as HTMLElement[];
    if (arms.length !== 2) return;

    const tl = gsap.timeline({
      scrollTrigger: { trigger: mark, start: "top 90%", once: true },
    });

    // Horizontal arm first, then vertical — the order a hand would draw it.
    tl.fromTo(arms[0], { scaleX: 0 }, { scaleX: 1, duration: 0.34, ease: "power2.out" })
      .fromTo(arms[1], { scaleY: 0 }, { scaleY: 1, duration: 0.34, ease: "power2.out" }, 0.16);

    gsap.set(arms[0], { transformOrigin: "left center" });
    gsap.set(arms[1], { transformOrigin: "center top" });
  });
}

/**
 * [data-split-words] — word-by-word reveal for standfirsts.
 *
 * Words are wrapped at runtime rather than in the markup so the served HTML
 * stays one clean text node for copy-paste, translation and screen readers.
 * Each word gets an overflow-hidden shell and the inner span is what moves, so
 * the words rise from behind their own baseline.
 *
 * Only the inner span is transformed, and only by GSAP — the CSS pre-state for
 * these is opacity, per the rule in the README. A transform in CSS would
 * compose with the tween and land the text permanently offset.
 */
export function splitWords() {
  outsideHero(queryAll("[data-split-words]")).forEach((block) => {
    // Idempotent: a route change can re-run this over already-split markup.
    if (block.querySelector("[data-word]")) return;
    // Rebuilding from textContent would delete any nested markup, so a block
    // carrying elements (an emphasised span, a link) is left alone entirely
    // rather than silently flattened.
    if (block.firstElementChild) return;

    const words = (block.textContent || "").split(/\s+/).filter(Boolean);
    if (words.length < 2 || words.length > 80) return;

    block.textContent = "";
    const inners: HTMLElement[] = [];

    words.forEach((word, i) => {
      const shell = document.createElement("span");
      shell.setAttribute("data-word", "");
      shell.style.display = "inline-block";
      shell.style.overflow = "hidden";
      shell.style.verticalAlign = "top";

      const inner = document.createElement("span");
      inner.style.display = "inline-block";
      inner.textContent = word;
      shell.appendChild(inner);
      inners.push(inner);

      block.appendChild(shell);
      // A real space between shells, so lines still wrap and the text still
      // reads as words rather than one run when copied.
      if (i < words.length - 1) block.appendChild(document.createTextNode(" "));
    });

    gsap.fromTo(
      inners,
      { yPercent: 108, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.7,
        ease: EASE.expo,
        stagger: 0.028,
        scrollTrigger: { trigger: block, start: "top 88%", once: true },
      }
    );
  });
}
