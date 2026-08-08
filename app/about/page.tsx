import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { RevealImage } from "@/components/motion/RevealImage";
import { PlaceholderVisual } from "@/components/visuals/PlaceholderVisual";
import { Team } from "@/components/sections/Team";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.description} Learn how ${site.name} works with clients.`,
  alternates: { canonical: "/about" },
};

const principles = [
  {
    title: "We start with the operation, not the tool.",
    description:
      "Every engagement begins by understanding how work actually moves through your business today — before any technology decision gets made.",
  },
  {
    title: "Small team, direct involvement.",
    description:
      "The person who scopes your engagement is the person building it. We take on fewer clients so each one gets real attention.",
  },
  {
    title: "Systems, not one-off scripts.",
    description:
      "We build with monitoring, documentation and handover in mind from day one — so what we ship keeps working long after launch.",
  },
  {
    title: "Outcomes over output.",
    description:
      "We measure success in hours saved and revenue protected, not in the number of workflows shipped.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }]}
        eyebrow="About Halyard"
        title="Small team. Deep involvement. Meaningful systems."
        description={`Founded in ${site.founded}, ${site.name} works with a small number of growing businesses at a time — building the operational systems that let them scale without adding unnecessary headcount or complexity.`}
      />

      <section className="border-b border-border bg-background py-20 lg:py-28">
        <Container className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <RevealImage className="aspect-[4/5] rounded-sm sm:col-span-2 sm:row-span-2 sm:aspect-auto">
            <PlaceholderVisual tone="sand" pattern="diagonal" className="h-full" label="Studio space" />
          </RevealImage>
          <RevealImage className="aspect-[4/5] rounded-sm">
            <PlaceholderVisual tone="moss" pattern="grid" className="h-full" label="Working session" />
          </RevealImage>
          <RevealImage className="aspect-[4/5] rounded-sm">
            <PlaceholderVisual tone="clay" pattern="contour" className="h-full" label="Client review" />
          </RevealImage>
        </Container>
      </section>

      <section className="bg-background py-20 lg:py-28">
        <Container>
          <Reveal>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-[6px] w-[6px] rounded-full bg-accent" aria-hidden />
              <span className="text-[11px] font-semibold uppercase tracking-label text-muted">
                How we work
              </span>
            </div>
            <h2
              className="max-w-2xl text-balance font-medium leading-[1.05] tracking-tightest text-foreground"
              style={{ fontSize: "clamp(2.2rem, 3.8vw, 3.4rem)" }}
            >
              Four principles that shape every engagement.
            </h2>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 border-t border-border pt-12 sm:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <h3 className="text-[19px] font-medium leading-snug tracking-tightest text-foreground">
                  {p.title}
                </h3>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">
                  {p.description}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Team />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
