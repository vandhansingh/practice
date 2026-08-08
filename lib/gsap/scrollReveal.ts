"use client";

import { EASE, gsap, outsideHero, queryAll } from "./gsap";

type Ctx = { gsap: typeof gsap };

/**
 * Generic reveal pass, driven by data attributes so sections can stay Server
 * Components.
 *
 *   [data-reveal]            fade + rise
 *   [data-reveal="left"]     slides in from the left
 *   [data-reveal="right"]    slides in from the right
 *   [data-reveal="scale"]    fades + settles down from a slight scale-up
 *   [data-reveal-group]      staggers its [data-reveal] descendants together
 *                            under a single ScrollTrigger
 *   [data-reveal-lines]      line-by-line display-type reveal
 *
 * Grouping matters for performance: one trigger per group beats one per node.
 */
export function scrollReveal(_ctx?: Ctx) {
  const groups = outsideHero(queryAll("[data-reveal-group]"));

  groups.forEach((group) => {
    const items = queryAll("[data-reveal]", group);
    if (!items.length) return;
    animate(items, group, true);
  });

  // Standalone reveals — anything not already covered by a group.
  const loose = outsideHero(queryAll("[data-reveal]")).filter(
    (el) => !el.closest("[data-reveal-group]")
  );
  loose.forEach((el) => animate([el], el, false));

  // Line-based display-type reveals.
  const lineBlocks = outsideHero(queryAll("[data-reveal-lines]"));
  lineBlocks.forEach((block) => {
    const lines = queryAll("[data-reveal-line] > *", block);
    if (!lines.length) return;
    gsap.fromTo(
      lines,
      { opacity: 0, yPercent: 100 },
      {
        opacity: 1,
        yPercent: 0,
        duration: 1,
        ease: EASE.expo,
        stagger: 0.09,
        scrollTrigger: { trigger: block, start: "top 85%", once: true },
      }
    );
  });
}

function animate(items: HTMLElement[], trigger: Element, stagger: boolean) {
  const mode = (items[0].dataset.reveal || "up").trim();

  const from: gsap.TweenVars = { opacity: 0 };
  const to: gsap.TweenVars = {
    opacity: 1,
    duration: 1,
    ease: EASE.power3,
    scrollTrigger: { trigger, start: "top 82%", once: true },
  };

  switch (mode) {
    case "left":
      from.x = -48;
      to.x = 0;
      break;
    case "right":
      from.x = 48;
      to.x = 0;
      break;
    case "scale":
      from.scale = 1.04;
      to.scale = 1;
      from.y = 24;
      to.y = 0;
      break;
    case "fade":
      break;
    default:
      from.y = 50;
      to.y = 0;
  }

  if (stagger) to.stagger = 0.12;

  gsap.fromTo(items, from, to);
}
