// Service content model — drives both the /services index and individual /services/[slug] pages.

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ServiceIncludes {
  readonly title: string;
  readonly description: string;
}

export interface ServiceAudience {
  readonly title: string;
  readonly description: string;
}

export interface ServiceStep {
  readonly title: string;
  readonly description: string;
}

export interface ServiceFaq {
  readonly question: string;
  readonly answer: string;
}

export type ServiceLayout =
  | "standard"
  | "process"
  | "visual"
  | "package"
  | "technical"
  | "strategy"
  | "feasibility"
  | "addition"
  | "conversion"
  | "admin"
  | "bid"
  | "outdoor"
  | "remodel"
  | "compliance"
  | "accessory"
  | "energy"
  | "historic"
  | "bim"
  | "zoning"
  | "pathway"
  | "assessment"
  | "scope"
  | "options"
  | "gap"
  | "demolition"
  | "redline"
  | "tenant"
  | "interior"
  | "siteplan"
  | "record"
  | "deferred"
  | "firesafety"
  | "signage";

export interface Service {
  readonly slug: string;
  readonly title: string;
  readonly category: string;
  readonly tagline: string;
  readonly layout: ServiceLayout;
  readonly overview: string;
  readonly includes: readonly ServiceIncludes[];
  readonly audience: readonly ServiceAudience[];
  readonly whyItMatters: string;
  readonly relatedSlugs: readonly string[];
  // Layout-specific optional fields
  readonly steps?: readonly ServiceStep[];
  readonly processHighlights?: readonly { readonly label: string; readonly value: string }[];
  readonly useCases?: readonly string[];
  readonly outputFormats?: readonly string[];
  readonly faqs?: readonly ServiceFaq[];
  readonly disciplines?: readonly string[];
}

// ─── Service data ─────────────────────────────────────────────────────────────

export const services: readonly Service[] = [

  // ── 01. Architectural Drafting ───────────────────────────────────────────
  {
    slug:     "architectural-drafting",
    title:    "Architectural Drafting",
    category: "Drawings",
    layout:   "standard",
    tagline:  "Complete, permit-ready plan sets for residential and commercial projects.",
    overview:
      "We produce detailed architectural drawing packages that meet the documentation standards of local building departments. Every set includes all required plan sheets, built and coordinated to move through plan check without unnecessary corrections. Whether the project is a single-family addition, a ground-up commercial building, or an ADU, the drawings are prepared to the specific submission requirements of the applicable jurisdiction.",
    includes: [
      { title: "Floor Plans",       description: "Dimensioned floor plans for all levels, including existing and proposed conditions where required by the jurisdiction." },
      { title: "Elevations",        description: "Exterior building elevations showing all facades, heights, finish materials, and opening locations." },
      { title: "Building Sections", description: "Cross-sections demonstrating structural assembly, ceiling heights, and floor-to-floor dimensions." },
      { title: "Site Plan",         description: "Site layout showing setbacks, property lines, access, drainage, and utility connections." },
      { title: "Details and Notes", description: "Construction details, material callouts, applicable code sections, and jurisdictional compliance notes." },
      { title: "Title Sheet",       description: "Project identification, code summary, scope of work, applicable codes, and complete sheet index." },
    ],
    audience: [
      { title: "General Contractors",    description: "Need a complete permit set before pulling a building permit on a residential or commercial project." },
      { title: "Property Owners",        description: "Managing ADU additions, garage conversions, room additions, or remodel permits." },
      { title: "Licensed Architects",    description: "Require production drafting support for overflow projects or smaller permit-required scopes." },
      { title: "Real Estate Developers", description: "Building residential or commercial projects and need permit-ready documentation on a professional timeline." },
    ],
    whyItMatters:
      "Incomplete or undercoordinated drawings are the most common cause of plan check corrections and permit delays. A professionally prepared permit set includes all required sheets, addresses the code requirements specific to the jurisdiction, and gives plan checkers a set that is straightforward to approve. CADTRI's drawings are built to that standard from the first submission.",
    relatedSlugs: ["permit-set-preparation", "structural-coordination", "code-compliance-review"],
  },

  // ── 02. Permit Set Preparation ───────────────────────────────────────────
  {
    slug:     "permit-set-preparation",
    title:    "Permit Set Preparation",
    category: "Permitting",
    layout:   "process",
    tagline:  "Jurisdiction-specific permit packages built for first-pass approval.",
    overview:
      "Permit set preparation covers the full document package required to initiate a building permit application. We research the submission requirements of the specific jurisdiction and assemble the complete set, built to those exact local standards. Every submission is prepared with the plan checker's expectations in mind.",
    processHighlights: [
      { label: "Average delivery",   value: "7-10 days" },
      { label: "Jurisdictions",      value: "All US" },
      { label: "Revision rounds",    value: "Included" },
    ],
    steps: [
      { title: "Jurisdiction Research",   description: "We review the building department's submission checklist, known plan check triggers, applicable codes, and any local amendments that affect the project scope." },
      { title: "Document Assembly",       description: "All drawings, code compliance forms, energy documentation, and supplemental materials are compiled and formatted to the jurisdiction's exact requirements." },
      { title: "Internal Review",         description: "We review the complete package against the submission checklist before delivery, checking for completeness, sheet coordination, and common correction triggers." },
      { title: "Submission and Support",  description: "The complete package is delivered ready for submission. We remain available to respond to plan check comments and prepare resubmission packages if corrections are issued." },
    ],
    includes: [
      { title: "Title Sheet and Project Summary",      description: "Project identification, scope, applicable codes, and owner, designer, and contractor information." },
      { title: "Code Compliance Documentation",        description: "Energy compliance, accessibility, zoning conformance, and all required regulatory documentation." },
      { title: "Jurisdiction-Specific Requirements",   description: "Supplemental sheets, checklist forms, and documentation formats required by the specific building department." },
      { title: "Application Package Assembly",         description: "All drawings and documents organized into a single submission-ready package per jurisdiction requirements." },
      { title: "Plan Check Support",                   description: "Available to respond to plan check comments and prepare resubmission packages if corrections are issued." },
    ],
    audience: [
      { title: "General Contractors", description: "Pulling permits for residential or light commercial projects who need a complete, organized submission." },
      { title: "Property Owners",     description: "Navigating the permit process without prior experience in documentation requirements." },
      { title: "Designers and Drafters", description: "Who need a production partner for jurisdiction research and compliance documentation." },
    ],
    whyItMatters:
      "Every jurisdiction has specific submission formats, checklist requirements, and common plan check triggers. Understanding those requirements before the set is built is what separates a first-pass approval from a two-round correction cycle. CADTRI's permit set preparation starts with jurisdiction research, not drafting.",
    relatedSlugs: ["architectural-drafting", "city-comments-response", "code-compliance-review"],
  },

  // ── 03. City Comments Response ───────────────────────────────────────────
  {
    slug:     "city-comments-response",
    title:    "City Comments Response",
    category: "Permitting",
    layout:   "process",
    tagline:  "Plan check corrections addressed, documented, and resubmitted.",
    overview:
      "When a building department issues a correction notice, the response needs to be clear, complete, and professionally documented. We review each plan check comment, prepare the required drawing revisions, and produce a formal response set that addresses every item directly. The goal is a response that closes the review without a second round.",
    processHighlights: [
      { label: "Response time",   value: "5-7 days" },
      { label: "Format",         value: "Formal letter" },
      { label: "Follow-up",      value: "Included" },
    ],
    steps: [
      { title: "Comment Log Review",    description: "We analyze each plan check item, identify the required resolution, and cross-reference it against the current drawing set." },
      { title: "Drawing Corrections",   description: "All identified deficiencies are corrected and clouded on the relevant plan sheets, with clear markup indicating the nature of each change." },
      { title: "Response Letter",       description: "A formal written response is prepared documenting how each comment was addressed, with sheet and detail references for every item." },
      { title: "Resubmission Package",  description: "The complete resubmission set is assembled: revised sheets, response letter, and any required supplemental documentation, ready to submit." },
    ],
    includes: [
      { title: "Comment Log Review",   description: "Full analysis of each plan check item and its required resolution, cross-referenced against the current drawing set." },
      { title: "Drawing Corrections",  description: "Revised and clouded plan sheets addressing each identified deficiency with clear markup indicating the change." },
      { title: "Response Letter",      description: "Formal written response documenting how each comment was addressed, with sheet and detail references." },
      { title: "Resubmission Package", description: "Complete resubmission set incorporating all revised sheets, the response letter, and any required supplemental documentation." },
      { title: "Follow-Up Coordination", description: "Available for subsequent correction rounds if the jurisdiction issues additional comments." },
    ],
    audience: [
      { title: "General Contractors",      description: "Who received a correction notice and need to get the project moving again on schedule." },
      { title: "Property Owners",          description: "Navigating an unexpected plan check rejection and unsure how to respond." },
      { title: "Architects and Designers", description: "Who need a production partner to execute the technical corrections and format the response." },
    ],
    whyItMatters:
      "A poorly organized correction response often triggers a second round of comments. A clean response set with clearly clouded corrections, a well-organized response letter, and properly marked revision dates gives the plan checker what they need to close the review in a single pass.",
    relatedSlugs: ["permit-set-preparation", "architectural-drafting", "code-compliance-review"],
  },

  // ── 04. Structural Coordination ──────────────────────────────────────────
  {
    slug:     "structural-coordination",
    title:    "Structural Coordination",
    category: "Coordination",
    layout:   "technical",
    tagline:  "Architectural and structural drawings coordinated into one coherent permit set.",
    overview:
      "On projects that require a licensed structural engineer, the architectural and structural drawing sets must work together as a single coherent package. We coordinate both sets, reviewing for dimensional conflicts, aligning references, and producing a combined permit package that reads as one document. All coordination is completed in direct communication with the engineer of record.",
    disciplines: ["Architectural Plans", "Structural Engineering", "Foundation Systems", "Lateral Force Resisting", "Gravity Framing", "Connection Details"],
    includes: [
      { title: "Coordination Review",   description: "Side-by-side review of structural drawings against architectural sheets to identify dimensional, assembly, and reference conflicts." },
      { title: "Coordination Drawings", description: "Updated architectural sheets incorporating structural references, callouts, and revised dimensions." },
      { title: "Conflict Log",          description: "Documentation of all identified conflicts, confirmed resolutions, and responsible parties for each item." },
      { title: "Combined Permit Package", description: "Final coordinated architectural and structural set assembled for joint permit submission." },
      { title: "Engineer Communication", description: "Direct coordination with the structural engineer of record to resolve open items before package submission." },
    ],
    audience: [
      { title: "Licensed Architects",    description: "Managing projects where structural coordination is required and need a dedicated production resource." },
      { title: "General Contractors",    description: "Delivering permit packages for ground-up construction or major structural renovation." },
      { title: "Real Estate Developers", description: "Running projects with multiple engineering consultants who need a single coordination point." },
    ],
    whyItMatters:
      "Uncoordinated drawings are a leading cause of plan check corrections and field conflicts. When the architectural and structural sets do not agree on dimensions, bearing locations, or assembly details, the project pays twice: once at plan check and once in the field.",
    relatedSlugs: ["architectural-drafting", "mep-coordination", "permit-set-preparation"],
  },

  // ── 05. Code and Compliance Review ──────────────────────────────────────
  {
    slug:     "code-compliance-review",
    title:    "Code and Compliance Review",
    category: "Review",
    layout:   "standard",
    tagline:  "Pre-submission review to catch compliance issues before plan check.",
    overview:
      "A code and compliance review examines your drawing package against the applicable building code, zoning ordinance, and accessibility requirements before you submit for permit. Issues identified at this stage cost nothing to correct. Issues identified by a plan checker cost time, money, and schedule.",
    includes: [
      { title: "Building Code Review",    description: "Review of applicable code sections relevant to the project occupancy, construction type, and scope." },
      { title: "Zoning Compliance Check", description: "Setback, height, FAR, parking, and use verification against the applicable zoning ordinance." },
      { title: "Accessibility Review",    description: "ADA or applicable accessibility code review for commercial and public occupancies." },
      { title: "Correction Markup",       description: "Redlined drawings identifying each compliance issue with code citations and recommended resolutions." },
      { title: "Summary Report",          description: "Written summary of all findings organized by sheet, code section, and required action." },
    ],
    audience: [
      { title: "Designers and Drafters", description: "Who want an independent technical review before submitting to the building department." },
      { title: "Architects",             description: "Managing projects in unfamiliar jurisdictions or under complex code overlay districts." },
      { title: "Developers",             description: "Running tight permitting timelines where a plan check correction cycle would create unacceptable schedule risk." },
      { title: "Property Owners",        description: "Who have received drawings from a third party and want to verify compliance before signing off." },
    ],
    whyItMatters:
      "A pre-submission code review is the most cost-effective risk management available in the permit process. One correction cycle typically costs more in schedule delays and rework fees than the review itself. CADTRI's compliance review gives you a documented compliance position before you submit.",
    relatedSlugs: ["permit-set-preparation", "architectural-drafting", "city-comments-response"],
  },

  // ── 06. Renderings and Visualization ────────────────────────────────────
  {
    slug:         "renderings-visualization",
    title:        "Renderings and Visualization",
    category:     "Visualization",
    layout:       "visual",
    tagline:      "3D renderings and visualizations for permitting, presentations, and approvals.",
    overview:
      "We produce architectural renderings and visualization materials for projects that require visual presentations to jurisdictions, review boards, design review committees, or clients. Renderings are based directly on the permitted architectural drawings, ensuring consistency between the visual presentation and the technical permit set.",
    useCases: [
      "Design review board submissions",
      "HOA approval packages",
      "Planning commission hearings",
      "Client design presentations",
      "Investor and lender decks",
      "Pre-construction marketing",
    ],
    outputFormats: [
      "High-resolution JPEG",
      "Print-ready PDF",
      "Web-optimized PNG",
      "Formatted presentation deck",
    ],
    includes: [
      { title: "Exterior Renderings",        description: "Full-color exterior views showing massing, material finishes, fenestration, and site context." },
      { title: "Interior Views",             description: "Interior perspective renderings for tenant improvements, residential remodels, and commercial buildouts." },
      { title: "Elevation Perspectives",     description: "Architectural elevations enhanced with material indication, shadow study, and context." },
      { title: "Site Context Visualization", description: "Site plan views showing the project within its surrounding parcel and street context." },
      { title: "Presentation Package",       description: "Formatted set suitable for design review board submissions, HOA approval, or client review." },
    ],
    audience: [
      { title: "Real Estate Developers",  description: "Presenting projects to city councils, design review boards, planning commissions, or investors." },
      { title: "Property Owners",         description: "Needing visual approval from HOAs, neighbors, or historic preservation review committees." },
      { title: "Architects and Designers", description: "Requiring production rendering support for client presentations or board submissions." },
      { title: "Contractors",             description: "Presenting design options to clients before finalizing scope." },
    ],
    whyItMatters:
      "Jurisdictions and review boards are more likely to approve projects they can clearly understand. Professional renderings reduce ambiguity, preempt objections, and give decision-makers confidence in what is being proposed. For complex or design-sensitive projects, strong visualization is part of the approval strategy.",
    relatedSlugs: ["digital-walkthroughs", "3d-staging", "architectural-drafting"],
  },

  // ── 07. As-Built Documentation ───────────────────────────────────────────
  {
    slug:     "as-built-documentation",
    title:    "As-Built Documentation",
    category: "Documentation",
    layout:   "technical",
    tagline:  "Accurate existing-conditions drawings for renovation, permitting, and real estate.",
    overview:
      "As-built documentation captures the precise dimensions, layout, and conditions of an existing structure as it stands today. Before any renovation, addition, or permit application can move forward, the building department and project team need to understand what already exists. We measure the building, verify against any available original drawings, and produce a complete set of existing-conditions plans that form the foundation for all subsequent design and permit work.",
    disciplines: ["Floor Plan Measurement", "Elevation Recording", "Ceiling Heights", "Structural Element Location", "Utility Stub Locations", "Permit Record Verification"],
    includes: [
      { title: "Existing Floor Plans",       description: "Fully dimensioned floor plans for all levels measured to field conditions, not original permit records." },
      { title: "Existing Elevations",        description: "Exterior elevations recording current facade conditions, openings, heights, and material changes." },
      { title: "Ceiling Height Documentation", description: "Verified ceiling heights throughout, including soffits, dropped ceilings, and structural depth." },
      { title: "Structural Element Notation", description: "Location and notation of visible structural elements: columns, beams, shear walls, and bearing conditions." },
      { title: "Utility Stub Locations",     description: "Recorded locations of existing plumbing, electrical, and mechanical stubs visible during field measurement." },
      { title: "Permit Record Cross-Check",  description: "Comparison of field measurements against original permit records where available, with discrepancies noted." },
    ],
    audience: [
      { title: "Property Owners",    description: "Planning additions, renovations, or conversions who need an accurate baseline before design begins." },
      { title: "Contractors",        description: "Bidding renovation work who need verified dimensions before preparing estimates or pulling permits." },
      { title: "Architects",         description: "Beginning a renovation or addition project with no reliable existing documentation." },
      { title: "Real Estate Professionals", description: "Requiring accurate floor plans for listing, appraisal, or due diligence purposes." },
    ],
    whyItMatters:
      "Proceeding without accurate as-built documentation is one of the most common sources of unexpected costs in renovation and permit work. Dimensions that do not match reality create problems at every phase: design, permit, and construction. A verified baseline eliminates that category of risk before the project begins.",
    relatedSlugs: ["architectural-drafting", "permit-set-preparation", "mep-coordination"],
  },

  // ── 08. Solar + EV Permit Packages ───────────────────────────────────────
  {
    slug:     "solar-ev-permit-packages",
    title:    "Solar & EV Permit Packages",
    category: "Permitting",
    layout:   "package",
    tagline:  "Permit-ready solar, battery storage, and EV charging documentation packages.",
    overview:
      "Solar photovoltaic, battery storage, and EV charging installations require complete permit documentation to satisfy the building department, utility interconnection requirements, and the installation contractor. We assemble the full permit package built to the exact submission format required by the applicable jurisdiction and utility. Packages are engineered for first-pass approval.",
    includes: [
      { title: "Site and Roof Plan",             description: "Plan view showing module layout, roof orientation, setbacks, and access pathways." },
      { title: "Electrical Single-Line Diagram", description: "Complete electrical diagram from panels to inverter to utility meter, code-compliant and jurisdiction-ready." },
      { title: "System Specifications",          description: "Panel, inverter, battery, and racking specifications per manufacturer documentation." },
      { title: "Load Calculations",              description: "Service load calculations confirming existing electrical service adequacy or identifying required upgrades." },
      { title: "Interconnection Documentation", description: "Utility interconnection application support and required supplemental documentation." },
      { title: "Jurisdiction Checklist Completion", description: "All required forms, checkboxes, and supplemental materials specific to the building department." },
    ],
    faqs: [
      { question: "Do I need a permit for a solar installation?", answer: "Yes. In virtually all US jurisdictions, solar, battery storage, and EV charging installations require a building and/or electrical permit before installation." },
      { question: "How long does permitting take for solar?", answer: "Most jurisdictions process residential solar permits within 5-15 business days. CADTRI prepares packages built for first-pass approval to minimize correction cycles and installation delays." },
      { question: "Can you handle commercial solar packages?", answer: "Yes. Commercial packages have additional service load and structural requirements. We handle both residential and commercial scopes across all system sizes." },
      { question: "What about battery storage and EV chargers?", answer: "Both are included. Battery storage and EV charging installations require their own permit documentation and we handle all three as part of a combined package or individually." },
    ],
    audience: [
      { title: "Solar Installers",     description: "Who need a permit-ready package delivered fast so installations can stay on schedule." },
      { title: "Electrical Contractors", description: "Installing EV charging infrastructure for residential or commercial clients." },
      { title: "Property Owners",      description: "Pursuing solar or EV installations and navigating the permit process for the first time." },
      { title: "Developers",           description: "Building new construction with solar or EV charging requirements built into the project." },
    ],
    whyItMatters:
      "Solar and EV permit packages are time-sensitive. An incomplete submission delays the inspection, delays the utility interconnection, and pushes the installation date. A professionally prepared package eliminates that delay and keeps the project moving.",
    relatedSlugs: ["permit-set-preparation", "adu-permit-packages", "code-compliance-review"],
  },

  // ── 09. ADU Permit Packages ───────────────────────────────────────────────
  {
    slug:     "adu-permit-packages",
    title:    "ADU Permit Packages",
    category: "Permitting",
    layout:   "package",
    tagline:  "Complete permit packages for accessory dwelling units and garage conversions.",
    overview:
      "Accessory dwelling units are one of the most permit-intensive residential project types in most jurisdictions. We produce the complete ADU permit package: architectural drawings, site plan, energy compliance documentation, utility connection details, and all supplemental materials required by the applicable building department and local ADU ordinance.",
    includes: [
      { title: "Existing and Proposed Floor Plans", description: "Dimensioned floor plans showing existing conditions and the proposed ADU layout, including all new walls, openings, and fixtures." },
      { title: "Elevations",                        description: "All building elevations showing the ADU exterior, heights, and relationship to the primary structure." },
      { title: "Site Plan with Setback Verification", description: "Site plan confirming ADU placement within required setbacks, lot coverage calculations, and access." },
      { title: "Energy Compliance Forms",           description: "Title 24 or equivalent compliance documentation for the applicable jurisdiction." },
      { title: "Utility Connection Plan",           description: "Water, sewer, and electrical connection documentation for the new unit." },
      { title: "Jurisdiction Supplemental Forms",   description: "All required forms, owner affidavits, and documentation specific to the building department." },
    ],
    faqs: [
      { question: "Can you help with garage conversions?", answer: "Yes. Garage conversions to living space are treated as ADUs in most jurisdictions and we handle the complete permit package, including change-of-use documentation." },
      { question: "What is the typical delivery timeline?", answer: "Most ADU permit packages are delivered within 10-15 business days of intake, depending on project complexity and completeness of site information." },
      { question: "Do ADUs require energy compliance documentation?", answer: "Yes. Title 24 or equivalent energy compliance is required in most jurisdictions. We include the required compliance documentation in every ADU package." },
      { question: "Can you work from existing drawings?", answer: "Yes. If you have existing site plans or partial drawings, we can use them as the starting point and build the complete package from there." },
    ],
    audience: [
      { title: "Property Owners",      description: "Converting a garage, building a backyard cottage, or adding a rental unit to an existing property." },
      { title: "Real Estate Investors", description: "Adding ADUs to increase income potential on residential properties." },
      { title: "General Contractors",  description: "Building ADUs for clients who need a complete permit package before work begins." },
    ],
    whyItMatters:
      "ADU permit packages are heavily jurisdiction-specific. Local ADU ordinances vary significantly in setback requirements, owner-occupancy rules, design standards, and required supplemental documentation. Building the package without jurisdiction research first is the most common cause of correction cycles.",
    relatedSlugs: ["permit-set-preparation", "as-built-documentation", "code-compliance-review"],
  },

  // ── 10. Entitlement Support ───────────────────────────────────────────────
  {
    slug:     "entitlement-support",
    title:    "Entitlement Support",
    category: "Entitlement",
    layout:   "process",
    tagline:  "Variance applications, conditional use permits, and planning approvals.",
    overview:
      "Before a building permit can be issued, some projects require planning department approval: a variance, a conditional use permit, a design review, or a zoning change. We prepare the documentation packages required for entitlement applications, coordinate with planning staff, and support the applicant through the approval process.",
    processHighlights: [
      { label: "Application types",  value: "Variance, CUP, Design Review" },
      { label: "Coordination",       value: "Planning staff direct" },
      { label: "Deliverable",        value: "Hearing-ready package" },
    ],
    steps: [
      { title: "Zoning and Jurisdiction Research", description: "We review the applicable zoning classification, overlay districts, entitlement thresholds, and any specific standards that apply to the project site and use." },
      { title: "Application Package Preparation",  description: "Required drawings, forms, written project narrative, and any exhibits are assembled in the format required by the planning department." },
      { title: "Planning Staff Coordination",      description: "We respond to comments from planning staff during the application review period and prepare any supplemental materials requested before the hearing." },
      { title: "Hearing Support",                  description: "Presentation materials, boards, and supporting documentation are prepared for the planning commission or design review board hearing." },
    ],
    includes: [
      { title: "Zoning Analysis Memo",         description: "Written analysis of applicable zoning requirements, conforming and non-conforming conditions, and the basis for the entitlement request." },
      { title: "Application Drawings",         description: "Site plan, elevations, and context exhibits formatted to planning department requirements." },
      { title: "Written Project Narrative",    description: "Formal narrative describing the project, the entitlement basis, and the findings required for approval." },
      { title: "Supplemental Forms",           description: "All required application forms, fee calculations, and checklist items for the specific entitlement type." },
      { title: "Hearing Presentation Package", description: "Formatted boards, exhibits, and presentation materials for planning commission or board review." },
    ],
    audience: [
      { title: "Real Estate Developers",        description: "Pursuing projects that require planning approval before a building permit can be issued." },
      { title: "Property Owners",               description: "Seeking variances for additions, setback exceptions, or use changes on their property." },
      { title: "Mixed-Use and Commercial Teams", description: "Navigating conditional use permit processes for new uses or intensifications." },
      { title: "Hospitality and Retail Operators", description: "Opening new locations that require discretionary planning approval." },
    ],
    whyItMatters:
      "Entitlement outcomes are heavily influenced by the quality of the application package. A well-organized, clearly written submission that directly addresses the required findings gives the planning commission what it needs to approve the project. A poorly organized application creates questions and objections that could have been avoided.",
    relatedSlugs: ["pre-application-meeting-prep", "permit-set-preparation", "code-compliance-review"],
  },

  // ── 11. Pre-Application Meeting Prep ─────────────────────────────────────
  {
    slug:     "pre-application-meeting-prep",
    title:    "Pre-Application Meeting Prep",
    category: "Permitting",
    layout:   "process",
    tagline:  "Organized project documentation for productive pre-application meetings.",
    overview:
      "A pre-application meeting with the building department or planning staff is the most effective way to understand the specific requirements and potential obstacles for a project before submitting. We prepare the complete pre-application package: project description, preliminary drawings, code analysis, and a structured set of questions designed to extract actionable guidance from the meeting.",
    processHighlights: [
      { label: "Preparation time",  value: "3-5 days" },
      { label: "Output",            value: "Complete meeting package" },
      { label: "Follow-up",        value: "Meeting notes support" },
    ],
    steps: [
      { title: "Project and Jurisdiction Research", description: "We gather jurisdiction-specific requirements, applicable codes, zoning classification, known local plan check standards, and any relevant precedents for the project type." },
      { title: "Preliminary Documentation",        description: "Schematic drawings, project description, site data, and any preliminary design information are organized into a clear, professional package." },
      { title: "Question Development",             description: "A structured set of specific technical questions is developed to direct the meeting toward the most important unknowns: code interpretation, submittal requirements, and known objections." },
      { title: "Meeting and Follow-Up",            description: "We prepare meeting notes templates and are available to assist with follow-up documentation or next steps based on the guidance received." },
    ],
    includes: [
      { title: "Project Description Summary",     description: "Clear written summary of the project scope, site conditions, and specific questions for the jurisdiction." },
      { title: "Preliminary Drawing Set",         description: "Schematic site plan, floor plan, and elevations sufficient to illustrate the project scope." },
      { title: "Code and Zoning Analysis",        description: "Summary of applicable codes, zoning requirements, and potential compliance questions." },
      { title: "Structured Question List",        description: "Organized set of specific technical questions designed to maximize useful guidance from the meeting." },
      { title: "Meeting Notes Template",          description: "Pre-formatted documentation template for recording guidance received at the meeting." },
    ],
    audience: [
      { title: "Property Owners",       description: "Initiating complex or unfamiliar project types where early jurisdiction guidance would reduce risk." },
      { title: "Architects",            description: "Working in a new jurisdiction or on a project type with uncertain code path." },
      { title: "Developers",            description: "Assessing feasibility before committing to full design and permit set production." },
      { title: "Contractors",           description: "Preparing for ground-up permits in unfamiliar jurisdictions or for unusual use types." },
    ],
    whyItMatters:
      "A well-prepared pre-application meeting can eliminate an entire correction cycle by surfacing the building department's specific requirements before the permit set is built. The guidance received at a pre-application meeting is worth far more than the preparation cost.",
    relatedSlugs: ["entitlement-support", "permit-set-preparation", "code-compliance-review"],
  },

  // ── 12. MEP Coordination ──────────────────────────────────────────────────
  {
    slug:     "mep-coordination",
    title:    "MEP Coordination",
    category: "Coordination",
    layout:   "technical",
    tagline:  "Mechanical, electrical, and plumbing coordination for complete permit sets.",
    overview:
      "On commercial and multi-family projects, the mechanical, electrical, and plumbing engineering drawings must be coordinated with the architectural set before submission. Conflicts discovered during plan check or in the field are expensive. We review MEP drawings against architectural sheets, identify conflicts, and produce a fully coordinated package in direct communication with the responsible engineers.",
    disciplines: ["HVAC and Mechanical", "Electrical Distribution", "Plumbing Systems", "Fire Sprinkler Coordination", "Life Safety Systems", "Ceiling and Structural Clearance"],
    includes: [
      { title: "Discipline-by-Discipline Review",         description: "Systematic review of each MEP discipline against the architectural set, identifying spatial conflicts, reference inconsistencies, and coordination gaps." },
      { title: "Conflict Log",                            description: "Documented record of all identified conflicts with resolution status, responsible party, and revision required." },
      { title: "Updated Architectural Sheets",            description: "Revised architectural sheets incorporating MEP references, ceiling coordination, and confirmed clearances." },
      { title: "Ceiling and Structural Coordination",     description: "Verified coordination between MEP routing, structural members, and ceiling heights throughout the project." },
      { title: "Combined Permit Package Assembly",        description: "Final coordinated architectural and MEP set assembled and organized for joint permit submission." },
    ],
    audience: [
      { title: "Architects",               description: "Coordinating multi-discipline project teams where MEP conflicts must be resolved before submission." },
      { title: "Commercial Contractors",   description: "Building tenant improvements, restaurants, or commercial projects with complex MEP requirements." },
      { title: "Real Estate Developers",   description: "Running projects with multiple engineering consultants who need a single coordination point." },
      { title: "Restaurant and Hospitality Operators", description: "With complex kitchen exhaust, plumbing, and electrical requirements that require tight architectural coordination." },
    ],
    whyItMatters:
      "MEP conflicts discovered at plan check require the architect and multiple engineers to issue corrections simultaneously, compounding the delay. Conflicts discovered in the field are far worse. Pre-submission MEP coordination is the most reliable way to prevent both.",
    relatedSlugs: ["structural-coordination", "architectural-drafting", "tenant-improvement-packages"],
  },

  // ── 13. Tenant Improvement Packages ──────────────────────────────────────
  {
    slug:     "tenant-improvement-packages",
    title:    "Tenant Improvement Packages",
    category: "Permitting",
    layout:   "package",
    tagline:  "Complete permit documentation for commercial tenant improvements.",
    overview:
      "Tenant improvement projects require a complete permit package covering the existing conditions, the proposed layout, compliance with accessibility and life safety requirements, and coordination with base building systems. We produce the full TI permit set from scratch or from existing as-built drawings, built to the jurisdiction and building department requirements for the specific building and use.",
    includes: [
      { title: "Existing Conditions Plan",           description: "Measured or verified existing floor plan showing current layout, walls, openings, and ceiling conditions." },
      { title: "Proposed Floor Plan",                description: "Complete proposed layout with all new partitions, doors, fixtures, and finish areas dimensioned and noted." },
      { title: "Reflected Ceiling Plan",             description: "Ceiling layout showing light fixtures, diffusers, sprinkler heads, exit signs, and any ceiling height changes." },
      { title: "Accessibility Path of Travel Analysis", description: "Code-required analysis of the accessible path of travel to and within the tenant space, with required upgrades noted." },
      { title: "Egress Plan",                        description: "Egress layout confirming travel distances, exit widths, and occupant load compliance." },
      { title: "Finish and Material Schedule",       description: "Interior finish schedule including flooring, wall finish, and ceiling materials with flame spread classifications where required." },
    ],
    faqs: [
      { question: "What building uses do you handle?", answer: "Retail, office, medical office, restaurant, salon, light industrial, and mixed-use. If your use type is not listed, contact us to confirm we can support it." },
      { question: "Do I need as-built drawings first?", answer: "Not always. If no reliable as-built documentation is available, we can perform field measurement as part of the TI engagement before producing the permit set." },
      { question: "How do accessibility requirements apply to TI projects?", answer: "Most TI projects trigger path of travel accessibility requirements for the portion of the building affected by the work. We include this analysis in every TI package as a standard deliverable." },
      { question: "Can you coordinate with the building's MEP engineers?", answer: "Yes. If the TI requires mechanical, electrical, or plumbing engineering, we coordinate the architectural set with the MEP drawings before submission." },
    ],
    audience: [
      { title: "Commercial Tenants",     description: "Buildout of a new leased space for retail, office, or food service use." },
      { title: "Landlords and Owners",   description: "Preparing base building improvements or tenant-ready spaces for lease." },
      { title: "Contractors",            description: "Bidding or building TI projects who need a complete permit package." },
      { title: "Restaurant Operators",   description: "Opening or renovating restaurant spaces requiring full MEP and kitchen coordination." },
    ],
    whyItMatters:
      "Tenant improvement permits are among the most commonly delayed project types due to incomplete accessibility analysis and missing base building coordination. A permit-ready TI set addresses both before submission.",
    relatedSlugs: ["as-built-documentation", "mep-coordination", "code-compliance-review"],
  },

  // ── 14. Digital Walkthroughs ──────────────────────────────────────────────
  {
    slug:         "digital-walkthroughs",
    title:        "Digital Walkthroughs",
    category:     "Visualization",
    layout:       "visual",
    tagline:      "Interactive 3D walkthroughs for approvals, presentations, and pre-construction sales.",
    overview:
      "Digital walkthroughs let stakeholders move through a proposed building or space before a single wall is built. We produce navigable 3D walkthroughs from architectural drawings, giving clients, investors, review boards, and approval authorities a first-person understanding of the project from the inside. Walkthroughs are delivered as interactive web links or video tours accessible from any device.",
    useCases: [
      "Investor and lender presentations",
      "Design review board submissions",
      "Client design approval",
      "Pre-construction leasing and sales",
      "Planning commission hearings",
      "Marketing and promotional materials",
    ],
    outputFormats: [
      "Interactive web walkthrough",
      "MP4 video tour",
      "Still frame exports",
      "VR-compatible output (on request)",
    ],
    includes: [
      { title: "Full Interior Walkthrough",     description: "Navigable interior tour covering all primary spaces, including material, finish, and lighting representation." },
      { title: "Exterior Approach Sequence",    description: "Exterior walkthrough showing the building approach, entry sequence, and relationship to the site." },
      { title: "Material and Finish Study",     description: "Accurate representation of specified materials, finishes, and lighting conditions throughout the walkthrough." },
      { title: "Hosted Interactive Link",       description: "Web-hosted interactive version accessible from desktop and mobile without additional software." },
      { title: "Video Tour Export",             description: "Produced MP4 walkthrough video suitable for presentations, screensharing, and embedding." },
      { title: "Revision Round",                description: "One revision round included to address material changes, layout adjustments, or presentation feedback." },
    ],
    audience: [
      { title: "Real Estate Developers",    description: "Presenting projects to investors, lenders, or approval authorities before construction begins." },
      { title: "Architects",               description: "Communicating design intent to clients or review boards in a format more accessible than plan drawings." },
      { title: "Leasing Teams",            description: "Showing prospective tenants the finished space before construction is complete." },
      { title: "Hospitality and Retail",   description: "Presenting design concepts to franchise approvers, brand partners, or investors." },
    ],
    whyItMatters:
      "Decision-makers who cannot read architectural drawings still make approval decisions. A digital walkthrough removes the abstraction barrier and gives non-technical stakeholders a clear, confident understanding of what is being proposed. Approvals move faster when the project is easy to understand.",
    relatedSlugs: ["renderings-visualization", "3d-staging", "entitlement-support"],
  },

  // ── 15. 3D Staging ────────────────────────────────────────────────────────
  {
    slug:         "3d-staging",
    title:        "3D Staging",
    category:     "Visualization",
    layout:       "visual",
    tagline:      "Photorealistic 3D staging for vacant spaces, new construction, and remodels.",
    overview:
      "3D staging replaces empty rooms and bare spaces with photorealistic furnishings, finishes, and lighting. We produce staged visualizations from architectural drawings or site photographs, showing the property exactly as it would appear fully finished and furnished. Outputs are used for listing photography, investor presentations, pre-construction marketing, and design presentations.",
    useCases: [
      "Real estate listing photography",
      "New construction pre-sales",
      "Renovation client presentations",
      "Hospitality and hotel design concepts",
      "Investor and developer decks",
      "Interior design concept approvals",
    ],
    outputFormats: [
      "High-resolution JPEG renders",
      "Print-ready files",
      "Web-optimized formats",
      "Multiple view angles per room",
    ],
    includes: [
      { title: "Room-by-Room Staging",     description: "Photorealistic furnishing and styling of each space with furniture, finishes, and accessories selected to complement the project type and target audience." },
      { title: "Lighting Setup",           description: "Natural and artificial lighting configured to reflect the time of day, orientation, and planned light fixture types for the space." },
      { title: "Multiple View Angles",     description: "Two or more camera angles per room, selected to show the space to its best advantage." },
      { title: "High-Resolution Delivery", description: "Files delivered at print and web resolution, suitable for listing platforms, presentations, and marketing materials." },
      { title: "Revision Round",           description: "One revision round included to adjust furniture selections, finishes, or composition based on client feedback." },
    ],
    audience: [
      { title: "Real Estate Agents and Brokers", description: "Listing vacant or under-construction properties with professional staged photography." },
      { title: "Property Developers",            description: "Pre-selling units before construction is complete using photorealistic staged imagery." },
      { title: "Interior Designers",             description: "Presenting design concepts to clients in a finished, photorealistic format before purchasing begins." },
      { title: "Hotel and Hospitality Operators", description: "Visualizing room types, lobbies, and F&B spaces for brand approval or pre-opening marketing." },
    ],
    whyItMatters:
      "Empty spaces are hard to sell. Professionally staged 3D imagery lets buyers, tenants, and investors see the property as a finished, lived-in space rather than as a construction site or vacant shell. The quality of the imagery directly affects the speed and price of the transaction.",
    relatedSlugs: ["renderings-visualization", "digital-walkthroughs", "architectural-drafting"],
  },

  // ── 16. Project Strategy ────────────────────────────────────────────────────
  {
    slug:     "project-strategy",
    title:    "Project Strategy",
    category: "Strategy",
    layout:   "strategy",
    tagline:  "A complete project roadmap from raw idea to build-ready documentation.",
    overview:
      "Project Strategy is a structured advisory engagement that takes your project from concept to a fully defined, actionable roadmap. We analyze your site, goals, and constraints, map the full permit and approval pathway, identify every consultant you will need and when, and deliver a written roadmap that drives all downstream work. The output is clarity: you know exactly what the project requires, in what order, and what each phase will demand before you commit a dollar to production.",
    steps: [
      {
        title: "Concept and Goals Review",
        description: "We start with your idea: what you want to build, on what site, and why. We document the project program, establish your constraints (budget, timeline, use), and identify the critical unknowns that need to be resolved before design can begin.",
      },
      {
        title: "Site and Zoning Analysis",
        description: "A full review of your site against the applicable zoning ordinance: permitted use, setbacks, lot coverage, FAR, height limits, overlay districts, and any deed restrictions or easements that affect buildability. We produce a written site analysis document.",
      },
      {
        title: "Permit Pathway Mapping",
        description: "We map every approval your project will require: building department, planning, fire, utilities, and any discretionary reviews such as design review, variance, or conditional use. Each checkpoint is documented with its typical timeline, required submissions, and risk factors.",
      },
      {
        title: "Consultant Identification",
        description: "We identify every consultant your project will require (structural, MEP, civil, soils, energy, accessibility) and build a coordination matrix that sequences their involvement correctly, preventing the expensive mistake of bringing in consultants out of order.",
      },
      {
        title: "Phased Scope Definition",
        description: "We break the project into clearly defined phases: pre-design, schematic, permit set, plan check, and construction. Each phase is assigned a scope, deliverable list, responsible party, and decision point. Nothing is vague or left to assumption.",
      },
      {
        title: "Roadmap Delivery and Briefing",
        description: "The complete Project Strategy document is delivered as a written report. We walk you through every section in a dedicated briefing call, answer questions, and confirm next steps. The roadmap becomes the governing document for your entire project.",
      },
    ],
    processHighlights: [
      { label: "Phases Covered", value: "6" },
      { label: "Delivery Format", value: "Written Report" },
      { label: "Briefing Call", value: "Included" },
      { label: "Jurisdiction Research", value: "Included" },
    ],
    includes: [
      { title: "Site and Zoning Analysis Report",    description: "Written analysis of your site against current zoning, including permitted uses, setbacks, FAR, height limits, overlay districts, and any known restrictions." },
      { title: "Permit Pathway Map",                 description: "A complete map of every approval required for your project, with estimated timelines, submission requirements, and flagged risk factors for each checkpoint." },
      { title: "Consultant Coordination Matrix",     description: "A structured matrix identifying all required consultants, their scope of work, sequencing, and handoff points." },
      { title: "Phased Project Roadmap",             description: "A phase-by-phase breakdown of your project from pre-design through permit-ready, with scope, deliverables, and decision points defined for each phase." },
      { title: "Strategy Briefing Call",             description: "A dedicated video call to walk through the complete roadmap, answer questions, and confirm next steps and priorities." },
      { title: "30-Day Follow-Up Support",           description: "Email support for 30 days following delivery to answer questions as your project moves from strategy into active design and permitting." },
    ],
    audience: [
      { title: "First-Time Developers",        description: "Who have a site and an idea but no clear picture of what the project will actually require to permit and build." },
      { title: "Property Owners",              description: "Planning an addition, ADU, or new construction and want a clear action plan before engaging architects or contractors." },
      { title: "Investors Evaluating a Site",  description: "Who need to understand a site's development potential, permit complexity, and timeline before committing to acquisition." },
      { title: "Small Developers",             description: "Managing multiple consultants across several projects who need a structured coordination framework for each project from day one." },
    ],
    faqs: [
      {
        question: "Is this the same as a feasibility study?",
        answer: "A feasibility study typically answers one question: can this project be built? Project Strategy goes further. It defines the full roadmap for how to build it: consultants, sequencing, permit pathway, phased scope, and decision points from start to permit-ready.",
      },
      {
        question: "Do I need this before starting design?",
        answer: "Yes, in most cases. Design that begins without a defined permit pathway and consultant plan frequently has to backtrack when previously unknown requirements surface. The cost of a strategy engagement is small compared to rework.",
      },
      {
        question: "What if my project changes after the strategy is delivered?",
        answer: "The roadmap is a living document. If your scope changes materially, we can update the strategy document. Minor changes (adjustments to program or phasing) are usually covered under 30-day follow-up support.",
      },
      {
        question: "Can CADTRI execute the work defined in the strategy?",
        answer: "Yes. Most clients who engage us for Project Strategy continue with CADTRI for permit set preparation, drafting, coordination, and response services. The strategy gives us a shared understanding of your project from the start.",
      },
    ],
    whyItMatters:
      "Most project delays and cost overruns do not come from bad design. They come from a project that was never properly planned. Missing consultant coordination, a permit pathway that was never mapped, approvals that were discovered too late. These are strategic failures, not technical ones. A defined project strategy removes ambiguity before it becomes expensive.",
    relatedSlugs: ["permit-set-preparation", "pre-application-meeting-prep", "entitlement-support"],
  },


  // ── 17. Feasibility Study ─────────────────────────────────────────────────
  {
    slug:     "feasibility-study",
    title:    "Feasibility Study",
    category: "Strategy",
    layout:   "feasibility",
    tagline:  "A written site analysis that answers one question before you commit: can this project be built?",
    overview:
      "A Feasibility Study is a structured site analysis that evaluates your property against current zoning, code requirements, and permit pathway realities before any design work begins. We examine six analysis areas: zoning compliance, setbacks, FAR and lot coverage, permitted use, overlay districts, and permit risk factors. We deliver a written report with a clear summary of what the site can support, what requires a variance or discretionary approval, and what the highest-risk permit checkpoints are.",
    steps: [
      { title: "Zoning Classification and Permitted Use",  description: "We identify the current zoning designation for your parcel and confirm what uses are permitted by right, permitted with conditions, and prohibited. Mixed-use, overlay, and transitional zones are examined in full." },
      { title: "Setbacks and Lot Coverage",               description: "Front, rear, and side yard setbacks, maximum lot coverage percentages, and impervious surface limits are pulled from the applicable zoning ordinance and checked against your site dimensions and proposed footprint." },
      { title: "Floor Area Ratio and Density",            description: "FAR limits, maximum allowable gross floor area, unit density restrictions, and bonus density provisions are calculated and presented against your project program." },
      { title: "Overlay Districts and Special Conditions", description: "We identify all overlay zones that affect your parcel: flood zones, historic districts, fire hazard severity zones, hillside overlays, and view corridors. We document the additional requirements each imposes." },
      { title: "Permit Pathway Classification",           description: "We classify the permit pathway for your project: ministerial (over-the-counter), discretionary (requires planning approval), or hybrid. Discretionary permits add 3–18 months to timelines and require separate analysis." },
      { title: "Risk Factor Summary",                     description: "We document the highest-risk items for your project: code ambiguities, known plan check triggers, non-conforming conditions, and any site factors that are likely to require a variance or exception." },
    ],
    processHighlights: [
      { label: "Analysis Areas",    value: "6" },
      { label: "Delivery",          value: "3–5 Days" },
      { label: "Format",            value: "Written Report" },
      { label: "All Jurisdictions", value: "Covered" },
    ],
    includes: [
      { title: "Site and Zoning Analysis Report", description: "Comprehensive written analysis covering all six examination areas, formatted as a professional document with section-by-section findings and a summary conclusion." },
      { title: "Permit Pathway Classification",   description: "Clear classification of your project's permit pathway (ministerial, discretionary, or hybrid) with a plain-language explanation of what each classification means for your timeline and budget." },
      { title: "Risk Summary",                    description: "A prioritized list of risk factors specific to your site and proposed scope, with recommended mitigation strategies for each." },
      { title: "Recommended Next Steps",          description: "A clear action plan following the report: what to proceed with, what to resolve first, and what questions to bring to a pre-application meeting or planning counter." },
      { title: "30-Day Follow-Up Support",        description: "Email support for 30 days to answer questions as you move from feasibility findings into active design or consultant engagement." },
    ],
    audience: [
      { title: "Site Purchasers",           description: "Evaluating a property before closing and need to know what the site can realistically support before committing." },
      { title: "Property Owners",           description: "Planning a project and want to understand the permit complexity and risk factors before engaging architects or contractors." },
      { title: "Investors and Developers",  description: "Screening multiple sites for development potential and need a consistent, written feasibility baseline for each." },
      { title: "First-Time Builders",       description: "Unfamiliar with zoning and permit requirements and want a clear, factual picture of what their project will require." },
    ],
    faqs: [
      { question: "How is this different from a zoning report?",           answer: "A zoning report pulls the ordinance data. A Feasibility Study interprets it against your specific project. We tell you not just what the code says but what it means for your project, where the risks are, and what the realistic permit path looks like." },
      { question: "Does this guarantee my project will be approved?",      answer: "No feasibility analysis can guarantee permit approval. What we can do is give you an accurate picture of the obstacles and risks before you spend money on design. Most projects that fail at plan check ran into conditions that were identifiable at the feasibility stage." },
      { question: "Can I use this report in a pre-application meeting?",   answer: "Yes. Our feasibility reports are written to support pre-application meetings. The permit pathway classification and risk summary sections are specifically formatted for that use." },
      { question: "What do you need from me to start?",                   answer: "The parcel number or address, the applicable jurisdiction, and a brief description of what you want to build. We handle the ordinance research from there." },
    ],
    whyItMatters:
      "Most site acquisition mistakes and permit failures share a common thread: the zoning and code realities of the site were not analyzed before money was spent on design. A feasibility study costs a fraction of one round of design revisions. It is the least expensive risk-reduction tool in the development process.",
    relatedSlugs: ["project-strategy", "pre-application-meeting-prep", "permit-set-preparation"],
  },

  // ── 18. Home Addition Packages ────────────────────────────────────────────
  {
    slug:     "home-addition-packages",
    title:    "Home Addition Packages",
    category: "Permitting",
    layout:   "addition",
    tagline:  "Complete permit-ready drawing packages for residential additions: room additions, second stories, and covered expansions.",
    overview:
      "Home Addition Packages cover the full scope of permit documentation for residential expansions: room additions, second-story additions, covered patios, sunrooms, and attached garage additions. We produce complete permit sets tailored to the specific addition type, jurisdiction requirements, and existing structure conditions. Every package is designed to clear plan check on the first submission.",
    useCases: [
      "Single Room Addition",
      "Second Story Addition",
      "Master Suite Addition",
      "Covered Patio / Outdoor Room",
      "Sunroom or Enclosed Porch",
      "Attached Garage Addition",
      "In-Law Suite Addition",
      "Kitchen or Dining Expansion",
    ],
    steps: [
      { title: "Existing Conditions Documentation", description: "We establish the existing structure on record (floor plan, elevations, and site conditions) as the baseline from which the addition is drawn. Accuracy here prevents corrections during plan check." },
      { title: "Addition Design Drafting",          description: "The proposed addition is drawn in full, coordinated against the existing structure: new floor plans, exterior elevations, building sections, and all required detail drawings." },
      { title: "Code and Zoning Compliance",        description: "The addition is reviewed against setback requirements, lot coverage limits, FAR, height restrictions, and all applicable building code requirements including egress, structural, and energy compliance." },
      { title: "Permit Set Assembly",               description: "All sheets are compiled into a jurisdiction-specific submission package, formatted to the building department's requirements, with a complete title sheet, code summary, and sheet index." },
    ],
    processHighlights: [
      { label: "Addition Types",       value: "8+" },
      { label: "Turnaround",           value: "7–12 Days" },
      { label: "First-Pass Approval",  value: "Target" },
      { label: "Jurisdictions",        value: "All US" },
    ],
    includes: [
      { title: "Existing Conditions Floor Plan", description: "Measured plan of the existing structure showing all dimensions, wall locations, openings, and conditions relevant to the proposed addition scope." },
      { title: "Proposed Addition Floor Plan",   description: "Complete dimensioned plan of the addition with all new construction shown in context with the existing structure." },
      { title: "Exterior Elevations",            description: "All affected building elevations showing the addition in context with the existing structure, with heights, materials, and openings called out." },
      { title: "Building Section",               description: "Cross-section through the addition showing structural assembly, ceiling heights, insulation locations, and floor-to-floor dimensions." },
      { title: "Site Plan",                      description: "Site plan showing the addition footprint against property lines, with all required setback dimensions and updated lot coverage calculation." },
      { title: "Title Sheet and Code Summary",   description: "Project identification, scope description, applicable codes, and all regulatory summary information required by the jurisdiction." },
    ],
    audience: [
      { title: "Homeowners",           description: "Adding living space to an existing home and need permit documentation to proceed with construction." },
      { title: "General Contractors",  description: "Who need a complete permit set for a client's addition project before pulling the building permit." },
      { title: "Design-Build Firms",   description: "Who need a production drafting partner to deliver permit sets on client addition projects." },
      { title: "Real Estate Investors", description: "Adding square footage to increase property value and need a code-compliant permit set for the work." },
    ],
    faqs: [
      { question: "Do you handle additions that require structural engineering?", answer: "Yes. We coordinate with the structural engineer of record. Our structural coordination service handles the integration of structural drawings into the permit set. We manage the coordination so you have one submission-ready package." },
      { question: "What if the existing structure isn't in the city's records?",  answer: "We work from your provided measurements, site photos, or an existing conditions survey. We document on the title sheet that existing conditions are based on field measurement. Most jurisdictions accept this for additions under a certain size threshold." },
      { question: "Can you match the existing architecture?",                     answer: "Yes. We draw the addition to match or complement the existing structure's architectural style, materials, and proportions as documented in your provided reference." },
      { question: "Do you cover additions in California?",                        answer: "Yes. California additions require Title 24 energy compliance documentation, which is included in our California permit packages." },
    ],
    whyItMatters:
      "Addition permits are rejected more often than new construction permits because the existing structure introduces variables that make compliance harder to demonstrate. A package built specifically for the addition type, not a generic template, passes plan check faster.",
    relatedSlugs: ["permit-set-preparation", "garage-conversion-packages", "structural-coordination"],
  },

  // ── 19. Garage Conversion Packages ────────────────────────────────────────
  {
    slug:     "garage-conversion-packages",
    title:    "Garage Conversion Packages",
    category: "Permitting",
    layout:   "conversion",
    tagline:  "Permit documentation for converting attached and detached garages into living space, ADUs, or accessory rooms.",
    overview:
      "Garage conversions require a distinct permit package from new construction ADUs. Converting an existing garage to habitable space means satisfying building code requirements that the original structure was never designed to meet: insulation, egress, HVAC, ceiling height, and electrical, while working within fixed structural constraints. Our Garage Conversion Packages produce complete, code-compliant permit sets for attached and detached garage conversions, including full ADU conversions.",
    steps: [
      { title: "Thermal Envelope Upgrade",    description: "Garage walls and the roof/ceiling assembly must meet residential energy code requirements. We document the proposed insulation assembly (type, R-value, and installation method) and confirm compliance with the applicable energy code." },
      { title: "Egress Requirements",         description: "Habitable rooms require emergency egress openings of minimum dimensions. We design the egress window or door configuration into the conversion and confirm compliance with net clear opening dimensions and height-above-floor requirements." },
      { title: "Mechanical and HVAC",         description: "Garages are not conditioned space. The conversion must show a code-compliant HVAC design extending the home's existing system or installing independent equipment. We document the HVAC configuration on the plans." },
      { title: "Electrical and Lighting",     description: "Residential electrical requirements differ from garage requirements: outlet spacing, GFCI locations, lighting, and service capacity. We coordinate the electrical layout with the plans." },
      { title: "Ceiling Height Verification", description: "Habitable space requires minimum ceiling height. Many garages meet this requirement; some do not. We verify and document the finished ceiling height against code minimums early to prevent surprises at inspection." },
      { title: "Structural Conditions",       description: "Garage slab thickness, foundation perimeter, and any altered framing must be documented. For conversions that close the garage door opening, the new infill wall is drawn and detailed." },
    ],
    processHighlights: [
      { label: "Turnaround",            value: "5–10 Days" },
      { label: "Attached and Detached", value: "Both" },
      { label: "ADU Conversion",        value: "Included" },
      { label: "Code Areas",            value: "6 Covered" },
    ],
    includes: [
      { title: "Existing Conditions Plan",          description: "As-built floor plan of the existing garage showing current dimensions, structural elements, door openings, and utility locations." },
      { title: "Proposed Conversion Floor Plan",    description: "Complete floor plan of the converted space showing new walls, windows, doors, and room layout with all dimensions." },
      { title: "Exterior Elevations",               description: "Elevations showing all changes to the exterior: garage door infill, new window and door locations, finish materials." },
      { title: "Building Section",                  description: "Section through the converted space showing ceiling assembly, insulation locations, structural conditions, and floor-to-floor heights." },
      { title: "Energy Compliance Documentation",   description: "Title 24 (California) or equivalent energy compliance forms demonstrating that the thermal envelope upgrade meets the applicable residential energy code." },
      { title: "Site Plan Update",                  description: "Updated site plan reflecting the conversion and, if applicable, confirming ADU compliance with setback and coverage requirements." },
    ],
    audience: [
      { title: "Homeowners",           description: "Converting a garage to a bedroom, office, studio, or full ADU and need permit documentation for the work." },
      { title: "ADU Developers",       description: "Acquiring properties with convertible garages and need consistent, fast-turnaround permit packages." },
      { title: "General Contractors",  description: "Building garage conversion projects for clients and need the permit set ready before pulling the permit." },
      { title: "Real Estate Investors", description: "Adding a rentable ADU through garage conversion to increase property income and value." },
    ],
    faqs: [
      { question: "Is a garage conversion cheaper to permit than building a new ADU?",       answer: "Typically yes. The structure already exists, so the drawing scope is smaller and the review focus is narrower. The tradeoff is that you are working within fixed structural and dimensional constraints." },
      { question: "Can a detached garage be converted to a full ADU?",                       answer: "Yes, in most jurisdictions. California SB 9 and subsequent ADU legislation have significantly expanded conversion rights. Setback requirements for detached conversions are typically more permissive than for new ADU construction. We verify your specific jurisdiction at intake." },
      { question: "What if the garage ceiling is too low?",                                  answer: "Minimum habitable ceiling height is typically 7 feet. If the existing ceiling is below this, options include raising the roof, accepting the limitation (if allowed under specific conversion provisions), or using the space as a non-habitable accessory room. We document the existing height early and advise on options." },
      { question: "Do I need to replace the garage slab?",                                   answer: "Usually no. Most garage slabs can serve as the finished floor for a converted space. We verify the slab elevation against the adjacent grade to confirm there are no drainage concerns, which is the most common slab-related plan check item." },
      { question: "Can you handle the ADU compliance requirements specifically?",            answer: "Yes. ADU conversions require specific documentation: setback confirmation, owner-occupancy declarations in some jurisdictions, utility separation requirements, and rental restriction recordation in some cases. Our packages include all required ADU documentation." },
    ],
    whyItMatters:
      "Garage conversions fail plan check because the code requirements that convert a non-habitable structure to a habitable one are more numerous and more specific than most people expect. A permit set built around the conversion code path, not a generic remodel template, is what moves through plan check.",
    relatedSlugs: ["adu-permit-packages", "home-addition-packages", "permit-set-preparation"],
  },

  // ── 20. Construction Administration Support ───────────────────────────────
  {
    slug:     "construction-administration",
    title:    "Construction Administration Support",
    category: "Coordination",
    layout:   "admin",
    tagline:  "Ongoing drawing support through construction: RFIs, submittals, field sketches, and plan revisions on demand.",
    overview:
      "Construction Administration Support keeps your project moving from permit approval through final inspection. Once a building permit is issued, field conditions, contractor questions, and inspector requests generate a steady stream of documentation needs: RFI responses, submittal drawings, field sketches, and plan revisions. We provide fast, professionally formatted responses so the job site never waits on drawings.",
    disciplines: ["RFI Responses", "Submittal Review Support", "Field Sketch Drawings", "Plan Revision Packages", "Change Order Documentation", "Inspector Response Drawings"],
    steps: [
      { title: "Retainer Engagement",   description: "Most CA clients engage on a monthly retainer that covers a defined number of drawing hours per month. Retainer engagements have priority response times and predictable monthly cost." },
      { title: "Per-Request Engagement", description: "For projects with variable CA needs, we work on a per-request basis. Requests are submitted with a scope description; we confirm scope, turnaround, and fee before starting." },
      { title: "Request Intake",        description: "Each request is submitted with the RFI or field question, reference drawings, and any field photos. We confirm the request scope and turnaround time at intake." },
      { title: "Drawing Delivery",      description: "Responses are delivered as stamped, formatted drawing files ready for the RFI log, submittal package, or inspector review. All files are tracked and logged by request number." },
    ],
    processHighlights: [
      { label: "Response Time",       value: "24–48 hrs" },
      { label: "Retainer Available",  value: "Yes" },
      { label: "Request Types",       value: "6" },
      { label: "Format",              value: "Job-Ready Files" },
    ],
    includes: [
      { title: "RFI Response Drawings",      description: "Formatted drawing responses to contractor RFIs (plans, details, or sections) ready to attach to the RFI log and distribute to the field." },
      { title: "Submittal Drawing Support",  description: "Drawing documentation in support of contractor submittals: shop drawing coordination, equipment rough-in confirmation, and dimension verification." },
      { title: "Field Sketch Production",    description: "Fast-turnaround field sketches for conditions discovered during construction that require a drawing resolution before work can continue." },
      { title: "Plan Revision Packages",     description: "Formally revised plan sheets addressing scope changes, inspector corrections, or field-verified conditions, ready for building department re-submission if required." },
      { title: "Change Order Documentation", description: "Drawing documentation for change orders (revised scope, added work, or deleted work) formatted for the project record and, if required, for permit revision." },
      { title: "Request Log and Tracking",   description: "All CA requests are logged by number, date, scope, and status. A running log is maintained and available for project record review at any time." },
    ],
    audience: [
      { title: "General Contractors",  description: "Who need a reliable drawing resource available through construction to respond to field conditions and RFIs without waiting on the original design team." },
      { title: "Project Managers",     description: "Managing complex projects with active submittals and RFI logs who need fast, professional drawing responses." },
      { title: "Design-Build Teams",   description: "Who need production drawing support through the construction phase without carrying internal drafting staff." },
      { title: "Property Owners",      description: "Owner-builders managing their own construction who need drawing support when field conditions don't match the permit plans." },
    ],
    faqs: [
      { question: "Does CA support replace the engineer of record?",        answer: "No. We handle drawing production and documentation. Structural, geotechnical, or life-safety questions that require a licensed engineer of record remain with the EOR. We coordinate with the EOR where needed and document the coordination." },
      { question: "What is the typical retainer structure?",                answer: "Retainers are scoped by drawing hours per month. A typical active construction project requires 4–8 hours of CA drawing support per month. We size the retainer to your project's expected volume at the start of construction." },
      { question: "How do I submit a request?",                             answer: "By email with the RFI number or field description, reference drawing sheets, and any relevant field photos. We confirm scope and turnaround within 4 business hours." },
      { question: "What if my project has a fast-track schedule?",          answer: "Fast-track projects are accommodated with priority scheduling. We confirm availability at the start of the engagement and flag any periods where capacity may be limited." },
    ],
    whyItMatters:
      "A building permit approval does not end the drawing work on a project. Every field condition, RFI, and inspector question that requires a drawing response is a potential schedule delay if the answer is not delivered fast. CA support keeps the job site moving.",
    relatedSlugs: ["permit-set-preparation", "city-comments-response", "structural-coordination"],
  },

  // ── 21. Contractor Bid Package ────────────────────────────────────────────
  {
    slug:     "contractor-bid-package",
    title:    "Contractor Bid Package",
    category: "Drawings",
    layout:   "bid",
    tagline:  "A complete, bid-ready drawing and specification package that eliminates ambiguity and reduces scope gaps in contractor bids.",
    overview:
      "A Contractor Bid Package is a purpose-built set of documents designed to give bidding contractors everything they need to price the work accurately. Unlike a permit set (which is optimized for code review), a bid package is optimized for contractor comprehension: written scope narratives, specification references, material callouts, quantity summaries, and coordination drawings that remove the guesswork from every trade. The result is tighter bids, fewer scope gaps, and fewer change orders.",
    outputFormats: [
      "Written Scope Narrative",
      "Specification References (CSI Format)",
      "Material and Finish Schedule",
      "Quantity and Area Summary",
      "Bid Drawing Set (Reduced from Permit Set)",
      "Exclusions and Clarifications Log",
    ],
    steps: [
      { title: "Document Review",          description: "We review your existing permit drawings, design intent documents, and any project notes to understand the full scope of work." },
      { title: "Scope Narrative Drafting", description: "A written scope narrative is produced for each major trade division, describing the work required, materials specified, and any specific requirements contractors must acknowledge in their bids." },
      { title: "Drawing Set Preparation",  description: "The permit drawing set is reviewed, reduced where appropriate for bid use, and supplemented with any bid-specific drawings: material callouts, partition types, finish regions, and MEP rough-in dimensions." },
      { title: "Package Assembly and QC",  description: "The complete bid package is assembled, cross-referenced, and QC'd to confirm that the written scope, drawings, and specifications are internally consistent." },
    ],
    processHighlights: [
      { label: "Turnaround",         value: "5–8 Days" },
      { label: "Trade Divisions",    value: "All" },
      { label: "Format",             value: "Print and Digital" },
      { label: "Change Orders Reduced", value: "Target" },
    ],
    includes: [
      { title: "Written Scope Narrative",             description: "Trade-by-trade written description of the work to be performed, materials to be used, and any specific installation or quality requirements." },
      { title: "CSI-Format Specification References", description: "Key specification sections referenced by CSI division, giving contractors a consistent framework for their bids and subcontractor communications." },
      { title: "Material and Finish Schedule",        description: "Comprehensive schedule of all specified materials, finishes, and equipment with manufacturer references, product numbers, and approved substitution criteria." },
      { title: "Bid Drawing Set",                     description: "A complete drawing set prepared for bidding, with dimension callouts, material regions, partition types, and other bid-specific information added to the base drawings." },
      { title: "Quantity and Area Summary",           description: "Calculated quantities and areas for major scope items: floor area by room, linear feet of partition types, and door and window counts, providing a consistent basis for all bidders." },
      { title: "Exclusions and Clarifications Log",   description: "A written log of work specifically excluded from the bid scope, owner-furnished items, and clarifications that address common scope ambiguities before bid submissions are received." },
    ],
    audience: [
      { title: "Property Owners and Developers", description: "Who want competitive, apples-to-apples contractor bids and fewer scope disputes during construction." },
      { title: "Project Managers",               description: "Managing a competitive bid process who need a complete, consistent package that all contractors bid from the same basis." },
      { title: "Design-Build Firms",             description: "Who need bid documentation for subcontractor solicitation on design-build projects." },
      { title: "General Contractors",            description: "Subcontracting major trades and need a consistent, detailed scope package to distribute to sub-bidders." },
    ],
    faqs: [
      { question: "Can you build a bid package from permit drawings only?",               answer: "Yes. Most bid packages start from the permit set. We add the scope narrative, specifications, material schedule, and bid-specific drawing markups to transform a code-review document into a contractor procurement document." },
      { question: "What if specifications haven't been selected yet?",                    answer: "We can include specification placeholders with owner-to-select designations and criteria, or we can recommend specifications based on project type. The bid package can note substitution criteria so contractors can bid with alternates." },
      { question: "Do you cover MEP scope?",                                              answer: "Yes. MEP scope narratives, rough-in drawings, and equipment schedules are included. For projects with complex MEP scope, we coordinate with the MEP engineer of record to confirm bid documentation accuracy." },
      { question: "Can the bid package be used for negotiated contracts as well?",        answer: "Yes. The bid package documentation (scope narrative, specifications, material schedule) serves equally well as the basis for a negotiated contract scope, owner-contractor agreement, or design-build subcontract." },
    ],
    whyItMatters:
      "Incomplete bid documents are the leading cause of change orders. When bidding contractors make scope assumptions because the drawings are ambiguous, those assumptions become disputes during construction. A complete bid package eliminates the ambiguity before the first bid is submitted.",
    relatedSlugs: ["architectural-drafting", "permit-set-preparation", "construction-administration"],
  },


  // ── 22. Pool and Spa Permits ──────────────────────────────────────────────
  {
    slug:     "pool-spa-permits",
    title:    "Pool and Spa Permit Packages",
    category: "Permitting",
    layout:   "outdoor",
    tagline:  "Complete permit documentation for residential and commercial pools, spas, and water features.",
    overview:
      "Pool and spa permit packages cover the full documentation required by building, engineering, and public health departments for new pool and spa construction. We produce site plans, barrier compliance drawings, structural documentation coordination, and all supplemental forms required by the applicable jurisdiction. Our packages are built to the specific submission requirements of California DSA, local building departments, and county health departments where applicable.",
    useCases: [
      "In-ground Swimming Pool",
      "Above-Ground Pool",
      "Residential Spa or Hot Tub",
      "Pool and Spa Combination",
      "Lap Pool",
      "Commercial Pool",
      "Water Feature and Fountain",
      "Pool Barrier and Safety Fence",
    ],
    processHighlights: [
      { label: "Turnaround",        value: "5–8 Days" },
      { label: "Structure Types",   value: "8+" },
      { label: "Barrier Compliance", value: "Included" },
      { label: "Health Dept. Forms", value: "Included" },
    ],
    steps: [
      { title: "Site Conditions Review",      description: "We review the property survey, existing site plan, and any available geotechnical data to establish the pool location, setbacks, and drainage conditions relevant to the permit." },
      { title: "Pool Layout and Site Plan",   description: "A permit-ready site plan is drawn showing the pool shell dimensions, water surface area, setbacks from property lines and structures, decking, equipment location, and utility connections." },
      { title: "Barrier Compliance Drawing",  description: "California and most jurisdictions require a pool barrier drawing showing the entire perimeter, gate locations, latch hardware specifications, and compliance with applicable barrier code requirements." },
      { title: "Package Assembly",            description: "All drawings and supplemental forms (health department applications, energy compliance forms, and structural notes) are assembled into a jurisdiction-specific submission package." },
    ],
    includes: [
      { title: "Site Plan with Pool Layout",    description: "Dimensioned site plan showing the pool shell, deck, equipment pad, setbacks, and any applicable easements. Drawn to the specific format required by the building department." },
      { title: "Pool Barrier and Safety Drawing", description: "Complete barrier compliance drawing showing the enclosure perimeter, gate hardware, latch specifications, and clearance dimensions required by applicable code." },
      { title: "Equipment and Utility Notation", description: "Pool equipment location, electrical disconnect, bonding notation, gas line location (if applicable), and water supply and drain connections." },
      { title: "Structural Notes Coordination",  description: "Coordination with the structural engineer of record for the pool shell design notes, soil bearing references, and any required geotechnical documentation." },
      { title: "Health Department Forms",        description: "County and state health department application forms where required (commercial pools and some residential jurisdictions)." },
      { title: "Energy Compliance",              description: "Variable-speed pump compliance documentation and pool heater efficiency requirements where mandated by the applicable energy code." },
    ],
    audience: [
      { title: "Homeowners",                 description: "Installing a new pool or spa and need complete permit documentation before construction begins." },
      { title: "Pool Contractors",           description: "Who need a fast, accurate permit package for each new pool installation on a consistent schedule." },
      { title: "Landscape Architects",       description: "Designing pool and outdoor living projects who need permit drawings coordinated with the site design." },
      { title: "Commercial Property Owners", description: "Adding a commercial pool or spa facility and need documentation coordinated across building, health, and fire departments." },
    ],
    faqs: [
      { question: "Do you handle both building and health department submissions?",  answer: "Yes. We prepare documentation for both. Building department packages cover structural, site, and barrier compliance. Health department packages cover water quality, equipment, and circulation requirements for jurisdictions that review these separately." },
      { question: "Is barrier compliance always required?",                          answer: "Yes, in virtually all jurisdictions with residential pools. California Health and Safety Code Section 115922 requires a compliant barrier for all pools and spas. The specific requirements vary by construction date and pool type, which we verify at intake." },
      { question: "Can you coordinate with the structural engineer for the shell?",  answer: "Yes. Our structural coordination service handles the integration of the engineer's shell drawings into the permit set. We manage the coordination so the submission is a single package." },
    ],
    whyItMatters:
      "Pool permits are reviewed by multiple departments with overlapping requirements. A package that satisfies building code but misses health department or barrier compliance requirements results in a hold at a different counter. We build the package to clear all applicable reviews from one submission.",
    relatedSlugs: ["permit-set-preparation", "structural-coordination", "home-addition-packages"],
  },

  // ── 23. Interior Remodel Packages ─────────────────────────────────────────
  {
    slug:     "interior-remodel-packages",
    title:    "Interior Remodel Packages",
    category: "Permitting",
    layout:   "remodel",
    tagline:  "Permit-ready documentation for kitchen, bathroom, and whole-home interior remodel projects.",
    overview:
      "Interior remodel permit packages cover the full drawing documentation required to permit kitchen, bathroom, and whole-home interior remodel projects. We produce existing and proposed floor plans, finish and fixture schedules, electrical and lighting plans, and any structural or MEP coordination drawings required by the project scope. Every package is built to the specific documentation requirements of the applicable jurisdiction and the permit trigger thresholds of the remodel scope.",
    useCases: [
      "Kitchen Remodel",
      "Primary Bathroom Remodel",
      "Full-Home Interior Remodel",
      "Basement Finish or Remodel",
      "Open Floor Plan Conversion",
      "Laundry Room Addition",
      "Home Office Build-Out",
      "Multi-Room Renovation",
    ],
    processHighlights: [
      { label: "Scope Types",     value: "8+" },
      { label: "Turnaround",      value: "5–10 Days" },
      { label: "MEP Coordination", value: "Included" },
      { label: "Structural Notes", value: "As Required" },
    ],
    steps: [
      { title: "Existing Conditions Documentation", description: "We document the existing floor plan, fixture locations, wall conditions, and relevant MEP rough-in locations as the baseline for the proposed scope. Accuracy at this stage prevents plan check corrections from undocumented existing conditions." },
      { title: "Proposed Scope Drawing",            description: "The proposed remodel is drawn in full, showing new wall locations, cabinetry footprints, fixture locations, finish zones, and any structural changes. Demolished and new work are clearly differentiated." },
      { title: "MEP and Electrical Coordination",   description: "Electrical, plumbing, and mechanical changes are noted on the drawings. For kitchen and bath remodels, fixture circuit assignments, GFCI locations, ventilation, and plumbing rough-in dimensions are documented to permit requirements." },
      { title: "Package Assembly",                  description: "All sheets are assembled into a jurisdiction-specific submission package with a complete title sheet, code summary, and all required supplemental forms." },
    ],
    includes: [
      { title: "Existing and Proposed Floor Plans",   description: "Side-by-side documentation of existing conditions and proposed scope showing all demolished work, new construction, and unchanged elements." },
      { title: "Reflected Ceiling Plan",             description: "Ceiling layout showing light fixture locations, junction boxes, ventilation openings, and ceiling material changes where required by scope." },
      { title: "Kitchen or Bath Elevation Drawings", description: "Interior wall elevations for kitchen and bathroom remodels showing cabinet height, tile zones, fixture locations, and finish material extents." },
      { title: "Electrical and Lighting Plan",       description: "Electrical layout showing circuit assignments, outlet locations, GFCI zones, switch locations, and fixture types per jurisdiction requirements." },
      { title: "Plumbing Fixture Schedule",          description: "Fixture schedule with specified fixtures, rough-in dimensions, water supply and drain sizes, and ventilation requirements." },
      { title: "Title Sheet and Code Summary",       description: "Project identification, scope description, applicable codes, and all required regulatory summary information." },
    ],
    audience: [
      { title: "Homeowners",               description: "Remodeling a kitchen, bathroom, or multiple rooms and need permit documentation before construction begins." },
      { title: "Remodel Contractors",      description: "Who pull permits for client remodel projects and need complete, coordinated drawing packages on a consistent schedule." },
      { title: "Kitchen and Bath Designers", description: "Who produce design documents but need permit-ready drawing packages that meet building department standards." },
      { title: "Property Investors",       description: "Renovating investment properties and need permit documentation to protect asset value and legal compliance." },
    ],
    faqs: [
      { question: "What remodel scopes actually require a permit?",                   answer: "Any work that involves structural changes, electrical panel modifications, plumbing rough-in changes, or HVAC alterations requires a permit in most jurisdictions. Cosmetic changes (paint, flooring, cabinet refacing) typically do not. We clarify the permit trigger at intake based on your specific scope and jurisdiction." },
      { question: "Do you handle load-bearing wall removal?",                         answer: "Yes, with structural coordination. Load-bearing wall removal requires engineer input and a structural drawing showing the beam sizing and connection details. Our structural coordination service manages this integration." },
      { question: "Can you document existing conditions remotely?",                   answer: "Yes, with your provided measurements, photographs, and any available city records. We document on the title sheet that existing conditions are based on owner-furnished measurements. Most jurisdictions accept this for interior remodel scopes." },
    ],
    whyItMatters:
      "Kitchen and bathroom remodel permits are among the highest-volume permit applications at most building departments, and they generate a disproportionate share of plan check corrections because incomplete documentation is common. A complete package with proper MEP coordination and code references passes faster.",
    relatedSlugs: ["permit-set-preparation", "architectural-drafting", "city-comments-response"],
  },

  // ── 24. Short-Term Rental Conversion Permits ──────────────────────────────
  {
    slug:     "short-term-rental-permits",
    title:    "Short-Term Rental Conversion Permits",
    category: "Permitting",
    layout:   "compliance",
    tagline:  "Permit and compliance documentation for converting residential properties to short-term rental use.",
    overview:
      "Short-term rental conversion permits require a distinct compliance pathway from standard residential permits. Converting a property to STR use triggers fire safety, egress, occupancy, and zoning compliance requirements that vary significantly by jurisdiction. We research the specific STR ordinance for your city, identify every permit and compliance requirement, and produce the documentation package required to achieve legal STR status.",
    useCases: [
      "Single-Family Home STR Conversion",
      "ADU STR Registration",
      "Multi-Unit STR Compliance",
      "Vacation Rental Permit Application",
      "Owner-Occupied STR License",
      "Non-Owner-Occupied STR Permit",
      "STR Fire Safety Compliance",
      "Zoning Conformance Documentation",
    ],
    processHighlights: [
      { label: "Compliance Areas",   value: "6" },
      { label: "Jurisdiction Research", value: "Always First" },
      { label: "Fire Safety",        value: "Included" },
      { label: "Zoning Analysis",    value: "Included" },
    ],
    steps: [
      { title: "STR Ordinance Research",    description: "We research the specific STR ordinance for your city or county, identifying the permit type required, owner-occupancy rules, occupancy limits, and any zoning restrictions that affect STR eligibility for your property." },
      { title: "Property Compliance Audit", description: "The property is evaluated against STR-specific requirements: smoke and CO detector placement, fire extinguisher requirements, egress compliance, maximum occupancy, and any required inspections." },
      { title: "Documentation Package",     description: "We produce all required drawings and compliance documentation: floor plans showing detector and extinguisher locations, egress plans, and any building department forms required for the STR permit application." },
      { title: "Application Assembly",      description: "The complete application package is assembled and organized for submission to the applicable departments (building, planning, and fire) with a cover summary referencing the applicable code sections." },
    ],
    includes: [
      { title: "STR Ordinance Research Report",     description: "Written summary of the applicable STR ordinance requirements, permit type, fees, renewal requirements, and any local restrictions specific to your property location." },
      { title: "Floor Plan with Safety Compliance", description: "Floor plan annotated with smoke detector, carbon monoxide detector, and fire extinguisher locations per the applicable fire code and STR ordinance requirements." },
      { title: "Egress Compliance Drawing",         description: "Documentation of all required egress openings, emergency escape windows, and exit paths confirming compliance with the applicable residential or STR code requirements." },
      { title: "Zoning Conformance Analysis",       description: "Written analysis confirming that short-term rental use is permitted under the applicable zoning designation and any conditions or restrictions that apply." },
      { title: "Application Forms Assembly",        description: "All required application forms, owner declarations, occupancy affidavits, and supplemental materials organized for submission." },
      { title: "Compliance Checklist",              description: "A checklist summarizing every compliance requirement, its applicable code section, and the documentation produced to satisfy it." },
    ],
    audience: [
      { title: "Property Owners",           description: "Converting a home or ADU to STR use and needing to navigate the permit and compliance process legally." },
      { title: "Real Estate Investors",     description: "Acquiring properties for STR investment and needing compliance documentation to confirm legal STR status before closing." },
      { title: "STR Management Companies", description: "Onboarding new properties into a managed STR portfolio and needing permit compliance documentation as a standard intake step." },
      { title: "Attorneys and Title Companies", description: "Confirming STR legal compliance as part of a property transaction or due diligence review." },
    ],
    faqs: [
      { question: "Does every city have a different STR ordinance?",                answer: "Yes. STR regulations are locally adopted and vary significantly across jurisdictions. Some cities ban STRs entirely in certain zones; others require annual inspections; others have owner-occupancy requirements. Jurisdiction research is always the first step." },
      { question: "What happens if a property doesn't fully comply?",               answer: "We document the gap, identify the path to compliance, and produce whatever drawings or applications are needed to address it. If the property is not eligible for STR use under current zoning, we document that conclusion clearly." },
      { question: "Do you handle the fire inspection coordination?",                answer: "We produce the compliance documentation that supports a fire inspection. Scheduling and attending the inspection is the property owner's responsibility. We provide a checklist of what inspectors typically look for and the documentation they expect to see." },
    ],
    whyItMatters:
      "Unpermitted short-term rentals are subject to fines, forced closure, and platform delisting. The permit pathway is jurisdiction-specific and often multi-department, meaning a property owner who starts without a compliance map ends up navigating contradictory requirements from different counters. We map the pathway first.",
    relatedSlugs: ["permit-set-preparation", "adu-permit-packages", "city-comments-response"],
  },

  // ── 25. Accessory Structure Permits ──────────────────────────────────────
  {
    slug:     "accessory-structure-permits",
    title:    "Accessory Structure Permits",
    category: "Permitting",
    layout:   "accessory",
    tagline:  "Permit packages for detached garages, workshops, sheds, studios, and all residential accessory structures.",
    overview:
      "Accessory structure permit packages cover the full drawing documentation required for detached garages, workshops, storage buildings, art studios, pool houses, and all other residential accessory structures. We produce complete permit sets tailored to the structure type, jurisdiction requirements, and site conditions. Packages cover everything from a simple storage shed to a multi-bay detached garage with finished interior space.",
    useCases: [
      "Detached Garage",
      "Workshop or Hobby Studio",
      "Storage Building or Barn",
      "Pool House or Cabana",
      "Garden Room or She-Shed",
      "Artist or Music Studio",
      "Home Gym or Sports Building",
      "Agricultural Outbuilding",
    ],
    processHighlights: [
      { label: "Structure Types",  value: "8+" },
      { label: "Turnaround",       value: "4–7 Days" },
      { label: "Site Coverage",    value: "Always Checked" },
      { label: "Setback Review",   value: "Included" },
    ],
    steps: [
      { title: "Site and Zoning Review",         description: "We review the property against applicable setback requirements, lot coverage limits, accessory structure size maximums, and any height restrictions or design standards required by the jurisdiction for the structure type." },
      { title: "Structure Design Documentation", description: "Complete architectural drawings of the proposed structure: floor plan, all exterior elevations, roof plan, foundation type, and structural notes or coordination with the engineer of record where required." },
      { title: "Site Plan Update",               description: "The site plan is drawn or updated to show the proposed structure with dimensions, setbacks from all property lines and existing structures, and the updated lot coverage calculation." },
      { title: "Permit Set Assembly",            description: "All drawings are assembled into a jurisdiction-specific permit submission package with a complete title sheet, code summary, and applicable supplemental forms." },
    ],
    includes: [
      { title: "Floor Plan",               description: "Dimensioned floor plan of the proposed structure showing all room divisions, door and window locations, and interior finishes where applicable." },
      { title: "Exterior Elevations",      description: "All four elevations showing roof form, wall heights, openings, and exterior finish materials." },
      { title: "Site Plan with Setbacks",  description: "Site plan showing the proposed structure location with dimensions to all property lines, existing structures, and any easements, with updated lot coverage calculation." },
      { title: "Foundation and Structural Notes", description: "Foundation type documentation (slab, pier, or continuous footing) with structural notes or coordination with the structural engineer of record for engineered designs." },
      { title: "Roof Plan and Framing",    description: "Roof plan showing ridge, hip, and valley lines, drainage slopes, and framing direction. Framing notes for pre-engineered lumber or conventional framing where required." },
      { title: "Title Sheet and Code Summary", description: "Project identification, applicable codes, zoning conformance data, and all required code summary information." },
    ],
    audience: [
      { title: "Homeowners",               description: "Building a detached garage, workshop, studio, or storage building and needing complete permit documentation." },
      { title: "General Contractors",      description: "Building accessory structures for clients and needing permit-ready drawing packages on a fast, consistent schedule." },
      { title: "Landscape and Design-Build Firms", description: "Who design outdoor living projects incorporating accessory structures and need permit documentation as part of the project delivery." },
      { title: "Agricultural Property Owners", description: "Building farm buildings, barns, or agricultural outbuildings that require building department permits." },
    ],
    faqs: [
      { question: "What size accessory structure requires a permit?",   answer: "Most jurisdictions require a permit for any structure over 120 square feet, though this threshold varies. Some jurisdictions require permits for all permanent structures regardless of size. We verify the specific threshold at intake." },
      { question: "Can an accessory structure be used as a living space?", answer: "Generally no, unless it is designed and permitted as an ADU. Accessory structures permitted as storage, workshop, or garage cannot be used as sleeping space under building and zoning codes without a separate ADU conversion permit. We clarify this at intake." },
      { question: "Do you cover engineered steel building systems?",      answer: "Yes. Pre-engineered metal building systems require the manufacturer's engineering documents to be coordinated with the site drawings and a site-specific permit package. We produce the site-specific drawings and coordinate with the manufacturer's engineer." },
    ],
    whyItMatters:
      "Unpermitted accessory structures create title, insurance, and sale complications that are expensive to resolve. Permits for small structures are straightforward when the drawings are complete and the zoning analysis is done correctly. The investment in a proper permit package is small relative to the risk of an unpermitted structure.",
    relatedSlugs: ["permit-set-preparation", "home-addition-packages", "garage-conversion-packages"],
  },

  // ── 26. Title 24 / Energy Compliance ─────────────────────────────────────
  {
    slug:     "title-24-energy-compliance",
    title:    "Title 24 Energy Compliance",
    category: "Permitting",
    layout:   "energy",
    tagline:  "California Title 24 energy compliance documentation for residential and commercial permit submissions.",
    overview:
      "Title 24 energy compliance documentation is required for all new construction, additions, and alterations to conditioned space in California. We produce compliance reports using the prescriptive and performance pathways for residential and nonresidential projects, coordinated with the permit drawing set. Every compliance report is prepared by a certified energy analyst and delivered in the correct submission format for the applicable California building department.",
    processHighlights: [
      { label: "Compliance Path",    value: "Prescriptive / Performance" },
      { label: "Delivery",           value: "3–5 Days" },
      { label: "Certified Analyst",  value: "Yes" },
      { label: "Coordination",       value: "Drawing-Integrated" },
    ],
    steps: [
      { title: "Project Classification",    description: "We classify the project by occupancy type (residential, nonresidential, or mixed-use) and construction type (new, addition, or alteration) to determine the applicable Title 24 Part 6 compliance pathway and mandatory measures." },
      { title: "Compliance Path Selection", description: "Based on the project characteristics, we select between the prescriptive compliance path (component-by-component compliance) and the performance compliance path (whole-building energy modeling). Performance modeling is required for projects that cannot comply prescriptively." },
      { title: "Compliance Report Production", description: "The compliance report is produced using CEC-approved software. The report includes all required CF-1R (residential) or LTG/ENV/MECH (nonresidential) forms, with all component specifications, U-factors, SHGC values, and HVAC equipment data documented." },
      { title: "Drawing Coordination",      description: "Energy compliance notes and specifications are coordinated into the permit drawing set: insulation types and values called out on building sections, HVAC equipment efficiency ratings on the mechanical schedule, and fenestration properties on the window schedule." },
    ],
    includes: [
      { title: "CF-1R Compliance Report",             description: "Registered residential compliance report (CF-1R) for all residential new construction and alteration projects, stamped by a certified energy analyst." },
      { title: "CF-2R Installation Certificate",      description: "Installation certificate documentation package (CF-2R) coordinated for field verification during construction inspection." },
      { title: "Nonresidential Compliance Forms",     description: "LTG-1 (lighting), ENV-1 (envelope), and MECH-1 (mechanical) forms for nonresidential projects, with all required mandatory measures documented." },
      { title: "HVAC Sizing Calculations",            description: "Heating and cooling load calculations confirming that specified HVAC equipment meets the sizing requirements of the applicable energy standard." },
      { title: "Drawing Compliance Notes",            description: "All required energy compliance notes and specifications integrated into the permit drawing set, including insulation callouts, fenestration schedules, and equipment efficiency requirements." },
      { title: "Mandatory Measures Checklist",        description: "A complete mandatory measures checklist confirming compliance with all applicable Title 24 mandatory provisions that cannot be traded off through the compliance path." },
    ],
    audience: [
      { title: "Property Owners and Developers", description: "Building new homes or commercial buildings in California and needing Title 24 compliance documentation for permit submission." },
      { title: "Architects and Designers",       description: "Who need a certified energy analyst to produce the compliance report coordinated with their permit drawings." },
      { title: "General Contractors",            description: "Pulling permits for California projects and needing Title 24 documentation as part of the permit package." },
      { title: "Mechanical Engineers",           description: "Designing HVAC systems for California buildings and needing energy compliance coordination with the equipment specifications." },
    ],
    faqs: [
      { question: "Does every California project require Title 24 documentation?",  answer: "Yes, all permits for conditioned space require Title 24 Part 6 compliance documentation. This includes new construction, additions, and alterations that change the thermal envelope, HVAC, or lighting systems." },
      { question: "What is the difference between prescriptive and performance compliance?", answer: "Prescriptive compliance requires each building component to individually meet the code standard. Performance compliance uses whole-building energy modeling to show that the overall building uses less energy than a code-compliant reference building. Performance compliance gives more design flexibility but requires more detailed calculation." },
      { question: "Do you handle solar and battery storage requirements?",          answer: "Yes. California requires solar PV on most new residential construction. We include the mandatory solar provisions, export compliance documentation, and battery storage provisions where required by the California Energy Code." },
    ],
    whyItMatters:
      "Title 24 compliance is not optional and not delegable. Every California permit for conditioned space requires a compliance report, and building departments reject packages that are missing or incomplete. Getting the compliance documentation right the first time is a prerequisite for permit approval, not an afterthought.",
    relatedSlugs: ["permit-set-preparation", "architectural-drafting", "mep-coordination"],
  },

  // ── 28. Historic District Submissions ─────────────────────────────────────
  {
    slug:     "historic-district-submissions",
    title:    "Historic District Submissions",
    category: "Coordination",
    layout:   "historic",
    tagline:  "Documentation packages for historic preservation review boards and certificate of appropriateness applications.",
    overview:
      "Historic district submissions require documentation that goes well beyond a standard permit set. A Certificate of Appropriateness (COA) application must demonstrate that proposed work is consistent with the Secretary of the Interior's Standards for Rehabilitation and the specific design guidelines of the applicable local historic district. We produce the full submission package: existing conditions documentation, materials analysis, proposed scope drawings, and the written narrative that demonstrates compliance with the preservation standards.",
    processHighlights: [
      { label: "Standards",          value: "Secretary of Interior" },
      { label: "Package Type",       value: "COA Application" },
      { label: "Existing Docs",      value: "Always Included" },
      { label: "Narrative Report",   value: "Included" },
    ],
    steps: [
      { title: "Historic Resource Documentation", description: "We document the existing historic resource: architectural character, defining features, materials, period-significant elements, and any prior alterations. This existing conditions documentation is the foundation of the COA application." },
      { title: "Standards Compliance Analysis",   description: "The proposed scope is evaluated against the applicable Secretary of the Interior's Standards for Rehabilitation and the local historic district design guidelines. We identify any elements that require modification to comply and note any areas requiring clarification from the preservation board." },
      { title: "Submission Package Preparation",  description: "We produce the complete COA submission package: existing and proposed drawings, materials specifications, photo documentation, and the written compliance narrative demonstrating consistency with the preservation standards." },
      { title: "Board Response Support",          description: "If the preservation board issues comments or requests additional information, we prepare the response drawings and supplemental documentation required to address each item." },
    ],
    includes: [
      { title: "Existing Conditions Documentation",  description: "Measured drawings documenting the existing historic resource: floor plans, elevations, and character-defining feature details." },
      { title: "Proposed Scope Drawings",            description: "Proposed work drawings drawn to the same format as the existing documentation, clearly distinguishing new from existing and indicating reversibility where required." },
      { title: "Materials Analysis and Specification", description: "Written analysis of existing historic materials and specification of proposed replacement or repair materials demonstrating compatibility with historic character." },
      { title: "Standards Compliance Narrative",     description: "Written narrative analyzing the proposed work against each applicable Secretary of the Interior's Standard and the local district design guidelines." },
      { title: "Photo Documentation Package",        description: "Organized photographic documentation of the existing property and character-defining features, formatted for the COA application." },
      { title: "Board Response Documentation",       description: "Response drawings and supplemental documentation addressing preservation board comments, if issued." },
    ],
    audience: [
      { title: "Property Owners",               description: "Owning a contributing or individually designated historic property and needing COA documentation for proposed work." },
      { title: "Architects",                    description: "Designing projects on historic properties who need a documentation and application partner with preservation board experience." },
      { title: "Preservation Contractors",      description: "Specializing in historic restoration and needing permit and COA documentation prepared to preservation standards." },
      { title: "Developers",                    description: "Rehabilitating historic buildings for adaptive reuse and needing COA packages and tax credit documentation coordination." },
    ],
    faqs: [
      { question: "What is a Certificate of Appropriateness?",                  answer: "A COA is the approval issued by a local historic preservation board or commission authorizing proposed work on a designated historic property. It is a separate approval from the building permit and is typically required before the permit is issued." },
      { question: "Does every change to a historic building require a COA?",     answer: "No. Most local historic district programs distinguish between contributing and non-contributing properties, and between exterior and interior work. Routine maintenance that does not change historic character is typically exempt. We clarify the specific COA trigger requirements for your property and jurisdiction at intake." },
      { question: "Can you assist with historic tax credit documentation?",      answer: "Yes. Federal and California historic tax credit applications require documentation that is substantially similar to the COA package. We produce the Part 1 (property evaluation) and Part 2 (rehabilitation description) documentation in coordination with the tax credit consultant." },
    ],
    whyItMatters:
      "Historic preservation boards review proposed work against specific published standards, not general building code. A permit set that passes building department review may fail historic review entirely if it does not demonstrate materials compatibility, reversibility, and consistency with the character of the historic resource. The documentation requirements are different, and the submission must address them specifically.",
    relatedSlugs: ["permit-set-preparation", "architectural-drafting", "pre-application-meeting-prep"],
  },

  // ── 29. BIM Coordination ─────────────────────────────────────────────────
  {
    slug:     "bim-coordination",
    title:    "BIM Coordination",
    category: "Coordination",
    layout:   "bim",
    tagline:  "Building Information Modeling coordination for complex commercial, institutional, and multi-trade projects.",
    overview:
      "BIM Coordination is the process of integrating architectural, structural, and MEP models into a single federated model to detect and resolve spatial conflicts before construction begins. We provide BIM coordination services for commercial, institutional, and complex residential projects, producing coordinated models, clash detection reports, and coordination drawings that prevent field conflicts from becoming construction delays. All work is delivered in Revit and IFC formats.",
    disciplines: ["Architectural BIM", "Structural BIM", "MEP Coordination", "Clash Detection", "4D Scheduling Coordination", "As-Built BIM Documentation"],
    processHighlights: [
      { label: "Model Format",       value: "Revit / IFC" },
      { label: "LOD",                value: "200–400" },
      { label: "Clash Detection",    value: "Included" },
      { label: "Issue Tracking",     value: "BCF Format" },
    ],
    steps: [
      { title: "Model Intake and Setup",      description: "We receive architectural, structural, and MEP models from the project team, establish the project coordinate system, and set up the federated model environment. Any model quality issues (missing data, coordinate conflicts, incorrect elements) are logged and resolved before coordination begins." },
      { title: "Clash Detection Rounds",      description: "Hard clashes (physical element intersections) and soft clashes (clearance violations) are run between all model disciplines. Clash reports are issued in BCF format, organized by trade, location, and severity, and distributed to the responsible design team members." },
      { title: "Coordination Meetings",       description: "We facilitate coordination review meetings with the project team to review clash reports, assign resolutions, and confirm the responsible party and required action for each item. Coordination meeting minutes and updated clash logs are maintained." },
      { title: "Resolution and Model Update", description: "As design team members resolve assigned clashes, models are reloaded and re-run. The coordination cycle continues until the model meets the project's coordination completion criteria and the clash count drops below the agreed threshold." },
    ],
    includes: [
      { title: "Federated Model Setup",         description: "Assembly and management of the federated project model incorporating all discipline models with a coordinated project coordinate system and file structure." },
      { title: "Clash Detection Reports",       description: "Organized clash detection reports in BCF format, with hard clash and soft clash sets run between all discipline pairs. Distributed to responsible design team members for resolution." },
      { title: "Coordination Drawings",         description: "2D coordination drawings extracted from the federated model showing resolved MEP routing, structural clearances, and coordination conditions for field reference." },
      { title: "Issue Tracking Log",            description: "A running clash and coordination issue log tracking every identified conflict, its assigned owner, current status, and resolution date." },
      { title: "Coordination Completion Report", description: "A final report documenting the coordination scope, clash statistics (initial count, resolution count, remaining items), and sign-off confirmation from responsible parties." },
      { title: "As-Built BIM Update",           description: "Post-construction model update reflecting field-verified conditions, available as a deliverable for owner facilities management." },
    ],
    audience: [
      { title: "Commercial General Contractors", description: "Managing complex commercial projects where MEP and structural conflicts discovered in the field create costly delays." },
      { title: "Architects on Complex Projects", description: "Who need BIM coordination services to integrate structural and MEP consultant models with the architectural design." },
      { title: "Owners and Developers",          description: "Requiring a coordinated BIM deliverable for facilities management, commissioning, or contractual BIM requirements." },
      { title: "MEP Engineers",                  description: "Who produce MEP models and need a coordination partner to run clashes against architectural and structural and manage the resolution process." },
    ],
    faqs: [
      { question: "What LOD is standard for permit coordination?",           answer: "LOD 200 to 300 is typically sufficient for permit-level coordination. LOD 350 to 400 is used for detailed construction coordination and is required for projects with complex MEP installations or prefabricated MEP assemblies." },
      { question: "What software formats do you accept?",                    answer: "We work primarily in Autodesk Revit (RVT) and accept IFC-format models from consultants using other BIM platforms. We can also coordinate from Navisworks (NWD/NWC) for clash detection when full model editing is not required." },
      { question: "What is BCF format and why does it matter?",             answer: "Building Collaboration Format (BCF) is the open standard for communicating BIM coordination issues. BCF files can be opened in virtually all BIM platforms, ensuring that clash reports are actionable by every member of the project team regardless of their software." },
      { question: "How many clash detection rounds are included?",           answer: "The number of rounds depends on the project complexity and the team's resolution velocity. We structure the engagement around a defined coordination completion criterion (such as zero hard clashes and approved soft clash waivers) rather than a fixed number of rounds." },
    ],
    whyItMatters:
      "Clashes discovered in the field cost 10 to 100 times more to resolve than clashes detected in the model. BIM coordination is not a luxury on complex projects: it is the only reliable way to verify that a multi-trade installation fits in the available space before the first conduit is hung. The investment in coordination is returned in the first avoided field conflict.",
    relatedSlugs: ["structural-coordination", "mep-coordination", "construction-administration"],
  },


  // ── 29. Zoning & Code Research Report ───────────────────────────────────────
  {
    slug:     "zoning-code-research",
    title:    "Zoning and Code Research Report",
    category: "Strategy",
    layout:   "zoning",
    tagline:  "Know exactly what your parcel allows before a single drawing is made.",
    overview:
      "We research the zoning designation, development standards, overlay requirements, ADU eligibility, and regulatory constraints that apply to a specific parcel and jurisdiction. The result is a written report that gives your entire project team a verified baseline before design begins. No assumptions, no surprises at plan check.",
    processHighlights: [
      { label: "Delivery",                  value: "3-5 Days"  },
      { label: "Jurisdictions",             value: "All US"    },
      { label: "Local amendments tracked",  value: "100+"      },
      { label: "Report format",             value: "Written"   },
    ],
    steps: [
      { title: "Zoning Designation and Use Classification",  description: "Confirms the parcel's zone, permitted uses, conditional use categories, and any special or overlay districts that affect what can be built or operated on the site." },
      { title: "Development Standards",                      description: "Documents required setbacks from all property lines, maximum building height, floor area ratio, lot coverage limits, and minimum open space requirements." },
      { title: "ADU and JADU Eligibility",                   description: "Analyzes the parcel's entitlement for accessory and junior accessory dwelling units under state and local code, including unit size limits, setback exceptions, and any owner-occupancy requirements." },
      { title: "Parking Requirements",                       description: "Evaluates current parking minimums, transit proximity exemptions, and requirements for EV-ready and accessible stalls under the applicable municipal code." },
      { title: "Regulatory Overlays",                        description: "Identifies flood zone designation, fire hazard severity zone, hillside or slope ordinance applicability, and any historic district or design review requirements that apply to the parcel." },
      { title: "Variance and Non-Conformity Flags",          description: "Notes any existing non-conforming conditions that could be triggered by the proposed scope, and identifies where variance, adjustment, or waiver applications may be required." },
    ],
    includes: [
      { title: "Written Zone Analysis Report",          description: "A complete narrative covering all six analysis areas, written for use by the entire project team." },
      { title: "Development Standards Summary",         description: "All applicable setbacks, height limits, FAR, lot coverage, and open space requirements in a single reference table." },
      { title: "ADU and JADU Eligibility Determination", description: "Confirmation of unit count, size limits, setback rules, and any owner-occupancy or design requirements." },
      { title: "Overlay and Encumbrance Reference",     description: "A summary of all regulatory overlays affecting the parcel, including flood zone, fire severity, and design review triggers." },
      { title: "Code Section Citations",                description: "Full citation of every applicable municipal code section so your team can verify the source and monitor for amendments." },
      { title: "Variance and Adjustment Flag List",     description: "A clear list of any conditions requiring variance, adjustment, or special approval before permits can be issued." },
    ],
    audience: [
      { title: "General Contractors",    description: "Confirm what the zoning allows before committing to a project scope or providing a bid." },
      { title: "Real Estate Developers", description: "Underwrite acquisitions with a verified picture of development potential before the purchase closes." },
      { title: "Property Owners",        description: "Understand what you can build on your parcel before hiring a designer or engaging consultants." },
      { title: "Licensed Architects",    description: "Get jurisdiction research completed before production drafting begins so drawings are built to the correct standards from day one." },
    ],
    whyItMatters:
      "Most design errors start before the first drawing is made. A designer who skips zoning verification, overlooks setback requirements, or misses a regulatory overlay will produce drawings that fail plan check. A zoning and code research report eliminates that risk at the lowest possible cost: a fraction of a single redesign, delivered before the designer opens their first file.",
    relatedSlugs: ["feasibility-study", "permit-pathway-analysis", "project-strategy"],
    faqs: [
      { question: "What information do I need to provide?",           answer: "The parcel address, APN if available, jurisdiction name, and a brief description of the intended project scope. That is all we need to begin research." },
      { question: "Can you research parcels outside California?",     answer: "Yes. We research zoning requirements for parcels in any US jurisdiction. Delivery timelines may vary slightly for jurisdictions with limited online record access." },
      { question: "Is this the same as a feasibility study?",        answer: "No. A zoning and code research report is a standalone research deliverable focused on regulatory constraints. A feasibility study is a broader analysis that also evaluates the physical, financial, and design parameters of a specific proposed project." },
      { question: "What if the zoning code has been recently amended?", answer: "We verify the current municipal code at the time of research and note any pending amendments that may affect the project scope. If an amendment is adopted during a project engagement, we can provide a supplemental update." },
    ],
  },

  // ── 30. Permit Pathway Analysis ──────────────────────────────────────────────
  {
    slug:     "permit-pathway-analysis",
    title:    "Permit Pathway Analysis",
    category: "Strategy",
    layout:   "pathway",
    tagline:  "Every permit required. Every agency involved. Every timeline, written down.",
    overview:
      "We map the complete permit pathway for your project: every permit type required, every agency involved in review, every consultant your team will need to engage, and a realistic timeline grounded in actual jurisdiction data. Delivered as a written report before design begins.",
    processHighlights: [
      { label: "Delivery",         value: "3-5 Days" },
      { label: "Jurisdictions",    value: "All US"   },
      { label: "Timeline format",  value: "Written"  },
      { label: "Revision rounds",  value: "Included" },
    ],
    steps: [
      { title: "Scope and Jurisdiction Classification",  description: "We classify the project scope (residential, commercial, mixed-use) and confirm the applicable building department, planning department, and any additional agencies with review authority over the project." },
      { title: "Permit Type Determination",             description: "We identify every permit type the project requires: building, electrical, mechanical, plumbing, grading, fire, environmental, and any discretionary approvals such as CUPs or variances." },
      { title: "Agency and Review Type Mapping",        description: "For each permit type, we document the reviewing agency, whether review is ministerial or discretionary, typical review timelines, and any known local triggers for additional review." },
      { title: "Consultant Requirements",               description: "We identify every consultant the project will require (structural engineer, civil, Title 24 energy, soils, surveyor, MEP) and at which phase each must be engaged for the project to proceed without delays." },
      { title: "Written Pathway Report",                description: "All findings are compiled into a written report: a complete permit matrix, agency contact list, consultant sequence, and a realistic milestone timeline from submission to permit issuance." },
    ],
    includes: [
      { title: "Permit Type Matrix",             description: "A complete table of every permit required, the issuing agency, review type, and estimated review duration." },
      { title: "Agency Contact Reference",       description: "Contact information and submission procedures for every agency involved in the permit process." },
      { title: "Consultant Requirement Summary", description: "A list of every required consultant, the phase at which they must be engaged, and typical deliverable requirements." },
      { title: "Realistic Timeline Projection",  description: "A milestone timeline from first submission through permit issuance, built from jurisdiction-specific review data rather than generic estimates." },
      { title: "Submission Checklist Outline",   description: "A preliminary list of documents required for the initial permit submission, organized by permit type." },
      { title: "Risk and Trigger Flag Notes",    description: "Notes on any conditions that could extend the timeline, trigger additional review, or require supplemental applications." },
    ],
    audience: [
      { title: "General Contractors",    description: "Confirm the full permit scope and timeline before signing a contract or starting production drawings." },
      { title: "Real Estate Developers", description: "Model permit timelines accurately for project pro formas and investor reporting." },
      { title: "Property Owners",        description: "Understand exactly what you are about to initiate before committing to design or construction." },
      { title: "Licensed Architects",    description: "Confirm permit scope and consultant requirements before your own engagement begins so there are no late additions to the project team." },
    ],
    whyItMatters:
      "The most expensive permit problems are the ones nobody saw coming: a discretionary review requirement that was missed, a consultant engagement that happened too late, a timeline that assumed ministerial review on a project that required a variance. A permit pathway analysis resolves all of that before a drawing is made. The cost of the report is returned the first time a schedule delay is avoided.",
    relatedSlugs: ["zoning-code-research", "project-strategy", "permit-set-preparation"],
    faqs: [
      { question: "What project types do you cover?",                answer: "Residential, commercial, mixed-use, industrial, and institutional projects in any US jurisdiction. The analysis is scoped to the specific project type and applicable agency requirements." },
      { question: "Does this include the actual permit applications?", answer: "No. A permit pathway analysis is a research and planning deliverable. Permit set preparation, application assembly, and submission support are separate services available through CADTRI." },
      { question: "What if the project scope changes after delivery?", answer: "If the scope changes materially, we can issue a supplemental update covering the revised project description. Scope changes that affect the permit type or agency involvement are the most common trigger for supplemental work." },
    ],
  },

  // ── 31. Pre-Purchase Property Assessment ─────────────────────────────────────
  {
    slug:     "pre-purchase-assessment",
    title:    "Pre-Purchase Property Assessment",
    category: "Strategy",
    layout:   "assessment",
    tagline:  "Know what you can build on a parcel before you commit to buying it.",
    overview:
      "We assess a property's development potential and permit complexity before the purchase closes. The report covers zoning and entitlement analysis, permit history review, proposed scope feasibility, and a clear summary of risks and opportunities. Designed to be delivered before the inspection contingency expires.",
    processHighlights: [
      { label: "Delivery",          value: "3-5 Days" },
      { label: "Risk summary",      value: "Written"  },
      { label: "Contingency fit",   value: "Standard" },
      { label: "Jurisdictions",     value: "All US"   },
    ],
    steps: [
      { title: "Parcel and Title Review",              description: "We review the parcel dimensions, legal description, easements, and any title encumbrances that affect what can be built on the property." },
      { title: "Zoning and Entitlement Analysis",     description: "We confirm the zoning designation, permitted uses, development standards, and any overlay requirements that apply to the parcel and your intended project scope." },
      { title: "Permit History Review",               description: "We pull the available permit history for the property to identify unpermitted additions, open permits, expired permits, or prior plan check issues that could affect your project." },
      { title: "Proposed Scope Feasibility Check",    description: "We evaluate whether your intended project scope is feasible under the current zoning, development standards, and permit requirements for the parcel." },
      { title: "Risk and Opportunity Summary",        description: "All findings are synthesized into a written summary of risks (conditions that could cost money or delay the project) and opportunities (conditions that support your intended use or add development potential)." },
    ],
    includes: [
      { title: "Parcel Analysis Report",           description: "A written summary covering parcel dimensions, easements, encumbrances, and any conditions affecting buildable area." },
      { title: "Zoning and Entitlement Summary",   description: "Confirmed zoning designation, permitted uses, development standards, overlay requirements, and ADU eligibility if applicable." },
      { title: "Permit History Summary",           description: "A review of available permit records with notes on unpermitted conditions, open permits, and any prior plan check issues." },
      { title: "Proposed Scope Feasibility Notes", description: "An assessment of whether your intended project is feasible as described, including any scope adjustments required for zoning or code conformance." },
      { title: "Risk and Opportunity Matrix",      description: "A clear summary of conditions that represent risk (cost, delay, or complexity) and conditions that support the investment thesis." },
      { title: "Consultant Referral List",         description: "A list of consultants your team will need to engage once the purchase closes, with notes on engagement timing." },
    ],
    audience: [
      { title: "Real Estate Investors",     description: "Verify development potential and assess permit complexity before committing to an acquisition." },
      { title: "Property Developers",       description: "Confirm entitlement assumptions and identify risk exposure before the purchase agreement is executed." },
      { title: "General Contractors",       description: "Evaluate a property you are considering purchasing or advising a client on before work is scoped." },
      { title: "Individual Buyers",         description: "Understand exactly what your intended renovation or addition project requires before the purchase closes." },
    ],
    whyItMatters:
      "Properties that look straightforward rarely are. Unpermitted additions that require demolition, zoning designations that prohibit intended uses, setback violations that prevent expansions, discretionary review requirements that add months to a timeline: these are the surprises that surface after closing. A pre-purchase assessment answers the most important questions while there is still time to negotiate the price, adjust the scope, or walk away.",
    relatedSlugs: ["zoning-code-research", "feasibility-study", "permit-pathway-analysis"],
    faqs: [
      { question: "When in the purchase process should I order this?",   answer: "Ideally during the inspection contingency period, when you still have the option to negotiate or exit the transaction. For larger acquisitions, some clients order the assessment before submitting an offer." },
      { question: "What documents do I need to provide?",                answer: "The parcel address, APN, your intended project description, and any purchase documents or existing plans you have. If available, the seller disclosure package is also helpful." },
      { question: "Does this replace an architectural or structural inspection?", answer: "No. This is a planning and permitting analysis, not a physical inspection. We review records and regulatory requirements, not physical conditions. It works alongside a structural inspection, not in place of it." },
    ],
  },

  // ── 32. Scope Definition Package ─────────────────────────────────────────────
  {
    slug:     "scope-definition",
    title:    "Scope Definition Package",
    category: "Strategy",
    layout:   "scope",
    tagline:  "A precise project brief before a single consultant is hired.",
    overview:
      "We translate your project goals into a formal scope document: a complete drawing list, consultant engagement sequence, applicable permit types, preliminary timeline, and a written scope boundary statement. Delivered before design begins so every member of your project team starts with the same information.",
    processHighlights: [
      { label: "Delivery",          value: "5-7 Days" },
      { label: "Output format",     value: "Written"  },
      { label: "Drawing list",      value: "Included" },
      { label: "Consultant list",   value: "Included" },
    ],
    steps: [
      { title: "Project Goals Review",          description: "We review your project description, site information, and intended outcomes to establish a clear picture of what the project is meant to accomplish." },
      { title: "Code and Jurisdiction Research", description: "We confirm the applicable zoning, code requirements, and permit types for the jurisdiction so the scope document reflects real regulatory constraints, not assumptions." },
      { title: "Drawing List Assembly",          description: "We compile the complete list of drawings required for permit submission, organized by discipline and sheet type, based on the project scope and jurisdiction requirements." },
      { title: "Consultant Identification",      description: "We identify every consultant the project will require (structural, civil, MEP, Title 24, soils, surveyor) and specify the phase at which each must be engaged to avoid schedule delays." },
      { title: "Timeline and Budget Framework",  description: "We develop a preliminary milestone timeline from scope finalization through permit issuance and establish a realistic framework for design and permit fees." },
      { title: "Scope Document Delivery",        description: "All outputs are compiled into a single written scope document delivered to your team with a live walkthrough session included in the engagement." },
    ],
    includes: [
      { title: "Complete Drawing List",            description: "Every drawing required for permit submission, organized by sheet type, discipline, and jurisdiction requirements." },
      { title: "Consultant Engagement Sequence",   description: "A list of required consultants with recommended engagement timing and notes on typical deliverable requirements." },
      { title: "Permit Types Required",            description: "A summary of every permit type the project requires, the issuing agency, and the general review process for each." },
      { title: "Preliminary Timeline",             description: "A milestone timeline from scope finalization through permit issuance, built on jurisdiction-specific data." },
      { title: "Scope Boundary Statement",         description: "A written statement of what is included in, and excluded from, the project scope to prevent scope creep and miscommunication." },
      { title: "Known Risk and Trigger Flags",     description: "A list of conditions that could affect the scope, cost, or timeline if left unaddressed." },
    ],
    audience: [
      { title: "General Contractors",    description: "Establish a complete project scope before engaging architects, engineers, or subcontractors." },
      { title: "Real Estate Developers", description: "Define project parameters accurately before drawing fees, consultant fees, and permit costs are committed." },
      { title: "Property Owners",        description: "Understand exactly what your project requires before signing any professional services agreements." },
      { title: "Licensed Architects",    description: "Receive a fully researched scope document that eliminates early-phase uncertainty and sets production drafting up for success from day one." },
    ],
    whyItMatters:
      "Scope creep, consultant engagement in the wrong order, budget overruns from late-added drawing requirements: these are not random outcomes. They are the predictable result of starting a project without a defined scope. A scope definition package costs far less than the rework it prevents, and it gives every member of your project team a single document to work from instead of competing assumptions.",
    relatedSlugs: ["project-strategy", "permit-pathway-analysis", "zoning-code-research"],
    faqs: [
      { question: "How is this different from a project strategy engagement?",  answer: "A project strategy engagement is a broader advisory service that covers the full strategic picture of a project from goals to execution plan. A scope definition package is a more focused deliverable: a formal written brief with a complete drawing list, consultant list, and timeline." },
      { question: "Do I need this if I already have an architect?",             answer: "If your architect has already developed a complete scope document and drawing list, you may not need this service. It is most valuable when a project is in early planning and no design professional has yet been engaged." },
      { question: "Can the scope document be used in RFPs?",                    answer: "Yes. The scope document and drawing list are designed to be shared with architects, engineers, and contractors as part of a request for proposal process." },
    ],
  },

  // ── 33. Design Options Study ──────────────────────────────────────────────────
  {
    slug:     "design-options-study",
    title:    "Design Options Study",
    category: "Strategy",
    layout:   "options",
    tagline:  "Two or three layout directions explored and compared before you commit.",
    overview:
      "We develop two or three conceptual layout alternatives for your project and deliver them as a written comparison: floor plan diagrams, rough square footage, regulatory fit analysis, and a clear summary of the tradeoffs between each option. Designed to be completed before production drawings begin.",
    processHighlights: [
      { label: "Delivery",         value: "5-7 Days"    },
      { label: "Options",          value: "2-3"         },
      { label: "Comparison",       value: "Written"     },
      { label: "Revision rounds",  value: "1 Included"  },
    ],
    steps: [
      { title: "Project Brief and Site Input",    description: "We review the project goals, parcel dimensions, zoning constraints, and any existing conditions that affect the design possibilities." },
      { title: "Option Development",              description: "We develop two or three distinct layout approaches, each representing a different organizational strategy for the program within the regulatory constraints of the site." },
      { title: "Regulatory Fit Analysis",         description: "For each option, we evaluate conformance with setbacks, lot coverage, height limits, and any other development standards that affect the layout's viability." },
      { title: "Comparative Analysis",            description: "We assess each option against the project goals, budget constraints, and permit complexity, identifying the tradeoffs between them." },
      { title: "Options Presentation",            description: "All options and analysis are compiled into a written presentation with floor plan diagrams, square footage comparison, and a written summary of each direction." },
    ],
    includes: [
      { title: "Two or Three Conceptual Floor Plan Diagrams", description: "Scaled layout diagrams for each option showing room organization, access, and key dimensions." },
      { title: "Rough Square Footage Comparison",             description: "A side-by-side square footage breakdown for each option including gross area, net area, and any accessory spaces." },
      { title: "Regulatory Fit Analysis Per Option",          description: "An assessment of each option's conformance with setbacks, lot coverage, and height limits, with notes on any variance or adjustment required." },
      { title: "Constraint and Opportunity Notes",            description: "Written notes on the structural, regulatory, and practical constraints that affected each layout direction." },
      { title: "Written Comparison Summary",                  description: "A clear, direct comparison of the tradeoffs between options: cost implications, permit complexity, square footage efficiency, and alignment with project goals." },
      { title: "Recommended Path Forward",                    description: "A written recommendation identifying the option that best aligns with the stated goals and constraints, with reasoning." },
    ],
    audience: [
      { title: "Property Owners",        description: "Understand your real options before committing to a design direction and incurring full production drawing costs." },
      { title: "General Contractors",    description: "Present a client with explored alternatives before starting drawings, preventing expensive redesign later." },
      { title: "Real Estate Developers", description: "Compare layout directions against budget and program requirements before engaging an architect for production." },
      { title: "Licensed Architects",    description: "Use as an early-phase analysis tool to document the options explored before a preferred direction is selected." },
    ],
    whyItMatters:
      "Committing to a design direction before alternatives have been explored is one of the most reliable ways to generate expensive redesign work. A layout that seems obvious at first often misses a more code-efficient or cost-effective arrangement that was never considered. A design options study forces that comparison to happen before drawings begin, when changing direction costs nothing.",
    relatedSlugs: ["feasibility-study", "project-strategy", "scope-definition"],
    faqs: [
      { question: "How detailed are the conceptual diagrams?",          answer: "The diagrams are schematic-level floor plans: scaled, dimensioned, showing room organization and key circulation paths, but not full production drawings. They are detailed enough for meaningful comparison and regulatory analysis." },
      { question: "Can I use these diagrams for permit applications?",  answer: "No. Schematic-level diagrams are for comparison and decision-making, not for permit submission. Production drawings prepared to the applicable jurisdiction's standards are required for permit applications." },
      { question: "What if I want more than three options?",            answer: "Additional options can be scoped on request. Most projects are well served by two or three distinct alternatives. We can discuss the appropriate number based on your project's specific parameters." },
    ],
  },

  // ── 34. Code Compliance Gap Analysis ─────────────────────────────────────────
  {
    slug:     "compliance-gap-analysis",
    title:    "Code Compliance Gap Analysis",
    category: "Strategy",
    layout:   "gap",
    tagline:  "Find every code exposure in your existing building before renovation begins.",
    overview:
      "We analyze the existing conditions of a building against current code requirements and the proposed renovation scope to identify non-conforming conditions, triggered upgrades, and compliance gaps that could surface at plan check. Delivered as a written findings report before production drawings begin.",
    processHighlights: [
      { label: "Delivery",          value: "3-5 Days" },
      { label: "Output",            value: "Written"  },
      { label: "Revision rounds",   value: "Included" },
      { label: "Jurisdictions",     value: "All US"   },
    ],
    steps: [
      { title: "Existing Conditions Review",       description: "We review available documentation of the existing building: as-built drawings, permit history, prior plan check correspondence, and any known non-conforming conditions." },
      { title: "Applicable Code Identification",   description: "We confirm the current code editions adopted by the jurisdiction and identify every code section applicable to the existing building type, occupancy, and construction type." },
      { title: "Non-Conformity Identification",    description: "We compare existing conditions against current code requirements to identify all non-conforming elements: setbacks, egress, structural, fire-life safety, accessibility, and energy." },
      { title: "Trigger Analysis",                 description: "We analyze the proposed renovation scope to determine which non-conforming conditions are triggered for upgrade under the substantial improvement and change-of-occupancy provisions of the applicable code." },
      { title: "Findings Report Delivery",         description: "All findings are compiled into a written report: a non-conformity register, trigger condition matrix, remediation options, and code section references for every identified gap." },
    ],
    includes: [
      { title: "Written Gap Analysis Report",      description: "A complete narrative of all identified gaps, organized by building system and code section." },
      { title: "Non-Conformity Register",          description: "A systematic list of every identified non-conforming condition, including location, description, and applicable code section." },
      { title: "Trigger Condition Matrix",         description: "A matrix showing which non-conforming conditions are triggered for upgrade by the proposed scope, based on the applicable substantial improvement and change-of-occupancy rules." },
      { title: "Remediation Recommendations",      description: "Written recommendations for resolving each triggered gap, including design options and typical cost implications." },
      { title: "Variance and Adjustment Flag List", description: "A list of conditions where variance, adjustment, or alternative means of compliance may be the most practical resolution path." },
      { title: "Code Section Reference Appendix",  description: "Full citations for every applicable code section referenced in the report, organized by building system." },
    ],
    audience: [
      { title: "General Contractors",    description: "Identify triggered upgrades before committing to a scope or price with a building owner." },
      { title: "Licensed Architects",    description: "Complete a thorough non-conformity analysis before production drawings begin to avoid mid-design scope changes." },
      { title: "Property Developers",    description: "Understand the full compliance cost of a renovation project before acquisition, budgeting, or design." },
      { title: "Building Owners",        description: "Know your building's compliance exposure before starting work so there are no surprise upgrade requirements at plan check." },
    ],
    whyItMatters:
      "Non-conforming conditions that go unidentified before permit submission become plan check corrections that stop a project cold. Triggered upgrade requirements discovered mid-construction become change orders that destroy budgets. A code compliance gap analysis answers the hard questions at the start of the project, when corrections cost time rather than money and there is still room to adjust the scope.",
    relatedSlugs: ["permit-set-preparation", "city-comments-response", "zoning-code-research"],
    faqs: [
      { question: "What documents do I need to provide?",                    answer: "Any available as-built drawings, the permit history for the property, and a description of the proposed renovation scope. If no as-built drawings exist, we can also scope an as-built documentation engagement to establish the baseline." },
      { question: "Does this analysis replace a code review by an engineer?", answer: "No. For projects involving structural, fire-life safety, or accessibility upgrades, the gap analysis findings should be reviewed with the applicable licensed engineer or accessibility consultant. The report identifies the gaps; the consultants determine the remediation approach." },
      { question: "At what point in the project should this be done?",        answer: "Before production drawings begin. The earlier the gaps are identified, the more flexibility the design team has to address them without costly changes. For complex renovations, some clients order this before acquiring the property." },
      { question: "What if the building has no permits on record?",           answer: "An unpermitted building requires a different approach: as-built documentation followed by a legalization permit strategy. We can scope both services together as part of a single engagement." },
    ],
  },


  // ── Deferred Submittal Packages ─────────────────────────────────────────
  {
    slug:     "deferred-submittal-packages",
    title:    "Deferred Submittal Packages",
    category: "Drawings",
    layout:   "deferred",
    tagline:  "Specialty system approvals after the main permit issues. We produce the deferred submittal package for building department review.",
    overview:
      "A deferred submittal is a portion of the construction documentation that is not reviewed during initial plan check and is instead submitted to the building department after the main permit is issued. Prefabricated stairs, structural steel connections, curtain wall assemblies, fire suppression layouts, and pre-engineered trusses all commonly follow this path. We assemble the package: drawings, calculations, engineering stamps, and all documentation the building department needs to issue deferred approval before the specialty system is installed.",
    processHighlights: [
      { label: "Typical delivery",   value: "5-10 days" },
      { label: "System types",       value: "All trades" },
      { label: "Jurisdictions",      value: "All US" },
      { label: "Revisions",          value: "Included" },
    ],
    steps: [
      { title: "Fabricator Coordination",    description: "We coordinate directly with the specialty subcontractor or fabricator to gather shop drawings, engineering calculations, product data sheets, and any ICC or listing documentation required by the jurisdiction." },
      { title: "Code Review",                description: "The deferred system is reviewed against the applicable building code provisions, including CBC Chapter 17 special inspection requirements, structural connection standards, and any local amendments that affect deferred submittal procedures." },
      { title: "Package Assembly",           description: "All documentation is organized per the building department's deferred submittal format requirements: cover sheet, system description, applicable code sections, engineering letter of responsibility, and all supporting technical documents." },
      { title: "Plan Check Response",        description: "When the building department issues corrections or requests additional information on the deferred package, we respond directly and revise the submittal until deferred approval is issued." },
      { title: "Inspection Coordination",   description: "After approval, we provide the contractor with the approved deferred submittal set and any special inspection requirements associated with the approved system for use during installation and inspection." },
    ],
    includes: [
      { title: "Deferred Submittal Cover Sheet",     description: "Project identification, permit number, system description, applicable code sections, engineer of record information, and confirmation that the system complies with the deferred submittal conditions on the main permit." },
      { title: "Shop Drawing Package",               description: "Fabricator-produced shop drawings coordinated and reviewed for completeness, annotated with code references and organized for building department review." },
      { title: "Engineering Calculations",           description: "Structural or system-specific calculations, stamped by the applicable licensed engineer, demonstrating compliance with the building code and the specifications referenced in the main permit." },
      { title: "Special Inspection Statement",       description: "Documentation of required special inspections per CBC Chapter 17, including inspection types, frequency, and inspector qualifications applicable to the deferred system." },
      { title: "Product and Listing Data",           description: "ICC evaluation reports, listing documentation, UL certifications, or other compliance evidence required to demonstrate that the specified system and materials meet code requirements." },
      { title: "Plan Check Response Letters",        description: "Written responses to all building department plan check comments on the deferred submittal, with markup of revised documents and direct citation of applicable code provisions." },
    ],
    audience: [
      { title: "General Contractors",       description: "Managing project timelines where specialty systems are under deferred approval and installation cannot proceed until the building department issues the deferred approval." },
      { title: "Project Managers",          description: "Coordinating complex permit closeouts with multiple open deferred items across structural, MEP, and specialty systems on commercial or mixed-use projects." },
      { title: "Architects of Record",      description: "Responsible for coordinating deferred submittals from specialty subcontractors and ensuring the packages meet the conditions set on the main building permit." },
      { title: "Specialty Subcontractors",  description: "Fabricators and installers of prefab stairs, structural steel, curtain wall, fire suppression, and elevator systems who need their shop drawings packaged into a compliant deferred submittal." },
    ],
    whyItMatters:
      "A deferred submittal that is incomplete, incorrectly formatted, or missing required engineering documentation will be rejected by the building department. Every rejection extends the schedule and delays installation. The specialty subcontractor cannot install until deferred approval is issued, and the general contractor cannot proceed with dependent scopes. A properly assembled package moves through the building department review once and comes back with an approval stamp rather than a correction list.",
    relatedSlugs: ["architectural-drafting", "structural-coordination", "permit-set-preparation"],
    faqs: [
      { question: "What triggers a deferred submittal condition on a permit?",          answer: "The building official determines which systems may be deferred during the main plan check. Typically, specialty fabricated systems, prefabricated assemblies, and systems requiring proprietary engineering are deferred because the design cannot be finalized until a fabricator is under contract." },
      { question: "Who is responsible for the deferred submittal, the GC or the sub?",  answer: "The architect of record typically holds responsibility for the deferred submittal condition on the permit, though in practice the general contractor manages the process and the specialty subcontractor provides the engineering and shop drawings. We coordinate with all parties to assemble the package." },
      { question: "How long does building department review of a deferred submittal take?", answer: "Review times vary by jurisdiction and system complexity. Simple systems in fast-track jurisdictions may receive approval in two to four weeks. Complex structural or curtain wall systems in high-volume building departments can take eight to twelve weeks. We advise on expected timelines at intake." },
    ],
  },

  // ── Fire and Life Safety Drawings ────────────────────────────────────────
  {
    slug:     "fire-life-safety-drawings",
    title:    "Fire and Life Safety Drawings",
    category: "Drawings",
    layout:   "firesafety",
    tagline:  "Code-compliant egress plans, fire-rated assembly documentation, and life safety layouts built to IBC Chapter 10 and California Title 19 standards.",
    overview:
      "We produce fire and life safety drawings for commercial occupancy permits, tenant improvements, and change-of-occupancy projects. The drawing package documents the means of egress, fire-rated wall and floor assemblies, exit sign locations, emergency lighting layout, occupant load calculations, and any other life safety requirements the building department needs to review before occupancy is granted. Every package is built to the applicable code set for the jurisdiction, occupancy classification, and construction type.",
    processHighlights: [
      { label: "Typical delivery",   value: "5-8 days" },
      { label: "Code standard",      value: "IBC/CBC" },
      { label: "Jurisdictions",      value: "All US" },
      { label: "Revisions",          value: "Included" },
    ],
    steps: [
      { title: "Egress Plan",                 description: "Dimensioned floor plan showing all exit access corridors, exit doors, required corridor widths, travel distances from any point in the occupancy to the nearest exit, and common path of egress travel calculations in compliance with IBC Chapter 10." },
      { title: "Occupant Load Calculation",   description: "Occupant load calculations for each space and the building overall, using the applicable occupant load factors per IBC Table 1004.5, with documentation of the assumed use, area, and factor for each calculated zone." },
      { title: "Fire-Rated Assembly Schedule", description: "Documentation of all required fire-rated assemblies, including rated walls, floor-ceiling assemblies, shaft enclosures, and horizontal exits, referencing UL or GA assembly numbers and indicating required ratings per the building's construction type and occupancy separation requirements." },
      { title: "Exit Sign and Emergency Lighting Plan", description: "Layout of all required exit signs and emergency lighting fixtures, showing coverage, spacing, and compliance with NFPA 101 and CBC requirements for continuous illumination of the means of egress." },
      { title: "Life Safety Compliance Narrative", description: "Written narrative summarizing the building's occupancy classification, construction type, sprinkler status, applicable code edition, and how each life safety requirement is met by the design, formatted for building department plan check review." },
    ],
    includes: [
      { title: "Egress Plan",                  description: "Fully dimensioned egress plan with exit locations, corridor widths, travel distances, and occupant load per zone, keyed to the occupant load calculation schedule." },
      { title: "Occupant Load Schedule",        description: "Tabular occupant load calculations for all spaces, showing area, occupant load factor, and calculated occupant load, with total building occupant load confirmed against egress capacity." },
      { title: "Fire-Rated Assembly Schedule", description: "Assembly schedule identifying all required rated elements by location, referenced to UL or GA assembly listings, with required fire ratings per IBC Table 508 and applicable construction type provisions." },
      { title: "Exit Sign and Emergency Lighting Plan", description: "Plan drawing showing all required exit signage and emergency lighting locations, with fixture schedules and code basis for layout." },
      { title: "Code Compliance Summary",       description: "Written summary of the applicable codes, occupancy classification, construction type, sprinkler system status, and how the design satisfies each life safety requirement." },
      { title: "Plan Check Response Support",  description: "Written responses to building department plan check comments on the fire and life safety drawings, with revised sheets and direct code citations included in the response package." },
    ],
    audience: [
      { title: "Commercial Contractors",      description: "Completing tenant improvements or occupancy changes that require fire and life safety drawings as part of the building permit application before occupancy is granted." },
      { title: "Architects with TI Scopes",   description: "Managing tenant improvement projects where fire and life safety drawing production is needed alongside the architectural and finish drawings." },
      { title: "Building Owners",             description: "Seeking an occupancy permit for a new tenant or a change-of-use in an existing space where the building department requires updated life safety documentation." },
      { title: "Mixed-Use Developers",        description: "Managing commercial components of mixed-use projects where occupancy separations, egress from commercial floors, and life safety documentation must be coordinated across multiple occupancy types." },
    ],
    whyItMatters:
      "The building department will not issue an occupancy permit until fire and life safety drawings are approved. An egress plan that miscalculates travel distance, misses a required exit, or fails to document rated assemblies correctly generates plan check corrections that delay occupancy. For a tenant waiting to open, every week of delay is lost revenue. For a developer, delayed occupancy shifts the certificate of occupancy date and can trigger penalty provisions in construction contracts. We produce fire and life safety drawings built to the applicable code set so the package is approvable on first submission.",
    relatedSlugs: ["architectural-drafting", "permit-set-preparation", "code-compliance-review"],
    faqs: [
      { question: "Do I need fire and life safety drawings for every tenant improvement?", answer: "Not always. Simple cosmetic tenant improvements in existing, fully compliant occupancies may not require new fire and life safety drawings. However, any change of occupancy, increase in occupant load, modification of exit locations, or alteration to rated assemblies will require updated documentation. We can review your project scope and confirm what is required." },
      { question: "What code edition applies to my project?",                              answer: "The applicable code edition depends on the jurisdiction and the permit application date. Most California jurisdictions are on the 2022 CBC, which is based on the 2021 IBC. Some local amendments apply. We confirm the applicable code set and local amendments for every project before production begins." },
      { question: "Can you produce fire alarm or sprinkler design drawings?",              answer: "Fire alarm and sprinkler system design requires a licensed fire protection engineer or NICET-certified technician and is outside our scope. We produce the architectural life safety drawings that are required alongside those systems, including the egress plan, occupant load calculations, and fire-rated assembly documentation." },
    ],
  },

  // ── Signage Permit Drawings ──────────────────────────────────────────────
  {
    slug:     "signage-permit-drawings",
    title:    "Signage Permit Drawings",
    category: "Drawings",
    layout:   "signage",
    tagline:  "Permit drawings for every sign type. The fabricator is ready. We produce the package that gets the permit issued.",
    overview:
      "Most signs require a permit before installation can begin. Channel letters, monument signs, blade signs, awnings with text, and window graphics all fall under sign permit requirements in most jurisdictions. The building department requires drawings that document the sign location, dimensions, mounting method, structural attachment, illumination type, and wattage before issuing the permit. We produce signage permit drawing packages for every sign type, formatted to the specific requirements of the applicable jurisdiction.",
    processHighlights: [
      { label: "Typical delivery",   value: "3-5 days" },
      { label: "Sign types",         value: "All types" },
      { label: "Jurisdictions",      value: "All US" },
      { label: "Revisions",          value: "Included" },
    ],
    steps: [
      { title: "Sign Type and Jurisdiction Confirmation", description: "We confirm the sign type, mounting location, jurisdiction, and any design review overlay zones, historical district designations, or specific sign ordinance provisions that apply to the location before production begins." },
      { title: "Site and Building Documentation",        description: "We document the building facade, existing sign conditions, property lines, right-of-way setbacks, and all dimensional information needed to produce accurate clearance and location drawings for the sign permit application." },
      { title: "Sign Permit Drawing Production",         description: "Complete permit drawing set produced to the building department's sign permit requirements: location plan, elevation drawings, structural details, electrical details where required, and all code compliance documentation." },
      { title: "Submittal Package Assembly",             description: "The complete permit package is assembled with all required forms, fees schedules if provided, landlord consent documentation if applicable, and any additional jurisdiction-specific requirements for a complete submission." },
      { title: "Plan Check Response",                    description: "When the building department issues corrections or requests additional information, we respond directly with revised drawings and written responses until the sign permit is issued." },
    ],
    includes: [
      { title: "Site Plan",                  description: "Plan view showing the sign location on the property, distances to property lines, right-of-way setbacks, and the building footprint, scaled and dimensioned per the jurisdiction's sign permit requirements." },
      { title: "Elevation Drawing",          description: "Building elevation showing the sign location, dimensions, height from grade, horizontal placement, and distance from building edges and adjacent signs." },
      { title: "Sign Detail Drawing",        description: "Detail drawings showing sign construction, letter or panel dimensions, total sign area calculation, cabinet depth, and all mounting hardware and attachment details." },
      { title: "Structural Attachment Detail", description: "Structural detail showing the sign attachment to the building or ground structure, including fastener type and spacing, backing requirements, and confirmation of wind load compliance per the applicable building code." },
      { title: "Electrical and Illumination Schedule", description: "Documentation of illumination type, lamp or LED specifications, total wattage, electrical connection method, and any photometric data required by the jurisdiction for illuminated sign permits." },
      { title: "Plan Check Response Package", description: "Written responses to building department plan check comments, revised drawings with revision clouds, and direct code citations, assembled into a complete resubmittal package." },
    ],
    audience: [
      { title: "Retail Brands and Franchises",   description: "Opening new locations where the landlord has approved the sign design but the building department permit is the remaining step before fabrication and installation." },
      { title: "Restaurant and Hospitality Owners", description: "Installing new exterior signage, blade signs, or awning graphics where a sign permit is required and the fabricator cannot begin installation without the approved permit in hand." },
      { title: "Sign Fabricators and Installers",  description: "Fabricators who manufacture and install signs but need a licensed architectural drawing package to submit for the building permit before installation can be scheduled." },
      { title: "Commercial Property Managers",     description: "Managing sign permit applications for multiple tenants across a portfolio of retail or commercial properties where signage requirements must meet both jurisdictional codes and property-level criteria." },
    ],
    whyItMatters:
      "The sign fabricator is ready to start production. The landlord has signed off. The brand standards are approved. The permit is the only remaining step, and a missed or incorrect drawing detail sends the application back to the start. Jurisdictions vary significantly in their sign permit requirements: some require structural engineering stamps, some require electrical load calculations, some require photometric studies for illuminated signs. We know what each jurisdiction requires and produce packages that move through plan check without unnecessary corrections.",
    relatedSlugs: ["architectural-drafting", "permit-set-preparation", "as-built-documentation"],
    faqs: [
      { question: "Does every sign require a permit?",                         answer: "Requirements vary by jurisdiction and sign type. Most externally illuminated signs, signs over a certain square footage threshold, and signs mounted to structures require permits. Temporary signs, some window graphics below a size threshold, and certain real estate signs are commonly exempt. We can confirm what applies to your specific sign type and location." },
      { question: "Can you handle sign permits in cities with design review?", answer: "Yes. In cities with design review boards or architectural review requirements, signage must receive design review approval before the building permit is issued. We produce drawings to the design review submission requirements and can support the presentation process. Some design review boards require renderings; we can coordinate those separately." },
      { question: "My fabricator has shop drawings. Can you use those?",       answer: "Yes. If the fabricator has produced shop drawings with dimensions, material specifications, and electrical details, we can use that documentation as the basis for the permit drawings. We incorporate the fabricator's information and produce the permit package format required by the building department." },
    ],
  },

  // ── Interior Detail Package ───────────────────────────────────────────────
  {
    slug:     "interior-detail-package",
    title:    "Interior Detail Package",
    category: "Drawings",
    layout:   "interior",
    tagline:  "Kitchen, bath, stair, and millwork elevations built to pass interior plan check.",
    overview:
      "Interior Detail Packages provide the room-level drawing documentation that building departments and inspectors require for kitchen remodels, bathroom renovations, stair replacements, and custom millwork scopes. We produce complete interior elevation sets, cabinet layout drawings, stair section details, shower waterproofing details, and millwork dimension schedules. Every sheet is drawn to the standard required by the applicable jurisdiction, so the package moves through plan check without corrections.",
    processHighlights: [
      { label: "Turnaround",    value: "5-7 Days"  },
      { label: "Jurisdictions", value: "All US"    },
      { label: "Sheet format",  value: "24x36 PDF" },
      { label: "Revisions",     value: "Included"  },
    ],
    steps: [
      { title: "Scope Confirmation",     description: "We confirm the rooms, fixture types, cabinet configurations, and stair conditions in scope. Any field measurement data, photos, or existing drawings you have are incorporated at intake." },
      { title: "Elevation Drawing",      description: "Each room is drawn in elevation at the required scale. Upper and lower cabinet heights are dimensioned. Appliance locations, outlets, and tile extents are shown. Window and door openings are referenced." },
      { title: "Detail Drawing",         description: "Where required by the jurisdiction or by the scope, we produce detail drawings: shower pan assembly, stair section with handrail profile, window sill flashing at wet walls, and fire blocking at stair soffits." },
      { title: "Coordination and Notes", description: "All drawings are coordinated against the floor plan and against each other. Jurisdiction-specific notes are added: waterproofing membrane callouts, blocking requirements, ADA notes where applicable." },
      { title: "Package Assembly",       description: "All sheets are numbered, indexed, and compiled into a PDF package formatted for the building department's submission requirements." },
    ],
    includes: [
      { title: "Interior Elevations",         description: "Dimensioned elevation drawings for all rooms in scope, showing cabinet layout, tile extents, appliance locations, and opening dimensions." },
      { title: "Cabinet Layout and Schedule", description: "Plan view and elevation of cabinet configurations with heights, depths, door swing directions, and hardware callouts where required." },
      { title: "Stair Section and Details",   description: "Vertical section through the stair showing rise, run, handrail height, profile, and guardrail conditions. Code compliance notes included." },
      { title: "Shower and Wet Area Details", description: "Waterproofing membrane assembly details for shower pans and wet walls, including membrane type, termination, and curb conditions." },
      { title: "Millwork Dimensions",         description: "Dimension schedule for custom millwork elements showing finished heights, depths, setbacks, and clearances from adjacent walls and fixtures." },
      { title: "Compliance Notes",            description: "Jurisdiction-specific notes covering accessibility requirements, fire blocking locations, ventilation provisions, and any applicable code sections." },
    ],
    audience: [
      { title: "Remodel Contractors",              description: "Need interior elevation drawings and detail sheets before pulling a kitchen, bath, or stair remodel permit." },
      { title: "Property Owners",                  description: "Undertaking high-end kitchen or bath renovations that require interior permit documentation for the building department." },
      { title: "Interior Designers",               description: "Specifying custom cabinetry and millwork and needing permit-ready drawings that coordinate design intent with code compliance." },
      { title: "Architects on Production Support", description: "Handling design and needing a drafting partner to produce interior elevation and detail packages for the permit set." },
    ],
    faqs: [
      { question: "What information do I need to provide?",                     answer: "Room dimensions or an existing floor plan, appliance and fixture specifications, cabinet layout preferences, and any jurisdiction requirements you already know about. We work from sketches, photos, or finished design documents." },
      { question: "Are stair drawings included if my project has a new stair?", answer: "Yes. Stair sections, handrail profiles, and guardrail details are included when a stair is in scope. We draw the stair to the current IBC or IRC requirements and add jurisdiction-specific notes." },
      { question: "Do you handle ADA-compliant bathroom drawings?",             answer: "Yes. For commercial bathroom scopes or residential projects subject to accessible design requirements, we draw elevations to ADA standards and include applicable code notes and clearance dimensions." },
    ],
    whyItMatters:
      "The plan checker assigned to a kitchen or bathroom remodel is looking at three things: the waterproofing details, the cabinet heights, and the ventilation. If any one of those is missing or unclear, the package comes back as a correction. Interior detail drawings that address exactly what the plan checker needs to see are the only way to move a remodel permit through on the first review. Generic floor plans are not enough.",
    relatedSlugs: ["architectural-drafting", "as-built-documentation", "contractor-bid-package"],
  },

  // ── Site Plan Package ─────────────────────────────────────────────────────
  {
    slug:     "site-plan-package",
    title:    "Site Plan Package",
    category: "Drawings",
    layout:   "siteplan",
    tagline:  "Jurisdiction-researched site plans built to pass first review at any building department.",
    overview:
      "A Site Plan Package provides the overhead property documentation required for building permit applications, site improvement permits, and planning submissions. We research the parcel, confirm setback requirements, locate utilities and easements, and produce a complete site plan drawn to the jurisdiction's submission standards. The plan checker opens the site plan first. Ours gives them what they need to approve it.",
    processHighlights: [
      { label: "Turnaround",      value: "3-5 Days" },
      { label: "Jurisdictions",   value: "All US"   },
      { label: "Parcel research", value: "Included" },
      { label: "Revisions",       value: "Included" },
    ],
    steps: [
      { title: "Parcel Research",               description: "We pull current GIS parcel data, recorded dimensions, zoning designation, and applicable setback requirements before drawing begins. Utility easements from the title report are incorporated." },
      { title: "Existing Conditions Drafting",  description: "We draw the existing site: property lines with dimensions, existing structures, trees, utilities, access points, and any easements or encumbrances identified in research." },
      { title: "Proposed Scope Documentation",  description: "Proposed structures, additions, site improvements, parking, drainage, and grading changes are added to the plan and dimensioned from property lines to confirm setback compliance." },
      { title: "Jurisdiction Compliance Check", description: "The completed plan is reviewed against the applicable setback requirements, parking standards, ADA accessibility requirements, and any other jurisdiction-specific site plan requirements." },
      { title: "Package Assembly and Delivery", description: "The final site plan is formatted for submission, with title block, scale bar, north arrow, code notes, and sheet index. Delivered as a jurisdiction-ready PDF." },
    ],
    includes: [
      { title: "Dimensioned Site Plan",          description: "Complete overhead plan showing property lines, setback dimensions, existing and proposed structures, and all required site elements at the jurisdiction's required scale." },
      { title: "Setback Analysis",               description: "All required setbacks confirmed against the applicable zoning, with dimensions shown from every structure to every applicable property line." },
      { title: "Parking Layout",                 description: "Parking stall count, dimensions, ADA stall location, aisle widths, and accessible path of travel shown where required by the jurisdiction." },
      { title: "Utility and Easement Reference", description: "Location of known utilities, easements, and encumbrances shown on the plan and referenced in the project notes." },
      { title: "Grading and Drainage Notation",  description: "Existing and proposed grades noted where required. Drainage direction and swale locations shown for jurisdictions that require surface drainage documentation." },
      { title: "Title Block and Code Notes",     description: "Project identification, applicable codes, zoning designation, parcel number, scale, and all required administrative information formatted for the building department." },
    ],
    audience: [
      { title: "Contractors on Site Improvements",  description: "Pulling permits for parking lots, retaining walls, hardscaping, or site grading and needing a complete site plan for submission." },
      { title: "Civil Engineers",                   description: "Who need architectural site documentation to accompany civil sheets in a permit package." },
      { title: "Developers Pre-Vertical",           description: "Completing site improvements before vertical construction begins and needing a permit-ready site plan for the site work phase." },
      { title: "Property Owners",                   description: "Adding structures, fences, pools, or accessory buildings that require a site plan for the building permit application." },
    ],
    faqs: [
      { question: "What do I need to provide?",                            answer: "The parcel address, jurisdiction, and a description of the proposed site work or structure. Any existing drawings you have are helpful but not required. We pull the parcel data and establish existing conditions from our own research." },
      { question: "Do you provide topographic surveys?",                   answer: "No. If grading or drainage requires licensed surveyor data, we will note that requirement at intake. For most building permit site plans, GIS elevation data and site photos are sufficient for the level of detail required." },
      { question: "Can this be used for a planning department submittal?", answer: "Yes. We format the site plan for the specific submission requirements of the reviewing agency. Planning department submittals often require additional notation, context maps, or photo sheets, which we include when the scope calls for them." },
    ],
    whyItMatters:
      "The site plan is the first sheet every plan checker opens. Setback dimensions that are wrong or missing, access that is unclear, a parking count that does not add up: any one of these sends the package back for correction before a single structural sheet has been reviewed. A site plan built from verified parcel research and drawn to the jurisdiction's exact requirements does not come back for site plan corrections. It lets the review move forward.",
    relatedSlugs: ["architectural-drafting", "permit-set-preparation", "as-built-documentation"],
  },

  // ── Record Drawing Updates ────────────────────────────────────────────────
  {
    slug:     "record-drawing-updates",
    title:    "Record Drawing Updates",
    category: "Drawings",
    layout:   "record",
    tagline:  "As-built drawing updates that close the gap between the approved set and what was actually built.",
    overview:
      "Record Drawing Updates bring the approved permit drawings into alignment with the conditions that exist in the field after construction. When field changes, RFI responses, or contractor substitutions have altered what was built from what was approved, the inspector cannot sign off on drawings that do not match. We receive the approved drawing set, document the field changes, and deliver a coordinated record set with revision clouds, delta markers, and a dated revision block ready for final inspection.",
    processHighlights: [
      { label: "Turnaround",      value: "5-7 Days"      },
      { label: "CO ready",        value: "Yes"           },
      { label: "Revision format", value: "Delta + Cloud" },
      { label: "Jurisdictions",   value: "All US"        },
    ],
    steps: [
      { title: "Approved Set Intake",       description: "We receive the full approved drawing set and a description or documentation of all field changes: written change orders, RFI logs, contractor redlines, or site photos documenting the as-built conditions." },
      { title: "Change Identification",     description: "Each field change is mapped to the specific sheet or sheets affected. We prepare a change log listing every deviation, the sheet it affects, and the nature of the revision required." },
      { title: "Record Drawing Production", description: "The approved drawings are updated to show as-built conditions. Each change is indicated with a revision cloud and delta marker. All modified sheets receive an updated revision block with revision number, date, and description." },
      { title: "Coordination Review",       description: "All revised sheets are cross-checked for coordination: structural changes reflected on architectural, MEP routing changes coordinated with plan, dimension changes checked against site plan setbacks." },
      { title: "Delivery",                  description: "The completed record set is delivered as a jurisdiction-ready PDF, with a revision log documenting every change, the affected sheet, and the delta number for reference at inspection." },
    ],
    includes: [
      { title: "Updated As-Built Drawings",      description: "All sheets from the approved set that required revision, updated to reflect as-built conditions with revision clouds and delta markers on every changed element." },
      { title: "Revision Block Updates",         description: "Completed revision blocks on all modified sheets with revision number, date, description, and signature fields ready for the engineer or contractor of record." },
      { title: "Revision Log",                   description: "A complete log of all revisions made, organized by sheet, delta number, and description of change. Submitted with the record set for the inspector's reference." },
      { title: "Coordination Verification",      description: "Cross-sheet coordination check confirming that all changes are reflected consistently across architectural, structural, and MEP sheets." },
      { title: "Change Order Cross-Reference",   description: "Notation tying each revision delta to the corresponding change order or RFI for audit trail documentation." },
      { title: "Jurisdiction Submission Format", description: "Record set formatted to the specific submission requirements of the building department handling the final inspection." },
    ],
    audience: [
      { title: "General Contractors Closing Out",   description: "Need a record drawing set that matches field conditions before the inspector conducts the final inspection for the CO." },
      { title: "Project Managers Pursuing CO",      description: "Managing closeout on projects where field changes were made and the approved drawings no longer reflect what was built." },
      { title: "Developers with Stalled Closeouts", description: "Projects that are built and occupied but cannot obtain the CO because the approved and as-built conditions do not match." },
      { title: "Property Owners Post-Construction", description: "Who completed permitted work with field modifications and now need the drawing record updated to close the permit." },
    ],
    faqs: [
      { question: "What do I need to provide?",                             answer: "The full approved drawing set (PDF or original files) and documentation of field changes: change orders, redlined drawings, RFI logs, or site photos. The more documentation you provide, the faster we can produce the record set." },
      { question: "Can you handle large sets with many changes?",           answer: "Yes. We structure the engagement around the change log, not the sheet count. Projects with extensive field changes are scoped at intake based on the number of affected sheets and the complexity of coordination required." },
      { question: "Does the record set need to be stamped by an engineer?", answer: "For structural changes, yes. The engineer of record typically needs to stamp revised structural sheets. Our record set is prepared for engineer review and stamping; we coordinate directly with the engineer if needed." },
    ],
    whyItMatters:
      "Field changes are normal. What is not normal is trying to get a CO with drawings that do not match what the inspector is looking at. The approved set shows one thing; the building shows another. The inspector notes the discrepancy, the CO is withheld, and the project stalls. Record drawing updates close that gap. They are the last document the project needs before it is done.",
    relatedSlugs: ["as-built-documentation", "construction-administration", "permit-set-preparation"],
  },

  // ── Demolition Permit Drawings ────────────────────────────────────────────
  {
    slug:     "demolition-permit-drawings",
    title:    "Demolition Permit Drawings",
    category: "Drawings",
    layout:   "demolition",
    tagline:  "Permit-ready demolition drawings that satisfy every jurisdiction requirement before a wall comes down.",
    overview:
      "Demolition work requires its own permit set in most jurisdictions, and that permit set is more demanding than most contractors expect. We produce the complete demolition drawing package: existing conditions, scope of demolition clearly delineated with standard notation, structural notes where required, and asbestos and hazardous material notations where applicable. Every sheet is produced to the jurisdiction's specific submission requirements so the permit issues without correction cycles.",
    processHighlights: [
      { label: "Turnaround",    value: "3-5 Days" },
      { label: "Sheet count",   value: "Varies"   },
      { label: "Jurisdictions", value: "All US"   },
      { label: "Corrections",   value: "None"     },
    ],
    includes: [
      { title: "Existing Conditions Plan",    description: "Fully dimensioned existing floor plan showing all walls, openings, structural elements, and building systems that are documented as existing before any work begins." },
      { title: "Demolition Plan",             description: "Existing plan overlaid with demolition notation: walls to be removed shown hatched or dashed, elements to remain clearly indicated, scope boundary defined." },
      { title: "Structural Demo Notes",       description: "General notes addressing structural elements within the demolition scope, shoring and bracing requirements, and sequencing requirements the contractor must follow." },
      { title: "Hazardous Material Notation", description: "Callouts and notes addressing asbestos-containing materials, lead paint, and other hazardous materials within the demolition scope where documentation is required by the jurisdiction." },
      { title: "Site Logistics Notes",        description: "Notes addressing debris removal routes, dumpster placement, dust and noise control requirements, and utility isolation requirements where required for the permit." },
      { title: "Jurisdiction Compliance",     description: "All sheets formatted to the jurisdiction's exact submission requirements: sheet size, title block format, seal and signature requirements, and submittal checklist compliance." },
    ],
    audience: [
      { title: "General Contractors",   description: "Pulling demo permits before a major renovation, addition, or ground-up project where selective or full demolition is required." },
      { title: "Developers",            description: "Demolishing existing structures on acquired sites as the first phase of a redevelopment project." },
      { title: "Property Owners",       description: "Removing unpermitted additions, damaged structures, or obsolete outbuildings that require a formal permit to demolish." },
      { title: "Architects",            description: "Needing demo drawing production support on projects where the design scope does not include demolition document production." },
    ],
    faqs: [
      { question: "When is a demolition permit required?",         answer: "Most jurisdictions require a demo permit for any structural demolition, full building removal, or demolition that exposes exterior conditions. Some jurisdictions also require permits for interior demolition beyond a certain scope. We confirm the requirement for your jurisdiction before we begin." },
      { question: "Do I need asbestos testing before the drawings?", answer: "If the building was constructed before 1980, most jurisdictions require an asbestos survey before a demo permit is issued. We can include the notation placeholders in the drawing set while you coordinate the survey, so the drawings are ready when the survey results are returned." },
      { question: "Can you produce demo drawings from field measurements?", answer: "Yes. If no existing drawings are available, we can produce the existing conditions plan from field measurements or from our own site documentation before producing the demolition overlay." },
      { question: "What if demolition is part of a larger renovation permit?", answer: "Demolition can be combined with a renovation or addition permit as a separate sheet within the overall package. We coordinate the demolition drawings with the full permit set so the plan checker reviews both scopes together." },
    ],
    whyItMatters:
      "Demolition without a permit creates problems that follow a property for years. Stop-work orders that freeze the entire project. Fines that run per day until the violation is corrected. Certificate of occupancy withheld at the end of a project because unpermitted demolition was discovered during inspection. Title complications that surface at sale or refinancing. A demolition permit costs less than an afternoon of project downtime. The drawings that support it should not be an obstacle.",
    relatedSlugs: ["architectural-drafting", "permit-set-preparation", "code-compliance-review"],
  },

  // ── Redline to CAD Conversion ─────────────────────────────────────────────
  {
    slug:     "redline-to-cad",
    title:    "Redline to CAD Conversion",
    category: "Drawings",
    layout:   "redline",
    tagline:  "Field markups and hand sketches converted into production-ready CAD drawings within days.",
    overview:
      "When field conditions diverge from the approved drawings, someone has to close the gap before the next submission. We take any form of red-line markup, contractor sketch, RFI response, or site photo and convert it into clean, dimensioned, production-ready CAD drawings formatted to the original drawing set standards. No re-drafting the entire set. No waiting for an in-house drafter. Send us the markups and we send back drawings the building department will accept.",
    processHighlights: [
      { label: "Turnaround",      value: "2-4 Days" },
      { label: "Source formats",  value: "Any"      },
      { label: "Output format",   value: "DWG + PDF" },
      { label: "Revisions",       value: "Included" },
    ],
    steps: [
      { title: "Submit Your Markups",    description: "Send us the red-line drawings, field sketches, annotated PDFs, or site photos by email or file share. No specific format required. Include the original drawing files if available." },
      { title: "Scope Confirmation",     description: "We review the submitted markups, identify every change required, and confirm the scope with you before production begins. If anything is unclear, we ask before drawing, not after." },
      { title: "CAD Production",         description: "Each markup is converted into clean CAD geometry on the appropriate sheet. Dimensions are verified against the markup. New elements are drawn to standard conventions and notation." },
      { title: "Quality Review",         description: "Completed sheets are reviewed against the original markups for accuracy and against the original drawing set for coordination. Dimension chains are checked, notation is standardized, and revision clouds are applied." },
      { title: "Delivery",               description: "Clean drawings delivered as DWG and PDF. If the project requires permit submission, we format the sheets to the original submission standards with updated revision blocks." },
    ],
    includes: [
      { title: "CAD Conversion",           description: "All marked-up elements converted to clean, dimensioned CAD geometry matching the style and standards of the original drawing set." },
      { title: "Dimension Verification",   description: "All new dimensions checked for consistency, coordination with adjacent elements, and conformance with the markup intent." },
      { title: "Standard Notation",        description: "All new elements annotated to the drawing set's notation standards: materials, finishes, details, and code references as required." },
      { title: "Revision Clouds",          description: "Revision clouds and delta markers applied to all changed areas with a revision block update on affected sheets." },
      { title: "DWG Source Files",         description: "Editable DWG files delivered along with PDFs so the drawing set can continue to be updated as the project progresses." },
      { title: "Coordination Check",       description: "Cross-sheet coordination review confirming that changes on one sheet are reflected on all related sheets." },
    ],
    audience: [
      { title: "General Contractors",    description: "Converting field change orders, RFI responses, and contractor markups into updated drawings for building department resubmission." },
      { title: "Architects",             description: "Outsourcing redline incorporation on projects with heavy construction administration workloads or tight revision turnaround requirements." },
      { title: "Developers",             description: "Updating drawing sets after phased scope changes, value engineering decisions, or owner-directed field changes." },
      { title: "Building Owners",        description: "Bringing outdated drawing sets up to current conditions before sale, lease, or permit resubmission." },
    ],
    faqs: [
      { question: "What formats do you accept?",                   answer: "Anything: hand-drawn red-lines on printed drawings, annotated PDFs, phone photos of field sketches, verbal descriptions with measurements. We work with whatever documentation is available." },
      { question: "Do you need the original DWG files?",           answer: "Preferred but not required. If original files are not available, we can work from the PDF set and reproduce the affected sheets to match the original drawing standards." },
      { question: "How precise do my red-lines need to be?",       answer: "They need to communicate the intent. If a dimension is missing, we will ask. If a detail is unclear, we will flag it before drawing. You do not need to be a drafter to produce usable markups." },
      { question: "Can you handle large sets with many changes?",  answer: "Yes. Large sets with extensive revisions are quoted per sheet or per scope. Send us the set and a summary of the change scope and we will confirm the turnaround and price before you commit." },
    ],
    whyItMatters:
      "The gap between what was approved and what was built is not a problem until it is a very expensive one. Inspectors who find conditions that do not match the drawings stop work. Building departments that receive resubmissions with uncoordinated redlines return the package for correction. The cost of clean, accurate drawings at the point of change is a fraction of the cost of a stop-work order, a correction cycle, or a delayed certificate of occupancy. Redlines that sit in a folder are a liability. Redlines converted to CAD are a solved problem.",
    relatedSlugs: ["as-built-documentation", "record-drawing-updates", "permit-set-preparation"],
  },

] as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getRelatedServices(service: Service): Service[] {
  return service.relatedSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is Service => s !== undefined);
}
