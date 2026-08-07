import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
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
import { StandardLayout } from "@/components/service-layouts/standard-layout";
import { getServiceBySlug, getServiceMetaDescription, services } from "@/content/services";
import { ServiceJsonLd, BreadcrumbJsonLd, FaqJsonLd, reactNodeToText } from "@/lib/json-ld";
import { company } from "@/content/company";

interface Props {
  params: Promise<{ slug: string }>;
}

// "architectural-drafting" is excluded here — it now lives at the dedicated
// /architectural-drafting-services route (SEO roadmap Phase 0, Aug 2026).
// The old /services/architectural-drafting URL 301s there via next.config.ts.
export function generateStaticParams() {
  return services
    .filter((s) => s.slug !== "architectural-drafting")
    .map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: { absolute: service.metaTitle ?? `${service.title} | CADTRI Drafting & Permit Services` },
    description: service.metaDescription ?? getServiceMetaDescription(service),
    alternates: { canonical: `/services/${slug}` },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  if (slug === "architectural-drafting") notFound();
  const service = getServiceBySlug(slug);
  if (!service) notFound();

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
        description={service.tagline}
        url={`${company.website}/services/${slug}`}
        category={service.category}
      />
      {service.faqs && service.faqs.length > 0 && (
        <FaqJsonLd
          items={service.faqs.map((faq) => ({
            question: faq.question,
            answer: reactNodeToText(faq.answer),
          }))}
        />
      )}
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
