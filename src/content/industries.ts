// Industries served — drives /industries (listing) and /industries/[slug] (detail pages).

export interface IndustryChallenge {
  readonly title: string;
  readonly description: string;
}

export interface Industry {
  readonly slug: string;
  readonly title: string;
  readonly shortDescription: string;
  readonly heading: string;
  readonly description: string;
  readonly overview: string;
  readonly challenges: readonly IndustryChallenge[];
  readonly whatWeDeliver: readonly string[];
  readonly featuredServiceSlugs: readonly string[];
  readonly metaDescription: string;
}

export const industries: readonly Industry[] = [
  {
    slug: "residential",
    title: "Residential",
    shortDescription:
      "From single-family additions and ADU permit plans to garage conversions and whole-home remodels. Complete residential permit drawings that move through plan check with fewer delays.",
    heading: "Permit-ready residential drafting services for construction and remodeling projects.",
    description:
      "From single-family additions and ADU permit plans to garage conversions and whole-home remodels, CADTRI produces complete residential permit drawings that help contractors, architects, and property owners move through plan check with fewer delays.",
    overview:
      "Residential construction drafting requires careful coordination between design intent, zoning requirements, and jurisdiction-specific permit standards. CADTRI prepares complete residential construction documents for single-family homes, accessory dwelling units, garage conversions, room additions, pool and spa installations, and interior remodeling projects. Every permit-ready residential plan is built around the applicable building department checklist before drafting begins, helping the submission reach permit review fully organized and ready for approval.",
    challenges: [
      {
        title: "Setback and Zoning Compliance",
        description:
          "Every city and county applies different setback requirements, lot coverage limits, and floor area standards. We review zoning requirements during intake to confirm feasibility before production starts, helping avoid costly revisions during permit approval and residential permit coordination.",
      },
      {
        title: "Title 24 Energy Code",
        description:
          "California residential projects require certified Title 24 documentation alongside the architectural residential drawings. We coordinate energy compliance as part of the full construction drawing package so the permit submission is complete from day one.",
      },
      {
        title: "ADU Regulations",
        description:
          "California ADU regulations override many local restrictions, but every jurisdiction applies them differently. Our ADU permit plans are researched for the applicable city before drafting begins, including setbacks, parking exemptions, height limitations, and owner occupancy requirements.",
      },
      {
        title: "Plan Check Resubmittal",
        description:
          "Residential permit drawings frequently receive correction comments during the initial review cycle. Our response packages include clouded revisions, updated residential construction documents, and formal response letters organized for efficient re-review and faster permit workflow completion.",
      },
    ],
    whatWeDeliver: [
      "Permit-ready architectural drawing packages",
      "Site plans with setback, FAR, and lot coverage calculations",
      "Floor plans, elevations, sections, and construction details",
      "Title 24 energy compliance documentation",
      "ADU and JADU packages built to jurisdiction standards",
      "Plan check correction response packages",
      "Structural coordination and engineer-ready drawings",
    ],
    featuredServiceSlugs: [
      "architectural-drafting",
      "permit-set-preparation",
      "adu-permit-packages",
      "home-addition-packages",
      "garage-conversion-packages",
      "interior-remodel-packages",
      "title-24-energy-compliance",
      "city-comments-response",
      "pool-spa-permits",
      "accessory-structure-permits",
    ],
    metaDescription:
      "Professional residential drafting services including permit-ready construction drawings, home addition plans, ADU permit packages, and residential construction documentation.",
  },
  {
    slug: "commercial",
    title: "Commercial",
    shortDescription:
      "Permit-ready commercial drawings for tenant improvements, new construction, and multi-discipline coordination. Documentation built for general contractors, developers, and architects.",
    heading: "Documentation built for commercial project teams.",
    description:
      "General contractors, developers, and architects rely on CADTRI for commercial architectural drafting services, permit-ready commercial drawings, tenant improvement packages, and multi-discipline construction documentation built for efficient permit approval.",
    overview:
      "Commercial projects require a higher level of coordination, code compliance review, and production accuracy than typical residential work. CADTRI provides commercial drafting services and commercial construction drawing services for tenant improvements, new commercial construction, and complex multi-discipline developments. We support contractors, developers, and architects with coordinated commercial construction documentation, permit-ready commercial drawings, and commercial CAD drafting services designed to streamline the design-to-permit workflow. Our team manages architectural, structural, MEP, and BIM coordination reviews before submission to reduce conflicts during plan check. Production schedules are aligned with permit deadlines and contractor timelines so commercial projects continue moving without unnecessary delays.",
    challenges: [
      {
        title: "Multi-Discipline Coordination",
        description:
          "Commercial permit drawings require coordinated architectural, structural, mechanical, electrical, and plumbing documentation. CADTRI manages cross-discipline review, BIM integration, and engineering coordination drawings to reduce dimensional conflicts, reference gaps, and field coordination issues before submission.",
      },
      {
        title: "Occupancy and Code Analysis",
        description:
          "Tenant improvements and commercial renovations require occupancy classification review, ADA accessibility analysis, exiting compliance, and zoning compliance drawings as part of the permit process. We complete these reviews early so code requirements are integrated directly into the commercial construction drawings instead of added later as corrections.",
      },
      {
        title: "Fast-Track Schedules",
        description:
          "Commercial leases and development timelines create strict construction deadlines. Our commercial architectural drafting workflow is built around permit submission schedules, rapid production turnaround, and organized correction responses when jurisdiction comments are issued.",
      },
      {
        title: "Jurisdiction-Specific Requirements",
        description:
          "Commercial permit requirements vary significantly across cities, municipalities, and planning departments. CADTRI researches each jurisdiction's commercial permit standards before drafting begins so the first submission aligns with the building department's expectations for commercial permit approval and construction-ready architectural plans.",
      },
    ],
    whatWeDeliver: [
      "Complete commercial permit drawing packages",
      "Occupancy analysis and exiting documentation",
      "ADA accessibility compliance sheets",
      "Coordinated architectural and structural drawings",
      "MEP coordination across all disciplines",
      "Contractor bid packages and construction documents",
      "Plan check correction response packages",
    ],
    featuredServiceSlugs: [
      "architectural-drafting",
      "permit-set-preparation",
      "code-compliance-review",
      "structural-coordination",
      "mep-coordination",
      "contractor-bid-package",
      "city-comments-response",
      "entitlement-support",
      "construction-administration",
      "pre-application-meeting-prep",
    ],
    metaDescription:
      "Professional commercial drafting services including architectural drawings, BIM coordination, and permit-ready construction documentation.",
  },
  {
    slug: "hospitality",
    title: "Hospitality",
    shortDescription:
      "Restaurants, bars, boutique hotels, resorts, and event venues. Coordinated permit-ready submittals that satisfy building, health, and fire agencies simultaneously.",
    heading: "Permit support for hospitality and food service projects.",
    description:
      "Restaurants, bars, boutique hotels, resorts, and event venues rely on CADTRI for hospitality drafting services, hospitality construction documentation, and coordinated permit-ready submittals that satisfy building, health, and fire agencies together.",
    overview:
      "Hospitality projects involve a level of regulatory coordination that goes beyond standard commercial construction. Health department approvals, occupancy load calculations, ADA accessibility compliance, life safety documentation, and in many cases historic district or design review approvals must all work together within a single hospitality permit package. CADTRI provides hospitality architectural drafting, hotel construction drawings, restaurant architectural drafting, and hospitality BIM coordination services for restaurants, hotels, hospitality renovations, and commercial food service projects. Our hospitality CAD drafting services are built to consolidate every agency requirement into one coordinated construction-ready submission, reducing review delays and protecting project timelines.",
    challenges: [
      {
        title: "Health Department Coordination",
        description:
          "Food service facilities require separate health department approvals alongside the building permit process. We prepare restaurant construction documentation and hospitality permit drawings that satisfy both agencies simultaneously, helping projects avoid sequential approvals that delay construction starts.",
      },
      {
        title: "Occupancy Load and Life Safety",
        description:
          "Assembly and hospitality spaces require detailed occupancy calculations, exiting analysis, and life safety coordination. We complete occupancy load reviews early in the hospitality construction planning process so drawings reflect accurate exit counts, travel distances, egress widths, and permit-ready life safety documentation.",
      },
      {
        title: "MEP Reconfiguration Scope",
        description:
          "Hospitality fit-outs often require extensive HVAC systems, plumbing systems, electrical coordination, and commercial kitchen layout drafting. CADTRI coordinates structural, MEP, and architectural documentation into one unified hospitality construction documentation package to reduce field conflicts and streamline permit review.",
      },
      {
        title: "Exterior Design Review",
        description:
          "Hotels, restaurants, and hospitality developments located in commercial corridors or historic districts frequently require design review approval before permit submission. We prepare hospitality visualization services, architectural exhibits, rendering packages, material presentations, and design development drawings for planning commissions, review boards, and stakeholder presentations.",
      },
    ],
    whatWeDeliver: [
      "Building permit packages for food service and hospitality uses",
      "Health department coordination documentation",
      "Occupancy load analysis and exiting plans",
      "ADA accessibility compliance documentation",
      "MEP coordination packages",
      "Interior remodel permit sets",
      "Design review and historic district submission packages",
    ],
    featuredServiceSlugs: [
      "permit-set-preparation",
      "interior-remodel-packages",
      "mep-coordination",
      "structural-coordination",
      "code-compliance-review",
      "historic-district-submissions",
      "short-term-rental-permits",
      "city-comments-response",
      "construction-administration",
      "renderings-visualization",
    ],
    metaDescription:
      "Professional hospitality drafting services including hotel, restaurant, and resort construction drawings, BIM coordination, and visualization.",
  },
  {
    slug: "mixed-use",
    title: "Mixed-Use",
    shortDescription:
      "Multi-use developments from entitlement through permit. Integrated documentation for projects that combine commercial and residential occupancies within a single development scope.",
    heading: "Multi-use developments from entitlement through permit.",
    description:
      "CADTRI provides mixed-use architectural drafting services and coordinated permit-ready documentation for projects that combine commercial and residential occupancies within a single development scope.",
    overview:
      "Mixed-use developments combine ground floor commercial spaces with residential units above, creating a construction documentation process that must address multiple occupancy classifications, fire separation requirements, vertical MEP coordination, and multi-agency permit approvals. CADTRI delivers integrated mixed-use construction drawings, mixed-use BIM coordination, and permit-ready mixed-use documentation from early feasibility studies and entitlement exhibits through final jurisdiction submission. Rather than treating the project as separate residential and commercial packages, we coordinate the development as one connected scope. Our mixed-use drafting services support developers, architects, and contractors with construction-ready multi-use building plans, zoning compliance documentation, phased construction documentation, and coordinated mixed-use construction drawings built for efficient plan review.",
    challenges: [
      {
        title: "Occupancy Separation Requirements",
        description:
          "Mixed-use buildings require fire-rated separations between commercial and residential occupancies. We integrate occupancy separation assemblies, code compliance documentation, and life safety coordination directly into the mixed-use architectural drafting workflow so the permit set clears both fire and building reviews without repeated correction cycles.",
      },
      {
        title: "Multi-Phase Permitting",
        description:
          "Large mixed-use developments often phase permits across shell, core, and tenant improvement stages. CADTRI structures phased construction documentation to maintain continuity between permit submissions while reducing coordination gaps across the full development timeline.",
      },
      {
        title: "Entitlement and Design Review",
        description:
          "Many urban mixed-use developments require entitlement approval, zoning review, and design review board hearings before permit submission. We prepare mixed-use development drafting packages, architectural exhibits, massing studies, presentation drawings, and planning coordination materials for discretionary approvals and municipal review processes.",
      },
      {
        title: "Vertical MEP and Structural Coordination",
        description:
          "Stacking residential and commercial occupancies creates complex structural systems and vertical MEP routing conditions. CADTRI manages BIM coordination for mixed-use projects across architectural, structural, and MEP disciplines so the final mixed-use construction documentation reflects a coordinated, buildable design before it reaches plan check.",
      },
    ],
    whatWeDeliver: [
      "Integrated architectural permit packages for mixed-use buildings",
      "Occupancy separation and fire-rated assembly documentation",
      "Entitlement packages and planning commission exhibits",
      "Multi-phase permit documentation with consistent drawing continuity",
      "BIM coordination for complex multi-trade projects",
      "Structural and MEP coordination packages",
      "Feasibility studies and pre-application meeting preparation",
    ],
    featuredServiceSlugs: [
      "architectural-drafting",
      "permit-set-preparation",
      "entitlement-support",
      "structural-coordination",
      "mep-coordination",
      "bim-coordination",
      "feasibility-study",
      "pre-application-meeting-prep",
      "construction-administration",
      "city-comments-response",
    ],
    metaDescription:
      "Professional mixed-use drafting services including BIM coordination, construction drawings, and permit-ready documentation for integrated developments.",
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
