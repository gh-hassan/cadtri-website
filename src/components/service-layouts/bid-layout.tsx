import Link from "next/link";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { Button } from "@/components/shared/button";
import type { Service } from "@/content/services";
import { getRelatedServices } from "@/content/services";

interface Props {
  service: Service;
}

const WHAT_YOU_PROVIDE = [
  "Permit drawings or design intent documents",
  "Project scope description and trade list",
  "Any existing specs or material selections",
];

const INCOMPLETE_BID_CONSEQUENCES = [
  "Scope gap change orders",
  "Contractors pricing risk instead of work",
  "Apples-to-oranges bid comparisons",
  "Disputes over excluded scope",
  "Renegotiation after award",
];

export function BidLayout({ service }: Props) {
  const related = getRelatedServices(service);

  return (
    <>
      {/* ── 1. Package Contents Index ──────────────────────────────────────────── */}
      <Section variant="surface">
        {/* Top intro */}
        <div className="mb-14">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            Contractor Bid Package
          </p>
          <h2
            className="font-bold text-3xl text-foreground sm:text-4xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            A complete procurement document, not a permit set.
          </h2>
          <p className="mt-6 max-w-2xl font-light leading-relaxed text-muted">
            {service.overview}
          </p>
        </div>

        {/* Two-column grid */}
        <div className="grid gap-8 lg:grid-cols-2">

          {/* Left: Document index panel */}
          <div className="border border-border bg-background">
            <div className="flex items-center justify-between bg-primary px-8 py-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-primary-foreground">
                Package Contents
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-primary-foreground">
                {service.outputFormats ? `${service.outputFormats.length} Sections` : "6 Sections"}
              </span>
            </div>
            <ul role="list" className="divide-y divide-border">
              {(service.outputFormats ?? []).map((format, i) => (
                <li key={format} className="flex items-center gap-5 px-8 py-5">
                  <span className="shrink-0 text-[11px] font-bold tabular-nums text-secondary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-medium text-foreground">{format}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: process highlights + what you provide */}
          <div className="flex flex-col gap-px">
            {service.processHighlights && (
              <div className="grid grid-cols-2 gap-px border border-border bg-border">
                {service.processHighlights.map((item) => (
                  <div key={item.label} className="flex flex-col gap-1 bg-background px-8 py-7">
                    <span
                      className="font-extrabold tabular-nums text-foreground"
                      style={{ fontSize: "1.75rem", letterSpacing: "-0.04em", lineHeight: 1 }}
                    >
                      {item.value}
                    </span>
                    <span className="text-[11px] font-medium uppercase tracking-widest text-muted">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-px border border-border bg-surface px-8 py-8">
              <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-muted">
                What you provide
              </p>
              <ul role="list" className="flex flex-col">
                {WHAT_YOU_PROVIDE.map((item) => (
                  <li key={item} className="flex items-start gap-3 py-2 text-sm font-light text-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </Section>

      {/* ── 2. The Cost of Incomplete Bids ────────────────────────────────────── */}
      <Section variant="dark">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-20">

          {/* Left 3/5: eyebrow + whyItMatters */}
          <div className="lg:col-span-3">
            <p className="mb-6 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Why This Matters
            </p>
            <p className="text-xl font-light leading-relaxed text-primary-foreground">
              {service.whyItMatters}
            </p>
          </div>

          {/* Right 2/5: what incomplete packages produce */}
          <div className="lg:col-span-2">
            <div className="border border-white/10 bg-white/5 px-8 py-8">
              <p className="mb-6 text-[11px] font-bold uppercase tracking-widest text-white/50">
                What incomplete packages produce
              </p>
              <ul role="list" className="flex flex-col gap-4">
                {INCOMPLETE_BID_CONSEQUENCES.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm font-light text-white/80">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </Section>

      {/* ── 3. How It Works ───────────────────────────────────────────────────── */}
      <Section variant="default">
        <div className="mb-12 border-b border-border pb-12">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            The Process
          </p>
          <h2
            className="font-bold text-3xl text-foreground sm:text-4xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            Four steps to a complete package.
          </h2>
        </div>

        {service.steps && service.steps.length > 0 && (
          <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {service.steps.map((step, i) => (
              <div key={step.title} className="flex flex-col bg-background px-8 py-9">
                <span
                  className="font-extrabold tabular-nums text-secondary"
                  style={{ fontSize: "1.875rem", lineHeight: 1, letterSpacing: "-0.04em" }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-sm font-bold text-foreground">{step.title}</h3>
                <p className="mt-3 flex-1 text-sm font-light leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* ── 4. Deliverables Detail ────────────────────────────────────────────── */}
      <Section variant="surface">
        <div className="mb-12 border-b border-border pb-12">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            What&apos;s Included
          </p>
          <h2
            className="font-bold text-3xl text-foreground sm:text-4xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            Every section, explained.
          </h2>
        </div>

        <div className="divide-y divide-border border border-border">
          {service.includes.map((item, i) => (
            <div
              key={item.title}
              className="grid gap-6 px-8 py-8 lg:grid-cols-[2.5rem_1fr_2fr]"
            >
              <span className="text-[11px] font-bold tabular-nums text-secondary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm font-bold uppercase tracking-wider text-foreground">
                {item.title}
              </p>
              <p className="text-sm font-light leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 5. FAQ ────────────────────────────────────────────────────────────── */}
      {service.faqs && service.faqs.length > 0 && (
        <Section variant="default">
          <div className="mb-12 border-b border-border pb-12">
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Common Questions
            </p>
            <h2
              className="font-bold text-3xl text-foreground sm:text-4xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              Questions before you engage.
            </h2>
          </div>

          <dl className="divide-y divide-border border border-border">
            {service.faqs.map((faq) => (
              <div
                key={faq.question}
                className="grid gap-4 px-8 py-8 lg:grid-cols-[2fr_3fr] lg:gap-16"
              >
                <dt className="font-medium text-foreground">{faq.question}</dt>
                <dd className="text-sm font-light leading-relaxed text-muted">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </Section>
      )}

      {/* ── 6. Who It's For ───────────────────────────────────────────────────── */}
      <Section variant="surface">
        <div className="mb-12 border-b border-border pb-12">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            Designed For
          </p>
          <h2
            className="font-bold text-3xl text-foreground sm:text-4xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            Who this service is for.
          </h2>
        </div>

        <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
          {service.audience.map((item) => (
            <div key={item.title} className="flex flex-col gap-3 bg-background px-8 py-8">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" aria-hidden />
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                {item.title}
              </h3>
              <p className="text-sm font-light text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 7. Related Services ───────────────────────────────────────────────── */}
      {related.length > 0 && (
        <Section variant="default">
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
              className="hidden shrink-0 cursor-pointer text-[11px] font-medium uppercase tracking-wider text-secondary hover:text-foreground lg:block"
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
                      className="font-bold text-base text-foreground transition-colors duration-200 group-hover:text-secondary"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      {s.title}
                    </p>
                    <p className="mt-1 text-sm font-light text-muted">{s.tagline}</p>
                  </div>
                  <span className="shrink-0 text-secondary transition-transform duration-200 group-hover:translate-x-1" aria-hidden>
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
        heading="Ready for a complete bid package?"
        subheading="Send your permit drawings and project scope. We confirm the package contents and turnaround within one business day."
        primaryAction={{ label: "Request a Bid Package", href: "/contact" }}
        variant="dark"
      />
    </>
  );
}
