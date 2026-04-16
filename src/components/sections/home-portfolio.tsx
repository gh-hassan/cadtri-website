import { Section } from "@/components/shared/section";
import { Button } from "@/components/shared/button";
import { portfolioItems } from "@/content/homepage";

/**
 * Portfolio preview section — cream background.
 *
 * Split header: eyebrow, heading, and subheading on the left; "View Full
 * Portfolio" CTA anchored to the bottom-right. The CTA lives in the header
 * row rather than below the grid — this avoids the common "button orphan"
 * pattern and ties the navigation affordance to the section label.
 *
 * Gap-as-border grid: 1px warm dividers, no individual card borders. The
 * grid reads as a single structured surface, not a collection of cards.
 */
export function HomePortfolio() {
  return (
    <Section variant="default" className="border-t border-border">

      {/* Split header: content left, CTA right */}
      <div className="mb-12 flex flex-wrap items-end justify-between gap-8 lg:mb-14">
        <div>
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
            Our Work
          </p>
          <h2
            className="font-bold text-3xl text-foreground sm:text-4xl"
            style={{ letterSpacing: "-0.025em" }}
          >
            Projects we have delivered.
          </h2>
          <p className="mt-4 font-light leading-relaxed text-muted">
            Permit-ready documentation across residential, commercial, and
            mixed-use project types.
          </p>
        </div>

        <Button href="/portfolio" variant="outline" size="md" className="shrink-0">
          View Full Portfolio
        </Button>
      </div>

      {/* Portfolio grid — gap-as-border */}
      <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {portfolioItems.map((item) => (
          <div
            key={item.title}
            className="group flex flex-col bg-background"
          >
            {/* Placeholder image area — replace with real <Image /> */}
            <div className="aspect-[4/3] bg-surface" aria-hidden />

            {/* Card info */}
            <div className="flex flex-col gap-1.5 px-6 py-5">
              <p className="text-[10px] font-medium uppercase tracking-widest text-secondary">
                {item.type}
              </p>
              <h3 className="text-sm font-medium text-foreground">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

    </Section>
  );
}
