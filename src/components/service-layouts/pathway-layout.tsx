import Link from "next/link";
import { Button } from "@/components/shared/button";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { getRelatedServices } from "@/content/services";
import type { Service } from "@/content/services";

interface Props {
  service: Service;
}

// Stage labels for the flow diagram
const DEFAULT_STAGES = [
  "Scope Review",
  "Agency Mapping",
  "Consultant List",
  "Timeline Build",
  "Report Delivery",
];

// Inline SVG: horizontal flow diagram — 5 circles connected by arrows
function PermitFlowSvg({ stages }: { stages: string[] }) {
  const totalWidth = 540;
  const viewHeight = 80;
  const nodeCount = stages.length;
  // Distribute nodes evenly
  const nodeRadius = 18;
  const horizontalPadding = 54;
  const availableWidth = totalWidth - horizontalPadding * 2;
  const spacing = availableWidth / (nodeCount - 1);

  return (
    <svg
      viewBox={`0 0 ${totalWidth} ${viewHeight}`}
      width="100%"
      style={{ maxWidth: totalWidth }}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Connecting lines between nodes */}
      {stages.slice(0, -1).map((_, i) => {
        const x1 = horizontalPadding + i * spacing + nodeRadius;
        const x2 = horizontalPadding + (i + 1) * spacing - nodeRadius;
        const y = 26;
        const arrowX = x2 - 5;
        return (
          <g key={`line-${i}`}>
            <line
              x1={x1}
              y1={y}
              x2={arrowX}
              y2={y}
              stroke="#E2D4B8"
              strokeWidth={1.5}
            />
            {/* Arrowhead */}
            <polyline
              points={`${arrowX - 5},${y - 4} ${arrowX},${y} ${arrowX - 5},${y + 4}`}
              fill="none"
              stroke="#E2D4B8"
              strokeWidth={1.5}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </g>
        );
      })}

      {/* Node circles and labels */}
      {stages.map((label, i) => {
        const cx = horizontalPadding + i * spacing;
        const cy = 26;
        const isFirst = i === 0;
        return (
          <g key={label}>
            {/* Circle */}
            <circle
              cx={cx}
              cy={cy}
              r={nodeRadius}
              fill={isFirst ? "#FF6D1F" : "none"}
              stroke={isFirst ? "#FF6D1F" : "#E2D4B8"}
              strokeWidth={1.5}
            />
            {/* Node index number inside */}
            <text
              x={cx}
              y={cy + 4}
              textAnchor="middle"
              fontSize="10"
              fontFamily="inherit"
              fontWeight={isFirst ? "700" : "500"}
              fill={isFirst ? "#FAF3E1" : "#7A6E5F"}
              letterSpacing="0.04em"
            >
              {String(i + 1).padStart(2, "0")}
            </text>
            {/* Label below */}
            <text
              x={cx}
              y={cy + nodeRadius + 16}
              textAnchor="middle"
              fontSize="8.5"
              fontFamily="inherit"
              fontWeight="500"
              fill="#7A6E5F"
              letterSpacing="0.08em"
              style={{ textTransform: "uppercase" }}
            >
              {label.length > 12 ? label.slice(0, 11) + "." : label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function PathwayLayout({ service }: Props) {
  const related = getRelatedServices(service);
  const steps = service.steps ?? [];

  // Derive stage labels: use step titles if available, else defaults
  const stageLabels =
    steps.length >= 5
      ? steps.slice(0, 5).map((s) => s.title)
      : DEFAULT_STAGES;

  const displaySteps =
    steps.length > 0
      ? steps
      : stageLabels.map((label) => ({ title: label, description: "" }));

  return (
    <>
      {/* ── 1. Flow header: dark strip + full-width SVG diagram ─────────────── */}
      <Section variant="surface" className="!py-0 overflow-hidden border-b border-border">
        {/* Dark header strip */}
        <div className="-mx-6 bg-primary px-6 py-14">
          <div className="container mx-auto max-w-container">
            <h1
              className="font-extrabold text-primary-foreground"
              style={{
                fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
              }}
            >
              One document. Every permit decision mapped.
            </h1>
            <p className="mt-4 max-w-2xl text-sm font-light leading-relaxed text-white/60">
              {service.overview}
            </p>
          </div>
        </div>

        {/* Flow diagram panel */}
        <div className="-mx-6 border-t border-border bg-background px-6 py-10">
          <div className="container mx-auto max-w-container">
            <p className="mb-7 text-[11px] font-medium uppercase tracking-widest text-secondary">
              The pathway stages
            </p>
            <PermitFlowSvg stages={stageLabels} />
          </div>
        </div>
      </Section>

      {/* ── 2. Process highlights + five stages as large sequential rows ─────── */}
      <Section variant="default" className="border-t border-border">
        {/* Process highlights strip */}
        {service.processHighlights && service.processHighlights.length > 0 && (
          <div className="mb-16 grid grid-cols-2 gap-px bg-border border border-border sm:grid-cols-4">
            {service.processHighlights.map((h) => (
              <div key={h.label} className="flex flex-col gap-1 bg-background px-7 py-6">
                <span
                  className="font-bold text-foreground tabular-nums"
                  style={{
                    fontSize: "clamp(1.4rem, 3vw, 2rem)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {h.value}
                </span>
                <span className="text-[11px] font-medium uppercase tracking-widest text-muted">
                  {h.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Section header */}
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              The Stages
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
              }}
            >
              Five stages.<br />
              Delivered as one report.
            </h2>
          </div>
          <p className="font-light leading-relaxed text-muted lg:text-lg">
            The pathway analysis moves through each stage in sequence. The output at every
            stage feeds directly into the next. The final report reflects the complete
            chain of decisions from scope to delivery.
          </p>
        </div>

        {/* Stages: large sequential rows with left connector line */}
        <div className="relative border-t border-border">
          {/* Vertical connector running through the number column */}
          <div
            className="absolute left-[2.5rem] top-0 bottom-0 w-px bg-border"
            aria-hidden
          />
          {displaySteps.map((step, i) => (
            <div
              key={step.title}
              className="relative grid grid-cols-[5rem_1fr_2fr] gap-0 border-b border-border py-8"
            >
              {/* Number node — sits on the connector line */}
              <div className="flex items-start">
                <div className="relative z-10 flex h-10 w-10 items-center justify-center border border-border bg-background">
                  <span
                    className="font-bold tabular-nums text-secondary"
                    style={{
                      fontSize: "clamp(0.8rem, 1.5vw, 0.95rem)",
                      letterSpacing: "-0.02em",
                    }}
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
              {/* Stage title */}
              <div className="flex items-start pr-8">
                <h3
                  className="font-bold text-foreground"
                  style={{
                    fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.3,
                  }}
                >
                  {step.title}
                </h3>
              </div>
              {/* Stage description */}
              <div>
                <p className="text-sm font-light leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 3. Why a permit pathway analysis matters — dark editorial ────────── */}
      <Section variant="dark" className="border-t border-border">
        <div className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:gap-20">
          {/* Left: large paragraph */}
          <div>
            <p className="mb-6 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Why a Permit Pathway Analysis Matters
            </p>
            <p
              className="font-light text-primary-foreground leading-relaxed"
              style={{
                fontSize: "clamp(1.1rem, 2.2vw, 1.35rem)",
                lineHeight: 1.75,
              }}
            >
              {service.whyItMatters}
            </p>
          </div>

          {/* Right: what you avoid */}
          <div className="border border-white/10 bg-white/5 px-8 py-8">
            <p className="mb-5 text-[11px] font-medium uppercase tracking-widest text-secondary">
              What you avoid
            </p>
            <ul className="space-y-4">
              {[
                "Design work that precedes permit clarity",
                "Consultant fees spent in the wrong order",
                "Missed agency review steps",
                "Timelines that don't account for discretionary review",
                "Budget overruns from scope additions mid-permit",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-light text-white/80">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── 4. Deliverables — horizontal rule list ──────────────────────────── */}
      <Section variant="default" className="border-t border-border">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
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
              What you receive.
            </h2>
          </div>
          <p className="font-light leading-relaxed text-muted">
            The permit pathway report is a written document with structured sections for each
            stage. Every agency, deadline, and consultant recommendation is cited by name.
          </p>
        </div>

        <div className="border-t border-border">
          {service.includes.map((item, i) => (
            <div
              key={item.title}
              className="grid grid-cols-[3rem_1fr_2fr] gap-0 border-b border-border py-6"
            >
              <span
                className="text-[11px] font-medium tabular-nums text-secondary"
                style={{ letterSpacing: "0.06em" }}
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="pr-7 text-sm font-semibold uppercase tracking-wider text-foreground">
                {item.title}
              </h3>
              <p className="text-sm font-light leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 5. Audience — gap-as-border 2-col grid ─────────────────────────── */}
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
            Built for these clients.
          </h2>
        </div>
        <div className="grid gap-px bg-border border border-border sm:grid-cols-2">
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

      {/* ── 6. Related services ─────────────────────────────────────────────── */}
      {related.length > 0 && (
        <Section variant="surface" className="border-t border-border">
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
                  className="group flex cursor-pointer items-center gap-6 px-7 py-7 transition-colors duration-200 hover:bg-background lg:px-9"
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

      {/* ── 7. CTA Band ────────────────────────────────────────────────────── */}
      <CtaBand
        heading="Map your permit path before you design."
        subheading="Tell us the project scope and jurisdiction. We deliver the written pathway report in 3 to 5 business days."
        primaryAction={{ label: "Request the Analysis", href: "/contact" }}
        secondaryAction={{ label: "View All Services", href: "/services" }}
        variant="dark"
      />
    </>
  );
}
