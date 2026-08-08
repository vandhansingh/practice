"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import clsx from "clsx";
import type { Testimonial } from "@/lib/data/testimonials";

export function TestimonialSlider({
  testimonials,
  light = false,
}: {
  testimonials: Testimonial[];
  light?: boolean;
}) {
  const [index, setIndex] = useState(0);

  const go = (dir: 1 | -1) => {
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);
  };

  return (
    <div>
      <div className="relative min-h-[260px] sm:min-h-[180px]">
        {testimonials.map((t, i) => (
          <blockquote
            key={t.name}
            aria-hidden={i !== index}
            className={clsx(
              "absolute inset-0 transition-all duration-700 ease-power3-out",
              i === index ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
            )}
          >
            <p
              className={clsx(
                "max-w-3xl text-balance font-serif italic leading-[1.3] tracking-tight",
                light ? "text-cream" : "text-foreground"
              )}
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.4rem)" }}
            >
              &ldquo;{t.quote}&rdquo;
            </p>
            <footer
              className={clsx(
                "mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px]",
                light ? "text-cream/60" : "text-muted"
              )}
            >
              <span className={clsx("font-medium", light ? "text-cream" : "text-foreground")}>
                {t.name}
              </span>
              <span aria-hidden>·</span>
              <span>
                {t.role}, {t.company}
              </span>
            </footer>
          </blockquote>
        ))}
      </div>

      <div className="mt-10 flex items-center gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous testimonial"
          className={clsx(
            "flex h-11 w-11 items-center justify-center rounded-full border transition-colors",
            light
              ? "border-cream/25 text-cream hover:border-cream hover:text-cream"
              : "border-border text-foreground hover:border-accent hover:text-accent"
          )}
        >
          <ArrowLeft size={17} />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next testimonial"
          className={clsx(
            "flex h-11 w-11 items-center justify-center rounded-full border transition-colors",
            light
              ? "border-cream/25 text-cream hover:border-cream hover:text-cream"
              : "border-border text-foreground hover:border-accent hover:text-accent"
          )}
        >
          <ArrowRight size={17} />
        </button>
        <div className="ml-2 flex items-center gap-2" role="tablist" aria-label="Testimonial selector">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              role="tab"
              aria-selected={i === index}
              aria-label={`Show testimonial from ${t.name}`}
              onClick={() => setIndex(i)}
              className={clsx(
                "h-[6px] rounded-full transition-all duration-300",
                i === index
                  ? light
                    ? "w-7 bg-cream"
                    : "w-7 bg-accent"
                  : light
                  ? "w-[6px] bg-cream/30"
                  : "w-[6px] bg-border"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
