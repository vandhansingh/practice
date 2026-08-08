import clsx from "clsx";
import { Container } from "@/components/ui/Container";
import { Label } from "@/components/ui/Label";
import { DisplayLines } from "@/components/ui/DisplayLines";
import { Button } from "@/components/ui/Button";
import { ArchitecturalImage } from "@/components/visuals/ArchitecturalImage";

/**
 * Reusable large editorial split — display heading on one side, a tall image on
 * the other. Used for the "why" section and the about section, mirrored so the
 * two don't read as the same layout twice.
 */
export function EditorialSplit({
  uid,
  label,
  lines,
  body,
  cta,
  imageSide = "right",
  tone = "sand",
  motif = "colonnade",
  imageLabel,
  aspect = "aspect-[4/5]",
  background = "cream",
}: {
  uid: string;
  label: string;
  lines: string[];
  body: string[];
  cta?: { label: string; href: string };
  imageSide?: "left" | "right";
  tone?: "dusk" | "night" | "sand" | "stone";
  motif?: "facade" | "colonnade" | "interior" | "stair" | "surface";
  imageLabel: string;
  aspect?: string;
  background?: "cream" | "cream-dark";
}) {
  const onDark = false;

  return (
    <section
      className={clsx(
        "py-24 lg:py-36",
        background === "cream" ? "bg-cream" : "bg-cream-dark"
      )}
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div
            className={clsx(
              "lg:col-span-6",
              imageSide === "right" ? "lg:order-1" : "lg:order-2 lg:col-start-7"
            )}
          >
            <Label onDark={onDark} className="mb-7">
              {label}
            </Label>
            <h2 className="font-display text-display-lg text-charcoal">
              <DisplayLines lines={lines} />
            </h2>
            <div data-reveal className="mt-9 max-w-[48ch] space-y-5">
              {body.map((paragraph) => (
                <p key={paragraph} className="text-[1.0625rem] leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
            {cta && (
              <div data-reveal className="mt-10">
                <Button href={cta.href} variant="outline">
                  {cta.label}
                </Button>
              </div>
            )}
          </div>

          <div
            className={clsx(
              "lg:col-span-5",
              imageSide === "right" ? "lg:order-2 lg:col-start-8" : "lg:order-1"
            )}
          >
            <div data-image-reveal data-image-mask className={clsx("w-full", aspect)}>
              {/* clip-path + scale target */}
              <div className="relative h-full w-full">
                {/* Parallax target, oversized and offset so the scrubbed drift
                    never exposes an edge inside the clipping box. Registered
                    for >=1024 only, so mobile never runs it. */}
                <div
                  data-parallax="5"
                  className="absolute left-0 top-[-7%] h-[114%] w-full"
                >
                  <ArchitecturalImage
                    uid={uid}
                    tone={tone}
                    motif={motif}
                    className="h-full w-full"
                    label={imageLabel}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
