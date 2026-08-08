"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/** Register plugins exactly once, browser-side only. */
export function registerGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

export { gsap, ScrollTrigger };

/** Refined easings only — deliberately no bounce or elastic. */
export const EASE = {
  power3: "power3.out",
  power4: "power4.out",
  expo: "expo.out",
  circ: "circ.out",
} as const;

export const DURATION = {
  micro: 0.3,
  hover: 0.5,
  text: 0.9,
  image: 1.25,
  transition: 0.6,
} as const;

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Elements inside the hero are choreographed by pageLoad(), so the generic
 * scroll-reveal pass must skip them or they'd be animated twice.
 */
export function outsideHero<T extends Element>(nodes: T[]): T[] {
  return nodes.filter((node) => !node.closest("[data-hero]"));
}

export function queryAll<T extends Element = HTMLElement>(
  selector: string,
  root: ParentNode = document
): T[] {
  return Array.from(root.querySelectorAll<T>(selector));
}
