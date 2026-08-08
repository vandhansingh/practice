import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { services } from "@/lib/data/services";

export function Services() {
  return (
    <section className="bg-background pb-24 lg:pb-36">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="What we do"
            title="Systems that move the business forward."
            description="Five ways we remove operational friction — chosen based on where your business actually loses time, not a fixed package."
          />
        </Reveal>

        <div className="mt-16 border-t border-border">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 60}>
              <Link
                href={`/services/${service.slug}`}
                data-cursor="view"
                className="group flex flex-col gap-4 border-b border-border py-8 transition-colors duration-500 hover:bg-cream sm:flex-row sm:items-center sm:gap-8 sm:py-10 lg:px-4"
              >
                <span className="w-12 shrink-0 text-[14px] font-medium text-muted">
                  {service.number}
                </span>
                <h3 className="text-balance font-medium tracking-tightest text-foreground sm:w-[19ch] sm:shrink-0" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.4rem)" }}>
                  {service.title}
                </h3>
                <p className="max-w-lg flex-1 text-[15px] leading-relaxed text-muted">
                  {service.short}
                </p>
                <ArrowUpRight
                  size={22}
                  className="shrink-0 text-foreground transition-transform duration-500 ease-power3-out group-hover:translate-x-1 group-hover:-translate-y-1"
                  aria-hidden
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
