import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { GlossarySearch } from "./glossary-search";
import { glossaryTerms, CATEGORIES } from "./glossary-data";

export const metadata: Metadata = {
  title: "Architectural & Drafting Glossary | CADTRI",
  description:
    "Plain-language definitions for architectural drafting, permitting, CAD, and construction terms. Search 70+ terms used by CADTRI and the broader industry.",
  alternates: { canonical: "/glossary" },
};

export default function GlossaryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Reference"
        heading="Glossary of Terms."
        description="Plain-language definitions for architectural drafting, permitting, CAD, and construction terms. Click any term to expand its full definition."
      />

      {/* ── Stats strip ─────────────────────────────────────────────────── */}
      <section className="border-b border-border bg-surface">
        <div className="container mx-auto max-w-container px-6">
          <dl className="grid grid-cols-2 divide-x divide-y divide-border sm:grid-cols-4 sm:divide-y-0">
            {[
              { value: `${glossaryTerms.length}+`, label: "Terms defined" },
              { value: `${CATEGORIES.length}`, label: "Categories" },
              {
                value: `${glossaryTerms.filter((t) => t.abbr).length}`,
                label: "Abbreviations explained",
              },
              { value: "Free", label: "Always" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1 px-6 py-8">
                <dt
                  className="text-3xl font-bold"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "#FF6D1F",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {stat.value}
                </dt>
                <dd
                  className="text-[11px] font-medium uppercase tracking-widest text-muted"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Main glossary ───────────────────────────────────────────────── */}
      <Section variant="default">
        <GlossarySearch />
      </Section>

      {/* ── Bottom CTA ──────────────────────────────────────────────────── */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container mx-auto max-w-container px-6">
          <div className="grid items-end gap-8 border-b border-white/10 pb-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
                Ready to start?
              </p>
              <h2
                className="text-4xl font-bold text-primary-foreground"
                style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.03em" }}
              >
                Know the terms. Now let us handle the drawings.
              </h2>
            </div>
            <div>
              <p className="mb-8 text-lg leading-relaxed text-white/55">
                CADTRI prepares permit-ready architectural drawing packages for residential and commercial projects across 40+ states. Fast turnaround, no surprises.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center rounded-full bg-secondary px-7 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Start a project
                </a>
                <a
                  href="/services"
                  className="inline-flex items-center rounded-full border border-white/20 px-7 py-3.5 text-sm font-bold text-primary-foreground transition-colors hover:border-white/40"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Browse services
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
