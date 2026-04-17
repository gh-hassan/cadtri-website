import Link from "next/link";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { Button } from "@/components/shared/button";
import type { Service } from "@/content/services";
import { getRelatedServices } from "@/content/services";

interface Props {
  service: Service;
}

export function ConversionLayout({ service }: Props) {
  const related = getRelatedServices(service);

  return (
    <>
      {/* ── 1. Transformation Header ──────────────────────────────────────────── */}
      <Section variant="default">

        {/* Before → After split */}
        <div className="grid lg:grid-cols-[1fr_auto_1fr]">

          {/* Left: Before */}
          <div className="bg-surface border border-border px-10 py-10">
            <p className="text-[11px] font-medium uppercase tracking-widest text-muted">
              Before
            </p>
            <p
              className="mt-4 text-5xl font-extrabold text-foreground lg:text-7xl"
              style={{ letterSpacing: "-0.04em" }}
            >
              Garage
            </p>
            <ul className="mt-6 space-y-2">
              <li className="flex items-start gap-2 text-sm font-light text-muted">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden />
                Non-habitable space
              </li>
              <li className="flex items-start gap-2 text-sm font-light text-muted">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden />
                No insulation required
              </li>
              <li className="flex items-start gap-2 text-sm font-light text-muted">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden />
                No egress required
              </li>
            </ul>
          </div>

          {/* Center: Arrow */}
          <div className="flex items-center justify-center px-6 py-10 text-secondary">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5 12h14M14 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Right: After */}
          <div className="bg-primary border border-primary px-10 py-10">
            <p className="text-[11px] font-medium uppercase tracking-widest text-primary-foreground/50">
              After
            </p>
            <p
              className="mt-4 text-5xl font-extrabold text-primary-foreground lg:text-7xl"
              style={{ letterSpacing: "-0.04em" }}
            >
              Living Space
            </p>
            <ul className="mt-6 space-y-2">
              <li className="flex items-start gap-2 text-sm font-light text-primary-foreground/70">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden />
                Habitable and permitted
              </li>
              <li className="flex items-start gap-2 text-sm font-light text-primary-foreground/70">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden />
                Full thermal envelope
              </li>
              <li className="flex items-start gap-2 text-sm font-light text-primary-foreground/70">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden />
                Code-compliant egress
              </li>
            </ul>
          </div>

        </div>

        {/* Overview + process highlights strip */}
        <div className="mt-14">
          <p className="font-light leading-relaxed text-muted lg:text-lg">
            {service.overview}
          </p>

          {service.processHighlights && service.processHighlights.length > 0 && (
            <div className="mt-10 grid grid-cols-2 gap-px border-x border-b border-border bg-border sm:grid-cols-4">
              {service.processHighlights.map((item) => (
                <div key={item.label} className="bg-background px-6 py-6">
                  <p
                    className="text-2xl font-extrabold text-foreground"
                    style={{ letterSpacing: "-0.03em" }}
                  >
                    {item.value}
                  </p>
                  <p className="mt-1 text-[11px] font-medium uppercase tracking-widest text-muted">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </Section>

      {/* ── 2. Code Requirements ──────────────────────────────────────────────── */}
      {service.steps && service.steps.length > 0 && (
        <Section variant="surface">

          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            What a Conversion Requires
          </p>
          <h2
            className="mb-12 text-3xl font-bold text-foreground sm:text-4xl"
            style={{ letterSpacing: "-0.025em" }}
          >
            Six code areas. Every one addressed.
          </h2>

          <div className="grid gap-px border border-border bg-border lg:grid-cols-2">
            {service.steps.map((step, i) => (
              <div key={step.title} className="bg-background px-8 py-8">
                <p className="text-[11px] font-medium tabular-nums text-secondary">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-base font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

        </Section>
      )}

      {/* ── 3. What's Included ────────────────────────────────────────────────── */}
      <Section variant="default">

        {/* Horizontal split intro */}
        <div className="grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Package Contents
            </p>
            <h2
              className="text-3xl font-bold text-foreground sm:text-4xl"
              style={{ letterSpacing: "-0.025em" }}
            >
              Everything in the permit set.
            </h2>
          </div>
          <div>
            <p className="font-light leading-relaxed text-muted">
              Each package is built around the six code areas a conversion must address. The deliverables cover existing conditions, proposed layout, energy compliance, and all jurisdiction-specific documentation required for a complete submission.
            </p>
            <div className="mt-8">
              <Button href="/contact" variant="primary" size="md">
                Start Your Package
              </Button>
            </div>
          </div>
        </div>

        {/* Includes list */}
        <div className="divide-y divide-border border-b border-t border-border">
          {service.includes.map((item, i) => (
            <div key={item.title} className="flex items-start gap-6 py-7">
              <span className="shrink-0 text-[11px] font-medium tabular-nums text-secondary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-foreground">
                  {item.title}
                </p>
                <p className="mt-1 text-sm font-light text-muted">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </Section>

      {/* ── 4. FAQ ────────────────────────────────────────────────────────────── */}
      {service.faqs && service.faqs.length > 0 && (
        <Section variant="surface">

          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            Common Questions
          </p>
          <h2
            className="mb-12 text-3xl font-bold text-foreground sm:text-4xl"
            style={{ letterSpacing: "-0.025em" }}
          >
            Garage conversions, explained.
          </h2>

          <div className="divide-y divide-border border border-border">
            {service.faqs.map((faq) => (
              <div key={faq.question} className="px-8 py-8">
                <p className="text-base font-bold text-foreground">
                  <span className="mr-2 text-secondary">›</span>
                  {faq.question}
                </p>
                <p className="mt-3 pl-4 text-sm font-light leading-relaxed text-muted">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

        </Section>
      )}

      {/* ── 5. Who It's For ───────────────────────────────────────────────────── */}
      <Section variant="dark">

        <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
          Who This Serves
        </p>
        <h2
          className="mb-12 text-3xl font-bold text-primary-foreground sm:text-4xl"
          style={{ letterSpacing: "-0.025em" }}
        >
          Built for owners, investors, and contractors.
        </h2>

        <div className="grid gap-px border border-white/20 bg-white/10 sm:grid-cols-2">
          {service.audience.map((item) => (
            <div key={item.title} className="bg-primary px-8 py-8">
              <p className="text-sm font-bold uppercase tracking-wider text-primary-foreground">
                {item.title}
              </p>
              <p className="mt-2 text-sm font-light text-primary-foreground/70">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </Section>

      {/* ── 6. Related Services ───────────────────────────────────────────────── */}
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

          <div className="grid gap-px border border-border bg-border sm:grid-cols-3">
            {related.map((rel) => (
              <Link
                key={rel.slug}
                href={`/services/${rel.slug}`}
                className="group cursor-pointer bg-background px-8 py-8 transition-colors hover:bg-surface"
              >
                <p className="text-[11px] font-medium uppercase tracking-widest text-secondary">
                  {rel.category}
                </p>
                <p className="mt-2 text-base font-bold text-foreground group-hover:text-foreground">
                  {rel.title}
                </p>
                <p className="mt-2 text-sm font-light leading-relaxed text-muted">
                  {rel.tagline}
                </p>
              </Link>
            ))}
          </div>

        </Section>
      )}

      {/* ── CTA Band ──────────────────────────────────────────────────────────── */}
      <CtaBand
        heading="Ready to convert your garage?"
        subheading="Share the garage type (attached or detached), your jurisdiction, and your timeline. We confirm the package scope and start within one business day."
        primaryAction={{ label: "Start Your Package", href: "/contact" }}
        variant="dark"
      />
    </>
  );
}
