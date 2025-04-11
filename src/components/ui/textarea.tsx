import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus:outline-none focus:ring-2 focus:ring-transparent focus:border-transparent",
        "focus-visible:border-transparent focus-visible:outline-none",
        "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[conic-gradient(at_top_left,_#8a2be2,_#ff5d8f)]",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
