import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Container } from "@/components/ui/Container";
import { Label } from "@/components/ui/Label";
import { DisplayLines } from "@/components/ui/DisplayLines";
import { Button } from "@/components/ui/Button";
import { ArchitecturalImage } from "@/components/visuals/ArchitecturalImage";

export const metadata: Metadata = {
  title: "The Constraint Audit",
  description:
    "A twelve-page framework for finding the one bottleneck governing your throughput — and separating the loudest problem from the limiting one.",
  alternates: { canonical: "/the-constraint-audit" },
};

const contents = [
  {
    number: "01",
    title: "The two measurements that matter",
    body: "Touch time against elapsed time, and exception volume. Between them they locate almost every real constraint.",
  },
  {
    number: "02",
    title: "Why the loudest problem is rarely the limiting one",
    body: "How to tell a visible queue from a governing one, and why teams reliably point at each other.",
  },
  {
    number: "03",
    title: "Mapping without a workshop",
    body: "How to build a current-state map from observation and system logs instead of from what people believe happens.",
  },
  {
    number: "04",
    title: "Sequencing the fixes",
    body: "Attaching a cost of delay to each bottleneck, so the order of work becomes arithmetic rather than politics.",
  },
  {
    number: "05",
    title: "A one-page diagnostic",
    body: "The single sheet we use in week one of every audit, reproduced for you to run yourself.",
  },
];

export default function ConstraintAuditPage() {
  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "The Constraint Audit", href: "/the-constraint-audit" },
        ]}
        label="Free download"
        lines={["The Constraint", "Audit."]}
        standfirst="The framework we use in the first two weeks of every engagement, written up so you can run it yourself. Twelve pages, no email course, no follow-up sequence."
      />

      <section className="bg-cream py-24 lg:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <div data-image-reveal data-image-mask className="aspect-[3/4] w-full">
                <div className="h-full w-full">
                  <ArchitecturalImage
                    uid="audit-cover"
                    tone="dusk"
                    motif="surface"
                    className="h-full w-full"
                    label="Poured concrete surface, raking light"
                  />
                </div>
              </div>
              <div data-reveal className="mt-10">
                <Button href="/contact" variant="primary">
                  Get the download
                </Button>
                <p className="mt-5 text-[0.8125rem] text-muted">
                  We&rsquo;ll email it straight over. We don&rsquo;t add you to a list.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <Label className="mb-7">What&rsquo;s inside</Label>
              <h2 className="max-w-[22ch] font-display text-display-lg text-charcoal">
                <DisplayLines lines={["Five sections.", "One afternoon."]} />
              </h2>

              <ol data-reveal-group className="mt-14">
                {contents.map((item) => (
                  <li
                    key={item.number}
                    data-reveal
                    className="grid grid-cols-[auto_1fr] gap-x-8 border-t border-border py-7"
                  >
                    <span className="tabular font-display text-[1.5rem] leading-none text-accent">
                      {item.number}
                    </span>
                    <div>
                      <h3 className="font-display text-[1.375rem] leading-snug text-charcoal">
                        {item.title}
                      </h3>
                      <p className="mt-2 max-w-[48ch] text-[0.9375rem] leading-relaxed text-muted">
                        {item.body}
                      </p>
                    </div>
                  </li>
                ))}
                <li className="border-t border-border" />
              </ol>
            </div>
          </div>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
