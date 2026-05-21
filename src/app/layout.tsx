import type { Metadata } from "next";
import { Outfit, Unbounded } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { siteMetadata } from "@/lib/metadata";
import { LocalBusinessJsonLd } from "@/lib/json-ld";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
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
    <html lang="en" className={`${outfit.variable} ${unbounded.variable}`}>
      <head>
        {/*
          Preconnect to third-party origins used on every page.
          Opens TCP + TLS early so the browser doesn't wait when the
          script/request fires. crossOrigin="anonymous" is required for
          font origins; omit it for script-only origins.
        */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://plausible.io" />
        {/* DNS prefetch as a fallback for browsers that don't support preconnect */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://plausible.io" />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-secondary focus:px-4 focus:py-2 focus:text-xs focus:font-medium focus:uppercase focus:tracking-widest focus:text-white"
        >
          Skip to main content
        </a>

        {/*
          lazyOnload: fires during browser idle time — zero render-blocking impact.
          Both analytics scripts are non-critical and safe to delay until idle.
          Redundant defer/async attributes removed — strategy prop handles loading.
        */}
        <Script
          data-domain="cadtri.com"
          src="https://plausible.io/js/script.js"
          strategy="lazyOnload"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KW5845W0QX"
          strategy="lazyOnload"
        />
        <Script id="gtag-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KW5845W0QX');
          `}
        </Script>

        <LocalBusinessJsonLd />
        {children}
      </body>
    </html>
  );
}
