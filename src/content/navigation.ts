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
      // Drawings
      { label: "Architectural Drafting",      href: "/services/architectural-drafting"      },
      { label: "As-Built Documentation",      href: "/services/as-built-documentation"      },
      // Permitting
      { label: "Permit Set Preparation",      href: "/services/permit-set-preparation"      },
      { label: "ADU Permit Packages",         href: "/services/adu-permit-packages"         },
      { label: "Solar & EV Permit Packages",  href: "/services/solar-ev-permit-packages"    },
      { label: "City Comments Response",      href: "/services/city-comments-response"      },
      // Coordination
      { label: "Structural Coordination",     href: "/services/structural-coordination"     },
      { label: "MEP Coordination",            href: "/services/mep-coordination"            },
      // Visualization
      { label: "Renderings & Visualization",  href: "/services/renderings-visualization"    },
      { label: "Digital Walkthroughs",        href: "/services/digital-walkthroughs"        },
      { label: "3D Staging",                  href: "/services/3d-staging"                  },
    ],
  },
  { label: "Industries", href: "/about", activePath: "/industries" },
  { label: "Process",    href: "/process"   },
  { label: "Portfolio",  href: "/portfolio" },
];

// ─── Footer columns ────────────────────────────────────────────────────────────

export const footerColumns: readonly FooterColumn[] = [
  {
    heading: "Services",
    links: [
      { label: "Architectural Drafting",     href: "/services/architectural-drafting"     },
      { label: "Permit Set Preparation",     href: "/services/permit-set-preparation"     },
      { label: "ADU Permit Packages",        href: "/services/adu-permit-packages"        },
      { label: "Solar & EV Permits",         href: "/services/solar-ev-permit-packages"   },
      { label: "City Comments Response",     href: "/services/city-comments-response"     },
      { label: "Entitlement Support",        href: "/services/entitlement-support"        },
      { label: "MEP Coordination",           href: "/services/mep-coordination"           },
      { label: "Renderings & Visualization", href: "/services/renderings-visualization"   },
      { label: "Digital Walkthroughs",       href: "/services/digital-walkthroughs"       },
      { label: "3D Staging",                 href: "/services/3d-staging"                 },
      { label: "View All Services →",        href: "/services"                            },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About",     href: "/about"     },
      { label: "Process",   href: "/process"   },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Contact",   href: "/contact"   },
    ],
  },
];
