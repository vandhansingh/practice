import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/buttons/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center bg-background pt-[76px]">
      <Container className="text-center">
        <p className="text-[11px] font-semibold uppercase tracking-label text-muted">Error 404</p>
        <h1
          className="mx-auto mt-6 max-w-xl text-balance font-medium leading-[1.05] tracking-tightest text-foreground"
          style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
        >
          This page doesn&rsquo;t exist — but the system that would&rsquo;ve caught that does.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-[16px] leading-relaxed text-muted">
          The page you&rsquo;re looking for may have moved or no longer exists.
        </p>
        <div className="mt-10 flex justify-center gap-5">
          <Button href="/">Back to home</Button>
          <Link href="/contact" className="self-center text-[14px] font-semibold text-foreground underline decoration-border underline-offset-[6px] hover:decoration-foreground">
            Contact us
          </Link>
        </div>
      </Container>
    </section>
  );
}
