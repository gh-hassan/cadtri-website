import Link from "next/link";
import { Button } from "@/components/shared/button";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { getRelatedServices } from "@/content/services";
import type { Service } from "@/content/services";

interface Props {
  service: Service;
}

const riskSignals = [
  {
    category: "Zoning Exposure",
    phrase: "Is the intended use permitted by right?",
  },
  {
    category: "Permit History",
    phrase: "Are there open permits or unpermitted work on record?",
  },
  {
    category: "Development Constraints",
    phrase: "Do setbacks, FAR, or easements limit the scope?",
  },
];

const dealKillers = [
  {
    number: "01",
    scenario:
      "Zoning does not allow the intended use. The buyer closes, then discovers a variance is required or the use is prohibited outright.",
  },
  {
    number: "02",
    scenario:
      "A prior addition was built without permits. The city requires full documentation or partial demolition before any new permit will be issued.",
  },
  {
    number: "03",
    scenario:
      "Setback violations prevent the planned expansion. The footprint cannot grow in the direction the project required.",
  },
  {
    number: "04",
    scenario:
      "Discretionary review is triggered. What looked like a 90-day permit process becomes a six-month public hearing timeline.",
  },
  {
    number: "05",
    scenario:
      "Variances were not in the budget. The project proceeds on incorrect assumptions and carries costs that were never modeled.",
  },
];

function PropertySvg() {
  return (
    <svg
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[200px] text-border"
      aria-hidden
    >
      {/* House body */}
      <rect
        x="20"
        y="68"
        width="76"
        height="56"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Roof */}
      <polyline
        points="12,70 58,30 104,70"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Window */}
      <rect
        x="32"
        y="80"
        width="20"
        height="16"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      {/* Door */}
      <rect
        x="62"
        y="100"
        width="20"
        height="24"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      {/* Magnifying glass circle */}
      <circle
        cx="104"
        cy="104"
        r="22"
        stroke="#FF6D1F"
        strokeWidth="2"
        strokeDasharray="0"
      />
      {/* Magnifying glass handle */}
      <line
        x1="120"
        y1="120"
        x2="133"
        y2="133"
        stroke="#FF6D1F"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Crosshairs inside lens */}
      <line
        x1="104"
        y1="88"
        x2="104"
        y2="120"
        stroke="#FF6D1F"
        strokeWidth="1"
        strokeOpacity="0.4"
        strokeLinecap="round"
      />
      <line
        x1="88"
        y1="104"
        x2="120"
        y2="104"
        stroke="#FF6D1F"
        strokeWidth="1"
        strokeOpacity="0.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function AssessmentLayout({ service }: Props) {
  const related = getRelatedServices(service);
  const steps = service.steps ?? [];

  return (
    <>
      {/* ── Hero: Asymmetric Two-Column ───────────────────────────────────── */}
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
                Order the Assessment
              </Button>
              <Button href="/services" variant="ghost" size="lg">
                View All Services
              </Button>
            </div>
          </div>

          {/* Right: property + magnifying glass illustration */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="flex h-56 w-56 items-center justify-center border border-border bg-surface lg:h-64 lg:w-64">
              <PropertySvg />
            </div>
          </div>
        </div>

        {/* Risk signal strip */}
        <div className="mt-16 grid border border-border sm:grid-cols-3">
          {riskSignals.map((signal, i) => (
            <div
              key={signal.category}
              className={`px-8 py-7 ${i < riskSignals.length - 1 ? "border-b border-border sm:border-b-0 sm:border-r" : ""}`}
            >
              <p className="mb-2 text-[10px] font-medium uppercase tracking-widest text-secondary">
                {signal.category}
              </p>
              <p className="text-sm font-light leading-relaxed text-muted">
                {signal.phrase}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Deal Killers: Full-Width Editorial ───────────────────────────── */}
      <Section variant="dark" className="border-t border-border">
        <div className="grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-20">
          {/* Left: heading */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="mb-6 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              What buyers discover too late
            </p>
            <h2
              className="font-extrabold text-primary-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
              }}
            >
              The surprises that kill deals.
            </h2>
            <p className="mt-6 text-sm font-light leading-relaxed text-white/50">
              Each of these scenarios is preventable. None of them show up in a
              standard inspection report.
            </p>
          </div>

          {/* Right: numbered scenarios */}
          <div className="divide-y divide-white/10">
            {dealKillers.map((item) => (
              <div key={item.number} className="flex gap-8 py-8">
                <span
                  className="w-8 shrink-0 font-medium tabular-nums text-secondary"
                  style={{ fontSize: "clamp(0.85rem, 1.5vw, 1rem)", letterSpacing: "0.04em" }}
                  aria-hidden
                >
                  {item.number}
                </span>
                <p className="text-sm font-light leading-relaxed text-white/75">
                  {item.scenario}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Assessment Process ───────────────────────────────────────────── */}
      {steps.length > 0 && (
        <Section variant="surface" className="border-t border-border">
          {/* Split intro */}
          <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
                The Assessment Process
              </p>
              <h2
                className="font-bold text-foreground"
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.15,
                }}
              >
                Five areas.
                <br />
                One written report.
              </h2>
            </div>
            <p className="font-light leading-relaxed text-muted lg:text-lg">
              The assessment works through a defined sequence. Every area is
              documented in writing and delivered as a single report before your
              inspection contingency expires.
            </p>
          </div>

          {/* Steps as numbered rows */}
          <div className="border-t border-border">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="grid items-start gap-6 border-b border-border py-8 sm:grid-cols-[5rem_1fr_2fr] sm:gap-0"
              >
                <span
                  className="font-bold tabular-nums text-secondary"
                  style={{
                    fontSize: "clamp(1.5rem, 3vw, 2rem)",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                  }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className="font-semibold text-foreground sm:pr-8"
                  style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)", letterSpacing: "-0.01em" }}
                >
                  {step.title}
                </h3>
                <p className="text-sm font-light leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ── Deliverables: Gap-as-Border Grid ─────────────────────────────── */}
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

        <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
          {service.includes.map((item, i) => (
            <div key={item.title} className="flex flex-col gap-3 bg-background px-8 py-8">
              <span
                className="text-[11px] font-medium tabular-nums text-secondary"
                style={{ letterSpacing: "0.06em" }}
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3
                className="font-semibold text-foreground"
                style={{ letterSpacing: "-0.01em" }}
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

      {/* ── Who It's For ──────────────────────────────────────────────────── */}
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
            Before you close, not after.
          </h2>
        </div>

        <div className="divide-y divide-border border border-border">
          {service.audience.map((item, i) => (
            <div
              key={item.title}
              className="flex gap-8 px-8 py-7"
            >
              <span
                className="w-8 shrink-0 text-[11px] font-medium tabular-nums text-secondary"
                style={{ letterSpacing: "0.06em" }}
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:gap-12">
                <h3 className="w-full shrink-0 text-sm font-semibold uppercase tracking-wider text-foreground sm:w-52">
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
        heading="Order a pre-purchase assessment."
        subheading="Provide the property address and your intended project scope. We deliver the written report before your inspection contingency expires."
        primaryAction={{ label: "Order the Assessment", href: "/contact" }}
        secondaryAction={{ label: "View All Services", href: "/services" }}
        variant="dark"
      />
    </>
  );
}
