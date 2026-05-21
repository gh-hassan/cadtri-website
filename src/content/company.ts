// All site-wide company data lives here.
// Edit this file to update copy, contact info, and brand details across the entire site.

export const company = {
  name: "CADTRI",
  legalName: "CADTRI Drafting & Permit Services",
  tagline: "Precision Drafting. Seamless Permits.",
  description:
    "CADTRI delivers permit-ready architectural drawings for residential and commercial projects across California. Professional drafting and permit coordination — built to clear plan check.",
  email: "info@cadtri.com",
  phone: "(941) 300-1033",
  website: "https://www.cadtri.com",
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
