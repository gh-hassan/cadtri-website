// Homepage content — all copy and data for every section.
// Edit this file to update the homepage without touching component logic.

// ─── Hero ─────────────────────────────────────────────────────────────────────

export const heroContent = {
  eyebrow: "Professional CAD Drafting & Permit Services",
  heading: ["Professional CAD Drafting Services.", "Permits That Move."],
  description:
    "Stop worrying about rejected permits. CADTRI delivers complete, permit-ready architectural drawings and CAD solutions built to your jurisdiction's standards and approved the first time.",
  primaryCta:    { label: "Request Proposal",   href: "/contact"  },
  secondaryCta:  { label: "View Our Services",  href: "/services" },
  credentials: [
    "Permit-ready architectural drawing packages",
    "Jurisdiction research before drafting begins",
    "Residential and commercial project types",
    "BIM coordination and structural documentation",
    "CAD outsourcing and overflow drafting support",
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
    label: "Architectural CAD Drafting",
    description:
      "Floor plans, elevations, sections, and construction details prepared with AutoCAD and BIM workflows. Every sheet coordinated and ready for plan check, not just visually complete.",
  },
  {
    label: "Jurisdiction Research First",
    description:
      "We research your city's submission standards, checklist requirements, and code editions before drafting begins. Sets are built to pass the first time, not revised after rejection.",
  },
  {
    label: "Residential & Commercial",
    description:
      "From single-family additions and ADUs to commercial tenant improvements and mixed-use projects. Complete CAD solutions across every project type at the same standard.",
  },
  {
    label: "CAD Solutions Beyond Drafting",
    description:
      "BIM coordination, as-built documentation, redline-to-CAD conversion, contractor bid packages, and construction design support, all under one roof.",
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
  heading:    "We understand construction from every angle.",
  subheading: "Whether you are a contractor, architect, developer, or property owner, we know what works and what gets rejected.",
  items: [
    {
      number:      "01",
      title:       "Permit-Ready Every Time",
      description:
        "Our professional CAD services are built specifically to get permits approved on the first submission. We research your jurisdiction, understand what the plan checker wants, and deliver drawings that work.",
    },
    {
      number:      "02",
      title:       "BIM Coordination That Prevents Problems",
      description:
        "We coordinate architectural, structural, MEP, and all other systems so conflicts are caught before they reach the plan checker. That saves you money. That saves you time.",
    },
    {
      number:      "03",
      title:       "Strategy Before CAD",
      description:
        "Before we open AutoCAD, we do project planning to confirm the project can actually happen. We answer the real questions: can this be built, will the city approve it, and what is the timeline.",
    },
    {
      number:      "04",
      title:       "Complete Compliance Documentation",
      description:
        "Title 24 energy compliance, accessibility requirements, and all the building compliance documentation that makes permits stick. Handled as part of every complete drawing package.",
    },
  ],
} as const;

// ─── Process ──────────────────────────────────────────────────────────────────

export const processSteps = [
  {
    step:        "01",
    title:       "We Research Your Jurisdiction",
    description:
      "Before we touch CAD software, we figure out what your city actually wants. That is how permit set preparation gets done right, built to local standards from day one.",
  },
  {
    step:        "02",
    title:       "We Build It Right the First Time",
    description:
      "Our architectural CAD drafting follows every local requirement. Coordinated, complete, and ready to submit, not a draft requiring additional work on your end.",
  },
  {
    step:        "03",
    title:       "You Submit. We Stay Available.",
    description:
      "If the city has questions, we respond. If they want revisions, we handle them. That is what real construction documentation services look like.",
  },
  {
    step:        "04",
    title:       "You Get Your Permit",
    description:
      "That is the goal. Permits that actually happen, on schedule. The engagement is not closed until the permit is issued.",
  },
] as const;

// ─── Industries ───────────────────────────────────────────────────────────────

export const industriesServed = {
  eyebrow:    "Who We Work With",
  heading:    "Built for project teams that move.",
  subheading: "We work directly with contractors, developers, architects, and property owners who need reliable architectural drafting services and permit coordination on a professional timeline.",
  items: [
    {
      title:       "General Contractors",
      description: "Need a complete permit-ready construction drawing package before pulling a building permit. We prepare coordinated sets built specifically for jurisdiction review and plan check approval.",
    },
    {
      title:       "Licensed Architects",
      description: "Overflow production drafting, construction documentation services, permit coordination, and drafting team support when internal capacity is stretched.",
    },
    {
      title:       "Real Estate Developers",
      description: "Construction planning support across single parcels or multi-site developments, from feasibility drawings through permit submission and project coordination services.",
    },
    {
      title:       "Residential Contractors",
      description: "ADUs, additions, remodels, and garage conversions prepared with residential drafting services tailored to local building department requirements.",
    },
    {
      title:       "Property Owners",
      description: "We guide property owners through permit services, city approvals, and permit-ready documentation requirements while preparing complete drawing packages for submission.",
    },
    {
      title:       "Mixed-Use & Hospitality",
      description: "Stacked residential over commercial, restaurants, hotels, and event spaces. We coordinate building, health department, and fire requirements in one complete package.",
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
  heading:         "Stop worrying about rejected permits.",
  subheading:      "Tell us your scope and we will confirm timeline, deliverables, and next steps. Get permit-ready drawings that pass the first time.",
  primaryAction:   { label: "Request a Proposal", href: "/contact"  },
  secondaryAction: { label: "View Our Services",  href: "/services" },
} as const;
