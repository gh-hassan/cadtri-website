import type { Metadata } from "next";
import Link from "next/link";
import { Building2, LandPlot, Waves, MapPin } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { TableOfContents } from "@/components/shared/table-of-contents";
import { ComparisonTable } from "@/components/shared/comparison-table";
import { getServiceBySlug } from "@/content/services";
import { company } from "@/content/company";
import {
  BreadcrumbJsonLd,
  ServiceJsonLd,
  FaqJsonLd,
} from "@/lib/json-ld";

export const metadata: Metadata = {
  title: { absolute: "Architectural Drafting & Permits in Houston, TX | CADTRI" },
  description:
    "Permit-ready architectural drafting for Houston, Texas: no-zoning land use, post-Harvey floodplain compliance, tenant improvements, and ADU packages.",
  alternates: { canonical: "/locations/houston-tx" },
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
    detail: "Texas has no statewide building code. The City of Houston adopts International codes with local amendments that apply within city limits.",
  },
  {
    factor: "Land Use Review",
    detail: "Houston is the largest U.S. city without traditional zoning. Land use is controlled through deed restrictions and other private and municipal tools rather than a zoning code, which changes how a project's use is reviewed.",
  },
  {
    factor: "Reviewing Department",
    detail: "Houston Permitting Center (City of Houston Public Works) within city limits; Harris County Permits Office for unincorporated areas.",
  },
  {
    factor: "Floodplain Requirements",
    detail: "Chapter 19 of the Houston code requires new construction and substantial improvements in flood-prone areas to be elevated above base flood elevation, with additional freeboard adopted after Hurricane Harvey.",
  },
];

const houstonServiceSlugs = [
  "architectural-drafting",
  "permit-set-preparation",
  "adu-permit-packages",
  "home-addition-packages",
  "tenant-improvement-packages",
  "pool-spa-permits",
] as const;

const houstonServices = houstonServiceSlugs
  .map((slug) => getServiceBySlug(slug))
  .filter((s): s is NonNullable<typeof s> => Boolean(s));

const areasServed: string[] = [
  "Downtown Houston",
  "The Heights",
  "Montrose",
  "River Oaks",
  "Katy",
  "Sugar Land",
  "The Woodlands",
  "Pearland",
];

const workProcess: { title: string; description: string }[] = [
  {
    title: "Project Intake and Jurisdiction Confirmation",
    description:
      "We confirm whether your property falls under City of Houston or Harris County review, and whether deed restrictions or floodplain designation affect the project's scope.",
  },
  {
    title: "Drafting to Houston's Local Amendments",
    description:
      "Drawings are produced to the current code edition adopted by the City of Houston, including floodplain elevation requirements where they apply.",
  },
  {
    title: "Floodplain and Site Coordination",
    description:
      "For properties in a designated flood zone, finished floor elevation and foundation design are coordinated against Chapter 19 requirements before the set is finalized.",
  },
  {
    title: "Delivery and Plan Check Support",
    description:
      "Completed drawings are delivered ready for submission, and we remain available to respond to plan check correction comments through approval.",
  },
];

const faqs: { question: string; answer: string }[] = [
  {
    question: "Does CADTRI have a physical office in Houston?",
    answer:
      "No. CADTRI is headquartered in Austin, Texas, and delivers architectural drafting and permit support remotely to clients throughout the Houston area. Every project still starts with jurisdiction-specific research into City of Houston or Harris County requirements.",
  },
  {
    question: "Is Houston zoned?",
    answer:
      "No. Houston is the largest U.S. city without traditional zoning. Land use is controlled through deed restrictions and other municipal tools instead, which means a project's allowed use is checked differently than in most other major cities.",
  },
  {
    question: "What floodplain requirements apply in Houston?",
    answer:
      "Chapter 19 of the Houston code requires new construction and substantial improvements in flood-prone areas to be elevated above base flood elevation, with additional freeboard requirements adopted after Hurricane Harvey. We confirm flood zone status before drafting begins.",
  },
  {
    question: "Which department reviews my permit in Houston?",
    answer:
      "The Houston Permitting Center, part of City of Houston Public Works, reviews projects within city limits. Projects in unincorporated Harris County go through the Harris County Permits Office instead.",
  },
  {
    question: "Are ADUs permitted in Houston?",
    answer:
      "Yes. Houston is one of the more permissive Texas cities for accessory dwelling units, in contrast to cities like Dallas, which requires zoning overlays, or San Antonio, which mandates owner-occupancy.",
  },
  {
    question: "Does Houston require hurricane wind-load documentation like Florida?",
    answer:
      "Houston is hurricane-prone as a Gulf Coast city, but it is not subject to Florida's High-Velocity Hurricane Zone impact-glazing mandates. Wind design follows standard ASCE 7 and IBC engineering requirements instead.",
  },
];

const relatedReading: { title: string; description: string; href: string }[] = [
  {
    title: "ADU Permits in Texas: The 2026 City-by-City Guide",
    description: "Austin and Houston are permissive. Dallas requires overlays. San Antonio mandates owner-occupancy.",
    href: "/blog/adu-permits-texas-2026-guide",
  },
  {
    title: "ADU Permit Rules in Texas by City",
    description: "Austin, Houston, Dallas, and San Antonio compared for accessory dwelling unit requirements.",
    href: "/blog/adu-permits-texas-2026-guide",
  },
  {
    title: "Garage Conversion Permits in Florida and Texas",
    description: "Requirements, cost, and timeline for converting a garage into livable space.",
    href: "/blog/garage-conversion-permits-drawings-costs",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HoustonLocationPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Houston, TX", href: "/locations/houston-tx" },
        ]}
      />
      <ServiceJsonLd
        title="Architectural Drafting and Permit Services in Houston, TX"
        description="Permit-ready architectural drafting for Houston, Texas: no-zoning land use review, floodplain compliance, tenant improvements, and ADU packages."
        url={`${company.website}/locations/houston-tx`}
        category="Permitting"
        areaServed={[
          { "@type": "City", name: "Houston", containedInPlace: { "@type": "State", name: "Texas" } },
          { "@type": "AdministrativeArea", name: "Harris County", containedInPlace: { "@type": "State", name: "Texas" } },
        ]}
      />
      <FaqJsonLd items={faqs.map((f) => ({ question: f.question, answer: f.answer }))} />

      <PageHeader
        eyebrow="Houston, Texas"
        heading="Architectural drafting and permit drawings for the Houston area."
        description="CADTRI provides remote architectural drafting and permit support for homeowners, contractors, and architects working in Houston and Harris County, drafted to the City of Houston's local code amendments and floodplain requirements."
      />

      <TableOfContents items={tocItems} />

      {/* ── Overview ──────────────────────────────────────────────────────────── */}
      <Section variant="default" id="overview">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Serving Houston
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              A city without zoning, and a floodplain code that matters.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              Houston's lack of traditional zoning and its post-Harvey floodplain
              rules both shape what a permit-ready drawing set needs to show. We
              confirm both before drafting begins.
            </p>
          </div>
        </div>

        <div className="grid gap-px border-x border-b border-border bg-border sm:grid-cols-3">
          {[
            { icon: Building2, label: "Jurisdiction", value: "City of Houston / Harris County" },
            { icon: LandPlot,  label: "Land Use",     value: "No Traditional Zoning" },
            { icon: Waves,     label: "Floodplain",   value: "Chapter 19 Elevation Rules" },
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
              Houston permitting at a glance.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              No zoning code doesn't mean no land use review, it means a different
              one. Floodplain designation, meanwhile, can change a project's
              foundation design entirely.
            </p>
          </div>
        </div>

        <ComparisonTable
          caption="Houston / Harris County Permitting Factors"
          columns={["Factor", "What Applies in Houston"]}
          rows={jurisdictionFactors.map((f) => [f.factor, f.detail])}
        />

        <p className="mt-6 text-sm font-light leading-relaxed text-muted">
          For accessory dwelling unit rules across Texas cities, read{" "}
          <Link href="/blog/adu-permits-texas-2026-guide" className="underline underline-offset-2 decoration-border hover:text-secondary hover:decoration-secondary transition-colors duration-150">
            ADU permits in Texas: the 2026 city-by-city guide
          </Link>
          .
        </p>
      </Section>

      {/* ── Services directory ───────────────────────────────────────────────── */}
      <Section variant="default" className="border-t border-border" id="services">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Services for Houston Projects
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              The drawing packages we deliver most in Houston.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              From a commercial tenant improvement near downtown to a backyard
              pool permit in the suburbs, these are the services requested most
              across the Houston area.
            </p>
          </div>
        </div>

        <nav aria-label="Houston service directory">
          <ul className="divide-y divide-border border-x border-b border-border" role="list">
            {houstonServices.map((service, i) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
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
              Houston and the surrounding area.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              Remote drafting means the same jurisdiction-specific process applies
              whether your project is inside the Loop or out in Sugar Land.
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
              Remote drafting, floodplain-aware drawings.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-white/60">
              We don't have a Houston storefront. What we have is a process built
              around getting the land use review and flood zone right before a
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
              Houston permitting, explained.
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
            Go deeper on Texas permitting.
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
        heading="Ready to start your Houston-area project?"
        subheading="Tell us your project scope and location and we will confirm jurisdiction requirements, deliverables, timeline, and fee before work begins."
        primaryAction={{ label: "Request a Proposal", href: "/contact" }}
        secondaryAction={{ label: "View Permitting Services", href: "/permitting" }}
        variant="dark"
      />
    </>
  );
}
