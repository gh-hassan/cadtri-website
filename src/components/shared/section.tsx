import { cn } from "@/lib/utils";

type SectionVariant = "default" | "surface" | "dark";

interface SectionProps {
  children: React.ReactNode;
  variant?: SectionVariant;
  /** Reduces vertical padding for tighter groupings */
  compact?: boolean;
  id?: string;
  className?: string;
}

/**
 * Base section wrapper.
 * Handles background variants, vertical rhythm, and container width.
 * Use this as the outermost wrapper for every full-width page section.
 */
export function Section({
  children,
  variant = "default",
  compact = false,
  id,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        compact ? "py-14" : "py-24",
        variant === "default" && "bg-background",
        variant === "surface" && "bg-surface",
        variant === "dark"    && "bg-primary text-primary-foreground",
        className,
      )}
    >
      <div className="container mx-auto max-w-container px-6">{children}</div>
    </section>
  );
}
