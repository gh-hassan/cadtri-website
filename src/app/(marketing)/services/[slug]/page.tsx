import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { Button } from "@/components/shared/button";
import { ProcessLayout } from "@/components/service-layouts/process-layout";
import { VisualLayout } from "@/components/service-layouts/visual-layout";
import { PackageLayout } from "@/components/service-layouts/package-layout";
import { TechnicalLayout } from "@/components/service-layouts/technical-layout";
import { StrategyLayout } from "@/components/service-layouts/strategy-layout";
import { FeasibilityLayout } from "@/components/service-layouts/feasibility-layout";
import { AdditionLayout } from "@/components/service-layouts/addition-layout";
import { ConversionLayout } from "@/components/service-layouts/conversion-layout";
import { AdminLayout } from "@/components/service-layouts/admin-layout";
import { BidLayout } from "@/components/service-layouts/bid-layout";
import { OutdoorLayout } from "@/components/service-layouts/outdoor-layout";
import { RemodelLayout } from "@/components/service-layouts/remodel-layout";
import { ComplianceLayout } from "@/components/service-layouts/compliance-layout";
import { AccessoryLayout } from "@/components/service-layouts/accessory-layout";
import { EnergyLayout } from "@/components/service-layouts/energy-layout";
import { HistoricLayout } from "@/components/service-layouts/historic-layout";
import { BimLayout } from "@/components/service-layouts/bim-layout";
import { ZoningLayout } from "@/components/service-layouts/zoning-layout";
import { PathwayLayout } from "@/components/service-layouts/pathway-layout";
import { AssessmentLayout } from "@/components/service-layouts/assessment-layout";
import { ScopeLayout } from "@/components/service-layouts/scope-layout";
import { OptionsLayout } from "@/components/service-layouts/options-layout";
import { GapLayout } from "@/components/service-layouts/gap-layout";
import { DemolitionLayout } from "@/components/service-layouts/demolition-layout";
import { RedlineLayout } from "@/components/service-layouts/redline-layout";
import { TenantLayout } from "@/components/service-layouts/tenant-layout";
import { DeferredLayout } from "@/components/service-layouts/deferred-layout";
import { FireSafetyLayout } from "@/components/service-layouts/firesafety-layout";
import { SignageLayout } from "@/components/service-layouts/signage-layout";
import { InteriorLayout } from "@/components/service-layouts/interior-layout";
import { SiteplanLayout } from "@/components/service-layouts/siteplan-layout";
import { RecordLayout } from "@/components/service-layouts/record-layout";
import { getServiceBySlug, getRelatedServices, services } from "@/content/services";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/lib/json-ld";
import { company } from "@/content/company";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };
  const firstSentence = service.overview.split(".")[0] + ".";
  return {
    title: service.title,
    description: `${service.tagline} ${firstSentence}`,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const firstSentence = service.overview.split(".")[0] + ".";

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: service.title, href: `/services/${slug}` },
        ]}
      />
      <ServiceJsonLd
        title={service.title}
        description={`${service.tagline} ${firstSentence}`}
        url={`${company.website}/services/${slug}`}
        category={service.category}
      />
      <PageHeader
        eyebrow={service.category}
        heading={service.title}
        description={service.tagline}
      />

      {service.layout === "process" && <ProcessLayout service={service} />}
      {service.layout === "visual" && <VisualLayout service={service} />}
      {service.layout === "package" && <PackageLayout service={service} />}
      {service.layout === "technical" && <TechnicalLayout service={service} />}
      {service.layout === "strategy" && <StrategyLayout service={service} />}
      {service.layout === "feasibility" && <FeasibilityLayout service={service} />}
      {service.layout === "addition" && <AdditionLayout service={service} />}
      {service.layout === "conversion" && <ConversionLayout service={service} />}
      {service.layout === "admin" && <AdminLayout service={service} />}
      {service.layout === "bid" && <BidLayout service={service} />}
      {service.layout === "outdoor" && <OutdoorLayout service={service} />}
      {service.layout === "remodel" && <RemodelLayout service={service} />}
      {service.layout === "compliance" && <ComplianceLayout service={service} />}
      {service.layout === "accessory" && <AccessoryLayout service={service} />}
      {service.layout === "energy" && <EnergyLayout service={service} />}
      {service.layout === "historic" && <HistoricLayout service={service} />}
      {service.layout === "bim" && <BimLayout service={service} />}
      {service.layout === "zoning" && <ZoningLayout service={service} />}
      {service.layout === "pathway" && <PathwayLayout service={service} />}
      {service.layout === "assessment" && <AssessmentLayout service={service} />}
      {service.layout === "scope" && <ScopeLayout service={service} />}
      {service.layout === "options" && <OptionsLayout service={service} />}
      {service.layout === "gap" && <GapLayout service={service} />}
      {service.layout === "demolition" && <DemolitionLayout service={service} />}
      {service.layout === "redline" && <RedlineLayout service={service} />}
      {service.layout === "tenant" && <TenantLayout service={service} />}
      {service.layout === "deferred" && <DeferredLayout service={service} />}
      {service.layout === "firesafety" && <FireSafetyLayout service={service} />}
      {service.layout === "signage" && <SignageLayout service={service} />}
      {service.layout === "interior" && <InteriorLayout service={service} />}
      {service.layout === "siteplan" && <SiteplanLayout service={service} />}
      {service.layout === "record" && <RecordLayout service={service} />}
      {service.layout === "standard" && <StandardLayout service={service} />}
    </>
  );
}

// ─── Standard layout (inline — used for architectural-drafting and code-compliance-review) ──

function StandardLayout({ service }: { service: NonNullable<ReturnType<typeof getServiceBySlug>> }) {
  const related = getRelatedServices(service);

  return (
    <>
      {/* Overview + Why It Matters */}
      <Section variant="default">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Overview
            </p>
            <p className="font-light leading-relaxed text-foreground sm:text-lg">
              {service.overview}
            </p>
          </div>
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Why It Matters
            </p>
            <p className="font-light leading-relaxed text-muted sm:text-lg">
              {service.whyItMatters}
            </p>
            <div className="mt-8">
              <Button href="/contact" variant="primary" size="md">
                Request a Proposal
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* What's included */}
      <Section variant="surface" className="border-t border-border">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Deliverables
            </p>
            <h2 className="font-bold text-3xl text-foreground sm:text-4xl" style={{ letterSpacing: "-0.025em" }}>
              What&apos;s included.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              Every engagement includes the following deliverables. Scope is confirmed at intake based on project requirements and jurisdiction.
            </p>
          </div>
        </div>
        <div className="grid gap-px border-x border-b border-border bg-border sm:grid-cols-2">
          {service.includes.map((item) => (
            <div key={item.title} className="flex flex-col gap-3 bg-surface px-8 py-8">
              <h3 className="text-[11px] font-semibold uppercase text-foreground" style={{ letterSpacing: "0.08em" }}>
                {item.title}
              </h3>
              <p className="text-sm font-light leading-relaxed text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Who it's for */}
      <Section variant="default" className="border-t border-border">
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Designed For
            </p>
            <h2 className="font-bold text-3xl text-foreground sm:text-4xl" style={{ letterSpacing: "-0.025em" }}>
              Who this service is for.
            </h2>
            <p className="mt-5 font-light leading-relaxed text-muted">
              This service is structured to support the following project roles and client types.
            </p>
          </div>
          <ul role="list">
            {service.audience.map((item, i) => (
              <li key={item.title} className="flex gap-5 border-b border-border py-6 first:border-t">
                <span
                  className="shrink-0 text-[11px] font-medium tabular-nums text-secondary"
                  style={{ letterSpacing: "0.05em", paddingTop: "2px" }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-1.5">
                  <p className="text-sm font-medium uppercase tracking-wider text-foreground">{item.title}</p>
                  <p className="text-sm font-light leading-relaxed text-muted">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Related services */}
      {related.length > 0 && (
        <Section variant="surface" className="border-t border-border">
          <div className="mb-12 flex items-end justify-between gap-8">
            <div>
              <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
                Continue Exploring
              </p>
              <h2 className="font-bold text-2xl text-foreground sm:text-3xl" style={{ letterSpacing: "-0.025em" }}>
                Related services.
              </h2>
            </div>
            <Link href="/services" className="hidden shrink-0 text-[11px] font-medium uppercase tracking-wider text-secondary hover:text-foreground lg:block">
              All Services →
            </Link>
          </div>
          <ul className="divide-y divide-border border border-border" role="list">
            {related.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex items-center gap-6 px-7 py-7 transition-colors duration-200 hover:bg-background lg:px-9"
                >
                  <span className="min-w-[5rem] text-[10px] font-medium uppercase tracking-widest text-muted">{s.category}</span>
                  <div className="flex-1">
                    <p className="font-bold text-base text-foreground transition-colors duration-200 group-hover:text-secondary" style={{ letterSpacing: "-0.01em" }}>{s.title}</p>
                    <p className="mt-1 text-sm font-light text-muted">{s.tagline}</p>
                  </div>
                  <span className="shrink-0 text-secondary transition-transform duration-200 group-hover:translate-x-1" aria-hidden>→</span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <CtaBand
        heading="Ready to get started?"
        subheading="Tell us your project scope and we will confirm the timeline, deliverables, and next steps. No commitment required."
        primaryAction={{ label: "Request a Proposal", href: "/contact" }}
        secondaryAction={{ label: "View All Services", href: "/services" }}
        variant="dark"
      />
    </>
  );
}
