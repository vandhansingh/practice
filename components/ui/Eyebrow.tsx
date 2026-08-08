import clsx from "clsx";

export function Eyebrow({
  children,
  className,
  light = false,
}: {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <div className={clsx("flex items-center gap-3", className)}>
      <span
        className={clsx("h-[6px] w-[6px] rounded-full", light ? "bg-cream" : "bg-accent")}
        aria-hidden
      />
      <span
        className={clsx(
          "text-[11px] font-semibold uppercase tracking-label",
          light ? "text-cream/70" : "text-muted"
        )}
      >
        {children}
      </span>
    </div>
  );
}
