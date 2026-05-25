import type { ReactNode } from "react";
import { company } from "@/content/company";

const ORG_ID = `${company.website}/#organization`;
const SITE_ID = `${company.website}/#website`;

// ─── LocalBusiness schema ─────────────────────────────────────────────────────

export function LocalBusinessJsonLd() {
  const sameAs: string[] = [];
  if (company.social.linkedin) sameAs.push(company.social.linkedin);
  if (company.social.instagram) sameAs.push(company.social.instagram);

  const schema = {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "HomeAndConstructionBusiness"],
    "@id": ORG_ID,
    name: company.legalName,
    alternateName: company.name,
    description: company.description,
    url: company.website,
    telephone: company.phone || undefined,
    email: company.email,
    logo: {
      "@type": "ImageObject",
      url: `${company.website}/brand/logo.png`,
    },
    image: `${company.website}/brand/logo.png`,
    geo: {
      "@type": "GeoCoordinates",
      latitude: 30.37153,
      longitude: -97.74144,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: company.address.city,
      addressRegion: company.address.state,
      addressCountry: "US",
      ...(company.address.street ? { streetAddress: company.address.street } : {}),
      ...(company.address.zip ? { postalCode: company.address.zip } : {}),
    },
    ...(company.founded ? { foundingDate: company.founded } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "City", name: "Miami",           containedInPlace: { "@type": "State", name: "Florida" } },
      { "@type": "City", name: "Fort Lauderdale", containedInPlace: { "@type": "State", name: "Florida" } },
      { "@type": "City", name: "Tampa",           containedInPlace: { "@type": "State", name: "Florida" } },
      { "@type": "City", name: "Orlando",         containedInPlace: { "@type": "State", name: "Florida" } },
      { "@type": "City", name: "Jacksonville",    containedInPlace: { "@type": "State", name: "Florida" } },
      { "@type": "City", name: "Austin",          containedInPlace: { "@type": "State", name: "Texas" } },
      { "@type": "City", name: "Dallas",          containedInPlace: { "@type": "State", name: "Texas" } },
      { "@type": "City", name: "Houston",         containedInPlace: { "@type": "State", name: "Texas" } },
      { "@type": "City", name: "San Antonio",     containedInPlace: { "@type": "State", name: "Texas" } },
      { "@type": "City", name: "Fort Worth",      containedInPlace: { "@type": "State", name: "Texas" } },
      { "@type": "City", name: "Charlotte",       containedInPlace: { "@type": "State", name: "North Carolina" } },
      { "@type": "City", name: "Raleigh",         containedInPlace: { "@type": "State", name: "North Carolina" } },
      { "@type": "City", name: "Durham",          containedInPlace: { "@type": "State", name: "North Carolina" } },
    ],
    priceRange: "$$",
    knowsAbout: [
      "Architectural Drafting",
      "Permit Set Preparation",
      "ADU Permits",
      "Building Permits",
      "Construction Documentation",
      "Florida Building Code",
      "Texas IECC Energy Compliance",
      "North Carolina State Building Code",
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

// ─── ServiceList schema ───────────────────────────────────────────────────────
// Use on the /services index page to signal the full service catalog.

interface ServiceListItem {
  name: string;
  url: string;
  position: number;
}

export function ServiceListJsonLd({ items }: { items: ServiceListItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Architectural Drafting and Permit Services",
    description: "Complete catalog of architectural drafting and permit support services offered by CADTRI",
    numberOfItems: items.length,
    itemListElement: items.map((item) => ({
      "@type": "ListItem",
      position: item.position,
      name: item.name,
      url: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── Article schema ───────────────────────────────────────────────────────────

interface ArticleJsonLdProps {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  category: string;
  image?: string;
}

export function ArticleJsonLd({ title, description, url, datePublished, dateModified, category, image }: ArticleJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url,
    datePublished,
    dateModified: dateModified ?? datePublished,
    articleSection: category,
    ...(image ? { image: { "@type": "ImageObject", url: image } } : {}),
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

// ─── HowTo schema ─────────────────────────────────────────────────────────────
// Use on process or instructional pages.

interface HowToStep {
  name: string;
  text: string;
}

interface HowToJsonLdProps {
  name: string;
  description: string;
  steps: HowToStep[];
}

export function HowToJsonLd({ name, description, steps }: HowToJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.name,
      text: step.text,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── AboutPage schema ─────────────────────────────────────────────────────────

export function AboutPageJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url: `${company.website}/about`,
    name: "About CADTRI",
    description: "CADTRI is a professional architectural drafting and permit coordination company serving residential and commercial clients nationwide across 40+ states.",
    isPartOf: { "@id": SITE_ID },
    about: { "@id": ORG_ID },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── ContactPage schema ───────────────────────────────────────────────────────

export function ContactPageJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: `${company.website}/contact`,
    name: "Contact CADTRI",
    description: "Submit a project inquiry to CADTRI for architectural drafting and permit services nationwide.",
    isPartOf: { "@id": SITE_ID },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── ReactNode → plain text helper ───────────────────────────────────────────

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
// Retained for AI/LLM citation benefit (ChatGPT, Perplexity, Claude).

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
