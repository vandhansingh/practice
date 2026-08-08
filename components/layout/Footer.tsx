import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/data/site";

/**
 * Large dark editorial footer. Columns reveal as a stagger group so the whole
 * block settles in one motion rather than eight independent ones.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal pt-24 lg:pt-32">
      <Container>
        {/* The group wraps the bottom bar as well as the columns, on purpose.
            As the last element on the page the bar's top never rises above a
            "top 82%" trigger line even at maximum scroll, so triggering it on
            itself meant it never revealed. Grouping ties it to the footer's own
            trigger and lands it last, which is the intended order anyway. */}
        <div data-reveal-group>
          <div className="grid grid-cols-2 gap-y-14 lg:grid-cols-12 lg:gap-x-8">
            <div data-reveal className="col-span-2 lg:col-span-4">
              <Link
                href="/"
                className="font-display text-[1.75rem] leading-none text-cream"
              >
                {site.name}
              </Link>
              <p className="mt-6 max-w-[34ch] text-[0.9375rem] leading-relaxed text-muted-light">
                {site.description}
              </p>
              <p className="mt-10 text-label uppercase text-muted">
                {site.location}
              </p>
            </div>

            <div data-reveal className="lg:col-span-3">
              <FooterHeading>Services</FooterHeading>
              <FooterLinks links={site.footerNav.services} />
            </div>

            <div data-reveal className="lg:col-span-2">
              <FooterHeading>Company</FooterHeading>
              <FooterLinks links={site.footerNav.company} />
            </div>

            <div data-reveal className="col-span-2 lg:col-span-3">
              <FooterHeading>Contact</FooterHeading>
              <ul className="flex flex-col gap-3 text-[0.9375rem]">
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    // An email address is a single unbreakable token; without an
                    // explicit break opportunity a long one overflows its column.
                    className="text-cream transition-colors [overflow-wrap:anywhere] hover:text-accent"
                  >
                    {site.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
                    className="text-muted-light transition-colors hover:text-cream"
                  >
                    {site.phone}
                  </a>
                </li>
              </ul>
              <ul className="mt-6 flex gap-4 text-[0.8125rem] text-muted-light">
                <li>
                  <a
                    href={site.social.linkedin}
                    className="transition-colors hover:text-cream"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href={site.social.x}
                    className="transition-colors hover:text-cream"
                  >
                    X
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div
            data-reveal="fade"
            className="mt-20 flex flex-col-reverse items-start justify-between gap-4 border-t border-border-dark py-8 sm:flex-row sm:items-center"
          >
            <p className="text-[0.8125rem] text-muted">
              © {year} {site.legalName}
            </p>
            <p className="text-[0.8125rem] text-muted">
              Figures shown across this site are illustrative composites.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return <p className="mb-6 text-label uppercase text-muted">{children}</p>;
}

function FooterLinks({ links }: { links: { label: string; href: string }[] }) {
  return (
    <ul className="flex flex-col gap-3 text-[0.9375rem]">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="text-muted-light transition-colors hover:text-cream"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
