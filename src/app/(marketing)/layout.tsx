import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { NewsletterSignup } from "@/components/sections/newsletter-signup";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="main-content">{children}</main>
      <NewsletterSignup />
      <SiteFooter />
    </>
  );
}
