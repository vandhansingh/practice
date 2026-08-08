"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Step = { number: string; title: string; description: string };

export function Process({
  steps,
  eyebrow = "How we work",
  title = "From bottleneck to system.",
}: {
  steps: Step[];
  eyebrow?: string;
  title?: string;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const container = listRef.current;
    if (!container) return;
    const items = Array.from(container.querySelectorAll<HTMLElement>("[data-step]"));
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.step);
            setActive(idx);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-background py-24 lg:py-36">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} />

        <div ref={listRef} className="relative mt-16 border-t border-border">
          <div
            aria-hidden
            className="absolute left-0 top-0 hidden w-[2px] bg-accent transition-all duration-500 ease-power3-out lg:block"
            style={{ height: `${((active + 1) / steps.length) * 100}%` }}
          />
          {steps.map((step, i) => (
            <div
              key={step.number}
              data-step={i}
              className={clsx(
                "grid grid-cols-1 gap-3 border-b border-border py-9 transition-opacity duration-500 sm:grid-cols-12 sm:gap-6 lg:pl-8",
                active === i ? "opacity-100" : "opacity-50"
              )}
            >
              <span
                className={clsx(
                  "font-medium tracking-tightest transition-colors duration-500 sm:col-span-3",
                  active === i ? "text-accent" : "text-muted"
                )}
                style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)" }}
              >
                {step.number}
              </span>
              <h3 className="text-[20px] font-medium text-foreground sm:col-span-3">{step.title}</h3>
              <p className="max-w-md text-[15px] leading-relaxed text-muted sm:col-span-6">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
