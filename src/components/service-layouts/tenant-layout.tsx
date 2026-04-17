import Link from "next/link";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { getRelatedServices } from "@/content/services";
import type { Service } from "@/content/services";

interface Props {
  service: Service;
}

const OCCUPANCY_TYPES = [
  {
    label: "Retail",
    items: [
      "Storefront glazing and accessible entry path",
      "Accessible checkout counter per CBC 11B",
      "Egress calculations for occupant load",
      "Signage and exit illumination requirements",
    ],
  },
  {
    label: "Office",
    items: [
      "Open plan vs. enclosed private office configurations",
      "Accessible restrooms and service route",
      "HVAC zoning and mechanical penetrations",
      "Exit signs, emergency lighting, and rated corridor documentation",
    ],
  },
  {
    label: "Hospitality",
    items: [
      "Kitchen hood and suppression permit coordination",
      "Occupancy load calculations for dining and bar areas",
      "ADA-compliant dining seating and service counter",
      "Bar and service area plumbing rough-in documentation",
    ],
  },
];

const TI_DOCUMENTATION_ITEMS = [
  "Change of occupancy documentation and code analysis",
  "Accessible path of travel from public right-of-way through the space",
  "Demising wall fire rating and assembly specifications",
  "HVAC penetrations through rated assemblies with damper callouts",
  "Plumbing layout changes and fixture count verification",
];

export function TenantLayout({ service }: Props) {
  const related = getRelatedServices(service);
  const faqs = service.faqs ?? [];

  return (
    <>
      {/* ── 1. Hero with Floor Plan Diagram ─────────────────────────────────── */}
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
                fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
              }}
            >
              Commercial TI drawings built for plan check.
            </h1>
            <p
              className="mt-5 max-w-2xl font-light text-white/60"
              style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)", lineHeight: 1.7 }}
            >
              {service.tagline}
            </p>
          </div>
        </div>

        {/* Overhead floor plan SVG */}
        <div className="-mx-6 bg-background px-6 py-10">
          <div className="container mx-auto max-w-container">
            <svg
              viewBox="0 0 640 180"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full"
              aria-label="Commercial tenant improvement floor plan showing leased space with interior demising walls, accessible restroom, and dimension lines"
              role="img"
            >
              {/* Ghost previous tenant layout (dashed) */}
              <rect x="50" y="20" width="540" height="140" fill="none" stroke="#E2D4B8" strokeWidth="0.75" strokeDasharray="5 3" opacity="0.45" />
              <line x1="230" y1="20" x2="230" y2="160" stroke="#E2D4B8" strokeWidth="0.75" strokeDasharray="5 3" opacity="0.45" />
              <line x1="420" y1="20" x2="420" y2="160" stroke="#E2D4B8" strokeWidth="0.75" strokeDasharray="5 3" opacity="0.45" />

              {/* Outer leased space — new construction */}
              <rect x="50" y="20" width="540" height="140" fill="none" stroke="#222222" strokeWidth="2" />

              {/* New interior demising walls in orange (thin) */}
              {/* Main sales floor / back-of-house divider */}
              <line x1="440" y1="20" x2="440" y2="160" stroke="#FF6D1F" strokeWidth="2.5" opacity="0.75" />
              {/* Back-of-house: restroom divider */}
              <line x1="440" y1="90" x2="590" y2="90" stroke="#FF6D1F" strokeWidth="2.5" opacity="0.75" />
              {/* Storage wall */}
              <line x1="515" y1="90" x2="515" y2="160" stroke="#FF6D1F" strokeWidth="2.5" opacity="0.75" />

              {/* Room labels */}
              <text x="240" y="97" textAnchor="middle" fontSize="8" fill="#7A6E5F" fontFamily="monospace" letterSpacing="0.06em">SALES FLOOR</text>
              <text x="512" y="60" textAnchor="middle" fontSize="7" fill="#7A6E5F" fontFamily="monospace" letterSpacing="0.05em">RESTROOM</text>
              <text x="480" y="135" textAnchor="middle" fontSize="7" fill="#7A6E5F" fontFamily="monospace" letterSpacing="0.05em">BOH</text>
              <text x="554" y="135" textAnchor="middle" fontSize="7" fill="#7A6E5F" fontFamily="monospace" letterSpacing="0.05em">STORAGE</text>

              {/* Accessible restroom symbol */}
              {/* Wheelchair symbol */}
              <circle cx="496" cy="48" r="5" fill="none" stroke="#7A6E5F" strokeWidth="1" />
              <path d="M496 53 L496 65 L489 65 M496 57 L503 62" fill="none" stroke="#7A6E5F" strokeWidth="1" />
              <circle cx="502" cy="68" r="4" fill="none" stroke="#7A6E5F" strokeWidth="1" />

              {/* Door swing arcs */}
              {/* Entry door */}
              <path d="M 70 20 L 70 38" stroke="#222222" strokeWidth="1.2" />
              <path d="M 70 20 A 18 18 0 0 1 88 20" fill="none" stroke="#222222" strokeWidth="0.8" strokeDasharray="3 2" />
              {/* Restroom door */}
              <path d="M 440 80 L 455 80" stroke="#FF6D1F" strokeWidth="1" opacity="0.75" />
              <path d="M 440 80 A 15 15 0 0 0 440 95" fill="none" stroke="#FF6D1F" strokeWidth="0.7" strokeDasharray="3 2" opacity="0.75" />

              {/* Dimension lines */}
              {/* Bottom dimension: total width */}
              <line x1="50" y1="170" x2="590" y2="170" stroke="#222222" strokeWidth="0.75" />
              <line x1="50" y1="165" x2="50" y2="175" stroke="#222222" strokeWidth="0.75" />
              <line x1="590" y1="165" x2="590" y2="175" stroke="#222222" strokeWidth="0.75" />
              <text x="320" y="178" textAnchor="middle" fontSize="7" fill="#7A6E5F" fontFamily="monospace">LEASED SPACE WIDTH</text>

              {/* Right dimension: height */}
              <line x1="600" y1="20" x2="600" y2="160" stroke="#222222" strokeWidth="0.75" />
              <line x1="595" y1="20" x2="605" y2="20" stroke="#222222" strokeWidth="0.75" />
              <line x1="595" y1="160" x2="605" y2="160" stroke="#222222" strokeWidth="0.75" />

              {/* Legend */}
              <line x1="55" y1="8" x2="75" y2="8" stroke="#FF6D1F" strokeWidth="2.5" opacity="0.75" />
              <text x="80" y="11" fontSize="6.5" fill="#7A6E5F" fontFamily="monospace" letterSpacing="0.04em">NEW WALLS</text>
              <line x1="145" y1="8" x2="165" y2="8" stroke="#E2D4B8" strokeWidth="0.75" strokeDasharray="5 3" />
              <text x="170" y="11" fontSize="6.5" fill="#7A6E5F" fontFamily="monospace" letterSpacing="0.04em">PREVIOUS TENANT LAYOUT</text>
            </svg>
          </div>
        </div>
      </Section>

      {/* ── 2. Three Occupancy Types ─────────────────────────────────────────── */}
      <Section variant="default" className="border-t border-border">
        <div className="mb-10 border-b border-border pb-10">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
            Occupancy Types
          </p>
          <h2
            className="font-bold text-foreground"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Three occupancy types. One firm.
          </h2>
        </div>

        <div className="grid gap-px border border-border bg-border sm:grid-cols-3">
          {OCCUPANCY_TYPES.map((type) => (
            <div key={type.label} className="bg-background px-8 py-10">
              <h3
                className="mb-6 font-bold text-foreground"
                style={{
                  fontSize: "1.375rem",
                  letterSpacing: "-0.02em",
                }}
              >
                {type.label}
              </h3>
              <ul className="space-y-3">
                {type.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm font-light leading-relaxed text-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 3. Process Highlights + What the TI Triggers ────────────────────── */}
      <Section variant="surface" className="border-t border-border">
        {/* 4-col highlights strip */}
        {service.processHighlights && service.processHighlights.length > 0 && (
          <div className="mb-14 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">
            {service.processHighlights.map((h) => (
              <div key={h.label} className="bg-surface px-7 py-6">
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

        {/* Horizontal split intro */}
        <div className="grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
              Code Requirements
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              The code requirements your TI triggers.
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

      {/* ── 4. Why It Matters + What We Document ────────────────────────────── */}
      <Section variant="dark" className="border-t border-border">
        <div className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:gap-20">
          {/* Left: whyItMatters */}
          <div>
            <p className="mb-6 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
              Why This Matters
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

          {/* Right: what we document */}
          <div className="border border-white/10 bg-white/5 px-8 py-8">
            <p className="mb-5 text-[11px] font-medium uppercase tracking-widest text-secondary">
              What we document
            </p>
            <ul className="space-y-4">
              {TI_DOCUMENTATION_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-light text-white/70">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── 5. What's Included ──────────────────────────────────────────────── */}
      <Section variant="default" className="border-t border-border">
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
            Every sheet in the package.
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
                className="font-bold text-foreground"
                style={{ fontSize: "0.8125rem", letterSpacing: "0.04em", textTransform: "uppercase" }}
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

      {/* ── 6. Who This Is For ──────────────────────────────────────────────── */}
      <Section variant="surface" className="border-t border-border">
        <div className="mb-12 border-b border-border pb-12">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
            Designed For
          </p>
          <h2
            className="font-bold text-foreground"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              letterSpacing: "-0.03em",
            }}
          >
            Who this serves.
          </h2>
        </div>

        <div>
          {service.audience.map((item, i) => (
            <div
              key={item.title}
              className="flex gap-6 border-b border-border py-7"
            >
              <span
                className="w-10 shrink-0 text-[11px] font-medium tabular-nums text-secondary"
                style={{ letterSpacing: "0.06em", paddingTop: "2px" }}
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
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

      {/* ── 7. FAQ ──────────────────────────────────────────────────────────── */}
      {faqs.length > 0 && (
        <Section variant="default" className="border-t border-border">
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
              Before the scope call.
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

      {/* ── 8. Related Services ─────────────────────────────────────────────── */}
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
                  className="group flex cursor-pointer items-center gap-6 px-7 py-7 transition-colors duration-200 hover:bg-background lg:px-9"
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
        heading="Your TI drawings. Built for first-pass approval."
        subheading="Tell us the space address, occupancy type, and proposed scope. We confirm what the jurisdiction requires and deliver the complete set."
        primaryAction={{ label: "Start Your TI Package", href: "/contact" }}
        secondaryAction={{ label: "View All Services", href: "/services" }}
        variant="dark"
      />
    </>
  );
}
