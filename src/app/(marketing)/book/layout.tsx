import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Free Consultation",
  description:
    "Schedule a free 15-minute consultation with CADTRI. We confirm which services apply, what documentation your project requires, and what the timeline looks like.",
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
