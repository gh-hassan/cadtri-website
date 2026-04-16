import { cn } from "@/lib/utils";

interface PageHeaderProps {
  eyebrow?: string;
  heading: string;
  description?: string;
  className?: string;
}

/**
 * Full-width page header used at the top of every interior page.
 * Charcoal background, warm cream text, orange eyebrow rule and label.
 * Outfit ExtraBold heading; description at white/55 opacity.
 */
export function PageHeader({
  eyebrow,
  heading,
  description,
  className,
}: PageHeaderProps) {
  return (
    <section
      className={cn(
        "bg-primary py-20 text-primary-foreground",
        className,
      )}
    >
      <div className="container mx-auto max-w-container px-6">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="mb-5 flex items-center gap-3 text-xs font-medium uppercase tracking-widest text-secondary">
              <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
              {eyebrow}
            </p>
          )}

          <h1 className="text-4xl font-bold text-primary-foreground sm:text-5xl lg:text-6xl" style={{ letterSpacing: "-0.03em" }}>
            {heading}
          </h1>

          {description && (
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/55">
              {description}
            </p>
          )}
        </div>
      </div>

      <div className="mt-16 border-b border-white/10" />
    </section>
  );
}
