// All site-wide company data lives here.
// Edit this file to update copy, contact info, and brand details across the entire site.

export const company = {
  name: "CADTRI",
  legalName: "CADTRI Drafting & Permit Services",
  tagline: "Precision Drafting. Seamless Permits.",
  description:
    "Permit-ready architectural drawings for residential and commercial projects nationwide. Expert drafting and permit coordination serving 40+ states, with primary markets in Florida, Texas, and North Carolina.",
  email: "info@cadtri.com",
  phone: "(737) 237-2736",
  website: "https://www.cadtri.com",
  address: {
    street: "5900 Balcones Drive Ste 100",
    city: "Austin",
    state: "TX",
    zip: "78731",
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
