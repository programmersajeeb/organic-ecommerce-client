import type { ComponentPropsWithoutRef } from "react";

type SkeletonProps = Omit<ComponentPropsWithoutRef<"div">, "className"> &
  Readonly<{
    className?: string | undefined;
  }>;

function getClassName(...classNames: Array<string | false | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

export function Skeleton({
  className,
  "aria-hidden": ariaHidden = true,
  ...props
}: SkeletonProps) {
  return (
    <div
      aria-hidden={ariaHidden}
      className={getClassName("gb-skeleton", className)}
      {...props}
    />
  );
}