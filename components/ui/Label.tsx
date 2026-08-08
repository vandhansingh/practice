import clsx from "clsx";

/**
 * Small uppercase eyebrow that opens every major section. The rule before the
 * text gives the label a fixed optical anchor so headings line up across
 * sections regardless of label length.
 */
export function Label({
  children,
  className,
  onDark = false,
  as: Tag = "p",
}: {
  children: React.ReactNode;
  className?: string;
  onDark?: boolean;
  as?: "p" | "span" | "div";
}) {
  return (
    <Tag className={clsx("flex items-center gap-3 text-label uppercase", className)}>
      <span
        aria-hidden="true"
        className={clsx("h-px w-6 shrink-0", onDark ? "bg-accent" : "bg-accent")}
      />
      <span className={clsx("font-medium", onDark ? "text-muted-light" : "text-muted")}>
        {children}
      </span>
    </Tag>
  );
}
