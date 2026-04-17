import type { Metadata } from "next";
import { cookies } from "next/headers";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { PortfolioGate } from "./portfolio-gate";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "A cross-section of the residential, commercial, and mixed-use project types CADTRI delivers. Architectural drawing packages, permit sets, and documentation across California jurisdictions.",
  robots: { index: false },
};

// ─── Access check ─────────────────────────────────────────────────────────────

async function isAuthenticated(): Promise<boolean> {
  const validCode = (process.env.PORTFOLIO_ACCESS_CODE ?? "").trim();
  if (!validCode) return false;
  const cookieStore = await cookies();
  const session = cookieStore.get("portfolio_session")?.value ?? "";
  return session.toLowerCase() === validCode.toLowerCase();
}

// ─── Project data ─────────────────────────────────────────────────────────────

const projects = [
  {
    category: "Residential",
    title: "Single-Family Addition and ADU",
    services: "Architectural Drafting · Permit Set Preparation",
  },
  {
    category: "Commercial TI",
    title: "Office Suite Tenant Improvement",
    services: "Permit Set Preparation · Code and Compliance Review",
  },
  {
    category: "New Construction",
    title: "Custom Residence, Ground-Up",
    services: "Architectural Drafting · Structural Coordination",
  },
  {
    category: "Multi-Family",
    title: "Duplex Conversion and ADU",
    services: "Architectural Drafting · City Comments Response",
  },
  {
    category: "Commercial",
    title: "Retail Tenant Improvement",
    services: "Permit Set Preparation · City Comments Response",
  },
  {
    category: "Mixed-Use",
    title: "Ground-Floor Commercial with Residential Above",
    services: "Architectural Drafting · Structural Coordination",
  },
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function PortfolioPage() {
  const authed = await isAuthenticated();

  if (!authed) {
    return <PortfolioGate />;
  }

  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        heading="Residential and commercial projects delivered to permit-ready standard."
        description="A cross-section of the project types and documentation scopes CADTRI handles across California jurisdictions."
      />

      {/* ── Project grid ─────────────────────────────────────────────────────── */}
      <Section variant="default">

        {/* Horizontal split intro */}
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Project Types
            </p>
            <h2
              className="font-bold text-3xl text-foreground sm:text-4xl"
              style={{ letterSpacing: "-0.025em" }}
            >
              A cross-section of our work.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-muted">
              Each project below represents a documentation scope CADTRI has
              delivered across residential, commercial, and mixed-use
              developments. Project photography and case study detail is added
              as engagements are completed and cleared for publication.
            </p>
          </div>
        </div>

        {/* Portfolio grid — gap-as-border */}
        <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className="group flex flex-col bg-background"
            >
              {/* Image placeholder */}
              <div className="relative aspect-[4/3] bg-surface">
                <span
                  className="absolute bottom-4 left-5 text-[10px] font-medium tabular-nums text-foreground/20"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Card info */}
              <div className="flex flex-col gap-2 border-t border-border px-6 py-5">
                <p className="text-[10px] font-medium uppercase tracking-widest text-secondary">
                  {project.category}
                </p>
                <h3
                  className="text-sm font-semibold text-foreground"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {project.title}
                </h3>
                <p className="text-[11px] font-light leading-relaxed text-muted">
                  {project.services}
                </p>
              </div>
            </div>
          ))}
        </div>

      </Section>

      {/* ── Project scope note ───────────────────────────────────────────────── */}
      <Section variant="surface" className="border-t border-border" compact>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-24">

          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Project Range
            </p>
            <h2
              className="font-bold text-2xl text-foreground sm:text-3xl"
              style={{ letterSpacing: "-0.025em" }}
            >
              Residential, commercial, and mixed-use.
            </h2>
          </div>

          <div className="flex items-center">
            <p className="font-light leading-relaxed text-muted">
              CADTRI works across single-family residential, multi-family,
              accessory dwelling units, commercial tenant improvements,
              ground-up construction, and mixed-use developments. If your
              project type is not shown, contact us to discuss scope and
              deliverables directly.
            </p>
          </div>

        </div>
      </Section>

      <CtaBand
        heading="Ready to start your project?"
        subheading="Tell us your scope and we will confirm deliverables, timeline, and pricing. No commitment required."
        primaryAction={{ label: "Request a Proposal", href: "/contact" }}
        secondaryAction={{ label: "View Services", href: "/services" }}
        variant="dark"
      />
    </>
  );
}
