import { Container } from "@/components/ui/Container";
import { BrandImage } from "@/components/visuals/BrandImage";
import { CornerBracket, AmberDot } from "@/components/visuals/Motifs";
import { TextLink } from "@/components/ui/Button";

/**
 * Three-line positioning statement with the last line carried in red, set
 * against the laptop image. Mirrors the board's lower-right panel.
 */
export function KingdomValues() {
  return (
    <section className="relative bg-cream py-24 lg:py-32">
      <CornerBracket className="absolute left-[var(--gutter)] top-12 hidden lg:block" size={26} weight={7} draw />
      <AmberDot className="absolute right-[calc(var(--gutter)+4px)] top-16 hidden lg:block" size={16} />

      <Container>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <h2 className="font-display text-display-lg text-charcoal">
              <span className="block">Digital solutions.</span>
              <span className="block">Human approach.</span>
              <span className="block text-accent">Kingdom values.</span>
            </h2>
            <p
              data-reveal="fade"
              data-split-words
              className="mt-8 max-w-[40ch] text-[1rem] leading-relaxed text-muted"
            >
              In practice that means quoting honestly, telling you when you
              don&rsquo;t need something, finishing what we start, and handing over
              what we build. Our faith shapes how we work — it doesn&rsquo;t
              restrict who we work with.
            </p>
            <div data-reveal className="mt-9">
              <TextLink href="/about">More about how we work</TextLink>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <BrandImage
              slot="screen"
              underlay="block"
              aspect="aspect-[4/3]"
              alt="A laptop displaying a finished Cornerstone site"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
