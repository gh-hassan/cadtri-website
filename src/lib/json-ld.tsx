import type { ReactNode } from "react";
import { company } from "@/content/company";

const ORG_ID = `${company.website}/#organization`;
const SITE_ID = `${company.website}/#website`;

// ─── LocalBusiness schema ─────────────────────────────────────────────────────
// Added to the root layout so every page carries the base business entity.

export function LocalBusinessJsonLd() {
  const sameAs: string[] = [];
  if (company.social.linkedin) sameAs.push(company.social.linkedin);
  if (company.social.instagram) sameAs.push(company.social.instagram);

  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": ORG_ID,
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
      { "@type": "City", name: "Miami",          containedInPlace: { "@type": "State", name: "Florida" } },
      { "@type": "City", name: "Fort Lauderdale",containedInPlace: { "@type": "State", name: "Florida" } },
      { "@type": "City", name: "Tampa",          containedInPlace: { "@type": "State", name: "Florida" } },
      { "@type": "City", name: "Orlando",        containedInPlace: { "@type": "State", name: "Florida" } },
      { "@type": "City", name: "Jacksonville",   containedInPlace: { "@type": "State", name: "Florida" } },
      { "@type": "City", name: "Austin",         containedInPlace: { "@type": "State", name: "Texas" } },
      { "@type": "City", name: "Dallas",         containedInPlace: { "@type": "State", name: "Texas" } },
      { "@type": "City", name: "Houston",        containedInPlace: { "@type": "State", name: "Texas" } },
      { "@type": "City", name: "San Antonio",    containedInPlace: { "@type": "State", name: "Texas" } },
      { "@type": "City", name: "Charlotte",      containedInPlace: { "@type": "State", name: "North Carolina" } },
      { "@type": "City", name: "Raleigh",        containedInPlace: { "@type": "State", name: "North Carolina" } },
      { "@type": "City", name: "Durham",         containedInPlace: { "@type": "State", name: "North Carolina" } },
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

// ─── WebSite schema ───────────────────────────────────────────────────────────
// Added to the root layout alongside LocalBusinessJsonLd.

export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    url: company.website,
    name: company.name,
    description: company.description,
    publisher: { "@id": ORG_ID },
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
    provider: { "@id": ORG_ID },
    areaServed: [
      { "@type": "State", name: "Florida" },
      { "@type": "State", name: "Texas" },
      { "@type": "State", name: "North Carolina" },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── Article schema ───────────────────────────────────────────────────────────
// Added per-post on /resources/[slug] pages.

interface ArticleJsonLdProps {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  category: string;
}

export function ArticleJsonLd({ title, description, url, datePublished, dateModified, category }: ArticleJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    datePublished,
    dateModified: dateModified ?? datePublished,
    articleSection: category,
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": SITE_ID },
    author: { "@id": ORG_ID },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── ReactNode → plain text helper ───────────────────────────────────────────
// Used to extract plain strings from JSX FAQ answers for structured data.

export function reactNodeToText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(reactNodeToText).join("");
  if (typeof node === "object" && "props" in (node as object)) {
    return reactNodeToText((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

// ─── FAQPage schema ───────────────────────────────────────────────────────────
// No Google rich result benefit on commercial sites (Aug 2023 restriction).
// Added for AI/LLM citation benefit (ChatGPT, Perplexity, Claude).

export interface FaqItem {
  question: string;
  answer: string;
}

export function FaqJsonLd({ items }: { items: FaqItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
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
