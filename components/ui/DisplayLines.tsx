import clsx from "clsx";

/**
 * Line-by-line display-type reveal.
 *
 * Lines are authored explicitly rather than measured at runtime: GSAP's
 * SplitText is a paid plugin, and hand-authored breaks also let the design
 * control where each headline turns instead of leaving it to the viewport.
 *
 * The real text stays in the DOM as ordinary content — the outer span only
 * clips and the inner span only transforms — so screen readers and crawlers
 * read the heading normally, and with JS off nothing is hidden.
 */
export function DisplayLines({
  lines,
  className,
}: {
  lines: string[];
  className?: string;
}) {
  return (
    <span data-reveal-lines className={clsx("block", className)}>
      {lines.map((line, i) => (
        <span key={line} data-reveal-line className="block">
          {/* Trailing space keeps the accessible text reading as a sentence
              ("Scale is a systems problem.") instead of running the lines
              together. Harmless visually — each line is display:block. */}
          <span className="block">
            {line}
            {i < lines.length - 1 ? " " : null}
          </span>
        </span>
      ))}
    </span>
  );
}
