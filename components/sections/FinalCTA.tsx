import { Container } from "@/components/ui/Container";
import { DisplayLines } from "@/components/ui/DisplayLines";
import { Button } from "@/components/ui/Button";
import { CornerBracket } from "@/components/visuals/Motifs";
import { site } from "@/lib/data/site";

/**
 * Closing section rather than a card: the type runs large against the ink ground
 * and flows straight into the footer, so the page ends on one continuous dark
 * block instead of a boxed call-to-action.
 */
export function FinalCTA() {
  return (
    <section className="relative bg-charcoal pb-24 pt-28 lg:pb-32 lg:pt-40">
      <CornerBracket className="absolute left-[var(--gutter)] top-14 hidden lg:block" size={30} weight={8} />

      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="font-display text-display-xl font-light text-cream">
              <DisplayLines lines={["Let's build your", "cornerstone."]} />
            </h2>
          </div>
          <div data-reveal className="flex flex-col justify-end lg:col-span-4 lg:col-start-9">
            <p className="max-w-[36ch] text-[1.0625rem] leading-relaxed text-muted-light">
              Tell us what you&rsquo;re building. One conversation is usually enough
              to know whether we&rsquo;re the right people for it.
            </p>
            <div className="mt-9">
              <Button href={site.cta.href} variant="light">
                {site.cta.label}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
