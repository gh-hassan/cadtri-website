import Link from "next/link";
import { Button } from "@/components/shared/button";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { getRelatedServices } from "@/content/services";
import type { Service } from "@/content/services";

interface Props {
  service: Service;
}

// Full-width overhead site plan SVG
function SitePlanSVG() {
  return (
    <svg
      viewBox="0 0 700 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      className="w-full"
      style={{ background: "#FAF3E1" }}
    >
      {/* ── Property lines (dashed outer rectangle) ── */}
      <rect
        x="28"
        y="16"
        width="644"
        height="168"
        stroke="#7A6E5F"
        strokeWidth="1.2"
        strokeDasharray="8 4"
        fill="none"
      />

      {/* ── Setback lines (orange, very subtle dashed) ── */}
      <rect
        x="70"
        y="44"
        width="484"
        height="112"
        stroke="#FF6D1F"
        strokeWidth="0.8"
        strokeDasharray="6 4"
        strokeOpacity="0.35"
        fill="none"
      />

      {/* ── Building footprint ── */}
      <rect
        x="130"
        y="60"
        width="320"
        height="80"
        stroke="#222222"
        strokeWidth="1.5"
        fill="#F5E7C6"
      />
      {/* Building label */}
      <text
        x="290"
        y="103"
        textAnchor="middle"
        fontSize="8.5"
        fill="#222222"
        fontFamily="monospace"
        fontWeight="600"
        letterSpacing="0.08em"
      >
        STRUCTURE
      </text>

      {/* ── Parking stalls (bottom-right) ── */}
      <rect x="570" y="110" width="82" height="56" stroke="#7A6E5F" strokeWidth="0.8" fill="none" />
      <line x1="597" y1="110" x2="597" y2="166" stroke="#7A6E5F" strokeWidth="0.6" />
      <line x1="624" y1="110" x2="624" y2="166" stroke="#7A6E5F" strokeWidth="0.6" />
      <text x="611" y="108" textAnchor="middle" fontSize="6" fill="#7A6E5F" fontFamily="monospace" letterSpacing="0.06em">
        PARKING
      </text>

      {/* ── North arrow (top-right) ── */}
      <line x1="654" y1="40" x2="654" y2="22" stroke="#222222" strokeWidth="1.2" />
      <polygon points="654,18 650,26 654,24 658,26" fill="#222222" />
      <text x="654" y="46" textAnchor="middle" fontSize="7" fill="#222222" fontFamily="monospace" fontWeight="700">N</text>

      {/* ── Dimension: top setback ── */}
      <line x1="28" y1="8" x2="70" y2="8" stroke="#B8A99A" strokeWidth="0.6" />
      <line x1="28" y1="5" x2="28" y2="11" stroke="#B8A99A" strokeWidth="0.6" />
      <line x1="70" y1="5" x2="70" y2="11" stroke="#B8A99A" strokeWidth="0.6" />
      <text x="49" y="6" textAnchor="middle" fontSize="6" fill="#B8A99A" fontFamily="monospace">5&apos;-0&quot;</text>

      {/* ── Dimension: left setback ── */}
      <line x1="18" y1="16" x2="18" y2="44" stroke="#B8A99A" strokeWidth="0.6" />
      <line x1="15" y1="16" x2="21" y2="16" stroke="#B8A99A" strokeWidth="0.6" />
      <line x1="15" y1="44" x2="21" y2="44" stroke="#B8A99A" strokeWidth="0.6" />
      <text
        x="10"
        y="32"
        textAnchor="middle"
        fontSize="6"
        fill="#B8A99A"
        fontFamily="monospace"
        transform="rotate(-90,10,32)"
      >
        5&apos;-0&quot;
      </text>

      {/* ── Dimension: right setback ── */}
      <line x1="682" y1="16" x2="682" y2="44" stroke="#B8A99A" strokeWidth="0.6" />
      <line x1="679" y1="16" x2="685" y2="16" stroke="#B8A99A" strokeWidth="0.6" />
      <line x1="679" y1="44" x2="685" y2="44" stroke="#B8A99A" strokeWidth="0.6" />
      <text
        x="692"
        y="32"
        textAnchor="middle"
        fontSize="6"
        fill="#B8A99A"
        fontFamily="monospace"
        transform="rotate(90,692,32)"
      >
        5&apos;-0&quot;
      </text>

      {/* ── Property corner monument ── */}
      <circle cx="28" cy="184" r="3" stroke="#7A6E5F" strokeWidth="0.8" fill="none" />
      <line x1="26" y1="182" x2="30" y2="186" stroke="#7A6E5F" strokeWidth="0.5" />
      <line x1="30" y1="182" x2="26" y2="186" stroke="#7A6E5F" strokeWidth="0.5" />

      {/* ── Labels ── */}
      <text x="36" y="193" fontSize="6.5" fill="#7A6E5F" fontFamily="monospace" letterSpacing="0.08em">PROPERTY LINE</text>
      <text x="75" y="42" fontSize="5.5" fill="#FF6D1F" fillOpacity="0.6" fontFamily="monospace" letterSpacing="0.06em">BLDG SETBACK</text>
      <text x="456" y="68" fontSize="5.5" fill="#7A6E5F" fontFamily="monospace" letterSpacing="0.06em">EXISTING TREE (TYP)</text>

      {/* ── Trees (circles, top-right) ── */}
      <circle cx="510" cy="52" r="10" stroke="#7A6E5F" strokeWidth="0.7" strokeDasharray="3 2" fill="none" />
      <circle cx="534" cy="52" r="8" stroke="#7A6E5F" strokeWidth="0.7" strokeDasharray="3 2" fill="none" />

      {/* ── Access drive ── */}
      <rect x="280" y="140" width="30" height="44" stroke="#7A6E5F" strokeWidth="0.7" fill="#EDD9B4" fillOpacity="0.6" />
      <text x="295" y="190" textAnchor="middle" fontSize="5.5" fill="#7A6E5F" fontFamily="monospace" letterSpacing="0.06em">ACCESS</text>
    </svg>
  );
}

const RESEARCH_ITEMS = [
  "Current GIS parcel data and recorded dimensions from county records",
  "Applicable setback requirements per zoning district and overlay",
  "Utility easement locations from title report and recorded maps",
  "Drainage and grading requirements from civil jurisdiction standards",
  "Parking minimums and ADA stall requirements under municipal code",
];

const REQUIRED_ELEMENTS = [
  "Property lines and dimensions",
  "Existing and proposed structures",
  "Setbacks from all property lines",
  "Utilities and easements",
  "Parking layout and count",
  "Drainage and grading",
  "Access and circulation",
  "North arrow and scale",
];

export function SiteplanLayout({ service }: Props) {
  const related = getRelatedServices(service);
  const steps = service.steps ?? [];
  const faqs = service.faqs ?? [];

  return (
    <>
      {/* ── Section 1: Hero with dark strip + site plan SVG ──────────────────────── */}
      <Section variant="surface" className="!py-0 overflow-hidden border-b border-border">
        {/* Dark header strip */}
        <div className="-mx-6 bg-primary px-6 py-14">
          <div className="container mx-auto max-w-container">
            <h1
              className="font-extrabold text-primary-foreground"
              style={{
                fontSize: "clamp(1.75rem, 5vw, 3.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
              }}
            >
              The site plan that clears first review.
            </h1>
            <p className="mt-4 max-w-2xl text-base font-light text-white/60 leading-relaxed">
              {service.tagline}
            </p>
          </div>
        </div>

        {/* Site plan SVG — full container width */}
        <div className="-mx-6 border-b border-border">
          <SitePlanSVG />
        </div>
      </Section>

      {/* ── Section 2: Process highlights + overview split ───────────────────────── */}
      <Section variant="default" className="border-t border-border">
        {/* Highlights strip */}
        {service.processHighlights && service.processHighlights.length > 0 && (
          <div className="mb-14 grid grid-cols-2 divide-x divide-border border border-border sm:grid-cols-4">
            {service.processHighlights.map((h) => (
              <div key={h.label} className="px-7 py-6">
                <span
                  className="block font-bold text-foreground tabular-nums"
                  style={{ fontSize: "2rem", letterSpacing: "-0.03em" }}
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

        {/* Two-column layout: overview left, checklist right */}
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
              Overview
            </p>
            <h2
              className="mb-6 font-bold text-foreground"
              style={{
                fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
              }}
            >
              Site plans built to jurisdiction standards.
            </h2>
            <p className="font-light leading-relaxed text-muted lg:text-lg">
              {service.overview}
            </p>
            <div className="mt-8">
              <Button href="/contact" variant="primary" size="md">
                Order a Site Plan Package
              </Button>
            </div>
          </div>

          {/* Required elements checklist */}
          <div className="border border-border bg-surface px-8 py-8">
            <p className="mb-6 text-[11px] font-medium uppercase tracking-widest text-secondary">
              What every site plan must show
            </p>
            <ul className="space-y-3">
              {REQUIRED_ELEMENTS.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-secondary"
                    aria-hidden
                  />
                  <span className="text-sm font-light text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── Section 3: Dark — Why it matters + what we research ──────────────────── */}
      <Section variant="dark" className="border-t border-border">
        <div className="grid gap-16 lg:grid-cols-[3fr_2fr] lg:gap-20">
          {/* Left */}
          <div>
            <p className="mb-6 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Why It Matters
            </p>
            <p
              className="font-light leading-relaxed text-primary-foreground"
              style={{ fontSize: "clamp(1.05rem, 2vw, 1.3rem)", lineHeight: 1.8 }}
            >
              {service.whyItMatters}
            </p>
          </div>

          {/* Right */}
          <div className="border border-white/10 bg-white/5 px-8 py-8">
            <p className="mb-6 text-[11px] font-medium uppercase tracking-widest text-secondary">
              What we research before we draw
            </p>
            <ul className="space-y-4">
              {RESEARCH_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary"
                    aria-hidden
                  />
                  <span className="text-sm font-light leading-relaxed text-white/70">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── Section 4: Steps — large vertical timeline ───────────────────────────── */}
      {steps.length > 0 && (
        <Section variant="surface" className="border-t border-border">
          <div className="mb-12">
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
              The Process
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              From parcel research to submission.
            </h2>
          </div>

          <ol role="list" className="relative">
            {/* Vertical connector line */}
            <div
              className="absolute left-4 top-8 w-px bg-border"
              style={{ bottom: "2rem" }}
              aria-hidden
            />
            <div className="space-y-0">
              {steps.map((step, i) => (
                <li
                  key={step.title}
                  className="relative flex gap-8 pb-12 last:pb-0"
                >
                  {/* Step number square */}
                  <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center bg-secondary text-xs font-bold text-white">
                    {i + 1}
                  </div>
                  <div className="pt-1">
                    <h3
                      className="mb-2 font-semibold text-foreground"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-sm font-light leading-relaxed text-muted">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </div>
          </ol>
        </Section>
      )}

      {/* ── Section 5: Includes — horizontal-rule rows ───────────────────────────── */}
      <Section variant="default" className="border-t border-border">
        <div className="mb-10">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            Deliverables
          </p>
          <h2
            className="font-bold text-foreground"
            style={{
              fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
              letterSpacing: "-0.03em",
            }}
          >
            What every package includes.
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

      {/* ── Section 6: Audience — gap-as-border grid ─────────────────────────────── */}
      <Section variant="surface" className="border-t border-border">
        <div className="mb-12">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
            Designed For
          </p>
          <h2
            className="font-bold text-foreground"
            style={{
              fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
              letterSpacing: "-0.03em",
            }}
          >
            Who this serves.
          </h2>
        </div>
        <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
          {service.audience.map((item) => (
            <div key={item.title} className="bg-background px-8 py-8">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden />
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

      {/* ── FAQs ──────────────────────────────────────────────────────────────────── */}
      {faqs.length > 0 && (
        <Section variant="default" className="border-t border-border">
          <div className="mb-12">
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Common Questions
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Frequently asked.
            </h2>
          </div>
          <dl className="divide-y divide-border border border-border">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="grid gap-4 px-8 py-8 lg:grid-cols-[5fr_7fr] lg:gap-16"
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

      {/* ── Related Services ─────────────────────────────────────────────────────── */}
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

      <CtaBand
        heading="The site plan that passes first review."
        subheading="Provide the parcel address, jurisdiction, and scope of site work. We handle parcel research and deliver a complete site plan package."
        primaryAction={{ label: "Order a Site Plan Package", href: "/contact" }}
        secondaryAction={{ label: "View All Services", href: "/services" }}
        variant="dark"
      />
    </>
  );
}
