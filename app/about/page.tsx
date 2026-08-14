import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Container } from "@/components/ui/Container";
import { Label } from "@/components/ui/Label";
import { DisplayLines } from "@/components/ui/DisplayLines";
import { BrandImage } from "@/components/visuals/BrandImage";
import { CornerBracket, AmberDot } from "@/components/visuals/Motifs";
import { team } from "@/lib/data/team";
import { site, approach } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.fullName} — a small studio building websites, brands and growth systems on strong foundations. ${site.values}`,
  alternates: { canonical: "/about" },
};

const commitments = [
  {
    title: "We quote honestly",
    body: "A fixed number before anything starts. If we underestimate something we should have anticipated, that is ours to absorb.",
  },
  {
    title: "We tell you what you don't need",
    body: "The fastest way to lose a client is to sell them something that doesn't work. We would rather scope smaller and be right.",
  },
  {
    title: "We finish what we start",
    body: "No handing the project to someone you have never met halfway through. The people who scope it are the people who build it.",
  },
  {
    title: "We hand over what we build",
    body: "Documentation, training, and a CMS your team can run. Nothing we make should depend on us to keep working.",
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
        lines={["A studio built on", "strong foundations."]}
        standfirst={`Founded in ${site.founded}. A small team, deliberately — so the people who scope your project are the people who build it.`}
      />

      {/* Asymmetric image composition */}
      <section className="relative bg-cream py-24 lg:py-32">
        <AmberDot className="absolute right-[calc(var(--gutter)+6px)] top-16 hidden lg:block" size={16} />
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-12">
            <div className="sm:col-span-7">
              <BrandImage
                slot="workspace"
                underlay="block"
                aspect="aspect-[4/3]"
                alt="The studio at work"
              />
            </div>
            <div className="sm:col-span-4 sm:col-start-9 sm:mt-24">
              <BrandImage
                slot="stone"
                underlay="none"
                aspect="aspect-[3/4]"
                alt="A cornerstone"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Philosophy */}
      <section className="border-t border-border bg-cream-dark py-24 lg:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <Label className="mb-7">Why we exist</Label>
              <h2 className="font-display text-display-lg text-charcoal">
                <DisplayLines lines={["Build it like", "it matters."]} />
              </h2>
            </div>
            <div data-reveal className="lg:col-span-6 lg:col-start-7">
              <div className="space-y-6">
                <p className="font-display text-display-sm font-light leading-snug text-charcoal">
                  Every project is something someone will depend on.
                </p>
                <p className="text-[1.0625rem] leading-relaxed text-muted">
                  To be found. To be trusted. To make a living from. A website is
                  rarely just a website — it is how a plumber gets calls, how a
                  clinic gets booked, how a family business survives a slow year.
                </p>
                <p className="text-[1.0625rem] leading-relaxed text-muted">
                  That is the reason we quote honestly, keep the team small, and
                  hand over everything we build. Our faith shapes how we work; it
                  doesn&rsquo;t restrict who we work with, and you will never be
                  preached at in a project meeting.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Commitments */}
      <section className="relative bg-cream py-24 lg:py-32">
        <CornerBracket className="absolute left-[var(--gutter)] top-12 hidden lg:block" size={26} weight={7} draw />
        <Container>
          <Label className="mb-7">{site.values}</Label>
          <h2 className="max-w-[18ch] font-display text-display-lg text-charcoal">
            <DisplayLines lines={["Four commitments."]} />
          </h2>

          <div data-reveal-group className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2">
            {commitments.map((value, i) => (
              <div key={value.title} data-reveal className="border-t border-border pt-6">
                <span className="tabular text-label uppercase text-accent-deep">
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

      {/* How we work — the three-step arc */}
      <section className="border-y border-border bg-cream-dark py-24 lg:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <Label className="mb-7">How we work</Label>
              <h2 className="font-display text-display-lg text-charcoal">
                <DisplayLines lines={["Understand.", "Build. Grow."]} />
              </h2>
            </div>
            <ol data-reveal-group className="lg:col-span-7 lg:col-start-6">
              {approach.map((step) => (
                <li
                  key={step.number}
                  data-reveal
                  className="grid grid-cols-[auto_1fr] gap-x-8 border-t border-border py-8 first:border-t-0 first:pt-0"
                >
                  <span className="tabular pt-1 text-[0.8125rem] font-medium text-accent-deep">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="font-display text-display-sm text-charcoal">{step.title}</h3>
                    <p className="mt-3 max-w-[52ch] text-[0.9375rem] leading-relaxed text-muted">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="bg-cream py-24 lg:py-32">
        <Container>
          <Label className="mb-7">The team</Label>
          <h2 className="max-w-[20ch] font-display text-display-lg text-charcoal">
            <DisplayLines lines={["Who you", "actually get."]} />
          </h2>

          <div data-reveal-group className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {team.map((member) => (
              <article key={member.name} data-reveal>
                <div data-image-mask className="aspect-[4/5] w-full bg-charcoal">
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="font-display text-[clamp(2rem,3vw,2.75rem)] font-light text-cream/70">
                      {member.initials}
                    </span>
                  </div>
                </div>
                <h3 className="mt-5 text-[1.0625rem] font-semibold text-charcoal">{member.name}</h3>
                <p className="mt-1 text-[0.75rem] uppercase tracking-[0.12em] text-muted">
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
