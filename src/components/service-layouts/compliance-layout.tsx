import Link from "next/link";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { Button } from "@/components/shared/button";
import { getRelatedServices, getServiceBySlug } from "@/content/services";

type ServiceType = NonNullable<ReturnType<typeof getServiceBySlug>>;

export function ComplianceLayout({ service }: { service: ServiceType }) {
  const related = getRelatedServices(service);

  // Pull the "Compliance Areas" count from processHighlights
  const complianceAreasHighlight = service.processHighlights?.find(
    (h) => h.label === "Compliance Areas",
  );
  const complianceCount = complianceAreasHighlight?.value ?? "6";

  return (
    <>
      {/* ── 1. Compliance Overview Header ─────────────────────────────────────── */}
      <Section variant="default">
        <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">

          {/* Left: large numeric callout + overview */}
          <div>
            {/* Eyebrow */}
            <p className="mb-6 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Short-Term Rental Compliance
            </p>

            {/* Large numeric compliance count */}
            <div className="mb-8 flex items-end gap-5 border-b border-border pb-8">
              <span
                className="text-[7rem] font-extrabold leading-none text-secondary"
                style={{ letterSpacing: "-0.05em" }}
                aria-label={`${complianceCount} compliance areas`}
              >
                {complianceCount}
              </span>
              <span className="mb-3 text-sm font-medium uppercase tracking-widest text-muted">
                Compliance Areas
                <br />
                Covered
              </span>
            </div>

            {/* Overview */}
            <p className="font-light leading-relaxed text-muted lg:text-lg">
              {service.overview}
            </p>
          </div>

          {/* Right: "At a Glance" checklist card */}
          <div className="border border-border bg-surface">
            {/* Card header */}
            <div className="border-b border-border px-8 py-5">
              <p className="text-[11px] font-medium uppercase tracking-widest text-secondary">
                At a Glance
              </p>
            </div>

            {/* Highlight rows */}
            <div className="divide-y divide-border">
              {service.processHighlights?.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between px-8 py-5"
                >
                  <span className="text-sm font-medium text-foreground">
                    {item.label}
                  </span>
                  <span
                    className="text-sm font-bold text-secondary"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Card CTA */}
            <div className="border-t border-border px-8 py-7">
              <Button href="/contact" variant="primary" size="md" className="w-full justify-center">
                Request a Compliance Package
              </Button>
            </div>
          </div>

        </div>
      </Section>

      {/* ── 2. Compliance Areas Strip ─────────────────────────────────────────── */}
      <Section variant="surface">
        <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
          What We Document
        </p>
        <h2
          className="mb-12 text-3xl font-bold text-foreground sm:text-4xl"
          style={{ letterSpacing: "-0.025em" }}
        >
          Every compliance area. Every jurisdiction.
        </h2>

        <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {service.includes.map((item, i) => (
            <div key={item.title} className="bg-background px-8 py-8">
              {/* Orange circle badge */}
              <div className="mb-5 flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                <span className="text-[11px] font-bold tabular-nums text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-foreground">
                {item.title}
              </p>
              <p className="mt-2 text-sm font-light leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 3. 4-Step Process ─────────────────────────────────────────────────── */}
      {service.steps && service.steps.length > 0 && (
        <Section variant="default">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            Process
          </p>
          <h2
            className="mb-14 text-3xl font-bold text-foreground sm:text-4xl"
            style={{ letterSpacing: "-0.025em" }}
          >
            How it works.
          </h2>

          {/* Horizontal-rule document-style step rows */}
          <div className="divide-y divide-border border-t border-border">
            {service.steps.map((step, i) => (
              <div
                key={step.title}
                className="grid gap-6 py-8 sm:grid-cols-[auto_1fr_2fr] sm:items-start sm:gap-10"
              >
                {/* Step number */}
                <span
                  className="text-[11px] font-medium tabular-nums text-secondary sm:w-8"
                  aria-label={`Step ${i + 1}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Title */}
                <p className="text-sm font-bold text-foreground">
                  {step.title}
                </p>

                {/* Description */}
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
        <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
          Deliverables
        </p>
        <h2
          className="mb-12 text-3xl font-bold text-foreground sm:text-4xl"
          style={{ letterSpacing: "-0.025em" }}
        >
          What you receive.
        </h2>

        <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
          {service.includes.map((item) => (
            <div key={`deliverable-${item.title}`} className="bg-background px-8 py-7">
              <p className="text-xs font-bold uppercase tracking-widest text-foreground">
                {item.title}
              </p>
              <p className="mt-2 text-sm font-light leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 5. Why It Matters / Risk Strip ────────────────────────────────────── */}
      <Section variant="dark">
        <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">

          {/* Left: why it matters */}
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              The Risk of Non-Compliance
            </p>
            <h2
              className="mb-8 text-3xl font-bold text-primary-foreground sm:text-4xl"
              style={{ letterSpacing: "-0.025em" }}
            >
              Operating unpermitted has real consequences.
            </h2>
            <p className="font-light leading-relaxed text-white/60">
              {service.whyItMatters}
            </p>
          </div>

          {/* Right: consequence callout card */}
          <div className="border border-white/20 bg-white/5">
            <div className="border-b border-white/20 px-8 py-5">
              <p className="text-[11px] font-medium uppercase tracking-widest text-secondary">
                Consequences of an Unpermitted STR
              </p>
            </div>
            <ul className="divide-y divide-white/10">
              {[
                "Platform delisting from Airbnb, VRBO, and similar services",
                "Regulatory fines issued by the jurisdiction's enforcement office",
                "Forced closure and removal of guests mid-booking",
              ].map((consequence) => (
                <li
                  key={consequence}
                  className="flex items-start gap-4 px-8 py-6"
                >
                  <span
                    className="mt-0.5 shrink-0 text-sm font-bold text-secondary"
                    aria-hidden
                  >
                    &#x2022;
                  </span>
                  <span className="text-sm font-light leading-relaxed text-white/70">
                    {consequence}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </Section>

      {/* ── 6. STR Use Cases ──────────────────────────────────────────────────── */}
      {service.useCases && service.useCases.length > 0 && (
        <Section variant="default">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            Property Types
          </p>
          <h2
            className="mb-12 text-3xl font-bold text-foreground sm:text-4xl"
            style={{ letterSpacing: "-0.025em" }}
          >
            STR Types We Document.
          </h2>

          <div className="grid sm:grid-cols-2">
            {service.useCases.map((useCase) => (
              <div
                key={useCase}
                className="flex items-center justify-between border-b border-border py-5 last:border-b-0 sm:last:border-b sm:[&:nth-last-child(2)]:border-b-0"
              >
                <span className="text-sm font-medium text-foreground">
                  {useCase}
                </span>
                <span className="ml-4 shrink-0 text-secondary" aria-hidden>
                  &rsaquo;
                </span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ── 7. FAQ ────────────────────────────────────────────────────────────── */}
      {service.faqs && service.faqs.length > 0 && (
        <Section variant="surface">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            Questions
          </p>
          <h2
            className="mb-12 text-3xl font-bold text-foreground sm:text-4xl"
            style={{ letterSpacing: "-0.025em" }}
          >
            STR permitting, explained.
          </h2>

          <div className="divide-y divide-border border-b border-t border-border">
            {service.faqs.map((faq) => (
              <div key={faq.question} className="py-6">
                <p className="text-base font-bold text-foreground">
                  {faq.question}
                </p>
                <p className="mt-3 text-sm font-light leading-relaxed text-muted">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ── 8. Audience ───────────────────────────────────────────────────────── */}
      <Section variant="default">
        <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
          Who This Serves
        </p>
        <h2
          className="mb-12 text-3xl font-bold text-foreground sm:text-4xl"
          style={{ letterSpacing: "-0.025em" }}
        >
          STR owners, investors, and operators.
        </h2>

        <ol className="space-y-0 divide-y divide-border border-b border-t border-border">
          {service.audience.map((item, i) => (
            <li key={item.title} className="flex items-start gap-6 py-7">
              <span className="shrink-0 text-[11px] font-medium tabular-nums text-secondary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-sm font-bold text-foreground">
                  {item.title}
                </p>
                <p className="mt-1 text-sm font-light text-muted">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── 9. Related Services ───────────────────────────────────────────────── */}
      {related.length > 0 && (
        <Section variant="surface">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            Related Services
          </p>
          <h2
            className="mb-10 text-3xl font-bold text-foreground sm:text-4xl"
            style={{ letterSpacing: "-0.025em" }}
          >
            Services that pair with this package.
          </h2>

          <div className="divide-y divide-border border border-border">
            {related.map((rel) => (
              <Link
                key={rel.slug}
                href={`/services/${rel.slug}`}
                className="group flex items-start justify-between gap-8 px-8 py-7 transition-colors hover:bg-background"
              >
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-widest text-secondary">
                    {rel.category}
                  </p>
                  <p className="mt-1 text-base font-bold text-foreground">
                    {rel.title}
                  </p>
                  <p className="mt-1 text-sm font-light text-muted">
                    {rel.tagline}
                  </p>
                </div>
                <span
                  className="mt-1 shrink-0 text-xl text-secondary transition-transform group-hover:translate-x-1"
                  aria-hidden
                >
                  &rsaquo;
                </span>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* ── CTA Band ──────────────────────────────────────────────────────────── */}
      <CtaBand
        heading="Get your STR permit package started."
        subheading="Share your property type, jurisdiction, and STR platform. We research the ordinance and confirm the package scope before any work begins."
        primaryAction={{ label: "Start Your Package", href: "/contact" }}
        secondaryAction={{ label: "View all services", href: "/services" }}
        variant="dark"
      />
    </>
  );
}
