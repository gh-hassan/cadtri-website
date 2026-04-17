import Link from "next/link";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { Button } from "@/components/shared/button";
import type { Service } from "@/content/services";
import { getRelatedServices } from "@/content/services";

interface Props {
  service: Service;
}

// Hardcoded per-discipline descriptions for the service matrix
const DISCIPLINE_DESCRIPTIONS: Record<string, string> = {
  "RFI Responses":               "Formatted drawing responses attached directly to the RFI log.",
  "Submittal Review Support":    "Drawing coordination in support of contractor submittals.",
  "Field Sketch Drawings":       "Fast-turnaround sketches for field conditions requiring resolution.",
  "Plan Revision Packages":      "Formally revised sheets for inspector corrections or scope changes.",
  "Change Order Documentation":  "Drawings for change order additions, deletions, and modifications.",
  "Inspector Response Drawings": "Drawings resolving inspection holds or correction notices.",
};

export function AdminLayout({ service }: Props) {
  const related = getRelatedServices(service);

  return (
    <>
      {/* ── 1. Service Matrix ─────────────────────────────────────────────────── */}
      <Section variant="surface">

        {/* Horizontal split intro */}
        <div className="grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">

          {/* Left: eyebrow + heading */}
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Available Services
            </p>
            <h2
              className="font-bold text-3xl text-foreground sm:text-4xl"
              style={{ letterSpacing: "-0.025em" }}
            >
              Six request types. 24&ndash;48 hour response.
            </h2>
          </div>

          {/* Right: overview + CTA */}
          <div className="flex flex-col gap-6">
            <p className="font-light leading-relaxed text-muted">
              {service.overview}
            </p>
            <Button href="/contact" variant="primary" size="md" className="self-start">
              Engage CA Support
            </Button>
          </div>

        </div>

        {/* Discipline matrix grid */}
        {service.disciplines && service.disciplines.length > 0 && (
          <div className="mt-14">
            <ul
              role="list"
              className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3"
            >
              {service.disciplines.map((discipline) => (
                <li
                  key={discipline}
                  className="group cursor-pointer bg-background px-8 py-8 transition-colors duration-200 hover:bg-surface"
                >
                  {/* Top row: name + badge */}
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm font-bold text-foreground">
                      {discipline}
                    </span>
                    <span className="inline-flex items-center border border-border bg-surface px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-muted">
                      24&ndash;48 hrs
                    </span>
                  </div>
                  {/* One-liner description */}
                  <p className="text-sm font-light leading-relaxed text-muted">
                    {DISCIPLINE_DESCRIPTIONS[discipline] ?? ""}
                  </p>
                </li>
              ))}
            </ul>

            {/* Process highlights strip */}
            {service.processHighlights && service.processHighlights.length > 0 && (
              <ul
                role="list"
                className="grid grid-cols-2 gap-px border-b border-x border-border bg-border sm:grid-cols-4"
              >
                {service.processHighlights.map((highlight) => (
                  <li
                    key={highlight.label}
                    className="bg-background px-8 py-7"
                  >
                    <p
                      className="font-bold text-2xl text-foreground"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      {highlight.value}
                    </p>
                    <p className="mt-1 text-[11px] font-medium uppercase tracking-widest text-muted">
                      {highlight.label}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

      </Section>

      {/* ── 2. Engagement Options ─────────────────────────────────────────────── */}
      <Section variant="default">

        <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
          How to Engage
        </p>
        <h2
          className="font-bold text-3xl text-foreground sm:text-4xl"
          style={{ letterSpacing: "-0.025em" }}
        >
          Retainer or per-request.
        </h2>

        <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-12">

          {/* Card 1: Monthly Retainer */}
          <div className="flex flex-col gap-5 border border-border bg-surface px-10 py-10">
            <div className="h-1 w-12 bg-secondary" />
            <h3 className="text-lg font-bold text-foreground">Monthly Retainer</h3>
            <p className="font-light leading-relaxed text-muted">
              Best for active construction projects. A defined number of drawing hours per month at priority response rates. Predictable cost, guaranteed availability.
            </p>
            <div className="mt-auto border-t border-border pt-5">
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted">
                Best for
              </p>
              <p className="mt-1 text-sm font-bold text-foreground">
                Active construction / 4&ndash;8 hrs/month
              </p>
            </div>
          </div>

          {/* Card 2: Per-Request */}
          <div className="flex flex-col gap-5 border border-border bg-surface px-10 py-10">
            <div className="h-1 w-12 bg-secondary" />
            <h3 className="text-lg font-bold text-foreground">Per-Request</h3>
            <p className="font-light leading-relaxed text-muted">
              Best for occasional CA needs. Submit each request individually with scope and reference drawings. We confirm fee and turnaround before starting.
            </p>
            <div className="mt-auto border-t border-border pt-5">
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted">
                Best for
              </p>
              <p className="mt-1 text-sm font-bold text-foreground">
                Occasional needs / variable scope
              </p>
            </div>
          </div>

        </div>
      </Section>

      {/* ── 3. The Four Steps ─────────────────────────────────────────────────── */}
      {service.steps && service.steps.length > 0 && (
        <Section variant="surface">

          <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
                How It Works
              </p>
              <h2
                className="font-bold text-3xl text-foreground sm:text-4xl"
                style={{ letterSpacing: "-0.025em" }}
              >
                From request to delivery.
              </h2>
            </div>
          </div>

          <ul
            role="list"
            className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4"
          >
            {service.steps.map((step, i) => (
              <li key={step.title} className="flex flex-col gap-4 bg-background px-8 py-8">
                <span
                  className="text-[11px] font-medium tabular-nums text-secondary"
                  style={{ letterSpacing: "0.06em" }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm font-bold text-foreground">{step.title}</p>
                <p className="text-sm font-light leading-relaxed text-muted">
                  {step.description}
                </p>
              </li>
            ))}
          </ul>

        </Section>
      )}

      {/* ── 4. Deliverables (dark) ────────────────────────────────────────────── */}
      <Section variant="dark">

        <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
          What You Get
        </p>
        <h2
          className="font-bold text-3xl text-primary-foreground sm:text-4xl"
          style={{ letterSpacing: "-0.025em" }}
        >
          Documented, tracked, job-ready.
        </h2>

        <ul
          role="list"
          className="mt-10 grid gap-px border border-white/20 bg-white/10 sm:grid-cols-2"
        >
          {service.includes.map((item, i) => (
            <li key={item.title} className="bg-primary px-8 py-7">
              <span
                className="text-[11px] font-medium tabular-nums text-secondary"
                style={{ letterSpacing: "0.06em" }}
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-2 text-sm font-bold text-primary-foreground">
                {item.title}
              </p>
              <p className="mt-2 text-sm font-light leading-relaxed text-white/70">
                {item.description}
              </p>
            </li>
          ))}
        </ul>

      </Section>

      {/* ── 5. FAQ ───────────────────────────────────────────────────────────── */}
      {service.faqs && service.faqs.length > 0 && (
        <Section variant="default">

          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            Common Questions
          </p>
          <h2
            className="mb-14 font-bold text-3xl text-foreground sm:text-4xl"
            style={{ letterSpacing: "-0.025em" }}
          >
            Frequently asked.
          </h2>

          <ul role="list" className="flex flex-col divide-y divide-border border-t border-border">
            {service.faqs.map((faq) => (
              <li
                key={faq.question}
                className="grid gap-4 px-0 py-8 lg:grid-cols-[2fr_3fr] lg:gap-16"
              >
                <p className="text-sm font-bold text-foreground">{faq.question}</p>
                <p className="text-sm font-light leading-relaxed text-muted">
                  {faq.answer}
                </p>
              </li>
            ))}
          </ul>

        </Section>
      )}

      {/* ── 6. Who It's For ──────────────────────────────────────────────────── */}
      <Section variant="surface">

        <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
          Designed For
        </p>
        <h2
          className="mb-14 font-bold text-3xl text-foreground sm:text-4xl"
          style={{ letterSpacing: "-0.025em" }}
        >
          Who this service is for.
        </h2>

        <ul
          role="list"
          className="divide-y divide-border border-t border-b border-border"
        >
          {service.audience.map((item, i) => (
            <li key={item.title} className="flex gap-5 py-6">
              <span
                className="shrink-0 text-[11px] font-medium tabular-nums text-secondary"
                style={{ letterSpacing: "0.05em", paddingTop: "2px" }}
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-1.5">
                <p className="text-sm font-medium uppercase tracking-wider text-foreground">
                  {item.title}
                </p>
                <p className="text-sm font-light leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ul>

      </Section>

      {/* ── 7. Related Services ──────────────────────────────────────────────── */}
      {related.length > 0 && (
        <Section variant="default" className="border-t border-border">
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
              className="hidden shrink-0 text-[11px] font-medium uppercase tracking-wider text-secondary hover:text-foreground lg:block"
            >
              All Services &rarr;
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
                    &rarr;
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* ── CTA Band ─────────────────────────────────────────────────────────── */}
      <CtaBand
        heading="Need drawing support on your project?"
        subheading="Tell us your project stage, request volume, and timeline. We confirm the engagement structure and start with your first request."
        primaryAction={{ label: "Start CA Support", href: "/contact" }}
        variant="dark"
      />
    </>
  );
}
