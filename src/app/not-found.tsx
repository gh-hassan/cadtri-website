import type { Metadata } from "next";
import { Button } from "@/components/shared/button";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-[78vh] flex-col justify-center px-6 py-24">
      <div className="container mx-auto max-w-container">

        {/* Eyebrow */}
        <p className="mb-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
          404
        </p>

        {/* Heading */}
        <h1
          className="max-w-2xl font-extrabold text-5xl text-foreground sm:text-6xl lg:text-[4.5rem]"
          style={{ letterSpacing: "-0.035em", lineHeight: 1.05 }}
        >
          Page not found.
        </h1>

        {/* Divider */}
        <div className="my-10 h-px w-24 bg-border" />

        {/* Message */}
        <p className="max-w-sm font-light leading-relaxed text-muted sm:text-lg">
          The page you requested does not exist or has been moved. Start from
          the homepage or explore our full service catalog.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/" variant="primary" size="md">
            Back to Home
          </Button>
          <Button href="/services" variant="outline" size="md">
            View Services
          </Button>
          <Button href="/contact" variant="ghost" size="md">
            Contact Us
          </Button>
        </div>

      </div>
    </div>
  );
}
