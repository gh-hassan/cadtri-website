import type { Metadata } from "next";
import { PricingForm } from "./pricing-form";

export const metadata: Metadata = {
  title: "Get a Pricing Estimate",
  description:
    "Answer a few quick questions about your project and receive a tailored pricing estimate from CADTRI within one business day.",
};

export default function PricingPage() {
  return <PricingForm />;
}
