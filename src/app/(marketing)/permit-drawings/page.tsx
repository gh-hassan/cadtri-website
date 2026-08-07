import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, LayoutGrid, Building2, Layers3, ListChecks, ShieldCheck } from "lucide-react";
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
  { id: "overview",   label: "What's Included" },
  { id: "by-type",    label: "By Project Type" },
  { id: "requirements", label: "Requirements Matrix" },
  { id: "building-type", label: "Residential vs. Commercial" },
  { id: "services",  label: "Services" },
  { id: "pitfalls",  label: "Common Pitfalls" },
  { id: "glossary",  label: "Glossary" },
  { id: "faq",       label: "FAQ" },
];

const setIcons = [MapPin, LayoutGrid, Building2, Layers3, ListChecks, ShieldCheck];

const requirementsMatrix: { type: string; existingConditions: string; structural: string; timeline: string }[] = [
  {
    type: "New Construction",
    existingConditions: "Not required — blank site",
    structural: "Required for the full structural design",
    timeline: "Longest: full design plus full plan check",
  },
  {
    type: "Additions",
    existingConditions: "Required, to tie new work to existing",
    structural: "Required if any load-bearing element is affected",
    timeline: "Moderate: existing conditions plus addition design",
  },
  {
    type: "Remodels",
    existingConditions: "Required only for the areas being altered",
    structural: "Only if load-bearing elements change",
    timeline: "Fastest of the four, when non-structural",
  },
  {
    type: "After-the-Fact Permits",
    existingConditions: "Always required — as-built baseline",
    structural: "Required if unpermitted work affected structure",
    timeline: "Longest: as-built documentation plus compliance review",
  },
];

const glossaryTerms: { term: string; definition: string; href?: string }[] = [
  {
    term: "Site Plan",
    definition: "The sheet showing property lines, setbacks, and existing and proposed structures. Often the sheet that decides whether a project can be permitted at all.",
    href: "/blog/what-is-a-site-plan",
  },
  {
    term: "Floor Plan",
    definition: "A scaled top-down view of a building level showing walls, rooms, dimensions, and door and window locations.",
    href: "/blog/floor-plan-site-plan-elevation-section",
  },
  {
    term: "Elevation",
    definition: "A straight-on view of a building face showing height, materials, and window and door placement as seen from outside.",
    href: "/blog/floor-plan-site-plan-elevation-section",
  },
  {
    term: "Section",
    definition: "A vertical cut through the building showing how floors, walls, and roof assemblies stack and connect.",
    href: "/blog/floor-plan-site-plan-elevation-section",
  },
  {
    term: "Title Block",
    definition: "The sheet border identifying the project, scale, date, and revision history. Missing or inconsistent title blocks are a common source of delay.",
    href: "/blog/what-is-a-title-block",
  },
  {
    term: "Code Analysis Sheet",
    definition: "The sheet documenting how the project meets applicable building and zoning code, referenced throughout the set.",
    href: "/blog/what-is-a-code-analysis-sheet",
  },
];

export const metadata: Metadata = {
  title: { absolute: "Permit Drawings | Residential & Commercial Drafting | CADTRI" },
  description:
    "Permit drawings for residential and commercial projects: new construction, additions, remodels, and after-the-fact permits, drafted to permit-ready standard.",
  alternates: { canonical: "/permit-drawings" },
};

// ─── Page data ────────────────────────────────────────────────────────────────

const drawingSetContents: { title: string; description: string }[] = [
  {
    title: "Site Plan",
    description:
      "Property lines, setbacks, existing and proposed structures, easements, and site improvements drawn to the jurisdiction's required scale.",
  },
  {
    title: "Floor Plans",
    description:
      "Existing and proposed layouts with complete dimensions, room labels, door and window locations, and any structural elements shown.",
  },
  {
    title: "Exterior Elevations",
    description:
      "Every building face showing proposed materials, heights, window and door placement, and any changes to the existing exterior.",
  },
  {
    title: "Building Sections and Details",
    description:
      "Cross-sections and construction details showing how assemblies go together, required for framing, insulation, and waterproofing review.",
  },
  {
    title: "Schedules and Notes",
    description:
      "Door, window, and finish schedules along with the general and code compliance notes referenced throughout the set.",
  },
  {
    title: "Code Compliance Documentation",
    description:
      "Zoning conformance, energy compliance, and accessibility documentation coordinated with the drawings, not produced as an afterthought.",
  },
];

const projectTypes: { number: string; title: string; description: string }[] = [
  {
    number: "01",
    title: "New Construction",
    description:
      "Ground-up residential and commercial projects require a complete drawing set built from a blank site: site plan, full floor plans, elevations, sections, structural coordination, and all applicable code compliance documentation. Nothing exists to reference, so every dimension and assembly is established from scratch.",
  },
  {
    number: "02",
    title: "Additions",
    description:
      "Room additions, second-story additions, and building expansions require existing conditions drawings paired with the proposed new construction, dimensioned and detailed so the plan checker can see exactly where new work ties into the existing structure.",
  },
  {
    number: "03",
    title: "Remodels",
    description:
      "Interior remodels and renovations focus on existing floor plans and proposed layout changes, along with any code triggers the renovation activates: egress, accessibility, or energy compliance, depending on the scope and occupancy.",
  },
  {
    number: "04",
    title: "After-the-Fact Permits",
    description:
      "Work completed without a permit needs as-built documentation of the existing condition before a legalization application can move forward. We measure and draw the unpermitted work as built, then prepare the compliance documentation needed to bring it into the permit record.",
  },
];

const buildingTypes: { title: string; description: string; href: string; linkLabel: string }[] = [
  {
    title: "Residential",
    description:
      "Single-family homes, ADUs, additions, and remodels typically require a site plan, floor plans, elevations, sections, and energy compliance documentation. Structural engineering is required for additions and any work affecting the load path.",
    href: "/services/home-addition-packages",
    linkLabel: "Home Addition Packages",
  },
  {
    title: "Commercial",
    description:
      "Commercial and mixed-use projects carry additional occupancy classification, accessibility, and fire and life safety requirements. MEP coordination, exiting analysis, and tenant-improvement-specific scope are typically part of the drawing package.",
    href: "/services/tenant-improvement-packages",
    linkLabel: "Tenant Improvement Packages",
  },
];

const drawingPitfalls: { title: string; description: string }[] = [
  {
    title: "Missing Dimensions",
    description:
      "Plans without complete dimension strings force the plan checker to guess, a fast path to a correction comment.",
  },
  {
    title: "Existing vs. Proposed Not Distinguished",
    description:
      "Renovation and addition drawings that don't clearly differentiate what's existing, new, and demolished.",
  },
  {
    title: "Unreferenced Details",
    description:
      "Callouts on a plan that don't point to an actual detail or section drawn elsewhere in the set.",
  },
  {
    title: "Missing Structural Callouts",
    description:
      "Headers, beams, and connections required by the scope but not shown or cross-referenced to the structural set.",
  },
  {
    title: "Incomplete Schedules",
    description:
      "Door, window, and finish schedules that don't match what's actually shown on the plans.",
  },
  {
    title: "No Egress Analysis",
    description:
      "Missing occupant load, exit width, or travel distance calculations on projects where occupancy or layout changes trigger the requirement.",
  },
  {
    title: "Scale and Sheet Size Errors",
    description:
      "Drawings not produced at the scale or sheet size the jurisdiction requires for the project type.",
  },
  {
    title: "Missing Existing Conditions",
    description:
      "After-the-fact and remodel projects submitted without a documented existing condition baseline to compare the proposed work against.",
  },
];

const faqs: { question: string; answer: string }[] = [
  {
    question: "What's the difference between permit drawings for new construction and an addition?",
    answer:
      "New construction starts from a blank site: every dimension, assembly, and code compliance item is established without anything to reference. An addition requires existing conditions to be documented first, then the proposed work is drawn and dimensioned against that existing baseline so the plan checker can verify how new construction ties into what's already there.",
  },
  {
    question: "Do commercial permit drawings require anything residential drawings don't?",
    answer:
      "Yes. Commercial and mixed-use projects typically require occupancy classification, accessibility compliance, fire and life safety documentation, and MEP coordination that residential projects usually don't trigger. Tenant improvements add their own layer of build-out-specific requirements.",
  },
  {
    question: "Can you get a permit for work that was never permitted?",
    answer:
      "In most jurisdictions, yes, through an after-the-fact or legalization permit process. It starts with as-built documentation of the existing unpermitted work, followed by a compliance review to identify what does and does not meet current code, and a permit application addressing any required corrections.",
  },
  {
    question: "What is required for an after-the-fact permit?",
    answer:
      "Requirements vary by jurisdiction, but most require as-built drawings of the unpermitted work, a code compliance review, and sometimes an inspection to verify the work meets structural and life safety standards. Some jurisdictions require partial demolition of work that cannot be brought into compliance.",
  },
  {
    question: "Do remodel permit drawings need a structural engineer?",
    answer:
      "Only if the remodel affects load-bearing elements: removing or relocating a wall, adding an opening, or changing the roof or floor structure. Cosmetic remodels that don't touch structural elements typically don't require engineering.",
  },
  {
    question: "How detailed do permit drawings need to be?",
    answer:
      "Detailed enough for the plan checker to verify code compliance and for a contractor to build from without guessing. That generally means complete dimensions, clearly distinguished existing and proposed work, cross-referenced details, and schedules that match what's shown on the plans.",
  },
  {
    question: "How much do permit drawings cost?",
    answer:
      "Most residential permit drawings cost between $500 and $8,000, with the final number driven by project type, jurisdiction, and how much existing-conditions documentation is required. Commercial and tenant improvement drawings typically run higher due to added code compliance scope.",
  },
  {
    question: "What's actually different between commercial and residential drawings?",
    answer:
      "Commercial drawings carry occupancy classification, accessibility, and fire and life safety requirements that most residential projects never trigger, along with MEP coordination that's typically more involved. A residential-focused drafter taking on a commercial tenant improvement is a common source of correction comments.",
  },
  {
    question: "Do I need ADA compliance drawings for a commercial project?",
    answer:
      "In most cases, yes, if the space is open to the public or employs people outside the owner's household. ADA and accessibility documentation is typically required as part of the commercial drawing set, not an optional add-on.",
  },
  {
    question: "What drawings do I need for something as simple as a bathroom remodel?",
    answer:
      "It depends on scope and jurisdiction, but a non-structural bathroom remodel typically needs, at minimum, an existing and proposed floor plan and any plumbing or electrical changes noted. Moving walls or fixtures that affect structure or egress adds requirements from there.",
  },
];

const relatedReading: { title: string; description: string; href: string }[] = [
  {
    title: "What Drawings Do You Need for a Building Permit?",
    description: "A complete sheet-by-sheet checklist, from a bathroom remodel to a new custom home.",
    href: "/blog/what-drawings-do-you-need-for-building-permit",
  },
  {
    title: "How to Read a Permit Drawing Set",
    description: "A step-by-step checklist for reviewing your set for completeness and coordination.",
    href: "/blog/how-to-read-a-permit-drawing-set",
  },
  {
    title: "Commercial vs. Residential Drawings",
    description: "The code, ADA, egress, and cost differences every owner should know before they start.",
    href: "/blog/commercial-vs-residential-drawings",
  },
  {
    title: "ADA Compliance Drawings",
    description: "What's required, common mistakes, and how to get it right from the first submittal.",
    href: "/blog/ada-compliance-drawings-guide",
  },
  {
    title: "How Much Do Permit Drawings Cost?",
    description: "A transparent 2026 breakdown by project type and what drives the price up.",
    href: "/blog/permit-drawings-cost-2026",
  },
  {
    title: "What Is a Code Analysis Sheet?",
    description: "An annotated example of the sheet that documents code compliance for the plan checker.",
    href: "/blog/what-is-a-code-analysis-sheet",
  },
];

const drawingServiceSlugs = [
  "architectural-drafting",
  "site-plan-package",
  "home-addition-packages",
  "garage-conversion-packages",
  "interior-remodel-packages",
  "tenant-improvement-packages",
  "as-built-documentation",
  "interior-detail-package",
  "demolition-permit-drawings",
  "record-drawing-updates",
] as const;

const drawingServices = drawingServiceSlugs
  .map((slug) => getServiceBySlug(slug))
  .filter((s): s is NonNullable<typeof s> => Boolean(s));

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PermitDrawingsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Permit Drawings", href: "/permit-drawings" },
        ]}
      />
      <ServiceJsonLd
        title="Permit Drawings"
        description="Permit-ready drawings for residential and commercial projects: new construction, additions, remodels, and after-the-fact permits."
        url={`${company.website}/permit-drawings`}
        category="Drawings"
      />
      <FaqJsonLd items={faqs.map((f) => ({ question: f.question, answer: f.answer }))} />

      <PageHeader
        eyebrow="Permit Drawings"
        heading="Permit drawings for new construction, additions, remodels, and after-the-fact permits."
        description="From a ground-up commercial building to a single-room addition to legalizing work that was never permitted, every project needs a drawing set built to what the building department actually requires. CADTRI produces permit-ready drawings for residential and commercial projects at every stage."
      />

      <TableOfContents items={tocItems} />

      {/* ── What's in a permit drawing set ───────────────────────────────────── */}
      <Section variant="default" id="overview">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              What's in a Permit Drawing Set
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              The sheets a plan checker actually reviews.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              The exact scope varies by project, but nearly every permit drawing set
              is built from the same core components. What changes between a new
              construction set and an after-the-fact permit is how much of it has to
              be documented from an existing condition versus designed from scratch.
            </p>
          </div>
        </div>

        <div className="grid gap-px border-x border-b border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {drawingSetContents.map((item, i) => {
            const Icon = setIcons[i];
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

      {/* ── Permit drawings by project type ──────────────────────────────────── */}
      <Section variant="surface" className="border-t border-border" id="by-type">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              By Project Type
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              New construction, additions, remodels, and after-the-fact.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              What a permit drawing set needs to show depends heavily on what already
              exists on the property, or doesn't.
            </p>
          </div>
        </div>

        <ul role="list" className="divide-y divide-border border-t border-border">
          {projectTypes.map((type) => (
            <li key={type.number} className="grid gap-x-10 gap-y-4 py-9 sm:grid-cols-[3.5rem_1fr]">
              <span
                className="font-bold tabular-nums text-secondary"
                style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", letterSpacing: "-0.03em", lineHeight: 1 }}
                aria-hidden
              >
                {type.number}
              </span>
              <div>
                <h3 className="mb-2 font-bold text-lg text-foreground" style={{ letterSpacing: "-0.02em" }}>
                  {type.title}
                </h3>
                <p className="max-w-3xl text-sm font-light leading-relaxed text-muted">
                  {type.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── Requirements matrix ──────────────────────────────────────────────── */}
      <Section variant="default" className="border-t border-border" id="requirements">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Requirements Matrix
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              What each project type actually requires.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              The four project types side by side: whether existing conditions
              documentation is required, whether structural engineering is triggered,
              and what that means for the timeline.
            </p>
          </div>
        </div>

        <ComparisonTable
          caption="Permit Drawing Requirements by Project Type"
          columns={["Project Type", "Existing Conditions", "Structural Engineering", "Timeline Impact"]}
          rows={requirementsMatrix.map((r) => [r.type, r.existingConditions, r.structural, r.timeline])}
        />
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
              The project type sets the drawing structure. The building type sets how
              much code compliance documentation rides alongside it.
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

      {/* ── Permit drawing services directory ────────────────────────────────── */}
      <Section variant="default" className="border-t border-border" id="services">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Permit Drawing Services We Provide
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              A drawing package for every scope.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              From a full new-construction set to as-built documentation for a
              legalization application, these are the drawing-specific services
              CADTRI delivers most often.
            </p>
          </div>
        </div>

        <nav aria-label="Permit drawing service directory">
          <ul className="divide-y divide-border border-x border-b border-border" role="list">
            {drawingServices.map((service, i) => (
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

      {/* ── Common drawing deficiencies ──────────────────────────────────────── */}
      <Section variant="dark" className="border-t border-border" id="pitfalls">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
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
              What makes a permit drawing incomplete.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-white/60">
              Most correction comments on the drawings themselves, as opposed to
              administrative or zoning issues, trace back to one of these gaps.
            </p>
          </div>
        </div>

        <div className="grid gap-px bg-white/10 sm:grid-cols-2">
          {drawingPitfalls.map((item, index) => (
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
              Drawing sheet terms, defined.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              The names of the sheets that make up a permit set, and what each one
              is actually for.
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
              Permit drawings, explained.
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
            Go deeper on permit drawings.
          </h2>
        </div>

        <div className="grid gap-px border-x border-b border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
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
        heading="Ready to start your permit drawings?"
        subheading="Tell us the project type, building type, and location and we will confirm the drawing scope, timeline, and fee before work begins."
        primaryAction={{ label: "Request a Proposal", href: "/contact" }}
        secondaryAction={{ label: "View Process", href: "/process" }}
        variant="dark"
      />
    </>
  );
}
