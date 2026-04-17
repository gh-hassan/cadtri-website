import { cn } from "@/lib/utils";

type SectionHeadingAlign = "left" | "center";
type SectionHeadingSize  = "default" | "large";

interface SectionHeadingProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  align?: SectionHeadingAlign;
  size?: SectionHeadingSize;
  spaceBelow?: boolean;
  /** Use light variants when placed on a dark (primary) background */
  onDark?: boolean;
  className?: string;
}

/**
 * Section heading block: eyebrow → H2 → optional subheading.
 *
 * Eyebrow uses a thin orange ruled line as an architectural accent — a
 * deliberate brand detail applied consistently across every section.
 *
 * H2 uses Outfit Bold (700) via base styles. Tracking is tighter than
 * Outfit's default to give headings more typographic authority.
 * Subheading uses Outfit Light (300) for clear weight separation from the heading.
 */
export function SectionHeading({
  eyebrow,
  heading,
  subheading,
  align = "left",
  size = "default",
  spaceBelow = true,
  onDark = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        spaceBelow && "mb-14",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary",
            align === "left"   && "flex items-center gap-3",
            align === "center" && "flex items-center justify-center gap-3",
          )}
        >
          {/* Thin orange rule — brand-specific eyebrow detail */}
          {eyebrow}
        </p>
      )}

      <h2
        className={cn(
          // Outfit Bold. Negative tracking tightens the headline
          // and gives it typographic weight beyond just font-size.
          "font-bold",
          size === "default" && "text-3xl sm:text-4xl",
          size === "large"   && "text-4xl sm:text-5xl",
          onDark ? "text-primary-foreground" : "text-foreground",
        )}
        style={{ letterSpacing: "-0.025em" }}
      >
        {heading}
      </h2>

      {subheading && (
        <p
          className={cn(
            // Light weight creates clear separation from the bold heading
            "mt-5 font-light leading-relaxed",
            size === "default" && "text-base sm:text-lg",
            size === "large"   && "text-lg sm:text-xl",
            onDark ? "text-white/55" : "text-muted",
          )}
        >
          {subheading}
        </p>
      )}
    </div>
  );
}
