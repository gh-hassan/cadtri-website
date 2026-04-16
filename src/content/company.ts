// All site-wide company data lives here.
// Edit this file to update copy, contact info, and brand details across the entire site.

export const company = {
  name: "CADTRI",
  legalName: "CADTRI Drafting & Permit Services",
  tagline: "Precision Drafting. Seamless Permits.",
  description:
    "CADTRI delivers complete, permit-ready architectural drawing packages for residential and commercial projects. We handle production drafting and permit coordination so project teams can keep their schedules moving.",
  email: "info@cadtri.com",
  phone: "(941) 300-1033",
  website: "https://cadtri.com",
  address: {
    street: "",
    city: "Austin",
    state: "TX",
    zip: "",
    country: "USA",
  },
  social: {
    linkedin: "",
    instagram: "",
  },
  founded: "",
  license: "",
} as const;

export type Company = typeof company;
