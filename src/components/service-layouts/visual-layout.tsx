import Link from "next/link";
import { Monitor, Film, Image, Package } from "lucide-react";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { Button } from "@/components/shared/button";
import type { Service } from "@/content/services";
import { getRelatedServices } from "@/content/services";

interface Props {
  service: Service;
}

// Map output format label to an icon
function FormatIcon({ label }: { label: string }) {
  const l = label.toLowerCase();
  if (l.includes("interactive") || l.includes("web")) return <Monitor size={16} strokeWidth={1.5} aria-hidden />;
  if (l.includes("video") || l.includes("mp4"))         return <Film    size={16} strokeWidth={1.5} aria-hidden />;
  if (l.includes("jpeg") || l.includes("png") || l.includes("print") || l.includes("frame")) return <Image size={16} strokeWidth={1.5} aria-hidden />;
  return <Package size={16} strokeWidth={1.5} aria-hidden />;
}

export function VisualLayout({ service }: Props) {
  const related = getRelatedServices(service);

  return (
    <>
      {/* ── Editorial overview — full-width hero copy ────────────────────────── */}
      <Section variant="default">
        <div className="border-b border-border pb-16">
          <p className="mb-6 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
            Overview
          </p>
          <p
            className="max-w-3xl font-light leading-relaxed text-foreground"
            style={{ fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)", lineHeight: 1.7 }}
          >
            {service.overview}
          </p>
          <div className="mt-10">
            <Button href="/contact" variant="primary" size="md">
              Request a Proposal
            </Button>
          </div>
        </div>

        {/* Output format cards */}
        {service.outputFormats && service.outputFormats.length > 0 && (
          <div className="pt-14">
            <p className="mb-6 text-[11px] font-medium uppercase tracking-widest text-foreground">
              Delivery Formats
            </p>
            <div className="grid gap-px border-x border-b border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
              {service.outputFormats.map((fmt) => (
                <div
                  key={fmt}
                  className="flex items-center gap-3 bg-background px-6 py-5"
                >
                  <span className="shrink-0 text-secondary">
                    <FormatIcon label={fmt} />
                  </span>
                  <p className="text-sm font-light text-foreground">{fmt}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Section>

      {/* ── Use cases — dark band ─────────────────────────────────────────────── */}
      {service.useCases && service.useCases.length > 0 && (
        <Section variant="dark" className="border-t border-border">
          <div className="mb-12 grid items-end gap-8 border-b border-white/10 pb-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
                <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
                Common Applications
              </p>
              <h2
                className="font-bold text-3xl text-primary-foreground sm:text-4xl"
                style={{ letterSpacing: "-0.025em" }}
              >
                Where it&apos;s used.
              </h2>
            </div>
            <p className="font-light leading-relaxed text-white/60">
              This service is commonly requested for the following project contexts. If your use case is not listed, contact us to discuss whether it fits.
            </p>
          </div>

          <ul
            role="list"
            className="grid gap-px border-x border-b border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3"
          >
            {service.useCases.map((useCase, i) => (
              <li
                key={useCase}
                className="flex items-start gap-4 bg-primary px-7 py-6"
              >
                <span
                  className="shrink-0 text-[10px] font-medium tabular-nums text-secondary"
                  style={{ letterSpacing: "0.08em", paddingTop: "3px" }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm font-light leading-relaxed text-white/80">
                  {useCase}
                </p>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* ── What's included ──────────────────────────────────────────────────── */}
      <Section variant="surface" className="border-t border-border">
        <div className="mb-12 grid items-end gap-8 border-b border-border pb-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
              Deliverables
            </p>
            <h2
              className="font-bold text-3xl text-foreground sm:text-4xl"
              style={{ letterSpacing: "-0.025em" }}
            >
              What&apos;s included.
            </h2>
          </div>
          <p className="font-light leading-relaxed text-muted">
            Every engagement includes the following deliverables. Final scope is confirmed at intake based on project size and requirements.
          </p>
        </div>

        <div className="grid gap-px border-x border-b border-border bg-border sm:grid-cols-2">
          {service.includes.map((item) => (
            <div key={item.title} className="flex flex-col gap-3 bg-surface px-8 py-8">
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-foreground">
                {item.title}
              </h3>
              <p className="text-sm font-light leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Who it's for ─────────────────────────────────────────────────────── */}
      <Section variant="default" className="border-t border-border">
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
              Designed For
            </p>
            <h2
              className="font-bold text-3xl text-foreground sm:text-4xl"
              style={{ letterSpacing: "-0.025em" }}
            >
              Who this service is for.
            </h2>
            <p className="mt-5 font-light leading-relaxed text-muted">
              {service.whyItMatters}
            </p>
          </div>
          <ul role="list">
            {service.audience.map((item, i) => (
              <li
                key={item.title}
                className="flex gap-5 border-b border-border py-6 first:border-t"
              >
                <span
                  className="shrink-0 text-[11px] font-medium tabular-nums text-secondary"
                  style={{ letterSpacing: "0.05em", paddingTop: "2px" }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-1.5">
                  <p className="text-sm font-medium uppercase tracking-wider text-foreground">
                    {item.title}
                  </p>
                  <p className="text-sm font-light leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ── Related services ─────────────────────────────────────────────────── */}
      {related.length > 0 && (
        <Section variant="surface" className="border-t border-border">
          <div className="mb-12 flex items-end justify-between gap-8">
            <div>
              <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
                <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
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
                    <p className="font-bold text-base text-foreground transition-colors duration-200 group-hover:text-secondary" style={{ letterSpacing: "-0.01em" }}>
                      {s.title}
                    </p>
                    <p className="mt-1 text-sm font-light text-muted">{s.tagline}</p>
                  </div>
                  <span className="shrink-0 text-secondary transition-transform duration-200 group-hover:translate-x-1" aria-hidden>→</span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <CtaBand
        heading="Ready to get started?"
        subheading="Tell us your project scope and we will confirm the timeline, deliverables, and next steps."
        primaryAction={{ label: "Request a Proposal", href: "/contact" }}
        secondaryAction={{ label: "View All Services", href: "/services" }}
        variant="dark"
      />
    </>
  );
}
