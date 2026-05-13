import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";

export const metadata: Metadata = {
  title: "Architectural Drafting Process | CADTRI",
  description:
    "Explore CADTRI's architectural drafting process from planning and BIM coordination to permit-ready construction documentation.",
};

// ─── Page data ────────────────────────────────────────────────────────────────

const steps = [
  {
    number: "01",
    title: "Inquiry and Scope Review",
    description:
      "Send us your project details: location, project type, scope description, and any existing documentation available. We review the information, identify the required services, and confirm the complete scope of deliverables, timeline, and fee before work begins. Clear project planning at the start helps avoid delays later in the architectural project workflow.",
    outcome: "Signed scope of work and confirmed project timeline.",
  },
  {
    number: "02",
    title: "Document Review and Jurisdiction Research",
    description:
      "Before drafting starts, we review existing drawings, surveys, and prior permit documentation. We also research jurisdiction-specific submission standards, applicable code editions, checklist requirements, and common plan review triggers tied to the project type. This phase is a critical part of our permit drawing process and helps prevent avoidable corrections during plan check.",
    outcome: "Confirmed documentation set and jurisdiction requirements on file.",
  },
  {
    number: "03",
    title: "Production and Coordination",
    description:
      "Your permit set is developed using verified jurisdiction standards and a coordinated CAD drafting workflow. Architectural sheets are prepared, structural and MEP coordination is completed where required, and all supporting construction documents are internally reviewed before delivery. The result is a fully coordinated set prepared for permit approval, not a draft requiring additional work.",
    outcome: "Complete, coordinated permit set delivered and ready for submission.",
  },
  {
    number: "04",
    title: "Submission Support and Follow Through",
    description:
      "The completed package is delivered in the required submission format for the applicable building department. We remain available throughout the review cycle to address comments, prepare correction responses, and support resubmissions when necessary. Our construction administration support continues until the permit is issued.",
    outcome: "Permit issued. Correction response support included throughout.",
  },
] as const;

const preSubmissionChecks = [
  {
    title: "Jurisdiction Checklist Gaps",
    description:
      "Submission requirements vary between cities and counties. Missing forms, notes, or sheets are among the most common causes of rejection before review even begins.",
  },
  {
    title: "Sheet Coordination Conflicts",
    description:
      "Dimensions shown on plans that conflict with elevations or sections are identified during our multidisciplinary coordination review process before the package is assembled.",
  },
  {
    title: "Wrong Code Edition Referenced",
    description:
      "California jurisdictions adopt code cycles differently than federal standards. Referencing outdated codes creates immediate plan check corrections and delays permit approval.",
  },
  {
    title: "Missing Structural Callouts",
    description:
      "Headers, beam connections, hold downs, and structural references required by engineering drawings are verified during the coordination phase to maintain construction-ready documentation.",
  },
  {
    title: "Accessibility Path of Travel",
    description:
      "Commercial tenant improvements often trigger ADA upgrade requirements. Accessibility analysis is reviewed as part of the complete construction documentation process before submission.",
  },
  {
    title: "Egress Travel Distance Errors",
    description:
      "Occupant load calculations, exit widths, and travel distances are verified against the proper occupancy classification during our internal review workflow.",
  },
  {
    title: "Energy Compliance Documentation",
    description:
      "Title 24 energy forms must align with the architectural drawings. Any inconsistencies between the CF1R documentation and the permit sheets are corrected before submission.",
  },
  {
    title: "Setback and Coverage Violations",
    description:
      "Site plans are checked against zoning requirements, setback limitations, and lot coverage restrictions before the permit package reaches the building department.",
  },
] as const;

const prepItems = [
  {
    number: "01",
    label: "Site address and parcel number",
    detail: "Required for zoning verification and jurisdiction research.",
  },
  {
    number: "02",
    label: "Project description and scope of work",
    detail: "A simple written summary is enough to begin the architectural review process.",
  },
  {
    number: "03",
    label: "Existing drawings, if available",
    detail: "CAD files, PDFs, sketches, and prior construction documents are all accepted.",
  },
  {
    number: "04",
    label: "Prior permit history or building department correspondence",
    detail: "Previous correction notices and approval conditions often affect the new submission strategy.",
  },
  {
    number: "05",
    label: "Engineering reports or structural calculations, if obtained",
    detail: "Structural reports, soils studies, and third-party engineering documentation are integrated during the BIM coordination and consultant workflow.",
  },
  {
    number: "06",
    label: "Preferred timeline and target permit submission date",
    detail: "This helps us confirm production scheduling, project delivery expectations, and the overall construction-ready project coordination timeline.",
  },
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        eyebrow="Process"
        heading="How every project moves from scope to permit."
        description="A structured four-step architectural drafting process designed to eliminate surprises and keep your project on schedule from first submission to final permit approval."
      />

      {/* ── Process steps ────────────────────────────────────────────────────── */}
      <Section variant="default">

        {/* Horizontal split intro */}
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              The Workflow
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Four stages. One production system.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              Every CADTRI project follows the same streamlined construction
              documentation workflow regardless of project size or complexity. The
              system is built to identify issues early, simplify communication, and
              deliver permit-ready drawing packages that minimize revisions and
              support a smoother permit submission workflow.
            </p>
          </div>
        </div>

        {/* Step rows — large editorial layout */}
        <ul role="list" className="divide-y divide-border">
          {steps.map((step) => (
            <li
              key={step.number}
              className="grid gap-x-12 gap-y-6 py-12 lg:grid-cols-[8rem_1fr_18rem]"
            >
              {/* Large orange step number */}
              <div className="flex items-start">
                <span
                  className="font-bold tabular-nums text-secondary"
                  style={{
                    fontSize: "clamp(4rem, 8vw, 6rem)",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                  }}
                  aria-hidden
                >
                  {step.number}
                </span>
              </div>

              {/* Title + description */}
              <div className="flex flex-col justify-center">
                <h3
                  className="mb-4 font-bold text-foreground"
                  style={{
                    fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.2,
                  }}
                >
                  {step.title}
                </h3>
                <p className="font-light leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>

              {/* Outcome — right column */}
              <div className="flex flex-col justify-center border-border lg:border-l lg:pl-10">
                <p className="mb-2 text-[11px] font-medium uppercase tracking-widest text-secondary">
                  Outcome
                </p>
                <p className="text-sm font-light leading-relaxed text-muted">
                  {step.outcome}
                </p>
              </div>
            </li>
          ))}
        </ul>

      </Section>

      {/* ── Pre-submission review authority section ───────────────────────────── */}
      <Section variant="dark" className="border-t border-border">

        {/* Section header */}
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Quality Control
            </p>
            <h2
              className="font-bold text-primary-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              What we catch before the building department does.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-white/60">
              Before any drawing leaves our production queue, every set goes
              through a structured architectural quality control and coordination
              review. These are the most common plan check issues across residential
              and commercial jurisdictions, and they are addressed during our
              internal construction drawing process before submission.
            </p>
          </div>
        </div>

        {/* Two-column checklist */}
        <div className="grid gap-px bg-white/10 sm:grid-cols-2">
          {preSubmissionChecks.map((check, index) => (
            <div
              key={check.title}
              className="flex gap-5 bg-primary px-8 py-7"
            >
              <span
                className="mt-0.5 shrink-0 font-medium tabular-nums text-secondary"
                style={{
                  fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.4,
                }}
                aria-hidden
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p
                  className="mb-2 font-bold text-primary-foreground"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {check.title}
                </p>
                <p className="text-sm font-light leading-relaxed text-white/60">
                  {check.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </Section>

      {/* ── What to prepare ──────────────────────────────────────────────────── */}
      <Section variant="surface" className="border-t border-border">

        {/* Horizontal split intro */}
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Before You Reach Out
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              What to have ready.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              You do not need a complete package before contacting us. Having the
              following information available helps us review your scope accurately
              and develop a precise project coordination workflow from the beginning.
            </p>
          </div>
        </div>

        {/* Prep items — full-width bordered rows */}
        <ul role="list" className="divide-y divide-border border-t border-border">
          {prepItems.map((item) => (
            <li
              key={item.number}
              className="grid gap-x-10 gap-y-2 py-7 sm:grid-cols-[3rem_1fr_1fr]"
            >
              {/* Orange index number */}
              <span
                className="font-medium tabular-nums text-secondary"
                style={{
                  fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.6,
                }}
                aria-hidden
              >
                {item.number}
              </span>

              {/* Label */}
              <p
                className="font-bold text-foreground"
                style={{ letterSpacing: "-0.02em" }}
              >
                {item.label}
              </p>

              {/* Detail */}
              <p className="text-sm font-light leading-relaxed text-muted sm:border-l sm:border-border sm:pl-10">
                {item.detail}
              </p>
            </li>
          ))}
        </ul>

      </Section>

      <CtaBand
        heading="Ready to start your project?"
        subheading="Tell us your scope and we will confirm deliverables, timeline, and pricing. No commitment required."
        primaryAction={{ label: "Request a Proposal", href: "/contact" }}
        secondaryAction={{ label: "View Services", href: "/services" }}
        variant="dark"
      />
    </>
  );
}
