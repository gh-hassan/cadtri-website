import Link from "next/link";
import { Button } from "@/components/shared/button";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { getRelatedServices } from "@/content/services";
import type { Service } from "@/content/services";

interface Props {
  service: Service;
}

export function FireSafetyLayout({ service }: Props) {
  const related = getRelatedServices(service);
  const steps = service.steps ?? [];
  const faqs = service.faqs ?? [];

  const codeStandards = [
    { code: "IBC Chapter 10", name: "Means of Egress" },
    { code: "CBC Chapter 10", name: "California Building Code" },
    { code: "NFPA 101", name: "Life Safety Code" },
    { code: "Title 19 CCR", name: "California Fire Regulations" },
    { code: "NFPA 72", name: "National Fire Alarm Code" },
    { code: "IFC", name: "International Fire Code" },
  ];

  return (
    <>
      {/* ── Section 1: Two-column hero with egress plan SVG ───────────────── */}
      <Section variant="default">
        <div className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16 items-start">
          {/* Left: headline + overview + CTAs */}
          <div>
            <p className="mb-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
              Drawings
            </p>
            <h1
              className="mb-6 font-extrabold text-foreground"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                letterSpacing: "-0.04em",
                lineHeight: 1.0,
              }}
            >
              Occupancy depends on getting this right.
            </h1>
            <p className="mb-8 font-light leading-relaxed text-muted" style={{ fontSize: "clamp(1rem, 1.8vw, 1.15rem)" }}>
              {service.overview}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/contact" variant="primary" size="lg">
                Order Fire and Life Safety Drawings
              </Button>
              <Button href="/services" variant="ghost" size="lg">
                View All Services
              </Button>
            </div>
          </div>

          {/* Right: Egress plan SVG */}
          <div className="border border-border bg-surface p-5">
            <p className="mb-3 text-[10px] font-medium uppercase tracking-widest text-muted">
              Egress plan reference diagram
            </p>
            <svg
              viewBox="0 0 200 220"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full"
              aria-label="Floor plan showing egress paths, fire-rated walls, and exit locations"
            >
              <defs>
                {/* Fire-rated wall hatch */}
                <pattern id="fr-wall" patternUnits="userSpaceOnUse" width="5" height="5" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="5" stroke="#E2D4B8" strokeWidth="2" />
                </pattern>
              </defs>

              {/* ── Building outline ── */}
              <rect x="10" y="10" width="180" height="150" stroke="#222222" strokeWidth="1.5" fill="none" />

              {/* ── Interior walls ── */}
              <line x1="10" y1="80" x2="110" y2="80" stroke="#222222" strokeWidth="1" />
              <line x1="110" y1="10" x2="110" y2="80" stroke="#222222" strokeWidth="1" />
              <line x1="110" y1="80" x2="110" y2="160" stroke="#222222" strokeWidth="1" />

              {/* ── Fire-rated wall overlays ── */}
              <rect x="10" y="10" width="4" height="150" fill="url(#fr-wall)" />
              <rect x="186" y="10" width="4" height="150" fill="url(#fr-wall)" />
              <rect x="108" y="10" width="4" height="70" fill="url(#fr-wall)" />

              {/* ── Egress path — room 1 to door ── */}
              <polyline
                points="50,50 50,90 90,90 90,120 50,120 50,160"
                stroke="#FF6D1F"
                strokeWidth="2"
                strokeDasharray="4 3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* ── Egress path — room 2 to door ── */}
              <polyline
                points="150,50 150,90 130,90 130,160"
                stroke="#FF6D1F"
                strokeWidth="2"
                strokeDasharray="4 3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* ── Exit door 1 (bottom left) — orange bracket ── */}
              <line x1="35" y1="158" x2="35" y2="165" stroke="#FF6D1F" strokeWidth="2" />
              <line x1="65" y1="158" x2="65" y2="165" stroke="#FF6D1F" strokeWidth="2" />
              <line x1="35" y1="162" x2="65" y2="162" stroke="#FF6D1F" strokeWidth="1.5" />
              <text x="42" y="175" fontSize="6" fill="#FF6D1F" fontFamily="monospace" fontWeight="600">EXIT</text>

              {/* ── Exit door 2 (bottom right) — orange bracket ── */}
              <line x1="115" y1="158" x2="115" y2="165" stroke="#FF6D1F" strokeWidth="2" />
              <line x1="145" y1="158" x2="145" y2="165" stroke="#FF6D1F" strokeWidth="2" />
              <line x1="115" y1="162" x2="145" y2="162" stroke="#FF6D1F" strokeWidth="1.5" />
              <text x="122" y="175" fontSize="6" fill="#FF6D1F" fontFamily="monospace" fontWeight="600">EXIT</text>

              {/* ── Assembly area (dashed circle outside building) ── */}
              <ellipse cx="100" cy="205" rx="45" ry="10" stroke="#FF6D1F" strokeWidth="1" strokeDasharray="3 2" fill="none" />
              <text x="82" y="208" fontSize="6" fill="#7A6E5F" fontFamily="monospace">ASSEMBLY AREA</text>

              {/* ── Exit arrows on paths ── */}
              <text x="52" y="135" fontSize="8" fill="#FF6D1F" fontFamily="monospace">&#x2193;</text>
              <text x="131" y="135" fontSize="8" fill="#FF6D1F" fontFamily="monospace">&#x2193;</text>

              {/* ── Room labels ── */}
              <text x="40" y="48" fontSize="7" fill="#7A6E5F" fontFamily="monospace">ROOM A</text>
              <text x="130" y="48" fontSize="7" fill="#7A6E5F" fontFamily="monospace">ROOM B</text>
              <text x="40" y="130" fontSize="7" fill="#7A6E5F" fontFamily="monospace">LOBBY</text>

              {/* ── Fire extinguisher symbols ── */}
              <rect x="14" y="40" width="5" height="8" fill="none" stroke="#7A6E5F" strokeWidth="0.75" />
              <circle cx="16.5" cy="37" r="2.5" fill="none" stroke="#7A6E5F" strokeWidth="0.75" />
              <rect x="183" y="40" width="5" height="8" fill="none" stroke="#7A6E5F" strokeWidth="0.75" />
              <circle cx="185.5" cy="37" r="2.5" fill="none" stroke="#7A6E5F" strokeWidth="0.75" />

              {/* ── Exit sign indicators (horizontal ← → lines at exits) ── */}
              <text x="20" y="165" fontSize="7" fill="#7A6E5F" fontFamily="monospace">&#x2190;</text>
              <text x="170" y="165" fontSize="7" fill="#7A6E5F" fontFamily="monospace">&#x2192;</text>
            </svg>
          </div>
        </div>
      </Section>

      {/* ── Section 2: Dark editorial — what code requires ────────────────── */}
      <Section variant="dark" className="border-t border-border">
        <div className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16">
          <div>
            <p className="mb-6 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              What the Code Requires
            </p>
            <p
              className="font-light text-primary-foreground leading-relaxed"
              style={{ fontSize: "clamp(1.05rem, 2vw, 1.3rem)", lineHeight: 1.75 }}
            >
              {service.whyItMatters}
            </p>
          </div>
          <div className="border border-white/10 bg-white/5 px-8 py-8">
            <p className="mb-5 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Applicable standards
            </p>
            <ul className="space-y-3">
              {codeStandards.map((standard) => (
                <li key={standard.code} className="flex items-start gap-3">
                  <span className="shrink-0 text-[10px] font-semibold tabular-nums text-secondary" style={{ minWidth: "4.5rem" }}>
                    {standard.code}
                  </span>
                  <span className="text-sm font-light text-white/70">{standard.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── Section 3: Process highlights + drawing types ─────────────────── */}
      <Section variant="surface" className="border-t border-border">
        {service.processHighlights && service.processHighlights.length > 0 && (
          <div className="-mx-6 mb-14 grid grid-cols-2 gap-px bg-border sm:grid-cols-4 border-x border-b border-border">
            {service.processHighlights.map((h) => (
              <div key={h.label} className="bg-surface px-7 py-6">
                <span
                  className="block font-bold text-foreground tabular-nums"
                  style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", letterSpacing: "-0.03em" }}
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

        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Drawing Types We Produce
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
              }}
            >
              Every drawing the<br />occupancy permit needs.
            </h2>
          </div>
          <p className="font-light leading-relaxed text-muted lg:text-lg">
            Fire and life safety drawings document the means of egress, fire-rated assemblies, and life safety system layouts required by the building department before occupancy is granted.
          </p>
        </div>

        {/* Steps as large editorial rows with left orange numbers */}
        <div className="space-y-px border border-border bg-border">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="grid bg-surface lg:grid-cols-[5rem_1fr_2fr]"
            >
              <div className="flex items-start justify-start px-6 py-8 lg:justify-center lg:border-r lg:border-border">
                <span
                  className="font-bold tabular-nums text-secondary leading-none"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", letterSpacing: "-0.04em" }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex items-start px-7 py-8 lg:border-r lg:border-border">
                <h3
                  className="font-bold text-foreground"
                  style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)", letterSpacing: "-0.01em", lineHeight: 1.35 }}
                >
                  {step.title}
                </h3>
              </div>
              <div className="px-7 pb-8 pt-0 lg:py-8">
                <p className="text-sm font-light leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Section 4: Includes gap-as-border grid ────────────────────────── */}
      <Section variant="default" className="border-t border-border">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Deliverables
            </p>
            <h2
              className="font-bold text-foreground"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", letterSpacing: "-0.03em" }}
            >
              What you receive.
            </h2>
          </div>
          <p className="font-light leading-relaxed text-muted">
            Every fire and life safety package is produced to the applicable codes and jurisdiction-specific requirements, formatted for direct building department submission.
          </p>
        </div>

        <div className="grid gap-px bg-border border border-border sm:grid-cols-2">
          {service.includes.map((item, i) => (
            <div key={item.title} className="bg-background px-8 py-8">
              <span
                className="mb-3 block text-[11px] font-medium tabular-nums text-secondary"
                style={{ letterSpacing: "0.06em" }}
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mb-2 text-sm font-semibold text-foreground" style={{ letterSpacing: "-0.01em" }}>
                {item.title}
              </h3>
              <p className="text-sm font-light leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Section 5: Audience as numbered border-bottom rows ────────────── */}
      <Section variant="surface" className="border-t border-border">
        <div className="mb-14">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            Who This Is For
          </p>
          <h2
            className="font-bold text-foreground"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", letterSpacing: "-0.03em" }}
          >
            Projects that require fire and life safety drawings.
          </h2>
        </div>

        <div className="border-t border-border">
          {service.audience.map((item, i) => (
            <div
              key={item.title}
              className="grid gap-6 border-b border-border py-8 sm:grid-cols-[4rem_1fr_2fr] sm:items-start sm:gap-8"
            >
              <span
                className="font-bold tabular-nums text-secondary leading-none"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", letterSpacing: "-0.04em" }}
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3
                className="font-bold text-foreground"
                style={{ fontSize: "0.95rem", letterSpacing: "-0.01em", lineHeight: 1.3 }}
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

      {/* ── Section 6: FAQ ────────────────────────────────────────────────── */}
      {faqs.length > 0 && (
        <Section variant="default" className="border-t border-border">
          <div className="mb-14">
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Common Questions
            </p>
            <h2
              className="font-bold text-foreground"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", letterSpacing: "-0.03em" }}
            >
              Frequently asked.
            </h2>
          </div>
          <div className="divide-y divide-border border border-border">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="grid gap-4 px-8 py-8 lg:grid-cols-[5fr_7fr] lg:gap-16"
              >
                <h3 className="text-sm font-semibold text-foreground">{faq.question}</h3>
                <p className="text-sm font-light leading-relaxed text-muted">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ── Related services ─────────────────────────────────────────────── */}
      {related.length > 0 && (
        <Section variant="surface" className="border-t border-border">
          <div className="mb-12 flex items-end justify-between gap-8">
            <div>
              <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
                Continue Exploring
              </p>
              <h2
                className="font-bold text-foreground"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", letterSpacing: "-0.025em" }}
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

      <CtaBand
        heading="The occupancy permit requires complete fire and life safety drawings."
        subheading="Provide the floor plan, occupancy classification, and jurisdiction. We deliver a complete fire and life safety drawing package built to code."
        primaryAction={{ label: "Order Fire and Life Safety Drawings", href: "/contact" }}
        secondaryAction={{ label: "View All Services", href: "/services" }}
        variant="dark"
      />
    </>
  );
}
