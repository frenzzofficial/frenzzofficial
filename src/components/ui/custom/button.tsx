import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import { cn } from "@/packages/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-transform duration-200 disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "brand-gradient-bg text-primary-foreground px-6 py-3.5 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-8px_var(--secondary)]",
        secondary:
          "border border-border text-foreground px-6 py-3.5 hover:border-primary/50 hover:bg-primary/10",
        ghost:
          "text-foreground px-5 py-2.5 border border-border hover:border-secondary/50 hover:bg-secondary/10",
        destructive:
          "text-destructive-foreground border border-destructive/50 bg-destructive/10 px-6 py-3.5 hover:border-destructive hover:bg-destructive/20",
      },
    },
    defaultVariants: { variant: "primary" },
  },
);

export interface ButtonProps extends VariantProps<typeof buttonVariants> {
  label: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function Button({
  label,
  href,
  onClick,
  variant,
  className,
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant }), className);
  if (href) {
    return (
      <Link href={href} className={classes}>
        {label}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={classes}>
      {label}
    </button>
  );
}
