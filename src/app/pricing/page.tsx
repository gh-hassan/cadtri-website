import type { Metadata } from "next";
import { PricingForm } from "./pricing-form";
import { BreadcrumbJsonLd, PricingPageJsonLd, PRICING_OFFERS } from "@/lib/json-ld";

export const maxDuration = 30; // extend Vercel function timeout for email sending

export const metadata: Metadata = {
  title: "Architectural Drafting Cost & Pricing Estimator",
  description:
    "Architectural drafting cost starts around $2,500. See what drives architectural drafting pricing and get a tailored estimate for your project in minutes.",
  alternates: { canonical: "/pricing" },
};

const costFactors = [
  {
    label: "Project Size",
    detail: "Larger footprints require more sheets and detail, so square footage is the single biggest driver of cost.",
  },
  {
    label: "Design Stage",
    detail: "Starting from a blank idea costs more than starting from sketches or existing drawings, since less has to be produced from scratch.",
  },
  {
    label: "Jurisdiction",
    detail: "Local code complexity and cost of living vary by state and city, which shifts the price up or down from the national baseline.",
  },
  {
    label: "Timeline",
    detail: "Standard delivery is the most cost-effective. Compressed, urgent timelines carry a scheduling premium.",
  },
] as const;

export default function PricingPage() {
  return (
    <>
      <PricingPageJsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Pricing", href: "/pricing" },
        ]}
      />

      <div className="border-b border-white/10 px-8 py-16 lg:px-14 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
            Pricing
          </p>
          <h1
            className="text-3xl font-bold text-primary-foreground sm:text-4xl lg:text-5xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            Architectural Drafting Cost & Pricing
          </h1>
          <p className="mt-6 max-w-2xl font-light leading-relaxed text-white/60 sm:text-lg">
            Architectural drafting cost typically starts around $2,500 for a standard permit-ready
            drawing package. Actual architectural drafting pricing depends on project size, how much
            design work already exists, the jurisdiction, and how fast you need it delivered. Answer a
            few questions below for a tailored estimate, or review typical starting prices by service.
          </p>

          {/* What affects cost */}
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {costFactors.map((factor) => (
              <div key={factor.label}>
                <p className="text-sm font-medium uppercase tracking-wider text-primary-foreground">
                  {factor.label}
                </p>
                <p className="mt-2 text-sm font-light leading-relaxed text-white/50">
                  {factor.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Starting prices by service — mirrors PricingPageJsonLd's OfferCatalog */}
          <div className="mt-14 border-t border-white/10 pt-10">
            <p className="mb-5 text-[11px] font-medium uppercase tracking-widest text-primary-foreground">
              Starting Prices By Service
            </p>
            <ul role="list" className="flex flex-col gap-0">
              {PRICING_OFFERS.map((offer) => (
                <li
                  key={offer.name}
                  className="flex items-center justify-between gap-6 border-b border-white/10 py-3 first:border-t"
                >
                  <span className="text-sm font-light text-white/70">{offer.name}</span>
                  <span className="text-sm font-medium tabular-nums text-primary-foreground">
                    From ${offer.minPrice.toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs font-light text-white/40">
              Starting prices. Final quotes depend on project scope, size, and jurisdiction.
            </p>
          </div>
        </div>
      </div>

      <PricingForm />
    </>
  );
}
