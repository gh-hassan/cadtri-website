import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { Button } from "@/components/shared/button";
import { getIndustryBySlug, industries } from "@/content/industries";
import { getServiceBySlug } from "@/content/services";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/lib/json-ld";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return { title: "Industry Not Found" };
  return {
    title: industry.title,
    description: industry.metaDescription,
  };
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  const featuredServices = industry.featuredServiceSlugs
    .map((s) => getServiceBySlug(s))
    .filter(Boolean) as NonNullable<ReturnType<typeof getServiceBySlug>>[];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Industries", href: "/industries" },
          { name: industry.title, href: `/industries/${industry.slug}` },
        ]}
      />
      <ServiceJsonLd
        title={`${industry.title} Architectural Documentation`}
        description={industry.metaDescription}
        url={`/industries/${industry.slug}`}
        category={industry.title}
      />

      <PageHeader
        eyebrow={industry.title}
        heading={industry.heading}
        description={industry.description}
      />

      {/* ── Overview ─────────────────────────────────────────────────────────── */}
      <Section variant="default">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Overview
            </p>
            <p className="font-light leading-relaxed text-foreground sm:text-lg">
              {industry.overview}
            </p>
          </div>

          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              What We Deliver
            </p>
            <ul
              role="list"
              className="flex flex-col divide-y divide-border border-y border-border"
            >
              {industry.whatWeDeliver.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-4 py-4 text-sm font-light text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/contact" variant="primary" size="md">
                Request a Proposal
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Challenges ───────────────────────────────────────────────────────── */}
      <Section variant="surface" className="border-t border-border">

        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Common Challenges
            </p>
            <h2
              className="font-bold text-3xl text-foreground sm:text-4xl"
              style={{ letterSpacing: "-0.025em" }}
            >
              Where {industry.title.toLowerCase()} projects stall.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              These are the documentation and permitting issues that
              consistently delay {industry.title.toLowerCase()} projects.
              CADTRI addresses each one at the production stage, before the
              set reaches the plan checker.
            </p>
          </div>
        </div>

        <div className="grid gap-px border-x border-b border-border bg-border sm:grid-cols-2">
          {industry.challenges.map((challenge) => (
            <div
              key={challenge.title}
              className="flex flex-col gap-3 bg-surface px-8 py-8"
            >
              <h3
                className="text-[11px] font-semibold uppercase text-foreground"
                style={{ letterSpacing: "0.08em" }}
              >
                {challenge.title}
              </h3>
              <p className="text-sm font-light leading-relaxed text-muted">
                {challenge.description}
              </p>
            </div>
          ))}
        </div>

      </Section>

      {/* ── Featured services ─────────────────────────────────────────────────── */}
      {featuredServices.length > 0 && (
        <Section variant="default" className="border-t border-border">

          <div className="mb-12 flex flex-wrap items-end justify-between gap-8">
            <div>
              <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
                Relevant Services
              </p>
              <h2
                className="font-bold text-2xl text-foreground sm:text-3xl"
                style={{ letterSpacing: "-0.025em" }}
              >
                Services we apply to {industry.title.toLowerCase()} projects.
              </h2>
            </div>
            <Link
              href="/services"
              className="hidden shrink-0 text-[11px] font-medium uppercase tracking-wider text-secondary hover:text-foreground lg:block"
            >
              All Services
            </Link>
          </div>

          <ul className="divide-y divide-border border border-border" role="list">
            {featuredServices.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex items-center gap-6 px-7 py-7 transition-colors duration-200 hover:bg-surface lg:px-9"
                >
                  <span className="min-w-[5rem] text-[10px] font-medium uppercase tracking-widest text-muted">
                    {service.category}
                  </span>
                  <div className="flex-1">
                    <p
                      className="font-bold text-base text-foreground transition-colors duration-200 group-hover:text-secondary"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      {service.title}
                    </p>
                    <p className="mt-1 text-sm font-light text-muted">
                      {service.tagline}
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

        </Section>
      )}

      <CtaBand
        heading={`Ready to start your ${industry.title.toLowerCase()} project?`}
        subheading="Tell us your scope and we will confirm the relevant services, deliverables, timeline, and pricing. No commitment required."
        primaryAction={{ label: "Request a Proposal", href: "/contact" }}
        secondaryAction={{ label: "View All Services", href: "/services" }}
        variant="dark"
      />
    </>
  );
}
