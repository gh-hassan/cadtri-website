import Link from "next/link";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { Button } from "@/components/shared/button";
import { getRelatedServices, getServiceBySlug } from "@/content/services";

type ServiceType = NonNullable<ReturnType<typeof getServiceBySlug>>;

export function OutdoorLayout({ service }: { service: ServiceType }) {
  const related = getRelatedServices(service);

  return (
    <>
      {/* ── 1. Structure Type Selector Grid ───────────────────────────────────── */}
      <Section variant="surface">
        <div className="mb-12 grid items-end gap-8 border-b border-border pb-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Structure Types We Cover
            </p>
            <h2
              className="font-bold text-3xl text-foreground sm:text-4xl"
              style={{ letterSpacing: "-0.025em" }}
            >
              Every outdoor structure, one permit package.
            </h2>
          </div>
          <p className="font-light leading-relaxed text-muted">
            From standard in-ground pools to custom spa-and-deck combinations, each structure type
            carries its own documentation requirements. We prepare the complete package for all of
            them.
          </p>
        </div>

        {service.useCases && service.useCases.length > 0 && (
          <div className="grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">
            {service.useCases.map((useCase, i) => (
              <div
                key={useCase}
                className="group relative bg-background px-6 py-6 transition-colors duration-200 hover:bg-surface"
              >
                {/* Left orange accent border */}
                <div className="absolute inset-y-0 left-0 w-0.5 bg-secondary opacity-0 transition-opacity duration-200 group-hover:opacity-100" aria-hidden />
                <p
                  className="mb-2 text-[11px] font-medium tabular-nums text-secondary"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="text-sm font-medium text-foreground leading-snug">{useCase}</p>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* ── 2. Overview + Process Highlights ──────────────────────────────────── */}
      <Section variant="default" className="border-t border-border">
        <div className="grid items-start gap-14 lg:grid-cols-[3fr_2fr] lg:gap-20">

          {/* Left: overview text */}
          <div>
            <p className="mb-6 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Service Overview
            </p>
            <p
              className="text-lg font-light leading-relaxed text-muted"
              style={{ maxWidth: "58ch" }}
            >
              {service.overview}
            </p>
            <div className="mt-10">
              <Button href="/contact" variant="primary" size="md">
                Request a Proposal
              </Button>
            </div>
          </div>

          {/* Right: process highlights 2x2 grid */}
          {service.processHighlights && service.processHighlights.length > 0 && (
            <div className="self-start border border-border">
              <div className="border-b border-border px-6 py-4">
                <p className="text-[11px] font-medium uppercase tracking-widest text-muted">
                  At a Glance
                </p>
              </div>
              <div className="grid grid-cols-2 gap-px bg-border">
                {service.processHighlights.map((highlight) => (
                  <div key={highlight.label} className="bg-background px-6 py-6">
                    <p
                      className="text-2xl font-bold tabular-nums text-secondary"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      {highlight.value}
                    </p>
                    <p className="mt-1.5 text-[11px] uppercase tracking-widest text-muted">
                      {highlight.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </Section>

      {/* ── 3. 4-Step Process Timeline ────────────────────────────────────────── */}
      {service.steps && service.steps.length > 0 && (
        <Section variant="surface" className="border-t border-border">
          <div className="mb-14 border-b border-border pb-12">
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              How It Works
            </p>
            <h2
              className="font-bold text-3xl text-foreground sm:text-4xl"
              style={{ letterSpacing: "-0.025em" }}
            >
              From scope to submission.
            </h2>
          </div>

          {/* Desktop: horizontal timeline. Mobile: stacked. */}
          <ol
            role="list"
            className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4"
          >
            {service.steps.map((step, i) => (
              <li key={step.title} className="relative bg-background px-7 py-8">
                {/* Top rule with connecting feel */}
                <div className="mb-6 flex items-center gap-3">
                  <span
                    className="text-[11px] font-medium tabular-nums text-secondary"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="h-px flex-1 bg-border" aria-hidden />
                </div>
                <p
                  className="text-sm font-bold text-foreground"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {step.title}
                </p>
                <p className="mt-3 text-sm font-light leading-relaxed text-muted">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {/* ── 4. Deliverables Grid ──────────────────────────────────────────────── */}
      <Section variant="default" className="border-t border-border">
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

        <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
          {service.includes.map((item, i) => (
            <div key={item.title} className="bg-surface px-8 py-7">
              <p className="mb-3 text-[10px] font-medium uppercase tracking-widest text-muted">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-foreground">
                {item.title}
              </p>
              <p className="mt-2 text-sm font-light leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 5. Why It Matters — Dark Compliance Strip ─────────────────────────── */}
      <Section variant="dark" className="border-t border-border">
        <div className="grid gap-14 lg:grid-cols-[3fr_2fr] lg:gap-24">

          {/* Left: why it matters */}
          <div>
            <p className="mb-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Why It Matters
            </p>
            <p className="text-lg font-light leading-relaxed text-primary-foreground">
              {service.whyItMatters}
            </p>
            <div className="mt-9">
              <Button href="/contact" variant="secondary" size="md">
                Request a Proposal
              </Button>
            </div>
          </div>

          {/* Right: compliance checklist panel */}
          <div className="self-start border border-white/20">
            <div className="border-b border-white/20 px-7 py-5">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-primary-foreground">
                Typical review triggers
              </p>
            </div>
            <ul role="list" className="flex flex-col divide-y divide-white/10">
              {[
                "Pool barrier and fencing requirements not documented",
                "Setback and easement encroachments not addressed",
                "Electrical and bonding sheets missing from package",
                "Drainage and grading plan absent or incomplete",
                "Structural engineering not coordinated with civil",
              ].map((trigger) => (
                <li key={trigger} className="flex items-start gap-4 px-7 py-5">
                  <span
                    className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary"
                    aria-hidden
                  />
                  <span className="text-sm font-light text-white/70">{trigger}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </Section>

      {/* ── 6. FAQ — Static Ruled List ────────────────────────────────────────── */}
      {service.faqs && service.faqs.length > 0 && (
        <Section variant="surface" className="border-t border-border">
          <div className="mb-12 grid items-end gap-8 border-b border-border pb-12 lg:grid-cols-2 lg:gap-20">
            <div>
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
            <p className="font-light leading-relaxed text-muted">
              Have a question not listed here? Contact us directly and we will answer before you
              submit an inquiry.
            </p>
          </div>

          <dl className="divide-y divide-border border-b border-t border-border">
            {service.faqs.map((faq) => (
              <div key={faq.question} className="py-8 lg:grid lg:grid-cols-[2fr_3fr] lg:gap-16">
                <dt className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-foreground lg:mb-0">
                  {faq.question}
                </dt>
                <dd className="text-sm font-light leading-relaxed text-muted">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </Section>
      )}

      {/* ── 7. Audience + Related Services ───────────────────────────────────── */}
      <Section variant="default" className="border-t border-border">
        <div className="grid gap-16 lg:grid-cols-[3fr_2fr] lg:gap-24">

          {/* Left: who this serves */}
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
                  All →
                </Link>
              </div>
              <ul className="divide-y divide-border border border-border" role="list">
                {related.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="group flex cursor-pointer items-center gap-5 px-6 py-6 transition-colors duration-200 hover:bg-surface"
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
                        →
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
