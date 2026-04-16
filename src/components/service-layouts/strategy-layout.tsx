import Link from "next/link";
import { Button } from "@/components/shared/button";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { getRelatedServices } from "@/content/services";
import type { Service } from "@/content/services";

interface Props {
  service: Service;
}

export function StrategyLayout({ service }: Props) {
  const related = getRelatedServices(service);
  const steps = service.steps ?? [];
  const faqs = service.faqs ?? [];

  return (
    <>
      {/* ── Opening statement ─────────────────────────────────────────────── */}
      <Section variant="default">
        <div className="mx-auto max-w-3xl border-b border-border pb-16">
          <p
            className="font-light leading-relaxed text-foreground"
            style={{ fontSize: "clamp(1.15rem, 2.5vw, 1.5rem)", lineHeight: 1.65 }}
          >
            {service.overview}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="/contact" variant="primary" size="lg">
              Start with a Strategy Call
            </Button>
            <Button href="/services" variant="ghost" size="lg">
              View All Services
            </Button>
          </div>
        </div>

        {/* Highlight stats */}
        {service.processHighlights && service.processHighlights.length > 0 && (
          <div className="mt-10 grid grid-cols-2 gap-px bg-border sm:grid-cols-4 border border-border">
            {service.processHighlights.map((h) => (
              <div key={h.label} className="flex flex-col gap-1 bg-background px-7 py-6">
                <span
                  className="font-bold text-foreground tabular-nums"
                  style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", letterSpacing: "-0.03em" }}
                >
                  {h.value}
                </span>
                <span className="text-[11px] font-medium uppercase tracking-widest text-muted">
                  {h.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* ── Six phases ────────────────────────────────────────────────────── */}
      <Section variant="surface" className="border-t border-border">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
              The Engagement
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
              }}
            >
              Six phases.<br />
              One clear roadmap.
            </h2>
          </div>
          <p className="font-light leading-relaxed text-muted lg:text-lg">
            Each phase builds on the last. By the time the roadmap is delivered, every
            unknown has been resolved and every decision point has been defined.
          </p>
        </div>

        <div className="space-y-px border border-border bg-border">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="grid bg-surface lg:grid-cols-[5rem_1fr_2fr] gap-0"
            >
              {/* Phase number */}
              <div className="flex items-start justify-start px-6 py-8 lg:justify-center lg:border-r lg:border-border">
                <span
                  className="font-bold tabular-nums text-secondary leading-none"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", letterSpacing: "-0.04em" }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              {/* Phase title */}
              <div className="flex items-start px-7 py-8 lg:border-r lg:border-border">
                <h3
                  className="font-bold text-foreground"
                  style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)", letterSpacing: "-0.01em", lineHeight: 1.35 }}
                >
                  {step.title}
                </h3>
              </div>
              {/* Phase description */}
              <div className="px-7 pb-8 pt-0 lg:py-8">
                <p className="text-sm font-light leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Why it matters — dark editorial ──────────────────────────────── */}
      <Section variant="dark" className="border-t border-border">
        <div className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:gap-20">
          <div>
            <p className="mb-6 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
              Why This Matters
            </p>
            <p
              className="font-light text-primary-foreground leading-relaxed"
              style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.35rem)", lineHeight: 1.7 }}
            >
              {service.whyItMatters}
            </p>
          </div>
          <div className="flex flex-col justify-center gap-6 rounded-none border border-white/10 bg-white/5 px-8 py-8">
            <p className="text-[11px] font-medium uppercase tracking-widest text-secondary">
              Typical outcome
            </p>
            <ul className="space-y-4">
              {[
                "No surprise permit requirements",
                "Consultants engaged in the right order",
                "Timeline grounded in real approval data",
                "Budget shaped by actual scope",
                "Every decision point defined before production begins",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-light text-white/80">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── Deliverables ─────────────────────────────────────────────────── */}
      <Section variant="default" className="border-t border-border">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
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
            Every strategy engagement delivers a complete written package plus a live briefing session.
            Nothing is left implicit.
          </p>
        </div>

        <div className="grid gap-px bg-border border border-border sm:grid-cols-2 lg:grid-cols-3">
          {service.includes.map((item, i) => (
            <div key={item.title} className="flex flex-col gap-4 bg-background px-8 py-8">
              <div className="flex items-center justify-between">
                <span
                  className="text-[11px] font-medium tabular-nums text-secondary"
                  style={{ letterSpacing: "0.06em" }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {/* Document icon */}
                <svg
                  width="16"
                  height="20"
                  viewBox="0 0 16 20"
                  fill="none"
                  className="text-border"
                  aria-hidden
                >
                  <path
                    d="M2 1h8l4 4v14H2V1z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 1v4h4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path d="M4 9h8M4 12h8M4 15h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-foreground" style={{ letterSpacing: "-0.01em" }}>
                {item.title}
              </h3>
              <p className="text-sm font-light leading-relaxed text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Who it's for ─────────────────────────────────────────────────── */}
      <Section variant="surface" className="border-t border-border">
        <div className="mb-14">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
            Who This Is For
          </p>
          <h2
            className="font-bold text-foreground"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", letterSpacing: "-0.03em" }}
          >
            Built for clients at the beginning.
          </h2>
        </div>
        <div className="grid gap-px bg-border border border-border sm:grid-cols-2">
          {service.audience.map((item) => (
            <div key={item.title} className="flex flex-col gap-3 bg-surface px-8 py-8">
              <div className="flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-secondary shrink-0" aria-hidden />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm font-light leading-relaxed text-muted pl-4">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      {faqs.length > 0 && (
        <Section variant="default" className="border-t border-border">
          <div className="mb-14">
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
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
              <div key={faq.question} className="grid gap-4 px-8 py-8 lg:grid-cols-[2fr_3fr] lg:gap-16">
                <h3 className="text-sm font-semibold text-foreground" style={{ letterSpacing: "-0.01em" }}>
                  {faq.question}
                </h3>
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
                <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
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
              className="hidden shrink-0 text-[11px] font-medium uppercase tracking-wider text-secondary hover:text-foreground lg:block"
            >
              All Services →
            </Link>
          </div>
          <ul className="divide-y divide-border border border-border" role="list">
            {related.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex items-center gap-6 px-7 py-7 transition-colors duration-200 hover:bg-background lg:px-9"
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

      <CtaBand
        heading="Ready to define your project?"
        subheading="Start with a strategy engagement. Know exactly what your project requires before a single drawing is made."
        primaryAction={{ label: "Start a Strategy Engagement", href: "/contact" }}
        secondaryAction={{ label: "View All Services", href: "/services" }}
        variant="dark"
      />
    </>
  );
}
