import { Container } from "@/components/ui/Container";
import { Label } from "@/components/ui/Label";
import { DisplayLines } from "@/components/ui/DisplayLines";
import { Button } from "@/components/ui/Button";
import { ArchitecturalImage } from "@/components/visuals/ArchitecturalImage";

/**
 * Dark magazine-feature panel for the lead magnet. Full-bleed dark ground, image
 * held to the left five columns, text set into the right — the strongest tonal
 * shift on the page before the footer.
 */
export function PlaybookSection() {
  return (
    <section className="bg-charcoal py-24 lg:py-32">
      <Container>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div data-image-reveal data-image-mask className="aspect-[3/4] w-full">
              <div className="h-full w-full">
                <ArchitecturalImage
                  uid="playbook"
                  tone="night"
                  motif="stair"
                  className="h-full w-full"
                  label="Concrete stair in raking light"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Label onDark className="mb-7">
              Free download
            </Label>
            <h2 className="font-display text-display-lg text-cream">
              <DisplayLines lines={["The Constraint", "Audit."]} />
            </h2>
            <div data-reveal className="mt-8 max-w-[46ch] space-y-5">
              <p className="text-[1.0625rem] leading-relaxed text-muted-light">
                A twelve-page framework for finding the one bottleneck governing
                your throughput — including the two measurements that separate
                the loudest problem from the limiting one.
              </p>
              <p className="text-[0.9375rem] leading-relaxed text-muted">
                Written for operators. No email course, no follow-up sequence.
              </p>
            </div>
            <div data-reveal className="mt-10">
              <Button href="/the-constraint-audit" variant="primary">
                Get the download
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
