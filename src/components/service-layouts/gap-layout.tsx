import Link from "next/link";
import { Button } from "@/components/shared/button";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { getRelatedServices } from "@/content/services";
import type { Service } from "@/content/services";

interface Props {
  service: Service;
}

// ── Warning triangle SVG ──────────────────────────────────────────────────────

function WarningTriangle({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      width="20"
      height="20"
      aria-hidden
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10 2.5 L18.5 17.5 H1.5 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <line x1="10" y1="9" x2="10" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="15.5" r="0.75" fill="currentColor" />
    </svg>
  );
}

// ── Findings categories ───────────────────────────────────────────────────────

const FINDINGS_CATEGORIES = [
  {
    label: "Setback Violations",
    phrase: "Non-conforming existing conditions that require legal determination",
  },
  {
    label: "Egress Non-Conformity",
    phrase: "Window dimensions, travel distances, or corridor widths below current code",
  },
  {
    label: "Unpermitted Conditions",
    phrase: "Habitable or structural work absent from permit records",
  },
  {
    label: "Energy Code Gaps",
    phrase: "Systems and envelope components outside Title 24 compliance thresholds",
  },
] as const;

const TRIGGER_SCENARIOS = [
  "Renovation adding more than 50% of building value",
  "Change of occupancy classification",
  "Second story addition on an older home",
  "Commercial tenant improvement over existing shell",
  "Conversion from garage to habitable space",
] as const;

export function GapLayout({ service }: Props) {
  const related = getRelatedServices(service);
  const steps = service.steps ?? [];

  return (
    <>
      {/* ── Section 1: Audit header + findings preview ───────────────────────── */}
      <Section variant="surface" className="border-b border-border !py-0 overflow-hidden">
        {/* Dark charcoal header strip */}
        <div className="-mx-6 bg-primary px-6 py-14">
          <div className="container mx-auto max-w-container">
            <h2
              className="font-extrabold text-primary-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4.5vw, 3rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Before the plan checker finds it.
            </h2>
            <p className="mt-4 max-w-xl text-sm font-light text-white/60 leading-relaxed">
              {service.overview}
            </p>
          </div>
        </div>

        {/* Findings preview strip — 4 category boxes */}
        <div className="-mx-6 grid grid-cols-1 gap-px bg-border border-x border-b border-border sm:grid-cols-2 lg:grid-cols-4">
          {FINDINGS_CATEGORIES.map((cat) => (
            <div
              key={cat.label}
              className="bg-background px-7 py-7 flex flex-col gap-3"
            >
              <WarningTriangle className="text-secondary" />
              <h3 className="text-[11px] font-medium uppercase tracking-widest text-foreground">
                {cat.label}
              </h3>
              <p className="text-xs font-light leading-relaxed text-muted">
                {cat.phrase}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Section 2: What triggers a gap analysis ──────────────────────────── */}
      <Section variant="default" className="border-t border-border">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: eyebrow + heading + why it matters */}
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              What Triggers a Gap Analysis
            </p>
            <h2
              className="mb-6 font-bold text-foreground"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                letterSpacing: "-0.025em",
                lineHeight: 1.2,
              }}
            >
              Know your exposure before you apply.
            </h2>
            <p className="font-light leading-relaxed text-muted" style={{ lineHeight: 1.8 }}>
              {service.whyItMatters}
            </p>
          </div>

          {/* Right: bordered trigger scenarios */}
          <div className="border border-border">
            <div className="border-b border-border px-7 py-5">
              <p className="text-[11px] font-medium uppercase tracking-widest text-foreground">
                Trigger Scenarios
              </p>
            </div>
            <ul className="divide-y divide-border">
              {TRIGGER_SCENARIOS.map((scenario) => (
                <li
                  key={scenario}
                  className="flex items-start gap-4 px-7 py-5"
                >
                  <span
                    className="mt-2 h-2 w-2 shrink-0 rounded-full bg-secondary"
                    aria-hidden
                  />
                  <p className="text-sm font-light leading-relaxed text-muted">
                    {scenario}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── Section 3: The analysis process ─────────────────────────────────── */}
      {steps.length > 0 && (
        <Section variant="surface" className="border-t border-border">
          {/* Split intro */}
          <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
                The Analysis Process
              </p>
              <h2
                className="font-bold text-foreground"
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.15,
                }}
              >
                A structured review in every case.
              </h2>
            </div>
            <p className="font-light leading-relaxed text-muted lg:text-base" style={{ lineHeight: 1.8 }}>
              Each gap analysis follows a documented methodology: document intake, applicable code
              research, condition-by-condition comparison, and a written findings report with
              clear remediation notes.
            </p>
          </div>

          {/* Numbered step rows */}
          <div className="border-t border-border">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="grid grid-cols-[2.5rem_1fr] gap-8 border-b border-border py-8 sm:grid-cols-[3.5rem_13rem_1fr] sm:gap-10"
              >
                <span
                  className="text-[11px] font-medium tabular-nums text-secondary self-start pt-0.5"
                  style={{ letterSpacing: "0.06em" }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className="self-start font-semibold text-foreground"
                  style={{ fontSize: "0.95rem", letterSpacing: "-0.01em" }}
                >
                  {step.title}
                </h3>
                <p className="col-start-2 text-sm font-light leading-relaxed text-muted sm:col-start-3">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ── Section 4: The cost of finding gaps late ─────────────────────────── */}
      <Section variant="dark" className="border-t border-border">
        <div className="mb-12">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            The Cost of Finding Gaps Late
          </p>
          <h2
            className="font-bold text-primary-foreground"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              letterSpacing: "-0.025em",
              lineHeight: 1.2,
            }}
          >
            Plan check corrections cost more than gap analysis does.
          </h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-[5fr_4fr] lg:gap-16">
          {/* Left: editorial paragraph */}
          <p
            className="font-light text-white/70 leading-relaxed"
            style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)", lineHeight: 1.85 }}
          >
            When non-conforming conditions surface during plan check, the correction cycle begins:
            the applicant receives a redlined set, consultants revise drawings, updated documentation
            is resubmitted, and the queue resets. Each round adds weeks and design fees. A proactive
            gap analysis conducted before permit application costs a fraction of a single correction
            round and produces information the entire project team can act on before commitments are made.
          </p>

          {/* Right: two-box comparison */}
          <div className="grid gap-px bg-white/10 border border-white/10 sm:grid-cols-2">
            {/* Plan check stage */}
            <div className="bg-white/5 px-6 py-7">
              <p className="mb-4 text-[10px] font-medium uppercase tracking-widest text-secondary">
                At Plan Check Stage
              </p>
              <ul className="space-y-4">
                {[
                  "Corrections issued, timeline resets",
                  "Consultant revisions billed at full rate",
                  "Owner often unaware until fees accumulate",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm font-light text-white/70">
                    <span className="mt-1.5 h-1 w-4 shrink-0 bg-white/20" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pre-design stage */}
            <div className="bg-white/5 px-6 py-7 border-t sm:border-t-0 sm:border-l border-white/10">
              <p className="mb-4 text-[10px] font-medium uppercase tracking-widest text-secondary">
                At Pre-Design Stage
              </p>
              <ul className="space-y-4">
                {[
                  "Gaps identified before design is locked",
                  "Remediation scoped into the project budget",
                  "Permit strategy informed from the start",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm font-light text-white/70">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Section 5: Deliverables as horizontal rule rows ──────────────────── */}
      <Section variant="default" className="border-t border-border">
        <div className="mb-14">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            Deliverables
          </p>
          <h2
            className="font-bold text-foreground"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              letterSpacing: "-0.03em",
            }}
          >
            What the report contains.
          </h2>
        </div>

        <div className="border-t border-border">
          {service.includes.map((item, i) => (
            <div
              key={item.title}
              className="flex gap-8 border-b border-border py-6"
            >
              <span
                className="w-8 shrink-0 text-[11px] font-medium tabular-nums text-secondary"
                style={{ letterSpacing: "0.06em" }}
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:gap-8">
                <h3 className="w-full shrink-0 text-sm font-semibold uppercase tracking-wider text-foreground sm:w-56">
                  {item.title}
                </h3>
                <p className="text-sm font-light leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Section 6: Audience ──────────────────────────────────────────────── */}
      <Section variant="surface" className="border-t border-border">
        <div className="mb-14">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            Who This Is For
          </p>
          <h2
            className="font-bold text-foreground"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              letterSpacing: "-0.03em",
            }}
          >
            Ordered by these clients.
          </h2>
        </div>

        <div className="-mx-6 grid gap-px bg-border border-x border-t border-border sm:grid-cols-2">
          {service.audience.map((item) => (
            <div key={item.title} className="flex flex-col gap-3 bg-surface px-8 py-8">
              <div className="flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                  {item.title}
                </h3>
              </div>
              <p className="pl-4 text-sm font-light leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Related services ─────────────────────────────────────────────────── */}
      {related.length > 0 && (
        <Section variant="default" className="border-t border-border">
          <div className="mb-12 flex items-end justify-between gap-8">
            <div>
              <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
                Continue Exploring
              </p>
              <h2
                className="font-bold text-foreground"
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  letterSpacing: "-0.025em",
                }}
              >
                Related services.
              </h2>
            </div>
            <Link
              href="/services"
              className="hidden shrink-0 text-[11px] font-medium uppercase tracking-wider text-secondary transition-colors duration-200 hover:text-foreground lg:block"
            >
              All Services →
            </Link>
          </div>

          <ul className="divide-y divide-border border border-border" role="list">
            {related.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex cursor-pointer items-center gap-6 px-7 py-7 transition-colors duration-200 hover:bg-surface lg:px-9"
                >
                  <span className="min-w-[5rem] text-[10px] font-medium uppercase tracking-widest text-muted">
                    {s.category}
                  </span>
                  <div className="flex-1">
                    <p
                      className="text-base font-bold text-foreground transition-colors duration-200 group-hover:text-secondary"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      {s.title}
                    </p>
                    <p className="mt-1 text-sm font-light text-muted">{s.tagline}</p>
                  </div>
                  <span
                    className="shrink-0 text-secondary transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <CtaBand
        heading="Find the gaps before the plan checker does."
        subheading="Provide the existing building documentation and proposed scope. We return a written gap analysis report in 3 to 5 business days."
        primaryAction={{ label: "Request a Gap Analysis", href: "/contact" }}
        secondaryAction={{ label: "View All Services", href: "/services" }}
        variant="dark"
      />
    </>
  );
}
