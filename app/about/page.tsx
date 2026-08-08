import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Container } from "@/components/ui/Container";
import { Label } from "@/components/ui/Label";
import { DisplayLines } from "@/components/ui/DisplayLines";
import { ArchitecturalImage } from "@/components/visuals/ArchitecturalImage";
import { team } from "@/lib/data/team";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} is a four-partner operations consultancy. The person who diagnoses your operation designs the fix and is there at go-live.`,
  alternates: { canonical: "/about" },
};

const values = [
  {
    title: "Diagnose before prescribing",
    body: "We won't propose a solution in a first meeting. Anyone who does is selling something they'd already built.",
  },
  {
    title: "Measure what actually governs output",
    body: "Touch time against elapsed time, exception volume, decision latency. Most operational dashboards measure activity instead.",
  },
  {
    title: "Design for the exception",
    body: "Systems fail at their edges, so the exception path gets designed first and the standard path is built around it.",
  },
  {
    title: "Leave properly",
    body: "Handover with documentation and a trained owner. If a system needs us to keep running, we've built the wrong thing.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
        label={`About ${site.name}`}
        lines={["A small firm with", "an outsized remit."]}
        standfirst={`Founded in ${site.founded}. Four partners, no analyst layer, and a deliberate cap on how many clients we take at once.`}
      />

      {/* Asymmetric image composition */}
      <section className="bg-cream py-24 lg:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-12">
            <div className="sm:col-span-7">
              <div data-image-reveal data-image-mask className="aspect-[4/3] w-full">
                <div className="h-full w-full">
                  <ArchitecturalImage
                    uid="about-1"
                    tone="stone"
                    motif="interior"
                    className="h-full w-full"
                    label="Studio interior with raking daylight"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4 sm:col-start-9 sm:mt-20">
              <div data-image-reveal data-image-mask className="aspect-[3/4] w-full">
                <div className="h-full w-full">
                  <ArchitecturalImage
                    uid="about-2"
                    tone="dusk"
                    motif="stair"
                    className="h-full w-full"
                    label="Concrete stair detail"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Philosophy */}
      <section className="bg-cream-dark py-24 lg:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <Label className="mb-7">Philosophy</Label>
              <h2 className="font-display text-display-lg text-charcoal">
                <DisplayLines lines={["Depth beats", "leverage."]} />
              </h2>
            </div>
            <div data-reveal className="lg:col-span-6 lg:col-start-7">
              <div className="space-y-6">
                <p className="font-display text-display-sm leading-snug text-charcoal">
                  You cannot diagnose a constraint from a status call.
                </p>
                <p className="text-[1.0625rem] leading-relaxed text-muted">
                  The standard consulting model staffs engagements with people who
                  weren&rsquo;t in the room when the work was sold. It scales well
                  and diagnoses badly, because the signal in operational work is in
                  the detail — the workaround nobody documented, the approval that
                  always waits for one person, the report everyone ignores.
                </p>
                <p className="text-[1.0625rem] leading-relaxed text-muted">
                  So we stay small on purpose and take fewer clients than we could.
                  Every engagement is led by a partner who spent the first two weeks
                  inside the operation.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-cream py-24 lg:py-32">
        <Container>
          <Label className="mb-7">How we work</Label>
          <h2 className="max-w-[18ch] font-display text-display-lg text-charcoal">
            <DisplayLines lines={["Four commitments."]} />
          </h2>

          <div data-reveal-group className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2">
            {values.map((value, i) => (
              <div key={value.title} data-reveal className="border-t border-border pt-6">
                <span className="tabular text-label uppercase text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-display-sm text-charcoal">{value.title}</h3>
                <p className="mt-3 max-w-[44ch] text-[0.9375rem] leading-relaxed text-muted">
                  {value.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="bg-cream-dark py-24 lg:py-32">
        <Container>
          <Label className="mb-7">The partners</Label>
          <h2 className="max-w-[20ch] font-display text-display-lg text-charcoal">
            <DisplayLines lines={["Who you", "actually get."]} />
          </h2>

          <div
            data-reveal-group
            className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4"
          >
            {team.map((member) => (
              <article key={member.name} data-reveal>
                <div data-image-mask className="aspect-[4/5] w-full bg-charcoal">
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="font-display text-[clamp(2rem,3vw,2.75rem)] text-cream/70">
                      {member.initials}
                    </span>
                  </div>
                </div>
                <h3 className="mt-5 font-display text-[1.25rem] text-charcoal">{member.name}</h3>
                <p className="mt-1 text-[0.8125rem] uppercase tracking-[0.1em] text-muted">
                  {member.role}
                </p>
                <p className="mt-3 text-[0.875rem] leading-relaxed text-muted">{member.bio}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <TestimonialSection />
      <FinalCTA />
    </>
  );
}
