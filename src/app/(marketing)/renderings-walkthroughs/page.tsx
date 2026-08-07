import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { getServiceBySlug, getServiceHref } from "@/content/services";
import { company } from "@/content/company";
import {
  BreadcrumbJsonLd,
  ServiceJsonLd,
  FaqJsonLd,
} from "@/lib/json-ld";

export const metadata: Metadata = {
  title: { absolute: "Renderings & Video Walkthroughs | 3D Visualization | CADTRI" },
  description:
    "Architectural renderings and video walkthroughs for residential and commercial projects: exterior and interior renders, 3D staging, and interactive walkthroughs.",
  alternates: { canonical: "/renderings-walkthroughs" },
};

// ─── Page data ────────────────────────────────────────────────────────────────

const visualScope: { title: string; description: string }[] = [
  {
    title: "Exterior Renderings",
    description:
      "Full-color exterior views showing massing, material finishes, fenestration, and site context, produced directly from the architectural drawings.",
  },
  {
    title: "Interior Renderings",
    description:
      "Interior perspective renderings for remodels, tenant improvements, and commercial buildouts, showing finishes and lighting as designed.",
  },
  {
    title: "3D Staging",
    description:
      "Empty or unfinished rooms virtually furnished and styled into photorealistic, fully staged spaces for listing and marketing use.",
  },
  {
    title: "Interactive Video Walkthroughs",
    description:
      "Navigable first-person tours through a proposed building or interior, delivered as a hosted web link or exported video.",
  },
  {
    title: "Site Context Visualization",
    description:
      "Site plan and approach views showing the project within its surrounding parcel, street frontage, and neighboring context.",
  },
  {
    title: "Presentation Packages",
    description:
      "Formatted rendering and walkthrough sets assembled for design review boards, HOA approval, or investor and client presentations.",
  },
];

const visualizationProcess: { title: string; description: string }[] = [
  {
    title: "Source Drawing Intake",
    description:
      "We start from the current architectural drawings, or site photographs for staging and marketing work, so the visualization matches what is actually being built.",
  },
  {
    title: "3D Model Build",
    description:
      "A 3D model is built to match the plans, elevations, and sections, establishing accurate massing, proportions, and dimensions before any finish work begins.",
  },
  {
    title: "Materials, Lighting, and Staging",
    description:
      "Specified materials, finishes, and lighting conditions are applied to the model. For staging and interior work, furniture and styling are added to match the target audience.",
  },
  {
    title: "Rendering and Animation Production",
    description:
      "Still renderings, staged interior views, or a full walkthrough animation are produced from the finished model at the required resolution and camera angles.",
  },
  {
    title: "Review and Delivery",
    description:
      "One revision round is included to address material changes, layout adjustments, or presentation feedback before final delivery in your required formats.",
  },
];

const useCases: { title: string; description: string; href: string; linkLabel: string }[] = [
  {
    title: "Design Review and HOA Approval",
    description:
      "Review boards, planning commissions, and HOAs approve projects faster when they can see the finished result rather than interpret construction drawings alone.",
    href: "/services/renderings-visualization",
    linkLabel: "Renderings and Visualization",
  },
  {
    title: "Investor and Lender Presentations",
    description:
      "Renderings and walkthroughs give investors and lenders a confident, first-person understanding of the project before construction begins.",
    href: "/services/digital-walkthroughs",
    linkLabel: "Digital Walkthroughs",
  },
  {
    title: "Pre-Construction Sales and Leasing",
    description:
      "Prospective buyers and tenants can experience the finished unit or space well before it physically exists, supporting sales and leasing conversations earlier.",
    href: "/services/digital-walkthroughs",
    linkLabel: "Digital Walkthroughs",
  },
  {
    title: "Real Estate Listing Marketing",
    description:
      "Vacant or under-construction properties are staged into photorealistic, fully furnished imagery for listing platforms and marketing materials.",
    href: "/services/3d-staging",
    linkLabel: "3D Staging",
  },
];

const visualizationPitfalls: { title: string; description: string }[] = [
  {
    title: "Renderings Produced Before Drawings Are Final",
    description:
      "Visualization built from an early design that changes before permit, requiring rework to match what actually gets approved and built.",
  },
  {
    title: "Materials Inconsistent with the Permit Set",
    description:
      "Renderings showing finishes or configurations that don't match what's specified in the architectural drawings, creating confusion during approval or sales.",
  },
  {
    title: "No Site Context Shown",
    description:
      "A beautiful building rendering with no indication of the surrounding parcel, street, or neighboring structures, leaving reviewers to guess at scale and fit.",
  },
  {
    title: "Missing Multiple View Angles",
    description:
      "A single hero shot when the audience, a review board or a buyer, needs several angles to understand the space or the massing.",
  },
  {
    title: "Walkthroughs That Are Too Long or Unfocused",
    description:
      "A video tour that wanders through every space at the same pace instead of guiding the viewer through what actually matters for the presentation.",
  },
  {
    title: "No Mobile-Optimized Delivery",
    description:
      "An interactive walkthrough that only works on desktop, when most review board members and prospective buyers will open it on a phone.",
  },
  {
    title: "Staging That Doesn't Match the Target Buyer",
    description:
      "Furniture and styling selected without considering who is actually going to view the listing, a family home staged like a downtown loft.",
  },
  {
    title: "Renderings That Don't Match What Gets Built",
    description:
      "Marketing imagery that oversells finishes or features beyond what the permitted drawings and specifications actually support.",
  },
];

const faqs: { question: string; answer: string }[] = [
  {
    question: "What's the difference between a rendering and a video walkthrough?",
    answer:
      "A rendering is a still image, typically an exterior or interior view. A video walkthrough is a navigable, first-person tour through the space, delivered as an interactive web link or an exported video file.",
  },
  {
    question: "Do renderings need final permitted drawings, or can they be produced earlier?",
    answer:
      "We can start from schematic or preliminary drawings, but renderings produced from a design that later changes will need to be revised to match the final set. For presentation work tied to a permit application, starting from the permitted drawings avoids that rework.",
  },
  {
    question: "What formats do you deliver renderings and walkthroughs in?",
    answer:
      "High-resolution JPEG and print-ready PDF for renderings, and a hosted interactive web link plus an MP4 video export for walkthroughs. VR-compatible output is available on request.",
  },
  {
    question: "Can you produce a walkthrough for an interior remodel, not just new construction?",
    answer:
      "Yes. Interior remodels, tenant improvements, and renovation projects are common walkthrough and rendering candidates, especially for client presentations and design approval before construction begins.",
  },
  {
    question: "How long does it take to produce renderings or a walkthrough?",
    answer:
      "Turnaround depends on project scope and the number of views or the length of the walkthrough. We confirm a specific timeline once we've reviewed the drawings and the deliverable list at intake.",
  },
  {
    question: "Do you offer 3D staging for real estate listings?",
    answer:
      "Yes. We stage vacant or under-construction rooms into photorealistic, fully furnished imagery for listing platforms, investor decks, and pre-construction marketing.",
  },
  {
    question: "How many revisions are included?",
    answer:
      "One revision round is included with renderings, walkthroughs, and staging engagements, to address material changes, layout adjustments, or presentation feedback.",
  },
];

const visualizationServiceSlugs = [
  "renderings-visualization",
  "digital-walkthroughs",
  "3d-staging",
] as const;

const visualizationServices = visualizationServiceSlugs
  .map((slug) => getServiceBySlug(slug))
  .filter((s): s is NonNullable<typeof s> => Boolean(s));

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RenderingsWalkthroughsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Renderings and Walkthroughs", href: "/renderings-walkthroughs" },
        ]}
      />
      <ServiceJsonLd
        title="Renderings and Video Walkthroughs"
        description="Architectural renderings, 3D staging, and interactive video walkthroughs for residential and commercial projects, produced from the architectural drawings."
        url={`${company.website}/renderings-walkthroughs`}
        category="Visualization"
      />
      <FaqJsonLd items={faqs.map((f) => ({ question: f.question, answer: f.answer }))} />

      <PageHeader
        eyebrow="Renderings & Walkthroughs"
        heading="Renderings and video walkthroughs that make a project easy to approve."
        description="Construction drawings are hard for most people to read. Renderings, 3D staging, and interactive video walkthroughs give review boards, investors, buyers, and tenants a clear, confident understanding of what's being proposed, built directly from the architectural drawings."
      />

      {/* ── What renderings and walkthroughs cover ───────────────────────────── */}
      <Section variant="default">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              What's Included
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Every way a project can be shown before it's built.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              Different audiences need different formats. A review board wants a
              clear exterior rendering. An investor wants to walk through the space.
              A buyer wants to see it fully furnished. We produce all three from the
              same source drawings.
            </p>
          </div>
        </div>

        <div className="grid gap-px border-x border-b border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {visualScope.map((item) => (
            <div key={item.title} className="bg-surface px-8 py-8">
              <p className="mb-3 font-bold text-foreground" style={{ letterSpacing: "-0.02em" }}>
                {item.title}
              </p>
              <p className="text-sm font-light leading-relaxed text-muted">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-px border-x border-b border-border bg-border sm:grid-cols-3">
          {[
            { label: "Revisions", value: "One Round Included" },
            { label: "Delivery Formats", value: "JPEG, PDF, MP4, Web Link" },
            { label: "VR-Compatible Output", value: "Available on Request" },
          ].map((stat) => (
            <div key={stat.label} className="bg-background px-7 py-6">
              <p className="mb-2 text-[10px] font-medium uppercase tracking-widest text-secondary">
                {stat.label}
              </p>
              <p className="font-bold text-lg text-foreground" style={{ letterSpacing: "-0.02em" }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── How it works ─────────────────────────────────────────────────────── */}
      <Section variant="dark" className="border-t border-border">
        <div className="mb-14 border-b border-white/10 pb-14 grid items-end gap-8 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              How It Works
            </p>
            <h2
              className="font-bold text-primary-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              From drawings to a finished visual.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-white/60">
              Renderings, staging, and walkthroughs all start from the same 3D
              model, built to match your architectural drawings.
            </p>
          </div>
        </div>

        <ol role="list" className="flex flex-col gap-0">
          {visualizationProcess.map((step, i) => (
            <li
              key={step.title}
              className="grid grid-cols-[3rem_1fr] gap-x-8 border-b border-white/10 py-10 first:border-t lg:grid-cols-[5rem_1fr] lg:gap-x-12"
            >
              <div className="pt-0.5">
                <span
                  className="block font-bold tabular-nums text-secondary"
                  style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.04em", lineHeight: 1 }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-bold text-xl text-primary-foreground" style={{ letterSpacing: "-0.015em" }}>
                  {step.title}
                </h3>
                <p className="font-light leading-relaxed text-white/60">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── Where visualization gets used ────────────────────────────────────── */}
      <Section variant="surface" className="border-t border-border">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Where It Gets Used
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Four moments where visuals change the outcome.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              Renderings and walkthroughs aren't just marketing. They influence
              whether a project gets approved, funded, sold, or leased.
            </p>
          </div>
        </div>

        <div className="grid gap-px border-x border-b border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {useCases.map((item) => (
            <div key={item.title} className="flex flex-col gap-4 bg-background px-8 py-9">
              <h3 className="font-bold text-foreground" style={{ letterSpacing: "-0.02em" }}>
                {item.title}
              </h3>
              <p className="flex-1 text-sm font-light leading-relaxed text-muted">
                {item.description}
              </p>
              <Link
                href={item.href}
                className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-widest text-secondary hover:text-primary transition-colors duration-150"
              >
                {item.linkLabel} <span aria-hidden>→</span>
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Visualization services directory ─────────────────────────────────── */}
      <Section variant="default" className="border-t border-border">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Visualization Services We Provide
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Three formats, one source model.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              Renderings, staging, and walkthroughs are frequently combined on the
              same project. Each is also available as a standalone deliverable.
            </p>
          </div>
        </div>

        <nav aria-label="Visualization service directory">
          <ul className="divide-y divide-border border-x border-b border-border" role="list">
            {visualizationServices.map((service, i) => (
              <li key={service.slug}>
                <Link
                  href={getServiceHref(service.slug)}
                  className="group block transition-colors duration-200 hover:bg-surface"
                >
                  <article className="grid grid-cols-[2.5rem_1fr] items-start gap-x-6 px-7 py-8 lg:grid-cols-[2.5rem_1fr_9rem] lg:items-center lg:gap-x-8 lg:px-9">
                    <span className="pt-0.5 text-[11px] font-medium tabular-nums text-secondary lg:pt-0" aria-hidden>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3
                        className="font-bold text-lg text-foreground transition-colors duration-200 group-hover:text-secondary sm:text-xl"
                        style={{ letterSpacing: "-0.02em" }}
                      >
                        {service.title}
                      </h3>
                      <p className="mt-2 max-w-2xl text-sm font-light leading-relaxed text-muted">
                        {service.tagline}
                      </p>
                    </div>
                    <div className="hidden items-center justify-end lg:flex">
                      <span
                        className="text-secondary transition-transform duration-200 group-hover:translate-x-1"
                        aria-hidden
                      >
                        →
                      </span>
                    </div>
                  </article>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Section>

      {/* ── Common pitfalls ──────────────────────────────────────────────────── */}
      <Section variant="dark" className="border-t border-border">
        <div className="mb-14 grid items-end gap-8 border-b border-white/10 pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Common Pitfalls
            </p>
            <h2
              className="font-bold text-primary-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Where project visualization falls flat.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-white/60">
              Most weak renderings and forgettable walkthroughs trace back to one
              of these gaps between the visual and the actual project.
            </p>
          </div>
        </div>

        <div className="grid gap-px bg-white/10 sm:grid-cols-2">
          {visualizationPitfalls.map((item, index) => (
            <div key={item.title} className="flex gap-5 bg-primary px-8 py-7">
              <span
                className="mt-0.5 shrink-0 font-medium tabular-nums text-secondary"
                style={{ fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)", letterSpacing: "-0.02em", lineHeight: 1.4 }}
                aria-hidden
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="mb-2 font-bold text-primary-foreground" style={{ letterSpacing: "-0.02em" }}>
                  {item.title}
                </p>
                <p className="text-sm font-light leading-relaxed text-white/60">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── FAQ ───────────────────────────────────────────────────────────────── */}
      <Section variant="surface" className="border-t border-border">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Frequently Asked
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Renderings and walkthroughs, explained.
            </h2>
          </div>
        </div>

        <dl className="divide-y divide-border border-t border-border">
          {faqs.map((faq) => (
            <div key={faq.question} className="grid gap-x-10 gap-y-3 py-8 lg:grid-cols-[1fr_1.4fr]">
              <dt className="font-bold text-foreground" style={{ letterSpacing: "-0.02em" }}>
                {faq.question}
              </dt>
              <dd className="text-sm font-light leading-relaxed text-muted">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <CtaBand
        heading="Ready to visualize your project?"
        subheading="Send us your architectural drawings and we will confirm which renderings, staging, or walkthrough deliverables fit your presentation, timeline, and fee."
        primaryAction={{ label: "Request a Proposal", href: "/contact" }}
        secondaryAction={{ label: "View All Services", href: "/services" }}
        variant="dark"
      />
    </>
  );
}
