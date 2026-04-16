import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/shared/button";
import { industriesServed } from "@/content/homepage";

/**
 * Industries / client types section — surface background.
 *
 * Two-column split: section heading + CTA on the left; indexed client list
 * on the right. The layout reads like a well-designed index page.
 *
 * Numeric prefixes (01 through 06) in burnt orange create a visual thread
 * that ties this section to the Process step numbers and Why CADTRI
 * editorial numbers — a deliberate typographic system across the page.
 */
export function HomeIndustries() {
  return (
    <Section variant="surface">
      <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-20">

        {/* Left: section heading anchored, CTA below */}
        <div>
          <SectionHeading
            eyebrow={industriesServed.eyebrow}
            heading={industriesServed.heading}
            subheading={industriesServed.subheading}
            spaceBelow={false}
          />
          <div className="mt-10">
            <Button href="/contact" variant="primary" size="md">
              Start a Project
            </Button>
          </div>
        </div>

        {/* Right: numerically indexed client list */}
        <ul role="list">
          {industriesServed.items.map((item, i) => (
            <li
              key={item.title}
              className="flex gap-5 border-b border-border py-6 first:border-t first:border-t-border"
            >
              {/* Numeric index — orange, ties to page-wide numbering system */}
              <span
                className="shrink-0 text-[11px] font-medium tabular-nums text-secondary"
                style={{ letterSpacing: "0.05em", paddingTop: "2px" }}
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="flex flex-col gap-1.5">
                <p className="text-sm font-medium uppercase tracking-wider text-foreground">
                  {item.title}
                </p>
                <p className="text-sm font-light leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ul>

      </div>
    </Section>
  );
}
