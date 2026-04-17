import { cn } from "@/lib/utils";
import { Button } from "./button";

interface CtaAction {
  label: string;
  href:  string;
}

interface CtaBandProps {
  heading:          string;
  subheading?:      string;
  primaryAction:    CtaAction;
  secondaryAction?: CtaAction;
  /** dark = charcoal bg / light = cream bg with top border */
  variant?: "dark" | "light";
  className?: string;
}

/**
 * Full-width call-to-action band.
 *
 * Asymmetric layout: thin orange rule anchors the top-left, heading and
 * subheading occupy the left column, action buttons anchor the right.
 * Left-alignment gives the section presence and directional energy rather
 * than the static feel of a centered layout.
 *
 * dark variant:  charcoal bg, orange primary button
 * light variant: cream bg with top border, charcoal primary button
 */
export function CtaBand({
  heading,
  subheading,
  primaryAction,
  secondaryAction,
  variant = "dark",
  className,
}: CtaBandProps) {
  const isDark = variant === "dark";

  return (
    <section
      className={cn(
        "py-24",
        isDark ? "bg-primary" : "border-t border-border bg-background",
        className,
      )}
    >
      <div className="container mx-auto max-w-container px-6">

        {/* Thin orange rule — left-anchored brand accent */}

        {/* Asymmetric composition: heading/description left, CTAs right */}
        <div className="grid items-end gap-12 lg:grid-cols-[1fr_auto] lg:gap-24">

          {/* Left: heading + subheading */}
          <div>
            <h2
              className={cn(
                "text-4xl font-bold sm:text-5xl",
                isDark ? "text-primary-foreground" : "text-foreground",
              )}
              style={{ letterSpacing: "-0.025em" }}
            >
              {heading}
            </h2>

            {subheading && (
              <p
                className={cn(
                  "mt-5 max-w-xl text-base font-light leading-relaxed",
                  isDark ? "text-white/50" : "text-muted",
                )}
              >
                {subheading}
              </p>
            )}
          </div>

          {/* Right: actions, stacked, right-aligned on desktop */}
          <div className="flex flex-wrap items-center gap-4 lg:flex-col lg:items-end lg:gap-4">
            <Button
              href={primaryAction.href}
              variant={isDark ? "secondary" : "primary"}
              size="md"
            >
              {primaryAction.label}
            </Button>

            {secondaryAction && (
              <Button
                href={secondaryAction.href}
                variant="ghost"
                size="md"
                className={cn(
                  isDark
                    ? "text-white/45 hover:text-white"
                    : "text-muted hover:text-foreground",
                )}
              >
                {secondaryAction.label} →
              </Button>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
