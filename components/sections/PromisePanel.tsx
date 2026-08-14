import { Container } from "@/components/ui/Container";
import { BrandImage } from "@/components/visuals/BrandImage";
import { promise, site } from "@/lib/data/site";

/**
 * The board's strongest tonal moment: a flat red panel carrying the three-line
 * promise, butted directly against the wireframe image with no gap — the two
 * read as one printed spread rather than two components side by side.
 */
export function PromisePanel() {
  return (
    <section className="bg-cream">
      <Container className="px-0 sm:px-0 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="bg-accent px-[var(--gutter)] py-16 lg:col-span-5 lg:py-24 lg:pl-[var(--gutter)] lg:pr-12">
            <div data-reveal-group className="flex h-full flex-col justify-center gap-10">
              {promise.map((line) => (
                <p key={line.verb} data-reveal className="text-[1.375rem] leading-tight text-charcoal sm:text-[1.625rem]">
                  <span className="block font-semibold">{line.verb}</span>
                  <span className="block font-light">{line.rest}</span>
                </p>
              ))}
              <span aria-hidden="true" className="mt-4 block h-[3px] w-14 bg-charcoal/70" />
            </div>
          </div>

          <div className="lg:col-span-7">
            <BrandImage
              slot="wireframes"
              underlay="none"
              aspect="aspect-[4/3] lg:aspect-auto lg:h-full"
              frame="none"
              alt="A designer sketching wireframes on a studio wall"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

/**
 * Scripture pull-quote. Set large and quiet on paper, with the reference in red
 * beneath — the citation is the only red on the panel.
 */
export function ScriptureQuote() {
  return (
    <section className="border-y border-border bg-cream py-24 lg:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span aria-hidden="true" className="block font-display text-[2.5rem] leading-none text-accent">
              &ldquo;
            </span>
            <blockquote className="mt-6">
              <p className="max-w-[18ch] font-display text-display-lg font-light text-charcoal">
                We don&rsquo;t just build websites. We build foundations for the future.
              </p>
              <footer data-reveal className="mt-10 text-[0.8125rem] font-medium text-accent-deep">
                {site.scripture.text}
              </footer>
            </blockquote>
          </div>

          <div data-reveal className="flex items-end lg:col-span-4 lg:col-start-9">
            <p className="max-w-[34ch] text-[1rem] leading-relaxed text-muted">
              Every project is something someone will depend on — to be found, to
              be trusted, to make a living. We build it like that matters.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
