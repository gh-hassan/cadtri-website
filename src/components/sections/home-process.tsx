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
    <Section variant="dark">

      {/* Horizontal intro block — dark variant */}
      <div className="grid items-end gap-10 border-b border-white/10 pb-14 lg:grid-cols-2 lg:gap-20 lg:pb-16">

        {/* Left: eyebrow + heading */}
        <div>
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            How It Works
          </p>
          <h2
            className="font-bold text-3xl text-primary-foreground sm:text-4xl"
            style={{ letterSpacing: "-0.025em" }}
          >
            From intake to permit approval.
          </h2>
        </div>

        {/* Right: subheading, bottom-aligned */}
        <div className="flex items-end">
          <p className="font-light leading-relaxed text-white/50 sm:text-lg">
            A structured four-step process designed to eliminate surprises and
            keep your project on schedule.
          </p>
        </div>
      </div>

      {/* 4-column step grid */}
      <div className="grid gap-px border-x border-b border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((step) => (
          <div
            key={step.step}
            className="flex flex-col gap-7 bg-primary px-7 py-10"
          >
            {/* Outfit ExtraBold number — orange, semi-opaque */}
            <span
              className="select-none font-extrabold leading-none text-secondary/55"
              style={{ fontSize: "clamp(2.5rem, 5vw, 3.75rem)" }}
              aria-hidden
            >
              {step.step}
            </span>

            {/* Structural rule */}
            <div className="h-px w-8 bg-white/15" />

            <div className="flex flex-col gap-2.5">
              <h3
                className="text-[11px] font-semibold uppercase text-primary-foreground"
                style={{ letterSpacing: "0.1em" }}
              >
                {step.title}
              </h3>
              <p className="text-sm font-light leading-relaxed text-white/50">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

    </Section>
  );
}
