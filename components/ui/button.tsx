import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        default: "bg-accent text-accent-foreground hover:opacity-90",
        outline: "border border-line-strong bg-surface hover:border-accent-line hover:bg-surface-2",
        ghost: "text-muted hover:bg-surface-2 hover:text-foreground",
        chip: "rounded-full border border-line-strong bg-surface hover:border-accent-line hover:bg-surface-2 aria-pressed:border-accent aria-pressed:bg-accent-soft aria-pressed:font-semibold aria-pressed:text-accent",
      },
      size: {
        default: "h-10 rounded-xl px-4",
        sm: "h-8 rounded-lg px-3 text-sm",
        chip: "px-3.5 py-1.5 text-sm",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => (
    <button ref={ref} type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  ),
);
Button.displayName = "Button";
