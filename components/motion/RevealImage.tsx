"use client";

import { useRef } from "react";
import clsx from "clsx";
import { useReveal } from "@/lib/animations/gsap-utils";

/**
 * Overflow-hidden mask + scale-down-on-reveal treatment for imagery.
 * Wrap any image or visual in this to get the signature editorial
 * "settle into place" entrance described in the design brief.
 */
export function RevealImage({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref, { threshold: 0.1 });

  return (
    <div ref={ref} className={clsx("reveal reveal-image-mask", className)}>
      {children}
    </div>
  );
}
