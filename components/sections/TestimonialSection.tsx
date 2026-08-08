import { Container } from "@/components/ui/Container";
import { Label } from "@/components/ui/Label";
import { TestimonialSlider } from "@/components/testimonials/TestimonialSlider";
import { testimonials } from "@/lib/data/testimonials";

export function TestimonialSection() {
  return (
    <section className="bg-charcoal py-24 lg:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Label onDark>In their words</Label>
          </div>
          <div data-reveal className="lg:col-span-9">
            <TestimonialSlider items={testimonials} />
          </div>
        </div>
      </Container>
    </section>
  );
}
