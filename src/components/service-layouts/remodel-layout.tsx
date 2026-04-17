import Link from "next/link";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { Button } from "@/components/shared/button";
import type { Service } from "@/content/services";
import { getRelatedServices } from "@/content/services";

interface Props {
  service: Service;
}

export function RemodelLayout({ service }: Props) {
  const related = getRelatedServices(service);

  return (
    <>
      {/* ── 1. Split Intro ────────────────────────────────────────────────────── */}
      <Section variant="default">
        <div className="grid items-end gap-12 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">

          {/* Left: overview text */}
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              {service.category}
            </p>
            <p className="text-lg font-light leading-relaxed text-muted">
              {service.overview}
            </p>
          </div>

          {/* Right: vertical scope indicator + CTA */}
          <div>
            {service.processHighlights && service.processHighlights.length > 0 && (
              <div className="mb-8 border border-border">
                <div className="border-b border-border px-6 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-foreground">
                    Project Scope
                  </p>
                </div>
                <ul role="list" className="divide-y divide-border">
                  {service.processHighlights.map((highlight) => (
                    <li
                      key={highlight.label}
                      className="flex items-center justify-between gap-6 px-6 py-4"
                    >
                      <span className="text-xs uppercase tracking-wide text-muted">
                        {highlight.label}
                      </span>
                      <span className="font-bold text-secondary">
                        {highlight.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <Button href="/contact" variant="primary" size="md">
              Request a Proposal
            </Button>
          </div>

        </div>
      </Section>

      {/* ── 2. Remodel Scope Grid ─────────────────────────────────────────────── */}
      {service.useCases && service.useCases.length > 0 && (
        <Section variant="surface">
          <div className="mb-12 border-b border-border pb-12">
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Scope Types
            </p>
            <h2
              className="font-bold text-3xl text-foreground sm:text-4xl"
              style={{ letterSpacing: "-0.025em" }}
            >
              Remodel types we document.
            </h2>
          </div>

          <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {service.useCases.map((useCase, i) => (
              <div
                key={useCase}
                className="flex items-start gap-4 border-l-2 border-secondary bg-background px-6 py-6"
              >
                <span
                  className="shrink-0 text-[11px] font-medium tabular-nums text-secondary"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-bold text-sm text-foreground">{useCase}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ── 3. 4-Step Process ─────────────────────────────────────────────────── */}
      {service.steps && service.steps.length > 0 && (
        <Section variant="default">
          <div className="mb-12 border-b border-border pb-12">
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              How We Work
            </p>
            <h2
              className="font-bold text-3xl text-foreground sm:text-4xl"
              style={{ letterSpacing: "-0.025em" }}
            >
              From intake to permit-ready drawings.
            </h2>
          </div>

          {/* Horizontal 4-col on desktop, vertical timeline on mobile */}
          <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
            {service.steps.map((step, i) => (
              <div
                key={step.title}
                className="border-b border-border pb-8 pt-0 lg:border-b-0 lg:border-r lg:px-8 lg:pb-0 lg:pt-0 first:lg:pl-0 last:lg:border-r-0 last:lg:pr-0"
              >
                {/* Orange top bar */}
                <div className="mb-6 h-0.5 w-10 bg-secondary" />
                {/* Step number */}
                <p className="mb-3 text-[11px] font-medium tabular-nums text-secondary">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mb-3 font-bold text-foreground">{step.title}</p>
                <p className="text-sm font-light leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ── 4. Deliverables ───────────────────────────────────────────────────── */}
      <Section variant="surface">
        <div className="mb-12 border-b border-border pb-12">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            Deliverables
          </p>
          <h2
            className="font-bold text-3xl text-foreground sm:text-4xl"
            style={{ letterSpacing: "-0.025em" }}
          >
            What every package includes.
          </h2>
        </div>

        <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {service.includes.map((item) => (
            <div key={item.title} className="bg-background px-7 py-7">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-foreground">
                {item.title}
              </p>
              <p className="mt-3 text-sm font-light leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 5. Why It Matters ─────────────────────────────────────────────────── */}
      <Section variant="dark">
        <div className="max-w-2xl">
          <p className="mb-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            Why It Matters
          </p>
          <p className="text-lg font-light leading-relaxed text-primary-foreground">
            {service.whyItMatters}
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="text-sm font-medium uppercase tracking-wider text-secondary transition-colors duration-200 hover:text-primary-foreground"
            >
              Request a Proposal →
            </Link>
          </div>
        </div>
      </Section>

      {/* ── 6. FAQ ────────────────────────────────────────────────────────────── */}
      {service.faqs && service.faqs.length > 0 && (
        <Section variant="default">
          <div className="mb-12 border-b border-border pb-12">
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Common Questions
            </p>
            <h2
              className="font-bold text-3xl text-foreground sm:text-4xl"
              style={{ letterSpacing: "-0.025em" }}
            >
              Frequently asked.
            </h2>
          </div>

          <ul role="list" className="divide-y divide-border">
            {service.faqs.map((faq) => (
              <li key={faq.question} className="border-b border-border py-6 first:border-t first:border-border">
                <p className="text-sm font-semibold uppercase tracking-wider text-foreground">
                  {faq.question}
                </p>
                <p className="mt-3 text-sm font-light leading-relaxed text-muted">
                  {faq.answer}
                </p>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* ── 7. Who It's For ───────────────────────────────────────────────────── */}
      <Section variant="surface">
        <div className="mb-12 border-b border-border pb-12">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            Designed For
          </p>
          <h2
            className="font-bold text-3xl text-foreground sm:text-4xl"
            style={{ letterSpacing: "-0.025em" }}
          >
            Who this serves.
          </h2>
        </div>

        <ul role="list" className="divide-y divide-border border-b border-t border-border">
          {service.audience.map((item, i) => (
            <li key={item.title} className="flex gap-5 py-7">
              <span
                className="shrink-0 text-[11px] font-medium tabular-nums text-secondary"
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-foreground">
                  {item.title}
                </p>
                <p className="mt-1 text-sm font-light leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── 8. Related Services ───────────────────────────────────────────────── */}
      {related.length > 0 && (
        <Section variant="default">
          <div className="mb-12 flex items-end justify-between gap-8">
            <div>
              <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
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
        heading="Ready to document your remodel?"
        subheading="Share your project scope and jurisdiction. We confirm the drawing package and timeline before we start."
        primaryAction={{ label: "Request a Proposal", href: "/contact" }}
        variant="dark"
      />
    </>
  );
}
