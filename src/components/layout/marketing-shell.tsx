"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { NewsletterSignup } from "@/components/sections/newsletter-signup";

export function MarketingShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isApp = pathname.startsWith("/admin") || pathname.startsWith("/portal");

  if (isApp) return <>{children}</>;

  return (
    <>
      <SiteHeader />
      <main id="main-content">{children}</main>
      <NewsletterSignup />
      <SiteFooter />
    </>
  );
}
