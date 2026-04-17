import Link from "next/link";
import { Button } from "@/components/shared/button";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { getRelatedServices, getServiceBySlug } from "@/content/services";
import { cn } from "@/lib/utils";

type ServiceType = NonNullable<ReturnType<typeof getServiceBySlug>>;

export function ConsultationLayout({ service }: { service: ServiceType }) {
  const related = getRelatedServices(service);
  const steps = service.steps ?? [];
  const faqs = service.faqs ?? [];
  const useCases = service.useCases ?? [];
  const processHighlights = service.processHighlights ?? [];

  return (
    <>
      {/* ── Hero intro — Advisory Session card layout ─────────────────────── */}
      <Section variant="default">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: Decorative time stat + overview */}
          <div>
            {/* Large decorative stat */}
            <div className="mb-10 select-none">
              <div className="relative mb-1 flex items-end gap-4">
                <span
                  className="font-bold text-secondary leading-none tabular-nums"
                  style={{
                    fontSize: "clamp(4rem, 10vw, 7rem)",
                    letterSpacing: "-0.05em",
                    opacity: 0.18,
                  }}
                  aria-hidden
                >
                  60–90
                </span>
                <div className="mb-3 flex flex-col gap-0.5">
                  <span
                    className="font-bold text-foreground leading-none"
                    style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", letterSpacing: "-0.03em" }}
                  >
                    Minutes
                  </span>
                  <p className="text-[11px] font-medium uppercase tracking-widest text-secondary">
                    Advisory Session
                  </p>
                </div>
              </div>
            </div>

            <p
              className="font-light leading-relaxed text-muted"
              style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", lineHeight: 1.7 }}
            >
              {service.overview}
            </p>
          </div>

          {/* Right: Appointment card */}
          <div className="border border-border bg-surface px-8 py-8">
            <p className="mb-6 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Session Details
            </p>

            {processHighlights.length > 0 && (
              <ul className="mb-8 space-y-0 divide-y divide-border border border-border">
                {processHighlights.map((h) => (
                  <li
                    key={h.label}
                    className="flex items-center justify-between gap-4 bg-background px-5 py-4"
                  >
                    <span className="text-xs font-medium uppercase tracking-wider text-muted">
                      {h.label}
                    </span>
                    <span
                      className="font-bold tabular-nums text-foreground"
                      style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)", letterSpacing: "-0.02em" }}
                    >
                      {h.value}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <Button href="/contact" variant="primary" size="lg" className="w-full justify-center">
              Book a Consultation
            </Button>
          </div>
        </div>
      </Section>

      {/* ── Session format grid — 4-step horizontal ──────────────────────── */}
      <Section variant="surface" className="border-t border-border">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              The Process
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
              }}
            >
              How a session works.
            </h2>
          </div>
          <p className="font-light leading-relaxed text-muted lg:text-lg">
            Every consultation follows a structured format so your time is focused and the outcome is documented.
          </p>
        </div>

        <div className="grid border border-border bg-border gap-px sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.title} className="flex flex-col gap-4 bg-surface px-7 py-8">
              <span
                className="font-bold tabular-nums text-secondary leading-none"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", letterSpacing: "-0.04em" }}
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3
                className="font-bold text-foreground"
                style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)", letterSpacing: "-0.01em", lineHeight: 1.35 }}
              >
                {step.title}
              </h3>
              <p className="text-sm font-light leading-relaxed text-muted">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Topics covered — menu of use cases ───────────────────────────── */}
      {useCases.length > 0 && (
        <Section variant="default" className="border-t border-border">
          <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
                Scope of Advice
              </p>
              <h2
                className="font-bold text-foreground"
                style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", letterSpacing: "-0.03em", lineHeight: 1.15 }}
              >
                Topics we cover in consultation.
              </h2>
            </div>
            <p className="font-light leading-relaxed text-muted lg:text-lg">
              Sessions are structured around your specific questions. These are the most common areas clients bring to us.
            </p>
          </div>

          <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
            {useCases.map((useCase) => (
              <div
                key={useCase}
                className="flex items-center gap-4 bg-background px-7 py-5"
              >
                <span className="shrink-0 text-base font-medium text-secondary" aria-hidden>
                  ›
                </span>
                <span className="text-sm font-medium text-foreground" style={{ letterSpacing: "-0.005em" }}>
                  {useCase}
                </span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ── Deliverables — gap-as-border grid ────────────────────────────── */}
      <Section variant="surface" className="border-t border-border">
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Deliverables
            </p>
            <h2
              className="font-bold text-foreground"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", letterSpacing: "-0.03em" }}
            >
              What you receive.
            </h2>
          </div>
          <p className="font-light leading-relaxed text-muted">
            Every session produces a written record. You leave with documented guidance, not just a conversation.
          </p>
        </div>

        <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {service.includes.map((item, i) => (
            <div key={item.title} className="flex flex-col gap-4 bg-background px-7 py-7">
              <span
                className="text-[11px] font-medium tabular-nums text-secondary"
                style={{ letterSpacing: "0.06em" }}
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3
                className="text-sm font-semibold uppercase tracking-wider text-foreground"
              >
                {item.title}
              </h3>
              <p className="text-sm font-light leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Value proposition — left-border pull-quote (dark) ────────────── */}
      <Section variant="dark" className="border-t border-border">
        <div className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:gap-20">
          <div>
            <p className="mb-8 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              The value of asking first
            </p>

            {/* Pull-quote with left orange bar */}
            <div className="flex gap-6">
              <span className="w-1 shrink-0 self-stretch bg-secondary" aria-hidden />
              <p
                className="font-light text-primary-foreground leading-relaxed"
                style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.35rem)", lineHeight: 1.7 }}
              >
                {service.whyItMatters}
              </p>
            </div>

            <div className="mt-10">
              <Link
                href="/contact"
                className="text-sm font-medium text-secondary transition-colors duration-200 hover:text-primary-foreground"
              >
                Book a consultation →
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-5 border border-white/10 bg-white/5 px-8 py-8">
            <p className="text-[11px] font-medium uppercase tracking-widest text-secondary">
              Before you commit
            </p>
            <ul className="space-y-4">
              {[
                "Understand what permits your project actually requires",
                "Know which consultants to engage and when",
                "Avoid costly redesigns from early missteps",
                "Get a realistic timeline before any drawings begin",
                "Make confident decisions with professional guidance",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-light text-white/80">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── FAQ — static ruled ───────────────────────────────────────────── */}
      {faqs.length > 0 && (
        <Section variant="default" className="border-t border-border">
          <div className="mb-14">
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Common Questions
            </p>
            <h2
              className="font-bold text-foreground"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", letterSpacing: "-0.03em" }}
            >
              Frequently asked.
            </h2>
          </div>

          <div className="divide-y divide-border border border-border">
            {faqs.map((faq) => (
              <div key={faq.question} className="px-8 py-6">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">
                  {faq.question}
                </h3>
                <p className="text-sm font-light leading-relaxed text-muted">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ── Who it's for — numbered audience ─────────────────────────────── */}
      <Section variant="surface" className="border-t border-border">
        <div className="mb-14">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            Who This Is For
          </p>
          <h2
            className="font-bold text-foreground"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", letterSpacing: "-0.03em" }}
          >
            Built for clients who want clarity first.
          </h2>
        </div>

        <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
          {service.audience.map((item, i) => (
            <div key={item.title} className="flex gap-5 bg-surface px-8 py-8">
              <span
                className="shrink-0 font-bold tabular-nums text-secondary leading-none"
                style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.75rem)", letterSpacing: "-0.04em", opacity: 0.4 }}
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm font-light leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Related services — bordered rows ─────────────────────────────── */}
      {related.length > 0 && (
        <Section variant="default" className="border-t border-border">
          <div className="mb-12 flex items-end justify-between gap-8">
            <div>
              <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
                Continue Exploring
              </p>
              <h2
                className="font-bold text-foreground"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", letterSpacing: "-0.025em" }}
              >
                Related services.
              </h2>
            </div>
            <Link
              href="/services"
              className="hidden shrink-0 text-[11px] font-medium uppercase tracking-wider text-secondary transition-colors duration-200 hover:text-foreground lg:block"
            >
              All Services →
            </Link>
          </div>

          <ul className="divide-y divide-border border border-border" role="list">
            {related.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex items-center gap-6 px-7 py-7 transition-colors duration-200 hover:bg-surface lg:px-9"
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

      {/* ── CTA Band ─────────────────────────────────────────────────────── */}
      <CtaBand
        heading="Ready to clarify your project?"
        subheading="Start with a consultation. Get expert guidance before any drawings are made or money is committed."
        primaryAction={{ label: "Book a Consultation", href: "/contact" }}
        secondaryAction={{ label: "View All Services", href: "/services" }}
        variant="dark"
      />
    </>
  );
}
