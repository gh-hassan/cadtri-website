import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Clock, Zap, Gavel, DoorOpen } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { TableOfContents } from "@/components/shared/table-of-contents";
import { ComparisonTable } from "@/components/shared/comparison-table";
import { services, getServiceHref } from "@/content/services";
import { company } from "@/content/company";
import {
  BreadcrumbJsonLd,
  ServiceJsonLd,
  FaqJsonLd,
} from "@/lib/json-ld";

const tocItems = [
  { id: "overview",      label: "Overview" },
  { id: "process",       label: "The Process" },
  { id: "review-tracks", label: "Review Tracks" },
  { id: "services",      label: "Services" },
  { id: "pitfalls",      label: "Rejection Reasons" },
  { id: "by-state",      label: "By State" },
  { id: "glossary",      label: "Glossary" },
  { id: "faq",           label: "FAQ" },
];

const reviewTracks: { track: React.ReactNode; timeline: string; cost: string; bestFor: string }[] = [
  {
    track: <span className="flex items-center gap-2"><DoorOpen size={16} strokeWidth={1.5} className="shrink-0 text-secondary" aria-hidden /> Over-the-Counter</span>,
    timeline: "Same day to about 1 week",
    cost: "No added fee",
    bestFor: "Simple, clearly code-compliant residential scope with no zoning ambiguity.",
  },
  {
    track: <span className="flex items-center gap-2"><Clock size={16} strokeWidth={1.5} className="shrink-0 text-secondary" aria-hidden /> Standard Plan Check</span>,
    timeline: "2 to 4 weeks, often stretching to 4 to 8",
    cost: "Included in the standard permit fee",
    bestFor: "Most residential and small commercial projects with no discretionary component.",
  },
  {
    track: <span className="flex items-center gap-2"><Zap size={16} strokeWidth={1.5} className="shrink-0 text-secondary" aria-hidden /> Express / Expedited Plan Check</span>,
    timeline: "A few days to about 2 weeks",
    cost: "$200 to $1,000 added fee, where the jurisdiction offers it",
    bestFor: "Time-sensitive projects where a faster paid review track exists.",
  },
  {
    track: <span className="flex items-center gap-2"><Gavel size={16} strokeWidth={1.5} className="shrink-0 text-secondary" aria-hidden /> Discretionary Review</span>,
    timeline: "Several weeks to multiple months",
    cost: "Application and public hearing fees",
    bestFor: "Projects requiring a variance, conditional use permit, or design review board approval.",
  },
];

const glossaryTerms: { term: string; definition: string; href?: string }[] = [
  {
    term: "Permit Set",
    definition: "The complete package of drawings and supporting documentation submitted to a building department for review.",
    href: "/resources/what-is-a-permit-set",
  },
  {
    term: "Plan Check",
    definition: "The formal review a building department performs to verify a submission against applicable building, zoning, energy, and life safety codes.",
    href: "/blog/how-plan-check-works",
  },
  {
    term: "Zoning Clearance",
    definition: "Confirmation that a proposed use is allowed on the property, checked separately from the building permit review itself.",
    href: "/blog/what-is-a-zoning-clearance",
  },
  {
    term: "Ministerial vs. Discretionary Review",
    definition: "Ministerial approval is automatic once code compliance is verified. Discretionary review adds planning judgment and, often, a public hearing.",
    href: "/blog/ministerial-vs-discretionary-review",
  },
  {
    term: "Correction Notice",
    definition: "The plan checker's itemized list of what must be resolved before approval, typically using specific language like \"provide,\" \"clarify,\" or \"revise.\"",
    href: "/blog/provide-clarify-revise-correction-language",
  },
  {
    term: "Permit-Ready",
    definition: "A drawing set complete enough to submit for review. Not a regulated term, and not a guarantee of approval on any specific timeline.",
    href: "/blog/what-permit-ready-means",
  },
];

export const metadata: Metadata = {
  title: { absolute: "Permitting Services | Permit-Ready Drawings | CADTRI" },
  description:
    "Permitting services for homeowners, contractors, and architects: jurisdiction research, permit-ready drawings, and plan check support in all 50 states.",
  alternates: { canonical: "/permitting" },
};

// ─── Page data ────────────────────────────────────────────────────────────────

const permitProcess: { title: string; description: string }[] = [
  {
    title: "Jurisdiction and Zoning Research",
    description:
      "Before anything is drawn, we confirm the applicable code edition, zoning classification, setback and coverage limits, and the specific submission checklist used by the building department with authority over the property.",
  },
  {
    title: "Drawing Preparation and Code Compliance",
    description:
      "Site plans, floor plans, elevations, sections, and supporting code compliance documentation are produced to the exact format the reviewing department expects, coordinated across every discipline involved in the project.",
  },
  {
    title: "Application Submission",
    description:
      "The complete package, drawings, forms, and supporting documentation, is assembled and submitted through the jurisdiction's required process, whether that is an online portal, an in-person counter, or a third-party plan review service.",
  },
  {
    title: "Plan Check Review",
    description:
      "A plan reviewer checks the submission against applicable building, zoning, energy, and life safety codes. Projects are approved outright, approved with conditions, or returned with correction comments that must be resolved before approval.",
  },
  {
    title: "Approval, Issuance, and Inspections",
    description:
      "Once corrections are resolved and the application is approved, the permit is issued and construction can begin. Field inspections continue throughout the project to confirm the completed work matches the approved drawings.",
  },
];

const rejectionReasons: { title: string; description: string }[] = [
  {
    title: "Incomplete Submission",
    description:
      "Missing forms, signatures, or checklist items required by the specific building department can stop an application before a reviewer opens the drawings.",
  },
  {
    title: "Zoning Non-Conformance",
    description:
      "Setback, height, FAR, or lot coverage figures that were not verified against the current zoning ordinance before submission.",
  },
  {
    title: "Uncoordinated Drawings",
    description:
      "Dimensions or references on one sheet that contradict another discipline's drawings, a common structural and architectural coordination gap.",
  },
  {
    title: "Outdated Code Edition",
    description:
      "Plans prepared to a code cycle the jurisdiction no longer enforces, a frequent issue when drawings are reused from an earlier project.",
  },
  {
    title: "Missing Energy Compliance Documentation",
    description:
      "Energy code forms that do not match the specifications shown on the architectural drawings, or are missing from the package entirely.",
  },
  {
    title: "Incomplete Structural Documentation",
    description:
      "Missing engineering calculations, connection details, or an engineer's stamp where the project scope requires one.",
  },
  {
    title: "Ambiguous Scope of Work",
    description:
      "A project description that does not clearly match what the drawings show, which slows review and invites additional scrutiny.",
  },
  {
    title: "Accessibility Gaps",
    description:
      "Missing or incomplete accessibility documentation on commercial, mixed-use, and other public occupancy projects.",
  },
];

const stateNotes: { title: string; description: string; href: string; linkLabel: string }[] = [
  {
    title: "Florida",
    description:
      "Coastal and high-velocity hurricane zones carry wind load and impact-resistance requirements that affect structural detailing, window and door specifications, and roof design well beyond baseline code minimums.",
    href: "/services/structural-coordination",
    linkLabel: "Structural Coordination",
  },
  {
    title: "Texas",
    description:
      "Permitting authority sits with individual cities and counties rather than a single statewide code, so adopted code editions, energy requirements, and submission formats vary by jurisdiction.",
    href: "/services/permit-set-preparation",
    linkLabel: "Permit Set Preparation",
  },
  {
    title: "North Carolina",
    description:
      "Projects are reviewed under the North Carolina State Building Code, with additional local zoning and historic district review layered on top depending on the municipality.",
    href: "/services/historic-district-submissions",
    linkLabel: "Historic District Submissions",
  },
  {
    title: "Nationwide",
    description:
      "Every jurisdiction outside our primary markets gets the same jurisdiction-specific research before drafting begins. CADTRI supports permitting projects in 40+ states.",
    href: "/about",
    linkLabel: "About CADTRI",
  },
];

const faqs: { question: string; answer: string }[] = [
  {
    question: "What does a permitting service actually do?",
    answer:
      "A permitting service prepares and manages the technical documentation a building department requires to approve construction, including drawings, code compliance forms, and jurisdiction-specific submission materials, and stays engaged through plan check until the permit is issued.",
  },
  {
    question: "How long does it take to get a building permit?",
    answer:
      "Timelines vary widely by jurisdiction and project scope. Simple residential permits can be issued over the counter in days, while more complex commercial or discretionary projects can take several weeks to a few months. Jurisdiction research at the start of a project gives a realistic estimate specific to the reviewing department.",
  },
  {
    question: "Do I need an architect to get a building permit?",
    answer:
      "Not always. Many jurisdictions allow non-structural residential permits to be prepared by a qualified drafting service, while others require a licensed architect or engineer's stamp depending on project scope, occupancy, and local regulations. We confirm the requirement for your specific project and jurisdiction before drafting begins.",
  },
  {
    question: "What is the difference between permit drafting and permit expediting?",
    answer:
      "Permit drafting produces the technical drawings and documentation a building department requires. Permit expediting manages the submission and follow-up process with the department. CADTRI handles both: producing the permit-ready drawing set and remaining available to respond to plan check comments through approval.",
  },
  {
    question: "Can you help if a permit application was already rejected?",
    answer:
      "Yes. We review the correction notice, identify exactly what the plan checker is requesting, revise the drawings, and prepare a formal response package for resubmission.",
  },
  {
    question: "Do you provide permitting services nationwide?",
    answer:
      "Yes. CADTRI supports permitting projects across more than 40 states, with concentrated experience in Florida, Texas, and North Carolina. Every project starts with jurisdiction-specific research regardless of location.",
  },
  {
    question: "How much do permit drawings cost?",
    answer:
      "Most residential permit drawings cost between $500 and $8,000, though the range is wide and depends heavily on project type, jurisdiction, and scope. A quote is only meaningful once we know the specific project.",
  },
  {
    question: "Why does plan check take so long?",
    answer:
      "Standard plan check typically runs two to four weeks but regularly stretches to four to eight or longer. This is usually a function of department staffing and seasonal submission volume, not a sign of a problem with the application.",
  },
  {
    question: "What's the difference between a permit set, construction documents, and a bid set?",
    answer:
      "For most residential projects, the terms are used interchangeably. On larger commercial work, a bid set is issued to contractors for pricing before construction documents are finalized, and the permit set may be a subset of the full construction documents.",
  },
  {
    question: "Do coastal or hurricane-prone projects cost more to permit?",
    answer:
      "Yes, in wind-load jurisdictions. In Florida, hurricane wind-load requirements typically add 20 to 50 percent to permit drawing costs due to the additional structural detailing and impact-resistance documentation required.",
  },
];

const relatedReading: { title: string; description: string; href: string }[] = [
  {
    title: "Why Plan Check Takes Long",
    description: "The real reasons behind a four-to-eight-week review, and when a delay is actually a red flag.",
    href: "/blog/why-plan-check-takes-long",
  },
  {
    title: "Express vs Counter Plan Check: Which One Do You Need?",
    description: "The honest comparison between a paid expedited review and free informal pre-screening.",
    href: "/blog/express-vs-counter-plan-check",
  },
  {
    title: "Ministerial vs Discretionary Review",
    description: "How automatic approval differs from a review that adds planning judgment and hearings.",
    href: "/blog/ministerial-vs-discretionary-review",
  },
  {
    title: "How to Mark Up Resubmittals",
    description: "Revision clouds, consistent numbering, and a response letter, the professional standard.",
    href: "/blog/how-to-mark-up-resubmittals",
  },
  {
    title: "7 Reasons Building Permits Get Rejected",
    description: "The recurring correction triggers, and how to avoid them before you submit.",
    href: "/blog/why-building-permits-rejected",
  },
  {
    title: "How Long Does It Take to Get a Building Permit?",
    description: "Timelines broken down by state and project type, from ADUs to commercial buildouts.",
    href: "/blog/how-long-does-it-take-to-get-a-building-permit-timelines-by-state-and-project-type",
  },
];

const permittingServices = services.filter((s) => s.category === "Permitting");

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PermittingPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Permitting", href: "/permitting" },
        ]}
      />
      <ServiceJsonLd
        title="Permitting Services"
        description="Jurisdiction research, permit-ready drawings, and plan check support for residential and commercial projects nationwide."
        url={`${company.website}/permitting`}
        category="Permitting"
      />
      <FaqJsonLd items={faqs.map((f) => ({ question: f.question, answer: f.answer }))} />

      <PageHeader
        eyebrow="Permitting"
        heading="Permitting services built around real building department requirements."
        description="Every jurisdiction reviews construction differently. CADTRI researches the specific requirements of your building department, then prepares permit-ready drawings and documentation built to that standard, not a generic template."
      />

      <TableOfContents items={tocItems} />

      {/* ── What permitting services cover ───────────────────────────────────── */}
      <Section variant="default" id="overview">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              What Permitting Services Cover
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              More than a stack of drawings.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              A permit application is only as strong as the research behind it. Permitting
              services cover the full path from raw project scope to an issued permit:
              confirming what the building department actually requires, producing drawings
              and code compliance documentation to that standard, submitting the package,
              and responding to plan check comments until the permit is approved.
            </p>
          </div>
        </div>

        <div className="grid gap-px border-x border-b border-border bg-border sm:grid-cols-3">
          {[
            { label: "Coverage", value: "40+ States" },
            { label: "Jurisdiction Research", value: "Included Every Project" },
            { label: "Plan Check Support", value: "Included Through Approval" },
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

      {/* ── The building permit process ──────────────────────────────────────── */}
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
              The building permit process, step by step.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              Every jurisdiction has its own checklist and review cadence, but the underlying
              path a project takes to an issued permit follows the same five stages.
            </p>
          </div>
        </div>

        <ul role="list" className="divide-y divide-border border-t border-border">
          {permitProcess.map((step, i) => (
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

      {/* ── Permit review tracks compared ────────────────────────────────────── */}
      <Section variant="default" className="border-t border-border" id="review-tracks">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Review Tracks Compared
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Not every permit moves through the same line.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              Most jurisdictions offer more than one path to an issued permit. Knowing
              which track applies, and which ones are available as options, changes
              what a realistic timeline actually looks like.
            </p>
          </div>
        </div>

        <ComparisonTable
          caption="Building Permit Review Tracks"
          columns={["Review Track", "Typical Timeline", "Typical Cost", "Best For"]}
          rows={reviewTracks.map((t) => [t.track, t.timeline, t.cost, t.bestFor])}
          highlightRow={1}
        />

        <p className="mt-6 text-sm font-light leading-relaxed text-muted">
          Standard plan check is the default track in most jurisdictions and where most
          projects land. Read more on{" "}
          <Link href="/blog/express-vs-counter-plan-check" className="underline underline-offset-2 decoration-border hover:text-secondary hover:decoration-secondary transition-colors duration-150">
            express versus counter plan check
          </Link>{" "}
          and{" "}
          <Link href="/blog/ministerial-vs-discretionary-review" className="underline underline-offset-2 decoration-border hover:text-secondary hover:decoration-secondary transition-colors duration-150">
            ministerial versus discretionary review
          </Link>
          .
        </p>
      </Section>

      {/* ── Permitting services directory ────────────────────────────────────── */}
      <Section variant="surface" className="border-t border-border" id="services">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Permitting Services We Provide
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              A permit package for every project type.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              From a first-time ADU application to a multi-round correction response,
              these are the permit-specific services CADTRI delivers most often.
            </p>
          </div>
        </div>

        <nav aria-label="Permitting service directory">
          <ul className="divide-y divide-border border-x border-b border-border" role="list">
            {permittingServices.map((service, i) => (
              <li key={service.slug}>
                <Link
                  href={getServiceHref(service.slug)}
                  className="group block bg-background transition-colors duration-200 hover:bg-surface"
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

      {/* ── Why permits get rejected ─────────────────────────────────────────── */}
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
              Why permit applications get rejected.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-white/60">
              Most correction notices trace back to a handful of recurring issues.
              Catching these before submission is the difference between a first-pass
              approval and a multi-round correction cycle.
            </p>
          </div>
        </div>

        <div className="grid gap-px bg-white/10 sm:grid-cols-2">
          {rejectionReasons.map((reason, index) => (
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

      {/* ── Permitting by state ──────────────────────────────────────────────── */}
      <Section variant="surface" className="border-t border-border" id="by-state">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Where We Work
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Permitting, researched by jurisdiction.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              No two building departments review a project the same way. Here is a look
              at what shapes permitting in our primary markets, and how we handle
              everywhere else.
            </p>
          </div>
        </div>

        <div className="grid gap-px border-x border-b border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {stateNotes.map((note) => (
            <div key={note.title} className="flex flex-col gap-4 bg-background px-8 py-9">
              <h3 className="flex items-center gap-2 font-bold text-foreground" style={{ letterSpacing: "-0.02em" }}>
                <MapPin size={16} strokeWidth={1.5} className="shrink-0 text-secondary" aria-hidden />
                {note.title}
              </h3>
              <p className="flex-1 text-sm font-light leading-relaxed text-muted">
                {note.description}
              </p>
              <Link
                href={note.href}
                className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-widest text-secondary hover:text-primary transition-colors duration-150"
              >
                {note.linkLabel} <span aria-hidden>→</span>
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
              Permitting terms, defined.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              The vocabulary a plan checker, a permit technician, or a correction
              notice uses without explaining it. Six terms worth knowing before
              your project reaches review.
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
              Permitting services, explained.
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
            Go deeper on permitting.
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
        heading="Ready to start your permit application?"
        subheading="Tell us your project scope and location and we will confirm the jurisdiction requirements, deliverables, timeline, and fee before work begins."
        primaryAction={{ label: "Request a Proposal", href: "/contact" }}
        secondaryAction={{ label: "View Process", href: "/process" }}
        variant="dark"
      />
    </>
  );
}
