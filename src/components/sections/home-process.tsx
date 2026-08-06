import { Section } from "@/components/shared/section";
import { processSteps } from "@/content/homepage";

/**
 * Process section — dark charcoal background.
 *
 * Horizontal split intro matches the light sections' compositional pattern
 * but uses dark-background typography (text-primary-foreground / white/50).
 *
 * Outfit ExtraBold (800) step numbers in burnt orange at 55% opacity.
 * The geometric numerals read strongly even at this opacity level.
 * Thin white rule between number and content reinforces architectural rhythm.
 */
export function HomeProcess() {
  return (
    <Section variant="dark" className="relative overflow-hidden">
      {/* Animated gradient accents */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 -left-40 w-80 h-80 bg-secondary/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Horizontal intro block — dark variant */}
      <div className="grid items-end gap-10 border-b border-white/10 pb-14 lg:grid-cols-2 lg:gap-20 lg:pb-16 relative animate-slide-up">

        {/* Left: eyebrow + heading */}
        <div>
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <span className="inline-block w-4 h-px bg-secondary" />
            How It Works
          </p>
          <h2
            className="font-bold text-3xl text-primary-foreground sm:text-4xl animate-slide-up"
            style={{ letterSpacing: "-0.025em", animationDelay: "0.2s" }}
          >
            From intake to permit approval.
          </h2>
        </div>

        {/* Right: subheading, bottom-aligned */}
        <div className="flex items-end animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <p className="font-light leading-relaxed text-white/50 sm:text-lg">
            A structured four-step process designed to eliminate surprises and
            keep your project on schedule.
          </p>
        </div>
      </div>

      {/* 4-column step grid with connecting lines effect */}
      <div className="grid gap-px border-x border-b border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4 relative">
        {processSteps.map((step, idx) => (
          <div
            key={step.step}
            className="group relative flex flex-col gap-7 bg-primary px-7 py-10 transition-all duration-300 hover:bg-white/[0.08] hover:shadow-lg hover:shadow-secondary/10 hover:-translate-y-1 cursor-default animate-scale-in"
            style={{ animationDelay: `${0.4 + idx * 0.1}s` }}
          >
            {/* Hover background overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/0 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Step connector line (visual only) */}
            {idx < processSteps.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-px w-px h-1/2 bg-gradient-to-t from-white/0 to-white/10 group-hover:to-secondary/30 transition-colors duration-300" />
            )}

            {/* Outfit ExtraBold number — brightens and enlarges on hover */}
            <span
              className="select-none font-extrabold leading-none text-secondary/55 transition-all duration-300 group-hover:text-secondary group-hover:scale-110 relative"
              style={{ fontSize: "clamp(2.5rem, 5vw, 3.75rem)" }}
              aria-hidden
            >
              {step.step}
            </span>

            {/* Structural rule — expands on hover */}
            <div className="h-px w-8 bg-white/15 transition-all duration-300 group-hover:w-12 group-hover:bg-secondary relative" />

            <div className="flex flex-col gap-2.5 relative">
              <h3
                className="text-[11px] font-semibold uppercase text-primary-foreground transition-colors duration-300 group-hover:text-secondary"
                style={{ letterSpacing: "0.1em" }}
              >
                {step.title}
              </h3>
              <p className="text-sm font-light leading-relaxed text-white/50 transition-colors duration-300 group-hover:text-white/70">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

    </Section>
  );
}
