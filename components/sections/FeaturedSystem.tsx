import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { RevealImage } from "@/components/motion/RevealImage";
import { PlaceholderVisual } from "@/components/visuals/PlaceholderVisual";
import { Button } from "@/components/buttons/Button";

const steps = [
  { label: "Intake", detail: "A lead or request enters through any channel." },
  { label: "Qualify", detail: "The system scores and routes it automatically." },
  { label: "Act", detail: "Follow-up, scheduling, or handoff happens without delay." },
  { label: "Learn", detail: "Every outcome feeds back into how the system decides." },
];

export function FeaturedSystem() {
  return (
    <section className="bg-surface py-24 lg:py-32">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Reveal>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-[6px] w-[6px] rounded-full bg-accent" aria-hidden />
              <span className="text-[11px] font-semibold uppercase tracking-label text-muted">
                How a system works
              </span>
            </div>
            <h2
              className="text-balance font-medium leading-[1.05] tracking-tightest text-foreground"
              style={{ fontSize: "clamp(2.2rem, 3.6vw, 3.4rem)" }}
            >
              One operating loop, running quietly in the background.
            </h2>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-muted">
              Every system we build follows the same underlying loop —
              simple enough to explain in a sentence, and robust enough to
              run without supervision.
            </p>
          </Reveal>

          <ul className="mt-10 space-y-0 border-t border-border">
            {steps.map((step, i) => (
              <Reveal key={step.label} delay={i * 70} as="li" className="flex items-baseline gap-6 border-b border-border py-5">
                <span className="text-[13px] font-semibold text-accent">{`0${i + 1}`}</span>
                <div>
                  <p className="font-medium text-foreground">{step.label}</p>
                  <p className="mt-1 text-[14px] text-muted">{step.detail}</p>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={320} className="mt-10">
            <Button href="/services" variant="secondary" className="w-fit">
              Explore our services
            </Button>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <RevealImage className="aspect-[6/5] w-full rounded-sm">
            <PlaceholderVisual tone="moss" pattern="nodes" className="h-full" label="Diagram of a connected automation loop" />
          </RevealImage>
        </div>
      </Container>
    </section>
  );
}
