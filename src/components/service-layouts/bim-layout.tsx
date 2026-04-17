import Link from "next/link";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { Button } from "@/components/shared/button";
import { getRelatedServices, getServiceBySlug } from "@/content/services";
import { cn } from "@/lib/utils";

type ServiceType = NonNullable<ReturnType<typeof getServiceBySlug>>;

// ─── Static BIM discipline descriptions ───────────────────────────────────────

const disciplineDescriptions: Record<string, string> = {
  "Architectural BIM":
    "Revit architectural model management, element standards, and coordination reference model.",
  "Structural BIM":
    "Structural framing model integration, beam and column clearance verification, and connection coordination.",
  "MEP Coordination":
    "Mechanical, electrical, and plumbing routing coordination across all three disciplines simultaneously.",
  "Clash Detection":
    "Hard and soft clash detection run between all discipline model pairs with BCF-format issue reports.",
  "4D Scheduling Coordination":
    "Model-linked schedule sequencing for phased construction and logistics planning.",
  "As-Built BIM Documentation":
    "Field-verified model updates reflecting installed conditions for owner facilities use.",
};

// ─── LOD reference data ────────────────────────────────────────────────────────

const lodLevels = [
  {
    level: "LOD 100",
    description:
      "Conceptual mass or symbol. Elements represent approximate size, shape, location, and orientation.",
    typicalUse: "Early feasibility, program validation, massing studies.",
  },
  {
    level: "LOD 200",
    description:
      "Generic systems and assemblies with approximate quantities, size, shape, and location.",
    typicalUse: "Schematic design, early coordination, structural grid layout.",
  },
  {
    level: "LOD 300",
    description:
      "Specific assemblies accurately modeled as quantity, size, shape, location, and orientation.",
    typicalUse:
      "Construction documents, permit submissions, MEP routing coordination.",
  },
  {
    level: "LOD 350",
    description:
      "Elements include interfaces and connections to other systems and disciplines.",
    typicalUse:
      "Clash detection, trade coordination, fabrication planning support.",
  },
  {
    level: "LOD 400",
    description:
      "Fabrication and assembly-level detail. Elements include complete geometry and finish information.",
    typicalUse:
      "Shop drawings, prefabrication, MEP fabrication coordination, as-built baseline.",
  },
];

// ─── Cost-of-not-coordinating stats ───────────────────────────────────────────

const coordinationStats = [
  { value: "10x", label: "field vs. model resolution cost" },
  { value: "40%", label: "of RFIs are coordination-related" },
  { value: "2-4 wks", label: "typical field clash delay" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function BimLayout({ service }: { service: ServiceType }) {
  const related = getRelatedServices(service);

  return (
    <>
      {/* ── 1. Technical matrix header ───────────────────────────────────────── */}
      <Section variant="default">
        <div className="grid gap-12 lg:grid-cols-[3fr_2fr_2fr] lg:gap-10 xl:gap-14">

          {/* Col 1: Eyebrow + heading + overview */}
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              BIM Coordination
            </p>
            <h1
              className="mb-6 font-bold text-3xl text-foreground sm:text-4xl"
              style={{ letterSpacing: "-0.025em" }}
            >
              {service.title}
            </h1>
            <p className="font-light leading-relaxed text-foreground sm:text-lg">
              {service.overview}
            </p>
            <div className="mt-8">
              <Button href="/contact" variant="primary" size="md">
                Request a Proposal
              </Button>
            </div>
          </div>

          {/* Col 2: Engineering specs card */}
          {service.processHighlights && service.processHighlights.length > 0 && (
            <div className="flex flex-col border border-border">
              <div className="border-b border-border px-6 py-4">
                <p className="text-[10px] font-medium uppercase tracking-widest text-secondary">
                  Engineering Specs
                </p>
              </div>
              {service.processHighlights.map((h) => (
                <div
                  key={h.label}
                  className="flex items-start justify-between gap-4 border-b border-border px-6 py-5 last:border-b-0"
                >
                  <p className="text-[11px] font-medium uppercase tracking-wider text-muted">
                    {h.label}
                  </p>
                  <p
                    className="text-right font-bold text-sm text-foreground"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    {h.value}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Col 3: Discipline tag chips */}
          {service.disciplines && service.disciplines.length > 0 && (
            <div>
              <p className="mb-4 text-[10px] font-medium uppercase tracking-widest text-muted">
                Disciplines
              </p>
              <ul role="list" className="flex flex-col gap-2">
                {service.disciplines.map((d) => (
                  <li
                    key={d}
                    className="border border-border px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-foreground"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </Section>

      {/* ── 2. Discipline scope grid ─────────────────────────────────────────── */}
      {service.disciplines && service.disciplines.length > 0 && (
        <Section variant="surface" className="border-t border-border">

          <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
                Scope
              </p>
              <h2
                className="font-bold text-3xl text-foreground sm:text-4xl"
                style={{ letterSpacing: "-0.025em" }}
              >
                Disciplines coordinated.
              </h2>
            </div>
            <p className="font-light leading-relaxed text-muted">
              Each discipline model is managed, coordinated, and clash-checked
              against every other. No routing or structural element escapes the
              review cycle.
            </p>
          </div>

          <ul
            role="list"
            className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3"
          >
            {service.disciplines.map((d) => (
              <li key={d} className="bg-background px-7 py-7">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">
                  {d}
                </p>
                <p className="text-sm font-light leading-relaxed text-muted">
                  {disciplineDescriptions[d] ??
                    "Discipline coordination and model management included in every BIM engagement."}
                </p>
              </li>
            ))}
          </ul>

        </Section>
      )}

      {/* ── 3. Clash detection workflow ──────────────────────────────────────── */}
      {service.steps && service.steps.length > 0 && (
        <Section variant="default" className="border-t border-border">

          <div className="mb-14 border-b border-border pb-14">
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Coordination Cycle
            </p>
            <h2
              className="font-bold text-3xl text-foreground sm:text-4xl"
              style={{ letterSpacing: "-0.025em" }}
            >
              The coordination cycle.
            </h2>
          </div>

          <ol role="list" className="flex flex-col">
            {service.steps.map((step, i) => (
              <li
                key={step.title}
                className={cn(
                  "grid grid-cols-[3.5rem_1fr] gap-x-8 border-b border-border py-10 lg:grid-cols-[3.5rem_1fr_2fr] lg:gap-x-12",
                  i === 0 && "border-t border-border"
                )}
              >
                {/* Step number */}
                <span
                  className="self-start font-bold text-2xl text-secondary"
                  style={{ letterSpacing: "-0.02em", lineHeight: 1 }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Title */}
                <p
                  className="self-start font-bold text-base text-foreground sm:text-lg"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {step.title}
                </p>

                {/* Description */}
                <p className="col-start-2 mt-2 text-sm font-light leading-relaxed text-muted lg:col-start-3 lg:mt-0 lg:self-start">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>

        </Section>
      )}

      {/* ── 4. Deliverables ──────────────────────────────────────────────────── */}
      <Section variant="surface" className="border-t border-border">

        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Deliverables
            </p>
            <h2
              className="font-bold text-3xl text-foreground sm:text-4xl"
              style={{ letterSpacing: "-0.025em" }}
            >
              What you receive.
            </h2>
          </div>
          <p className="font-light leading-relaxed text-muted">
            Every BIM coordination engagement produces structured, documented
            outputs. Scope is confirmed at model intake and adjusted per project
            size and trade count.
          </p>
        </div>

        <ul
          role="list"
          className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3"
        >
          {service.includes.map((item) => (
            <li key={item.title} className="bg-background px-7 py-7">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">
                {item.title}
              </p>
              <p className="text-sm font-light leading-relaxed text-muted">
                {item.description}
              </p>
            </li>
          ))}
        </ul>

      </Section>

      {/* ── 5. Technical standards callout (dark) ────────────────────────────── */}
      <Section variant="dark" className="border-t border-primary">
        <div className="grid gap-14 lg:grid-cols-[3fr_2fr] lg:gap-20">

          {/* Why it matters */}
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Why It Matters
            </p>
            <h2
              className="mb-6 font-bold text-3xl text-primary-foreground sm:text-4xl"
              style={{ letterSpacing: "-0.025em" }}
            >
              The cost of skipping coordination.
            </h2>
            <p className="font-light leading-relaxed text-white/70 sm:text-lg">
              {service.whyItMatters}
            </p>
          </div>

          {/* Cost-of-not-coordinating stat callout */}
          <div className="flex flex-col gap-0 border border-white/20">
            <div className="border-b border-white/20 px-7 py-5">
              <p className="text-[10px] font-medium uppercase tracking-widest text-secondary">
                Cost of Not Coordinating
              </p>
            </div>
            {coordinationStats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col gap-1.5 border-b border-white/20 px-7 py-7 last:border-b-0"
              >
                <p
                  className="font-bold text-3xl text-primary-foreground"
                  style={{ letterSpacing: "-0.03em", lineHeight: 1 }}
                >
                  {stat.value}
                </p>
                <p className="text-xs font-light text-white/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </Section>

      {/* ── 6. LOD reference table ───────────────────────────────────────────── */}
      <Section variant="default" className="border-t border-border">

        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              LOD Reference
            </p>
            <h2
              className="font-bold text-3xl text-foreground sm:text-4xl"
              style={{ letterSpacing: "-0.025em" }}
            >
              Level of Development: what we deliver.
            </h2>
          </div>
          <p className="font-light leading-relaxed text-muted">
            LOD defines the precision of each model element. CADTRI coordinates
            to LOD 300-400 depending on trade and project phase, with full
            documentation of which elements reach which level.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-border text-sm">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="px-6 py-4 text-left text-[10px] font-semibold uppercase tracking-wider text-muted">
                  LOD Level
                </th>
                <th className="px-6 py-4 text-left text-[10px] font-semibold uppercase tracking-wider text-muted">
                  Description
                </th>
                <th className="hidden px-6 py-4 text-left text-[10px] font-semibold uppercase tracking-wider text-muted md:table-cell">
                  Typical Use
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {lodLevels.map((row) => (
                <tr
                  key={row.level}
                  className="group transition-colors duration-150 hover:bg-surface"
                >
                  <td className="px-6 py-5 align-top">
                    <span className="text-xs font-mono font-semibold text-secondary">
                      {row.level}
                    </span>
                  </td>
                  <td className="px-6 py-5 align-top">
                    <p className="font-light leading-relaxed text-foreground">
                      {row.description}
                    </p>
                  </td>
                  <td className="hidden px-6 py-5 align-top md:table-cell">
                    <p className="font-light leading-relaxed text-muted">
                      {row.typicalUse}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </Section>

      {/* ── 7. FAQ ───────────────────────────────────────────────────────────── */}
      {service.faqs && service.faqs.length > 0 && (
        <Section variant="surface" className="border-t border-border">

          <div className="mb-14 border-b border-border pb-14">
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              FAQ
            </p>
            <h2
              className="font-bold text-3xl text-foreground sm:text-4xl"
              style={{ letterSpacing: "-0.025em" }}
            >
              Common questions.
            </h2>
          </div>

          <dl className="divide-y divide-border border-t border-border">
            {service.faqs.map((faq) => (
              <div key={faq.question} className="grid gap-4 py-6 lg:grid-cols-[2fr_3fr] lg:gap-16">
                <dt className="text-sm font-semibold uppercase tracking-wider text-foreground">
                  {faq.question}
                </dt>
                <dd className="text-sm font-light leading-relaxed text-muted">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>

        </Section>
      )}

      {/* ── 8. Audience ──────────────────────────────────────────────────────── */}
      <Section variant="default" className="border-t border-border">

        <div className="mb-14 border-b border-border pb-14">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            Designed For
          </p>
          <h2
            className="font-bold text-3xl text-foreground sm:text-4xl"
            style={{ letterSpacing: "-0.025em" }}
          >
            Who this service is for.
          </h2>
        </div>

        <ul role="list" className="flex flex-col divide-y divide-border border-t border-border">
          {service.audience.map((item, i) => (
            <li key={item.title} className="flex gap-6 py-7">
              <span
                className="shrink-0 text-[11px] font-medium tabular-nums text-secondary"
                style={{ letterSpacing: "0.05em", paddingTop: "3px" }}
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-1.5">
                <p className="text-sm font-semibold uppercase tracking-wider text-foreground">
                  {item.title}
                </p>
                <p className="text-sm font-light leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ul>

      </Section>

      {/* ── 9. Related services ──────────────────────────────────────────────── */}
      {related.length > 0 && (
        <Section variant="surface" className="border-t border-border">

          <div className="mb-12 flex items-end justify-between gap-8">
            <div>
              <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
                Continue Exploring
              </p>
              <h2
                className="font-bold text-2xl text-foreground sm:text-3xl"
                style={{ letterSpacing: "-0.025em" }}
              >
                Related services.
              </h2>
            </div>
            <Link
              href="/services"
              className="hidden shrink-0 text-[11px] font-medium uppercase tracking-wider text-secondary hover:text-foreground lg:block"
            >
              All Services →
            </Link>
          </div>

          <ul className="divide-y divide-border border border-border" role="list">
            {related.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex items-center gap-6 px-7 py-7 transition-colors duration-200 hover:bg-background lg:px-9"
                >
                  <span className="min-w-[5rem] text-[10px] font-medium uppercase tracking-widest text-muted">
                    {s.category}
                  </span>
                  <div className="flex-1">
                    <p
                      className="font-bold text-base text-foreground transition-colors duration-200 group-hover:text-secondary"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      {s.title}
                    </p>
                    <p className="mt-1 text-sm font-light text-muted">{s.tagline}</p>
                  </div>
                  <span
                    className="shrink-0 text-secondary transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>

        </Section>
      )}

      {/* ── 10. CTA band ─────────────────────────────────────────────────────── */}
      <CtaBand
        heading="Ready to coordinate your project?"
        subheading="Share your model files and project scope. We will confirm the coordination plan, LOD targets, and timeline within one business day."
        primaryAction={{ label: "Request a Proposal", href: "/contact" }}
        secondaryAction={{ label: "View All Services", href: "/services" }}
        variant="dark"
      />
    </>
  );
}
