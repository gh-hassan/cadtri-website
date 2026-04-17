import Link from "next/link";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { getRelatedServices } from "@/content/services";
import type { Service } from "@/content/services";

interface Props {
  service: Service;
}

const UNPERMITTED_CONSEQUENCES = [
  "Stop-work orders that freeze the entire project, not just the demo scope",
  "Fines levied per day until the violation is abated",
  "Certificate of occupancy withheld until the unpermitted work is documented or removed",
  "Unpermitted demolition flagged on title, complicating future sales and refinancing",
  "Lender conditions triggered if the property is financed during construction",
];

export function DemolitionLayout({ service }: Props) {
  const related = getRelatedServices(service);
  const faqs = service.faqs ?? [];

  return (
    <>
      {/* ── 1. Hero ─────────────────────────────────────────────────────────── */}
      <Section variant="surface" className="border-b border-border !py-0 overflow-hidden">
        {/* Dark charcoal strip */}
        <div className="-mx-6 bg-primary px-6 py-16">
          <div className="container mx-auto max-w-container">
            <p className="mb-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
              Drawings
            </p>
            <h1
              className="font-extrabold text-primary-foreground"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
              }}
            >
              The permit that clears the site.
            </h1>
            <p
              className="mt-5 max-w-2xl font-light text-white/70"
              style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", lineHeight: 1.7 }}
            >
              {service.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center bg-secondary px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                Order Demolition Drawings
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center border border-white/20 px-6 py-3 text-sm font-medium text-white/70 transition-colors hover:border-white/40 hover:text-white"
              >
                View All Services
              </Link>
            </div>
          </div>
        </div>

        {/* Demolition Scope Diagram */}
        <div className="-mx-6 bg-background px-6 py-10">
          <div className="container mx-auto max-w-container">
            <svg
              viewBox="0 0 600 160"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full"
              aria-label="Demolition scope diagram showing existing to remain on left and demolition scope on right"
              role="img"
            >
              {/* Background */}
              <rect x="0" y="0" width="600" height="160" fill="none" />

              {/* Building outline */}
              <rect x="40" y="30" width="520" height="100" fill="none" stroke="#E2D4B8" strokeWidth="1.5" />

              {/* Roof line detail */}
              <line x1="40" y1="30" x2="300" y2="10" stroke="#E2D4B8" strokeWidth="1" />
              <line x1="300" y1="10" x2="560" y2="30" stroke="#E2D4B8" strokeWidth="1" />

              {/* Dividing line between REMAIN and DEMO */}
              <line x1="300" y1="10" x2="300" y2="130" stroke="#E2D4B8" strokeWidth="1" strokeDasharray="4 3" />

              {/* LEFT side: EXISTING TO REMAIN — windows */}
              <rect x="70" y="55" width="40" height="35" fill="none" stroke="#E2D4B8" strokeWidth="1" />
              <rect x="130" y="55" width="40" height="35" fill="none" stroke="#E2D4B8" strokeWidth="1" />
              <rect x="200" y="55" width="30" height="35" fill="none" stroke="#E2D4B8" strokeWidth="1" />

              {/* LEFT side: door */}
              <rect x="240" y="90" width="28" height="40" fill="none" stroke="#E2D4B8" strokeWidth="1" />

              {/* RIGHT side: DEMOLITION SCOPE — dashed orange border */}
              <rect
                x="300"
                y="30"
                width="260"
                height="100"
                fill="none"
                stroke="#FF6D1F"
                strokeWidth="1.5"
                strokeDasharray="6 3"
                opacity="0.7"
              />

              {/* RIGHT side: X-hatch demolition marks */}
              {[
                [305, 35, 555, 125],
                [305, 125, 555, 35],
                [330, 35, 555, 100],
                [305, 60, 530, 125],
                [380, 35, 555, 115],
                [305, 80, 490, 125],
                [430, 35, 555, 105],
                [305, 50, 430, 125],
              ].map(([x1, y1, x2, y2], i) => (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#FF6D1F"
                  strokeWidth="0.8"
                  opacity="0.35"
                />
              ))}

              {/* RIGHT side: windows (ghost / struck) */}
              <rect x="320" y="55" width="40" height="35" fill="none" stroke="#FF6D1F" strokeWidth="1" opacity="0.5" />
              <rect x="390" y="55" width="40" height="35" fill="none" stroke="#FF6D1F" strokeWidth="1" opacity="0.5" />
              <rect x="470" y="55" width="40" height="35" fill="none" stroke="#FF6D1F" strokeWidth="1" opacity="0.5" />

              {/* Dimension line — bottom */}
              <line x1="40" y1="145" x2="560" y2="145" stroke="#E2D4B8" strokeWidth="0.75" />
              <line x1="40" y1="140" x2="40" y2="150" stroke="#E2D4B8" strokeWidth="0.75" />
              <line x1="560" y1="140" x2="560" y2="150" stroke="#E2D4B8" strokeWidth="0.75" />
              <text x="300" y="157" textAnchor="middle" fontSize="7" fill="#7A6E5F" fontFamily="monospace">
                TOTAL BUILDING FOOTPRINT
              </text>

              {/* Left label */}
              <text x="170" y="22" textAnchor="middle" fontSize="7" fill="#7A6E5F" fontFamily="monospace" letterSpacing="0.08em">
                EXISTING TO REMAIN
              </text>

              {/* Right label */}
              <text x="430" y="22" textAnchor="middle" fontSize="7" fill="#FF6D1F" fontFamily="monospace" letterSpacing="0.08em" opacity="0.85">
                DEMOLITION SCOPE
              </text>

              {/* Dimension line — demo section */}
              <line x1="300" y1="6" x2="560" y2="6" stroke="#FF6D1F" strokeWidth="0.75" opacity="0.5" />
              <line x1="300" y1="2" x2="300" y2="10" stroke="#FF6D1F" strokeWidth="0.75" opacity="0.5" />
              <line x1="560" y1="2" x2="560" y2="10" stroke="#FF6D1F" strokeWidth="0.75" opacity="0.5" />
            </svg>
          </div>
        </div>
      </Section>

      {/* ── 2. Process Highlights + What The Permit Requires ────────────────── */}
      <Section variant="default" className="border-t border-border">
        {/* 4-column highlight strip */}
        {service.processHighlights && service.processHighlights.length > 0 && (
          <div className="mb-14 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">
            {service.processHighlights.map((h) => (
              <div key={h.label} className="bg-background px-7 py-6">
                <span
                  className="block font-bold tabular-nums text-foreground"
                  style={{ fontSize: "2rem", letterSpacing: "-0.04em", lineHeight: 1 }}
                >
                  {h.value}
                </span>
                <span className="mt-2 block text-[11px] font-medium uppercase tracking-widest text-muted">
                  {h.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* What the permit requires — split intro */}
        <div className="grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
              Permit Requirements
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Every jurisdiction has a checklist. We know it.
            </h2>
          </div>
          <p
            className="font-light leading-relaxed text-muted"
            style={{ fontSize: "clamp(1rem, 2vw, 1.125rem)", lineHeight: 1.75 }}
          >
            {service.overview}
          </p>
        </div>
      </Section>

      {/* ── 3. Why a Demo Permit Isn't Optional ─────────────────────────────── */}
      <Section variant="dark" className="border-t border-border">
        <div className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:gap-20">
          {/* Left: editorial text */}
          <div>
            <p className="mb-6 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
              Why a Demo Permit Isn&apos;t Optional
            </p>
            <p
              className="font-light text-primary-foreground"
              style={{
                fontSize: "clamp(1.05rem, 2.2vw, 1.3rem)",
                lineHeight: 1.8,
              }}
            >
              {service.whyItMatters}
            </p>
          </div>

          {/* Right: consequences panel */}
          <div className="border border-white/10 bg-white/5 px-8 py-8">
            <p className="mb-6 text-[11px] font-medium uppercase tracking-widest text-secondary">
              What happens without one
            </p>
            <ul className="space-y-4">
              {UNPERMITTED_CONSEQUENCES.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-light text-white/80">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── 4. What's Included ──────────────────────────────────────────────── */}
      <Section variant="surface" className="border-t border-border">
        <div className="mb-12 border-b border-border pb-12">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
            What&apos;s Included
          </p>
          <h2
            className="font-bold text-foreground"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              letterSpacing: "-0.03em",
            }}
          >
            Every sheet, accounted for.
          </h2>
        </div>

        <div className="border-t border-border">
          {service.includes.map((item, i) => (
            <div
              key={item.title}
              className="grid gap-4 border-b border-border py-7 lg:grid-cols-[2.5rem_1fr_2fr]"
            >
              <span
                className="text-[11px] font-medium tabular-nums text-secondary"
                style={{ letterSpacing: "0.06em", paddingTop: "2px" }}
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                {item.title}
              </h3>
              <p className="text-sm font-light leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 5. Built for These Teams ────────────────────────────────────────── */}
      <Section variant="default" className="border-t border-border">
        <div className="mb-12 border-b border-border pb-12">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
            Built for These Teams
          </p>
          <h2
            className="font-bold text-foreground"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              letterSpacing: "-0.03em",
            }}
          >
            Who we work with.
          </h2>
        </div>

        <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
          {service.audience.map((item) => (
            <div key={item.title} className="flex flex-col gap-3 bg-background px-8 py-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                {item.title}
              </h3>
              <p className="text-sm font-light leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 6. FAQ ──────────────────────────────────────────────────────────── */}
      {faqs.length > 0 && (
        <Section variant="surface" className="border-t border-border">
          <div className="mb-12 border-b border-border pb-12">
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Common Questions
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Answers before you engage.
            </h2>
          </div>
          <dl className="divide-y divide-border border border-border">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="grid gap-4 px-8 py-8 lg:grid-cols-[2fr_3fr] lg:gap-16"
              >
                <dt className="font-medium text-foreground">{faq.question}</dt>
                <dd className="text-sm font-light leading-relaxed text-muted">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </Section>
      )}

      {/* ── 7. Related Services ─────────────────────────────────────────────── */}
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
              className="hidden shrink-0 text-[11px] font-medium uppercase tracking-wider text-secondary transition-colors hover:text-foreground lg:block"
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
                      className="font-bold text-base text-foreground transition-colors duration-200 group-hover:text-secondary"
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

      {/* ── CTA Band ────────────────────────────────────────────────────────── */}
      <CtaBand
        heading="The demo permit is holding up your project."
        subheading="Provide the address, jurisdiction, and scope of demolition. Drawings delivered in 3 to 5 business days."
        primaryAction={{ label: "Order Demolition Drawings", href: "/contact" }}
        secondaryAction={{ label: "View All Services", href: "/services" }}
        variant="dark"
      />
    </>
  );
}
