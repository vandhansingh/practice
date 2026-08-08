import { Container } from "@/components/ui/Container";
import { DisplayLines } from "@/components/ui/DisplayLines";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/data/site";

/**
 * Closing section rather than a card: the type runs large against the dark
 * ground and flows straight into the footer, so the page ends on one continuous
 * dark block instead of a boxed call-to-action.
 */
export function FinalCTA() {
  return (
    <section className="bg-charcoal pb-24 pt-28 lg:pb-32 lg:pt-40">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 className="font-display text-display-xl text-cream">
              <DisplayLines lines={["Let's find the", "constraint."]} />
            </h2>
          </div>
          <div data-reveal className="flex flex-col justify-end lg:col-span-4">
            <p className="max-w-[38ch] text-[1.0625rem] leading-relaxed text-muted-light">
              One conversation is usually enough to tell whether there's a fit.
              No deck, no pitch — a straight read on where your operation is
              losing throughput.
            </p>
            <div className="mt-9">
              <Button href={site.ctaLong.href} variant="primary">
                {site.ctaLong.label}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
