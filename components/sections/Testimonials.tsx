import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { TestimonialSlider } from "@/components/testimonials/TestimonialSlider";
import { testimonials } from "@/lib/data/testimonials";

export function Testimonials() {
  return (
    <section className="bg-accent py-24 text-cream lg:py-32">
      <Container>
        <Reveal>
          <Eyebrow light className="mb-10">
            In their words
          </Eyebrow>
          <TestimonialSlider testimonials={testimonials} light />
        </Reveal>
      </Container>
    </section>
  );
}
