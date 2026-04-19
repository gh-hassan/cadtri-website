import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { Button } from "@/components/shared/button";
import { team } from "@/content/team";

export const metadata: Metadata = {
  title: "About",
  description:
    "CADTRI is a professional architectural drafting and permit support practice producing complete, permit-ready drawing packages for residential and commercial project teams.",
};

// ─── Page data ────────────────────────────────────────────────────────────────

const stats = [
  { value: "42",   label: "Services offered" },
  { value: "All US", label: "Jurisdictions covered" },
  { value: "1st",  label: "Submission approval focus" },
  { value: "1",    label: "Dedicated point of contact" },
] as const;

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
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="bg-primary pb-32 pt-20 sm:pb-40 sm:pt-28">
        <div className="container mx-auto max-w-container px-6">
          <p className="mb-8 text-[11px] font-medium uppercase tracking-widest text-secondary">
            About CADTRI
          </p>
          <h1
            className="font-extrabold text-primary-foreground"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: "18ch",
            }}
          >
            The most complete documentation your project will see.
          </h1>
          <p
            className="mt-8 font-light leading-relaxed text-white/55"
            style={{ maxWidth: "52ch", fontSize: "clamp(1rem, 1.5vw, 1.125rem)" }}
          >
            CADTRI handles the full documentation scope so contractors, developers,
            architects, and property owners can keep their projects moving on schedule.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/services" variant="secondary" size="md">
              View Services
            </Button>
            <Button
              href="/contact"
              variant="ghost"
              size="md"
              className="text-white/50 hover:text-white"
            >
              Request a Proposal →
            </Button>
          </div>
        </div>
      </section>

      {/* ── Stats strip ──────────────────────────────────────────────────────── */}
      <section className="border-b border-border bg-surface">
        <div className="container mx-auto max-w-container px-6">
          <div className="grid grid-cols-2 divide-x divide-y divide-border border-x border-border sm:grid-cols-4 sm:divide-y-0">
            {stats.map((stat) => (
              <div key={stat.label} className="px-8 py-8">
                <p
                  className="font-bold text-foreground"
                  style={{
                    fontSize: "clamp(2rem, 3.5vw, 3rem)",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </p>
                <p className="mt-2 text-[10px] font-medium uppercase tracking-widest text-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Practice + Deliverables ──────────────────────────────────────── */}
      <Section variant="default" className="border-t border-border">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">

          {/* Left: who CADTRI is */}
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              The Practice
            </p>
            <h2
              className="mb-6 font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Drafting and permit support built for project teams.
            </h2>
            <p className="font-light leading-relaxed text-foreground sm:text-lg">
              CADTRI is a professional architectural drafting and permit support
              practice. We produce complete, permit-ready drawing packages for
              residential and commercial projects and handle the full coordination
              scope that moves a project from design intent to approved permit.
            </p>
            <p className="mt-5 font-light leading-relaxed text-muted sm:text-lg">
              Project teams engage CADTRI as a single resource for every
              documentation deliverable, from first scope review through final
              jurisdiction submission. The goal is straightforward: drawings that
              clear plan check and a permit process that runs on schedule.
            </p>
          </div>

          {/* Right: deliverables list */}
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
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

      {/* ── Dark editorial ───────────────────────────────────────────────────── */}
      <Section variant="dark" className="border-t border-white/10">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">

          {/* Left: large bold statement */}
          <div>
            <h2
              className="font-bold text-primary-foreground"
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Every permit set we produce is built to clear plan check. Not to be
              revised after it comes back.
            </h2>
          </div>

          {/* Right: standards list */}
          <div className="flex flex-col divide-y divide-white/10 border-y border-white/10">
            {standards.map((item) => (
              <div key={item.title} className="py-7">
                <p
                  className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-secondary"
                >
                  {item.title}
                </p>
                <p className="text-sm font-light leading-relaxed text-white/55">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </Section>

      {/* ── Team ─────────────────────────────────────────────────────────────── */}
      {team.length > 0 && (
        <Section variant="default" className="border-t border-border">
          <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
                The Team
              </p>
              <h2
                className="font-bold text-foreground"
                style={{
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                }}
              >
                The people behind the work.
              </h2>
            </div>
            <div className="flex items-end">
              <p className="font-light leading-relaxed text-muted">
                Every project has a dedicated contact from intake through delivery.
                No handoffs, no miscommunication.
              </p>
            </div>
          </div>

          <ul
            role="list"
            className="divide-y divide-border border-y border-border"
          >
            {team.map((member) => (
              <li
                key={member.name}
                className="grid gap-6 py-10 lg:grid-cols-[280px_1fr] lg:gap-16"
              >
                <div>
                  <p
                    className="font-bold text-xl text-foreground"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {member.name}
                  </p>
                  <p className="mt-1 text-[11px] font-medium uppercase tracking-widest text-secondary">
                    {member.role}
                  </p>
                  {member.linkedin && (
                    <Link
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-[10px] font-medium uppercase tracking-widest text-muted hover:text-secondary"
                    >
                      LinkedIn →
                    </Link>
                  )}
                </div>
                <p className="font-light leading-relaxed text-muted sm:text-[17px]">
                  {member.bio}
                </p>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* ── Who we work with ─────────────────────────────────────────────────── */}
      <Section variant="surface" className="border-t border-border">

        {/* Horizontal split intro */}
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Clients
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Who we work with.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              CADTRI works directly with the professionals and owners who need
              permit-ready documentation on a professional timeline. If your
              situation is not listed, contact us to discuss whether it fits.
            </p>
          </div>
        </div>

        {/* Numbered client list — full-width border layout */}
        <ul role="list" className="flex flex-col">
          {clientTypes.map((item, i) => (
            <li
              key={item.title}
              className="grid gap-5 border-b border-border py-7 first:border-t sm:grid-cols-[48px_1fr_2fr] sm:gap-10"
            >
              <span
                className="shrink-0 text-[11px] font-medium tabular-nums text-secondary"
                style={{ letterSpacing: "0.05em", paddingTop: "3px" }}
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm font-semibold uppercase tracking-wider text-foreground">
                {item.title}
              </p>
              <p className="text-sm font-light leading-relaxed text-muted">
                {item.description}
              </p>
            </li>
          ))}
        </ul>

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
