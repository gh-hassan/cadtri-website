// Homepage content — all copy and data for every section.
// Edit this file to update the homepage without touching component logic.

// ─── Hero ─────────────────────────────────────────────────────────────────────

export const heroContent = {
  eyebrow: "Architectural Drafting & Permit Support",
  heading: ["Precision Drawings.", "Permits That Move."],
  description:
    "CADTRI prepares complete, permit-ready architectural drawing packages for residential and commercial projects. From first scope review through final jurisdiction submission.",
  primaryCta:    { label: "Request Proposal",   href: "/contact"  },
  secondaryCta:  { label: "View Our Services",  href: "/services" },
  credentials: [
    "Complete architectural drawing packages",
    "Permit application coordination",
    "Residential and commercial project types",
    "Jurisdiction-specific documentation standards",
    "Coordinated consultant deliverables",
  ],
  indicators: [
    { label: "Project Types",      value: "Residential & Commercial" },
    { label: "Deliverable Format", value: "Complete Drawing Sets"    },
    { label: "Documentation",      value: "Permit-Ready Standard"    },
    { label: "Service Scope",      value: "Intake to Delivery"       },
  ],
} as const;

// ─── Trust strip ──────────────────────────────────────────────────────────────

export const trustItems = [
  {
    label: "Full Package Delivery",
    description:
      "Every drawing set includes all required plan sheets, dimensions, and specifications. Complete packages prepared for submission, not piecemeal files.",
  },
  {
    label: "Permit-Ready Standard",
    description:
      "We review jurisdiction requirements before drafting begins. Sets are built to local plan-check standards from the first submission.",
  },
  {
    label: "Residential & Commercial",
    description:
      "From single-family additions and ADUs to multi-story commercial tenant improvements. Our scope covers both project types at the same standard.",
  },
  {
    label: "Responsive Coordination",
    description:
      "Dedicated point of contact, structured revision cycles, and clear communication from intake through permit approval.",
  },
] as const;

// ─── Services overview ────────────────────────────────────────────────────────
// Icon strings reference lucide-react component names — resolved in the section component.

export const servicesOverview = [
  {
    slug:        "architectural-drafting",
    title:       "Architectural Drafting",
    description: "Detailed architectural plan sets built to permit-submission standards. Floor plans, elevations, sections, and site plans, fully coordinated and ready for review.",
    icon:        "PencilRuler",
  },
  {
    slug:        "permit-set-preparation",
    title:       "Permit Set Preparation",
    description: "Jurisdiction-specific permit packages assembled to local building department requirements. Every submission built for first-pass approval.",
    icon:        "FileCheck2",
  },
  {
    slug:        "structural-coordination",
    title:       "Structural Coordination",
    description: "Architectural and structural drawing sets reviewed and coordinated into one coherent permit package before submission.",
    icon:        "Layers",
  },
  {
    slug:        "code-compliance-review",
    title:       "Code and Compliance Review",
    description: "Pre-submission review against building code, zoning, and accessibility requirements. Issues found before plan check cost nothing to fix.",
    icon:        "FolderOpen",
  },
] as const;

// ─── Why CADTRI ───────────────────────────────────────────────────────────────

export const whyCadtri = {
  eyebrow:    "Why CADTRI",
  heading:    "Technical execution without the guesswork.",
  subheading: "We handle the drawings and permit coordination so your project moves on schedule.",
  items: [
    {
      number:      "01",
      title:       "Permit-Ready Every Time",
      description:
        "Every drawing set is built to the submission standards of its jurisdiction. We review local requirements before drafting begins. Corrections at plan check are the exception, not the rule.",
    },
    {
      number:      "02",
      title:       "Precision at Every Stage",
      description:
        "Coordinated, dimensioned, and detailed packages that give contractors, structural engineers, and MEP consultants exactly what they need to move forward without ambiguity.",
    },
    {
      number:      "03",
      title:       "Structured Project Workflow",
      description:
        "From intake to delivery, every step is tracked and communicated clearly. You always know where your project stands and when the next deliverable is due.",
    },
    {
      number:      "04",
      title:       "Scope That Scales",
      description:
        "Whether you are managing one permit or a multi-site development pipeline, CADTRI adjusts to your volume without sacrificing quality or turnaround time.",
    },
  ],
} as const;

// ─── Process ──────────────────────────────────────────────────────────────────

export const processSteps = [
  {
    step:        "01",
    title:       "Project Intake",
    description:
      "Submit your project scope, site address, and any existing documentation. We confirm jurisdiction requirements, deliverable scope, and timeline before work begins.",
  },
  {
    step:        "02",
    title:       "Document Review",
    description:
      "Existing drawings, surveys, or site conditions are reviewed and gaps are identified early. Resolving unknowns at intake prevents costly revision cycles mid-project.",
  },
  {
    step:        "03",
    title:       "Drafting & Coordination",
    description:
      "Your permit set is drafted to jurisdiction-ready standards and coordinated across architectural, structural, and all required plan sheet types.",
  },
  {
    step:        "04",
    title:       "Delivery & Submission",
    description:
      "Final packages are delivered in your required format. We remain available to address plan-check comments and support resubmission if needed.",
  },
] as const;

// ─── Industries ───────────────────────────────────────────────────────────────

export const industriesServed = {
  eyebrow:    "Who We Work With",
  heading:    "Built for project teams that move.",
  subheading: "We work directly with contractors, developers, architects, and property owners who need permit-ready documentation on a professional timeline.",
  items: [
    {
      title:       "General Contractors",
      description: "Need a permit set before you can pull a permit. We deliver coordinated packages that keep your job schedule moving.",
    },
    {
      title:       "Licensed Architects",
      description: "Overflow drafting, permit coordination support, or production documentation for projects where internal capacity is stretched.",
    },
    {
      title:       "Real Estate Developers",
      description: "Documentation built across single parcels or multi-site portfolios. From feasibility sketch to jurisdiction-ready submission.",
    },
    {
      title:       "Residential Contractors",
      description: "Additions, ADUs, garage conversions, and remodels. Complete drawing sets prepared specifically for residential plan check.",
    },
    {
      title:       "Property Owners",
      description: "We guide you through what the jurisdiction requires and prepare everything needed for a clean permit submission.",
    },
    {
      title:       "Interior Designers",
      description: "Permit-required architectural documentation for tenant improvements, remodels, and buildouts that require a stamped set.",
    },
  ],
} as const;

// ─── Portfolio ────────────────────────────────────────────────────────────────
// PLACEHOLDER — replace with real project information when available.

export const portfolioItems = [
  {
    type:  "Residential Addition",
    title: "Single-Family Addition & ADU",
    note:  "Replace with real project details",
  },
  {
    type:  "Commercial Tenant Improvement",
    title: "Office Suite Buildout",
    note:  "Replace with real project details",
  },
  {
    type:  "New Construction",
    title: "New-Build Custom Residence",
    note:  "Replace with real project details",
  },
  {
    type:  "Multi-Family",
    title: "Duplex Conversion & ADU",
    note:  "Replace with real project details",
  },
  {
    type:  "Commercial",
    title: "Retail Tenant Improvement",
    note:  "Replace with real project details",
  },
  {
    type:  "Mixed-Use",
    title: "Ground Floor Commercial + Residential",
    note:  "Replace with real project details",
  },
] as const;

// ─── Closing CTA ──────────────────────────────────────────────────────────────

export const closingCta = {
  heading:         "Your project needs drawings that work.",
  subheading:      "Tell us your scope and we will confirm timeline, deliverables, and next steps. No commitment required.",
  primaryAction:   { label: "Request a Proposal", href: "/contact"  },
  secondaryAction: { label: "View Our Services",  href: "/services" },
} as const;
