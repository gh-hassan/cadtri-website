import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { industries } from "@/content/industries";
import { BreadcrumbJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "CADTRI delivers permit-ready architectural documentation for residential, commercial, hospitality, and mixed-use projects. Explore the industries we serve.",
};

export default function IndustriesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Industries", href: "/industries" },
        ]}
      />

      <PageHeader
        eyebrow="Industries"
        heading="The project types and client contexts we serve."
        description="CADTRI works across residential, commercial, hospitality, and mixed-use developments. Every engagement starts with research into the applicable jurisdiction and project type so the documentation is built to the right standard from the first sheet."
      />

      {/* ── Industry cards ────────────────────────────────────────────────────── */}
      <Section variant="default">

        {/* Split intro */}
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Project Types
            </p>
            <h2
              className="font-bold text-3xl text-foreground sm:text-4xl"
              style={{ letterSpacing: "-0.025em" }}
            >
              Built for the full range of construction work.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              Each industry page covers the specific documentation scope,
              permit challenges, and services CADTRI provides for that project
              type. Select an industry to see the relevant detail.
            </p>
          </div>
        </div>

        {/* Industry grid */}
        <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
          {industries.map((industry, i) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className="group flex flex-col gap-5 bg-background px-8 py-8 transition-colors duration-200 hover:bg-surface"
            >
              {/* Index + title row */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span
                    className="shrink-0 text-[11px] font-medium tabular-nums text-secondary"
                    style={{ letterSpacing: "0.05em" }}
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className="font-bold text-xl text-foreground transition-colors group-hover:text-secondary"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {industry.title}
                  </h3>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-secondary" aria-hidden />
              </div>

              {/* Description */}
              <p className="text-sm font-light leading-relaxed text-muted">
                {industry.shortDescription}
              </p>

              {/* Services count */}
              <p className="text-[10px] font-medium uppercase tracking-widest text-secondary/70">
                {industry.featuredServiceSlugs.length} services
              </p>
            </Link>
          ))}
        </div>

      </Section>

      <CtaBand
        heading="Not sure which industry applies?"
        subheading="Contact us with your project scope and we will confirm the relevant services, documentation requirements, and next steps."
        primaryAction={{ label: "Request a Proposal", href: "/contact" }}
        secondaryAction={{ label: "View All Services", href: "/services" }}
        variant="dark"
      />
    </>
  );
}
