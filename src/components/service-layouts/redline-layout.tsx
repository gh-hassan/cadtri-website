import Link from "next/link";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { getRelatedServices } from "@/content/services";
import type { Service } from "@/content/services";

interface Props {
  service: Service;
}

const ACCEPTED_SOURCE_FORMATS = [
  "Hand-drawn red-lines on printed drawings",
  "Architect's sketch revisions on bond paper",
  "Contractor markups with field measurements",
  "Phone photos of site changes",
  "PDF annotations from any markup tool",
  "Verbal scope descriptions with site measurements",
];

export function RedlineLayout({ service }: Props) {
  const related = getRelatedServices(service);
  const steps = service.steps ?? [];
  const faqs = service.faqs ?? [];

  return (
    <>
      {/* ── 1. Asymmetric Hero ──────────────────────────────────────────────── */}
      <Section variant="default" className="border-b border-border">
        <div className="grid items-center gap-12 lg:grid-cols-[3fr_2fr] lg:gap-20">
          {/* Left: copy */}
          <div>
            <p className="mb-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
              Drawings
            </p>
            <h1
              className="font-extrabold text-foreground"
              style={{
                fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
              }}
            >
              From red ink to permit-ready in days.
            </h1>
            <p
              className="mt-6 font-light text-muted"
              style={{ fontSize: "clamp(1rem, 2vw, 1.125rem)", lineHeight: 1.8 }}
            >
              {service.overview}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center bg-secondary px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                Submit Your Red-Lines
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center border border-border px-6 py-3 text-sm font-medium text-muted transition-colors hover:border-foreground hover:text-foreground"
              >
                View All Services
              </Link>
            </div>
          </div>

          {/* Right: transformation SVG */}
          <div className="flex items-center justify-center">
            <svg
              viewBox="0 0 200 240"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-xs"
              aria-label="Red-line to CAD transformation diagram: rough annotations on the left, clean CAD output on the right"
              role="img"
            >
              {/* LEFT HALF — rough red-line annotations */}
              {/* Wavy/rough lines representing messy field markups */}
              <path d="M10 40 Q 18 36 25 40 Q 33 44 40 40 Q 48 36 55 40 Q 63 44 70 40 Q 78 36 85 40 Q 93 44 98 40"
                fill="none" stroke="#E2D4B8" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M10 60 Q 20 55 30 60 Q 40 65 50 58 Q 60 52 70 60 Q 80 67 90 62 Q 96 59 98 60"
                fill="none" stroke="#E2D4B8" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M10 80 Q 15 75 25 80 Q 35 85 45 78 Q 55 72 65 80 Q 75 87 85 80 Q 93 75 98 80"
                fill="none" stroke="#E2D4B8" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M10 100 Q 22 95 32 100 Q 42 105 52 98 Q 62 92 72 100 Q 82 107 92 100 Q 96 97 98 100"
                fill="none" stroke="#E2D4B8" strokeWidth="1.2" strokeLinecap="round" />
              {/* Red markup circles and arrows */}
              <circle cx="30" cy="55" r="10" fill="none" stroke="#FF6D1F" strokeWidth="1.2" opacity="0.7" />
              <circle cx="70" cy="85" r="8" fill="none" stroke="#FF6D1F" strokeWidth="1.2" opacity="0.7" />
              {/* Imprecise arrow markup */}
              <path d="M 55 45 L 48 35 L 52 36 M 48 35 L 49 39"
                fill="none" stroke="#FF6D1F" strokeWidth="1.2" opacity="0.8" />
              <path d="M 20 90 L 28 108 L 25 107 M 28 108 L 27 104"
                fill="none" stroke="#FF6D1F" strokeWidth="1.2" opacity="0.8" />
              {/* Scribbled annotation marks */}
              <path d="M 15 115 L 45 115 M 15 120 L 38 120 M 15 125 L 50 125 M 15 130 L 35 130"
                stroke="#E2D4B8" strokeWidth="0.8" opacity="0.6" />
              <path d="M 60 115 L 95 115 M 60 120 L 85 120"
                stroke="#FF6D1F" strokeWidth="0.8" opacity="0.5" />
              {/* Cross-out */}
              <path d="M 25 140 L 75 160 M 75 140 L 25 160"
                stroke="#FF6D1F" strokeWidth="1.2" opacity="0.6" />
              {/* Rough box */}
              <path d="M 10 170 L 10 200 L 92 200 L 92 170 Z"
                fill="none" stroke="#E2D4B8" strokeWidth="1.2" strokeDasharray="3 2" />

              {/* CENTER dividing line */}
              <line x1="100" y1="20" x2="100" y2="220" stroke="#FF6D1F" strokeWidth="2" />

              {/* RIGHT HALF — clean CAD output */}
              {/* Precise parallel lines */}
              <line x1="110" y1="40" x2="190" y2="40" stroke="#222222" strokeWidth="1.2" />
              <line x1="110" y1="60" x2="190" y2="60" stroke="#222222" strokeWidth="1.2" />
              <line x1="110" y1="80" x2="190" y2="80" stroke="#222222" strokeWidth="1.2" />
              <line x1="110" y1="100" x2="190" y2="100" stroke="#222222" strokeWidth="1.2" />
              {/* Clean rectangle */}
              <rect x="110" y="115" width="80" height="40" fill="none" stroke="#222222" strokeWidth="1.2" />
              {/* Interior detail lines */}
              <line x1="130" y1="115" x2="130" y2="155" stroke="#222222" strokeWidth="0.7" />
              <line x1="160" y1="115" x2="160" y2="155" stroke="#222222" strokeWidth="0.7" />
              {/* Dimension lines */}
              <line x1="110" y1="162" x2="190" y2="162" stroke="#222222" strokeWidth="0.7" />
              <line x1="110" y1="158" x2="110" y2="166" stroke="#222222" strokeWidth="0.7" />
              <line x1="190" y1="158" x2="190" y2="166" stroke="#222222" strokeWidth="0.7" />
              <text x="150" y="175" textAnchor="middle" fontSize="6" fill="#222222" fontFamily="monospace">12&apos;-6&quot;</text>
              {/* Vertical dimension */}
              <line x1="197" y1="115" x2="197" y2="155" stroke="#222222" strokeWidth="0.7" />
              <line x1="193" y1="115" x2="201" y2="115" stroke="#222222" strokeWidth="0.7" />
              <line x1="193" y1="155" x2="201" y2="155" stroke="#222222" strokeWidth="0.7" />
              {/* Clean text representation */}
              <rect x="112" y="185" width="76" height="25" fill="#F5E7C6" stroke="#E2D4B8" strokeWidth="0.7" />
              <line x1="112" y1="192" x2="188" y2="192" stroke="#E2D4B8" strokeWidth="0.5" />
              <text x="150" y="190" textAnchor="middle" fontSize="5.5" fill="#7A6E5F" fontFamily="monospace">TITLE BLOCK</text>
              <text x="150" y="204" textAnchor="middle" fontSize="5" fill="#7A6E5F" fontFamily="monospace">CADTRI DRAWINGS</text>

              {/* LEFT label */}
              <text x="54" y="15" textAnchor="middle" fontSize="6.5" fill="#7A6E5F" fontFamily="monospace" letterSpacing="0.05em">RED-LINES</text>
              {/* RIGHT label */}
              <text x="150" y="15" textAnchor="middle" fontSize="6.5" fill="#222222" fontFamily="monospace" letterSpacing="0.05em">CAD OUTPUT</text>
            </svg>
          </div>
        </div>
      </Section>

      {/* ── 2. Process Highlights + Steps ───────────────────────────────────── */}
      <Section variant="surface" className="border-t border-border">
        {/* 4-col highlights strip */}
        {service.processHighlights && service.processHighlights.length > 0 && (
          <div className="mb-14 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">
            {service.processHighlights.map((h) => (
              <div key={h.label} className="bg-surface px-7 py-6">
                <span
                  className="block font-bold tabular-nums text-foreground"
                  style={{ fontSize: "2rem", letterSpacing: "-0.04em", lineHeight: 1 }}
                >
                  {h.value}
                </span>
                <span className="mt-2 block text-[11px] font-medium uppercase tracking-widest text-muted">
                  {h.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Section header */}
        <div className="mb-10 border-b border-border pb-10">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
            How It Works
          </p>
          <h2
            className="font-bold text-foreground"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Four steps. Clean drawings.
          </h2>
        </div>

        {/* Steps as large editorial rows */}
        {steps.length > 0 && (
          <div>
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="flex gap-8 border-b border-border py-8"
              >
                <span
                  className="w-20 shrink-0 font-bold tabular-nums text-secondary"
                  style={{ fontSize: "3rem", lineHeight: 1, letterSpacing: "-0.04em" }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-2 sm:flex-row sm:gap-10">
                  <h3
                    className="w-full shrink-0 font-bold text-foreground sm:w-52"
                    style={{ fontSize: "1rem", letterSpacing: "-0.01em", paddingTop: "0.5rem" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="font-light leading-relaxed text-muted"
                    style={{ fontSize: "0.9375rem", lineHeight: 1.75, paddingTop: "0.5rem" }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* ── 3. Why It Matters + What We Accept ──────────────────────────────── */}
      <Section variant="dark" className="border-t border-border">
        <div className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:gap-20">
          {/* Left: whyItMatters */}
          <div>
            <p className="mb-6 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
              Why This Matters
            </p>
            <p
              className="font-light text-white/90"
              style={{
                fontSize: "clamp(1.05rem, 2.2vw, 1.3rem)",
                lineHeight: 1.8,
              }}
            >
              {service.whyItMatters}
            </p>
          </div>

          {/* Right: source formats panel */}
          <div className="border border-white/10 bg-white/5 px-8 py-8">
            <p className="mb-5 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Source formats we accept
            </p>
            <ul className="space-y-4">
              {ACCEPTED_SOURCE_FORMATS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-light text-white/70">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── 4. What You Receive ─────────────────────────────────────────────── */}
      <Section variant="default" className="border-t border-border">
        <div className="mb-12 border-b border-border pb-12">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
            Deliverables
          </p>
          <h2
            className="font-bold text-foreground"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              letterSpacing: "-0.03em",
            }}
          >
            What you receive.
          </h2>
        </div>

        <div className="divide-y divide-border border-b border-border">
          {service.includes.map((item) => (
            <div
              key={item.title}
              className="grid gap-4 py-6 lg:grid-cols-[1fr_2fr]"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                {item.title}
              </h3>
              <p className="text-sm font-light leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 5. Who This Is For ──────────────────────────────────────────────── */}
      <Section variant="surface" className="border-t border-border">
        <div className="mb-12 border-b border-border pb-12">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
            Who This Is For
          </p>
          <h2
            className="font-bold text-foreground"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              letterSpacing: "-0.03em",
            }}
          >
            Built for these teams.
          </h2>
        </div>

        <div>
          {service.audience.map((item, i) => (
            <div
              key={item.title}
              className="flex gap-6 border-b border-border py-7"
            >
              <span
                className="w-10 shrink-0 text-[11px] font-medium tabular-nums text-secondary"
                style={{ letterSpacing: "0.06em", paddingTop: "2px" }}
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
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

      {/* ── 6. FAQ ──────────────────────────────────────────────────────────── */}
      {faqs.length > 0 && (
        <Section variant="default" className="border-t border-border">
          <div className="mb-12 border-b border-border pb-12">
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Common Questions
            </p>
            <h2
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Before you send the files.
            </h2>
          </div>
          <dl className="divide-y divide-border border border-border">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="grid gap-4 px-8 py-8 lg:grid-cols-[2fr_3fr] lg:gap-16"
              >
                <dt className="font-medium text-foreground">{faq.question}</dt>
                <dd className="text-sm font-light leading-relaxed text-muted">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </Section>
      )}

      {/* ── 7. Related Services ─────────────────────────────────────────────── */}
      {related.length > 0 && (
        <Section variant="surface" className="border-t border-border">
          <div className="mb-12 flex items-end justify-between gap-8">
            <div>
              <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
                Continue Exploring
              </p>
              <h2
                className="font-bold text-foreground"
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  letterSpacing: "-0.025em",
                }}
              >
                Related services.
              </h2>
            </div>
            <Link
              href="/services"
              className="hidden shrink-0 text-[11px] font-medium uppercase tracking-wider text-secondary transition-colors hover:text-foreground lg:block"
            >
              All Services →
            </Link>
          </div>
          <ul className="divide-y divide-border border border-border" role="list">
            {related.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex cursor-pointer items-center gap-6 px-7 py-7 transition-colors duration-200 hover:bg-background lg:px-9"
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

      {/* ── CTA Band ────────────────────────────────────────────────────────── */}
      <CtaBand
        heading="Send us the red-lines. We send back the drawings."
        subheading="Any format, any scale, any scope. Turnaround in 2 to 4 business days depending on complexity."
        primaryAction={{ label: "Submit Your Red-Lines", href: "/contact" }}
        secondaryAction={{ label: "View All Services", href: "/services" }}
        variant="dark"
      />
    </>
  );
}
