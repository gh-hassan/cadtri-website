import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "CADTRI provides architectural drafting, permit set preparation, city comments response, structural coordination, code and compliance review, and renderings for residential and commercial projects.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        heading="Every drawing and permit deliverable your project needs."
        description="Professional architectural drafting and permit services for residential and commercial projects, delivered to permit-ready standard."
      />

      {/* ── Intro + Service directory ──────────────────────────────────────── */}
      <Section variant="default">

        {/* Horizontal intro — matches homepage compositional grammar */}
        <div className="grid items-end gap-10 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20 lg:pb-16">
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
              Full Service Scope
            </p>
            <h2
              className="font-bold text-3xl text-foreground sm:text-4xl"
              style={{ letterSpacing: "-0.025em" }}
            >
              End-to-end drawing and permit coverage.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted sm:text-lg">
              CADTRI handles the complete production scope, from initial architectural
              drawings through permit coordination, code review, and structural
              coordination. Project teams get a single professional resource for every
              documentation deliverable.
            </p>
          </div>
        </div>

        {/* Service directory — editorial horizontal rows */}
        {/* No top border: the intro rule above is the seam */}
        <nav aria-label="Service directory">
          <ul className="divide-y divide-border border-x border-b border-border" role="list">
            {services.map((service, i) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group block transition-colors duration-200 hover:bg-surface"
                >
                  <article className="grid grid-cols-[2.5rem_1fr] items-start gap-x-6 px-7 py-9 lg:grid-cols-[2.5rem_1fr_11rem] lg:items-center lg:gap-x-8 lg:px-9">

                    {/* Number */}
                    <span
                      className="pt-0.5 text-[11px] font-medium tabular-nums text-secondary lg:pt-0"
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Title + tagline */}
                    <div>
                      {/* Category badge — mobile only */}
                      <span className="mb-2 block text-[10px] font-medium uppercase tracking-widest text-secondary/70 lg:hidden">
                        {service.category}
                      </span>

                      <h2
                        className="font-bold text-xl text-foreground transition-colors duration-200 group-hover:text-secondary sm:text-2xl"
                        style={{ letterSpacing: "-0.02em" }}
                      >
                        {service.title}
                      </h2>

                      <p className="mt-2 max-w-2xl text-sm font-light leading-relaxed text-muted">
                        {service.tagline}
                      </p>

                      {/* Mobile link affordance */}
                      <p className="mt-4 flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-secondary lg:hidden">
                        View Service <span aria-hidden>→</span>
                      </p>
                    </div>

                    {/* Category + arrow — desktop only */}
                    <div className="hidden items-center justify-end gap-5 lg:flex">
                      <span className="text-[10px] font-medium uppercase tracking-widest text-muted">
                        {service.category}
                      </span>
                      <span
                        className="text-secondary transition-transform duration-200 group-hover:translate-x-1"
                        aria-hidden
                      >
                        →
                      </span>
                    </div>

                  </article>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

      </Section>

      {/* ── Capabilities callout ────────────────────────────────────────────── */}
      <Section variant="surface" className="border-t border-border">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">

          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
              One Firm, Every Deliverable
            </p>
            <h2
              className="font-bold text-3xl text-foreground sm:text-4xl"
              style={{ letterSpacing: "-0.025em" }}
            >
              The full production scope under one engagement.
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            <p className="font-light leading-relaxed text-muted sm:text-lg">
              Most permit projects require multiple overlapping services: architectural
              drawings, permit coordination, code review, and correction response.
              CADTRI handles all of it, which means fewer handoffs, more consistent
              documentation, and a single point of contact for every deliverable.
            </p>
            <p className="font-light leading-relaxed text-muted sm:text-lg">
              Whether you need a single service or the full scope, the engagement is
              structured around your project requirements and timeline.
            </p>
          </div>

        </div>
      </Section>

      <CtaBand
        heading="Ready to discuss your project?"
        subheading="Tell us your scope and we will confirm which services apply, the timeline, and what to expect."
        primaryAction={{ label: "Request a Proposal", href: "/contact" }}
        secondaryAction={{ label: "View Process", href: "/process" }}
        variant="dark"
      />
    </>
  );
}
