import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { Button } from "@/components/shared/button";

export const metadata: Metadata = {
  title: "About",
  description:
    "CADTRI is a professional architectural drafting and permit support practice producing complete, permit-ready drawing packages for residential and commercial project teams.",
};

// ─── Page data ────────────────────────────────────────────────────────────────

const deliverables = [
  "Permit-ready architectural drawing packages",
  "Jurisdiction-specific permit set preparation",
  "Plan check correction response and resubmission",
  "Architectural and structural drawing coordination",
  "Pre-submission code and compliance review",
  "3D renderings and visualization for approvals",
] as const;

const standards = [
  {
    title: "Jurisdiction Research First",
    description:
      "We research the submission requirements of the applicable building department before drafting begins. Sets are built to those local standards from day one, not revised to fit them after.",
  },
  {
    title: "Coordinated Documentation",
    description:
      "Architectural, structural, and supplemental sheets are reviewed and aligned before submission. Dimensional conflicts and reference gaps are resolved before the plan checker encounters them.",
  },
  {
    title: "Single Point of Contact",
    description:
      "Every project has a dedicated contact from intake through delivery. No handoffs, no miscommunication, no tracking deliverables across multiple people.",
  },
  {
    title: "Complete Correction Response",
    description:
      "When plan check corrections are issued, we prepare a fully documented response with clouded revisions and a formal response letter. Every comment addressed in one organized package.",
  },
] as const;

const clientTypes = [
  {
    title: "General Contractors",
    description:
      "Need a complete, coordinated permit set before pulling a building permit. We deliver packages built to the jurisdiction and ready for plan check.",
  },
  {
    title: "Licensed Architects",
    description:
      "Overflow production drafting, permit coordination, or full documentation support for projects where internal capacity is stretched.",
  },
  {
    title: "Real Estate Developers",
    description:
      "Documentation built across single parcels or multi-site development pipelines. From feasibility drawing through jurisdiction submission.",
  },
  {
    title: "Residential Contractors",
    description:
      "Additions, ADUs, garage conversions, and remodels. Complete drawing sets prepared specifically for residential plan check requirements.",
  },
  {
    title: "Property Owners",
    description:
      "We guide you through what the jurisdiction requires and prepare everything needed for a clean, complete permit submission.",
  },
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        heading="Architectural drafting and permit support built for project teams."
        description="CADTRI handles the complete documentation scope so contractors, developers, architects, and property owners can keep their projects moving on schedule."
      />

      {/* ── The practice + Deliverables ──────────────────────────────────────── */}
      <Section variant="default">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">

          {/* Left: who CADTRI is */}
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
              The Practice
            </p>
            <p className="font-light leading-relaxed text-foreground sm:text-lg">
              CADTRI is a professional architectural drafting and permit support practice. We produce complete, permit-ready drawing packages for residential and commercial projects and handle the full coordination scope that moves a project from design intent to approved permit.
            </p>
            <p className="mt-5 font-light leading-relaxed text-muted sm:text-lg">
              Project teams engage CADTRI as a single resource for every documentation deliverable, from first scope review through final jurisdiction submission. The goal is straightforward: drawings that clear plan check and a permit process that runs on schedule.
            </p>
          </div>

          {/* Right: service deliverables list */}
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
              What We Deliver
            </p>
            <ul
              role="list"
              className="flex flex-col divide-y divide-border border-y border-border"
            >
              {deliverables.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-4 py-4 text-sm font-light text-muted"
                >
                  <span className="h-px w-5 shrink-0 bg-secondary/60" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/services" variant="outline" size="md">
                View All Services
              </Button>
            </div>
          </div>

        </div>
      </Section>

      {/* ── Standards and approach ───────────────────────────────────────────── */}
      <Section variant="surface" className="border-t border-border">

        {/* Horizontal split intro */}
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
              Standards
            </p>
            <h2
              className="font-bold text-3xl text-foreground sm:text-4xl"
              style={{ letterSpacing: "-0.025em" }}
            >
              How we approach every project.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              Every engagement runs through the same production system: jurisdiction
              research before drafting, coordinated deliverables, clear communication,
              and sets built to withstand plan check the first time through.
            </p>
          </div>
        </div>

        {/* Standards grid — gap-as-border */}
        <div className="grid gap-px border-x border-b border-border bg-border sm:grid-cols-2">
          {standards.map((item) => (
            <div
              key={item.title}
              className="flex flex-col gap-3 bg-surface px-8 py-8"
            >
              <h3
                className="text-[11px] font-semibold uppercase text-foreground"
                style={{ letterSpacing: "0.08em" }}
              >
                {item.title}
              </h3>
              <p className="text-sm font-light leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </Section>

      {/* ── Who we work with ─────────────────────────────────────────────────── */}
      <Section variant="default" className="border-t border-border">
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-20">

          {/* Left: section label + intro */}
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
              Clients
            </p>
            <h2
              className="font-bold text-3xl text-foreground sm:text-4xl"
              style={{ letterSpacing: "-0.025em" }}
            >
              Who we work with.
            </h2>
            <p className="mt-5 font-light leading-relaxed text-muted">
              CADTRI works directly with the professionals and owners who need
              permit-ready documentation on a professional timeline. If your
              situation is not listed, contact us to discuss whether it fits.
            </p>
          </div>

          {/* Right: numbered client list */}
          <ul role="list">
            {clientTypes.map((item, i) => (
              <li
                key={item.title}
                className="flex gap-5 border-b border-border py-6 first:border-t"
              >
                <span
                  className="shrink-0 text-[11px] font-medium tabular-nums text-secondary"
                  style={{ letterSpacing: "0.05em", paddingTop: "2px" }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-1.5">
                  <p className="text-sm font-medium uppercase tracking-wider text-foreground">
                    {item.title}
                  </p>
                  <p className="text-sm font-light leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

        </div>
      </Section>

      <CtaBand
        heading="Ready to discuss your project?"
        subheading="Tell us your scope and we will confirm which services apply, the timeline, and what to expect."
        primaryAction={{ label: "Request a Proposal", href: "/contact" }}
        secondaryAction={{ label: "View Services", href: "/services" }}
        variant="dark"
      />
    </>
  );
}
