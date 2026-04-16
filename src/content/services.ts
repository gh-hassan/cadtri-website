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
  | "strategy";

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
        description: "We start with your idea — what you want to build, on what site, and why. We document the project program, establish your constraints (budget, timeline, use), and identify the critical unknowns that need to be resolved before design can begin.",
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
        description: "We identify every consultant your project will require — structural, MEP, civil, soils, energy, accessibility — and build a coordination matrix that sequences their involvement correctly, preventing the expensive mistake of bringing in consultants out of order.",
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
        answer: "A feasibility study typically answers one question: can this project be built? Project Strategy goes further. It defines the full roadmap for how to build it — consultants, sequencing, permit pathway, phased scope, and decision points from start to permit-ready.",
      },
      {
        question: "Do I need this before starting design?",
        answer: "Yes, in most cases. Design that begins without a defined permit pathway and consultant plan frequently has to backtrack when previously unknown requirements surface. The cost of a strategy engagement is small compared to rework.",
      },
      {
        question: "What if my project changes after the strategy is delivered?",
        answer: "The roadmap is a living document. If your scope changes materially, we can update the strategy document. Minor changes — adjustments to program or phasing — are usually covered under 30-day follow-up support.",
      },
      {
        question: "Can CADTRI execute the work defined in the strategy?",
        answer: "Yes. Most clients who engage us for Project Strategy continue with CADTRI for permit set preparation, drafting, coordination, and response services. The strategy gives us a shared understanding of your project from the start.",
      },
    ],
    whyItMatters:
      "Most project delays and cost overruns do not come from bad design. They come from a project that was never properly planned. Missing consultant coordination, a permit pathway that was never mapped, approvals that were discovered too late — these are strategic failures, not technical ones. A defined project strategy removes ambiguity before it becomes expensive.",
    relatedSlugs: ["permit-set-preparation", "pre-application-meeting-prep", "entitlement-support"],
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
