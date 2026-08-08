import clsx from "clsx";
import { HTMLAttributes } from "react";

export function Container({
  className,
  narrow = false,
  ...props
}: HTMLAttributes<HTMLDivElement> & { narrow?: boolean }) {
  return (
    <div
      className={clsx(
        "mx-auto w-full px-[var(--gutter)]",
        narrow ? "max-w-narrow" : "max-w-container",
        className
      )}
      {...props}
    />
  );
}
