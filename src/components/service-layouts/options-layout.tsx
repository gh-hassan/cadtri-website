import Link from "next/link";
import { Button } from "@/components/shared/button";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { getRelatedServices } from "@/content/services";
import type { Service } from "@/content/services";

interface Props {
  service: Service;
}

// ── Inline SVG floor plan thumbnails ─────────────────────────────────────────

function FloorPlanA() {
  return (
    <svg
      viewBox="0 0 80 60"
      width="80"
      height="60"
      aria-hidden
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-border"
    >
      {/* L-shape footprint */}
      <polyline
        points="8,8 8,52 52,52 52,32 72,32 72,8 8,8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Interior partition wall — horizontal */}
      <line x1="8" y1="32" x2="52" y2="32" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" />
      {/* Interior partition wall — vertical */}
      <line x1="30" y1="8" x2="30" y2="32" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" />
      {/* Door arc suggestion */}
      <path d="M30,32 Q38,24 38,32" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  );
}

function FloorPlanB() {
  return (
    <svg
      viewBox="0 0 80 60"
      width="80"
      height="60"
      aria-hidden
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-border"
    >
      {/* Wider rectangular footprint */}
      <rect x="6" y="10" width="68" height="40" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Three-bay vertical grid */}
      <line x1="28" y1="10" x2="28" y2="50" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" />
      <line x1="52" y1="10" x2="52" y2="50" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" />
      {/* Horizontal corridor division */}
      <line x1="6" y1="32" x2="74" y2="32" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" />
      {/* Door arc */}
      <path d="M52,32 Q60,24 60,32" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  );
}

function FloorPlanC() {
  return (
    <svg
      viewBox="0 0 80 60"
      width="80"
      height="60"
      aria-hidden
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-border"
    >
      {/* Ground floor */}
      <rect x="10" y="30" width="60" height="24" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Second floor — slightly inset to suggest stepping */}
      <rect x="14" y="8" width="52" height="20" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Stair indicator */}
      <line x1="10" y1="30" x2="14" y2="28" stroke="currentColor" strokeWidth="0.75" />
      <line x1="70" y1="30" x2="66" y2="28" stroke="currentColor" strokeWidth="0.75" />
      {/* Ground floor center partition */}
      <line x1="40" y1="30" x2="40" y2="54" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" />
      {/* Second floor partition */}
      <line x1="40" y1="8" x2="40" y2="28" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" />
    </svg>
  );
}

const OPTION_PANELS = [
  {
    label: "Option A",
    tagline: "Compact single-story footprint within setbacks",
    plan: <FloorPlanA />,
  },
  {
    label: "Option B",
    tagline: "Wider layout, maximized programmatic use",
    plan: <FloorPlanB />,
  },
  {
    label: "Option C",
    tagline: "Two-story massing for additional square footage",
    plan: <FloorPlanC />,
  },
] as const;

export function OptionsLayout({ service }: Props) {
  const related = getRelatedServices(service);
  const steps = service.steps ?? [];

  return (
    <>
      {/* ── Hero: Three-panel options display ────────────────────────────────── */}
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
              Two options. Three options. All on the table before you commit.
            </h2>
            <p className="mt-4 max-w-xl text-sm font-light text-white/60 leading-relaxed">
              {service.overview}
            </p>
          </div>
        </div>

        {/* Three labeled floor plan panels */}
        <div className="-mx-6 grid grid-cols-1 border-x border-b border-border sm:grid-cols-3">
          {OPTION_PANELS.map((panel, i) => (
            <div
              key={panel.label}
              className={[
                "bg-background px-8 py-8 flex flex-col gap-5",
                i < 2 ? "sm:border-r border-border" : "",
                i > 0 ? "border-t sm:border-t-0 border-border" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <p
                className="text-[11px] font-medium uppercase tracking-widest text-secondary"
                style={{ letterSpacing: "0.12em" }}
              >
                {panel.label}
              </p>
              <div className="flex items-center justify-center py-2 opacity-70">
                {panel.plan}
              </div>
              <p className="text-xs font-light leading-relaxed text-muted border-t border-border pt-4">
                {panel.tagline}
              </p>
            </div>
          ))}
        </div>

        {/* Process highlights strip */}
        {service.processHighlights && service.processHighlights.length > 0 && (
          <div className="-mx-6 grid grid-cols-2 gap-px bg-border sm:grid-cols-4 border-x border-b border-border">
            {service.processHighlights.map((h) => (
              <div key={h.label} className="bg-surface px-7 py-5">
                <span
                  className="block text-2xl font-bold text-foreground tabular-nums"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  {h.value}
                </span>
                <span className="mt-1 block text-[11px] font-medium uppercase tracking-widest text-muted">
                  {h.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* ── How it works: editorial numbered rows ────────────────────────────── */}
      {steps.length > 0 && (
        <Section variant="default" className="border-t border-border">
          <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
                Process
              </p>
              <h2
                className="font-bold text-foreground"
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.15,
                }}
              >
                How it works.
              </h2>
            </div>
            <p className="font-light leading-relaxed text-muted lg:text-lg">
              Each engagement follows a structured sequence: brief intake, site and code research,
              layout development, and a written comparison delivered as a single PDF.
            </p>
          </div>

          {/* Large editorial numbered rows */}
          <div className="border-t border-border">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="grid grid-cols-[3rem_1fr] gap-8 border-b border-border py-10 sm:grid-cols-[4rem_14rem_1fr] sm:gap-12"
              >
                <span
                  className="text-[11px] font-medium tabular-nums text-secondary self-start pt-1"
                  style={{ letterSpacing: "0.06em" }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className="col-span-1 self-start font-bold text-foreground sm:col-span-1"
                  style={{
                    fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
                    letterSpacing: "-0.01em",
                  }}
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

      {/* ── Why options matter ────────────────────────────────────────────────── */}
      <Section variant="dark" className="border-t border-border">
        <div className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:gap-20">
          {/* Left: why it matters */}
          <div>
            <p className="mb-6 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Why Options Matter
            </p>
            <h2
              className="mb-6 font-bold text-primary-foreground"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                letterSpacing: "-0.025em",
                lineHeight: 1.2,
              }}
            >
              Comparing options reveals what a single direction conceals.
            </h2>
            <p
              className="font-light text-white/70 leading-relaxed"
              style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)", lineHeight: 1.8 }}
            >
              {service.whyItMatters}
            </p>
          </div>

          {/* Right: what comparing options reveals */}
          <div className="border border-white/10 bg-white/5 px-8 py-8">
            <p className="mb-5 text-[11px] font-medium uppercase tracking-widest text-secondary">
              What comparing options reveals
            </p>
            <ul className="space-y-4">
              {[
                "Which option fits within setbacks without a variance",
                "Which maximizes square footage within code limits",
                "Which carries the lowest permit complexity",
                "Where structural requirements diverge across layouts",
                "Which direction aligns with the construction budget",
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

      {/* ── Deliverables ─────────────────────────────────────────────────────── */}
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
            What you receive.
          </h2>
        </div>

        {/* Gap-as-border 2-col grid */}
        <div className="-mx-6 grid gap-px bg-border border-x border-t border-border sm:grid-cols-2">
          {service.includes.map((item, i) => (
            <div key={item.title} className="flex flex-col gap-3 bg-background px-8 py-8">
              <div className="flex items-start gap-4">
                <span
                  className="shrink-0 text-[11px] font-medium tabular-nums text-secondary"
                  style={{ letterSpacing: "0.06em" }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm font-light leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Who this is for ──────────────────────────────────────────────────── */}
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
        heading="See your options before you commit."
        subheading="Provide the parcel details and project goals. We return two or three layout options with a written comparison in 5 to 7 business days."
        primaryAction={{ label: "Request an Options Study", href: "/contact" }}
        secondaryAction={{ label: "View All Services", href: "/services" }}
        variant="dark"
      />
    </>
  );
}
