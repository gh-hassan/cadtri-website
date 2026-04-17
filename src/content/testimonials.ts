// Testimonials — replace placeholder entries with real client quotes before launch.
// Set showTestimonials to false to hide the section entirely until you have real content.

export const showTestimonials = false; // ← flip to true once you have real quotes

export interface Testimonial {
  readonly quote: string;
  readonly name: string;
  readonly role: string;
  readonly company: string;
}

export const testimonials: readonly Testimonial[] = [
  // PLACEHOLDER — replace with a real client quote
  {
    quote:
      "Replace this with an actual client quote. Something specific about what CADTRI delivered, how it helped the project, and why they would recommend working with the team.",
    name: "Client Name",
    role: "General Contractor",
    company: "Company Name",
  },
  // PLACEHOLDER — replace with a real client quote
  {
    quote:
      "Replace this with an actual client quote. Specific details about a project outcome, timeline, or permit result work well here. Real quotes convert better than polished ones.",
    name: "Client Name",
    role: "Real Estate Developer",
    company: "Company Name",
  },
  // PLACEHOLDER — replace with a real client quote
  {
    quote:
      "Replace this with an actual client quote. Architects and licensed contractors who can speak to the technical quality and coordination of the documentation are particularly credible here.",
    name: "Client Name",
    role: "Licensed Architect",
    company: "Company Name",
  },
];
