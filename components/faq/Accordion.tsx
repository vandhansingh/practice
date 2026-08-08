"use client";

import { useState } from "react";
import clsx from "clsx";
import { Plus } from "lucide-react";
import type { FaqItem } from "@/lib/data/faq";

/**
 * Accessible accordion. One panel open at a time.
 *
 * Height animates via grid-template-rows 0fr → 1fr, which transitions cleanly
 * without measuring scrollHeight in JS. The panel stays in the DOM and is
 * hidden with `hidden` when closed, so content is never announced while
 * visually collapsed and never trapped from keyboard users when open.
 */
export function Accordion({ items, onDark = false }: { items: FaqItem[]; onDark?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={clsx("border-t", onDark ? "border-border-dark" : "border-border")}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.question}
            className={clsx("border-b", onDark ? "border-border-dark" : "border-border")}
          >
            <h3>
              <button
                type="button"
                id={`faq-trigger-${i}`}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-start justify-between gap-8 py-7 text-left"
              >
                <span
                  className={clsx(
                    "font-display text-[1.25rem] leading-snug sm:text-[1.4375rem]",
                    onDark ? "text-cream" : "text-charcoal"
                  )}
                >
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={clsx(
                    "mt-1 shrink-0 transition-transform duration-400 ease-expo",
                    isOpen && "rotate-45"
                  )}
                >
                  <Plus size={20} strokeWidth={1.5} className="text-accent" />
                </span>
              </button>
            </h3>

            <div
              className="grid transition-[grid-template-rows] duration-500 ease-expo"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                  hidden={!isOpen}
                >
                  <p
                    className={clsx(
                      "max-w-[62ch] pb-8 text-[0.9375rem] leading-relaxed",
                      onDark ? "text-muted-light" : "text-muted"
                    )}
                  >
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
