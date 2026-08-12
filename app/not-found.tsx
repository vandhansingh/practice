import { Container } from "@/components/ui/Container";
import { DisplayLines } from "@/components/ui/DisplayLines";
import { Button, TextLink } from "@/components/ui/Button";
import { CornerBracket, AmberDot } from "@/components/visuals/Motifs";

export default function NotFound() {
  return (
    <section data-hero className="relative flex min-h-[86svh] items-center bg-cream">
      <CornerBracket className="absolute left-[var(--gutter)] top-28" size={30} weight={8} />
      <AmberDot className="absolute right-[calc(var(--gutter)+8px)] top-32" size={16} />

      <Container className="py-32">
        <div data-hero-content className="max-w-[34ch]">
          <p data-hero-item="eyebrow" className="text-label uppercase text-muted">
            Error 404
          </p>

          <h1 className="mt-8 font-display text-display-xl text-charcoal">
            <DisplayLines lines={["This page", "isn't here."]} />
          </h1>

          <p
            data-hero-item="body"
            className="mt-8 max-w-[40ch] text-[1.0625rem] leading-relaxed text-muted"
          >
            The page may have moved, or the link may be wrong. Everything else is
            one click away.
          </p>

          <div data-hero-item="cta" className="mt-10 flex flex-wrap items-center gap-6">
            <Button href="/" variant="primary">
              Back to home
            </Button>
            <span>
              <TextLink href="/contact">Start a project</TextLink>
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
