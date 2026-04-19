import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Unbounded } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { NewsletterSignup } from "@/components/sections/newsletter-signup";
import { siteMetadata } from "@/lib/metadata";
import { LocalBusinessJsonLd } from "@/lib/json-ld";

// ─── Typography ──────────────────────────────────────────────────────────────
// Two-font system: Unbounded for display headings, Outfit for all other text.
//
// Unbounded: wide, geometric, commanding — signals expertise and authority at
// large display sizes. Loaded at weights 600/700/800 for heading hierarchy.
//
// Plus Jakarta Sans: humanist geometric — body copy, navigation, UI labels.
// Slightly irregular stroke contrast and humanist warmth create the right
// tension against Unbounded's pure mechanical geometry. 300/400/500 for body,
// 600/700 for UI labels and emphasis.
//
// Both variables applied to <html> so globals.css can reference them at :root.
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-unbounded",
  display: "swap",
});

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${unbounded.variable}`}>
      <body>
        {/* Skip-to-content — visible on focus for keyboard/screen-reader users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-secondary focus:px-4 focus:py-2 focus:text-xs focus:font-medium focus:uppercase focus:tracking-widest focus:text-white"
        >
          Skip to main content
        </a>
        {/* Plausible analytics — privacy-first, no cookie banner required.
            Sign up at plausible.io and add cadtri.com as a site to activate. */}
        <Script
          defer
          data-domain="cadtri.com"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
        <LocalBusinessJsonLd />
        <SiteHeader />
        <main id="main-content">{children}</main>
        <NewsletterSignup />
        <SiteFooter />
      </body>
    </html>
  );
}
