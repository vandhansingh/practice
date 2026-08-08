import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Label } from "@/components/ui/Label";
import { ContactForm } from "@/components/forms/ContactForm";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Book a discovery call with ${site.name}. A partner reads every enquiry and replies within one working day.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
        label="Get in touch"
        lines={["Start with a", "conversation."]}
        standfirst="Tell us roughly where the operation is losing time. A partner will reply within one working day — you'll speak to the person who would run the work, not a salesperson."
      />

      <section className="bg-cream py-24 lg:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <div className="flex flex-col gap-10">
                <div>
                  <Label className="mb-5">Direct</Label>
                  <ul className="flex flex-col gap-2 text-[0.9375rem]">
                    <li>
                      <a
                        href={`mailto:${site.email}`}
                        className="link-underline text-charcoal"
                      >
                        {site.email}
                      </a>
                    </li>
                    <li>
                      <a
                        href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
                        className="text-muted transition-colors hover:text-charcoal"
                      >
                        {site.phone}
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <Label className="mb-5">Offices</Label>
                  <p className="text-[0.9375rem] text-muted">{site.location}</p>
                </div>

                <div>
                  <Label className="mb-5">What happens next</Label>
                  <ol className="flex flex-col gap-4 text-[0.875rem] leading-relaxed text-muted">
                    <li className="flex gap-4">
                      <span className="tabular shrink-0 text-accent">01</span>
                      <span>A partner replies within one working day.</span>
                    </li>
                    <li className="flex gap-4">
                      <span className="tabular shrink-0 text-accent">02</span>
                      <span>
                        A 30-minute call to understand the operation and whether
                        there&rsquo;s a fit.
                      </span>
                    </li>
                    <li className="flex gap-4">
                      <span className="tabular shrink-0 text-accent">03</span>
                      <span>
                        If there is, a fixed-scope proposal with dates and a number.
                      </span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            <div data-reveal className="lg:col-span-7 lg:col-start-6">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
