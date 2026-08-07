import {
  PencilRuler,
  FileCheck2,
  Layers,
  FolderOpen,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/shared/section";
import { ServiceCard } from "@/components/shared/service-card";
import { Button } from "@/components/shared/button";
import { servicesOverview } from "@/content/homepage";
import { getServiceHref } from "@/content/services";

const iconMap: Record<string, LucideIcon> = {
  PencilRuler,
  FileCheck2,
  Layers,
  FolderOpen,
};

/**
 * Homepage services overview — surface background.
 *
 * Horizontal split intro: heading occupies the left column, subheading and
 * the "View All" CTA anchor the right column. This creates a deliberate
 * horizontal composition rather than a stacked header above a grid.
 *
 * The intro block's bottom border becomes the visual seam between the
 * text zone and the card grid below — a single structural line.
 */
export function HomeServices() {
  return (
    <Section variant="surface">

      {/* Horizontal intro block with animations */}
      <div className="grid items-end gap-10 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20 lg:pb-16 animate-slide-up">

        {/* Left: eyebrow + heading */}
        <div>
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <span className="inline-block w-4 h-px bg-secondary" />
            Our Services
          </p>
          <h2
            className="font-bold text-3xl text-foreground sm:text-4xl animate-slide-up"
            style={{ letterSpacing: "-0.025em", animationDelay: "0.2s" }}
          >
            Complete drawing and permit services.
          </h2>
        </div>

        {/* Right: description + CTA */}
        <div className="flex flex-col justify-end gap-7 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <p className="font-light leading-relaxed text-muted sm:text-lg">
            From first scope review to final jurisdiction submission. Every
            deliverable your project needs, prepared to permit-ready standard.
          </p>
          <div>
            <Button href="/services" variant="outline" size="sm" className="hover:shadow-md transition-all duration-300">
              View All Services
            </Button>
          </div>
        </div>
      </div>

      {/* Service cards — gap-as-border grid, no top border (intro rule is the seam) */}
      <div className="grid gap-px border-x border-b border-border bg-border sm:grid-cols-2">
        {servicesOverview.map((service, idx) => (
          <div key={service.slug} className="animate-scale-in" style={{ animationDelay: `${0.4 + idx * 0.1}s` }}>
            <ServiceCard
              title={service.title}
              description={service.description}
              href={getServiceHref(service.slug)}
              icon={iconMap[service.icon]}
              className="border-0 h-full"
            />
          </div>
        ))}
      </div>

    </Section>
  );
}
