import type { Metadata } from "next";
import Link from "next/link";
import { Fan, Zap, Droplet, Flame, ClipboardList, GitMerge } from "lucide-react";
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

const tocItems = [
  { id: "overview",  label: "What's Included" },
  { id: "process",   label: "The Process" },
  { id: "utilities", label: "Utility Connections" },
  { id: "building-type", label: "Residential vs. Commercial" },
  { id: "services",  label: "Services" },
  { id: "pitfalls",  label: "Common Pitfalls" },
  { id: "glossary",  label: "Glossary" },
  { id: "faq",       label: "FAQ" },
];

const scopeIcons = [Fan, Zap, Droplet, Flame, ClipboardList, GitMerge];

const utilityConnections: { utility: string; shared: string; separate: string; costNote: string }[] = [
  {
    utility: "Water",
    shared: "Shared meter off the existing service",
    separate: "New dedicated meter and service line",
    costNote: "Varies by jurisdiction and distance to the main",
  },
  {
    utility: "Sewer",
    shared: "Shared lateral tie-in",
    separate: "New dedicated lateral connection",
    costNote: "Often driven by distance to the municipal main",
  },
  {
    utility: "Electric",
    shared: "Shared panel with a new subpanel",
    separate: "New dedicated meter and service",
    costNote: "Typically the largest share of utility cost",
  },
  {
    utility: "Gas",
    shared: "Shared line with a new branch",
    separate: "New dedicated gas meter",
    costNote: "Required when appliance load exceeds existing capacity",
  },
];

const glossaryTerms: { term: string; definition: string; href?: string }[] = [
  {
    term: "One-Line Diagram",
    definition: "A simplified electrical diagram showing the power distribution path from service to panels, used as the starting point for electrical drafting.",
  },
  {
    term: "Riser Diagram",
    definition: "A schematic showing how plumbing, fire sprinkler, or electrical systems run vertically through a multi-story or multi-unit building.",
  },
  {
    term: "Panel Schedule",
    definition: "A table listing every circuit on an electrical panel, its breaker size, load, and description, required for plan check verification.",
  },
  {
    term: "DWV (Drain-Waste-Vent)",
    definition: "The plumbing piping system that carries waste and wastewater to the sewer or septic system while venting sewer gases safely outside.",
  },
  {
    term: "Fixture Unit",
    definition: "A standardized value assigned to each plumbing fixture, used to size waste and water lines to the correct capacity.",
  },
  {
    term: "Title 24",
    definition: "California's energy code, which sets efficiency requirements for HVAC, insulation, and lighting that must be documented on the MEP set.",
    href: "/blog/title-24-energy-code-for-adus-californias-energy-compliance-requirements",
  },
];

export const metadata: Metadata = {
  title: { absolute: "MEP Drafting | HVAC, Electrical & Plumbing Plans | CADTRI" },
  description:
    "MEP drafting services: HVAC, electrical, and plumbing plans drafted from your engineer's design for residential and commercial permit sets.",
  alternates: { canonical: "/mep-drafting" },
};

// ─── Page data ────────────────────────────────────────────────────────────────

const drawingScope: { title: string; description: string }[] = [
  {
    title: "HVAC Plans",
    description:
      "Equipment layout, ductwork routing, diffuser and register locations, and equipment schedules drafted from the mechanical engineer's design.",
  },
  {
    title: "Electrical Plans",
    description:
      "Power and lighting plans, panel schedules, circuiting, and device locations drafted to the electrical engineer's load calculations.",
  },
  {
    title: "Plumbing Plans",
    description:
      "Fixture layout, waterline and DWV routing, and plumbing isometrics drafted from the plumbing engineer's design.",
  },
  {
    title: "Fire Sprinkler and Life Safety Coordination",
    description:
      "Sprinkler head layout and life safety system references coordinated onto the MEP set where required by occupancy.",
  },
  {
    title: "Equipment Schedules and Riser Diagrams",
    description:
      "Mechanical, electrical, and plumbing equipment schedules along with riser diagrams cross-referenced to the plans.",
  },
  {
    title: "Architectural Coordination Sheets",
    description:
      "MEP sheets checked against the architectural and structural sets for ceiling heights, chases, and clearance conflicts.",
  },
];

const draftingProcess: { title: string; description: string }[] = [
  {
    title: "Engineer Design Intake",
    description:
      "We start from your mechanical, electrical, or plumbing engineer's load calculations, one-line diagrams, redlines, or an existing MEP set that needs to be redrawn or revised.",
  },
  {
    title: "Discipline Plan Production",
    description:
      "HVAC, electrical, and plumbing plans are drafted in CAD to the equipment, routing, and device locations specified in the engineer's design, coordinated against the architectural floor plans.",
  },
  {
    title: "Schedule and Riser Diagram Drafting",
    description:
      "Equipment schedules, panel schedules, and riser diagrams are drawn and cross-referenced to the plans and details they support.",
  },
  {
    title: "Coordination with the Architectural Set",
    description:
      "Ceiling heights, chases, structural clearances, and ductwork routing are checked against the architectural and structural drawings so the sets agree before the package reaches the engineer for review.",
  },
  {
    title: "Engineer Review and Delivery",
    description:
      "The completed MEP sheets are returned to your engineer or engineers of record for review and stamp, then delivered in your required format ready for permit submission.",
  },
];

const buildingTypes: { title: string; description: string; href: string; linkLabel: string }[] = [
  {
    title: "Residential",
    description:
      "Single-family additions and ADUs typically need HVAC equipment layout, a panel upgrade or new circuit plan, and plumbing fixture layout drafted from the engineer's design for the specific scope.",
    href: "/services/home-addition-packages",
    linkLabel: "Home Addition Packages",
  },
  {
    title: "Commercial",
    description:
      "Commercial, restaurant, and tenant improvement projects carry far more complex MEP scope: kitchen exhaust systems, multiple HVAC zones, fire sprinkler coordination, and tighter life safety documentation.",
    href: "/services/tenant-improvement-packages",
    linkLabel: "Tenant Improvement Packages",
  },
];

const draftingPitfalls: { title: string; description: string }[] = [
  {
    title: "Ceiling Clearance Conflicts",
    description:
      "Ductwork or piping routed without checking clearance against structural members and finished ceiling heights, a frequent field conflict on tenant improvement projects.",
  },
  {
    title: "Missing Equipment Schedules",
    description:
      "Equipment called out on the plans by tag but never listed in a schedule with capacity, model, or performance data.",
  },
  {
    title: "Outdated Load Calculations",
    description:
      "Plans drafted against an earlier version of the engineer's load calculations after a design change was made downstream.",
  },
  {
    title: "Uncoordinated Ductwork and Structural Members",
    description:
      "HVAC routing that was never checked against the structural framing plan, discovered only when the trades get to the field.",
  },
  {
    title: "Incomplete Panel Schedules",
    description:
      "Electrical panel schedules missing circuit descriptions, breaker sizes, or load totals the plan checker needs to verify capacity.",
  },
  {
    title: "Fixture Count Mismatches",
    description:
      "Plumbing fixture counts on the plan that don't match the fixture unit calculations used to size the waste and water lines.",
  },
  {
    title: "Missing Riser Diagrams",
    description:
      "Multi-story or multi-unit projects submitted without the riser diagrams a plan checker needs to verify the system layout.",
  },
  {
    title: "Unreferenced Details",
    description:
      "Detail callouts on the MEP plans that don't point to an actual detail drawn elsewhere in the set.",
  },
];

const faqs: { question: string; answer: string }[] = [
  {
    question: "What is MEP drafting?",
    answer:
      "MEP drafting is the CAD production of mechanical, electrical, and plumbing drawings, HVAC plans, power and lighting plans, plumbing plans, schedules, and riser diagrams, based on a licensed engineer's calculations, one-line diagrams, or design direction.",
  },
  {
    question: "Do you provide mechanical, electrical, or plumbing engineering, or just drafting?",
    answer:
      "Drafting only. We are not a licensed MEP engineering firm and do not produce load calculations, stamped designs, or engineering judgment. We draft the MEP drawing set from your engineer's calculations, one-line diagrams, or redlines, and the engineer or engineers of record review and stamp the final set.",
  },
  {
    question: "Can you draft from my engineer's calculations or one-line diagrams?",
    answer:
      "Yes. That's the typical starting point: load calculations, one-line diagrams, hand markups, a prior MEP set that needs revision, or a combination of all three. We draft the CAD sheets to match what the engineer has specified.",
  },
  {
    question: "What MEP drawings do you produce?",
    answer:
      "HVAC plans, electrical power and lighting plans, plumbing plans, equipment and panel schedules, riser diagrams, and fire sprinkler or life safety coordination sheets where required by occupancy.",
  },
  {
    question: "Do you handle restaurant and commercial kitchen MEP?",
    answer:
      "Yes. Commercial kitchen projects add exhaust hood systems, grease interceptor plumbing, and dedicated electrical and gas requirements on top of standard tenant improvement MEP, all drafted from your engineer's design.",
  },
  {
    question: "How does MEP drafting differ from MEP coordination?",
    answer:
      "MEP drafting produces the mechanical, electrical, and plumbing drawing set itself. MEP coordination reviews an already-produced MEP set against the architectural drawings to resolve conflicts before permit submission. Most multi-discipline projects use both: drafting to produce the set, coordination to make sure it agrees with the architectural drawings.",
  },
  {
    question: "What software and file formats do you use?",
    answer:
      "We draft in AutoCAD and Revit and deliver print-ready PDF along with native DWG or RVT files, matching the format your engineer or the building department requires.",
  },
  {
    question: "How much do utility connections typically cost for an ADU or addition?",
    answer:
      "Total water, sewer, electric, and gas connection costs typically range from $9,000 to $27,000, depending heavily on whether the project can share existing service or needs new dedicated connections, and the distance to the utility mains.",
  },
  {
    question: "Does Title 24 energy compliance affect MEP drafting?",
    answer:
      "Yes, in California. Title 24 sets efficiency requirements for HVAC equipment, insulation, and lighting that have to be documented alongside the MEP plans, and mismatches between the energy compliance forms and the mechanical plans are a common correction trigger.",
  },
  {
    question: "How does fire sprinkler documentation relate to the life safety plan?",
    answer:
      "Sprinkler head layout on the MEP set is coordinated against the egress and life safety plan so exit paths, occupant load, and sprinkler coverage all agree, since a plan checker reviews both together for occupancies that require it.",
  },
];

const relatedReading: { title: string; description: string; href: string }[] = [
  {
    title: "ADU Utility Connections, Water, Sewer, Electric, and Gas",
    description: "Shared versus separate connections, and typical costs of $9K to $27K.",
    href: "/blog/adu-utility-connections-water-sewer-electric-and-gas",
  },
  {
    title: "Title 24 Energy Code for ADUs",
    description: "California's energy compliance requirements for HVAC, insulation, and windows.",
    href: "/blog/title-24-energy-code-for-adus-californias-energy-compliance-requirements",
  },
  {
    title: "Egress & Life-Safety Plans",
    description: "What they show, and why sprinkler and exit documentation is reviewed together.",
    href: "/blog/egress-and-life-safety-plans",
  },
  {
    title: "Commercial vs. Residential Drawings",
    description: "Why commercial MEP scope runs heavier than most residential projects.",
    href: "/blog/commercial-vs-residential-drawings",
  },
];

const mepServiceSlugs = [
  "mep-coordination",
  "redline-to-cad",
  "bim-coordination",
  "tenant-improvement-packages",
  "construction-administration",
  "title-24-energy-compliance",
] as const;

const mepServices = mepServiceSlugs
  .map((slug) => getServiceBySlug(slug))
  .filter((s): s is NonNullable<typeof s> => Boolean(s));

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MepDraftingPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "MEP Drafting", href: "/mep-drafting" },
        ]}
      />
      <ServiceJsonLd
        title="MEP Drafting"
        description="CAD drafting of HVAC, electrical, and plumbing plans, schedules, and riser diagrams from your engineer's design, for residential and commercial permits."
        url={`${company.website}/mep-drafting`}
        category="Drawings"
      />
      <FaqJsonLd items={faqs.map((f) => ({ question: f.question, answer: f.answer }))} />

      <PageHeader
        eyebrow="MEP Drafting"
        heading="MEP drafting that turns your engineer's design into permit-ready drawings."
        description="We draft HVAC, electrical, and plumbing plans, equipment schedules, and riser diagrams from your engineer's calculations, one-line diagrams, or redlines. We are a drafting company, not a licensed MEP engineering firm: your engineer or engineers of record design and stamp the work, we produce the CAD drawings."
      />

      <TableOfContents items={tocItems} />

      {/* ── What MEP drafting covers ─────────────────────────────────────────── */}
      <Section variant="default" id="overview">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              What MEP Drafting Covers
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              The drawings your engineer's design becomes.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              A mechanical, electrical, or plumbing calculation package tells you
              what the design requires. MEP drafting turns that design into the
              coordinated drawing set a plan checker and a contractor can actually
              build from, reviewed against the <Link href="/architectural-drafting-services" className="underline underline-offset-2 decoration-border hover:text-secondary hover:decoration-secondary transition-colors duration-150">architectural drawings</Link> for the same project.
            </p>
          </div>
        </div>

        <div className="grid gap-px border-x border-b border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {drawingScope.map((item, i) => {
            const Icon = scopeIcons[i];
            return (
              <div key={item.title} className="bg-surface px-8 py-8">
                <Icon size={20} strokeWidth={1.5} className="mb-4 text-secondary" aria-hidden />
                <p className="mb-3 font-bold text-foreground" style={{ letterSpacing: "-0.02em" }}>
                  {item.title}
                </p>
                <p className="text-sm font-light leading-relaxed text-muted">{item.description}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ── How MEP drafting works ───────────────────────────────────────────── */}
      <Section variant="dark" className="border-t border-border" id="process">
        <div className="mb-14 border-b border-white/10 pb-14 grid items-end gap-8 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              How It Works
            </p>
            <h2
              className="font-bold text-primary-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              From engineer's design to a stamped MEP set.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-white/60">
              Your engineer or engineers of record direct the design and stamp the
              final set. We handle everything in between.
            </p>
          </div>
        </div>

        <ol role="list" className="flex flex-col gap-0">
          {draftingProcess.map((step, i) => (
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

      {/* ── Utility connections ──────────────────────────────────────────────── */}
      <Section variant="default" className="border-t border-border" id="utilities">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Utility Connections
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Shared service or a new dedicated connection.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              ADUs and additions almost always face this decision for every utility.
              Sharing existing service is cheaper up front; a dedicated connection
              adds cost but simplifies metering and future capacity.
            </p>
          </div>
        </div>

        <ComparisonTable
          caption="Utility Connection Options"
          columns={["Utility", "Shared Option", "Dedicated Option", "Cost Driver"]}
          rows={utilityConnections.map((u) => [u.utility, u.shared, u.separate, u.costNote])}
        />

        <p className="mt-6 text-sm font-light leading-relaxed text-muted">
          Total utility connection costs typically range from $9,000 to $27,000. Read
          more on{" "}
          <Link href="/blog/adu-utility-connections-water-sewer-electric-and-gas" className="underline underline-offset-2 decoration-border hover:text-secondary hover:decoration-secondary transition-colors duration-150">
            ADU utility connections
          </Link>
          .
        </p>
      </Section>

      {/* ── Residential vs commercial ────────────────────────────────────────── */}
      <Section variant="surface" className="border-t border-border" id="building-type">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Residential and Commercial
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Two building types, two different scopes.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              The drafting approach follows your engineer's design either way, but
              the scope of the MEP set differs sharply by building type.
            </p>
          </div>
        </div>

        <div className="grid gap-px border-x border-b border-border bg-border sm:grid-cols-2">
          {buildingTypes.map((type) => (
            <div key={type.title} className="flex flex-col gap-4 bg-background px-8 py-9">
              <h3 className="font-bold text-foreground" style={{ letterSpacing: "-0.02em" }}>
                {type.title}
              </h3>
              <p className="flex-1 text-sm font-light leading-relaxed text-muted">
                {type.description}
              </p>
              <Link
                href={type.href}
                className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-widest text-secondary hover:text-primary transition-colors duration-150"
              >
                {type.linkLabel} <span aria-hidden>→</span>
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* ── MEP drafting services directory ──────────────────────────────────── */}
      <Section variant="default" className="border-t border-border" id="services">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              MEP Drafting Services We Provide
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Drafting, coordination, and everything in between.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              From drafting a full MEP set to converting a redlined revision or
              coordinating it against the architectural drawings, these are the
              services CADTRI delivers most often around MEP documentation.
            </p>
          </div>
        </div>

        <nav aria-label="MEP drafting service directory">
          <ul className="divide-y divide-border border-x border-b border-border" role="list">
            {mepServices.map((service, i) => (
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

      {/* ── Common drafting pitfalls ─────────────────────────────────────────── */}
      <Section variant="dark" className="border-t border-border" id="pitfalls">
        <div className="mb-14 grid items-end gap-8 border-b border-white/10 pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Common Pitfalls
            </p>
            <h2
              className="font-bold text-primary-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Where MEP drawings go wrong.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-white/60">
              Most MEP correction comments and field conflicts trace back to one of
              these recurring gaps between the drafting and the design behind it.
            </p>
          </div>
        </div>

        <div className="grid gap-px bg-white/10 sm:grid-cols-2">
          {draftingPitfalls.map((item, index) => (
            <div key={item.title} className="flex gap-5 bg-primary px-8 py-7">
              <span
                className="mt-0.5 shrink-0 font-medium tabular-nums text-secondary"
                style={{ fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)", letterSpacing: "-0.02em", lineHeight: 1.4 }}
                aria-hidden
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="mb-2 font-bold text-primary-foreground" style={{ letterSpacing: "-0.02em" }}>
                  {item.title}
                </p>
                <p className="text-sm font-light leading-relaxed text-white/60">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Glossary ──────────────────────────────────────────────────────────── */}
      <Section variant="default" className="border-t border-border" id="glossary">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Glossary
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              MEP terms, defined.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              The vocabulary on a mechanical, electrical, or plumbing set that
              rarely gets explained. Six terms worth knowing.
            </p>
          </div>
        </div>

        <dl className="grid gap-px border-x border-b border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {glossaryTerms.map((item) => (
            <div key={item.term} className="flex flex-col gap-3 bg-surface px-7 py-7">
              <dt className="font-bold text-foreground" style={{ letterSpacing: "-0.02em" }}>
                {item.term}
              </dt>
              <dd className="flex-1 text-sm font-light leading-relaxed text-muted">
                {item.definition}
              </dd>
              {item.href && (
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-widest text-secondary hover:text-primary transition-colors duration-150"
                >
                  Read More <span aria-hidden>→</span>
                </Link>
              )}
            </div>
          ))}
        </dl>
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
              MEP drafting, explained.
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
            Go deeper on MEP documentation.
          </h2>
        </div>

        <div className="grid gap-px border-x border-b border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
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
        heading="Ready to draft your MEP set?"
        subheading="Send us your engineer's calculations, one-line diagrams, or existing MEP drawings and we will confirm scope, timeline, and fee before work begins."
        primaryAction={{ label: "Request a Proposal", href: "/contact" }}
        secondaryAction={{ label: "View Coordination Services", href: "/coordination" }}
        variant="dark"
      />
    </>
  );
}
