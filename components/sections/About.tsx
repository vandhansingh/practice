import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { RevealImage } from "@/components/motion/RevealImage";
import { PlaceholderVisual } from "@/components/visuals/PlaceholderVisual";
import { Button } from "@/components/buttons/Button";

export function About() {
  return (
    <section className="bg-background py-24 lg:py-36">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-6">
            <Reveal>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-[6px] w-[6px] rounded-full bg-accent" aria-hidden />
                <span className="text-[11px] font-semibold uppercase tracking-label text-muted">
                  About Halyard
                </span>
              </div>
              <h2
                className="text-balance font-medium leading-[1.05] tracking-tightest text-foreground"
                style={{ fontSize: "clamp(2.2rem, 3.8vw, 3.6rem)" }}
              >
                Small team. Deep involvement. Meaningful systems.
              </h2>
              <div className="mt-8 max-w-md space-y-5 text-[16px] leading-relaxed text-muted">
                <p>
                  We stay small on purpose. Every engagement is led by
                  someone who was in the discovery conversation — not handed
                  off to a team that never met you.
                </p>
                <p>
                  That means fewer clients at a time, more attention on
                  each one, and systems built around how your business
                  actually runs rather than a template we&rsquo;ve reused a
                  hundred times.
                </p>
              </div>
              <Button href="/about" variant="secondary" className="mt-8 w-fit">
                More about how we work
              </Button>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:col-span-6">
            <RevealImage className="col-span-2 aspect-[16/10] rounded-sm">
              <PlaceholderVisual tone="sand" pattern="diagonal" className="h-full" label="Studio workspace" />
            </RevealImage>
            <RevealImage className="aspect-[4/5] rounded-sm">
              <PlaceholderVisual tone="ink" pattern="grid" className="h-full" label="Team at work" />
            </RevealImage>
            <RevealImage className="aspect-[4/5] rounded-sm">
              <PlaceholderVisual tone="clay" pattern="arc" className="h-full" label="Detail from a client system" />
            </RevealImage>
          </div>
        </div>
      </Container>
    </section>
  );
}
