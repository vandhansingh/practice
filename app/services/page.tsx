import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { services } from "@/lib/data/services";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Five ways Halyard removes operational friction — AI automation, voice agents, CRM automation, internal AI systems, and custom business software.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }]}
        eyebrow="Services"
        title="Systems built around how your business actually operates."
        description={`${site.name} designs and implements the systems that remove repetitive work — chosen based on where you're losing the most time, not a fixed package.`}
      />
      <section className="bg-background py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={i * 70}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <FinalCTA />
    </>
  );
}
