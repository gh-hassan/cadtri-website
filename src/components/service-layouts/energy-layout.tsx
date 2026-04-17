import Link from "next/link";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { Button } from "@/components/shared/button";
import { getRelatedServices, getServiceBySlug } from "@/content/services";

type ServiceType = NonNullable<ReturnType<typeof getServiceBySlug>>;

// Extract a form code badge from an includes title (e.g. "CF-1R Compliance Report" → "CF-1R")
function extractFormCode(title: string): string | null {
  const match = title.match(/^(CF-\d+R?|LTG-\d+|ENV-\d+|MECH-\d+)/);
  return match ? match[1] : null;
}

export function EnergyLayout({ service }: { service: ServiceType }) {
  const related = getRelatedServices(service);

  // Compliance path comparison rows
  const comparisonRows: {
    aspect: string;
    prescriptive: string;
    performance: string;
  }[] = [
    {
      aspect: "Best For",
      prescriptive: "Standard residential and commercial projects with typical component specifications",
      performance: "Projects needing design flexibility or unable to meet prescriptive component minimums",
    },
    {
      aspect: "Flexibility",
      prescriptive: "Lower. Each component must individually meet the code minimum",
      performance: "Higher. Trade-offs allowed between components via whole-building modeling",
    },
    {
      aspect: "Complexity",
      prescriptive: "Straightforward. Component-by-component checklist approach",
      performance: "More involved. Requires CEC-approved whole-building energy modeling software",
    },
    {
      aspect: "Required When",
      prescriptive: "Project meets all prescriptive component requirements as designed",
      performance: "Project cannot comply prescriptively or requires a trade-off for a specific component",
    },
  ];

  return (
    <>
      {/* ── 1. Technical Header ─────────────────────────────────────────────────── */}
      <Section variant="default">
        <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">

          {/* Left: eyebrow, tagline heading, overview */}
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              California Title 24
            </p>
            <h1
              className="mb-6 font-bold text-3xl text-foreground sm:text-4xl"
              style={{ letterSpacing: "-0.025em" }}
            >
              {service.tagline}
            </h1>
            <p className="font-light leading-relaxed text-muted lg:text-lg">
              {service.overview}
            </p>
            <div className="mt-8">
              <Button href="/contact" variant="primary" size="md">
                Request Compliance Documentation
              </Button>
            </div>
          </div>

          {/* Right: Compliance Pathway selector panel */}
          <div className="flex flex-col gap-6">

            {/* Path cards */}
            <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
              <div className="bg-surface px-7 py-7">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-secondary">
                  Prescriptive Path
                </p>
                <p
                  className="mb-3 font-bold text-base text-foreground"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  Prescriptive Compliance
                </p>
                <p className="text-sm font-light leading-relaxed text-muted">
                  Component-by-component standard compliance
                </p>
              </div>
              <div className="bg-surface px-7 py-7">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-secondary">
                  Performance Path
                </p>
                <p
                  className="mb-3 font-bold text-base text-foreground"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  Performance Compliance
                </p>
                <p className="text-sm font-light leading-relaxed text-muted">
                  Whole-building energy modeling
                </p>
              </div>
            </div>

            {/* Stat callout strip */}
            <div className="border border-border bg-surface px-7 py-5">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                {service.processHighlights?.map((item, i) => (
                  <div key={item.label} className="flex items-center gap-2">
                    {i > 0 && (
                      <span className="hidden text-border sm:inline" aria-hidden>
                        |
                      </span>
                    )}
                    <span className="text-[11px] font-medium uppercase tracking-wider text-muted">
                      {item.label}:
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-foreground">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </Section>

      {/* ── 2. Compliance Path Comparison Table ────────────────────────────────── */}
      <Section variant="surface">
        <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
          Compliance Pathways
        </p>
        <h2
          className="mb-12 font-bold text-3xl text-foreground sm:text-4xl"
          style={{ letterSpacing: "-0.025em" }}
        >
          Two compliance pathways. One clear report.
        </h2>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-border text-sm">
            <thead>
              <tr className="border-b border-border bg-primary">
                {/* Blank corner */}
                <th className="w-40 px-6 py-4 text-left" aria-hidden />
                <th className="px-6 py-4 text-left">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-primary-foreground">
                    Prescriptive Path
                  </span>
                </th>
                <th className="px-6 py-4 text-left">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-secondary">
                    Performance Path
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {comparisonRows.map((row) => (
                <tr key={row.aspect} className="divide-x divide-border">
                  <td className="px-6 py-5 align-top">
                    <span className="text-xs font-medium uppercase tracking-wider text-muted">
                      {row.aspect}
                    </span>
                  </td>
                  <td className="bg-background px-6 py-5 align-top">
                    <span className="text-sm font-medium text-foreground">
                      {row.prescriptive}
                    </span>
                  </td>
                  <td className="bg-background px-6 py-5 align-top">
                    <span className="text-sm font-medium text-foreground">
                      {row.performance}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ── 3. 4-Step Process ─────────────────────────────────────────────────── */}
      {service.steps && service.steps.length > 0 && (
        <Section variant="default">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            Process
          </p>
          <h2
            className="mb-14 font-bold text-3xl text-foreground sm:text-4xl"
            style={{ letterSpacing: "-0.025em" }}
          >
            How we produce your compliance report.
          </h2>

          {/* Horizontal connected steps on desktop, stacked on mobile */}
          <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {service.steps.map((step, i) => (
              <div key={step.title} className="bg-background px-7 py-8">
                <p
                  className="mb-4 text-[11px] font-medium tabular-nums text-secondary"
                  aria-label={`Step ${i + 1}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p
                  className="mb-3 font-bold text-sm text-foreground"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {step.title}
                </p>
                <p className="text-sm font-light leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ── 4. Deliverables / Report Forms ─────────────────────────────────────── */}
      <Section variant="surface">
        <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
          Deliverables
        </p>
        <h2
          className="mb-12 font-bold text-3xl text-foreground sm:text-4xl"
          style={{ letterSpacing: "-0.025em" }}
        >
          Every form. Every certificate.
        </h2>

        <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {service.includes.map((item) => {
            const formCode = extractFormCode(item.title);
            return (
              <div key={item.title} className="bg-background px-7 py-7">
                {formCode && (
                  <p className="mb-3 font-mono text-xs font-semibold text-secondary">
                    {formCode}
                  </p>
                )}
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-foreground">
                  {item.title}
                </p>
                <p className="text-sm font-light leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ── 5. Why It Matters ─────────────────────────────────────────────────── */}
      <Section variant="dark">
        <div className="max-w-2xl">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            Title 24 is non-negotiable.
          </p>
          <h2
            className="mb-8 font-bold text-3xl text-primary-foreground sm:text-4xl"
            style={{ letterSpacing: "-0.025em" }}
          >
            Required on every California conditioned-space permit.
          </h2>
          <p className="mb-10 font-light leading-relaxed text-white/60">
            {service.whyItMatters}
          </p>

          {/* Data point callout */}
          <div className="mb-10 border border-white/20 bg-white/5 px-8 py-7">
            <p
              className="mb-2 font-extrabold text-4xl text-secondary sm:text-5xl"
              style={{ letterSpacing: "-0.04em" }}
              aria-label="100 percent of California conditioned-space permits require Title 24 documentation"
            >
              100%
            </p>
            <p className="text-sm font-medium uppercase tracking-wider text-white/60">
              of California conditioned-space permits require Title 24 compliance documentation.
            </p>
          </div>

          <Button href="/contact" variant="secondary" size="md">
            Start with Compliant Documentation
          </Button>
        </div>
      </Section>

      {/* ── 6. FAQ ────────────────────────────────────────────────────────────── */}
      {service.faqs && service.faqs.length > 0 && (
        <Section variant="default">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            Questions
          </p>
          <h2
            className="mb-12 font-bold text-3xl text-foreground sm:text-4xl"
            style={{ letterSpacing: "-0.025em" }}
          >
            Title 24, explained.
          </h2>

          <div className="divide-y divide-border border-b border-t border-border">
            {service.faqs.map((faq) => (
              <div key={faq.question} className="py-7">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">
                  {faq.question}
                </p>
                <p className="text-sm font-light leading-relaxed text-muted">
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
          className="mb-12 font-bold text-3xl text-foreground sm:text-4xl"
          style={{ letterSpacing: "-0.025em" }}
        >
          Every party who touches a California permit.
        </h2>

        <ol className="divide-y divide-border border-b border-t border-border">
          {service.audience.map((item, i) => (
            <li key={item.title} className="flex items-start gap-6 py-7">
              <span className="shrink-0 text-[11px] font-medium tabular-nums text-secondary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-sm font-bold text-foreground">
                  {item.title}
                </p>
                <p className="mt-1 text-sm font-light leading-relaxed text-muted">
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
            Continue Exploring
          </p>
          <h2
            className="mb-10 font-bold text-2xl text-foreground sm:text-3xl"
            style={{ letterSpacing: "-0.025em" }}
          >
            Related services.
          </h2>

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

      {/* ── CTA Band ──────────────────────────────────────────────────────────── */}
      <CtaBand
        heading="Start with compliant documentation."
        subheading="Tell us your project type, occupancy, and jurisdiction. We confirm the applicable compliance path and deliver the complete report coordinated with your permit set."
        primaryAction={{ label: "Request a Proposal", href: "/contact" }}
        secondaryAction={{ label: "View All Services", href: "/services" }}
        variant="dark"
      />
    </>
  );
}
