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
        "py-24 relative overflow-hidden",
        isDark ? "bg-primary" : "border-t border-border bg-background",
        className,
      )}
    >
      {/* Background animated elements */}
      {isDark && (
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-secondary/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        </div>
      )}

      <div className="container mx-auto max-w-container px-6 relative">

        {/* Decorative top rule */}
        <div className="absolute top-0 left-6 w-12 h-1 bg-secondary" />

        {/* Asymmetric composition: heading/description left, CTAs right */}
        <div className="grid items-end gap-12 lg:grid-cols-[1fr_auto] lg:gap-24 animate-slide-up">

          {/* Left: heading + subheading */}
          <div>
            <h2
              className={cn(
                "text-4xl font-bold sm:text-5xl animate-slide-up",
                isDark ? "text-primary-foreground" : "text-foreground",
              )}
              style={{ letterSpacing: "-0.025em", animationDelay: "0.1s" }}
            >
              {heading}
            </h2>

            {subheading && (
              <p
                className={cn(
                  "mt-5 max-w-xl text-base font-light leading-relaxed animate-slide-up",
                  isDark ? "text-white/50" : "text-muted",
                )}
                style={{ animationDelay: "0.2s" }}
              >
                {subheading}
              </p>
            )}
          </div>

          {/* Right: actions, stacked, right-aligned on desktop */}
          <div className="flex flex-wrap items-center gap-4 lg:flex-col lg:items-end lg:gap-4 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <Button
              href={primaryAction.href}
              variant={isDark ? "secondary" : "primary"}
              size="md"
              className={cn(
                "shadow-lg transition-all duration-300 hover:shadow-xl",
                isDark && "shadow-secondary/25 hover:shadow-secondary/40 hover:scale-105"
              )}
            >
              {primaryAction.label}
            </Button>

            {secondaryAction && (
              <Button
                href={secondaryAction.href}
                variant="ghost"
                size="md"
                className={cn(
                  "transition-all duration-300 hover:scale-105",
                  isDark
                    ? "text-white/45 hover:text-white hover:bg-white/5"
                    : "text-muted hover:text-foreground hover:bg-foreground/5",
                )}
              >
                {secondaryAction.label} <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Button>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
