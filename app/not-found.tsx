import { Container } from "@/components/ui/Container";
import { DisplayLines } from "@/components/ui/DisplayLines";
import { Button, TextLink } from "@/components/ui/Button";
import { ArchitecturalImage } from "@/components/visuals/ArchitecturalImage";

export default function NotFound() {
  return (
    <section data-hero className="relative isolate flex min-h-[88svh] items-center bg-charcoal">
      <div className="absolute inset-0" data-image-mask>
        <div data-hero-visual-inner className="absolute inset-0">
          <ArchitecturalImage
            uid="notfound"
            tone="night"
            motif="colonnade"
            className="h-full w-full"
            label="Empty arcade receding into shadow"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/70 to-charcoal/40"
        />
      </div>

      <Container className="relative py-32">
        <div data-hero-content className="max-w-[34ch]">
          <p
            data-hero-item="eyebrow"
            className="flex items-center gap-3 text-label uppercase text-muted-light"
          >
            <span aria-hidden="true" className="h-px w-6 bg-accent" />
            Error 404
          </p>

          <h1 className="mt-8 font-display text-display-xl text-cream">
            <DisplayLines lines={["This page", "isn't here."]} />
          </h1>

          <p
            data-hero-item="body"
            className="mt-8 max-w-[42ch] text-[1.0625rem] leading-relaxed text-muted-light"
          >
            The page may have moved, or the link may be wrong. Everything else is
            one click away.
          </p>

          <div data-hero-item="cta" className="mt-10 flex flex-wrap items-center gap-6">
            <Button href="/" variant="primary">
              Back to home
            </Button>
            <span>
              <TextLink href="/contact" onDark>
                Get in touch
              </TextLink>
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
