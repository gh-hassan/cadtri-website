import Link from "next/link";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { Button } from "@/components/shared/button";
import type { Service } from "@/content/services";
import { getRelatedServices } from "@/content/services";

interface Props {
  service: Service;
}

export function ProcessLayout({ service }: Props) {
  const related = getRelatedServices(service);

  return (
    <>
      {/* ── Overview + Highlights ─────────────────────────────────────────────── */}
      <Section variant="default">
        <div className="grid gap-14 lg:grid-cols-[3fr_2fr] lg:gap-20">

          {/* Overview */}
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
              Overview
            </p>
            <p className="font-light leading-relaxed text-foreground sm:text-lg">
              {service.overview}
            </p>
            <div className="mt-8">
              <Button href="/contact" variant="primary" size="md">
                Request a Proposal
              </Button>
            </div>
          </div>

          {/* Process highlights — stat boxes */}
          {service.processHighlights && service.processHighlights.length > 0 && (
            <div className="flex flex-col divide-y divide-border border border-border">
              {service.processHighlights.map((h) => (
                <div key={h.label} className="flex flex-col gap-1.5 px-7 py-6">
                  <p className="text-[10px] font-medium uppercase tracking-widest text-secondary">
                    {h.label}
                  </p>
                  <p
                    className="font-bold text-2xl text-foreground"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {h.value}
                  </p>
                </div>
              ))}
            </div>
          )}

        </div>
      </Section>

      {/* ── How it works — large numbered steps ──────────────────────────────── */}
      {service.steps && service.steps.length > 0 && (
        <Section variant="surface" className="border-t border-border">

          <div className="mb-14 border-b border-border pb-14">
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
              How It Works
            </p>
            <h2
              className="font-bold text-3xl text-foreground sm:text-4xl"
              style={{ letterSpacing: "-0.025em" }}
            >
              The process, step by step.
            </h2>
          </div>

          <ol role="list" className="flex flex-col gap-0">
            {service.steps.map((step, i) => (
              <li
                key={step.title}
                className="grid grid-cols-[3rem_1fr] gap-x-8 border-b border-border py-10 first:border-t lg:grid-cols-[5rem_1fr] lg:gap-x-12"
              >
                {/* Big number */}
                <div className="pt-0.5">
                  <span
                    className="block font-bold tabular-nums text-secondary"
                    style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.04em", lineHeight: 1 }}
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2">
                  <h3
                    className="font-bold text-xl text-foreground"
                    style={{ letterSpacing: "-0.015em" }}
                  >
                    {step.title}
                  </h3>
                  <p className="font-light leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>

        </Section>
      )}

      {/* ── What's included ──────────────────────────────────────────────────── */}
      <Section variant="default" className="border-t border-border">
        <div className="mb-12 grid items-end gap-8 border-b border-border pb-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
              Deliverables
            </p>
            <h2
              className="font-bold text-3xl text-foreground sm:text-4xl"
              style={{ letterSpacing: "-0.025em" }}
            >
              What&apos;s included.
            </h2>
          </div>
          <p className="font-light leading-relaxed text-muted">
            Every engagement includes the following deliverables. Scope is confirmed at intake based on project requirements.
          </p>
        </div>

        {/* Horizontal rule list */}
        <ul role="list" className="flex flex-col divide-y divide-border border-b border-border">
          {service.includes.map((item) => (
            <li
              key={item.title}
              className="grid gap-3 py-7 lg:grid-cols-[14rem_1fr] lg:gap-12"
            >
              <p className="text-[11px] font-semibold uppercase tracking-wider text-foreground">
                {item.title}
              </p>
              <p className="text-sm font-light leading-relaxed text-muted">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── Who it's for — cards ─────────────────────────────────────────────── */}
      <Section variant="surface" className="border-t border-border">
        <div className="mb-12 border-b border-border pb-12">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
            Designed For
          </p>
          <h2
            className="font-bold text-3xl text-foreground sm:text-4xl"
            style={{ letterSpacing: "-0.025em" }}
          >
            Who this service is for.
          </h2>
        </div>

        <div className="grid gap-px border-x border-b border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {service.audience.map((item, i) => (
            <div key={item.title} className="flex flex-col gap-3 bg-surface px-8 py-8">
              <span
                className="text-[10px] font-medium tabular-nums text-secondary"
                style={{ letterSpacing: "0.08em" }}
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

      {/* ── Related services ─────────────────────────────────────────────────── */}
      {related.length > 0 && (
        <Section variant="default" className="border-t border-border">
          <div className="mb-12 flex items-end justify-between gap-8">
            <div>
              <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
                <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
                Continue Exploring
              </p>
              <h2
                className="font-bold text-2xl text-foreground sm:text-3xl"
                style={{ letterSpacing: "-0.025em" }}
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
                  className="group flex items-center gap-6 px-7 py-7 transition-colors duration-200 hover:bg-surface lg:px-9"
                >
                  <span className="min-w-[5rem] text-[10px] font-medium uppercase tracking-widest text-muted">
                    {s.category}
                  </span>
                  <div className="flex-1">
                    <p className="font-bold text-base text-foreground transition-colors duration-200 group-hover:text-secondary" style={{ letterSpacing: "-0.01em" }}>
                      {s.title}
                    </p>
                    <p className="mt-1 text-sm font-light text-muted">{s.tagline}</p>
                  </div>
                  <span className="shrink-0 text-secondary transition-transform duration-200 group-hover:translate-x-1" aria-hidden>→</span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <CtaBand
        heading="Ready to get started?"
        subheading="Tell us your project scope and we will confirm the timeline, deliverables, and next steps."
        primaryAction={{ label: "Request a Proposal", href: "/contact" }}
        secondaryAction={{ label: "View All Services", href: "/services" }}
        variant="dark"
      />
    </>
  );
}
