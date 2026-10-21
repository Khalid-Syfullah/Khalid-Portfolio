import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slot } from "radix-ui"

// Variants follow docs/design/05-components.md (Button).
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-transparent whitespace-nowrap transition-[background-color,border-color,color,transform] duration-200 ease-[var(--ease-out-soft)] outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground font-semibold hover:bg-[color-mix(in_oklab,var(--primary),var(--background)_14%)]",
        ghost:
          "border-input bg-transparent text-foreground font-medium hover:bg-accent hover:text-accent-foreground aria-expanded:bg-accent",
        outline:
          "border-input bg-transparent text-foreground font-medium hover:bg-accent hover:text-accent-foreground aria-expanded:bg-accent",
        quiet:
          "bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground aria-expanded:bg-accent",
        link: "h-auto px-0 text-foreground underline decoration-1 underline-offset-4 hover:text-brand",
      },
      size: {
        default: "h-11 px-5 type-small",
        sm: "h-9 px-3 type-small",
        icon: "size-11",
        "icon-sm": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
