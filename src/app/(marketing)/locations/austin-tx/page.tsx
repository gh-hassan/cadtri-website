import type { Metadata } from "next";
import Link from "next/link";
import { Building2, Zap, Layers, MapPin } from "lucide-react";
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
  title: { absolute: "Architectural Drafting & Permits in Austin, TX | CADTRI" },
  description:
    "Permit-ready architectural drafting for Austin, Texas, from our Austin headquarters. City of Austin code amendments, ADU packages, and local energy code compliance.",
  alternates: { canonical: "/locations/austin-tx" },
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
    detail: "Texas has no statewide building code. The City of Austin adopts International codes (IBC, IRC, IECC) with local amendments that apply within city limits.",
  },
  {
    factor: "Reviewing Department",
    detail: "City of Austin Development Services Department within city limits; Travis County Development Services for unincorporated areas.",
  },
  {
    factor: "Local Energy Code",
    detail: "Austin Energy administers local energy code amendments that typically exceed the baseline IECC requirements used elsewhere in Texas, affecting HVAC, insulation, and window specifications.",
  },
  {
    factor: "Foundation Considerations",
    detail: "Central Texas expansive clay soils commonly drive foundation engineering decisions, post-tension slab design is standard on much of the new residential and addition work in the Austin area.",
  },
];

const austinServiceSlugs = [
  "architectural-drafting",
  "permit-set-preparation",
  "adu-permit-packages",
  "home-addition-packages",
  "garage-conversion-packages",
  "interior-remodel-packages",
] as const;

const austinServices = austinServiceSlugs
  .map((slug) => getServiceBySlug(slug))
  .filter((s): s is NonNullable<typeof s> => Boolean(s));

const areasServed: string[] = [
  "Downtown Austin",
  "South Congress",
  "East Austin",
  "Zilker",
  "Mueller",
  "Round Rock",
  "Cedar Park",
  "Georgetown",
];

const workProcess: { title: string; description: string }[] = [
  {
    title: "Project Intake and Jurisdiction Confirmation",
    description:
      "We confirm whether your property falls under City of Austin or Travis County review, and the specific local amendments that apply on top of the base International codes.",
  },
  {
    title: "Drafting to Austin's Local Amendments",
    description:
      "Drawings are produced to the current code edition adopted by the City of Austin, including local energy code requirements administered by Austin Energy.",
  },
  {
    title: "Foundation and Site Coordination",
    description:
      "Where expansive soils or site conditions affect the structural design, foundation drawings are coordinated with your engineer's geotechnical recommendations before the set is finalized.",
  },
  {
    title: "Delivery and Plan Check Support",
    description:
      "Completed drawings are delivered ready for submission, and we remain available to respond to plan check correction comments through approval.",
  },
];

const faqs: { question: string; answer: string }[] = [
  {
    question: "Does CADTRI have a physical office in Austin?",
    answer:
      "Yes. CADTRI is headquartered in Austin, Texas. We draft for clients nationwide, but Austin-area projects benefit from direct local familiarity with the City of Austin's permitting process and local amendments.",
  },
  {
    question: "What building code applies to my Austin project?",
    answer:
      "Texas has no statewide building code, so requirements are set city by city. The City of Austin adopts International codes with local amendments, and we confirm the current edition in effect before drafting begins.",
  },
  {
    question: "Does Austin have its own energy code requirements?",
    answer:
      "Yes. Austin Energy administers local energy code amendments that typically exceed the baseline IECC requirements used in many other Texas cities, affecting HVAC sizing, insulation, and window specifications on the drawing set.",
  },
  {
    question: "Are ADUs permitted in Austin?",
    answer:
      "Yes. Austin is one of the more permissive Texas cities for accessory dwelling units, in contrast to cities like Dallas, which requires zoning overlays, or San Antonio, which mandates owner-occupancy.",
  },
  {
    question: "Do expansive soils affect foundation design in Austin?",
    answer:
      "Often, yes. Central Texas clay soils expand and contract with moisture, which is why post-tension slab foundations are common on Austin-area residential and addition projects. We coordinate foundation drawings with your engineer's geotechnical report.",
  },
  {
    question: "Which department reviews my permit in Austin?",
    answer:
      "The City of Austin Development Services Department reviews projects within city limits. Projects in unincorporated Travis County go through Travis County Development Services instead.",
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

export default function AustinLocationPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Austin, TX", href: "/locations/austin-tx" },
        ]}
      />
      <ServiceJsonLd
        title="Architectural Drafting and Permit Services in Austin, TX"
        description="Permit-ready architectural drafting for Austin, Texas: ADU packages, home additions, and garage conversions drafted to City of Austin code amendments."
        url={`${company.website}/locations/austin-tx`}
        category="Permitting"
        areaServed={[
          { "@type": "City", name: "Austin", containedInPlace: { "@type": "State", name: "Texas" } },
          { "@type": "AdministrativeArea", name: "Travis County", containedInPlace: { "@type": "State", name: "Texas" } },
        ]}
      />
      <FaqJsonLd items={faqs.map((f) => ({ question: f.question, answer: f.answer }))} />

      <PageHeader
        eyebrow="Austin, Texas"
        heading="Architectural drafting and permit drawings, from our Austin headquarters."
        description="CADTRI is headquartered in Austin, Texas, and provides architectural drafting and permit support for homeowners, contractors, and architects working in the Austin area, drafted to the City of Austin's local code amendments and energy requirements."
      />

      <TableOfContents items={tocItems} />

      {/* ── Overview ──────────────────────────────────────────────────────────── */}
      <Section variant="default" id="overview">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Home Turf
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Drafted with direct familiarity with Austin's process.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              Texas has no statewide building code, so what the City of Austin
              requires is its own set of local amendments layered onto the base
              International codes. Being headquartered here means we track those
              changes directly.
            </p>
          </div>
        </div>

        <div className="grid gap-px border-x border-b border-border bg-border sm:grid-cols-3">
          {[
            { icon: Building2, label: "Jurisdiction", value: "City of Austin / Travis County" },
            { icon: Zap,       label: "Energy Code",  value: "Austin Energy Local Amendments" },
            { icon: Layers,    label: "Foundations",  value: "Expansive Soil Considerations" },
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
              Austin permitting at a glance.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              With no statewide building code, Austin's own local amendments,
              energy code requirements, and site conditions do most of the work
              in shaping the drawing set.
            </p>
          </div>
        </div>

        <ComparisonTable
          caption="Austin / Travis County Permitting Factors"
          columns={["Factor", "What Applies in Austin"]}
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
              Services for Austin Projects
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              The drawing packages we deliver most in Austin.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              From a backyard ADU to a full interior remodel, these are the
              services Austin-area homeowners, contractors, and architects request most.
            </p>
          </div>
        </div>

        <nav aria-label="Austin service directory">
          <ul className="divide-y divide-border border-x border-b border-border" role="list">
            {austinServices.map((service, i) => (
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
              Austin and the surrounding area.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              Being local to Austin means the same jurisdiction-specific process
              applies whether your project is downtown or out toward Georgetown.
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
              Local headquarters, the same disciplined process.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-white/60">
              Being based in Austin doesn't change the process, it just means we
              track the City's local amendments as they happen.
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
              Austin permitting, explained.
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
        heading="Ready to start your Austin-area project?"
        subheading="Tell us your project scope and we will confirm jurisdiction requirements, deliverables, timeline, and fee before work begins."
        primaryAction={{ label: "Request a Proposal", href: "/contact" }}
        secondaryAction={{ label: "View Permitting Services", href: "/permitting" }}
        variant="dark"
      />
    </>
  );
}
