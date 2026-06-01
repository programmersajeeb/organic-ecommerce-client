import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        [
          "h-11 w-full min-w-0 rounded-md border border-input bg-card",
          "px-3 py-2 text-sm font-medium text-foreground shadow-xs outline-none",
          "transition-[color,box-shadow,border-color,background-color] duration-200",
          "placeholder:text-muted-foreground",
          "file:inline-flex file:h-7 file:border-0 file:bg-transparent",
          "file:text-sm file:font-semibold file:text-foreground",
          "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/45",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60",
          "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
          "dark:bg-input/20 dark:disabled:bg-input/30",
          "dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        ].join(" "),
        className,
      )}
      {...props}
    />
  );
}

export { Input };