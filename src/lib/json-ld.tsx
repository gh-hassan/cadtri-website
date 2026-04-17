import { company } from "@/content/company";

// ─── LocalBusiness schema ─────────────────────────────────────────────────────
// Added to the root layout so every page carries the base business entity.

export function LocalBusinessJsonLd() {
  const sameAs: string[] = [];
  if (company.social.linkedin) sameAs.push(company.social.linkedin);
  if (company.social.instagram) sameAs.push(company.social.instagram);

  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: company.legalName,
    alternateName: company.name,
    description: company.description,
    url: company.website,
    telephone: company.phone || undefined,
    email: company.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: company.address.city,
      addressRegion: company.address.state,
      addressCountry: "US",
      ...(company.address.street ? { streetAddress: company.address.street } : {}),
      ...(company.address.zip ? { postalCode: company.address.zip } : {}),
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
    areaServed: [
      { "@type": "State", name: "Texas" },
      { "@type": "State", name: "California" },
    ],
    priceRange: "$$",
    knowsAbout: [
      "Architectural Drafting",
      "Permit Set Preparation",
      "ADU Permits",
      "Building Permits",
      "Construction Documentation",
      "Title 24 Energy Compliance",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── Service schema ───────────────────────────────────────────────────────────
// Added per-page on individual /services/[slug] pages.

interface ServiceJsonLdProps {
  title: string;
  description: string;
  url: string;
  category?: string;
}

export function ServiceJsonLd({ title, description, url, category }: ServiceJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description,
    url,
    ...(category ? { serviceType: category } : {}),
    provider: {
      "@type": "ProfessionalService",
      name: company.legalName,
      url: company.website,
      telephone: company.phone || undefined,
      email: company.email,
    },
    areaServed: [
      { "@type": "State", name: "Texas" },
      { "@type": "State", name: "California" },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── BreadcrumbList schema ────────────────────────────────────────────────────
// Optional — call on inner pages for breadcrumb rich results.

interface BreadcrumbItem {
  name: string;
  href: string;
}

export function BreadcrumbJsonLd({ items }: { items: readonly BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${company.website}${item.href}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
