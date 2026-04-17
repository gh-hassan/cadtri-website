import Link from "next/link";
import { Button } from "@/components/shared/button";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { getRelatedServices } from "@/content/services";
import type { Service } from "@/content/services";

interface Props {
  service: Service;
}

const signTypes = [
  {
    label: "Channel Letters",
    description: "Individual 3D letters mounted to fascia",
    icon: (
      <svg viewBox="0 0 48 32" fill="none" className="mb-3 h-8 w-auto" aria-hidden>
        {/* 3D block letter A shape */}
        <polygon points="10,28 18,8 26,28" stroke="#7A6E5F" strokeWidth="1.5" fill="none" />
        <line x1="12.5" y1="22" x2="23.5" y2="22" stroke="#7A6E5F" strokeWidth="1.5" />
        <rect x="30" y="8" width="8" height="20" rx="0" stroke="#7A6E5F" strokeWidth="1.5" fill="none" />
        <line x1="30" y1="17" x2="38" y2="17" stroke="#7A6E5F" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: "Monument Sign",
    description: "Freestanding ground-mounted structure",
    icon: (
      <svg viewBox="0 0 48 32" fill="none" className="mb-3 h-8 w-auto" aria-hidden>
        {/* Monument: rectangle panel on base */}
        <rect x="8" y="4" width="32" height="18" stroke="#7A6E5F" strokeWidth="1.5" fill="none" />
        <line x1="8" y1="22" x2="16" y2="28" stroke="#7A6E5F" strokeWidth="1.5" />
        <line x1="40" y1="22" x2="32" y2="28" stroke="#7A6E5F" strokeWidth="1.5" />
        <line x1="16" y1="28" x2="32" y2="28" stroke="#7A6E5F" strokeWidth="1.5" />
        <line x1="12" y1="28" x2="36" y2="28" stroke="#7A6E5F" strokeWidth="2" />
      </svg>
    ),
  },
  {
    label: "Blade Sign",
    description: "Perpendicular projection from wall",
    icon: (
      <svg viewBox="0 0 48 32" fill="none" className="mb-3 h-8 w-auto" aria-hidden>
        {/* Vertical rectangle perpendicular to wall */}
        <line x1="8" y1="4" x2="8" y2="28" stroke="#7A6E5F" strokeWidth="1.5" />
        <rect x="8" y="10" width="28" height="14" stroke="#7A6E5F" strokeWidth="1.5" fill="none" />
        <line x1="8" y1="17" x2="4" y2="17" stroke="#7A6E5F" strokeWidth="1" strokeDasharray="2 1.5" />
      </svg>
    ),
  },
  {
    label: "Awning Sign",
    description: "Fabric or metal canopy with signage",
    icon: (
      <svg viewBox="0 0 48 32" fill="none" className="mb-3 h-8 w-auto" aria-hidden>
        {/* Trapezoid awning shape */}
        <polygon points="4,10 44,10 38,24 10,24" stroke="#7A6E5F" strokeWidth="1.5" fill="none" />
        <line x1="4" y1="10" x2="2" y2="26" stroke="#7A6E5F" strokeWidth="1" />
        <line x1="44" y1="10" x2="46" y2="26" stroke="#7A6E5F" strokeWidth="1" />
        <line x1="14" y1="17" x2="34" y2="17" stroke="#7A6E5F" strokeWidth="1" strokeDasharray="2 1.5" />
      </svg>
    ),
  },
  {
    label: "Window Graphics",
    description: "Vinyl or painted window lettering",
    icon: (
      <svg viewBox="0 0 48 32" fill="none" className="mb-3 h-8 w-auto" aria-hidden>
        {/* Rectangle window with diagonal fill lines */}
        <rect x="6" y="4" width="36" height="24" stroke="#7A6E5F" strokeWidth="1.5" fill="none" />
        <line x1="6" y1="12" x2="42" y2="12" stroke="#E2D4B8" strokeWidth="1" />
        <line x1="6" y1="20" x2="42" y2="20" stroke="#E2D4B8" strokeWidth="1" />
        <line x1="20" y1="4" x2="20" y2="28" stroke="#E2D4B8" strokeWidth="1" />
        <line x1="30" y1="4" x2="30" y2="28" stroke="#E2D4B8" strokeWidth="1" />
        {/* Lettering suggestion */}
        <line x1="14" y1="15" x2="18" y2="15" stroke="#7A6E5F" strokeWidth="1" />
        <line x1="22" y1="15" x2="26" y2="15" stroke="#7A6E5F" strokeWidth="1" />
        <line x1="32" y1="15" x2="36" y2="15" stroke="#7A6E5F" strokeWidth="1" />
      </svg>
    ),
  },
];

const documentedItems = [
  "Sign dimensions and area calculation",
  "Mounting height and clearances from grade",
  "Illumination type and wattage",
  "Structural attachment method",
  "Electrical connection details",
  "Material specifications",
  "Site plan showing sign location",
];

export function SignageLayout({ service }: Props) {
  const related = getRelatedServices(service);
  const steps = service.steps ?? [];
  const faqs = service.faqs ?? [];

  return (
    <>
      {/* ── Section 1: Dark strip + storefront SVG ────────────────────────── */}
      <Section variant="surface" className="border-b border-border !py-0 overflow-hidden">
        {/* Dark charcoal strip */}
        <div className="-mx-6 bg-primary px-6 py-14">
          <div className="container mx-auto max-w-container">
            <p className="mb-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
              Drawings
            </p>
            <h1
              className="max-w-2xl font-extrabold text-primary-foreground"
              style={{
                fontSize: "clamp(1.85rem, 4.5vw, 3.25rem)",
                letterSpacing: "-0.04em",
                lineHeight: 1.0,
              }}
            >
              The permit between you and the sign going up.
            </h1>
            <p className="mt-5 max-w-xl text-base font-light leading-relaxed text-white/60">
              {service.tagline}
            </p>
          </div>
        </div>

        {/* Commercial storefront elevation SVG */}
        <div className="-mx-6 bg-background px-6 py-8">
          <div className="container mx-auto max-w-container">
            <p className="mb-4 text-[10px] font-medium uppercase tracking-widest text-muted">
              Signage permit drawing reference
            </p>
            <svg
              viewBox="0 0 640 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-3xl"
              aria-label="Commercial storefront elevation showing sign locations, dimensions, and clearances"
            >
              {/* ── Building outline ── */}
              <rect x="20" y="20" width="500" height="150" stroke="#7A6E5F" strokeWidth="1.5" fill="none" />

              {/* ── Fascia band at top ── */}
              <rect x="20" y="20" width="500" height="50" stroke="#7A6E5F" strokeWidth="1" fill="#F5E7C6" />

              {/* ── Primary sign panel on fascia ── */}
              <rect x="80" y="28" width="280" height="36" stroke="#222222" strokeWidth="1.5" fill="white" />
              <text x="145" y="51" fontSize="14" fill="#222222" fontFamily="monospace" fontWeight="700" letterSpacing="3">CADTRI</text>
              <text x="80" y="72" fontSize="6.5" fill="#7A6E5F" fontFamily="monospace">PRIMARY FASCIA SIGN</text>

              {/* ── Blade sign (perpendicular) ── */}
              <rect x="520" y="28" width="70" height="38" stroke="#FF6D1F" strokeWidth="1" fill="none" />
              <line x1="520" y1="28" x2="520" y2="66" stroke="#222222" strokeWidth="2" />
              <text x="525" y="52" fontSize="7" fill="#7A6E5F" fontFamily="monospace" transform="rotate(-90, 525, 52)">BLADE</text>
              <text x="525" y="72" fontSize="6.5" fill="#FF6D1F" fontFamily="monospace">BLADE SIGN</text>

              {/* ── Windows ── */}
              <rect x="40" y="90" width="110" height="60" stroke="#E2D4B8" strokeWidth="1" fill="none" />
              <rect x="180" y="90" width="110" height="60" stroke="#E2D4B8" strokeWidth="1" fill="none" />
              <rect x="320" y="90" width="110" height="60" stroke="#E2D4B8" strokeWidth="1" fill="none" />

              {/* ── Door ── */}
              <rect x="456" y="100" width="44" height="70" stroke="#E2D4B8" strokeWidth="1" fill="none" />
              {/* Door knob */}
              <circle cx="494" cy="135" r="2" fill="#E2D4B8" />

              {/* ── Dimension: sign height from grade ── */}
              <line x1="615" y1="20" x2="615" y2="66" stroke="#FF6D1F" strokeWidth="1" />
              <line x1="610" y1="20" x2="620" y2="20" stroke="#FF6D1F" strokeWidth="1" />
              <line x1="610" y1="66" x2="620" y2="66" stroke="#FF6D1F" strokeWidth="1" />
              <text x="618" y="47" fontSize="7" fill="#FF6D1F" fontFamily="monospace" transform="rotate(90, 618, 47)">HT FROM GRADE</text>

              {/* ── Dimension: sign width ── */}
              <line x1="80" y1="10" x2="360" y2="10" stroke="#FF6D1F" strokeWidth="1" />
              <line x1="80" y1="6" x2="80" y2="14" stroke="#FF6D1F" strokeWidth="1" />
              <line x1="360" y1="6" x2="360" y2="14" stroke="#FF6D1F" strokeWidth="1" />
              <text x="190" y="8" fontSize="7" fill="#FF6D1F" fontFamily="monospace">SIGN WIDTH</text>

              {/* ── Dimension: wall projection (blade) ── */}
              <line x1="520" y1="15" x2="590" y2="15" stroke="#FF6D1F" strokeWidth="1" />
              <line x1="520" y1="11" x2="520" y2="19" stroke="#FF6D1F" strokeWidth="1" />
              <line x1="590" y1="11" x2="590" y2="19" stroke="#FF6D1F" strokeWidth="1" />
              <text x="528" y="13" fontSize="7" fill="#FF6D1F" fontFamily="monospace">PROJECTION</text>

              {/* ── PERMIT AREA callouts ── */}
              <text x="370" y="44" fontSize="6.5" fill="#7A6E5F" fontFamily="monospace">PERMIT AREA</text>
              <line x1="370" y1="38" x2="360" y2="32" stroke="#7A6E5F" strokeWidth="0.75" strokeDasharray="2 1.5" />
            </svg>
          </div>
        </div>
      </Section>

      {/* ── Section 2: Sign types — 5-col grid ────────────────────────────── */}
      <Section variant="default" className="border-t border-border">
        <div className="mb-10">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
            Sign Types We Permit
          </p>
          <h2
            className="font-bold text-foreground"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
            }}
          >
            Every sign type. Every jurisdiction.
          </h2>
        </div>

        <div className="grid grid-cols-2 divide-x divide-y divide-border border border-border sm:grid-cols-5 sm:divide-y-0">
          {signTypes.map((type) => (
            <div key={type.label} className="px-6 py-8">
              {type.icon}
              <h3
                className="mb-1 font-semibold text-foreground"
                style={{ fontSize: "0.85rem", letterSpacing: "-0.01em" }}
              >
                {type.label}
              </h3>
              <p className="text-xs font-light leading-relaxed text-muted">
                {type.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Section 3: Process highlights + overview split ────────────────── */}
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

        <div className="grid items-end gap-12 border-b border-border pb-14 lg:grid-cols-[3fr_2fr] lg:gap-20">
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              What the Building Department Needs to See
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
              }}
            >
              Precisely documented.<br />Built for approval.
            </h2>
          </div>
          <p className="font-light leading-relaxed text-muted lg:text-base">
            {service.overview}
          </p>
        </div>
      </Section>

      {/* ── Section 4: Dark — why it matters + documented items ───────────── */}
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
              What we document for each sign
            </p>
            <ul className="space-y-3">
              {documentedItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-light text-white/70">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── Section 5: Steps as horizontal editorial rows ─────────────────── */}
      <Section variant="default" className="border-t border-border">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              How We Work
            </p>
            <h2
              className="font-bold text-foreground"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", letterSpacing: "-0.03em" }}
            >
              From specs to submittal.
            </h2>
          </div>
          <p className="font-light leading-relaxed text-muted">
            A signage permit package includes everything the building department needs to review the installation without requesting additional documentation.
          </p>
        </div>

        <div className="border-t border-border">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="flex gap-8 border-b border-border py-7"
            >
              <span
                className="w-8 shrink-0 font-bold tabular-nums text-secondary leading-none"
                style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", letterSpacing: "-0.04em" }}
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:gap-10">
                <h3 className="w-full shrink-0 text-sm font-semibold uppercase tracking-wider text-foreground sm:w-52">
                  {step.title}
                </h3>
                <p className="text-sm font-light leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Section 6: Includes horizontal-rule rows ──────────────────────── */}
      <Section variant="surface" className="border-t border-border">
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
            A complete signage permit package built to the jurisdiction requirements, ready for submission by the sign fabricator or contractor.
          </p>
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

      {/* ── Section 7: Audience — gap-as-border grid ──────────────────────── */}
      <Section variant="default" className="border-t border-border">
        <div className="mb-14">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            Who This Is For
          </p>
          <h2
            className="font-bold text-foreground"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", letterSpacing: "-0.03em" }}
          >
            Built for these clients.
          </h2>
        </div>
        <div className="grid gap-px bg-border border border-border sm:grid-cols-2">
          {service.audience.map((item) => (
            <div key={item.title} className="flex flex-col gap-3 bg-background px-8 py-8">
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

      {/* ── Section 8: FAQ ────────────────────────────────────────────────── */}
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
                <h3 className="text-sm font-semibold text-foreground">{faq.question}</h3>
                <p className="text-sm font-light leading-relaxed text-muted">{faq.answer}</p>
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
        heading="The permit that lets the sign go up."
        subheading="Tell us the sign type, location, jurisdiction, and landlord approval status. We handle the drawings and submittal package."
        primaryAction={{ label: "Order Signage Permit Drawings", href: "/contact" }}
        secondaryAction={{ label: "View All Services", href: "/services" }}
        variant="dark"
      />
    </>
  );
}
