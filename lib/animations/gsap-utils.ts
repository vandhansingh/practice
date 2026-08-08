"use client";

import { useEffect, useLayoutEffect } from "react";

// useLayoutEffect warns during SSR ("does nothing on the server"); this
// resolves to a no-op on the server and the real thing in the browser, so
// we can arm the hidden reveal state before first paint without a warning.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Central GSAP registration. Import this once, lazily, from any client
 * component that needs GSAP + ScrollTrigger. Keeps the plugin registration
 * out of server-rendered code paths entirely.
 */
export async function getGsap() {
  const gsapModule = await import("gsap");
  const { ScrollTrigger } = await import("gsap/ScrollTrigger");
  const gsap = gsapModule.gsap ?? gsapModule.default;
  gsap.registerPlugin(ScrollTrigger);
  return { gsap, ScrollTrigger };
}

export const EASE = {
  power3: "power3.out",
  expo: "expo.out",
};

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Hook: reveals an element (adds .is-visible) when it enters the viewport.
 *
 * Content is visible by default in the server-rendered HTML — this hook
 * only *hides* the element once JS has mounted (via useLayoutEffect, ahead
 * of first paint), then reveals it again through an IntersectionObserver.
 * That way no-JS visitors, crawlers, and prefers-reduced-motion users
 * always see full content; only capable browsers get the entrance motion.
 */
export function useReveal<T extends HTMLElement>(
  ref: React.RefObject<T>,
  options?: { threshold?: number; rootMargin?: string }
) {
  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      return;
    }

    el.classList.add("reveal-armed");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: options?.threshold ?? 0.15, rootMargin: options?.rootMargin ?? "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, options?.threshold, options?.rootMargin]);
}

/* ------------------------------------------------------------------ */
/* GSAP-driven utilities — used for the signature motion moments only  */
/* (hero timeline, counters, process scroll progression, image         */
/* parallax). Everything else uses the lightweight CSS+IO reveal above  */
/* to keep GSAP out of the critical path for most pages.                */
/* ------------------------------------------------------------------ */

// gsap and ScrollTrigger are only ever obtained via the dynamic getGsap()
// import above, so we type them loosely here rather than importing gsap's
// namespace at module scope (which would pull it into the server bundle).
type GsapInstance = any;

export function fadeUp(gsap: GsapInstance, target: any, opts?: Record<string, unknown>) {
  return gsap.fromTo(
    target,
    { opacity: 0, y: 28 },
    { opacity: 1, y: 0, duration: 0.9, ease: EASE.expo, ...opts }
  );
}

export function splitTextReveal(gsap: GsapInstance, lines: any, opts?: Record<string, unknown>) {
  return gsap.fromTo(
    lines,
    { opacity: 0, y: "100%" },
    { opacity: 1, y: "0%", duration: 0.9, ease: EASE.expo, stagger: 0.08, ...opts }
  );
}

export function staggerReveal(gsap: GsapInstance, targets: any, opts?: Record<string, unknown>) {
  return gsap.fromTo(
    targets,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.7, ease: EASE.power3, stagger: 0.08, ...opts }
  );
}

export function revealImage(
  gsap: GsapInstance,
  ScrollTrigger: any,
  container: Element,
  image: Element
) {
  return gsap.fromTo(
    image,
    { scale: 1.08 },
    {
      scale: 1,
      duration: 1.3,
      ease: EASE.expo,
      scrollTrigger: { trigger: container, start: "top 85%" },
    }
  );
}

export function parallaxImage(gsap: GsapInstance, ScrollTrigger: any, target: Element, distance = 60) {
  return gsap.fromTo(
    target,
    { y: -distance },
    {
      y: distance,
      ease: "none",
      scrollTrigger: { trigger: target, start: "top bottom", end: "bottom top", scrub: true },
    }
  );
}

export function counterAnimation(
  gsap: GsapInstance,
  ScrollTrigger: any,
  el: HTMLElement,
  to: number,
  opts?: { prefix?: string; suffix?: string; decimals?: number }
) {
  const state = { value: 0 };
  return gsap.to(state, {
    value: to,
    duration: 1.6,
    ease: EASE.power3,
    scrollTrigger: { trigger: el, start: "top 85%", once: true },
    onUpdate: () => {
      const v = opts?.decimals ? state.value.toFixed(opts.decimals) : Math.round(state.value);
      el.textContent = `${opts?.prefix ?? ""}${v}${opts?.suffix ?? ""}`;
    },
  });
}

/** Stagger-reveal a list of child elements via CSS transition delays. */
export function useStaggerReveal<T extends HTMLElement>(
  ref: React.RefObject<T>,
  childSelector: string,
  staggerMs = 90
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const children = Array.from(el.querySelectorAll<HTMLElement>(childSelector));

    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      children.forEach((c) => c.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            children.forEach((child, i) => {
              (child as HTMLElement).style.transitionDelay = `${i * staggerMs}ms`;
              child.classList.add("is-visible");
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, childSelector, staggerMs]);
}
