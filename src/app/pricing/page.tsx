import type { Metadata } from "next";
import { PricingForm } from "./pricing-form";

export const maxDuration = 30; // extend Vercel function timeout for email sending

export const metadata: Metadata = {
  title: "Get a Pricing Estimate",
  description:
    "Answer a few quick questions about your project and receive a tailored pricing estimate from CADTRI within one business day.",
};

export default function PricingPage() {
  return (
    <>
      <h1 className="sr-only">Get a Pricing Estimate from CADTRI</h1>
      <PricingForm />
    </>
  );
}
