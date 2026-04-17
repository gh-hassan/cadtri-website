import Link from "next/link";
import { Button } from "@/components/shared/button";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { getRelatedServices } from "@/content/services";
import type { Service } from "@/content/services";

interface Props {
  service: Service;
}

const KITCHEN_ELEVATION_SVG = (
  <svg
    viewBox="0 0 220 220"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    role="img"
    className="w-full max-w-xs"
  >
    {/* ── Dimension line: top (width) ── */}
    <line x1="28" y1="18" x2="192" y2="18" stroke="#B8A99A" strokeWidth="0.6" />
    <line x1="28" y1="14" x2="28" y2="22" stroke="#B8A99A" strokeWidth="0.6" />
    <line x1="192" y1="14" x2="192" y2="22" stroke="#B8A99A" strokeWidth="0.6" />
    <text x="110" y="14" textAnchor="middle" fontSize="7" fill="#B8A99A" fontFamily="monospace">3600</text>

    {/* ── Dimension line: right (height) ── */}
    <line x1="200" y1="30" x2="200" y2="180" stroke="#B8A99A" strokeWidth="0.6" />
    <line x1="196" y1="30" x2="204" y2="30" stroke="#B8A99A" strokeWidth="0.6" />
    <line x1="196" y1="180" x2="204" y2="180" stroke="#B8A99A" strokeWidth="0.6" />
    <text x="212" y="108" textAnchor="middle" fontSize="7" fill="#B8A99A" fontFamily="monospace" transform="rotate(90,212,108)">2440</text>

    {/* ── Floor line ── */}
    <line x1="24" y1="182" x2="196" y2="182" stroke="#7A6E5F" strokeWidth="1.2" />

    {/* ── Lower cabinets ── */}
    <rect x="28" y="138" width="164" height="44" stroke="#7A6E5F" strokeWidth="1" fill="none" />
    {/* Cabinet doors (lower) */}
    <line x1="69" y1="138" x2="69" y2="182" stroke="#7A6E5F" strokeWidth="0.7" />
    <line x1="110" y1="138" x2="110" y2="182" stroke="#7A6E5F" strokeWidth="0.7" />
    <line x1="151" y1="138" x2="151" y2="182" stroke="#7A6E5F" strokeWidth="0.7" />
    {/* Toe kick */}
    <rect x="28" y="174" width="164" height="8" stroke="#7A6E5F" strokeWidth="0.7" fill="#F5E7C6" />
    {/* Door handles (lower) */}
    <line x1="60" y1="156" x2="60" y2="164" stroke="#7A6E5F" strokeWidth="1" />
    <line x1="101" y1="156" x2="101" y2="164" stroke="#7A6E5F" strokeWidth="1" />
    <line x1="142" y1="156" x2="142" y2="164" stroke="#7A6E5F" strokeWidth="1" />

    {/* ── Countertop ── */}
    <rect x="26" y="133" width="168" height="6" stroke="#7A6E5F" strokeWidth="1" fill="#EDD9B4" />

    {/* ── Backsplash ── */}
    <rect x="28" y="82" width="164" height="51" stroke="#7A6E5F" strokeWidth="0.8" fill="none" />
    {/* Tile grid on backsplash */}
    {[94, 106, 118].map((y) => (
      <line key={y} x1="28" y1={y} x2="192" y2={y} stroke="#B8A99A" strokeWidth="0.4" />
    ))}
    {[55, 82, 110, 137, 165].map((x) => (
      <line key={x} x1={x} y1="82" x2={x} y2="133" stroke="#B8A99A" strokeWidth="0.4" />
    ))}

    {/* ── Upper cabinets ── */}
    <rect x="28" y="30" width="55" height="52" stroke="#7A6E5F" strokeWidth="1" fill="none" />
    <rect x="137" y="30" width="55" height="52" stroke="#7A6E5F" strokeWidth="1" fill="none" />
    {/* Upper cabinet lines */}
    <line x1="28" y1="56" x2="83" y2="56" stroke="#7A6E5F" strokeWidth="0.5" />
    <line x1="137" y1="56" x2="192" y2="56" stroke="#7A6E5F" strokeWidth="0.5" />
    {/* Upper handles */}
    <line x1="52" y1="44" x2="60" y2="44" stroke="#7A6E5F" strokeWidth="1" />
    <line x1="161" y1="44" x2="169" y2="44" stroke="#7A6E5F" strokeWidth="1" />

    {/* ── Window (centered, between upper cabinets) ── */}
    <rect x="88" y="34" width="44" height="38" stroke="#7A6E5F" strokeWidth="1" fill="#EFF8FF" fillOpacity="0.4" />
    <line x1="110" y1="34" x2="110" y2="72" stroke="#7A6E5F" strokeWidth="0.6" />
    <line x1="88" y1="53" x2="132" y2="53" stroke="#7A6E5F" strokeWidth="0.6" />

    {/* ── Callout bubble: countertop CT ── */}
    {/* Leader line from countertop to bubble */}
    <line x1="110" y1="136" x2="148" y2="115" stroke="#FF6D1F" strokeWidth="0.8" />
    <circle cx="155" cy="111" r="10" stroke="#FF6D1F" strokeWidth="1" fill="none" />
    <text x="155" y="115" textAnchor="middle" fontSize="6.5" fill="#FF6D1F" fontFamily="monospace" fontWeight="600">CT</text>
  </svg>
);

const CORRECTIONS_LIST = [
  "Missing waterproofing details on shower pans and wet wall assemblies",
  "Unlabeled cabinet heights triggering ADA review on commercial kitchens",
  "Missing handrail profile and dimensions for stair permit drawings",
  "No fire blocking shown at stair soffit and adjacent wall cavities",
  "Structural header not shown or sized at window openings in bearing walls",
];

export function InteriorLayout({ service }: Props) {
  const related = getRelatedServices(service);
  const steps = service.steps ?? [];
  const faqs = service.faqs ?? [];

  return (
    <>
      {/* ── Section 1: Hero — Detail callout aesthetic ─────────────────────────── */}
      <Section variant="default">
        <div className="grid items-start gap-16 lg:grid-cols-[5fr_3fr]">
          {/* Left: heading + overview + CTAs */}
          <div>
            <p className="mb-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
              Drawings
            </p>
            <h1
              className="font-extrabold text-foreground"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
              }}
            >
              {service.title === "Interior Detail Package"
                ? "Interior drawings built for permit approval."
                : service.title}
            </h1>
            <p
              className="mt-6 font-light leading-relaxed text-muted"
              style={{ fontSize: "clamp(1rem, 1.5vw, 1.125rem)" }}
            >
              {service.overview}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/contact" variant="primary" size="lg">
                Order Interior Drawings
              </Button>
              <Button href="/services" variant="outline" size="lg">
                View All Services
              </Button>
            </div>
          </div>

          {/* Right: kitchen elevation drawing */}
          <div className="flex flex-col items-center border border-border px-8 py-10">
            <p className="mb-6 text-[10px] font-medium uppercase tracking-widest text-muted">
              Kitchen Elevation — Sheet A4.1
            </p>
            {KITCHEN_ELEVATION_SVG}
            <p className="mt-5 text-[10px] font-medium uppercase tracking-widest text-muted">
              Scale 1:50 &middot; NTS
            </p>
          </div>
        </div>
      </Section>

      {/* ── Section 2: Dark editorial — Why interior permits require detail ──────── */}
      <Section variant="dark" className="border-t border-border">
        <div className="grid gap-16 lg:grid-cols-[3fr_2fr] lg:gap-20">
          {/* Left: why it matters */}
          <div>
            <p className="mb-6 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Why This Matters
            </p>
            <p
              className="font-light leading-relaxed text-primary-foreground"
              style={{ fontSize: "clamp(1.05rem, 2vw, 1.3rem)", lineHeight: 1.8 }}
            >
              {service.whyItMatters}
            </p>
          </div>

          {/* Right: bordered corrections panel */}
          <div className="border border-white/10 bg-white/5 px-8 py-8">
            <p className="mb-6 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Common corrections we prevent
            </p>
            <ul className="space-y-5">
              {CORRECTIONS_LIST.map((item) => (
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

      {/* ── Section 3: Detail types covered — gap-as-border grid ─────────────────── */}
      <Section variant="surface" className="border-t border-border">
        <div className="mb-12">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
            Deliverables
          </p>
          <h2
            className="font-bold text-foreground"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Detail types covered.
          </h2>
        </div>

        <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {service.includes.map((item, i) => (
            <div key={item.title} className="bg-surface px-7 py-7">
              <span
                className="mb-3 block text-[11px] font-medium tabular-nums text-secondary"
                style={{ letterSpacing: "0.06em" }}
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3
                className="mb-2 font-semibold text-foreground"
                style={{ fontSize: "0.9rem", letterSpacing: "-0.01em" }}
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

      {/* ── Section 4: Process highlights strip + steps ──────────────────────────── */}
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

        {/* Steps as horizontal-rule rows */}
        {steps.length > 0 && (
          <div>
            <p className="mb-6 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
              How We Work
            </p>
            <div className="divide-y divide-border border-t border-border">
              {steps.map((step, i) => (
                <div
                  key={step.title}
                  className="flex gap-10 border-b border-border py-7"
                >
                  <span
                    className="w-12 shrink-0 font-bold tabular-nums text-secondary"
                    style={{ fontSize: "0.8rem", letterSpacing: "0.06em", paddingTop: "2px" }}
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:gap-10">
                    <h3
                      className="w-full shrink-0 font-semibold text-foreground sm:w-52"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      {step.title}
                    </h3>
                    <p className="flex-1 text-sm font-light leading-relaxed text-muted">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Section>

      {/* ── Section 5: Built for these projects — audience ──────────────────────── */}
      <Section variant="surface" className="border-t border-border">
        <div className="mb-12">
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
            Built for these projects.
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

      {/* ── Section 6: FAQs ──────────────────────────────────────────────────────── */}
      {faqs.length > 0 && (
        <Section variant="default" className="border-t border-border">
          <div className="mb-12">
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Common Questions
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
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
        heading="Interior drawings ready for plan check."
        subheading="Tell us the rooms, jurisdiction, and scope. We deliver complete interior elevation and detail packages in 5 to 7 business days."
        primaryAction={{ label: "Order Interior Drawings", href: "/contact" }}
        secondaryAction={{ label: "View All Services", href: "/services" }}
        variant="dark"
      />
    </>
  );
}
