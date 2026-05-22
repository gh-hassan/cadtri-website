import type { Metadata } from "next";
import { StrategyForm } from "./strategy-form";

export const maxDuration = 30;

export const metadata: Metadata = {
  title: "Get Your Free Project Strategy",
  description:
    "Tell us about your property or project and receive a free tailored strategy from CADTRI — whether you are evaluating an investment or need a clear execution roadmap.",
};

export default function StrategyPage() {
  return <StrategyForm />;
}
