import type { Metadata } from "next";
import Link from "next/link";
import { Building2, Wind, Landmark, MapPin } from "lucide-react";
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
  title: { absolute: "Architectural Drafting & Permits in Miami, FL | CADTRI" },
  description:
    "Permit-ready architectural drafting for Miami and Miami-Dade County: High-Velocity Hurricane Zone compliance, tenant improvements, and historic district submissions.",
  alternates: { canonical: "/locations/miami-fl" },
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
    detail: "Florida Building Code, current edition, applied with Miami-Dade County's High-Velocity Hurricane Zone (HVHZ) provisions, the strictest wind requirements in the state.",
  },
  {
    factor: "Reviewing Department",
    detail: "City of Miami Building Department within city limits, Miami-Dade County RER for unincorporated areas. Nearby municipalities like Miami Beach and Coral Gables maintain their own independent building departments.",
  },
  {
    factor: "Wind Requirements",
    detail: "HVHZ rules require Miami-Dade Notice of Acceptance (NOA) or Florida product approval for exterior envelope products, and typically mandate impact-rated glazing rather than optional shutters.",
  },
  {
    factor: "Historic and Design Review",
    detail: "Projects within a designated historic district, including Miami Beach's Art Deco Historic District, require Historic Preservation Board review in addition to standard building permit approval.",
  },
];

const miamiServiceSlugs = [
  "architectural-drafting",
  "permit-set-preparation",
  "tenant-improvement-packages",
  "historic-district-submissions",
  "short-term-rental-permits",
  "pool-spa-permits",
] as const;

const miamiServices = miamiServiceSlugs
  .map((slug) => getServiceBySlug(slug))
  .filter((s): s is NonNullable<typeof s> => Boolean(s));

const areasServed: string[] = [
  "Miami Beach",
  "Brickell",
  "Downtown Miami",
  "Coral Gables",
  "Coconut Grove",
  "Little Havana",
  "Doral",
  "Miami-Dade County",
];

const workProcess: { title: string; description: string }[] = [
  {
    title: "Project Intake and Jurisdiction Confirmation",
    description:
      "We confirm which municipality has review authority over the property, since Miami-Dade County includes dozens of cities with their own building departments and requirements.",
  },
  {
    title: "Drafting to HVHZ Requirements",
    description:
      "Drawings are produced to Florida Building Code and High-Velocity Hurricane Zone provisions, including impact-rated glazing and product approval documentation where required.",
  },
  {
    title: "Historic or Design Review Coordination",
    description:
      "For projects in a designated historic district, drawings are prepared to the documentation standard the local Historic Preservation Board expects, in addition to standard code compliance.",
  },
  {
    title: "Delivery and Plan Check Support",
    description:
      "Completed drawings are delivered ready for submission, and we remain available to respond to plan check correction comments through approval.",
  },
];

const faqs: { question: string; answer: string }[] = [
  {
    question: "Does CADTRI have a physical office in Miami?",
    answer:
      "No. CADTRI is based in Austin, Texas, and delivers architectural drafting and permit support remotely to clients throughout Miami-Dade County. Every project starts with jurisdiction-specific research into the municipality reviewing it.",
  },
  {
    question: "What is the High-Velocity Hurricane Zone, and does it affect my Miami project?",
    answer:
      "The HVHZ is a Florida Building Code designation covering Miami-Dade and Broward counties that imposes the strictest wind-load and product-approval requirements in the state. Most Miami-area projects need Miami-Dade Notice of Acceptance documentation or Florida product approval for exterior envelope products, and impact-rated glazing is typically required rather than optional.",
  },
  {
    question: "Which building department reviews my permit in Miami?",
    answer:
      "It depends on the municipality. City of Miami projects go through the City of Miami Building Department. Unincorporated Miami-Dade County projects go through Miami-Dade RER. Miami Beach, Coral Gables, and other cities in the county maintain their own independent departments.",
  },
  {
    question: "Do I need Historic Preservation Board approval for a project in Miami Beach?",
    answer:
      "If the property is within a designated historic district, including the Art Deco Historic District, yes. Historic Preservation Board review is required in addition to standard building permit approval, and it typically adds its own submission requirements and timeline.",
  },
  {
    question: "Do you handle tenant improvement permits for Miami commercial and hospitality projects?",
    answer:
      "Yes. Miami's dense commercial, hospitality, and multi-family high-rise market is one of the areas we draft for most, including MEP coordination and occupancy-specific documentation tenant improvements typically require.",
  },
  {
    question: "Do you draft short-term rental conversion permits in Miami-Dade County?",
    answer:
      "Yes, though short-term rental zoning and occupancy rules vary significantly by municipality within Miami-Dade County. We confirm the specific local ordinance before drafting a conversion package.",
  },
];

const relatedReading: { title: string; description: string; href: string }[] = [
  {
    title: "Hurricane Wind-Load Drawings in Florida",
    description: "What wind-load drawings show, which projects need them, and what they cost by wind zone.",
    href: "/blog/hurricane-wind-load-drawings-florida",
  },
  {
    title: "Converting a Property to a Short-Term Rental",
    description: "The permits and compliance steps you can't skip before listing a property.",
    href: "/blog/converting-a-property-to-a-short-term-rental-permits-compliance-you-cant-skip",
  },
  {
    title: "ADU Permits in Florida",
    description: "The real state of Florida ADU law: no statewide mandate, city-by-city rules.",
    href: "/blog/adu-permits-florida-hb-1339",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MiamiLocationPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Miami, FL", href: "/locations/miami-fl" },
        ]}
      />
      <ServiceJsonLd
        title="Architectural Drafting and Permit Services in Miami, FL"
        description="Permit-ready architectural drafting for Miami and Miami-Dade County: High-Velocity Hurricane Zone compliance, tenant improvements, and historic district submissions."
        url={`${company.website}/locations/miami-fl`}
        category="Permitting"
        areaServed={[
          { "@type": "City", name: "Miami", containedInPlace: { "@type": "State", name: "Florida" } },
          { "@type": "AdministrativeArea", name: "Miami-Dade County", containedInPlace: { "@type": "State", name: "Florida" } },
        ]}
      />
      <FaqJsonLd items={faqs.map((f) => ({ question: f.question, answer: f.answer }))} />

      <PageHeader
        eyebrow="Miami, Florida"
        heading="Architectural drafting and permit drawings for Miami-Dade County."
        description="CADTRI provides remote architectural drafting and permit support for homeowners, contractors, and architects working across Miami-Dade County, drafted to High-Velocity Hurricane Zone requirements and local historic district standards where they apply."
      />

      <TableOfContents items={tocItems} />

      {/* ── Overview ──────────────────────────────────────────────────────────── */}
      <Section variant="default" id="overview">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Serving Miami-Dade County
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Drafted to the strictest wind code in Florida.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              Miami-Dade County sits inside the Florida Building Code's High-Velocity
              Hurricane Zone, and the county contains dozens of municipalities each
              with their own building department. We confirm both before drafting begins.
            </p>
          </div>
        </div>

        <div className="grid gap-px border-x border-b border-border bg-border sm:grid-cols-3">
          {[
            { icon: Building2, label: "Jurisdiction", value: "City of Miami / Miami-Dade County" },
            { icon: Wind,      label: "Wind Region",  value: "High-Velocity Hurricane Zone" },
            { icon: Landmark,  label: "Historic Review", value: "Required in Designated Districts" },
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
              Miami permitting at a glance.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              The High-Velocity Hurricane Zone changes what a Miami drawing set has
              to show compared to most of the rest of Florida, and historic districts
              add a review layer standard permitting doesn't.
            </p>
          </div>
        </div>

        <ComparisonTable
          caption="Miami / Miami-Dade County Permitting Factors"
          columns={["Factor", "What Applies in Miami"]}
          rows={jurisdictionFactors.map((f) => [f.factor, f.detail])}
        />

        <p className="mt-6 text-sm font-light leading-relaxed text-muted">
          For more on Florida's wind-load requirements, read{" "}
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
              Services for Miami Projects
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              The drawing packages we deliver most in Miami.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              From a commercial tenant improvement in Brickell to a historic district
              submission in Miami Beach, these are the services requested most across
              Miami-Dade County.
            </p>
          </div>
        </div>

        <nav aria-label="Miami service directory">
          <ul className="divide-y divide-border border-x border-b border-border" role="list">
            {miamiServices.map((service, i) => (
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
              Miami-Dade County, municipality by municipality.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              Remote drafting means the same jurisdiction-specific process applies
              whether your project is in Downtown Miami or across the county in Doral.
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
              Remote drafting, HVHZ-ready drawings.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-white/60">
              We don't have a Miami storefront. What we have is a process built
              around getting the municipality and the wind zone right before a
              single line is drawn.
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
              Miami permitting, explained.
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
        heading="Ready to start your Miami-area project?"
        subheading="Tell us your project scope and municipality and we will confirm jurisdiction requirements, deliverables, timeline, and fee before work begins."
        primaryAction={{ label: "Request a Proposal", href: "/contact" }}
        secondaryAction={{ label: "View Permitting Services", href: "/permitting" }}
        variant="dark"
      />
    </>
  );
}
