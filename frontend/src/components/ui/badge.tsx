import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center rounded-full border px-2 py-0.5 text-[0.625rem] font-medium whitespace-nowrap transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary/10 text-primary",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground",
        outline: "border-border text-foreground",
        applied: "border-transparent bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
        interview:
          "border-transparent bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300",
        offer:
          "border-transparent bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300",
        rejected:
          "border-transparent bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300",
        accepted:
          "border-transparent bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-300",
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
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
