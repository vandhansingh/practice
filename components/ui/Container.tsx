import { HTMLAttributes } from "react";
import clsx from "clsx";

export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx("mx-auto w-full max-w-container px-5 sm:px-8 lg:px-16", className)}
      {...props}
    />
  );
}
