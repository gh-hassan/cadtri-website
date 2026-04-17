import Link from "next/link";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { Button } from "@/components/shared/button";
import { getRelatedServices, getServiceBySlug } from "@/content/services";

type ServiceType = NonNullable<ReturnType<typeof getServiceBySlug>>;

// The four treatment approaches under the Secretary of the Interior's Standards
const SOI_STANDARDS = [
  {
    number: "01",
    name: "Rehabilitation",
    description:
      "Repair and alterations that allow compatible contemporary use while preserving character-defining features.",
  },
  {
    number: "02",
    name: "Preservation",
    description:
      "Stabilization and maintenance of existing form, integrity, and materials with minimal intervention.",
  },
  {
    number: "03",
    name: "Restoration",
    description:
      "Accurate depiction of a property's appearance at a particular period of significance.",
  },
  {
    number: "04",
    name: "Reconstruction",
    description:
      "Re-creation of a vanished or non-surviving structure with documentary and physical evidence.",
  },
];

export function HistoricLayout({ service }: { service: ServiceType }) {
  const related = getRelatedServices(service);

  return (
    <>
      {/* ── 1. Editorial Header ───────────────────────────────────────────────── */}
      <Section variant="default">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            Certificate of Appropriateness
          </p>

          <h1
            className="mb-8 text-4xl font-bold text-foreground sm:text-5xl"
            style={{ letterSpacing: "-0.025em" }}
          >
            {service.title}
          </h1>

          {/* Overview — generous editorial body text */}
          <p className="mb-12 text-xl font-light leading-relaxed text-muted">
            {service.overview}
          </p>

          {/* Process highlights — inline stats row */}
          {service.processHighlights && service.processHighlights.length > 0 && (
            <div className="mb-10 flex flex-wrap items-start gap-x-10 gap-y-6 border-t border-border pt-10">
              {service.processHighlights.map((item, i) => (
                <div key={item.label} className="flex items-stretch gap-4">
                  {i > 0 && (
                    <span
                      className="hidden self-stretch border-l border-border sm:block"
                      aria-hidden
                    />
                  )}
                  <div>
                    <p className="text-base font-bold text-foreground">
                      {item.value}
                    </p>
                    <p className="mt-0.5 text-[11px] font-medium uppercase tracking-widest text-muted">
                      {item.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Button href="/contact" variant="primary" size="md">
            Start a Historic Submission
          </Button>
        </div>
      </Section>

      {/* ── 2. Standards Reference Block ─────────────────────────────────────── */}
      <Section variant="surface">
        <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
          Regulatory Framework
        </p>
        <h2
          className="mb-14 text-3xl font-bold text-foreground sm:text-4xl"
          style={{ letterSpacing: "-0.025em" }}
        >
          Secretary of the Interior&apos;s Standards.
        </h2>

        <div className="grid items-start gap-12 lg:grid-cols-[1fr_360px] lg:gap-20">

          {/* Left: 2x2 standards grid */}
          <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
            {SOI_STANDARDS.map((standard) => (
              <div key={standard.number} className="bg-background px-8 py-8">
                <p
                  className="mb-3 text-[11px] font-medium tabular-nums text-secondary"
                  aria-label={`Standard ${standard.number}`}
                >
                  {standard.number}
                </p>
                <p className="mb-2 text-base font-bold text-foreground">
                  {standard.name}
                </p>
                <p className="text-sm font-light leading-relaxed text-muted">
                  {standard.description}
                </p>
              </div>
            ))}
          </div>

          {/* Right: processHighlights stacked card */}
          {service.processHighlights && service.processHighlights.length > 0 && (
            <div className="border border-border bg-background">
              <div className="border-b border-border px-8 py-5">
                <p className="text-[11px] font-medium uppercase tracking-widest text-secondary">
                  Package Parameters
                </p>
              </div>
              <div className="divide-y divide-border">
                {service.processHighlights.map((item) => (
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
              <div className="border-t border-border px-8 py-7">
                <p className="text-xs font-light leading-relaxed text-muted">
                  All packages are prepared under the Rehabilitation treatment unless project documentation specifies a different treatment approach.
                </p>
              </div>
            </div>
          )}

        </div>
      </Section>

      {/* ── 3. 4-Step Process — Vertical Table of Contents ───────────────────── */}
      {service.steps && service.steps.length > 0 && (
        <Section variant="default">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            Engagement Process
          </p>
          <h2
            className="mb-14 text-3xl font-bold text-foreground sm:text-4xl"
            style={{ letterSpacing: "-0.025em" }}
          >
            How we build the submission.
          </h2>

          {/* Vertical ruled rows — editorial table-of-contents feel */}
          <div className="border-t border-border">
            {service.steps.map((step, i) => (
              <div
                key={step.title}
                className="grid items-start gap-6 border-b border-border py-10 sm:grid-cols-[3rem_1fr] sm:gap-12"
              >
                {/* Step number — large, left-anchored */}
                <span
                  className="text-[11px] font-medium tabular-nums text-secondary"
                  aria-label={`Step ${i + 1}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Step content */}
                <div className="grid gap-3 sm:grid-cols-[1fr_2fr] sm:gap-12">
                  <p className="text-lg font-bold leading-snug text-foreground">
                    {step.title}
                  </p>
                  <p className="font-light leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ── 4. Deliverables ───────────────────────────────────────────────────── */}
      <Section variant="surface">
        <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
          Documentation Package
        </p>
        <h2
          className="mb-12 text-3xl font-bold text-foreground sm:text-4xl"
          style={{ letterSpacing: "-0.025em" }}
        >
          What the submission contains.
        </h2>

        {/* Gap-as-border grid */}
        <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {service.includes.map((item) => (
            <div key={item.title} className="bg-background px-8 py-7">
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

      {/* ── 5. Why It Matters + Two Review Processes note ────────────────────── */}
      <Section variant="dark">
        <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">

          {/* Left: whyItMatters */}
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Why This Work Matters
            </p>
            <h2
              className="mb-8 text-3xl font-bold text-primary-foreground sm:text-4xl"
              style={{ letterSpacing: "-0.025em" }}
            >
              Historic approval is a separate path.
            </h2>
            <p className="font-light leading-relaxed text-white/60">
              {service.whyItMatters}
            </p>
          </div>

          {/* Right: Two Review Processes editorial panel */}
          <div className="border border-white/20 bg-white/5">
            <div className="border-b border-white/20 px-8 py-5">
              <p className="text-[11px] font-medium uppercase tracking-widest text-secondary">
                Two Review Processes
              </p>
            </div>
            <div className="px-8 py-8">
              <p className="mb-6 text-sm font-light leading-relaxed text-white/70">
                A project in a historic district requires two separate approvals before construction can begin. They run on parallel tracks and neither substitutes for the other.
              </p>
              <div className="space-y-5">
                <div className="border-l-2 border-secondary pl-5">
                  <p className="text-sm font-bold text-primary-foreground">
                    Building Permit Review
                  </p>
                  <p className="mt-1 text-sm font-light text-white/60">
                    Administered by the building department. Evaluates structural, fire, life safety, and zoning compliance. This is the standard permit path.
                  </p>
                </div>
                <div className="border-l-2 border-secondary pl-5">
                  <p className="text-sm font-bold text-primary-foreground">
                    Historic Review (COA)
                  </p>
                  <p className="mt-1 text-sm font-light text-white/60">
                    Administered by the Historic Preservation Commission or equivalent body. Evaluates design compatibility with the district&apos;s character and the Secretary of the Interior&apos;s Standards. Building permits are not issued until the COA is granted.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </Section>

      {/* ── 6. FAQ ────────────────────────────────────────────────────────────── */}
      {service.faqs && service.faqs.length > 0 && (
        <Section variant="default">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            Common Questions
          </p>
          <h2
            className="mb-12 text-3xl font-bold text-foreground sm:text-4xl"
            style={{ letterSpacing: "-0.025em" }}
          >
            Historic submissions, clarified.
          </h2>

          <div className="border-t border-border">
            {service.faqs.map((faq) => (
              <div key={faq.question} className="border-b border-border py-7">
                <p className="mb-3 text-xs font-bold uppercase tracking-wide text-foreground">
                  {faq.question}
                </p>
                <p className="font-light leading-relaxed text-muted">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ── 7. Audience ───────────────────────────────────────────────────────── */}
      <Section variant="surface">
        <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
          Who This Serves
        </p>
        <h2
          className="mb-12 text-3xl font-bold text-foreground sm:text-4xl"
          style={{ letterSpacing: "-0.025em" }}
        >
          Owners and teams working in historic districts.
        </h2>

        <ol className="divide-y divide-border border-b border-t border-border">
          {service.audience.map((item, i) => (
            <li key={item.title} className="flex items-start gap-6 py-7">
              <span className="shrink-0 text-[11px] font-medium tabular-nums text-secondary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-sm font-bold text-foreground">{item.title}</p>
                <p className="mt-1 text-sm font-light text-muted">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── 8. Related Services ───────────────────────────────────────────────── */}
      {related.length > 0 && (
        <Section variant="default">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            Related Services
          </p>
          <h2
            className="mb-10 text-3xl font-bold text-foreground sm:text-4xl"
            style={{ letterSpacing: "-0.025em" }}
          >
            Services that support this work.
          </h2>

          <div className="divide-y divide-border border border-border">
            {related.map((rel) => (
              <Link
                key={rel.slug}
                href={`/services/${rel.slug}`}
                className="group flex items-start justify-between gap-8 px-8 py-7 transition-colors hover:bg-surface"
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
        heading="Ready to submit to your Historic Preservation Commission?"
        subheading="Share the district, jurisdiction, and scope of work. We confirm the applicable standards and package requirements before any work begins."
        primaryAction={{ label: "Start Your COA Package", href: "/contact" }}
        secondaryAction={{ label: "View all services", href: "/services" }}
        variant="dark"
      />
    </>
  );
}
