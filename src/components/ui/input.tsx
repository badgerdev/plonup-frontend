import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
        "border border-input bg-white dark:bg-input/30 rounded-md px-3 py-2 text-base shadow-sm transition-all",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-main)] focus-visible:border-[var(--accent-main)]",
        "disabled:pointer-events-none disabled:opacity-50",
        "text-sm",
        className
      )}
      {...props}
    />
  );
}

export { Input };
