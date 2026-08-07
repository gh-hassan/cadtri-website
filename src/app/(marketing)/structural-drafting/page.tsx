import type { Metadata } from "next";
import Link from "next/link";
import { Layers, Grid3x3, Link2, ArrowLeftRight, ClipboardList, GitMerge, Wind, Activity, CheckCircle2 } from "lucide-react";
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
  { id: "regional",  label: "Regional Factors" },
  { id: "building-type", label: "Residential vs. Commercial" },
  { id: "services",  label: "Services" },
  { id: "pitfalls",  label: "Common Pitfalls" },
  { id: "glossary",  label: "Glossary" },
  { id: "faq",       label: "FAQ" },
];

const scopeIcons = [Layers, Grid3x3, Link2, ArrowLeftRight, ClipboardList, GitMerge];

const regionalFactors: { hazard: React.ReactNode; addsToSet: string; costImpact: string; example: string }[] = [
  {
    hazard: <span className="flex items-center gap-2"><Wind size={16} strokeWidth={1.5} className="shrink-0 text-secondary" aria-hidden /> Hurricane / High-Velocity Wind Zones</span>,
    addsToSet: "Wind-load calculations, impact-resistant detailing, and uplift connection callouts.",
    costImpact: "Adds roughly 20 to 50 percent to drawing cost",
    example: "Florida coastal counties",
  },
  {
    hazard: <span className="flex items-center gap-2"><Activity size={16} strokeWidth={1.5} className="shrink-0 text-secondary" aria-hidden /> High Seismic Design Categories</span>,
    addsToSet: "Additional lateral system detailing, shear wall schedules, and moment frame connections.",
    costImpact: "Varies by seismic design category",
    example: "California and other high-seismic regions",
  },
  {
    hazard: <span className="flex items-center gap-2"><CheckCircle2 size={16} strokeWidth={1.5} className="shrink-0 text-secondary" aria-hidden /> Standard / Baseline Regions</span>,
    addsToSet: "Baseline structural code minimums and standard connection details.",
    costImpact: "Included in base structural drafting scope",
    example: "Most inland U.S. jurisdictions",
  },
];

const glossaryTerms: { term: string; definition: string; href?: string }[] = [
  {
    term: "Load Path",
    definition: "The continuous structural route that transfers a building's weight and lateral forces down through framing, walls, and foundation to the ground.",
  },
  {
    term: "Shear Wall",
    definition: "A wall panel engineered to resist lateral forces from wind or seismic loads, documented on the lateral system drawings.",
  },
  {
    term: "Hold-Down",
    definition: "A metal connector anchoring framing to the foundation or a lower floor, resisting uplift and lateral forces at a shear wall.",
  },
  {
    term: "Moment Frame",
    definition: "A rigid steel or concrete frame connection used to resist lateral loads without shear walls, common on commercial structures.",
  },
  {
    term: "Wind-Load Design",
    definition: "Structural detailing sized to resist wind pressures and uplift, required in hurricane and high-velocity wind zones.",
    href: "/blog/hurricane-wind-load-drawings-florida",
  },
  {
    term: "Engineer of Record",
    definition: "The licensed structural engineer who directs the design and stamps the final structural drawing set submitted for permit.",
  },
];

export const metadata: Metadata = {
  title: { absolute: "Structural Drafting | Framing & Foundation Plans | CADTRI" },
  description:
    "Structural drafting services: foundation plans, framing plans, and connection details drafted from your engineer's calculations for permit-ready sets.",
  alternates: { canonical: "/structural-drafting" },
};

// ─── Page data ────────────────────────────────────────────────────────────────

const drawingScope: { title: string; description: string }[] = [
  {
    title: "Foundation Plans",
    description:
      "Footing and foundation layout, dimensions, reinforcement callouts, and anchor bolt locations drafted from the engineer's foundation design.",
  },
  {
    title: "Framing Plans",
    description:
      "Floor and roof framing plans showing member sizes, spacing, spans, and bearing points as specified in the structural calculations.",
  },
  {
    title: "Connection and Structural Details",
    description:
      "Hold-downs, shear connections, beam-to-column details, and any other assembly details called out in the engineer's design.",
  },
  {
    title: "Lateral System Drawings",
    description:
      "Shear wall schedules, moment frame locations, and bracing layouts drafted and cross-referenced to the framing plans.",
  },
  {
    title: "Structural Notes and Schedules",
    description:
      "General structural notes, material specifications, and schedules for footings, columns, beams, and headers referenced throughout the set.",
  },
  {
    title: "Architectural Coordination Sheets",
    description:
      "Structural sheets checked against the architectural set for grid alignment, dimension consistency, and bearing wall locations.",
  },
];

const draftingProcess: { title: string; description: string }[] = [
  {
    title: "Calculation and Markup Intake",
    description:
      "We start from your structural engineer's calculations, redlines, hand sketches, or an existing structural set that needs to be redrawn or revised.",
  },
  {
    title: "Foundation and Framing Plan Production",
    description:
      "Foundation and framing plans are drafted in CAD to the member sizes, spacing, and dimensions specified in the engineer's design, coordinated against the architectural floor plans.",
  },
  {
    title: "Connection and Detail Drafting",
    description:
      "Every connection, hold-down, and structural detail called out in the calculations is drawn and cross-referenced to the plans and sections it appears on.",
  },
  {
    title: "Coordination with the Architectural Set",
    description:
      "Grid lines, dimensions, and bearing locations are checked against the architectural drawings so the two sets agree before the package reaches the engineer for review.",
  },
  {
    title: "Engineer Review and Delivery",
    description:
      "The completed structural sheets are returned to your engineer of record for review and stamp, then delivered in your required format ready for permit submission.",
  },
];

const buildingTypes: { title: string; description: string; href: string; linkLabel: string }[] = [
  {
    title: "Residential",
    description:
      "Single-family additions, second stories, and ADUs typically need foundation plans, floor and roof framing plans, and connection details drafted from the engineer's calculations for the specific load path.",
    href: "/services/home-addition-packages",
    linkLabel: "Home Addition Packages",
  },
  {
    title: "Commercial",
    description:
      "Commercial and multi-story structures carry more extensive lateral system documentation, larger foundation schedules, and tighter coordination with MEP and architectural sheets throughout the set.",
    href: "/services/mep-coordination",
    linkLabel: "MEP Coordination",
  },
];

const draftingPitfalls: { title: string; description: string }[] = [
  {
    title: "Grid Line Mismatches",
    description:
      "Structural and architectural sheets referencing different grid systems, forcing the plan checker to reconcile two sets that should already agree.",
  },
  {
    title: "Missing Connection Callouts",
    description:
      "Hold-downs, straps, and connection hardware specified in the calculations but not shown or referenced on the framing plan.",
  },
  {
    title: "Outdated Calculation Revisions",
    description:
      "Drawings drafted against an earlier version of the engineer's calculations after a design change was made downstream.",
  },
  {
    title: "Incomplete Structural Notes",
    description:
      "General notes missing material specifications, design loads, or code references the plan checker expects to see on the structural sheets.",
  },
  {
    title: "Unclear Load Path",
    description:
      "Framing members shown without a clear bearing point or continuous path down to the foundation, a common trigger for structural correction comments.",
  },
  {
    title: "Dimension Conflicts with Architectural",
    description:
      "Wall thicknesses, column locations, or floor-to-floor heights that differ between the structural and architectural sets.",
  },
  {
    title: "Missing Schedules",
    description:
      "Footing, column, or header schedules referenced by callout on the plans but not included anywhere in the set.",
  },
  {
    title: "Unreferenced Details",
    description:
      "Detail callouts on the framing plan that don't point to an actual detail drawn elsewhere in the structural set.",
  },
];

const faqs: { question: string; answer: string }[] = [
  {
    question: "What is structural drafting?",
    answer:
      "Structural drafting is the CAD production of structural drawings, foundation plans, framing plans, connection details, and schedules, based on a licensed structural engineer's calculations, markups, or design direction.",
  },
  {
    question: "Do you provide structural engineering, or just drafting?",
    answer:
      "Drafting only. We are not a licensed structural engineering firm and do not produce calculations, stamped designs, or engineering judgment. We draft the structural drawing set from your engineer's calculations, redlines, or sketches, and the engineer of record reviews and stamps the final set.",
  },
  {
    question: "Can you draft from my engineer's calculations or redlines?",
    answer:
      "Yes. That's the typical starting point: structural calculations, hand markups, a prior structural set that needs revision, or a combination of all three. We draft the CAD sheets to match what the engineer has specified.",
  },
  {
    question: "What structural drawings do you produce?",
    answer:
      "Foundation plans, floor and roof framing plans, connection and structural details, lateral system drawings (shear walls, bracing), and the structural notes and schedules that go with them.",
  },
  {
    question: "Do you draft for wood frame, steel, and concrete structures?",
    answer:
      "Yes, across residential wood frame construction and light commercial steel and concrete structures. The drafting approach is directed by your engineer's design regardless of the structural system.",
  },
  {
    question: "How does structural drafting differ from structural coordination?",
    answer:
      "Structural drafting produces the structural drawing set itself. Structural coordination reviews an already-produced structural set against the architectural drawings to resolve conflicts before permit submission. Most projects use both: drafting to produce the set, coordination to make sure it agrees with the architectural drawings.",
  },
  {
    question: "What software and file formats do you use?",
    answer:
      "We draft in AutoCAD and Revit and deliver print-ready PDF along with native DWG or RVT files, matching the format your engineer or the building department requires.",
  },
  {
    question: "Do coastal or hurricane-zone projects need extra structural documentation?",
    answer:
      "Yes. In Florida's high-velocity hurricane zones, wind-load calculations and impact-resistant detailing typically add 20 to 50 percent to structural drawing cost, driven by the additional connection details and uplift documentation the engineer's design requires.",
  },
  {
    question: "Does a commercial structural set require more than a residential one?",
    answer:
      "Generally yes. Commercial and multi-story structures carry more extensive lateral system documentation, larger foundation and connection schedules, and tighter coordination with MEP routing than most residential projects require.",
  },
  {
    question: "What is a code analysis sheet, and does it apply to structural drawings?",
    answer:
      "A code analysis sheet documents how a project meets applicable building and zoning code. Structural sheets reference it for design loads, code edition, and material specifications, keeping the structural notes consistent with the rest of the permit set.",
  },
];

const relatedReading: { title: string; description: string; href: string }[] = [
  {
    title: "Hurricane Wind-Load Drawings in Florida",
    description: "What wind-load drawings show, which projects need them, and what they cost by wind zone.",
    href: "/blog/hurricane-wind-load-drawings-florida",
  },
  {
    title: "Commercial vs. Residential Drawings",
    description: "Why commercial structures carry a heavier structural documentation load.",
    href: "/blog/commercial-vs-residential-drawings",
  },
  {
    title: "What Is a Code Analysis Sheet?",
    description: "An annotated example of the sheet that ties structural notes to code compliance.",
    href: "/blog/what-is-a-code-analysis-sheet",
  },
];

const structuralServiceSlugs = [
  "structural-coordination",
  "redline-to-cad",
  "bim-coordination",
  "architectural-drafting",
  "construction-administration",
  "as-built-documentation",
] as const;

const structuralServices = structuralServiceSlugs
  .map((slug) => getServiceBySlug(slug))
  .filter((s): s is NonNullable<typeof s> => Boolean(s));

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function StructuralDraftingPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Structural Drafting", href: "/structural-drafting" },
        ]}
      />
      <ServiceJsonLd
        title="Structural Drafting"
        description="CAD drafting of foundation plans, framing plans, connection details, and structural schedules from your engineer's calculations, for residential and commercial permits."
        url={`${company.website}/structural-drafting`}
        category="Drawings"
      />
      <FaqJsonLd items={faqs.map((f) => ({ question: f.question, answer: f.answer }))} />

      <PageHeader
        eyebrow="Structural Drafting"
        heading="Structural drafting that turns your engineer's calculations into permit-ready drawings."
        description="We draft foundation plans, framing plans, connection details, and structural schedules from your engineer's calculations, redlines, or sketches. We are a drafting company, not a licensed structural engineering firm: your engineer of record designs and stamps the work, we produce the CAD drawings."
      />

      <TableOfContents items={tocItems} />

      {/* ── What structural drafting covers ──────────────────────────────────── */}
      <Section variant="default" id="overview">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              What Structural Drafting Covers
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
              A structural calculation package tells you what the design requires.
              Structural drafting turns that design into the coordinated drawing set
              a plan checker and a contractor can actually build from.
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

      {/* ── How structural drafting works ────────────────────────────────────── */}
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
              From calculations to a stamped structural set.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-white/60">
              Your engineer of record directs the design and stamps the final set.
              We handle everything in between.
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

      {/* ── Regional structural factors ──────────────────────────────────────── */}
      <Section variant="default" className="border-t border-border" id="regional">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Regional Factors
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Where you're building changes what gets drafted.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              The same framing plan looks different in a hurricane zone than it does
              inland. Regional hazard requirements are set by your engineer's design,
              but they change the scope, and the cost, of the drawing set.
            </p>
          </div>
        </div>

        <ComparisonTable
          caption="Regional Structural Considerations"
          columns={["Hazard Type", "What It Adds to the Set", "Typical Cost Impact", "Example"]}
          rows={regionalFactors.map((r) => [r.hazard, r.addsToSet, r.costImpact, r.example])}
          highlightRow={0}
        />

        <p className="mt-6 text-sm font-light leading-relaxed text-muted">
          Read more on{" "}
          <Link href="/blog/hurricane-wind-load-drawings-florida" className="underline underline-offset-2 decoration-border hover:text-secondary hover:decoration-secondary transition-colors duration-150">
            hurricane wind-load drawings in Florida
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
              Two building types, two different drawing sets.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              The drafting approach follows your engineer's design either way, but
              the scope of the drawing set differs by building type.
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

      {/* ── Structural drafting services directory ───────────────────────────── */}
      <Section variant="default" className="border-t border-border" id="services">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Structural Drafting Services We Provide
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
              From drafting a full structural set to converting a redlined revision
              or coordinating it against the architectural drawings, these are the
              services CADTRI delivers most often around structural documentation.
            </p>
          </div>
        </div>

        <nav aria-label="Structural drafting service directory">
          <ul className="divide-y divide-border border-x border-b border-border" role="list">
            {structuralServices.map((service, i) => (
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
              Where structural drawings go wrong.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-white/60">
              Most structural correction comments trace back to one of these gaps
              between the drafting and the calculations behind it.
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
              Structural terms, defined.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              The vocabulary that shows up on a structural calculation package or a
              framing plan without explanation. Six terms worth knowing.
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
              Structural drafting, explained.
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
            Go deeper on structural documentation.
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
        heading="Ready to draft your structural set?"
        subheading="Send us your engineer's calculations, redlines, or existing structural drawings and we will confirm scope, timeline, and fee before work begins."
        primaryAction={{ label: "Request a Proposal", href: "/contact" }}
        secondaryAction={{ label: "View Coordination Services", href: "/coordination" }}
        variant="dark"
      />
    </>
  );
}
