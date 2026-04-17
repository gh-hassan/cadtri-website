import Link from "next/link";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { Button } from "@/components/shared/button";
import type { Service } from "@/content/services";
import { getRelatedServices } from "@/content/services";

interface Props {
  service: Service;
}

export function AdditionLayout({ service }: Props) {
  const related = getRelatedServices(service);

  return (
    <>
      {/* ── 1. Addition Type Showcase ─────────────────────────────────────────── */}
      <Section variant="surface">
        <div className="mb-12 border-b border-border pb-12">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            Scope Coverage
          </p>
          <h2
            className="font-bold text-3xl text-foreground sm:text-4xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            Eight addition types. One complete permit package.
          </h2>
        </div>

        {/* Addition type chips */}
        {service.useCases && service.useCases.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {service.useCases.map((useCase) => (
              <span
                key={useCase}
                className="inline-flex items-center gap-2 border border-border bg-background px-5 py-3 text-sm font-medium text-foreground"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden />
                {useCase}
              </span>
            ))}
          </div>
        )}

        {/* Process highlights grid */}
        {service.processHighlights && service.processHighlights.length > 0 && (
          <div className="mt-12 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">
            {service.processHighlights.map((highlight) => (
              <div key={highlight.label} className="bg-background px-6 py-5">
                <p className="text-2xl font-bold tabular-nums text-foreground">
                  {highlight.value}
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-widest text-muted">
                  {highlight.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* ── 2. How We Work — Numbered timeline ────────────────────────────────── */}
      {service.steps && service.steps.length > 0 && (
        <Section variant="default" className="border-t border-border">
          <div className="mb-12 border-b border-border pb-12">
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              The Process
            </p>
            <h2
              className="font-bold text-3xl text-foreground sm:text-4xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              From site to submission.
            </h2>
          </div>

          <ol role="list" className="space-y-0">
            {service.steps.map((step, i) => (
              <li
                key={step.title}
                className="grid grid-cols-[3rem_1fr] gap-6 border-b border-border py-8 first:border-t first:border-border"
              >
                <span
                  className="text-3xl font-extrabold tabular-nums text-secondary"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-base font-bold text-foreground">{step.title}</p>
                  <p className="mt-2 text-sm font-light leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {/* ── 3. What's Included ────────────────────────────────────────────────── */}
      <Section variant="surface" className="border-t border-border">
        <div className="mb-12 border-b border-border pb-12">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            Deliverables
          </p>
          <h2
            className="font-bold text-3xl text-foreground sm:text-4xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            What every package includes.
          </h2>
        </div>

        <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {service.includes.map((item, i) => (
            <div key={item.title} className="bg-background px-8 py-8">
              <p className="text-[11px] font-medium tabular-nums text-secondary">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-2 text-sm font-bold text-foreground">{item.title}</p>
              <p className="mt-2 text-sm font-light leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 4. Why It Matters ─────────────────────────────────────────────────── */}
      <Section variant="dark" className="border-t border-border">
        <div className="grid gap-14 lg:grid-cols-5 lg:gap-20">

          {/* Left 3/5 */}
          <div className="lg:col-span-3">
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Why Additions Fail Plan Check
            </p>
            <p className="text-lg font-light leading-relaxed text-primary-foreground">
              {service.whyItMatters}
            </p>
            <div className="mt-8">
              <Button href="/contact" variant="primary" size="md" className="cursor-pointer">
                Request a Package
              </Button>
            </div>
          </div>

          {/* Right 2/5 */}
          <div className="border border-white/20 lg:col-span-2">
            <div className="border-b border-white/20 px-7 py-5">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-primary-foreground">
                Common rejection reasons
              </p>
            </div>
            <ul role="list" className="flex flex-col gap-5 px-7 py-7">
              {[
                "Setback violations not caught before submission",
                "Existing conditions incorrectly documented",
                "Missing coordination between existing and new structure",
                "Energy compliance omitted for conditioned additions",
                "Jurisdiction-specific sheet requirements not met",
              ].map((reason) => (
                <li key={reason} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden />
                  <span className="text-sm font-light text-white/75">{reason}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </Section>

      {/* ── 5. FAQ ────────────────────────────────────────────────────────────── */}
      {service.faqs && service.faqs.length > 0 && (
        <Section variant="default" className="border-t border-border">
          <div className="mb-12 grid items-end gap-8 border-b border-border pb-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
                Common Questions
              </p>
              <h2
                className="font-bold text-3xl text-foreground sm:text-4xl"
                style={{ letterSpacing: "-0.03em" }}
              >
                Frequently asked.
              </h2>
            </div>
            <p className="font-light leading-relaxed text-muted">
              Still have questions? Contact us and we will answer them directly before you submit an inquiry.
            </p>
          </div>

          <dl className="divide-y divide-border border border-border">
            {service.faqs.map((faq) => (
              <div key={faq.question} className="grid gap-4 px-8 py-8 lg:grid-cols-[2fr_3fr] lg:gap-16">
                <dt className="font-medium text-foreground">{faq.question}</dt>
                <dd className="text-sm font-light leading-relaxed text-muted">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </Section>
      )}

      {/* ── 6. Who It's For ───────────────────────────────────────────────────── */}
      <Section variant="surface" className="border-t border-border">
        <div className="mb-12 border-b border-border pb-12">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            Designed For
          </p>
          <h2
            className="font-bold text-3xl text-foreground sm:text-4xl"
            style={{ letterSpacing: "-0.03em" }}
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
                <p className="mt-1 text-sm font-light text-muted">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── 7. Related Services ───────────────────────────────────────────────── */}
      {related.length > 0 && (
        <Section variant="default" className="border-t border-border">
          <div className="mb-12 flex items-end justify-between gap-8">
            <div>
              <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
                Continue Exploring
              </p>
              <h2
                className="font-bold text-2xl text-foreground sm:text-3xl"
                style={{ letterSpacing: "-0.03em" }}
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
        heading="Ready to permit your addition?"
        subheading="Share your project scope, jurisdiction, and any existing drawings. We confirm the package contents and timeline before starting."
        primaryAction={{ label: "Request a Package", href: "/contact" }}
        variant="dark"
      />
    </>
  );
}
