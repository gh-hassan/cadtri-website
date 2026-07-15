import type { Metadata } from "next";
import { company } from "@/content/company";

const OG_IMAGE = "/brand/og-default.jpg";

// Default metadata applied to every page.
// Use buildMetadata() on every page to inherit OG/Twitter defaults with per-page overrides.
export const siteMetadata: Metadata = {
  metadataBase: new URL(company.website),
  title: {
    default: "Architectural Drafting & Permit Services — Nationwide | CADTRI",
    template: `%s | CADTRI – Permit & Drafting Services`,
  },
  description: company.description,
  openGraph: {
    type: "website",
    siteName: company.name,
    locale: "en_US",
    description: company.description,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: company.name }],
  },
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  // icons are generated via src/app/icon.tsx and src/app/apple-icon.tsx
};

// Helper: build per-page metadata inheriting all siteMetadata defaults.
// Pass title + description; OG/Twitter tags are auto-populated from them.
export function buildMetadata(overrides: {
  title: string | { absolute: string };
  description: string;
  canonical?: string;
  ogImage?: string;
} & Partial<Metadata>): Metadata {
  const { title, description, canonical, ogImage, ...rest } = overrides;
  const image = ogImage ?? OG_IMAGE;
  const resolvedTitle =
    typeof title === "object" && "absolute" in title ? title.absolute : String(title);

  return {
    ...siteMetadata,
    title,
    description,
    ...(canonical ? { alternates: { canonical } } : {}),
    openGraph: {
      ...(siteMetadata.openGraph as object),
      title: resolvedTitle,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: company.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: [image],
    },
    ...rest,
  };
}
