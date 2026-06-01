import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  [
    "group/badge inline-flex h-6 w-fit shrink-0 items-center justify-center",
    "gap-1 overflow-hidden rounded-full border border-transparent",
    "px-2.5 py-0.5 text-xs font-extrabold leading-none whitespace-nowrap",
    "transition-all duration-200",
    "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
    "has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
    "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
    "dark:aria-invalid:ring-destructive/40",
    "[&>svg]:pointer-events-none [&>svg]:size-3.5",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground [a]:hover:bg-primary/90",
        brand:
          "bg-brand text-brand-foreground [a]:hover:bg-brand/90",
        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/90",
        soft:
          "border-border bg-accent text-accent-foreground [a]:hover:border-primary [a]:hover:bg-primary/10 [a]:hover:text-primary",
        success:
          "bg-[var(--color-success)] text-[var(--color-inverse)] [a]:hover:opacity-90",
        warning:
          "bg-[var(--color-warning)] text-[var(--color-heading)] [a]:hover:opacity-90",
        error:
          "bg-[var(--color-error)] text-[var(--color-inverse)] [a]:hover:opacity-90",
        info:
          "bg-[var(--color-info)] text-[var(--color-inverse)] [a]:hover:opacity-90",
        destructive:
          "bg-destructive text-destructive-foreground focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/90",
        outline:
          "border-border bg-card text-foreground [a]:hover:bg-muted [a]:hover:text-foreground",
        ghost:
          "text-foreground hover:bg-muted hover:text-foreground dark:hover:bg-muted/50",
        link:
          "h-auto rounded-none border-0 bg-transparent p-0 text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };