import { FileText } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/buttons/Button";

export function LeadMagnet() {
  return (
    <section className="bg-background py-24 lg:py-32">
      <Container>
        <Reveal className="grid grid-cols-1 items-center gap-12 rounded-sm border border-border bg-cream p-8 sm:p-12 lg:grid-cols-12 lg:gap-10 lg:p-16">
          <div className="lg:col-span-7">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-[6px] w-[6px] rounded-full bg-accent" aria-hidden />
              <span className="text-[11px] font-semibold uppercase tracking-label text-muted">
                Free resource
              </span>
            </div>
            <h2
              className="text-balance font-medium leading-[1.05] tracking-tightest text-foreground"
              style={{ fontSize: "clamp(2rem, 3.2vw, 3rem)" }}
            >
              The AI Automation Playbook
            </h2>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-muted">
              A practical framework for identifying the repetitive processes
              in your business that should be automated first — and the
              ones that shouldn&rsquo;t be, yet.
            </p>
            <Button href="/contact" className="mt-8 w-fit">
              Get the playbook
            </Button>
          </div>

          <div className="lg:col-span-5">
            <div className="relative mx-auto flex aspect-[4/5] max-w-[280px] items-center justify-center border border-border bg-surface">
              <div className="absolute inset-4 border border-border/70" />
              <FileText size={40} strokeWidth={1.25} className="text-accent" aria-hidden />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
