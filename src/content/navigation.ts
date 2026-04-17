// Navigation data — single source of truth for header and footer links.

export interface NavLink {
  label: string;
  href: string;
  /**
   * Override the path used to determine active state.
   * Useful when href redirects to another page (e.g. Industries → /about).
   */
  activePath?: string;
  /** Sub-links render as a dropdown (desktop) or accordion (mobile). */
  children?: Omit<NavLink, "children">[];
}

export interface FooterColumn {
  heading: string;
  links: Pick<NavLink, "label" | "href">[];
}

// ─── Primary navigation (header) ──────────────────────────────────────────────
// Services dropdown shows key services — full catalog at /services

export const navLinks: readonly NavLink[] = [
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      // Strategy
      { label: "Project Strategy",           href: "/services/project-strategy"           },
      { label: "Feasibility Study",          href: "/services/feasibility-study"          },
      { label: "Zoning and Code Research",   href: "/services/zoning-code-research"       },
      { label: "Permit Pathway Analysis",    href: "/services/permit-pathway-analysis"    },
      { label: "Pre-Purchase Assessment",    href: "/services/pre-purchase-assessment"    },
      { label: "Scope Definition Package",   href: "/services/scope-definition"           },
      { label: "Design Options Study",       href: "/services/design-options-study"       },
      { label: "Code Compliance Gap Analysis", href: "/services/compliance-gap-analysis"  },
      // Drawings
      { label: "Architectural Drafting",      href: "/services/architectural-drafting"      },
      { label: "As-Built Documentation",      href: "/services/as-built-documentation"      },
      { label: "Contractor Bid Package",      href: "/services/contractor-bid-package"      },
      // Permitting
      { label: "Permit Set Preparation",      href: "/services/permit-set-preparation"      },
      { label: "ADU Permit Packages",         href: "/services/adu-permit-packages"         },
      { label: "Home Addition Packages",      href: "/services/home-addition-packages"      },
      { label: "Garage Conversion Packages",  href: "/services/garage-conversion-packages"  },
      { label: "Solar & EV Permit Packages",  href: "/services/solar-ev-permit-packages"    },
      { label: "City Comments Response",      href: "/services/city-comments-response"      },
      // Coordination
      { label: "Structural Coordination",     href: "/services/structural-coordination"     },
      { label: "MEP Coordination",            href: "/services/mep-coordination"            },
      { label: "Construction Administration", href: "/services/construction-administration"  },
      // Visualization
      { label: "Renderings & Visualization",  href: "/services/renderings-visualization"    },
      { label: "Digital Walkthroughs",        href: "/services/digital-walkthroughs"        },
      { label: "3D Staging",                  href: "/services/3d-staging"                  },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    children: [
      { label: "Residential",  href: "/industries/residential"  },
      { label: "Commercial",   href: "/industries/commercial"   },
      { label: "Hospitality",  href: "/industries/hospitality"  },
      { label: "Mixed-Use",    href: "/industries/mixed-use"    },
    ],
  },
  { label: "Process",    href: "/process"    },
  { label: "Resources",  href: "/resources"  },
  { label: "Portfolio",  href: "/portfolio"  },
];

// ─── Mega menu (desktop Services panel) ───────────────────────────────────────

export interface MegaMenuService {
  label: string;
  href: string;
  description: string;
}

export interface MegaMenuCategory {
  heading: string;
  services: readonly MegaMenuService[];
}

export const servicesMegaMenu: readonly MegaMenuCategory[] = [
  {
    heading: "Strategy",
    services: [
      { label: "Project Strategy",              href: "/services/project-strategy",              description: "From raw idea to build-ready roadmap"          },
      { label: "Feasibility Study",             href: "/services/feasibility-study",             description: "Site analysis before you commit"               },
      { label: "Zoning and Code Research",      href: "/services/zoning-code-research",          description: "What your parcel allows, in writing"           },
      { label: "Permit Pathway Analysis",       href: "/services/permit-pathway-analysis",       description: "Every permit, agency, and timeline mapped"     },
      { label: "Pre-Purchase Assessment",       href: "/services/pre-purchase-assessment",       description: "Development potential before you buy"          },
      { label: "Scope Definition Package",      href: "/services/scope-definition",              description: "Drawing list and consultant brief, upfront"    },
      { label: "Design Options Study",          href: "/services/design-options-study",          description: "Two or three layouts compared before commit"   },
      { label: "Code Compliance Gap Analysis",  href: "/services/compliance-gap-analysis",       description: "Every code exposure found before plan check"   },
    ],
  },
  {
    heading: "Drawings",
    services: [
      { label: "Architectural Drafting",     href: "/services/architectural-drafting",        description: "Complete permit drawing sets"            },
      { label: "As-Built Documentation",     href: "/services/as-built-documentation",        description: "Existing conditions on record"           },
      { label: "Contractor Bid Package",     href: "/services/contractor-bid-package",        description: "Bid-ready procurement documents"         },
      { label: "Demolition Permit Drawings", href: "/services/demolition-permit-drawings",    description: "Scope-specific demo permit sets"         },
      { label: "Redline to CAD",             href: "/services/redline-to-cad",                description: "Markups converted to permit drawings"    },
      { label: "Tenant Improvement Package", href: "/services/tenant-improvement-packages",   description: "Full TI permit documentation"            },
      { label: "Interior Detail Package",    href: "/services/interior-detail-package",       description: "Millwork, details, and finish schedules" },
      { label: "Site Plan Package",          href: "/services/site-plan-package",             description: "Code-compliant site plans"               },
      { label: "Record Drawing Updates",     href: "/services/record-drawing-updates",        description: "As-built drawing reconciliation"         },
      { label: "Deferred Submittal Package", href: "/services/deferred-submittal-packages",   description: "Post-permit deferred approvals"          },
      { label: "Fire & Life Safety Drawings",href: "/services/fire-life-safety-drawings",     description: "Egress, sprinkler, and alarm plans"      },
      { label: "Signage Permit Drawings",    href: "/services/signage-permit-drawings",       description: "Code-compliant sign permit packages"     },
    ],
  },
  {
    heading: "Permitting",
    services: [
      { label: "Permit Set Preparation",       href: "/services/permit-set-preparation",       description: "Submission-ready permit packages"      },
      { label: "City Comments Response",       href: "/services/city-comments-response",       description: "Plan check correction packages"        },
      { label: "ADU Permit Packages",          href: "/services/adu-permit-packages",          description: "Accessory dwelling unit permits"       },
      { label: "Home Addition Packages",       href: "/services/home-addition-packages",       description: "Room and second-story additions"       },
      { label: "Garage Conversion Packages",   href: "/services/garage-conversion-packages",   description: "Garage to habitable space"             },
      { label: "Solar & EV Permit Packages",   href: "/services/solar-ev-permit-packages",     description: "Solar array and EV charger permits"    },
      { label: "Pool & Spa Permits",           href: "/services/pool-spa-permits",             description: "Pools, spas, and water features"       },
      { label: "Interior Remodel Packages",    href: "/services/interior-remodel-packages",    description: "Kitchen, bath, and whole-home remodels" },
      { label: "STR Conversion Permits",       href: "/services/short-term-rental-permits",    description: "Short-term rental compliance permits"  },
      { label: "Accessory Structure Permits",  href: "/services/accessory-structure-permits",  description: "Detached garages, studios, outbuildings" },
      { label: "Title 24 Energy Compliance",   href: "/services/title-24-energy-compliance",   description: "California energy code documentation"  },
    ],
  },
  {
    heading: "Coordination",
    services: [
      { label: "Structural Coordination",      href: "/services/structural-coordination",      description: "Structural and architectural alignment" },
      { label: "MEP Coordination",             href: "/services/mep-coordination",             description: "Mechanical, electrical, plumbing"      },
      { label: "Construction Administration",  href: "/services/construction-administration",  description: "RFIs, submittals, field sketches"      },
      { label: "Entitlement Support",          href: "/services/entitlement-support",          description: "Discretionary approval packages"       },
      { label: "Pre-Application Meeting Prep", href: "/services/pre-application-meeting-prep", description: "Jurisdiction meeting preparation"      },
      { label: "Historic District Submissions", href: "/services/historic-district-submissions", description: "Certificate of appropriateness packages" },
      { label: "BIM Coordination",             href: "/services/bim-coordination",             description: "Multi-trade model clash detection"     },
    ],
  },
  {
    heading: "Visualization",
    services: [
      { label: "Renderings & Visualization", href: "/services/renderings-visualization", description: "Photorealistic architectural renders"    },
      { label: "Digital Walkthroughs",       href: "/services/digital-walkthroughs",     description: "Interactive 3D walkthroughs"             },
      { label: "3D Staging",                 href: "/services/3d-staging",               description: "Virtual furniture and finish staging"    },
    ],
  },
];

// ─── Footer columns ────────────────────────────────────────────────────────────

export const footerColumns: readonly FooterColumn[] = [
  {
    heading: "Services",
    links: [
      { label: "Project Strategy",           href: "/services/project-strategy"           },
      { label: "Architectural Drafting",     href: "/services/architectural-drafting"     },
      { label: "Permit Set Preparation",       href: "/services/permit-set-preparation"       },
      { label: "ADU Permit Packages",          href: "/services/adu-permit-packages"          },
      { label: "Solar & EV Permits",           href: "/services/solar-ev-permit-packages"     },
      { label: "Pool & Spa Permits",           href: "/services/pool-spa-permits"             },
      { label: "Interior Remodel Packages",    href: "/services/interior-remodel-packages"    },
      { label: "City Comments Response",       href: "/services/city-comments-response"       },
      { label: "Title 24 Energy Compliance",   href: "/services/title-24-energy-compliance"   },
      { label: "Entitlement Support",          href: "/services/entitlement-support"          },
      { label: "MEP Coordination",             href: "/services/mep-coordination"             },
      { label: "BIM Coordination",             href: "/services/bim-coordination"             },
      { label: "Historic District Submissions", href: "/services/historic-district-submissions" },
      { label: "Renderings & Visualization",   href: "/services/renderings-visualization"     },
      { label: "Feasibility Study",            href: "/services/feasibility-study"            },
      { label: "Construction Administration",  href: "/services/construction-administration"  },
      { label: "Contractor Bid Package",       href: "/services/contractor-bid-package"       },
      { label: "View All Services →",          href: "/services"                              },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About",      href: "/about"      },
      { label: "Industries", href: "/industries" },
      { label: "Process",    href: "/process"    },
      { label: "Resources",  href: "/resources"  },
      { label: "Book a Call", href: "/book"      },
      { label: "Portfolio",  href: "/portfolio"  },
      { label: "Contact",    href: "/contact"    },
    ],
  },
];
