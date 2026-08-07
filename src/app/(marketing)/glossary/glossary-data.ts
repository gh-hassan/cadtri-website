export type GlossaryCategory =
  | "CAD & Technology"
  | "Drafting & Drawings"
  | "Permitting & Regulatory"
  | "Structural & Engineering"
  | "Building & Construction"
  | "Codes & Standards";

export interface GlossaryTerm {
  term: string;
  abbr?: string;
  definition: string;
  category: GlossaryCategory;
}

export const glossaryTerms: GlossaryTerm[] = [
  // ─── CAD & Technology ───────────────────────────────────────────────────────
  {
    term: "Computer-Aided Design",
    abbr: "CAD",
    definition:
      "Software used by architects, engineers, and drafters to create precise 2D drawings and 3D models of buildings and structures. Replaces hand-drafting with digital precision and real-time editing.",
    category: "CAD & Technology",
  },
  {
    term: "Building Information Modeling",
    abbr: "BIM",
    definition:
      "A 3D model-based process that gives architects, engineers, and contractors tools to plan, design, build, and manage buildings. BIM embeds real-world data — materials, dimensions, costs — into a shared digital model.",
    category: "CAD & Technology",
  },
  {
    term: "DWG",
    definition:
      "The native file format for AutoCAD drawings. Stands for 'drawing.' DWG files contain all geometric, annotation, and metadata information for a CAD drawing and are the industry standard for sharing construction documents.",
    category: "CAD & Technology",
  },
  {
    term: "External Reference",
    abbr: "Xref",
    definition:
      "A drawing file that is linked (not copied) into the current CAD file. Changes made to the Xref source file automatically update in the host drawing — useful for coordinating architectural, structural, and MEP drawings.",
    category: "CAD & Technology",
  },
  {
    term: "Title Block",
    definition:
      "The standardized border area on a drawing sheet containing project name, sheet number, revision history, firm name, and other identifying information. Required on all permit-set sheets.",
    category: "CAD & Technology",
  },
  {
    term: "Viewport",
    definition:
      "In CAD, a framed window within a paper space layout that displays a portion of the model at a specific scale. Multiple viewports allow different views of the same model on a single sheet.",
    category: "CAD & Technology",
  },
  {
    term: "Layer",
    definition:
      "A logical grouping system within a CAD file that organizes drawing elements (walls, dimensions, annotations) into controllable categories. Each layer can be turned on/off, locked, or given its own color and line weight.",
    category: "CAD & Technology",
  },
  {
    term: "Hatch Pattern",
    definition:
      "A repeating pattern (lines, dots, crosshatch) used in CAD drawings to indicate material types in section cuts — for example, diagonal lines for concrete, dotted patterns for insulation, or brick coursing for masonry.",
    category: "CAD & Technology",
  },
  {
    term: "Plot Style",
    definition:
      "Settings that control how CAD entities are printed or exported — including line weight, color, and screening. CTB (color-dependent) and STB (named) are the two standard plot style table types.",
    category: "CAD & Technology",
  },
  {
    term: "Revit",
    definition:
      "Autodesk's BIM software used to create intelligent 3D building models. Changes made to one view (floor plan, section, elevation) automatically update all other views, reducing coordination errors across a drawing set.",
    category: "CAD & Technology",
  },
  {
    term: "Parametric Design",
    definition:
      "A design method where geometry is defined by relationships and constraints (parameters) rather than fixed dimensions. Changing one parameter automatically adjusts connected elements throughout the model.",
    category: "CAD & Technology",
  },
  {
    term: "Point Cloud",
    definition:
      "A dataset of XYZ coordinates captured by 3D laser scanners of an existing building or site. Architects use point clouds as the basis for as-built drawings, allowing precise measurement of existing conditions without manual field work.",
    category: "CAD & Technology",
  },
  {
    term: "PDF Overlay",
    definition:
      "A technique where a scanned or exported PDF is underlaid in a CAD file and traced to create editable geometry. Commonly used when redlines or hand sketches need to be converted to CAD.",
    category: "CAD & Technology",
  },

  // ─── Drafting & Drawings ────────────────────────────────────────────────────
  {
    term: "Floor Plan",
    definition:
      "A scaled 2D drawing showing a horizontal cut through a building at roughly 4 feet above floor level, revealing the layout of rooms, walls, doors, windows, and fixed elements. The most fundamental drawing in a construction document set.",
    category: "Drafting & Drawings",
  },
  {
    term: "Elevation",
    definition:
      "A flat, scaled drawing showing the exterior or interior face of a building without perspective distortion. Exterior elevations show all four sides of a structure; interior elevations show kitchen, bath, and other detailed wall faces.",
    category: "Drafting & Drawings",
  },
  {
    term: "Section",
    definition:
      "A drawing that shows a vertical cut through a building, revealing the internal relationship between floors, roofs, walls, and structural elements. Building sections establish overall heights; wall sections show construction layer detail.",
    category: "Drafting & Drawings",
  },
  {
    term: "Detail Drawing",
    definition:
      "A large-scale drawing zoomed into a specific connection, assembly, or condition — like a window head, door jamb, deck ledger, or eave. Details communicate how materials meet and how assemblies are built.",
    category: "Drafting & Drawings",
  },
  {
    term: "Site Plan",
    definition:
      "A bird's-eye view drawing showing the property, building footprint, setbacks, parking, utilities, drainage, landscaping, and adjacent streets. Required for most permit applications and zoning review.",
    category: "Drafting & Drawings",
  },
  {
    term: "As-Built Drawing",
    definition:
      "Updated construction documents that reflect the actual conditions of a completed building — including field changes made during construction. Required for record-keeping, future renovations, and permit closeout in many jurisdictions.",
    category: "Drafting & Drawings",
  },
  {
    term: "Reflected Ceiling Plan",
    abbr: "RCP",
    definition:
      "A drawing that shows the ceiling layout as if reflected onto the floor — like looking up at a mirror on the floor. Shows ceiling heights, light fixture locations, sprinkler heads, HVAC diffusers, and soffits.",
    category: "Drafting & Drawings",
  },
  {
    term: "Schematic Design",
    abbr: "SD",
    definition:
      "The first formal design phase, where overall building layout, massing, and concept are established through diagrams and rough drawings. SDs are for direction-setting, not permit submission.",
    category: "Drafting & Drawings",
  },
  {
    term: "Design Development",
    abbr: "DD",
    definition:
      "The second design phase, refining SD concepts into more defined drawings with materials, systems, and dimensions. DD drawings are detailed enough to estimate cost but not yet final for permit.",
    category: "Drafting & Drawings",
  },
  {
    term: "Construction Documents",
    abbr: "CDs",
    definition:
      "The complete, finalized set of drawings and specifications used to obtain permits and instruct contractors during construction. CDs are the legal contract documents between owner, architect, and contractor.",
    category: "Drafting & Drawings",
  },
  {
    term: "Permit Set",
    definition:
      "A subset of construction documents specifically formatted and organized to meet building department submission requirements. Includes all sheets required for plan check review — typically site plan, floor plans, elevations, sections, structural, and applicable engineering.",
    category: "Drafting & Drawings",
  },
  {
    term: "Redline",
    definition:
      "Handwritten or marked-up corrections, revisions, or field changes drawn (traditionally in red ink) directly on printed drawings. Redlines are given to a drafter to update the CAD file. CADTRI converts redlined drawings into production-quality CAD.",
    category: "Drafting & Drawings",
  },
  {
    term: "Shop Drawing",
    definition:
      "Detailed fabrication drawings submitted by a contractor or manufacturer showing exactly how a specific item will be built — for example, steel connections, pre-cast panels, or custom millwork. Reviewed and approved by the architect before fabrication.",
    category: "Drafting & Drawings",
  },
  {
    term: "Keynote",
    definition:
      "A numbered or lettered symbol placed on drawings that references a corresponding note in a legend or schedule. Keynotes keep drawings clean by replacing long text annotations with concise callout numbers.",
    category: "Drafting & Drawings",
  },
  {
    term: "Schedules",
    definition:
      "Tabular charts on construction drawings listing repetitive information in a consistent format — such as door schedules (door number, size, material, hardware), window schedules, or room finish schedules.",
    category: "Drafting & Drawings",
  },
  {
    term: "Specification",
    abbr: "Spec",
    definition:
      "Written project requirements describing quality standards, materials, installation methods, and workmanship expectations. Specs work alongside drawings: drawings show WHERE and WHAT; specifications describe HOW and to what standard.",
    category: "Drafting & Drawings",
  },

  // ─── Permitting & Regulatory ────────────────────────────────────────────────
  {
    term: "Building Permit",
    definition:
      "Official authorization issued by a local building department (AHJ) allowing construction, renovation, or demolition to begin. Permits protect public safety by triggering inspection of work against approved plans.",
    category: "Permitting & Regulatory",
  },
  {
    term: "Plan Check",
    definition:
      "The formal review of submitted permit drawings by the building department plan reviewer. The reviewer verifies that the proposed work complies with applicable building codes, zoning ordinances, and local amendments before issuing a permit.",
    category: "Permitting & Regulatory",
  },
  {
    term: "Plan Check Correction",
    definition:
      "A written list of deficiencies, missing information, or code violations identified by the plan reviewer that must be resolved before a permit is issued. CADTRI prepares complete correction response packages addressing every comment.",
    category: "Permitting & Regulatory",
  },
  {
    term: "Authority Having Jurisdiction",
    abbr: "AHJ",
    definition:
      "The organization, office, or individual responsible for enforcing code requirements — typically the local building department, fire marshal, or state agency. AHJ decisions govern what is acceptable in a permit submission.",
    category: "Permitting & Regulatory",
  },
  {
    term: "Certificate of Occupancy",
    abbr: "CO",
    definition:
      "A document issued by the AHJ certifying that a building meets all applicable codes and is safe for occupancy. Required before a building can legally be used or occupied after construction or major renovation.",
    category: "Permitting & Regulatory",
  },
  {
    term: "Accessory Dwelling Unit",
    abbr: "ADU",
    definition:
      "A secondary residential unit on the same lot as a primary single-family home. Can be detached, attached, or converted from existing space (like a garage). California and many states have streamlined ADU permitting to address housing shortages.",
    category: "Permitting & Regulatory",
  },
  {
    term: "Junior Accessory Dwelling Unit",
    abbr: "JADU",
    definition:
      "A smaller ADU, maximum 500 sq ft, created entirely within an existing single-family residence (including the garage). JADUs must include a separate entrance and an efficiency kitchen but may share a bathroom with the primary unit.",
    category: "Permitting & Regulatory",
  },
  {
    term: "Setback",
    definition:
      "The minimum required distance between a building or structure and a property line, street right-of-way, or other boundary. Front, rear, and side setbacks are established by the zoning code and vary by parcel and zone.",
    category: "Permitting & Regulatory",
  },
  {
    term: "Floor Area Ratio",
    abbr: "FAR",
    definition:
      "The ratio of a building's total floor area to the size of its lot. If a 5,000 sq ft lot has an FAR of 0.5, the maximum allowable building floor area is 2,500 sq ft. FAR is a primary zoning tool controlling density.",
    category: "Permitting & Regulatory",
  },
  {
    term: "Zoning",
    definition:
      "A system of land-use regulations that divides a municipality into zones (residential, commercial, industrial, mixed-use) and prescribes permitted uses, building heights, setbacks, FAR, and density for each zone.",
    category: "Permitting & Regulatory",
  },
  {
    term: "Variance",
    definition:
      "A discretionary approval allowing a property owner to deviate from strict zoning or code requirements due to unique site conditions that create hardship. Variances require a public hearing and findings of fact.",
    category: "Permitting & Regulatory",
  },
  {
    term: "Conditional Use Permit",
    abbr: "CUP",
    definition:
      "A discretionary land-use approval that allows a use not normally allowed in a zone, subject to conditions imposed by the planning department. Examples include daycares in residential zones or drive-throughs in commercial zones.",
    category: "Permitting & Regulatory",
  },
  {
    term: "Entitlement",
    definition:
      "The discretionary approval process granting the right to develop land in a specific way — including zoning approvals, general plan amendments, variances, and environmental review. Entitlements precede building permits.",
    category: "Permitting & Regulatory",
  },
  {
    term: "Deferred Submittal",
    definition:
      "A portion of design work (typically specialty systems like stairs, fire sprinklers, or post-installed anchors) deferred from the initial permit set and submitted separately for approval after the main permit is issued.",
    category: "Permitting & Regulatory",
  },
  {
    term: "Over-the-Counter Permit",
    abbr: "OTC",
    definition:
      "A permit issued on the same day of application, typically for simple or pre-screened scopes of work. The building department reviews drawings at the counter rather than routing them for full plan check review.",
    category: "Permitting & Regulatory",
  },
  {
    term: "Pre-Application Meeting",
    definition:
      "A scheduled conference with building department staff before a permit application is submitted. Pre-app meetings clarify requirements, identify potential issues early, and reduce plan check correction cycles.",
    category: "Permitting & Regulatory",
  },
  {
    term: "Assessor's Parcel Number",
    abbr: "APN",
    definition:
      "A unique numeric identifier assigned to every real property parcel by the county tax assessor. APNs appear on permit applications, title reports, and are used to locate specific parcels in public records.",
    category: "Permitting & Regulatory",
  },
  {
    term: "Right of Way",
    abbr: "ROW",
    definition:
      "A strip of land dedicated to public use for streets, sidewalks, utilities, or other infrastructure. Structures may not encroach into the ROW, and setbacks are typically measured from the ROW line, not the curb.",
    category: "Permitting & Regulatory",
  },

  // ─── Structural & Engineering ────────────────────────────────────────────────
  {
    term: "Structural Engineer",
    abbr: "SE",
    definition:
      "A licensed professional engineer specializing in the analysis and design of load-bearing systems. Structural engineers design foundations, framing, shear walls, and other elements that resist gravity and lateral forces.",
    category: "Structural & Engineering",
  },
  {
    term: "MEP",
    definition:
      "Abbreviation for Mechanical, Electrical, and Plumbing — the three primary building systems engineering disciplines. MEP drawings coordinate ductwork, electrical panels, piping, and other systems within the architecture.",
    category: "Structural & Engineering",
  },
  {
    term: "Shear Wall",
    definition:
      "A structural wall element designed to resist lateral forces from wind or seismic loads by acting as a vertical diaphragm. Shear walls transfer lateral forces from the roof and floors down to the foundation.",
    category: "Structural & Engineering",
  },
  {
    term: "Load Path",
    definition:
      "The sequence of structural members through which gravity and lateral loads travel from the roof, down through floors, walls, columns, and beams, to the foundation. A continuous, uninterrupted load path is a fundamental structural requirement.",
    category: "Structural & Engineering",
  },
  {
    term: "Foundation Plan",
    definition:
      "A structural drawing showing the size, shape, reinforcement, and location of footings, grade beams, slabs, and other foundation elements. Required for most permit submissions involving new construction or additions.",
    category: "Structural & Engineering",
  },
  {
    term: "Soils Report",
    abbr: "Geotech",
    definition:
      "A geotechnical engineering report that investigates subsurface soil and rock conditions at a project site. The soils report informs foundation design decisions — bearing capacity, required depth, and site-specific seismic conditions.",
    category: "Structural & Engineering",
  },
  {
    term: "Lateral Analysis",
    definition:
      "Structural calculations evaluating a building's resistance to horizontal forces — primarily wind and earthquake (seismic) loads. Lateral analysis determines the size and location of shear walls, moment frames, and diaphragms.",
    category: "Structural & Engineering",
  },
  {
    term: "Diaphragm",
    definition:
      "A structural element (floor, roof, or wall) that acts as a horizontal plate distributing lateral forces to vertical shear walls or frames. Plywood sheathing on a wood-framed roof or floor system is a common diaphragm.",
    category: "Structural & Engineering",
  },
  {
    term: "Holdown",
    definition:
      "A metal connector used to anchor shear wall posts to the foundation, preventing the shear wall from overturning under lateral loads. Required at the ends of shear walls in seismic design.",
    category: "Structural & Engineering",
  },

  // ─── Building & Construction ─────────────────────────────────────────────────
  {
    term: "General Contractor",
    abbr: "GC",
    definition:
      "The primary contractor responsible for managing and executing construction on a project. The GC holds the building permit, hires and coordinates subcontractors, orders materials, and is accountable to the owner for delivery.",
    category: "Building & Construction",
  },
  {
    term: "Request for Information",
    abbr: "RFI",
    definition:
      "A formal written question submitted by the contractor to the architect or engineer during construction seeking clarification on design intent, drawing conflicts, or field conditions not addressed in the contract documents.",
    category: "Building & Construction",
  },
  {
    term: "Bid Package",
    definition:
      "A complete set of documents issued to contractors for pricing a project. Typically includes drawings, specifications, bid form, and project schedule. A clear, complete bid package drives competitive and accurate pricing.",
    category: "Building & Construction",
  },
  {
    term: "Scope of Work",
    abbr: "SOW",
    definition:
      "A written description of all the tasks, deliverables, and boundaries of a specific project or subcontract. Defines what is included and excluded, preventing disputes during construction.",
    category: "Building & Construction",
  },
  {
    term: "Punch List",
    definition:
      "A list of minor items that must be completed or corrected by the contractor before final payment is released. Punch list items are typically small deficiencies found during the architect's substantial completion walk.",
    category: "Building & Construction",
  },
  {
    term: "Substantial Completion",
    definition:
      "The stage of construction when the work is sufficiently complete (per contract documents) so the owner can occupy or use the building for its intended purpose. Triggers the start of the warranty period and contractor's right to final payment.",
    category: "Building & Construction",
  },
  {
    term: "Change Order",
    abbr: "CO",
    definition:
      "A written amendment to the construction contract signed by owner and contractor, adjusting the contract sum, schedule, or scope of work to reflect approved changes made after contract execution.",
    category: "Building & Construction",
  },
  {
    term: "Submittal",
    definition:
      "Product data, samples, shop drawings, or other information submitted by the contractor for architect review before items are ordered or fabricated. Submittals confirm that proposed materials meet specification requirements.",
    category: "Building & Construction",
  },
  {
    term: "Tenant Improvement",
    abbr: "TI",
    definition:
      "Construction work done inside a commercial space to customize it for a specific tenant's use — including partition walls, ceilings, lighting, MEP modifications, and finishes. TI permits are among the most common commercial permit types.",
    category: "Building & Construction",
  },
  {
    term: "Owner-Builder",
    definition:
      "A homeowner who pulls their own building permit rather than hiring a licensed contractor. Owner-builders take on the contractor's legal responsibility for the work and may face resale disclosure requirements.",
    category: "Building & Construction",
  },

  // ─── Codes & Standards ──────────────────────────────────────────────────────
  {
    term: "International Building Code",
    abbr: "IBC",
    definition:
      "The model building code published by the International Code Council (ICC), adopted in some form by most US states and jurisdictions. The IBC sets baseline structural, fire safety, and life-safety requirements for commercial buildings.",
    category: "Codes & Standards",
  },
  {
    term: "Title 24",
    definition:
      "California's Title 24 Part 6 energy code — one of the most stringent in the nation. Sets minimum requirements for insulation, windows, HVAC efficiency, lighting, and solar for new and renovated buildings.",
    category: "Codes & Standards",
  },
  {
    term: "Americans with Disabilities Act",
    abbr: "ADA",
    definition:
      "Federal civil rights law requiring that public accommodations, commercial facilities, and transportation be accessible to people with disabilities. ADA accessibility requirements govern ramp slopes, door widths, counter heights, restroom dimensions, and more.",
    category: "Codes & Standards",
  },
  {
    term: "Occupancy Group",
    definition:
      "A code classification that defines how a building or space is used — for example, R-3 (single-family residential), A-2 (restaurant), B (office), or S-1 (storage). Occupancy group determines the required fire ratings, exits, sprinklers, and construction type.",
    category: "Codes & Standards",
  },
  {
    term: "Construction Type",
    definition:
      "A fire-resistive classification system (Types I–V) defined by building codes that rates how resistant a building's structural frame and exterior walls are to fire. Type I (reinforced concrete) is the most fire-resistant; Type V (wood frame) is the least.",
    category: "Codes & Standards",
  },
  {
    term: "Fire Rating",
    definition:
      "The duration (in hours) that an assembly — wall, floor, ceiling, door — is required to resist fire exposure before structural failure or flame penetration. Ratings range from 20 minutes to 4 hours depending on occupancy and construction type.",
    category: "Codes & Standards",
  },
  {
    term: "CalGreen",
    definition:
      "California's mandatory green building standards code (CALGreen / CALGreen Title 24 Part 11), requiring minimum sustainability measures in new construction: water efficiency, construction waste recycling, EV-ready parking, and indoor air quality.",
    category: "Codes & Standards",
  },
  {
    term: "National Fire Protection Association",
    abbr: "NFPA",
    definition:
      "A nonprofit organization that publishes fire, electrical, and life-safety codes adopted widely across the US — including NFPA 101 (Life Safety Code) and NFPA 13 (Sprinkler Systems). Many AHJs adopt NFPA codes alongside the IBC.",
    category: "Codes & Standards",
  },
  {
    term: "Energy Compliance Report",
    definition:
      "A document (often generated by compliance software like EnergyPro or CBECC) demonstrating that a proposed building meets the energy efficiency requirements of the applicable energy code. Required for permit submission in California and many other states.",
    category: "Codes & Standards",
  },
  {
    term: "Lot Coverage",
    definition:
      "The percentage of a lot's total area that is covered by structures (buildings, garages, covered patios). Lot coverage limits are established by zoning ordinances to ensure adequate open space, light, and drainage on each parcel.",
    category: "Codes & Standards",
  },
];

export const CATEGORIES: GlossaryCategory[] = [
  "CAD & Technology",
  "Drafting & Drawings",
  "Permitting & Regulatory",
  "Structural & Engineering",
  "Building & Construction",
  "Codes & Standards",
];

export const CATEGORY_COLORS: Record<GlossaryCategory, { bg: string; text: string; border: string }> = {
  "CAD & Technology":       { bg: "#FFF3E8", text: "#C04C00", border: "#FFC99A" },
  "Drafting & Drawings":    { bg: "#F0F7FF", text: "#1A5FAD", border: "#AACFF7" },
  "Permitting & Regulatory":{ bg: "#F0FDF4", text: "#15803D", border: "#86EFAC" },
  "Structural & Engineering":{ bg: "#FFF9E8", text: "#92400E", border: "#FCD34D" },
  "Building & Construction":{ bg: "#FDF4FF", text: "#7C3AED", border: "#D8B4FE" },
  "Codes & Standards":      { bg: "#FFF0F0", text: "#B91C1C", border: "#FECACA" },
};
