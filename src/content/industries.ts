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
      "ADUs, additions, garage conversions, remodels, and new construction. Complete permit documentation for single-family and multi-family residential projects.",
    heading: "Permit-ready documentation for residential projects.",
    description:
      "From single-family additions to ADU packages and whole-home remodels, CADTRI produces the complete drawing sets that residential contractors, architects, and property owners need to clear plan check.",
    overview:
      "Residential permit documentation requires precise coordination between design intent, local zoning rules, and jurisdiction-specific submittal standards. CADTRI prepares complete drawing packages for single-family homes, accessory dwelling units, garage conversions, room additions, pool and spa installations, and interior remodels. Every set is built to the applicable building department's checklist before a single sheet is drafted, so the package arrives at the counter ready for review, not revision.",
    challenges: [
      {
        title: "Setback and Zoning Compliance",
        description:
          "Every city and county applies different setback rules, floor area ratios, and lot coverage limits. We calculate these constraints at intake to confirm feasibility before production begins, preventing corrections that would otherwise come back from the plan checker.",
      },
      {
        title: "Title 24 Energy Code",
        description:
          "California residential projects require a certified energy compliance package alongside the architectural set. We coordinate Title 24 documentation as part of every permit set so the submittal package is complete from day one.",
      },
      {
        title: "ADU Regulations",
        description:
          "State ADU law overrides many local restrictions, but the specific implementation varies by jurisdiction. Our ADU packages are pre-researched for the applicable city before drafting begins, covering setbacks, height limits, owner-occupancy requirements, and parking exemptions.",
      },
      {
        title: "Plan Check Resubmittal",
        description:
          "Residential plan checkers frequently issue corrections on initial submittal. Our correction response packages include clouded revisions, a formal response letter addressing every comment, and updated sheets organized for efficient re-review.",
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
      "Permit-ready residential drawing packages for ADUs, additions, garage conversions, remodels, and new construction. CADTRI handles the full documentation scope for residential contractors, architects, and property owners.",
  },
  {
    slug: "commercial",
    title: "Commercial",
    shortDescription:
      "Tenant improvements, new construction, and permit coordination for commercial project teams. Coordinated architectural, structural, and MEP documentation built for plan check.",
    heading: "Documentation built for commercial project teams.",
    description:
      "General contractors, commercial developers, and architects rely on CADTRI for permit-ready documentation on tenant improvements, new commercial construction, and multi-discipline coordination packages.",
    overview:
      "Commercial projects demand a higher level of multi-discipline coordination, more detailed code compliance documentation, and tighter plan check turnaround than residential work. CADTRI supports general contractors, developers, and architects with permit-ready documentation for tenant improvements, new commercial construction, and complex commercial projects. We manage the cross-discipline review to prevent conflicts from reaching the plan checker and build production schedules around permit submission deadlines to protect contractor timelines.",
    challenges: [
      {
        title: "Multi-Discipline Coordination",
        description:
          "Commercial permits require coordinated architectural, structural, mechanical, electrical, and plumbing sheets. CADTRI manages the cross-discipline review to prevent dimensional conflicts and reference gaps from reaching the plan check stage, where corrections cost schedule time.",
      },
      {
        title: "Occupancy and Code Analysis",
        description:
          "Tenant improvements require occupancy classification review, exiting analysis, and ADA accessibility documentation as part of every submittal. We complete this analysis at the front of production so compliance requirements are built into the drawings, not appended as corrections.",
      },
      {
        title: "Fast-Track Schedules",
        description:
          "Commercial leases create hard construction start dates. We build production schedules around permit submission deadlines to protect contractor timelines, and our plan check correction response process is structured for rapid turnaround when city comments arrive.",
      },
      {
        title: "Jurisdiction-Specific Requirements",
        description:
          "Commercial plan check requirements vary significantly across California cities and Texas municipalities. We research the applicable jurisdiction's requirements before production starts, so the first submittal is built to the standard the plan checker expects.",
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
      "Commercial permit documentation for tenant improvements, new construction, and multi-discipline coordination. CADTRI delivers coordinated architectural, structural, and MEP packages built for plan check.",
  },
  {
    slug: "hospitality",
    title: "Hospitality",
    shortDescription:
      "Permit packages for restaurants, bars, hotels, and event venues. Health department coordination, occupancy analysis, and life safety documentation in one complete package.",
    heading: "Permit support for hospitality and food service projects.",
    description:
      "Restaurants, bars, boutique hotels, and event venues require documentation that satisfies building, health, and fire agencies simultaneously. CADTRI prepares hospitality permit packages that consolidate the full scope in one coordinated submittal.",
    overview:
      "Hospitality projects involve a concentration of regulatory requirements that do not appear in standard commercial work. Health department coordination, occupancy load calculations, ADA accessibility compliance, life safety documentation, and in many cases historic district or design review approval are all part of a single project. CADTRI prepares hospitality permit packages that address every agency requirement in one coordinated set, reducing the back-and-forth that extends hospitality project timelines.",
    challenges: [
      {
        title: "Health Department Coordination",
        description:
          "Food service facilities require a separate health department permit alongside the building permit. We prepare documentation that satisfies both agencies simultaneously, so the project does not hold at a sequential approval step that delays construction start.",
      },
      {
        title: "Occupancy Load and Life Safety",
        description:
          "High-occupancy assembly spaces require exiting analysis and life safety documentation calibrated to the specific use and configuration. We complete the occupancy load calculation and exiting review at the start of production so the drawings reflect the correct egress widths, exit counts, and travel distances.",
      },
      {
        title: "MEP Reconfiguration Scope",
        description:
          "Hospitality fit-outs often involve significant reconfiguration of mechanical, electrical, and plumbing systems. We coordinate structural and MEP drawings within the architectural package so all agencies receive a unified, conflict-free set rather than a disconnected collection of discipline drawings.",
      },
      {
        title: "Exterior Design Review",
        description:
          "Hospitality projects in commercial corridors and historic districts frequently require design review approval before permit submittal. We prepare the required architectural exhibits, material boards, and presentation drawings for planning or design review commission review.",
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
      "Hospitality permit documentation for restaurants, bars, hotels, and event venues. Health department coordination, occupancy analysis, MEP packages, and historic district submissions from CADTRI.",
  },
  {
    slug: "mixed-use",
    title: "Mixed-Use",
    shortDescription:
      "Integrated permit packages for ground-floor commercial and residential developments. Multi-occupancy documentation from entitlement through jurisdiction submission.",
    heading: "Multi-use developments from entitlement through permit.",
    description:
      "Mixed-use projects combine commercial and residential occupancies in a single building, demanding documentation that addresses two classification systems, complex vertical coordination, and multi-agency submittal requirements.",
    overview:
      "Mixed-use developments combine ground-floor commercial space with residential units above, creating a documentation scope that addresses two occupancy classifications, occupancy separation requirements, complex structural and MEP vertical coordination, and multi-agency submittal requirements. CADTRI delivers integrated permit packages for mixed-use projects from feasibility drawing and entitlement exhibits through final jurisdiction submission, treating the project as a single coordinated scope rather than separate commercial and residential packages.",
    challenges: [
      {
        title: "Occupancy Separation Requirements",
        description:
          "Mixed-use buildings require fire-rated occupancy separations between commercial and residential components. These separation requirements are incorporated at the drawing production stage, not retrofitted during plan check, so the set clears the fire and building reviews without back-and-forth on the separation assembly details.",
      },
      {
        title: "Multi-Phase Permitting",
        description:
          "Large mixed-use projects frequently phase permits across shell, core, and tenant improvement stages. We structure the documentation to support phased submissions without creating coordination gaps between phases, and we maintain drawing continuity across the full permit sequence.",
      },
      {
        title: "Entitlement and Design Review",
        description:
          "Mixed-use projects in most jurisdictions require discretionary approval before permit submittal. CADTRI prepares entitlement packages, architectural exhibits, massing studies, and presentation drawings for planning commission or design review board consideration.",
      },
      {
        title: "Vertical MEP and Structural Coordination",
        description:
          "Stacking residential above commercial creates vertical MEP routing and structural coordination requirements that are more complex than single-occupancy buildings. We manage the coordination across disciplines so the permit set reflects a buildable, conflict-free design before it reaches the plan checker.",
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
      "Mixed-use development permit documentation from entitlement through jurisdiction submission. CADTRI handles integrated packages for ground-floor commercial and residential projects.",
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
