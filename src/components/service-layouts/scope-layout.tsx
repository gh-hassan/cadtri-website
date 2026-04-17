import Link from "next/link";
import { Button } from "@/components/shared/button";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { getRelatedServices } from "@/content/services";
import type { Service } from "@/content/services";

interface Props {
  service: Service;
}

const withoutScope = [
  {
    label: "Scope Creep",
    sentence:
      "Contractors quote what they think you mean. The project expands mid-build.",
  },
  {
    label: "Wrong Consultant Order",
    sentence:
      "Structural engineering gets commissioned before zoning is confirmed. Work gets redone.",
  },
  {
    label: "Budget Overruns",
    sentence:
      "Costs are modeled against an undefined scope. The real number arrives too late.",
  },
];

const whatGetsDefined = [
  "Full drawing list with sheet types and quantities",
  "Consultant sequence and engagement timing",
  "Permit pathway and expected review timeline",
  "Jurisdiction-specific submission requirements",
  "Project phasing and critical decision points",
];

function DocumentStackSvg() {
  return (
    <svg
      viewBox="0 0 130 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[180px] text-border"
      aria-hidden
    >
      {/* Page 3 (back) */}
      <rect
        x="28"
        y="22"
        width="78"
        height="100"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeOpacity="0.4"
      />
      {/* Page 3 header bar */}
      <rect x="28" y="22" width="78" height="10" fill="#FF6D1F" fillOpacity="0.2" />

      {/* Page 2 (middle) */}
      <rect
        x="18"
        y="14"
        width="78"
        height="100"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeOpacity="0.6"
      />
      {/* Page 2 header bar */}
      <rect x="18" y="14" width="78" height="10" fill="#FF6D1F" fillOpacity="0.35" />
      {/* Page 2 text lines */}
      <line x1="28" y1="36" x2="86" y2="36" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" strokeLinecap="round" />
      <line x1="28" y1="44" x2="80" y2="44" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" strokeLinecap="round" />
      <line x1="28" y1="52" x2="84" y2="52" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" strokeLinecap="round" />

      {/* Page 1 (front) */}
      <rect
        x="8"
        y="6"
        width="78"
        height="100"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Page 1 header bar (orange) */}
      <rect x="8" y="6" width="78" height="12" fill="#FF6D1F" fillOpacity="0.65" rx="1" />
      {/* Page 1 text lines */}
      <line x1="18" y1="30" x2="76" y2="30" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="18" y1="40" x2="70" y2="40" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="18" y1="50" x2="76" y2="50" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="18" y1="60" x2="64" y2="60" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="18" y1="70" x2="72" y2="70" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      {/* Divider */}
      <line x1="18" y1="82" x2="76" y2="82" stroke="currentColor" strokeWidth="1" strokeOpacity="0.35" strokeLinecap="round" />
      <line x1="18" y1="92" x2="68" y2="92" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="18" y1="100" x2="76" y2="100" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

export function ScopeLayout({ service }: Props) {
  const related = getRelatedServices(service);
  const steps = service.steps ?? [];

  return (
    <>
      {/* ── Hero: Two-Column with Document SVG ───────────────────────────── */}
      <Section variant="default">
        <div className="grid items-center gap-16 lg:grid-cols-[3fr_2fr] lg:gap-24">
          {/* Left: eyebrow + overview + CTAs */}
          <div>
            <p className="mb-6 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Strategy
            </p>
            <h1
              className="mb-6 font-extrabold text-foreground"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                letterSpacing: "-0.04em",
                lineHeight: 1.05,
              }}
            >
              {service.title}
            </h1>
            <p
              className="mb-10 font-light leading-relaxed text-muted"
              style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", lineHeight: 1.75 }}
            >
              {service.overview}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button href="/contact" variant="primary" size="lg">
                Request a Scope Document
              </Button>
              <Button href="/services" variant="ghost" size="lg">
                View All Services
              </Button>
            </div>
          </div>

          {/* Right: stacked document illustration */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="flex h-56 w-56 items-center justify-center border border-border bg-surface lg:h-64 lg:w-64">
              <DocumentStackSvg />
            </div>
          </div>
        </div>
      </Section>

      {/* ── Without a Scope Document: Inset Dark Box ─────────────────────── */}
      <Section variant="surface" className="border-t border-border">
        <div className="mb-10">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            Without a scope document
          </p>
          <h2
            className="font-bold text-foreground"
            style={{
              fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.2,
            }}
          >
            Three problems that follow every undefined project.
          </h2>
        </div>

        {/* Inset dark charcoal box */}
        <div className="bg-primary px-8 py-10 sm:px-12">
          <div className="grid gap-px bg-white/10 sm:grid-cols-3">
            {withoutScope.map((item, i) => (
              <div
                key={item.label}
                className="bg-primary px-8 py-8"
              >
                <span
                  className="mb-4 block text-[11px] font-medium tabular-nums text-secondary"
                  style={{ letterSpacing: "0.06em" }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-primary-foreground">
                  {item.label}
                </h3>
                <p className="text-sm font-light leading-relaxed text-white/60">
                  {item.sentence}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── The Six Phases ───────────────────────────────────────────────── */}
      {steps.length > 0 && (
        <Section variant="surface" className="border-t border-border">
          {/* Split intro */}
          <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
                The Six Phases
              </p>
              <h2
                className="font-bold text-foreground"
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.15,
                }}
              >
                Systematic.
                <br />
                Nothing skipped.
              </h2>
            </div>
            <p className="font-light leading-relaxed text-muted lg:text-lg">
              Each phase produces a discrete output. The complete document integrates
              all six into a single project brief your entire team can work from.
            </p>
          </div>

          {/* Steps with connecting left-border thread */}
          <div className="relative">
            {/* Connecting dotted line */}
            <div
              className="absolute left-[2.35rem] top-0 hidden h-full border-l-2 border-dashed border-border sm:block"
              aria-hidden
            />

            <div className="space-y-0">
              {steps.map((step, i) => (
                <div
                  key={step.title}
                  className="relative grid items-start gap-6 border-b border-border py-8 sm:grid-cols-[5rem_1fr_2fr] sm:gap-0"
                >
                  {/* Number node on the dotted line */}
                  <div className="relative flex items-center sm:justify-center">
                    <span
                      className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center border border-border bg-background text-[11px] font-bold tabular-nums text-secondary"
                      style={{ letterSpacing: "0.04em" }}
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Phase title */}
                  <h3
                    className="font-semibold text-foreground sm:pr-10 sm:pt-1"
                    style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)", letterSpacing: "-0.01em" }}
                  >
                    {step.title}
                  </h3>

                  {/* Phase description */}
                  <p className="text-sm font-light leading-relaxed text-muted sm:pt-1">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* ── Deliverables: Definition List Style ──────────────────────────── */}
      <Section variant="default" className="border-t border-border">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Deliverables
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
              }}
            >
              The document you receive.
            </h2>
          </div>
          <p className="font-light leading-relaxed text-muted lg:text-lg">
            Every scope document covers the same components. Delivered in writing,
            structured for immediate use by your design team and contractors.
          </p>
        </div>

        {/* Definition list rows */}
        <div className="border-t border-border">
          {service.includes.map((item) => (
            <div
              key={item.title}
              className="grid gap-3 border-b border-border py-6 sm:grid-cols-[1fr_2fr] sm:gap-10"
            >
              <h3 className="text-[11px] font-medium uppercase tracking-widest text-foreground">
                {item.title}
              </h3>
              <p className="text-sm font-light leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Why It Matters: Dark Editorial ───────────────────────────────── */}
      <Section variant="dark" className="border-t border-border">
        <div className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:gap-20">
          {/* Left: eyebrow + large paragraph */}
          <div>
            <p className="mb-6 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Why This Matters
            </p>
            <p
              className="font-light text-primary-foreground leading-relaxed"
              style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.35rem)", lineHeight: 1.75 }}
            >
              {service.whyItMatters}
            </p>
          </div>

          {/* Right: what gets defined panel */}
          <div className="flex flex-col justify-center gap-6 border border-white/10 bg-white/5 px-8 py-8">
            <p className="text-[11px] font-medium uppercase tracking-widest text-secondary">
              What gets defined
            </p>
            <ul className="space-y-4">
              {whatGetsDefined.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm font-light text-white/80"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── Audience: Gap-as-Border Grid ─────────────────────────────────── */}
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
            Built for clients who plan before they build.
          </h2>
        </div>

        <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
          {service.audience.map((item) => (
            <div key={item.title} className="flex flex-col gap-3 bg-surface px-8 py-8">
              <div className="flex items-center gap-2">
                <span
                  className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-secondary"
                  aria-hidden
                />
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

      {/* ── Related Services ─────────────────────────────────────────────── */}
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
        heading="Define your project before you design it."
        subheading="Tell us your goals and site details. We return a complete scope document with your drawing list, consultant sequence, and timeline in 5 to 7 business days."
        primaryAction={{ label: "Request a Scope Document", href: "/contact" }}
        secondaryAction={{ label: "View All Services", href: "/services" }}
        variant="dark"
      />
    </>
  );
}
