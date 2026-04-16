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

const prepItems = [
  "Site address and parcel number",
  "Project description and scope of work",
  "Existing drawings, if available (CAD, PDF, or hand sketches)",
  "Prior permit history or building department correspondence",
  "Engineering reports or structural calculations, if obtained",
  "Preferred timeline and target permit submission date",
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
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
              The Workflow
            </p>
            <h2
              className="font-bold text-3xl text-foreground sm:text-4xl"
              style={{ letterSpacing: "-0.025em" }}
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

        {/* Step rows */}
        <ul
          role="list"
          className="divide-y divide-border border border-border"
        >
          {steps.map((step) => (
            <li
              key={step.number}
              className="grid gap-x-8 gap-y-6 px-8 py-10 lg:grid-cols-[3rem_1fr_14rem] lg:gap-x-12 lg:px-10"
            >
              {/* Step number */}
              <div className="flex items-start pt-0.5">
                <span
                  className="font-medium tabular-nums text-secondary"
                  style={{
                    fontSize: "clamp(1.5rem, 3vw, 2rem)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                  aria-hidden
                >
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <div>
                <h3
                  className="mb-3 font-bold text-lg text-foreground sm:text-xl"
                  style={{ letterSpacing: "-0.015em" }}
                >
                  {step.title}
                </h3>
                <p className="font-light leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>

              {/* Outcome — right column, desktop only layout */}
              <div className="border-border pt-1 lg:border-l lg:pl-8">
                <p
                  className="mb-2 text-[10px] font-medium uppercase tracking-widest text-secondary"
                >
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

      {/* ── What to prepare ──────────────────────────────────────────────────── */}
      <Section variant="surface" className="border-t border-border">

        {/* Horizontal split intro */}
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
              Before You Reach Out
            </p>
            <h2
              className="font-bold text-3xl text-foreground sm:text-4xl"
              style={{ letterSpacing: "-0.025em" }}
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

        {/* Prep items — gap-as-border grid */}
        <div className="grid gap-px border-x border-b border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {prepItems.map((item) => (
            <div
              key={item}
              className="flex items-start gap-4 bg-surface px-8 py-6"
            >
              <span className="mt-2 h-px w-4 shrink-0 bg-secondary/60" aria-hidden />
              <p className="text-sm font-light leading-relaxed text-muted">
                {item}
              </p>
            </div>
          ))}
        </div>

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
