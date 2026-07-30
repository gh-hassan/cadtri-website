import type { Metadata } from "next";
import Link from "next/link";
import { Layers, Boxes, MessageSquare } from "lucide-react";
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

const tocItems = [
  { id: "overview",  label: "Overview" },
  { id: "process",   label: "The Process" },
  { id: "methods",   label: "Methods" },
  { id: "services",  label: "Services" },
  { id: "pitfalls",  label: "Common Pitfalls" },
  { id: "by-type",   label: "By Project Type" },
  { id: "glossary",  label: "Glossary" },
  { id: "faq",       label: "FAQ" },
];

const coordinationMethods: { method: React.ReactNode; catches: string; projectSize: string; output: string }[] = [
  {
    method: <span className="flex items-center gap-2"><Layers size={16} strokeWidth={1.5} className="shrink-0 text-secondary" aria-hidden /> 2D Discipline Cross-Check</span>,
    catches: "Dimensional and reference conflicts between architectural, structural, and MEP sheets.",
    projectSize: "Most residential and small commercial projects",
    output: "Annotated conflict log and updated coordinated sheets",
  },
  {
    method: <span className="flex items-center gap-2"><Boxes size={16} strokeWidth={1.5} className="shrink-0 text-secondary" aria-hidden /> Federated BIM Clash Detection</span>,
    catches: "Automated 3D spatial clashes across every trade modeled in the project.",
    projectSize: "Multi-family, institutional, and complex commercial",
    output: "Clash detection report and a resolved federated model",
  },
  {
    method: <span className="flex items-center gap-2"><MessageSquare size={16} strokeWidth={1.5} className="shrink-0 text-secondary" aria-hidden /> Construction-Phase RFI Coordination</span>,
    catches: "Field conditions and consultant revisions discovered after permit issuance.",
    projectSize: "Any project once construction begins",
    output: "RFI log tracked to resolution and as-built alignment",
  },
];

const glossaryTerms: { term: string; definition: string; href?: string }[] = [
  {
    term: "Clash Detection",
    definition: "The automated process of checking a federated 3D model for physical conflicts between disciplines before construction begins.",
    href: "/blog/cad-vs-bim",
  },
  {
    term: "Federated Model",
    definition: "A combined 3D model built by merging each discipline's individual model into one shared reference used for coordination review.",
  },
  {
    term: "RFI (Request for Information)",
    definition: "A formal question submitted during construction when the drawings don't fully answer a field condition, tracked to a documented resolution.",
  },
  {
    term: "Coordination Set",
    definition: "The combined package of architectural, structural, and MEP sheets, updated to reflect confirmed cross-discipline references.",
  },
  {
    term: "Discipline",
    definition: "An individual area of design responsibility, architectural, structural, MEP, or civil, that must be checked against every other discipline on a project.",
  },
  {
    term: "Sheet Reference",
    definition: "A callout on one discipline's drawing pointing to a detail, section, or note on another discipline's sheet, a common failure point when versions fall out of sync.",
  },
];

export const metadata: Metadata = {
  title: { absolute: "Coordination Services | Multi-Discipline Drawings | CADTRI" },
  description:
    "Coordination services from CADTRI: structural, MEP, and BIM coordination, entitlement support, and construction administration for permit-ready projects nationwide.",
  alternates: { canonical: "/coordination" },
};

// ─── Page data ────────────────────────────────────────────────────────────────

const coordinationProcess: { title: string; description: string }[] = [
  {
    title: "Collecting Every Discipline's Drawings",
    description:
      "Coordination starts with the current architectural, structural, MEP, and any additional consultant drawings or models for the project. We confirm which files are the approved-for-coordination version before anything is compared.",
  },
  {
    title: "Cross-Discipline Conflict Review",
    description:
      "Each discipline is checked against the others for dimensional conflicts, reference inconsistencies, and spatial clashes: structural framing against architectural sections, MEP routing against ceiling heights and structural members, and site work against civil drawings.",
  },
  {
    title: "Direct Engineer and Consultant Communication",
    description:
      "Identified conflicts are logged and routed directly to the responsible engineer or consultant. Every open item is tracked to a confirmed resolution rather than left for the plan checker or the field to discover.",
  },
  {
    title: "Assembling One Coordinated Set",
    description:
      "Once conflicts are resolved, the architectural sheets are updated to reflect the confirmed structural and MEP references, producing a single package that reads as one coordinated document rather than a stack of independently produced drawings.",
  },
  {
    title: "Carrying Coordination Into the Field",
    description:
      "Coordination does not end at permit issuance. RFIs, field conditions, and consultant revisions during construction are tracked and resolved the same way, so the as-built condition matches what was coordinated on paper.",
  },
];

const coordinationFailures: { title: string; description: string }[] = [
  {
    title: "Late Engineer Engagement",
    description:
      "Structural or MEP consultants brought in after the architectural drawings are substantially complete, forcing conflicts to surface as late corrections instead of early coordination.",
  },
  {
    title: "No Single Coordination Point",
    description:
      "Each consultant reviewing only their own discipline, with no one responsible for checking how the drawings align against each other.",
  },
  {
    title: "Drawing Version Mismatches",
    description:
      "Coordination performed against an outdated architectural or structural file, producing a combined package that does not reflect the actual current design.",
  },
  {
    title: "Missed Ceiling and Structural Clearances",
    description:
      "MEP routing that was never checked against structural members and finished ceiling heights, a frequent source of field conflicts on tenant improvement and multi-family projects.",
  },
  {
    title: "Unresolved RFIs During Construction",
    description:
      "Field questions that sit open because no one is tracking them to a documented resolution, leaving the contractor to guess or wait.",
  },
  {
    title: "Siloed Consultant Communication",
    description:
      "Comments passed indirectly between disciplines through the owner or contractor instead of direct, documented coordination between the design team.",
  },
  {
    title: "Missing Clash Detection Before Permit",
    description:
      "Multi-trade projects submitted for permit without running clash detection between architectural, structural, and MEP models, deferring conflicts to the field where they cost the most.",
  },
  {
    title: "No Coordination Record",
    description:
      "Conflicts identified and resolved verbally, with no log documenting what was found, who owned it, and how it was closed.",
  },
];

const projectTypes: { title: string; description: string; href: string; linkLabel: string }[] = [
  {
    title: "Ground-Up and Structural Renovation",
    description:
      "Any project involving a licensed structural engineer needs the architectural and structural sets to function as one coordinated document before submission.",
    href: "/services/structural-coordination",
    linkLabel: "Structural Coordination",
  },
  {
    title: "Commercial TI, Restaurants, and Hospitality",
    description:
      "Complex kitchen exhaust, plumbing, and electrical requirements demand tight coordination between MEP and architectural drawings before permit submission.",
    href: "/services/mep-coordination",
    linkLabel: "MEP Coordination",
  },
  {
    title: "Multi-Family, Institutional, and Complex Commercial",
    description:
      "Projects with multiple overlapping trades benefit from a federated BIM model and clash detection before the first conduit is installed.",
    href: "/services/bim-coordination",
    linkLabel: "BIM Coordination",
  },
  {
    title: "Historic Rehabilitation",
    description:
      "Preservation board review adds a coordination layer beyond standard building code, tying existing conditions documentation to the proposed scope.",
    href: "/services/historic-district-submissions",
    linkLabel: "Historic District Submissions",
  },
];

const faqs: { question: string; answer: string }[] = [
  {
    question: "What is coordination in architectural drafting?",
    answer:
      "Coordination is the process of checking architectural, structural, MEP, and other consultant drawings against each other to confirm they agree on dimensions, references, and assemblies before a package reaches plan check or the job site.",
  },
  {
    question: "Why does drawing coordination matter for permit approval?",
    answer:
      "Uncoordinated drawings are one of the most common causes of plan check corrections. When sheets from different disciplines disagree, the plan checker cannot verify the project is code compliant, and the application gets returned.",
  },
  {
    question: "What is the difference between coordination and BIM coordination?",
    answer:
      "General coordination reviews 2D drawings from each discipline for conflicts. BIM coordination integrates 3D models from each discipline into a single federated model and runs automated clash detection, typically used on more complex, multi-trade commercial and institutional projects.",
  },
  {
    question: "Do you coordinate directly with our structural engineer or MEP consultant?",
    answer:
      "Yes. Coordination is only effective when conflicts are resolved directly with the responsible engineer or consultant rather than passed along secondhand. We communicate directly with your project's consultants to close out open items.",
  },
  {
    question: "Does coordination continue after the permit is issued?",
    answer:
      "Yes, through construction administration support. Field conditions, RFIs, and consultant revisions during construction are coordinated the same way drawings are coordinated before submission.",
  },
  {
    question: "What if we already have separate architectural and structural or MEP sets?",
    answer:
      "We review both sets side by side, identify conflicts, and produce a combined, coordinated package. Existing drawings do not need to be redrawn from scratch to bring them into coordination.",
  },
  {
    question: "What's the actual difference between CAD coordination and BIM coordination?",
    answer:
      "CAD coordination compares 2D drawings from each discipline sheet by sheet. BIM coordination merges each discipline's 3D model into one federated model and runs automated clash detection across every trade at once, catching spatial conflicts a 2D review can miss.",
  },
  {
    question: "Do you use 3D laser scanning to coordinate renovation and addition projects?",
    answer:
      "For projects with uncertain or undocumented existing conditions, scan-to-BIM captures the as-built structure accurately before new work is coordinated against it, reducing the risk of designing an addition against dimensions that turn out to be wrong.",
  },
  {
    question: "How is a clash detection report delivered?",
    answer:
      "As an itemized list of identified conflicts, each tagged to the disciplines involved and its location in the model, alongside the resolved federated model once every item has been closed out with the responsible consultant.",
  },
];

const relatedReading: { title: string; description: string; href: string }[] = [
  {
    title: "CAD vs BIM: What's the Difference?",
    description: "The honest comparison of what each does, and when a project actually needs BIM coordination.",
    href: "/blog/cad-vs-bim",
  },
  {
    title: "What Is Scan-to-BIM?",
    description: "How 3D laser scanning creates accurate models for coordinating additions and renovations.",
    href: "/blog/what-is-scan-to-bim",
  },
  {
    title: "2D Drafting vs 3D Modeling",
    description: "When 2D coordination is enough, and when a project is worth modeling in 3D.",
    href: "/blog/2d-vs-3d-drafting",
  },
  {
    title: "Commercial vs. Residential Drawings",
    description: "Why commercial projects carry a heavier coordination load than residential ones.",
    href: "/blog/commercial-vs-residential-drawings",
  },
];

const coordinationSlugs = [
  "structural-coordination",
  "mep-coordination",
  "bim-coordination",
  "entitlement-support",
  "pre-application-meeting-prep",
  "construction-administration",
  "historic-district-submissions",
] as const;

const coordinationServices = coordinationSlugs
  .map((slug) => getServiceBySlug(slug))
  .filter((s): s is NonNullable<typeof s> => Boolean(s));

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CoordinationPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Coordination", href: "/coordination" },
        ]}
      />
      <ServiceJsonLd
        title="Coordination Services"
        description="Structural, MEP, and BIM coordination, entitlement support, and construction administration for residential and commercial projects nationwide."
        url={`${company.website}/coordination`}
        category="Coordination"
      />
      <FaqJsonLd items={faqs.map((f) => ({ question: f.question, answer: f.answer }))} />

      <PageHeader
        eyebrow="Coordination"
        heading="Coordination services that keep every discipline on one set of drawings."
        description="Architectural, structural, MEP, and consultant drawings rarely start in agreement. CADTRI reviews every discipline against the others, resolves conflicts directly with the responsible engineer, and delivers one coordinated package instead of a stack of documents that disagree."
      />

      <TableOfContents items={tocItems} />

      {/* ── What coordination services cover ─────────────────────────────────── */}
      <Section variant="default" id="overview">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              What Coordination Services Cover
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              One coordinated set, not a stack of separate drawings.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              Most permit-ready projects involve more than one design discipline: an
              architect, a structural engineer, and often an MEP consultant. Coordination
              is the work of checking those drawings against each other, resolving what
              does not agree, and producing a single package that reads as one document
              instead of several that were never compared.
            </p>
          </div>
        </div>

        <div className="grid gap-px border-x border-b border-border bg-border sm:grid-cols-3">
          {[
            { label: "Disciplines Coordinated", value: "Architectural, Structural, MEP" },
            { label: "Consultant Communication", value: "Direct, Every Project" },
            { label: "BIM Model Formats", value: "Revit / IFC Available" },
          ].map((stat) => (
            <div key={stat.label} className="bg-surface px-8 py-8">
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

      {/* ── How coordination works ───────────────────────────────────────────── */}
      <Section variant="surface" className="border-t border-border" id="process">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              How It Works
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Multi-discipline coordination, step by step.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              Whether the coordination is a two-sheet structural check or a federated
              BIM model with multiple trades, the underlying process follows the same
              five stages.
            </p>
          </div>
        </div>

        <ul role="list" className="divide-y divide-border border-t border-border">
          {coordinationProcess.map((step, i) => (
            <li key={step.title} className="grid gap-x-10 gap-y-4 py-9 sm:grid-cols-[3.5rem_1fr]">
              <span
                className="font-bold tabular-nums text-secondary"
                style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", letterSpacing: "-0.03em", lineHeight: 1 }}
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="mb-2 font-bold text-lg text-foreground" style={{ letterSpacing: "-0.02em" }}>
                  {step.title}
                </h3>
                <p className="max-w-3xl text-sm font-light leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── Coordination methods compared ────────────────────────────────────── */}
      <Section variant="default" className="border-t border-border" id="methods">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Methods Compared
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Three coordination methods, one goal.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              Not every project needs a federated BIM model, and every project needs
              coordination to continue once construction starts. Here's what each
              method actually catches.
            </p>
          </div>
        </div>

        <ComparisonTable
          caption="Coordination Methods"
          columns={["Method", "What It Catches", "Typical Project Size", "Output"]}
          rows={coordinationMethods.map((m) => [m.method, m.catches, m.projectSize, m.output])}
          highlightRow={1}
        />

        <p className="mt-6 text-sm font-light leading-relaxed text-muted">
          Most residential and small commercial projects only need a 2D cross-check.
          Read more on{" "}
          <Link href="/blog/cad-vs-bim" className="underline underline-offset-2 decoration-border hover:text-secondary hover:decoration-secondary transition-colors duration-150">
            CAD versus BIM coordination
          </Link>{" "}
          and when{" "}
          <Link href="/blog/2d-vs-3d-drafting" className="underline underline-offset-2 decoration-border hover:text-secondary hover:decoration-secondary transition-colors duration-150">
            3D modeling is worth the added cost
          </Link>
          .
        </p>
      </Section>

      {/* ── Coordination services directory ──────────────────────────────────── */}
      <Section variant="surface" className="border-t border-border" id="services">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Coordination Services We Provide
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              A coordination point for every discipline.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              From a single structural check to full BIM clash detection across trades,
              these are the coordination-specific services CADTRI delivers most often.
            </p>
          </div>
        </div>

        <nav aria-label="Coordination service directory">
          <ul className="divide-y divide-border border-x border-b border-border" role="list">
            {coordinationServices.map((service, i) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group block transition-colors duration-200 hover:bg-background"
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

      {/* ── Where coordination breaks down ───────────────────────────────────── */}
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
              Where coordination breaks down.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-white/60">
              Most conflicts discovered at plan check or in the field trace back to one
              of these recurring gaps. Catching them during coordination is far cheaper
              than catching them after construction starts.
            </p>
          </div>
        </div>

        <div className="grid gap-px bg-white/10 sm:grid-cols-2">
          {coordinationFailures.map((reason, index) => (
            <div key={reason.title} className="flex gap-5 bg-primary px-8 py-7">
              <span
                className="mt-0.5 shrink-0 font-medium tabular-nums text-secondary"
                style={{ fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)", letterSpacing: "-0.02em", lineHeight: 1.4 }}
                aria-hidden
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="mb-2 font-bold text-primary-foreground" style={{ letterSpacing: "-0.02em" }}>
                  {reason.title}
                </p>
                <p className="text-sm font-light leading-relaxed text-white/60">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Where coordination matters most ──────────────────────────────────── */}
      <Section variant="surface" className="border-t border-border" id="by-type">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Where It Matters Most
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Project types that need coordination first.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              Every multi-discipline project benefits from coordination, but these
              project types carry the highest risk of conflict if it is skipped.
            </p>
          </div>
        </div>

        <div className="grid gap-px border-x border-b border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {projectTypes.map((type) => (
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
              Coordination terms, defined.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              The vocabulary consultants and BIM managers use without explaining it.
              Six terms worth knowing before your first coordination meeting.
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
              Coordination services, explained.
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
            Go deeper on coordination.
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
        heading="Ready to coordinate your project?"
        subheading="Send us the current architectural, structural, and MEP drawings and we will confirm scope, timeline, and fee before work begins."
        primaryAction={{ label: "Request a Proposal", href: "/contact" }}
        secondaryAction={{ label: "View Process", href: "/process" }}
        variant="dark"
      />
    </>
  );
}
