"use client";

import { useState } from "react";
import clsx from "clsx";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Testimonial } from "@/lib/data/testimonials";

/**
 * Large editorial quotation with minimal controls.
 *
 * Slides are stacked in a single grid cell rather than absolutely positioned, so
 * the container is naturally as tall as the longest quote — no magic min-height
 * that breaks when copy changes or the viewport narrows.
 */
export function TestimonialSlider({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + items.length) % items.length);

  return (
    <div>
      <div className="grid">
        {items.map((item, i) => {
          const active = i === index;
          return (
            <blockquote
              key={item.company}
              aria-hidden={!active}
              className={clsx(
                "col-start-1 row-start-1 transition-all duration-700 ease-expo",
                active
                  ? "translate-x-0 opacity-100"
                  : "pointer-events-none translate-x-5 opacity-0"
              )}
            >
              <p className="max-w-[38ch] font-display text-display-md text-cream">
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer className="mt-10 flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border-dark text-[0.6875rem] font-medium tracking-wider text-muted-light"
                >
                  {item.company
                    .split(" ")
                    .slice(0, 2)
                    .map((w) => w[0])
                    .join("")}
                </span>
                <span className="text-[0.875rem] leading-snug">
                  <span className="block text-cream">{item.role}</span>
                  <span className="block text-muted">{item.company}</span>
                </span>
              </footer>
            </blockquote>
          );
        })}
      </div>

      <div className="mt-12 flex items-center gap-3">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous testimonial"
          className="flex h-11 w-11 items-center justify-center rounded-[2px] border border-border-dark text-cream transition-colors duration-300 hover:border-accent hover:text-accent"
        >
          <ArrowLeft size={16} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next testimonial"
          className="flex h-11 w-11 items-center justify-center rounded-[2px] border border-border-dark text-cream transition-colors duration-300 hover:border-accent hover:text-accent"
        >
          <ArrowRight size={16} aria-hidden="true" />
        </button>

        <span className="ml-4 tabular text-[0.8125rem] text-muted">
          {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
