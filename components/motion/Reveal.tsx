"use client";

import { useRef, ElementType } from "react";
import clsx from "clsx";
import { useReveal } from "@/lib/animations/gsap-utils";

type RevealProps = {
  children: React.ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  threshold?: number;
};

/**
 * Lightweight fade-up reveal used across most sections. Backed by
 * IntersectionObserver + CSS transitions rather than GSAP, keeping GSAP
 * reserved for the signature motion moments (hero, counters, process).
 */
export function Reveal({ children, as, className, delay = 0, threshold }: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref, { threshold });

  return (
    <Tag
      ref={ref}
      className={clsx("reveal", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
