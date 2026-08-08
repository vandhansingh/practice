import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { PricingCard } from "@/components/cards/PricingCard";
import { FAQ } from "@/components/sections/FAQ";
import { faq } from "@/lib/data/faq";
import { pricingTiers } from "@/lib/data/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Three engagement models for businesses at different stages of their automation journey — Foundation, Systems, and Scale.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Pricing", href: "/pricing" }]}
        eyebrow="Engagement models"
        title="Three ways to work with us."
        description="Every engagement starts with a strategy call. These tiers describe scope and depth, not a self-serve checkout — the right fit gets confirmed before anything is scoped."
      />
      <section className="bg-background py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {pricingTiers.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 90}>
                <PricingCard tier={tier} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <FAQ items={faq} />
    </>
  );
}
