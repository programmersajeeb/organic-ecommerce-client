import * as React from "react";

import { cn } from "@/lib/utils";

function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & {
  size?: "default" | "sm" | "lg";
}) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        [
          "group/card flex flex-col overflow-hidden",
          "rounded-xl border border-border bg-card text-card-foreground",
          "shadow-card transition-[box-shadow,border-color,transform,background-color] duration-200",
          "has-data-[slot=card-footer]:pb-0",
          "has-[>img:first-child]:pt-0",
          "*:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
          "data-[size=sm]:rounded-lg data-[size=lg]:rounded-2xl",
        ].join(" "),
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        [
          "group/card-header @container/card-header grid auto-rows-min items-start",
          "gap-1.5 px-5 pt-5",
          "group-data-[size=sm]/card:px-4 group-data-[size=sm]/card:pt-4",
          "group-data-[size=lg]/card:px-6 group-data-[size=lg]/card:pt-6",
          "has-data-[slot=card-action]:grid-cols-[1fr_auto]",
          "has-data-[slot=card-description]:grid-rows-[auto_auto]",
          "[.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3",
        ].join(" "),
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        [
          "font-heading text-lg font-bold leading-snug tracking-tight text-card-foreground",
          "group-data-[size=sm]/card:text-base",
          "group-data-[size=lg]/card:text-xl",
        ].join(" "),
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        "text-sm leading-6 text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        [
          "px-5 pb-5",
          "group-data-[size=sm]/card:px-4 group-data-[size=sm]/card:pb-4",
          "group-data-[size=lg]/card:px-6 group-data-[size=lg]/card:pb-6",
        ].join(" "),
        className,
      )}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        [
          "flex items-center gap-3 border-t border-border bg-muted/45",
          "px-5 py-4",
          "group-data-[size=sm]/card:px-4 group-data-[size=sm]/card:py-3",
          "group-data-[size=lg]/card:px-6 group-data-[size=lg]/card:py-5",
        ].join(" "),
        className,
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};