import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { StandardLayout } from "@/components/service-layouts/standard-layout";
import { getServiceBySlug, getServiceMetaDescription } from "@/content/services";
import { ServiceJsonLd, BreadcrumbJsonLd, FaqJsonLd, reactNodeToText } from "@/lib/json-ld";
import { company } from "@/content/company";

// Dedicated top-level route for the "architectural drafting services" target
// keyword (SEO roadmap Phase 0, Aug 2026) — moved out of /services/[slug] so
// the exact keyword phrase sits in the URL slug, matching every ranking
// competitor's URL pattern. The old /services/architectural-drafting URL
// 301s here via next.config.ts.
const service = getServiceBySlug("architectural-drafting")!;

export const metadata: Metadata = {
  title: { absolute: service.metaTitle ?? `${service.title} | CADTRI Drafting & Permit Services` },
  description: service.metaDescription ?? getServiceMetaDescription(service),
  alternates: { canonical: "/architectural-drafting-services" },
};

export default function ArchitecturalDraftingServicesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: service.title, href: "/architectural-drafting-services" },
        ]}
      />
      <ServiceJsonLd
        title={service.title}
        description={service.tagline}
        url={`${company.website}/architectural-drafting-services`}
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

      <StandardLayout service={service} />
    </>
  );
}
