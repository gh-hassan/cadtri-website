import type { Metadata } from "next";
import { StrategyForm } from "./strategy-form";

export const maxDuration = 30;

export const metadata: Metadata = {
  title: "Get Your Free Project Strategy",
  description:
    "Tell us about your property or project and receive a free, tailored project strategy from CADTRI, whether evaluating an investment or planning a build.",
};

export default function StrategyPage() {
  return (
    <>
      <h1 className="sr-only">Get Your Free Project Strategy from CADTRI</h1>
      <StrategyForm />
    </>
  );
}
