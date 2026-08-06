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
    <section className="bg-background relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-container px-6 relative">
        <div className="grid grid-cols-1 divide-y divide-border border border-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4 lg:divide-x lg:divide-y-0 rounded-sm overflow-hidden">
          {trustItems.map((item, idx) => (
            <div
              key={item.label}
              className="group flex flex-col gap-3 px-8 py-10 transition-all duration-300 hover:bg-surface/50 hover:translate-y-[-2px] cursor-default animate-slide-up"
              style={{ animationDelay: `${0.1 + idx * 0.08}s` }}
            >
              <p className="flex items-center gap-2.5 text-[10px] font-medium uppercase tracking-widest text-secondary transition-colors duration-300 group-hover:text-secondary">
                <span className="inline-block w-3 h-px bg-secondary/60 transition-all duration-300 group-hover:w-5 group-hover:bg-secondary" />
                {item.label}
              </p>
              <p className="text-sm leading-relaxed text-muted transition-colors duration-300 group-hover:text-foreground font-light">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
