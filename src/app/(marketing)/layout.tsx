import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { NewsletterSignup } from "@/components/sections/newsletter-signup";
import { PageTransition } from "@/components/shared/page-transition";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <PageTransition>{children}</PageTransition>
      </main>
      <NewsletterSignup />
      <SiteFooter />
    </>
  );
}
