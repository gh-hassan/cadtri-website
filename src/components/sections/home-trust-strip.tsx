import { trustItems } from "@/content/homepage";

/**
 * Credibility strip — structural band immediately below the hero.
 *
 * Sits flush against the hero (no section padding) so it reads as an
 * extension of the hero's information architecture rather than a
 * standalone section. The cream background + bordered grid create the
 * visual break from the charcoal hero.
 *
 * Four columns on desktop, stacked on mobile. Gap-as-divide using
 * divide-y / divide-x so each cell is separated by a single warm rule.
 */
export function HomeTrustStrip() {
  return (
    <section className="bg-background">
      <div className="container mx-auto max-w-container px-6">
        <div className="grid grid-cols-1 divide-y divide-border border border-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
          {trustItems.map((item) => (
            <div key={item.label} className="flex flex-col gap-3 px-8 py-9">
              <p className="flex items-center gap-2.5 text-[10px] font-medium uppercase tracking-widest text-secondary">
                <span className="inline-block h-px w-4 shrink-0 bg-secondary" aria-hidden />
                {item.label}
              </p>
              <p className="text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
