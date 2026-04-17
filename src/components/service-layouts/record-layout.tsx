import Link from "next/link";
import { Button } from "@/components/shared/button";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { getRelatedServices } from "@/content/services";
import type { Service } from "@/content/services";

interface Props {
  service: Service;
}

// "Approved Set" — a drawing with a rough revision cloud
function ApprovedSetSVG() {
  return (
    <svg
      viewBox="0 0 180 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      className="w-full max-w-[220px]"
    >
      {/* Sheet border */}
      <rect x="10" y="10" width="160" height="120" stroke="#7A6E5F" strokeWidth="1" fill="#FAF3E1" />
      {/* Title block */}
      <rect x="10" y="108" width="160" height="22" stroke="#7A6E5F" strokeWidth="0.8" fill="#F5E7C6" />
      <text x="90" y="122" textAnchor="middle" fontSize="6.5" fill="#7A6E5F" fontFamily="monospace" letterSpacing="0.06em">
        APPROVED SET — PERMIT ISSUANCE
      </text>
      {/* Floor plan lines (simplified) */}
      <rect x="30" y="24" width="120" height="76" stroke="#7A6E5F" strokeWidth="0.8" fill="none" />
      <line x1="30" y1="60" x2="90" y2="60" stroke="#7A6E5F" strokeWidth="0.6" />
      <line x1="90" y1="24" x2="90" y2="100" stroke="#7A6E5F" strokeWidth="0.6" />
      {/* Door swing */}
      <path d="M90 60 A20 20 0 0 1 110 60" stroke="#7A6E5F" strokeWidth="0.5" fill="none" strokeDasharray="2 2" />
      {/* Window lines */}
      <line x1="50" y1="24" x2="70" y2="24" stroke="#7A6E5F" strokeWidth="2" />
      {/* Revision cloud (rough dashed oval) — the messy "problem" state */}
      <ellipse
        cx="90"
        cy="62"
        rx="38"
        ry="28"
        stroke="#B8A99A"
        strokeWidth="1.5"
        strokeDasharray="4 3"
        fill="none"
        opacity="0.7"
      />
      <text x="90" y="66" textAnchor="middle" fontSize="6" fill="#B8A99A" fontFamily="monospace">FIELD CHANGE?</text>
    </svg>
  );
}

// "Record Set" — neat revision deltas and clean revision block
function RecordSetSVG() {
  return (
    <svg
      viewBox="0 0 180 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      className="w-full max-w-[220px]"
    >
      {/* Sheet border */}
      <rect x="10" y="10" width="160" height="120" stroke="#222222" strokeWidth="1" fill="#FAF3E1" />
      {/* Title block */}
      <rect x="10" y="108" width="160" height="22" stroke="#222222" strokeWidth="0.8" fill="#F5E7C6" />
      <text x="90" y="122" textAnchor="middle" fontSize="6.5" fill="#222222" fontFamily="monospace" letterSpacing="0.06em">
        RECORD SET — AS-BUILT CONDITIONS
      </text>
      {/* Floor plan lines (same base) */}
      <rect x="30" y="24" width="120" height="76" stroke="#222222" strokeWidth="0.8" fill="none" />
      <line x1="30" y1="60" x2="90" y2="60" stroke="#222222" strokeWidth="0.6" />
      <line x1="90" y1="24" x2="90" y2="100" stroke="#222222" strokeWidth="0.6" />
      {/* Updated door swing */}
      <path d="M90 60 A20 20 0 0 1 110 60" stroke="#222222" strokeWidth="0.5" fill="none" strokeDasharray="2 2" />
      {/* Window lines */}
      <line x1="50" y1="24" x2="70" y2="24" stroke="#222222" strokeWidth="2" />
      {/* Revision delta triangle 1 */}
      <polygon points="60,95 66,85 72,95" stroke="#FF6D1F" strokeWidth="1" fill="none" />
      <text x="66" y="93" textAnchor="middle" fontSize="5.5" fill="#FF6D1F" fontFamily="monospace" fontWeight="700">1</text>
      {/* Revision delta triangle 2 */}
      <polygon points="110,36 116,26 122,36" stroke="#FF6D1F" strokeWidth="1" fill="none" />
      <text x="116" y="34" textAnchor="middle" fontSize="5.5" fill="#FF6D1F" fontFamily="monospace" fontWeight="700">2</text>
      {/* Revision block (top-right corner) */}
      <rect x="130" y="14" width="36" height="40" stroke="#FF6D1F" strokeWidth="0.8" fill="none" />
      <line x1="130" y1="22" x2="166" y2="22" stroke="#FF6D1F" strokeWidth="0.5" />
      <line x1="130" y1="30" x2="166" y2="30" stroke="#FF6D1F" strokeWidth="0.5" />
      <line x1="130" y1="38" x2="166" y2="38" stroke="#FF6D1F" strokeWidth="0.5" />
      <text x="148" y="20" textAnchor="middle" fontSize="4.5" fill="#FF6D1F" fontFamily="monospace">REV</text>
      <text x="148" y="28" textAnchor="middle" fontSize="4.5" fill="#7A6E5F" fontFamily="monospace">01</text>
      <text x="148" y="36" textAnchor="middle" fontSize="4.5" fill="#7A6E5F" fontFamily="monospace">02</text>
    </svg>
  );
}

const APPROVED_SET_ITEMS = [
  "Drawings approved at permit issuance",
  "Reflects design intent, not field conditions",
  "Revision clouds from plan check responses only",
  "Does not account for RFI responses or field changes",
];

const RECORD_SET_ITEMS = [
  "Field changes incorporated and coordinated",
  "Revision bubbles and deltas on all modified sheets",
  "Signed and dated revision block on each affected sheet",
  "Jurisdiction-ready for CO submission",
];

const TRIGGER_ITEMS = [
  "Structural changes made during construction by the contractor or engineer",
  "MEP routing changes from approved layout due to field conditions",
  "Window or door relocations that affected light, egress, or structure",
  "Room use changes that affect occupancy load or code classification",
  "Dimension changes affecting setbacks, height limits, or lot coverage",
];

export function RecordLayout({ service }: Props) {
  const related = getRelatedServices(service);
  const steps = service.steps ?? [];
  const faqs = service.faqs ?? [];

  return (
    <>
      {/* ── Section 1: Centered editorial opening ────────────────────────────────── */}
      <Section variant="default">
        <div className="max-w-3xl">
          <p className="mb-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
            Drawings
          </p>
          <h1
            className="font-extrabold text-foreground"
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}
          >
            The approved drawings need to match what was built.
          </h1>
          <p
            className="mt-6 max-w-2xl font-light leading-relaxed text-muted"
            style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)" }}
          >
            {service.overview}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/contact" variant="primary" size="lg">
              Order Record Drawing Updates
            </Button>
            <Button href="/services" variant="outline" size="lg">
              View All Services
            </Button>
          </div>
        </div>

        {/* Process highlights strip */}
        {service.processHighlights && service.processHighlights.length > 0 && (
          <div className="mt-14 grid grid-cols-2 divide-x divide-border border border-border sm:grid-cols-4">
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
      </Section>

      {/* ── Section 2: Before and after — two-column split ───────────────────────── */}
      <Section variant="surface" className="border-t border-border">
        <div className="mb-12">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
            The Problem We Solve
          </p>
          <h2
            className="font-bold text-foreground"
            style={{
              fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
              letterSpacing: "-0.03em",
            }}
          >
            Before and after.
          </h2>
        </div>

        <div className="grid divide-y divide-border border border-border lg:grid-cols-2 lg:divide-x lg:divide-y-0">
          {/* Left: Approved Set */}
          <div className="px-10 py-10">
            <p
              className="mb-6 font-semibold uppercase tracking-wider text-muted"
              style={{ fontSize: "0.8rem" }}
            >
              Approved Set
            </p>
            <div className="mb-8 flex justify-center">
              <ApprovedSetSVG />
            </div>
            <ul className="space-y-3">
              {APPROVED_SET_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted opacity-60"
                    aria-hidden
                  />
                  <span className="text-sm font-light leading-relaxed text-muted">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Record Set */}
          <div className="bg-background px-10 py-10">
            <p
              className="mb-6 font-semibold uppercase tracking-wider text-secondary"
              style={{ fontSize: "0.8rem" }}
            >
              Record Set
            </p>
            <div className="mb-8 flex justify-center">
              <RecordSetSVG />
            </div>
            <ul className="space-y-3">
              {RECORD_SET_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary"
                    aria-hidden
                  />
                  <span className="text-sm font-light leading-relaxed text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── Section 3: Dark — Why it matters + what triggers record drawings ──────── */}
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
              What triggers a record drawing requirement
            </p>
            <ul className="space-y-4">
              {TRIGGER_ITEMS.map((item) => (
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

      {/* ── Section 4: Steps — editorial rows ────────────────────────────────────── */}
      {steps.length > 0 && (
        <Section variant="default" className="border-t border-border">
          <div className="mb-10">
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
              How It Works
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
                letterSpacing: "-0.03em",
              }}
            >
              From approved set to CO-ready record.
            </h2>
          </div>
          <div className="border-t border-border">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="flex gap-8 border-b border-border py-7"
              >
                <span
                  className="w-12 shrink-0 font-bold tabular-nums text-secondary"
                  style={{ fontSize: "0.8rem", letterSpacing: "0.06em", paddingTop: "2px" }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:gap-10">
                  <h3 className="w-full shrink-0 font-semibold text-foreground sm:w-52" style={{ letterSpacing: "-0.01em" }}>
                    {step.title}
                  </h3>
                  <p className="flex-1 text-sm font-light leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ── Section 5: Includes — 2-col gap-as-border grid ───────────────────────── */}
      <Section variant="surface" className="border-t border-border">
        <div className="mb-12">
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
            What every record package includes.
          </h2>
        </div>
        <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
          {service.includes.map((item, i) => (
            <div key={item.title} className="bg-background px-8 py-8">
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

      {/* ── Section 6: Audience — numbered definition rows ───────────────────────── */}
      <Section variant="default" className="border-t border-border">
        <div className="mb-10">
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
            Who brings us in.
          </h2>
        </div>
        <div className="divide-y divide-border border-t border-border">
          {service.audience.map((item, i) => (
            <div key={item.title} className="flex gap-8 py-7">
              <span
                className="w-10 shrink-0 font-bold tabular-nums text-secondary"
                style={{ fontSize: "0.8rem", letterSpacing: "0.06em", paddingTop: "2px" }}
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="mb-1 text-sm font-semibold uppercase tracking-wider text-foreground">
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

      {/* ── FAQs ──────────────────────────────────────────────────────────────────── */}
      {faqs.length > 0 && (
        <Section variant="surface" className="border-t border-border">
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
        heading="Close out the project. Get the CO."
        subheading="Provide the approved drawing set and documentation of field changes. We update the record set and deliver drawings ready for final inspection."
        primaryAction={{ label: "Order Record Drawing Updates", href: "/contact" }}
        secondaryAction={{ label: "View All Services", href: "/services" }}
        variant="dark"
      />
    </>
  );
}
