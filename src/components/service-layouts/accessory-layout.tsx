import Link from "next/link";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { Button } from "@/components/shared/button";
import { getRelatedServices, getServiceBySlug } from "@/content/services";

type ServiceType = NonNullable<ReturnType<typeof getServiceBySlug>>;

export function AccessoryLayout({ service }: { service: ServiceType }) {
  const related = getRelatedServices(service);

  return (
    <>
      {/* ── 1. Catalog Header ─────────────────────────────────────────────────── */}
      <Section variant="default">
        <div className="grid items-end gap-14 lg:grid-cols-[3fr_2fr] lg:gap-20">

          {/* Left: eyebrow + heading + overview */}
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Accessory Structure Permits
            </p>
            <h2
              className="mb-7 font-bold text-4xl text-foreground sm:text-5xl"
              style={{ letterSpacing: "-0.025em" }}
            >
              Accessory structure permits. Done right.
            </h2>
            <p className="max-w-prose font-light leading-relaxed text-muted">
              {service.overview}
            </p>
          </div>

          {/* Right: stat block + CTA */}
          {service.processHighlights && service.processHighlights.length > 0 && (
            <div className="self-start">
              <div className="grid grid-cols-2 gap-4">
                {service.processHighlights.map((highlight) => (
                  <div
                    key={highlight.label}
                    className="border border-border bg-surface px-6 py-6"
                  >
                    <p
                      className="text-3xl font-bold tabular-nums text-secondary"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      {highlight.value}
                    </p>
                    <p className="mt-2 text-[10px] font-medium uppercase tracking-widest text-muted">
                      {highlight.label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Button href="/contact" variant="primary" size="md">
                  Request a Proposal
                </Button>
              </div>
            </div>
          )}

        </div>
      </Section>

      {/* ── 2. Structure Type Catalog ─────────────────────────────────────────── */}
      {service.useCases && service.useCases.length > 0 && (
        <Section variant="surface" className="border-t border-border">
          <div className="mb-12 border-b border-border pb-12">
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Coverage
            </p>
            <h2
              className="font-bold text-3xl text-foreground sm:text-4xl"
              style={{ letterSpacing: "-0.025em" }}
            >
              Structure Types.
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">
            {service.useCases.map((useCase, i) => (
              <div
                key={useCase}
                className="relative border-0 bg-background px-6 py-8 transition-colors duration-150 hover:bg-surface"
              >
                <p
                  className="mb-3 text-[11px] font-medium tabular-nums text-secondary"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="text-xs font-bold uppercase tracking-wider text-foreground leading-snug text-center">
                  {useCase}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ── 3. Process Steps ──────────────────────────────────────────────────── */}
      {service.steps && service.steps.length > 0 && (
        <Section variant="default" className="border-t border-border">
          <div className="mb-14 border-b border-border pb-12">
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              How It Works
            </p>
            <h2
              className="font-bold text-3xl text-foreground sm:text-4xl"
              style={{ letterSpacing: "-0.025em" }}
            >
              From scope to permit-ready set.
            </h2>
          </div>

          <ol role="list" className="divide-y divide-border border-b border-border">
            {service.steps.map((step, i) => (
              <li key={step.title} className="relative flex items-start gap-8 py-10 lg:gap-16">
                {/* Large decorative step number */}
                <span
                  className="hidden shrink-0 select-none text-[80px] font-extrabold leading-none text-secondary/15 lg:block"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Mobile step indicator */}
                <span
                  className="mt-1 shrink-0 text-[11px] font-medium tabular-nums text-secondary lg:hidden"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Step content */}
                <div className="flex-1 pt-1">
                  <p
                    className="mb-3 text-base font-bold text-foreground"
                    style={{ letterSpacing: "-0.015em" }}
                  >
                    {step.title}
                  </p>
                  <p className="max-w-prose font-light leading-relaxed text-muted text-sm">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {/* ── 4. Deliverables ───────────────────────────────────────────────────── */}
      <Section variant="surface" className="border-t border-border">
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
          {service.includes.map((item, i) => (
            <div key={item.title} className="bg-background px-7 py-7">
              <p className="mb-3 text-[10px] font-medium uppercase tracking-widest text-muted">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-foreground">
                {item.title}
              </p>
              <p className="text-sm font-light leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 5. Site Compliance Callout ────────────────────────────────────────── */}
      <Section variant="dark" className="border-t border-border">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-24">

          {/* Left: why it matters */}
          <div>
            <p className="mb-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Why It Matters
            </p>
            <p className="text-lg font-light leading-relaxed text-primary-foreground">
              {service.whyItMatters}
            </p>
            <div className="mt-10">
              <Button href="/contact" variant="secondary" size="md">
                Request a Proposal
              </Button>
            </div>
          </div>

          {/* Right: every package includes highlight box */}
          {service.processHighlights && service.processHighlights.length > 0 && (
            <div className="self-start border border-white/20">
              <div className="border-b border-white/20 px-7 py-5">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-primary-foreground">
                  Every package includes
                </p>
              </div>
              <ul role="list" className="flex flex-col divide-y divide-white/10">
                {service.processHighlights.slice(0, 3).map((highlight) => (
                  <li key={highlight.label} className="flex items-start gap-4 px-7 py-5">
                    <span
                      aria-hidden
                    />
                    <div>
                      <span className="text-sm font-semibold tabular-nums text-secondary">
                        {highlight.value}
                      </span>
                      <span className="ml-2 text-sm font-light text-white/70">
                        {highlight.label}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </Section>

      {/* ── 6. FAQ ────────────────────────────────────────────────────────────── */}
      {service.faqs && service.faqs.length > 0 && (
        <Section variant="default" className="border-t border-border">
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

          <dl className="divide-y divide-border border-b border-t border-border">
            {service.faqs.map((faq) => (
              <div key={faq.question} className="py-6 lg:grid lg:grid-cols-[2fr_3fr] lg:gap-16">
                <dt className="mb-3 font-bold text-sm text-foreground lg:mb-0">
                  {faq.question}
                </dt>
                <dd className="text-sm font-light leading-relaxed text-muted">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </Section>
      )}

      {/* ── 7. Audience + Related Services ───────────────────────────────────── */}
      <Section variant="surface" className="border-t border-border">
        <div className="grid gap-16 lg:grid-cols-[3fr_2fr] lg:gap-24">

          {/* Left: audience */}
          <div>
            <p className="mb-6 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Designed For
            </p>
            <h2
              className="mb-10 font-bold text-2xl text-foreground sm:text-3xl"
              style={{ letterSpacing: "-0.025em" }}
            >
              Who this serves.
            </h2>
            <ul role="list" className="divide-y divide-border border-b border-t border-border">
              {service.audience.map((item, i) => (
                <li key={item.title} className="flex gap-5 py-7">
                  <span
                    className="shrink-0 pt-0.5 text-[11px] font-medium tabular-nums text-secondary"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-foreground">
                      {item.title}
                    </p>
                    <p className="mt-1.5 text-sm font-light leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: related services */}
          {related.length > 0 && (
            <div>
              <div className="mb-6 flex items-center justify-between">
                <p className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
                  Related Services
                </p>
                <Link
                  href="/services"
                  className="text-[11px] font-medium uppercase tracking-wider text-muted transition-colors duration-200 hover:text-foreground"
                >
                  All &rarr;
                </Link>
              </div>
              <ul className="divide-y divide-border border border-border" role="list">
                {related.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="group flex cursor-pointer items-center gap-5 px-6 py-6 transition-colors duration-200 hover:bg-background"
                    >
                      <div className="flex-1">
                        <p className="mb-0.5 text-[10px] font-medium uppercase tracking-widest text-muted">
                          {s.category}
                        </p>
                        <p
                          className="text-sm font-bold text-foreground transition-colors duration-200 group-hover:text-secondary"
                          style={{ letterSpacing: "-0.01em" }}
                        >
                          {s.title}
                        </p>
                      </div>
                      <span
                        className="shrink-0 text-secondary transition-transform duration-200 group-hover:translate-x-1"
                        aria-hidden
                      >
                        &rarr;
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </Section>

      {/* ── 8. CTA Band ───────────────────────────────────────────────────────── */}
      <CtaBand
        heading="Ready to get started?"
        subheading="Share your project scope, site address, and any existing site plans. We confirm the package contents and timeline before work begins."
        primaryAction={{ label: "Request a Proposal", href: "/contact" }}
        secondaryAction={{ label: "View All Services", href: "/services" }}
        variant="dark"
      />
    </>
  );
}
