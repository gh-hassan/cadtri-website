import type { Metadata } from "next";
import { company } from "@/content/company";
import { closingCta } from "@/content/homepage";
import { HomeHero } from "@/components/sections/home-hero";
import { HomeTrustStrip } from "@/components/sections/home-trust-strip";
import { HomeServices } from "@/components/sections/home-services";
import { HomeWhyUs } from "@/components/sections/home-why-us";
import { HomeProcess } from "@/components/sections/home-process";
import { HomeIndustries } from "@/components/sections/home-industries";
import { HomePortfolio } from "@/components/sections/home-portfolio";
import { CtaBand } from "@/components/shared/cta-band";

export const metadata: Metadata = {
  title: {
    absolute: `${company.name} | ${company.tagline}`,
  },
  description: company.description,
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeTrustStrip />
      <HomeServices />
      <HomeWhyUs />
      <HomeProcess />
      <HomeIndustries />
      <HomePortfolio />
      <CtaBand
        heading={closingCta.heading}
        subheading={closingCta.subheading}
        primaryAction={closingCta.primaryAction}
        secondaryAction={closingCta.secondaryAction}
        variant="dark"
      />
    </>
  );
}
