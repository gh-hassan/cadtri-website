import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base — architectural: uppercase, very wide tracking, no pill rounding
  [
    "inline-flex items-center justify-center gap-2 cursor-pointer",
    "font-sans font-medium uppercase tracking-widest",
    "transition-colors duration-base",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-40",
    "select-none whitespace-nowrap",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-primary text-primary-foreground",
          "hover:bg-primary-hover",
          "focus-visible:ring-primary",
        ],
        secondary: [
          "bg-secondary text-secondary-foreground",
          "hover:bg-secondary-hover",
          "focus-visible:ring-secondary",
        ],
        outline: [
          "border border-primary bg-transparent text-primary",
          "hover:bg-primary hover:text-primary-foreground",
          "focus-visible:ring-primary",
        ],
        ghost: [
          "bg-transparent text-muted",
          "hover:text-foreground",
          "focus-visible:ring-muted",
        ],
      },
      size: {
        sm: "px-5 py-2.5 text-xs",
        md: "px-7 py-3.5 text-xs",
        lg: "px-9 py-4  text-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size:    "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Renders the button as a Next.js Link when provided */
  href?:   string;
  target?: string;
  rel?:    string;
}

/**
 * Multi-purpose button.
 * Renders as <button> by default; renders as <Link> when `href` is provided.
 * Accepts all standard button HTML attributes when used as a button.
 */
export function Button({
  variant,
  size,
  className,
  children,
  href,
  target,
  rel,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (href) {
    return (
      <Link href={href} target={target} rel={rel} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

export { buttonVariants };
