import type { Metadata } from "next";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { company } from "@/content/company";

export const metadata: Metadata = {
  title: { absolute: "Capability Statement | CADTRI Drafting & Permit Services" },
  description:
    "CADTRI full capability statement. Architectural drafting, permit set preparation, and permit coordination for residential and commercial projects nationwide.",
  robots: { index: false },
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const capabilities = [
  {
    title: "Architectural Drafting",
    description:
      "Complete CAD drawing sets prepared to permit-submission standards. Floor plans, elevations, building sections, roof plans, and site plans, fully coordinated across all sheets and formatted to match local building department submission requirements.",
  },
  {
    title: "Permit Set Preparation",
    description:
      "Jurisdiction-specific permit packages assembled to local building department requirements. We research your city's submission checklist, code edition, and plan checker preferences before production begins. Every set is built to pass the first time.",
  },
  {
    title: "ADU and Accessory Structure Packages",
    description:
      "Turnkey ADU permit packages for detached units, garage conversions, junior ADUs, and accessory structures. Floor plans, elevations, site plans, setback compliance, and Title 24 energy compliance coordination as a complete package.",
  },
  {
    title: "Home Addition and Remodel Packages",
    description:
      "Permit-ready drawing sets for horizontal and vertical home additions, interior remodels, kitchen and bathroom renovations, and structural modifications. Coordinated with structural engineers when required.",
  },
  {
    title: "City Comments Response",
    description:
      "When a building department issues plan check corrections, we respond. We review the correction letter, revise affected sheets, prepare a written response document, and resubmit on your behalf. Most correction cycles are closed within two to five business days.",
  },
  {
    title: "Structural Coordination",
    description:
      "Architectural and structural drawing sets reviewed and cross-coordinated into one coherent permit package. We work directly with your structural engineer of record to resolve conflicts before submission, not during plan check.",
  },
  {
    title: "MEP Coordination",
    description:
      "Coordination of mechanical, electrical, and plumbing systems with the architectural drawing set. Particularly relevant for commercial tenant improvements, multifamily projects, and any project requiring coordinated MEP overlays for plan check.",
  },
  {
    title: "BIM Coordination",
    description:
      "Revit-based modeling and coordination for projects requiring clash detection, 3D documentation, or owner-specified BIM deliverables. Architectural, structural, and MEP systems modeled and coordinated in a single federated model.",
  },
  {
    title: "Title 24 Energy Compliance",
    description:
      "California Title 24 energy compliance calculations and documentation prepared and incorporated into the permit set. CADTRI coordinates directly with compliance specialists to ensure accurate performance path or prescriptive compliance documentation.",
  },
  {
    title: "As-Built Documentation",
    description:
      "Field-verified as-built drawing sets produced from site measurements, photographs, and existing drawings. Suitable for permit applications, renovations, property sales, and record-keeping purposes.",
  },
  {
    title: "Contractor Bid Packages",
    description:
      "Construction-ready drawing packages formatted specifically for general contractor bidding. Scope of work drawings and documentation formatted to support accurate and competitive bid responses.",
  },
  {
    title: "Feasibility and Zoning Studies",
    description:
      "Pre-application analysis of zoning code, setback requirements, lot coverage, floor area ratio, and height restrictions. Used to evaluate project viability before design investment is made.",
  },
  {
    title: "Permit Pathway Analysis",
    description:
      "Jurisdiction research to identify the correct permit pathway for non-standard project types. Covers by-right approvals, discretionary review, administrative approvals, and exemption eligibility.",
  },
  {
    title: "Historic District Submissions",
    description:
      "Drawing packages and supplemental documentation prepared to the standards required by historic preservation commissions. Includes material specifications, photographic documentation, and narrative descriptions.",
  },
  {
    title: "Deferred Submittal Packages",
    description:
      "Deferred submittal documentation for structural, fire sprinkler, mechanical, and specialty systems, prepared to the format required by the building department for post-permit approval.",
  },
  {
    title: "Redline to CAD Conversion",
    description:
      "Conversion of hand-drawn sketches, field redlines, annotated PDFs, and scanned drawings into clean CAD or Revit production files. Used for project kickoff, design revisions, and record drawing updates.",
  },
] as const;

const projectTypes = [
  { category: "Residential", examples: "Single-family additions, ADUs, garage conversions, interior remodels, new construction" },
  { category: "Commercial", examples: "Tenant improvements, retail buildouts, office renovations, mixed-use" },
  { category: "Multifamily", examples: "Duplex additions, small multifamily, ADU stacking" },
  { category: "Accessory", examples: "Pool and spa permits, outdoor structures, detached garages" },
  { category: "Institutional", examples: "Small-scale institutional and assembly occupancy projects" },
] as const;

const clientTypes = [
  {
    title: "General Contractors",
    description:
      "Need a complete permit-ready drawing package before pulling a building permit. We understand contractor timelines and format our deliverables to support field construction, not just plan check.",
  },
  {
    title: "Licensed Architects",
    description:
      "Overflow production drafting, construction documentation, and permit coordination when internal capacity is stretched. We operate as a seamless extension of the design team.",
  },
  {
    title: "Real Estate Developers",
    description:
      "Construction planning support across single parcels and multi-site portfolios. From feasibility drawings through permit submission, we move at the pace of deal timelines.",
  },
  {
    title: "Residential Contractors",
    description:
      "ADU packages, additions, remodels, and garage conversions. We know residential plan check inside and out and produce sets that local building departments can process efficiently.",
  },
  {
    title: "Property Owners",
    description:
      "We navigate the permit process on your behalf. We explain requirements clearly, prepare complete documentation, and manage the city review cycle from submission through approval.",
  },
] as const;

const caseStudies = [
  {
    label: "ADU Permit, Austin TX",
    heading: "600 SF detached ADU permitted in 45 days.",
    body: "A residential property owner in Austin needed a detached ADU permitted before listing the property for sale. CADTRI prepared the full permit package including site plan, floor plans, elevations, foundation plan, and Title 24 compliance documentation. The set was submitted to the City of Austin Development Services Department and approved without corrections on the first review cycle.",
  },
  {
    label: "Garage Conversion, Tampa FL",
    heading: "First-pass approval under new county ADU standards.",
    body: "A general contractor needed a garage conversion permit set for a 480 SF junior ADU in Hillsborough County, which had issued new ADU standards the prior year. CADTRI researched the updated requirements, prepared a complete permit package, and delivered within eight business days. The permit was issued in two weeks, allowing the contractor to begin framing on schedule.",
  },
  {
    label: "Commercial TI, Dallas TX",
    heading: "2,400 SF restaurant shell buildout, coordinated and approved.",
    body: "A restaurant operator leasing shell space in a Dallas strip center needed a full tenant improvement permit package including architectural, mechanical, plumbing, and electrical coordination. CADTRI prepared the architectural set and coordinated directly with MEP engineers to produce a fully coordinated submission. The set passed plan check on the first review.",
  },
  {
    label: "Correction Response, Los Angeles CA",
    heading: "22-item correction letter closed in four business days.",
    body: "A contractor received a 22-item plan check correction letter on a room addition. Corrections spanned zoning compliance, fire separation, energy documentation, and structural details. CADTRI reviewed the correction letter, revised affected sheets, prepared a point-by-point written response, and resubmitted within four business days. All 22 items were cleared on the second review.",
  },
  {
    label: "ADU Portfolio, Charlotte NC",
    heading: "Seven ADU permits submitted in three weeks.",
    body: "A real estate investor planned to add ADUs to seven single-family rental properties simultaneously. CADTRI developed a standardized ADU design template for the portfolio, adapted it to each parcel's specific site conditions and setback requirements, and submitted all seven permit packages within a three-week window. Six of the seven were approved on the first review.",
  },
] as const;

const differentiators = [
  {
    title: "Jurisdiction research before drafting begins",
    description:
      "Most drawing errors that cause corrections are caused by not knowing what a specific city requires. We look it up before the first line is drawn.",
  },
  {
    title: "First-pass approval focus",
    description:
      "Every deliverable is reviewed against the submission checklist before it leaves our office. We treat first-pass approval as the deliverable, not the permit set.",
  },
  {
    title: "Responsive through the review cycle",
    description:
      "Our engagement does not close at delivery. We respond to city comments, prepare revisions, and stay available until the permit is issued.",
  },
  {
    title: "Scalable production capacity",
    description:
      "Whether you have one project or twenty running simultaneously, our production capacity scales to match. We support contractors and developers managing multi-project pipelines.",
  },
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CapabilityStatementPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <Section variant="dark" className="pt-24 pb-20">
        <div className="max-w-3xl">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
            Capability Statement
          </p>
          <h1
            className="font-extrabold text-primary-foreground"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.06,
            }}
          >
            CADTRI Drafting &amp; Permit Services
          </h1>
          <p className="mt-6 text-lg font-light leading-relaxed text-white/60 max-w-2xl">
            Permit-ready architectural drawings and permit coordination for residential and commercial projects across the United States. 800+ clients served in 40+ states.
          </p>
          <div className="mt-8 flex flex-wrap gap-8 border-t border-white/10 pt-8">
            {[
              { label: "Phone", value: company.phone },
              { label: "Email", value: company.email },
              { label: "Website", value: "www.cadtri.com" },
              { label: "Headquarters", value: "Austin, TX" },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-[10px] font-medium uppercase tracking-widest text-white/30">{item.label}</p>
                <p className="mt-1 text-sm font-light text-primary-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── About ────────────────────────────────────────────────────────────── */}
      <Section variant="default" className="border-t border-border">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Who We Are
            </p>
            <h2
              className="font-bold text-foreground"
              style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.25rem)", letterSpacing: "-0.03em", lineHeight: 1.1 }}
            >
              A production and coordination firm. Not a design firm.
            </h2>
          </div>
          <div className="flex flex-col justify-center gap-4">
            <p className="font-light leading-relaxed text-muted">
              CADTRI is a professional architectural drafting and permit coordination firm serving residential and commercial project teams across the United States. We specialize in producing permit-ready drawing sets that move through plan check on the first submission, eliminating the costly delays that come from rejected or incomplete documentation.
            </p>
            <p className="font-light leading-relaxed text-muted">
              Our work begins where design ends and continues until the permit is issued. We serve general contractors, licensed architects, real estate developers, residential contractors, and property owners who need accurate, jurisdiction-compliant drawings on a professional timeline.
            </p>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-16 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">
          {[
            { value: "800+", label: "Clients Served" },
            { value: "40+",  label: "States Covered" },
            { value: "42",   label: "Services Offered" },
            { value: "1st",  label: "Submission Focus" },
          ].map((stat) => (
            <div key={stat.label} className="bg-background px-8 py-8">
              <p
                className="font-extrabold text-foreground"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.03em" }}
              >
                {stat.value}
              </p>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-widest text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Capabilities ─────────────────────────────────────────────────────── */}
      <Section variant="surface" className="border-t border-border">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Core Capabilities
            </p>
            <h2
              className="font-bold text-foreground"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.03em", lineHeight: 1.1 }}
            >
              16 services. One point of contact.
            </h2>
          </div>
          <p className="font-light leading-relaxed text-muted lg:self-end">
            Every service is delivered under one engagement with a single dedicated point of contact managing production, coordination, and city correspondence from intake through permit issuance.
          </p>
        </div>

        <ul role="list" className="flex flex-col">
          {capabilities.map((cap, i) => (
            <li
              key={cap.title}
              className="grid gap-5 border-b border-border py-7 first:border-t sm:grid-cols-[48px_1fr_2fr] sm:gap-10"
            >
              <span
                className="shrink-0 text-[11px] font-medium tabular-nums text-secondary"
                style={{ letterSpacing: "0.05em", paddingTop: "3px" }}
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm font-semibold uppercase tracking-wider text-foreground">
                {cap.title}
              </p>
              <p className="text-sm font-light leading-relaxed text-muted">
                {cap.description}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── Project types ────────────────────────────────────────────────────── */}
      <Section variant="default" className="border-t border-border">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Project Types
            </p>
            <h2
              className="font-bold text-foreground"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.03em", lineHeight: 1.1 }}
            >
              Residential, commercial, and everything in between.
            </h2>
          </div>
          <p className="font-light leading-relaxed text-muted lg:self-end">
            From single-family ADUs to commercial tenant improvements and multi-site development portfolios, our production process is the same across all project types.
          </p>
        </div>

        <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {projectTypes.map((pt) => (
            <div key={pt.category} className="bg-background px-8 py-8">
              <p className="text-[11px] font-medium uppercase tracking-widest text-secondary mb-3">
                {pt.category}
              </p>
              <p className="text-sm font-light leading-relaxed text-muted">
                {pt.examples}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Who we work with ─────────────────────────────────────────────────── */}
      <Section variant="surface" className="border-t border-border">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Clients
            </p>
            <h2
              className="font-bold text-foreground"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.03em", lineHeight: 1.1 }}
            >
              Who we work with.
            </h2>
          </div>
          <p className="font-light leading-relaxed text-muted lg:self-end">
            We work directly with professionals, builders, and property owners who need reliable architectural drafting services and permit coordination on a professional timeline.
          </p>
        </div>

        <ul role="list" className="flex flex-col">
          {clientTypes.map((item, i) => (
            <li
              key={item.title}
              className="grid gap-5 border-b border-border py-7 first:border-t sm:grid-cols-[48px_1fr_2fr] sm:gap-10"
            >
              <span
                className="shrink-0 text-[11px] font-medium tabular-nums text-secondary"
                style={{ letterSpacing: "0.05em", paddingTop: "3px" }}
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm font-semibold uppercase tracking-wider text-foreground">
                {item.title}
              </p>
              <p className="text-sm font-light leading-relaxed text-muted">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── Case Studies ─────────────────────────────────────────────────────── */}
      <Section variant="dark" className="border-t border-white/10">
        <div className="mb-14 grid items-end gap-8 border-b border-white/10 pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Case Studies
            </p>
            <h2
              className="font-bold text-primary-foreground"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.03em", lineHeight: 1.1 }}
            >
              Projects across the country.
            </h2>
          </div>
          <p className="font-light leading-relaxed text-white/55 lg:self-end">
            A sample of recent engagements across project types and jurisdictions.
          </p>
        </div>

        <div className="flex flex-col divide-y divide-white/10 border-y border-white/10">
          {caseStudies.map((cs) => (
            <div key={cs.label} className="grid gap-6 py-10 lg:grid-cols-[220px_1fr] lg:gap-16">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-widest text-secondary">
                  {cs.label}
                </p>
                <p
                  className="mt-3 font-bold text-primary-foreground"
                  style={{ fontSize: "clamp(1rem, 1.5vw, 1.15rem)", letterSpacing: "-0.02em", lineHeight: 1.25 }}
                >
                  {cs.heading}
                </p>
              </div>
              <p className="font-light leading-relaxed text-white/55 lg:self-center">
                {cs.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Differentiators ──────────────────────────────────────────────────── */}
      <Section variant="default" className="border-t border-border">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Why CADTRI
            </p>
            <h2
              className="font-bold text-foreground"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.03em", lineHeight: 1.1 }}
            >
              What makes the difference.
            </h2>
          </div>
          <p className="font-light leading-relaxed text-muted lg:self-end">
            These are the operational standards we hold ourselves to on every project, not aspirational language.
          </p>
        </div>

        <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
          {differentiators.map((d) => (
            <div key={d.title} className="bg-background px-8 py-10">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-secondary">
                {d.title}
              </p>
              <p className="text-sm font-light leading-relaxed text-muted">
                {d.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand
        heading="Ready to discuss your project?"
        subheading="Tell us your scope and we will confirm timeline, deliverables, and next steps within one business day."
        primaryAction={{ label: "Request a Proposal", href: "/contact" }}
        secondaryAction={{ label: "View All Services", href: "/services" }}
        variant="dark"
      />
    </>
  );
}
