import type { Metadata } from "next";
import Link from "next/link";
import { Building2, Wind, Waves, MapPin } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { TableOfContents } from "@/components/shared/table-of-contents";
import { ComparisonTable } from "@/components/shared/comparison-table";
import { getServiceBySlug, getServiceHref } from "@/content/services";
import { company } from "@/content/company";
import {
  BreadcrumbJsonLd,
  ServiceJsonLd,
  FaqJsonLd,
} from "@/lib/json-ld";

export const metadata: Metadata = {
  title: { absolute: "Architectural Drafting & Permits in Tampa, FL | CADTRI" },
  description:
    "Permit-ready architectural drafting for Tampa Bay homeowners, contractors, and architects. Florida Building Code compliance, ADU packages, additions, and pool permits.",
  alternates: { canonical: "/locations/tampa-fl" },
};

// ─── Page data ────────────────────────────────────────────────────────────────

const tocItems = [
  { id: "overview", label: "Overview" },
  { id: "code",     label: "Local Code" },
  { id: "services", label: "Services" },
  { id: "areas",    label: "Areas We Serve" },
  { id: "process",  label: "How We Work" },
  { id: "faq",      label: "FAQ" },
];

const jurisdictionFactors: { factor: string; detail: string }[] = [
  {
    factor: "Governing Building Code",
    detail: "Florida Building Code, current edition, applied with City of Tampa or Hillsborough County local amendments depending on jurisdiction.",
  },
  {
    factor: "Reviewing Department",
    detail: "City of Tampa Construction Services Center within city limits; Hillsborough County Development Services for unincorporated areas.",
  },
  {
    factor: "Wind Requirements",
    detail: "Wind-borne debris region: impact-rated or protected openings required. Tampa sits outside the High-Velocity Hurricane Zone that applies farther south in Miami-Dade and Broward.",
  },
  {
    factor: "Flood Considerations",
    detail: "FEMA flood zone review applies to properties near Tampa Bay, the Hillsborough River, and other flood-prone areas, affecting foundation and finished-floor elevation requirements.",
  },
];

const tampaServiceSlugs = [
  "architectural-drafting",
  "permit-set-preparation",
  "adu-permit-packages",
  "home-addition-packages",
  "garage-conversion-packages",
  "pool-spa-permits",
] as const;

const tampaServices = tampaServiceSlugs
  .map((slug) => getServiceBySlug(slug))
  .filter((s): s is NonNullable<typeof s> => Boolean(s));

const areasServed: string[] = [
  "South Tampa",
  "Westshore",
  "Seminole Heights",
  "Carrollwood",
  "Brandon",
  "Ybor City",
  "St. Petersburg",
  "Clearwater",
];

const workProcess: { title: string; description: string }[] = [
  {
    title: "Project Intake and Jurisdiction Confirmation",
    description:
      "We confirm whether your property falls under City of Tampa or Hillsborough County review, and the specific submission checklist that department uses.",
  },
  {
    title: "Drafting to Florida Building Code",
    description:
      "Drawings are produced to Florida Building Code requirements, including wind-borne debris region detailing where the project scope requires it.",
  },
  {
    title: "Local Code Review",
    description:
      "Before delivery, the set is checked against the specific Tampa or Hillsborough County amendments and submission format the reviewing department expects.",
  },
  {
    title: "Delivery and Plan Check Support",
    description:
      "Completed drawings are delivered ready for submission, and we remain available to respond to plan check correction comments through approval.",
  },
];

const faqs: { question: string; answer: string }[] = [
  {
    question: "Does CADTRI have a physical office in Tampa?",
    answer:
      "No. CADTRI is based in Austin, Texas, and delivers architectural drafting and permit support remotely to clients throughout the Tampa Bay area. Every project still starts with jurisdiction-specific research into City of Tampa or Hillsborough County requirements.",
  },
  {
    question: "What building code applies to my Tampa project?",
    answer:
      "The current edition of the Florida Building Code, applied with any local amendments adopted by the City of Tampa or Hillsborough County depending on where the property is located.",
  },
  {
    question: "Do I need hurricane wind-load documentation for a Tampa project?",
    answer:
      "Most Tampa projects fall within Florida's wind-borne debris region, which requires impact-rated or protected openings. Tampa is not in the High-Velocity Hurricane Zone, so requirements are less extensive than in Miami-Dade or Broward County.",
  },
  {
    question: "Which building department reviews permits in Tampa?",
    answer:
      "It depends on the property. Projects within Tampa city limits are reviewed by the City of Tampa Construction Services Center. Projects in unincorporated Hillsborough County go through Hillsborough County Development Services.",
  },
  {
    question: "Do you handle ADU and garage conversion permits in Tampa?",
    answer:
      "Yes. ADU and garage conversion packages are common requests in the Tampa Bay area, and we draft them to the specific requirements of the reviewing jurisdiction.",
  },
  {
    question: "Do you draft pool and spa permit packages for Florida properties?",
    answer:
      "Yes. Pool and spa permits are one of the most common drawing packages we produce for Florida homeowners, including barrier code compliance documentation required statewide.",
  },
];

const relatedReading: { title: string; description: string; href: string }[] = [
  {
    title: "Hurricane Wind-Load Drawings in Florida",
    description: "What wind-load drawings show, which projects need them, and what they cost by wind zone.",
    href: "/blog/hurricane-wind-load-drawings-florida",
  },
  {
    title: "ADU Permits in Florida",
    description: "The real state of Florida ADU law: no statewide mandate, city-by-city rules.",
    href: "/blog/adu-permits-florida-hb-1339",
  },
  {
    title: "Garage Conversion Permits in Florida and Texas",
    description: "Requirements, cost, and timeline for converting a garage into livable space.",
    href: "/blog/garage-conversion-permits-drawings-costs",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TampaLocationPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Tampa, FL", href: "/locations/tampa-fl" },
        ]}
      />
      <ServiceJsonLd
        title="Architectural Drafting and Permit Services in Tampa, FL"
        description="Permit-ready architectural drafting for the Tampa Bay area: ADU packages, home additions, garage conversions, and pool permits drafted to Florida Building Code."
        url={`${company.website}/locations/tampa-fl`}
        category="Permitting"
        areaServed={[
          { "@type": "City", name: "Tampa", containedInPlace: { "@type": "State", name: "Florida" } },
          { "@type": "AdministrativeArea", name: "Hillsborough County", containedInPlace: { "@type": "State", name: "Florida" } },
        ]}
      />
      <FaqJsonLd items={faqs.map((f) => ({ question: f.question, answer: f.answer }))} />

      <PageHeader
        eyebrow="Tampa, Florida"
        heading="Architectural drafting and permit drawings for the Tampa Bay area."
        description="CADTRI provides remote architectural drafting and permit support for homeowners, contractors, and architects working in Tampa and Hillsborough County, drafted to the current Florida Building Code and local jurisdiction requirements."
      />

      <TableOfContents items={tocItems} />

      {/* ── Overview ──────────────────────────────────────────────────────────── */}
      <Section variant="default" id="overview">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Serving Tampa Bay
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Drafted to what Tampa's building departments actually require.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              Tampa Bay projects move through either the City of Tampa or Hillsborough
              County, each with its own submission checklist layered on top of the
              Florida Building Code. We confirm which department has authority over
              the property before anything is drawn.
            </p>
          </div>
        </div>

        <div className="grid gap-px border-x border-b border-border bg-border sm:grid-cols-3">
          {[
            { icon: Building2, label: "Jurisdiction", value: "City of Tampa / Hillsborough County" },
            { icon: Wind,      label: "Wind Region",  value: "Wind-Borne Debris Region" },
            { icon: Waves,     label: "Flood Review",  value: "FEMA Zone-Dependent" },
          ].map((stat) => (
            <div key={stat.label} className="bg-surface px-8 py-8">
              <stat.icon size={20} strokeWidth={1.5} className="mb-4 text-secondary" aria-hidden />
              <p className="mb-2 text-[11px] font-medium uppercase tracking-widest text-secondary">
                {stat.label}
              </p>
              <p className="font-bold text-foreground" style={{ letterSpacing: "-0.02em" }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Local code and jurisdiction ───────────────────────────────────────── */}
      <Section variant="surface" className="border-t border-border" id="code">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Local Code and Jurisdiction
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Tampa permitting at a glance.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              The Florida Building Code sets the baseline, but which department
              reviews your project, and what wind and flood documentation it needs,
              depends on exactly where the property sits.
            </p>
          </div>
        </div>

        <ComparisonTable
          caption="Tampa / Hillsborough County Permitting Factors"
          columns={["Factor", "What Applies in Tampa"]}
          rows={jurisdictionFactors.map((f) => [f.factor, f.detail])}
        />

        <p className="mt-6 text-sm font-light leading-relaxed text-muted">
          For a deeper look at wind-load documentation statewide, read{" "}
          <Link href="/blog/hurricane-wind-load-drawings-florida" className="underline underline-offset-2 decoration-border hover:text-secondary hover:decoration-secondary transition-colors duration-150">
            hurricane wind-load drawings in Florida
          </Link>{" "}
          and our{" "}
          <Link href="/structural-drafting#regional" className="underline underline-offset-2 decoration-border hover:text-secondary hover:decoration-secondary transition-colors duration-150">
            regional structural factors
          </Link>{" "}
          breakdown.
        </p>
      </Section>

      {/* ── Services directory ───────────────────────────────────────────────── */}
      <Section variant="default" className="border-t border-border" id="services">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Services for Tampa Bay Projects
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              The drawing packages we deliver most in Tampa.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              From a first ADU application to a backyard pool permit, these are the
              services Tampa Bay homeowners, contractors, and architects request most.
            </p>
          </div>
        </div>

        <nav aria-label="Tampa service directory">
          <ul className="divide-y divide-border border-x border-b border-border" role="list">
            {tampaServices.map((service, i) => (
              <li key={service.slug}>
                <Link
                  href={getServiceHref(service.slug)}
                  className="group block transition-colors duration-200 hover:bg-surface"
                >
                  <article className="grid grid-cols-[2.5rem_1fr] items-start gap-x-6 px-7 py-8 lg:grid-cols-[2.5rem_1fr_9rem] lg:items-center lg:gap-x-8 lg:px-9">
                    <span className="pt-0.5 text-[11px] font-medium tabular-nums text-secondary lg:pt-0" aria-hidden>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3
                        className="font-bold text-lg text-foreground transition-colors duration-200 group-hover:text-secondary sm:text-xl"
                        style={{ letterSpacing: "-0.02em" }}
                      >
                        {service.title}
                      </h3>
                      <p className="mt-2 max-w-2xl text-sm font-light leading-relaxed text-muted">
                        {service.tagline}
                      </p>
                    </div>
                    <div className="hidden items-center justify-end lg:flex">
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

      {/* ── Areas we serve ───────────────────────────────────────────────────── */}
      <Section variant="surface" className="border-t border-border" id="areas">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Areas We Serve
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Tampa Bay and the surrounding area.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              Remote drafting means the same jurisdiction-specific process applies
              whether your project is in South Tampa or across the bay in St. Petersburg.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {areasServed.map((area) => (
            <span
              key={area}
              className="inline-flex items-center gap-2 border border-border bg-background px-4 py-2 text-sm font-light text-muted"
            >
              <MapPin size={14} strokeWidth={1.5} className="text-secondary" aria-hidden />
              {area}
            </span>
          ))}
        </div>
      </Section>

      {/* ── How we work ───────────────────────────────────────────────────────── */}
      <Section variant="dark" className="border-t border-border" id="process">
        <div className="mb-14 border-b border-white/10 pb-14 grid items-end gap-8 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              How We Work
            </p>
            <h2
              className="font-bold text-primary-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Remote drafting, local code compliance.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-white/60">
              We don't have a Tampa storefront. What we have is a process built
              around getting the jurisdiction right before a single line is drawn.
            </p>
          </div>
        </div>

        <ol role="list" className="flex flex-col gap-0">
          {workProcess.map((step, i) => (
            <li
              key={step.title}
              className="grid grid-cols-[3rem_1fr] gap-x-8 border-b border-white/10 py-10 first:border-t lg:grid-cols-[5rem_1fr] lg:gap-x-12"
            >
              <div className="pt-0.5">
                <span
                  className="block font-bold tabular-nums text-secondary"
                  style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.04em", lineHeight: 1 }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-bold text-xl text-primary-foreground" style={{ letterSpacing: "-0.015em" }}>
                  {step.title}
                </h3>
                <p className="font-light leading-relaxed text-white/60">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── FAQ ───────────────────────────────────────────────────────────────── */}
      <Section variant="surface" className="border-t border-border" id="faq">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Frequently Asked
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Tampa permitting, explained.
            </h2>
          </div>
        </div>

        <dl className="divide-y divide-border border-t border-border">
          {faqs.map((faq) => (
            <div key={faq.question} className="grid gap-x-10 gap-y-3 py-8 lg:grid-cols-[1fr_1.4fr]">
              <dt className="font-bold text-foreground" style={{ letterSpacing: "-0.02em" }}>
                {faq.question}
              </dt>
              <dd className="text-sm font-light leading-relaxed text-muted">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* ── Related reading ──────────────────────────────────────────────────── */}
      <Section variant="default" className="border-t border-border" id="resources">
        <div className="mb-14">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
            From the Blog
          </p>
          <h2
            className="font-bold text-foreground"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Go deeper on Florida permitting.
          </h2>
        </div>

        <div className="grid gap-px border-x border-b border-border bg-border sm:grid-cols-3">
          {relatedReading.map((post) => (
            <Link
              key={post.href}
              href={post.href}
              className="group flex flex-col gap-3 bg-surface px-8 py-8 transition-colors duration-200 hover:bg-background"
            >
              <h3
                className="font-bold text-foreground transition-colors duration-200 group-hover:text-secondary"
                style={{ letterSpacing: "-0.02em" }}
              >
                {post.title}
              </h3>
              <p className="text-sm font-light leading-relaxed text-muted">{post.description}</p>
              <span className="mt-1 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-widest text-secondary">
                Read Article <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <CtaBand
        heading="Ready to start your Tampa-area project?"
        subheading="Tell us your project scope and location and we will confirm jurisdiction requirements, deliverables, timeline, and fee before work begins."
        primaryAction={{ label: "Request a Proposal", href: "/contact" }}
        secondaryAction={{ label: "View Permitting Services", href: "/permitting" }}
        variant="dark"
      />
    </>
  );
}
