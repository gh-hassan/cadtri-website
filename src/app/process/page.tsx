import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";

export const metadata: Metadata = {
  title: "Process",
  description:
    "A clear, step-by-step account of how CADTRI manages every project from initial inquiry through permit issuance. Structured for contractors, developers, architects, and property owners.",
};

// ─── Page data ────────────────────────────────────────────────────────────────

const steps = [
  {
    number: "01",
    title: "Inquiry and Scope Review",
    description:
      "Send us your project details: location, project type, scope description, and any existing documentation you have. We review what you have sent, identify which services apply, and confirm the full scope of deliverables, timeline, and fee before any work begins. No ambiguity at the start means no surprises mid-project.",
    outcome: "Signed scope of work and confirmed project timeline.",
  },
  {
    number: "02",
    title: "Document Review and Jurisdiction Research",
    description:
      "Before drafting begins, we review any existing drawings, site surveys, or prior permit documentation. We research the submission requirements specific to the applicable jurisdiction: checklist items, plan sheet standards, code versions in effect, and common plan check triggers for the project type. Issues identified here do not become corrections later.",
    outcome: "Confirmed documentation set and jurisdiction requirements on file.",
  },
  {
    number: "03",
    title: "Production and Coordination",
    description:
      "Your permit set is produced to the verified jurisdiction standards. Architectural sheets are drafted, structural drawings are coordinated if required, supplemental documentation is assembled, and the complete package is reviewed internally before delivery. You receive a permit-ready set, not a draft requiring further work on your end.",
    outcome: "Complete, coordinated permit set delivered and ready for submission.",
  },
  {
    number: "04",
    title: "Submission Support and Follow-Through",
    description:
      "The completed package is delivered in your required format for permit submission. We remain available throughout the plan review period to address comments, prepare correction responses, and support resubmission if needed. The engagement is not closed until the permit is issued.",
    outcome: "Permit issued. Correction response support included throughout.",
  },
] as const;

const preSubmissionChecks = [
  {
    title: "Jurisdiction Checklist Gaps",
    description:
      "Submission requirements vary by city and county. Missing a required sheet, note, or form is the most common cause of immediate rejection before plan review even begins.",
  },
  {
    title: "Sheet Coordination Conflicts",
    description:
      "Dimensions that appear on the floor plan but contradict the elevation or section. Every sheet is cross-referenced before the package is assembled.",
  },
  {
    title: "Wrong Code Edition Referenced",
    description:
      "California adopts code cycles on different schedules than federal adoptions. Sets referencing a superseded code edition are returned for correction at plan check.",
  },
  {
    title: "Missing Structural Callouts",
    description:
      "Headers at new openings, post and beam connections, hold-down locations: elements required by the structural drawings that are not called out on the architectural sheets.",
  },
  {
    title: "Accessibility Path-of-Travel",
    description:
      "Commercial tenant improvements trigger path-of-travel upgrade requirements. Sets without the required accessibility analysis are incomplete at submission.",
  },
  {
    title: "Egress Travel Distance Errors",
    description:
      "Exit widths, travel distances, and occupant loads calculated against the wrong occupancy classification. Caught in our review, not in the building department's.",
  },
  {
    title: "Energy Compliance Documentation",
    description:
      "Title 24 compliance forms must match the design parameters on the drawing sheets. Mismatches between the CF1R and the drawings generate plan check comments on every submission.",
  },
  {
    title: "Setback and Coverage Violations",
    description:
      "Site plans that show proposed construction within required setbacks or exceeding lot coverage limits. Verified against the current zoning designation before submission.",
  },
] as const;

const prepItems = [
  {
    number: "01",
    label: "Site address and parcel number",
    detail: "Required for jurisdiction research and zoning verification.",
  },
  {
    number: "02",
    label: "Project description and scope of work",
    detail: "A plain-language summary is sufficient to begin scope review.",
  },
  {
    number: "03",
    label: "Existing drawings, if available",
    detail: "CAD files, PDFs, or hand sketches are all accepted.",
  },
  {
    number: "04",
    label: "Prior permit history or building department correspondence",
    detail: "Previous comment letters and approval conditions affect the new submission.",
  },
  {
    number: "05",
    label: "Engineering reports or structural calculations, if obtained",
    detail: "Soils reports, structural analyses, and third-party studies are incorporated during coordination.",
  },
  {
    number: "06",
    label: "Preferred timeline and target permit submission date",
    detail: "Helps us confirm production scheduling and set realistic delivery expectations.",
  },
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        eyebrow="Process"
        heading="How every project moves from scope to permit."
        description="A structured four-step system designed to eliminate surprises and keep your project on schedule from first submission to final approval."
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
              Every CADTRI project runs through the same workflow regardless of
              size or complexity. The system is built to surface problems early,
              keep communication clear, and deliver a permit-ready set that does
              not require rework.
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
              through a structured internal review. The items below represent the
              most common rejection and comment triggers across California
              jurisdictions. We address each one before the package reaches the
              counter.
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
              You do not need everything before reaching out. Having these items
              available helps us review your scope accurately and provide a
              precise deliverable list and timeline from the first conversation.
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
