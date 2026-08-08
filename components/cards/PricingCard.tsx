import clsx from "clsx";
import { Check } from "lucide-react";
import { Button } from "@/components/buttons/Button";
import type { PricingTier } from "@/lib/data/pricing";

export function PricingCard({ tier }: { tier: PricingTier }) {
  return (
    <div
      className={clsx(
        "flex h-full flex-col justify-between border p-8 sm:p-10",
        tier.featured ? "border-accent bg-accent text-cream" : "border-border bg-cream text-foreground"
      )}
    >
      <div>
        {tier.featured && (
          <span className="mb-6 inline-block rounded-full bg-cream/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-label text-cream">
            Most common
          </span>
        )}
        <h3 className="text-[24px] font-medium tracking-tightest">{tier.name}</h3>
        <p className={clsx("mt-2 text-[15px]", tier.featured ? "text-cream/70" : "text-muted")}>
          {tier.tagline}
        </p>
        <p className={clsx("mt-6 text-[14px] leading-relaxed", tier.featured ? "text-cream/70" : "text-muted")}>
          {tier.idealFor}
        </p>

        <ul className="mt-8 space-y-3.5 border-t border-current/15 pt-8">
          {tier.included.map((item) => (
            <li key={item} className="flex items-start gap-3 text-[14px]">
              <Check size={16} className={clsx("mt-0.5 shrink-0", tier.featured ? "text-cream" : "text-accent")} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10">
        <p className={clsx("mb-5 text-[13px] uppercase tracking-label", tier.featured ? "text-cream/60" : "text-muted")}>
          {tier.engagement}
        </p>
        <Button href="/contact" variant={tier.featured ? "primary" : "secondary"} light={tier.featured} className="w-full justify-center">
          {tier.cta}
        </Button>
      </div>
    </div>
  );
}
