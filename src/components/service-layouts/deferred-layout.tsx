import Link from "next/link";
import { Button } from "@/components/shared/button";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { getRelatedServices } from "@/content/services";
import type { Service } from "@/content/services";

interface Props {
  service: Service;
}

export function DeferredLayout({ service }: Props) {
  const related = getRelatedServices(service);
  const steps = service.steps ?? [];
  const faqs = service.faqs ?? [];

  const deferredItems = [
    "Prefabricated stair assemblies",
    "Structural steel connection details",
    "Curtain wall and storefront systems",
    "Pre-engineered wood trusses",
    "Fire suppression sprinkler layout",
    "Elevator and conveying systems",
    "Special inspection programs",
    "Seismic restraint documentation",
  ];

  return (
    <>
      {/* ── Section 1: Systems architecture header ────────────────────────── */}
      <Section variant="surface" className="border-b border-border !py-0 overflow-hidden">
        {/* Dark charcoal strip */}
        <div className="-mx-6 bg-primary px-6 py-16">
          <div className="container mx-auto max-w-container">
            <p className="mb-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
              Drawings
            </p>
            <h1
              className="max-w-3xl font-extrabold text-primary-foreground"
              style={{
                fontSize: "clamp(1.85rem, 4.5vw, 3.25rem)",
                letterSpacing: "-0.04em",
                lineHeight: 1.0,
              }}
            >
              The main permit issued. The specialty systems still need approval.
            </h1>
            <p className="mt-5 max-w-xl text-base font-light leading-relaxed text-white/60">
              {service.tagline}
            </p>
          </div>
        </div>

        {/* Building cross-section systems hierarchy */}
        <div className="-mx-6 bg-background px-6 py-8">
          <div className="container mx-auto max-w-container">
            <p className="mb-5 text-[10px] font-medium uppercase tracking-widest text-muted">
              Building systems requiring deferred submittal approval
            </p>
            <svg
              viewBox="0 0 640 160"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-2xl"
              aria-label="Building cross-section diagram showing structural, MEP, curtain wall, and fire suppression systems"
            >
              {/* ── Defs: hatch patterns ── */}
              <defs>
                {/* Diagonal hatch — structural */}
                <pattern id="structural-hatch" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="6" stroke="#E2D4B8" strokeWidth="1.2" />
                </pattern>
                {/* Horizontal hatch — MEP */}
                <pattern id="mep-hatch" patternUnits="userSpaceOnUse" width="6" height="6">
                  <line x1="0" y1="3" x2="6" y2="3" stroke="#E2D4B8" strokeWidth="1" />
                </pattern>
                {/* Vertical hatch — curtain wall */}
                <pattern id="cw-hatch" patternUnits="userSpaceOnUse" width="5" height="5">
                  <line x1="2.5" y1="0" x2="2.5" y2="5" stroke="#E2D4B8" strokeWidth="1" />
                </pattern>
              </defs>

              {/* ── Building outline ── */}
              <rect x="60" y="10" width="320" height="130" stroke="#7A6E5F" strokeWidth="1.5" fill="none" />

              {/* ── Structural base zone (diagonal hatch) ── */}
              <rect x="60" y="100" width="320" height="40" fill="url(#structural-hatch)" />
              <rect x="60" y="100" width="320" height="40" stroke="#E2D4B8" strokeWidth="0.5" fill="none" />

              {/* ── MEP middle zone (horizontal hatch) ── */}
              <rect x="60" y="55" width="220" height="45" fill="url(#mep-hatch)" />
              <rect x="60" y="55" width="220" height="45" stroke="#E2D4B8" strokeWidth="0.5" fill="none" />

              {/* ── Curtain wall facade (vertical hatch) ── */}
              <rect x="280" y="10" width="100" height="90" fill="url(#cw-hatch)" />
              <rect x="280" y="10" width="100" height="90" stroke="#E2D4B8" strokeWidth="0.5" fill="none" />

              {/* ── Fire suppression dots at ceiling zone ── */}
              {[80, 100, 120, 140, 160, 180, 200, 220, 240].map((cx) => (
                <circle key={cx} cx={cx} cy="22" r="2.5" fill="none" stroke="#E2D4B8" strokeWidth="1" />
              ))}
              {/* suppression drop lines */}
              {[80, 100, 120, 140, 160, 180, 200, 220, 240].map((cx) => (
                <line key={`drop-${cx}`} x1={cx} y1="24" x2={cx} y2="34" stroke="#E2D4B8" strokeWidth="0.75" />
              ))}

              {/* ── Label bracket lines ── */}
              {/* Structural */}
              <line x1="380" y1="120" x2="420" y2="120" stroke="#7A6E5F" strokeWidth="0.75" />
              <line x1="420" y1="100" x2="420" y2="140" stroke="#7A6E5F" strokeWidth="0.75" />
              <line x1="420" y1="120" x2="440" y2="120" stroke="#7A6E5F" strokeWidth="0.75" />
              <text x="444" y="124" fontSize="8" fill="#7A6E5F" fontFamily="monospace">STRUCTURAL</text>

              {/* MEP */}
              <line x1="280" y1="77" x2="420" y2="77" stroke="#7A6E5F" strokeWidth="0.75" strokeDasharray="3 2" />
              <line x1="420" y1="55" x2="420" y2="99" stroke="#7A6E5F" strokeWidth="0.75" />
              <line x1="420" y1="77" x2="440" y2="77" stroke="#7A6E5F" strokeWidth="0.75" />
              <text x="444" y="81" fontSize="8" fill="#7A6E5F" fontFamily="monospace">MEP SYSTEMS</text>

              {/* Curtain wall */}
              <line x1="380" y1="45" x2="420" y2="45" stroke="#7A6E5F" strokeWidth="0.75" strokeDasharray="3 2" />
              <line x1="420" y1="10" x2="420" y2="55" stroke="#7A6E5F" strokeWidth="0.75" />
              <line x1="420" y1="33" x2="440" y2="33" stroke="#7A6E5F" strokeWidth="0.75" />
              <text x="444" y="37" fontSize="8" fill="#7A6E5F" fontFamily="monospace">CURTAIN WALL</text>

              {/* Fire suppression */}
              <line x1="240" y1="22" x2="420" y2="18" stroke="#7A6E5F" strokeWidth="0.75" strokeDasharray="3 2" />
              <text x="444" y="12" fontSize="8" fill="#FF6D1F" fontFamily="monospace">FIRE SUPPRESSION</text>

              {/* ── Floor lines ── */}
              <line x1="60" y1="55" x2="380" y2="55" stroke="#E2D4B8" strokeWidth="0.75" />
              <line x1="60" y1="100" x2="380" y2="100" stroke="#E2D4B8" strokeWidth="0.75" />

              {/* ── Windows on non-curtain-wall facade ── */}
              <rect x="75" y="65" width="40" height="25" stroke="#E2D4B8" strokeWidth="0.75" fill="none" />
              <rect x="130" y="65" width="40" height="25" stroke="#E2D4B8" strokeWidth="0.75" fill="none" />
              <rect x="185" y="65" width="40" height="25" stroke="#E2D4B8" strokeWidth="0.75" fill="none" />

              {/* ── Door ── */}
              <rect x="155" y="108" width="30" height="32" stroke="#E2D4B8" strokeWidth="0.75" fill="none" />
            </svg>
          </div>
        </div>
      </Section>

      {/* ── Section 2: Definition grid ────────────────────────────────────── */}
      <Section variant="default" className="border-t border-border">
        <div className="mb-14">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
            What Deferred Submittals Cover
          </p>
          <h2
            className="font-bold text-foreground"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
            }}
          >
            Each system is a separate package.
          </h2>
        </div>

        {steps.length > 0 && (
          <div className="grid gap-px bg-border border border-border sm:grid-cols-2">
            {steps.map((step, i) => (
              <div key={step.title} className="bg-background px-8 py-8">
                <span
                  className="mb-3 block font-bold tabular-nums text-secondary"
                  style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.05em", lineHeight: 1 }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className="mb-3 font-semibold text-foreground"
                  style={{ fontSize: "0.95rem", letterSpacing: "-0.01em" }}
                >
                  {step.title}
                </h3>
                <p className="text-sm font-light leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* ── Section 3: Dark — why it matters + common items ───────────────── */}
      <Section variant="dark" className="border-t border-border">
        <div className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16">
          <div>
            <p className="mb-6 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Why It Matters
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
              Common deferred submittal items
            </p>
            <ul className="space-y-3">
              {deferredItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-light text-white/70">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── Section 4: Process highlights + includes ──────────────────────── */}
      <Section variant="surface" className="border-t border-border">
        {/* Process highlights strip */}
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
              The Submission Process
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
              }}
            >
              From fabricator specs<br />to building department.
            </h2>
          </div>
          <p className="font-light leading-relaxed text-muted lg:text-lg">
            {service.overview}
          </p>
        </div>

        {/* Includes as horizontal-rule rows */}
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
                <h3 className="w-full shrink-0 text-sm font-semibold uppercase tracking-wider text-foreground sm:w-56">
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

      {/* ── Section 5: Audience ───────────────────────────────────────────── */}
      <Section variant="default" className="border-t border-border">
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
            Built for these project roles.
          </h2>
        </div>
        <div className="border-t border-border">
          {service.audience.map((item, i) => (
            <div
              key={item.title}
              className="flex gap-8 border-b border-border py-7"
            >
              <span
                className="w-8 shrink-0 font-bold tabular-nums text-secondary"
                style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)", letterSpacing: "-0.04em", lineHeight: 1.1 }}
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:gap-10">
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

      {/* ── Section 6: FAQ ────────────────────────────────────────────────── */}
      {faqs.length > 0 && (
        <Section variant="surface" className="border-t border-border">
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
                <h3 className="text-sm font-semibold text-foreground">
                  {faq.question}
                </h3>
                <p className="text-sm font-light leading-relaxed text-muted">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ── Related services ─────────────────────────────────────────────── */}
      {related.length > 0 && (
        <Section variant="default" className="border-t border-border">
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
        heading="The specialty system needs its own submittal."
        subheading="Tell us the system type, jurisdiction, and fabricator specs available. We assemble the deferred submittal package for building department review."
        primaryAction={{ label: "Start a Deferred Submittal", href: "/contact" }}
        secondaryAction={{ label: "View All Services", href: "/services" }}
        variant="dark"
      />
    </>
  );
}
