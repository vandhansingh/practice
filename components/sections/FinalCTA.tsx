import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/buttons/Button";
import { site } from "@/lib/data/site";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-foreground py-28 text-cream lg:py-40">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, transparent, transparent 68px, #F4F1EA 69px)",
        }}
        aria-hidden
      />
      <Container className="relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2
            className="text-balance font-medium leading-[1.02] tracking-tightest"
            style={{ fontSize: "clamp(2.4rem, 5.2vw, 4.8rem)" }}
          >
            Ready to replace operational chaos with systems that work?
          </h2>
          <p className="mx-auto mt-7 max-w-lg text-balance text-[17px] leading-relaxed text-cream/65">
            A single conversation is usually enough to know whether there&rsquo;s
            a fit. No deck, no pressure — just a clear look at where your
            business is losing time.
          </p>
          <div className="mt-10 flex justify-center">
            <Button href={site.ctaPrimary.href} light>
              {site.ctaPrimary.label}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
