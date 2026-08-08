import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/buttons/Button";

export function Positioning() {
  return (
    <section className="bg-background py-24 lg:py-36">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-[6px] w-[6px] rounded-full bg-accent" aria-hidden />
                <span className="text-[11px] font-semibold uppercase tracking-label text-muted">
                  Why systems matter
                </span>
              </div>
              <h2
                className="max-w-xl text-balance font-medium leading-[1.04] tracking-tightest text-foreground"
                style={{ fontSize: "clamp(2.4rem, 4.6vw, 4.4rem)" }}
              >
                Growth creates complexity. Systems create control.
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={120} className="flex h-full flex-col justify-between gap-10">
              <div className="space-y-5 text-[17px] leading-relaxed text-muted">
                <p>
                  As companies grow, the processes that once worked begin to
                  slow everyone down. Leads get lost, information lives in
                  disconnected tools, and teams spend valuable hours doing
                  work that should happen automatically.
                </p>
                <p className="font-medium text-foreground">That&rsquo;s where we come in.</p>
              </div>
              <Button href="/about" variant="secondary" className="w-fit">
                Our approach
              </Button>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
