import Link from "next/link";
import { Button } from "@/components/shared/button";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { getRelatedServices } from "@/content/services";
import type { Service } from "@/content/services";

interface Props {
  service: Service;
}

// Inline SVG: top-down city block parcel grid, subject parcel highlighted in orange
function ParcelBlockSvg() {
  // 4x4 grid of parcel rectangles
  // Each parcel: ~26x22px with 2px gap. Total ~120x100 (viewBox)
  const parcels = [
    // row 0
    { x: 2,  y: 2,  w: 24, h: 20, highlight: false },
    { x: 30, y: 2,  w: 34, h: 20, highlight: false },
    { x: 68, y: 2,  w: 24, h: 20, highlight: false },
    { x: 96, y: 2,  w: 22, h: 20, highlight: false },
    // row 1
    { x: 2,  y: 26, w: 24, h: 28, highlight: false },
    { x: 30, y: 26, w: 34, h: 28, highlight: true  }, // subject parcel — center-left
    { x: 68, y: 26, w: 24, h: 28, highlight: false },
    { x: 96, y: 26, w: 22, h: 28, highlight: false },
    // row 2
    { x: 2,  y: 58, w: 24, h: 20, highlight: false },
    { x: 30, y: 58, w: 34, h: 20, highlight: false },
    { x: 68, y: 58, w: 24, h: 20, highlight: false },
    { x: 96, y: 58, w: 22, h: 20, highlight: false },
    // row 3
    { x: 2,  y: 82, w: 58, h: 16, highlight: false },
    { x: 64, y: 82, w: 28, h: 16, highlight: false },
    { x: 96, y: 82, w: 22, h: 16, highlight: false },
  ];

  // Palette: cream/border shades for non-highlight parcels
  const baseColors = ["#F5E7C6", "#EDD9AC", "#F0E2C0", "#E8D5A8"];

  return (
    <svg
      viewBox="0 0 120 100"
      width={120}
      height={100}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      {parcels.map((p, i) =>
        p.highlight ? (
          <rect
            key={i}
            x={p.x}
            y={p.y}
            width={p.w}
            height={p.h}
            fill="#FF6D1F"
            fillOpacity={0.18}
            stroke="#FF6D1F"
            strokeWidth={1.5}
          />
        ) : (
          <rect
            key={i}
            x={p.x}
            y={p.y}
            width={p.w}
            height={p.h}
            fill={baseColors[i % baseColors.length]}
            stroke="#E2D4B8"
            strokeWidth={0.75}
          />
        )
      )}
      {/* Street centerlines */}
      <line x1="0" y1="50" x2="120" y2="50" stroke="#E2D4B8" strokeWidth={0.5} strokeDasharray="3 2" />
      <line x1="60" y1="0" x2="60" y2="100" stroke="#E2D4B8" strokeWidth={0.5} strokeDasharray="3 2" />
    </svg>
  );
}

export function ZoningLayout({ service }: Props) {
  const related = getRelatedServices(service);
  const steps = service.steps ?? [];

  // Use first 5 includes titles for the "what gets confirmed" panel
  const confirmedItems = service.includes.slice(0, 5);

  return (
    <>
      {/* ── 1. Two-column overview with parcel SVG ─────────────────────────── */}
      <Section variant="default">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">
          {/* Left: eyebrow + overview + CTAs */}
          <div className="flex flex-col justify-between gap-10">
            <div>
              <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
                Strategy
              </p>
              <h1
                className="font-extrabold text-foreground"
                style={{
                  fontSize: "clamp(1.75rem, 4.5vw, 3rem)",
                  letterSpacing: "-0.035em",
                  lineHeight: 1.1,
                }}
              >
                {service.title}
              </h1>
              <p
                className="mt-6 font-light leading-relaxed text-muted"
                style={{ fontSize: "clamp(1rem, 1.8vw, 1.2rem)", lineHeight: 1.75 }}
              >
                {service.overview}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button href="/contact" variant="primary" size="lg">
                Order the Report
              </Button>
              <Button href="/services" variant="ghost" size="lg">
                View All Services
              </Button>
            </div>
          </div>

          {/* Right: parcel SVG, right-aligned, visually anchored */}
          <div className="flex shrink-0 items-start justify-end lg:justify-start">
            <div className="border border-border bg-surface p-6">
              <ParcelBlockSvg />
              <p className="mt-3 text-[10px] font-medium uppercase tracking-widest text-muted">
                Subject Parcel
              </p>
            </div>
          </div>
        </div>

        {/* Process highlights strip */}
        {service.processHighlights && service.processHighlights.length > 0 && (
          <div className="mt-14 grid grid-cols-2 gap-px bg-border border border-border sm:grid-cols-4">
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
      </Section>

      {/* ── 2. Six Analysis Areas — numbered rows, editorial table format ───── */}
      <Section variant="surface" className="border-t border-border">
        {/* Section header: H2 left, description right */}
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Analysis Areas
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
              }}
            >
              {steps.length > 0 ? `${steps.length} analysis areas.` : "Six analysis areas."}
              <br />
              One written report.
            </h2>
          </div>
          <p className="font-light leading-relaxed text-muted lg:text-lg">
            Every zoning analysis covers the same set of research areas applied to your specific parcel
            address and proposed project type. No two parcels are the same. The report documents
            exactly what applies to yours.
          </p>
        </div>

        {/* Numbered rows: grid 3rem | title | description */}
        {steps.length > 0 && (
          <div className="border-t border-border">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="group grid grid-cols-[3rem_1fr_2fr] gap-0 border-b border-border transition-colors duration-200 hover:bg-background"
              >
                {/* Number column */}
                <div className="flex items-start border-r border-border px-0 py-7 pr-4">
                  <span
                    className="text-[11px] font-medium tabular-nums text-secondary transition-colors duration-200"
                    style={{ letterSpacing: "0.06em" }}
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                {/* Title column */}
                <div
                  className="flex items-start border-r border-border px-7 py-7 transition-colors duration-200"
                  style={{
                    borderLeftWidth: "2px",
                    borderLeftColor: "transparent",
                  }}
                >
                  <h3
                    className="text-sm font-semibold text-foreground"
                    style={{ letterSpacing: "-0.01em", lineHeight: 1.4 }}
                  >
                    {step.title}
                  </h3>
                </div>
                {/* Description column */}
                <div className="px-7 py-7">
                  <p className="text-sm font-light leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* ── 3. Why Start Here — dark editorial split ────────────────────────── */}
      <Section variant="dark" className="border-t border-border">
        <div className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:gap-20">
          {/* Left: large paragraph */}
          <div>
            <p className="mb-6 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Why Start Here
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

          {/* Right: what gets confirmed list */}
          <div className="border border-white/10 bg-white/5 px-8 py-8">
            <p className="mb-5 text-[11px] font-medium uppercase tracking-widest text-secondary">
              What gets confirmed
            </p>
            <ul className="space-y-4">
              {confirmedItems.map((item) => (
                <li key={item.title} className="flex items-start gap-3 text-sm font-light text-white/80">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden />
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── 4. Deliverables — horizontal rule list ─────────────────────────── */}
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
              The report you receive.
            </h2>
          </div>
          <p className="font-light leading-relaxed text-muted">
            The written zoning analysis is formatted as a structured report. Each section is
            documented with supporting code citations so you can verify every finding.
          </p>
        </div>

        <div className="border-t border-border">
          {service.includes.map((item, i) => (
            <div
              key={item.title}
              className="grid grid-cols-[3rem_1fr_2fr] gap-0 border-b border-border py-6"
            >
              {/* Number */}
              <span
                className="text-[11px] font-medium tabular-nums text-secondary"
                style={{ letterSpacing: "0.06em" }}
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              {/* Title */}
              <h3 className="pr-7 text-sm font-semibold uppercase tracking-wider text-foreground">
                {item.title}
              </h3>
              {/* Description */}
              <p className="text-sm font-light leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 5. Who It's For — gap-as-border 2-col grid ─────────────────────── */}
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
        heading="Order your zoning report."
        subheading="Provide the parcel address and intended project type. The written report is delivered in 3 to 5 business days."
        primaryAction={{ label: "Order the Report", href: "/contact" }}
        secondaryAction={{ label: "View All Services", href: "/services" }}
        variant="dark"
      />
    </>
  );
}
