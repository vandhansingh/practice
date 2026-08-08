"use client";

import { useEffect, useRef } from "react";
import { getGsap, counterAnimation, prefersReducedMotion } from "@/lib/animations/gsap-utils";

export function Counter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.textContent = `${prefix}${value}${suffix}`;
      return;
    }

    let ctx: any;
    getGsap().then(({ gsap, ScrollTrigger }) => {
      ctx = gsap.context(() => {
        counterAnimation(gsap, ScrollTrigger, el, value, { prefix, suffix, decimals });
      });
    });

    return () => ctx?.revert();
  }, [value, prefix, suffix, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
