import Link from "next/link";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { getRelatedServices } from "@/content/services";
import type { Service } from "@/content/services";

interface Props {
  service: Service;
}

export function FeasibilityLayout({ service }: Props) {
  const related = getRelatedServices(service);
  const steps = service.steps ?? [];
  const faqs = service.faqs ?? [];

  return (
    <>
      {/* ── Analysis Grid Header ──────────────────────────────────────────── */}
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
              Six Areas. One Written Report.
            </h2>
            <p className="mt-4 max-w-xl text-sm font-light text-white/60 leading-relaxed">
              Every feasibility study examines the same six analysis areas, applied to your specific parcel, jurisdiction, and proposed project scope.
            </p>
          </div>
        </div>

        {/* Six analysis area cards */}
        {steps.length > 0 && (
          <div className="-mx-6 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3 border-x border-b border-border">
            {steps.map((step, i) => (
              <div key={step.title} className="bg-background px-8 py-7">
                <span
                  className="mb-3 block text-[11px] font-medium tabular-nums text-secondary"
                  style={{ letterSpacing: "0.06em" }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-2 text-[11px] font-medium uppercase tracking-wide text-foreground">
                  {step.title}
                </h3>
                <p className="text-xs font-light leading-relaxed text-muted line-clamp-2">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        )}

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

      {/* ── What We Deliver ───────────────────────────────────────────────── */}
      <Section variant="default" className="border-t border-border">
        {/* Header: left eyebrow + H2 / right overview */}
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Deliverables
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
              }}
            >
              The report you receive.
            </h2>
          </div>
          <p className="font-light leading-relaxed text-muted lg:text-lg">
            {service.overview}
          </p>
        </div>

        {/* Deliverables as horizontal rule list */}
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

      {/* ── Why It Matters ────────────────────────────────────────────────── */}
      <Section variant="dark" className="border-t border-border">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr] lg:gap-20">
          {/* Left: eyebrow + main text */}
          <div>
            <p className="mb-6 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              The Case for Starting Here
            </p>
            <p
              className="font-light text-primary-foreground leading-relaxed"
              style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.35rem)", lineHeight: 1.75 }}
            >
              {service.whyItMatters}
            </p>
          </div>

          {/* Right: bordered avoidance panel */}
          <div className="border border-white/10 bg-white/5 px-8 py-8">
            <p className="mb-5 text-[11px] font-medium uppercase tracking-widest text-secondary">
              What you avoid
            </p>
            <ul className="space-y-4">
              {[
                "Design that misses setback limits",
                "Permits rejected for unpermitted conditions",
                "Variance costs that weren't budgeted",
                "Discretionary review timelines that blow the schedule",
                "Consultant work that precedes feasibility clarity",
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

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      {faqs.length > 0 && (
        <Section variant="surface" className="border-t border-border">
          <div className="mb-14">
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

      {/* ── Who It's For ──────────────────────────────────────────────────── */}
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

      {/* ── Related Services ─────────────────────────────────────────────── */}
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
        heading="Order a feasibility study."
        subheading="Provide the parcel address, jurisdiction, and a brief project description. We handle the research and deliver your written report in 3 to 5 business days."
        primaryAction={{ label: "Request a Study", href: "/contact" }}
        secondaryAction={{ label: "View All Services", href: "/services" }}
        variant="dark"
      />
    </>
  );
}
