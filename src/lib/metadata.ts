import type { Metadata } from "next";
import { company } from "@/content/company";

// Default metadata applied to every page.
// Override title and description per-page using `export const metadata` in each page.tsx.
// The `template` ensures inner pages render as "Page Title | CADTRI".
export const siteMetadata: Metadata = {
  metadataBase: new URL(company.website),
  title: {
    default: company.name,
    template: `%s | ${company.name}`,
  },
  description: company.description,
  openGraph: {
    type: "website",
    siteName: company.name,
    locale: "en_US",
    description: company.description,
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/brand/favicon.ico",
    apple: "/brand/apple-touch-icon.png",
  },
};

// Helper: build per-page metadata with site defaults pre-applied.
export function buildMetadata(overrides: Partial<Metadata>): Metadata {
  return {
    ...siteMetadata,
    ...overrides,
  };
}
