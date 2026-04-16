import Link from "next/link";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { Button } from "@/components/shared/button";
import type { Service } from "@/content/services";
import { getRelatedServices } from "@/content/services";

interface Props {
  service: Service;
}

export function PackageLayout({ service }: Props) {
  const related = getRelatedServices(service);

  return (
    <>
      {/* ── Overview + Package checklist ─────────────────────────────────────── */}
      <Section variant="default">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">

          {/* Left: overview + CTA */}
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
              Overview
            </p>
            <p className="font-light leading-relaxed text-foreground sm:text-lg">
              {service.overview}
            </p>
            <div className="mt-10 border-t border-border pt-8">
              <p className="mb-2 text-[11px] font-medium uppercase tracking-widest text-secondary">
                Why It Matters
              </p>
              <p className="text-sm font-light leading-relaxed text-muted">
                {service.whyItMatters}
              </p>
            </div>
            <div className="mt-8">
              <Button href="/contact" variant="primary" size="md">
                Request a Proposal
              </Button>
            </div>
          </div>

          {/* Right: package includes checklist */}
          <div className="border border-border">
            <div className="border-b border-border bg-primary px-7 py-5">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-primary-foreground">
                Package Includes
              </p>
            </div>
            <ul role="list" className="flex flex-col divide-y divide-border bg-background">
              {service.includes.map((item) => (
                <li key={item.title} className="flex items-start gap-4 px-7 py-5">
                  <span className="mt-0.5 shrink-0 text-secondary" aria-hidden>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7.5L5.5 11L12 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-foreground">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm font-light leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </Section>

      {/* ── How it works — 3 horizontal steps ────────────────────────────────── */}
      <Section variant="surface" className="border-t border-border">
        <div className="mb-12 border-b border-border pb-12">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
            Getting Started
          </p>
          <h2
            className="font-bold text-3xl text-foreground sm:text-4xl"
            style={{ letterSpacing: "-0.025em" }}
          >
            How it works.
          </h2>
        </div>

        <div className="grid gap-px border-x border-b border-border bg-border sm:grid-cols-3">
          {[
            { num: "01", title: "Submit your project",    body: "Use our contact form to share your project type, site location, and any existing documentation. We respond within one business day to confirm scope." },
            { num: "02", title: "We confirm and begin",   body: "Once scope and timeline are agreed, we begin jurisdiction research and package production. You have a single point of contact throughout." },
            { num: "03", title: "Receive your package",   body: "Your complete, submission-ready package is delivered with all required documents organized and checked. We remain available for plan check support." },
          ].map((step) => (
            <div key={step.num} className="flex flex-col gap-4 bg-surface px-8 py-9">
              <span
                className="block font-bold tabular-nums text-secondary"
                style={{ fontSize: "2rem", letterSpacing: "-0.04em", lineHeight: 1 }}
                aria-hidden
              >
                {step.num}
              </span>
              <h3
                className="font-bold text-base text-foreground"
                style={{ letterSpacing: "-0.01em" }}
              >
                {step.title}
              </h3>
              <p className="text-sm font-light leading-relaxed text-muted">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      {service.faqs && service.faqs.length > 0 && (
        <Section variant="default" className="border-t border-border">
          <div className="mb-12 grid items-end gap-8 border-b border-border pb-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
                <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
                Common Questions
              </p>
              <h2
                className="font-bold text-3xl text-foreground sm:text-4xl"
                style={{ letterSpacing: "-0.025em" }}
              >
                Frequently asked.
              </h2>
            </div>
            <p className="font-light leading-relaxed text-muted">
              Still have questions? Contact us and we will answer them directly before you submit an inquiry.
            </p>
          </div>

          <dl className="flex flex-col divide-y divide-border border-b border-border">
            {service.faqs.map((faq) => (
              <div key={faq.question} className="grid gap-4 py-8 lg:grid-cols-2 lg:gap-16">
                <dt className="font-medium text-foreground">{faq.question}</dt>
                <dd className="text-sm font-light leading-relaxed text-muted">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </Section>
      )}

      {/* ── Who it's for ─────────────────────────────────────────────────────── */}
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

        <div className="grid gap-px border-x border-b border-border bg-border sm:grid-cols-2">
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
