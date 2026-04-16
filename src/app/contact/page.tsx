import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { ContactForm } from "./contact-form";
import { company } from "@/content/company";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Submit your project details to CADTRI. We review every inquiry and respond with a clear scope of deliverables, timeline, and pricing.",
};

// ─── What to include — for the left column ───────────────────────────────────

const inquiryItems = [
  "Project type and site location",
  "Description of the scope of work",
  "Any existing drawings or documentation",
  "Target permit submission date or project timeline",
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in Touch"
        heading="Start a project with CADTRI."
      />

      {/* ── Inquiry section: intro + form ────────────────────────────────────── */}
      <Section variant="default">
        <div className="grid gap-16 lg:grid-cols-[5fr_7fr] lg:gap-24">

          {/* ── Left: intro copy ────────────────────────────────────────────── */}
          <div className="flex flex-col gap-10">

            <div>
              <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
                <span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />
                Proposal Inquiry
              </p>
              <h2
                className="font-bold text-2xl text-foreground sm:text-3xl"
                style={{ letterSpacing: "-0.025em" }}
              >
                Tell us about your project.
              </h2>
              <p className="mt-5 font-light leading-relaxed text-muted">
                Send us your project details and we will review the scope, confirm
                which services apply, and respond with a clear outline of
                deliverables, timeline, and pricing. We respond to all inquiries
                within one business day.
              </p>
            </div>

            {/* What to include */}
            <div>
              <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-foreground">
                What to include
              </p>
              <ul role="list" className="flex flex-col divide-y divide-border border-y border-border">
                {inquiryItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-4 py-3.5 text-sm font-light text-muted"
                  >
                    <span className="h-px w-4 shrink-0 bg-secondary/60" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct contact details */}
            <div className="flex flex-col gap-6 border-t border-border pt-8">

              <div>
                <p className="mb-1 text-[11px] font-medium uppercase tracking-widest text-secondary">
                  Email
                </p>
                <a
                  href={`mailto:${company.email}`}
                  className="text-sm font-light text-foreground transition-colors hover:text-secondary"
                >
                  {company.email}
                </a>
              </div>

              <div>
                <p className="mb-1 text-[11px] font-medium uppercase tracking-widest text-secondary">
                  Phone
                </p>
                <a
                  href={`tel:${company.phone.replace(/\D/g, "")}`}
                  className="text-sm font-light text-foreground transition-colors hover:text-secondary"
                >
                  {company.phone}
                </a>
              </div>

              <div>
                <p className="mb-1 text-[11px] font-medium uppercase tracking-widest text-secondary">
                  Location
                </p>
                <p className="text-sm font-light text-foreground">
                  {company.address.city}, {company.address.state}
                </p>
              </div>

            </div>

          </div>

          {/* ── Right: inquiry form ──────────────────────────────────────────── */}
          <div>
            <ContactForm />
          </div>

        </div>
      </Section>

      {/* ── Next steps band ──────────────────────────────────────────────────── */}
      <Section variant="surface" className="border-t border-border" compact>
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">

          <div>
            <p className="mb-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              01. After You Submit
            </p>
            <p className="text-sm font-light leading-relaxed text-muted">
              We review your project details and confirm which services apply,
              the expected timeline, and the fee. You will receive a clear scope
              of work before anything begins.
            </p>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              02. Scope Confirmation
            </p>
            <p className="text-sm font-light leading-relaxed text-muted">
              Once scope is agreed, we conduct jurisdiction research and begin
              production. You will have a single point of contact throughout
              the entire engagement.
            </p>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              03. Delivery and Support
            </p>
            <p className="text-sm font-light leading-relaxed text-muted">
              Your completed package is delivered permit-ready. We remain
              available to address plan check comments and support resubmission
              through permit issuance.
            </p>
          </div>

        </div>
      </Section>
    </>
  );
}
