import clsx from "clsx";
import { Label } from "./Label";
import { DisplayLines } from "./DisplayLines";

/**
 * Consistent section opening: eyebrow, display heading, optional standfirst.
 * Headings are passed as explicit lines so each section controls its own
 * turns and the line-reveal has something to animate.
 */
export function SectionHeader({
  label,
  lines,
  standfirst,
  onDark = false,
  size = "xl",
  className,
  as: Heading = "h2",
}: {
  label?: string;
  lines: string[];
  standfirst?: React.ReactNode;
  onDark?: boolean;
  size?: "xl" | "lg" | "md";
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const sizes = {
    xl: "text-display-xl",
    lg: "text-display-lg",
    md: "text-display-md",
  };

  return (
    <div className={className}>
      {label && (
        <div data-reveal="fade">
          <Label onDark={onDark} className="mb-7">
            {label}
          </Label>
        </div>
      )}
      <Heading
        className={clsx(
          "font-display",
          sizes[size],
          onDark ? "text-cream" : "text-charcoal"
        )}
      >
        <DisplayLines lines={lines} />
      </Heading>
      {standfirst && (
        <div data-reveal="fade" className="mt-8 max-w-[46ch]">
          <p
            // Only split when the standfirst is plain text — the pass skips
            // anything containing markup, so a rich standfirst just fades.
            data-split-words
            className={clsx("text-[1.0625rem] leading-relaxed", onDark ? "text-muted-light" : "text-muted")}
          >
            {standfirst}
          </p>
        </div>
      )}
    </div>
  );
}
