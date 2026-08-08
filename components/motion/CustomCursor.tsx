"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Subtle desktop-only cursor indicator. Shows a small "VIEW" circle when
 * hovering any element with [data-cursor="view"]. Disabled entirely on
 * touch devices and when prefers-reduced-motion is set.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFinePointer || reduced) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
      const target = e.target as HTMLElement;
      setActive(Boolean(target.closest('[data-cursor="view"]')));
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="cursor-dot flex items-center justify-center rounded-full border border-accent/40 bg-cream/90 text-[10px] font-semibold uppercase tracking-label text-accent transition-all duration-200 ease-power3-out"
      style={{
        width: active ? 56 : 0,
        height: active ? 56 : 0,
        opacity: active ? 1 : 0,
      }}
    >
      {active && "View"}
    </div>
  );
}
