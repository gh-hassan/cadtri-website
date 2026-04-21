import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Unbounded } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { siteMetadata } from "@/lib/metadata";
import { LocalBusinessJsonLd } from "@/lib/json-ld";

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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-secondary focus:px-4 focus:py-2 focus:text-xs focus:font-medium focus:uppercase focus:tracking-widest focus:text-white"
        >
          Skip to main content
        </a>
        <Script
          defer
          data-domain="cadtri.com"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
        <LocalBusinessJsonLd />
        {children}
      </body>
    </html>
  );
}
