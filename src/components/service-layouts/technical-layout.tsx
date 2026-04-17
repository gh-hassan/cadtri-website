import Link from "next/link";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { Button } from "@/components/shared/button";
import type { Service } from "@/content/services";
import { getRelatedServices } from "@/content/services";

interface Props {
  service: Service;
}

export function TechnicalLayout({ service }: Props) {
  const related = getRelatedServices(service);

  return (
    <>
      {/* ── Overview + disciplines ────────────────────────────────────────────── */}
      <Section variant="default">

        {/* Full-width overview */}
        <div className="border-b border-border pb-14">
          <p className="mb-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            Overview
          </p>
          <div className="grid gap-10 lg:grid-cols-[3fr_2fr] lg:gap-20">
            <p className="font-light leading-relaxed text-foreground sm:text-lg">
              {service.overview}
            </p>
            <div className="flex flex-col justify-between gap-8">
              <p className="text-sm font-light leading-relaxed text-muted">
                {service.whyItMatters}
              </p>
              <Button href="/contact" variant="primary" size="md" className="self-start">
                Request a Proposal
              </Button>
            </div>
          </div>
        </div>

        {/* Disciplines / scope tags */}
        {service.disciplines && service.disciplines.length > 0 && (
          <div className="pt-10">
            <p className="mb-5 text-[11px] font-medium uppercase tracking-widest text-foreground">
              Scope Covers
            </p>
            <ul role="list" className="flex flex-wrap gap-2">
              {service.disciplines.map((d) => (
                <li
                  key={d}
                  className="border border-border bg-surface px-4 py-2 text-[11px] font-medium uppercase tracking-wider text-muted"
                >
                  {d}
                </li>
              ))}
            </ul>
          </div>
        )}

      </Section>

      {/* ── Deliverables — full-width detail list ────────────────────────────── */}
      <Section variant="surface" className="border-t border-border">

        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Deliverables
            </p>
            <h2
              className="font-bold text-3xl text-foreground sm:text-4xl"
              style={{ letterSpacing: "-0.025em" }}
            >
              What you receive.
            </h2>
          </div>
          <p className="font-light leading-relaxed text-muted">
            Every engagement produces the following documented deliverables. Scope is confirmed at intake and adjusted for project complexity.
          </p>
        </div>

        {/* Full-width definition-style list */}
        <dl className="flex flex-col divide-y divide-border border-y border-border">
          {service.includes.map((item, i) => (
            <div
              key={item.title}
              className="grid grid-cols-[2rem_1fr] gap-x-6 py-8 lg:grid-cols-[2rem_14rem_1fr] lg:gap-x-10"
            >
              {/* Index */}
              <span
                className="text-[10px] font-medium tabular-nums text-secondary"
                style={{ letterSpacing: "0.06em", paddingTop: "3px" }}
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Term */}
              <dt className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-foreground lg:mb-0">
                {item.title}
              </dt>

              {/* Definition */}
              <dd className="col-start-2 text-sm font-light leading-relaxed text-muted lg:col-start-3">
                {item.description}
              </dd>
            </div>
          ))}
        </dl>

      </Section>

      {/* ── Who it's for + CTA side by side ──────────────────────────────────── */}
      <Section variant="default" className="border-t border-border">
        <div className="grid gap-14 lg:grid-cols-[3fr_2fr] lg:gap-20">

          {/* Audience list */}
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Designed For
            </p>
            <h2
              className="mb-10 font-bold text-3xl text-foreground sm:text-4xl"
              style={{ letterSpacing: "-0.025em" }}
            >
              Who this service is for.
            </h2>
            <ul role="list" className="flex flex-col divide-y divide-border border-t border-border">
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
          </div>

          {/* Sticky CTA panel */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="flex flex-col gap-6 border border-border bg-surface p-8">
              <div>
                <p className="mb-2 text-[11px] font-medium uppercase tracking-widest text-secondary">
                  Start a Project
                </p>
                <p
                  className="font-bold text-xl text-foreground"
                  style={{ letterSpacing: "-0.015em" }}
                >
                  Ready to move forward?
                </p>
              </div>
              <p className="text-sm font-light leading-relaxed text-muted">
                Tell us your project scope and we will confirm which deliverables apply, the timeline, and pricing. We respond within one business day.
              </p>
              <Button href="/contact" variant="secondary" size="md">
                Request a Proposal
              </Button>
              <p className="text-xs font-light text-muted">
                Or email us directly at{" "}
                <a
                  href="mailto:info@cadtri.com"
                  className="text-secondary transition-colors hover:underline"
                >
                  info@cadtri.com
                </a>
              </p>
            </div>
          </div>

        </div>
      </Section>

      {/* ── Related services ─────────────────────────────────────────────────── */}
      {related.length > 0 && (
        <Section variant="surface" className="border-t border-border">
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
              All Services →
            </Link>
          </div>
          <ul className="divide-y divide-border border border-border" role="list">
            {related.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex items-center gap-6 px-7 py-7 transition-colors duration-200 hover:bg-background lg:px-9"
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
