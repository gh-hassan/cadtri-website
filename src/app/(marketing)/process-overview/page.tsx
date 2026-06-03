import type { Metadata } from "next";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { company } from "@/content/company";

export const metadata: Metadata = {
  title: { absolute: "How We Work | CADTRI Drafting & Permit Services" },
  description:
    "CADTRI project process from intake to permit issuance. Eight stages, one point of contact, and a first-pass approval focus on every project.",
  robots: { index: false },
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const stages = [
  {
    step: "01",
    title: "Project Intake and Scoping",
    what: "You submit your project information through our proposal request form or contact us directly. We gather the essential details: project address, project type, scope of work, applicable building department, and any existing drawings.",
    we: "We review the scope, confirm the deliverable list, and identify any project-specific considerations that affect production. Ambiguities in scope are resolved before quoting.",
    receive: "A written proposal confirming scope, deliverables, timeline, and fee. No work begins until the proposal is accepted.",
  },
  {
    step: "02",
    title: "Jurisdiction Research",
    what: "Before any drafting begins, we research the specific requirements of the building department that will be reviewing your permit application.",
    we: "We confirm the applicable code edition, review the building department's plan check checklist, identify local amendments and special requirements, confirm setback and zoning requirements, and flag any jurisdiction-specific documentation requirements.",
    receive: "A jurisdiction summary included in your project file, used to guide production and available for your reference.",
  },
  {
    step: "03",
    title: "Production",
    what: "Our drafting team produces the drawing set to the specifications confirmed at intake and informed by jurisdiction research.",
    we: "We produce site plans, floor plans, exterior elevations, building sections, roof plans, foundation plans, schedules, general notes, and code compliance notes. Energy compliance documentation, structural coordination, and specialty sheets are included as required by scope.",
    receive: "A fully coordinated drawing set produced to permit-submission scale, annotated to the level required for plan check, and cross-referenced across all sheets.",
  },
  {
    step: "04",
    title: "Internal Review",
    what: "Before any set is delivered to you, it goes through an internal review against the jurisdiction checklist and scope requirements confirmed at intake.",
    we: "We verify all required sheets are present and complete, dimensions are consistent across all plan views, code notes match the applicable code edition, setback and zoning requirements are correctly reflected, and coordination conflicts are resolved.",
    receive: "A reviewed and cleared drawing set. Issues identified during this stage are resolved before delivery at no additional cost.",
  },
  {
    step: "05",
    title: "Client Review and Delivery",
    what: "The completed drawing set is delivered to you in PDF format along with any supporting documentation.",
    we: "We deliver the set, answer questions, and resolve any discrepancies between the drawings and your project knowledge. Minor revisions within the original scope are included.",
    receive: "Permit-ready PDF set formatted for submission. CAD or Revit source files available upon request.",
  },
  {
    step: "06",
    title: "Submission Support",
    what: "You submit the permit application to the building department. CADTRI provides any supporting documentation required at the submission window.",
    we: "We prepare the permit application project description if needed, respond to building department questions about the drawing set during intake review, and provide additional exhibits requested at submission.",
    receive: "Any supplemental documentation required for the submission package.",
  },
  {
    step: "07",
    title: "Plan Check Response",
    what: "If the building department issues a plan check correction letter, the engagement continues. This stage is included in all standard CADTRI engagements.",
    we: "We review the correction letter in full, identify which corrections require drawing revisions versus written responses, revise affected sheets, prepare a point-by-point written response to each item, and prepare the resubmittal package.",
    receive: "Revised drawing set and written response document, formatted for resubmittal.",
  },
  {
    step: "08",
    title: "Permit Issuance",
    what: "The building department approves the drawing set and issues the building permit. The engagement is complete.",
    we: "We confirm permit issuance with you and close the project file. If stamped or wet-signed documents are required by the jurisdiction post-approval, we coordinate their preparation and delivery.",
    receive: "Permit issued. Project closed. All project files retained for 12 months for reference and resubmittal purposes.",
  },
] as const;

const intakeRequirements = [
  "Project address (full address including city, state, and zip code)",
  "Scope of work description (what is being built, added, or changed)",
  "Existing drawings, surveys, or site plans (if available)",
  "Prior plan check correspondence or correction letters (if applicable)",
  "Owner and contractor contact information",
  "Preferred delivery format and any project-specific drawing standards",
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProcessOverviewPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <Section variant="dark" className="pt-24 pb-20">
        <div className="max-w-3xl">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
            Process Overview
          </p>
          <h1
            className="font-extrabold text-primary-foreground"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.06,
            }}
          >
            How we work, from intake to permit.
          </h1>
          <p className="mt-6 text-lg font-light leading-relaxed text-white/60 max-w-2xl">
            Every CADTRI engagement follows the same eight-stage process. One point of contact, jurisdiction research before drafting begins, and a first-pass approval focus on every project.
          </p>
          <div className="mt-8 flex flex-wrap gap-8 border-t border-white/10 pt-8">
            {[
              { label: "Phone", value: company.phone },
              { label: "Email", value: company.email },
              { label: "Website", value: "www.cadtri.com" },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-[10px] font-medium uppercase tracking-widest text-white/30">{item.label}</p>
                <p className="mt-1 text-sm font-light text-primary-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Stages ───────────────────────────────────────────────────────────── */}
      <Section variant="default" className="border-t border-border">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              The Process
            </p>
            <h2
              className="font-bold text-foreground"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.03em", lineHeight: 1.1 }}
            >
              Eight stages. One outcome.
            </h2>
          </div>
          <p className="font-light leading-relaxed text-muted lg:self-end">
            The process is designed around one outcome: a permit-ready drawing set that passes plan check on the first submission. Every stage serves that goal.
          </p>
        </div>

        <div className="flex flex-col divide-y divide-border border-y border-border">
          {stages.map((stage) => (
            <div
              key={stage.step}
              className="grid gap-8 py-12 lg:grid-cols-[80px_1fr_1fr] lg:gap-12"
            >
              {/* Step number + title */}
              <div className="lg:pt-1">
                <span
                  className="text-[11px] font-medium tabular-nums text-secondary"
                  style={{ letterSpacing: "0.05em" }}
                >
                  Stage {stage.step}
                </span>
                <p
                  className="mt-2 font-bold text-foreground"
                  style={{ fontSize: "clamp(1rem, 1.25vw, 1.1rem)", letterSpacing: "-0.02em", lineHeight: 1.3 }}
                >
                  {stage.title}
                </p>
              </div>

              {/* What happens + what we do */}
              <div className="flex flex-col gap-5">
                <div>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-secondary">
                    What happens
                  </p>
                  <p className="text-sm font-light leading-relaxed text-muted">{stage.what}</p>
                </div>
                <div>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-secondary">
                    What we do
                  </p>
                  <p className="text-sm font-light leading-relaxed text-muted">{stage.we}</p>
                </div>
              </div>

              {/* What you receive */}
              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-secondary">
                  What you receive
                </p>
                <p className="text-sm font-light leading-relaxed text-muted">{stage.receive}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Communications ───────────────────────────────────────────────────── */}
      <Section variant="dark" className="border-t border-white/10">
        <div className="mb-14 grid items-end gap-8 border-b border-white/10 pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Communication Standards
            </p>
            <h2
              className="font-bold text-primary-foreground"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.03em", lineHeight: 1.1 }}
            >
              You always know where your project stands.
            </h2>
          </div>
          <p className="font-light leading-relaxed text-white/55 lg:self-end">
            One dedicated project manager per engagement. No handoffs, no chasing updates across departments.
          </p>
        </div>

        <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Project Manager", body: "Every project is assigned a dedicated point of contact who manages production, coordinates with external parties, and communicates status directly to you." },
            { label: "Status Updates", body: "You receive a status update when production begins, when the set enters internal review, and when delivery is imminent. Timeline changes are communicated immediately." },
            { label: "Response Time", body: "All client communications are responded to within one business day. Urgent items are flagged and handled same-day." },
            { label: "File Retention", body: "All deliverables are retained in our system for twelve months post-delivery for reference, resubmittal, and record purposes." },
          ].map((item) => (
            <div key={item.label} className="bg-primary px-7 py-8">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-secondary">
                {item.label}
              </p>
              <p className="text-sm font-light leading-relaxed text-white/55">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Intake requirements ──────────────────────────────────────────────── */}
      <Section variant="default" className="border-t border-border">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              What We Need from You
            </p>
            <h2
              className="font-bold text-foreground"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.03em", lineHeight: 1.1 }}
            >
              Everything needed to start without delays.
            </h2>
            <p className="mt-5 font-light leading-relaxed text-muted">
              Projects with incomplete intake packages are placed on hold until missing materials are received. We flag missing items at intake so you know exactly what is needed before the clock starts.
            </p>
          </div>
          <ul
            role="list"
            className="flex flex-col divide-y divide-border border-y border-border self-start"
          >
            {intakeRequirements.map((item, i) => (
              <li key={item} className="flex items-start gap-4 py-4">
                <span
                  className="shrink-0 text-[11px] font-medium tabular-nums text-secondary mt-0.5"
                  style={{ letterSpacing: "0.05em" }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm font-light leading-relaxed text-muted">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CtaBand
        heading="Ready to get started?"
        subheading="Submit your project scope and we will respond with a written proposal within one to two business days."
        primaryAction={{ label: "Request a Proposal", href: "/contact" }}
        secondaryAction={{ label: "View Capability Statement", href: "/capability-statement" }}
        variant="dark"
      />
    </>
  );
}
