import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { company } from "@/content/company";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of service for ${company.legalName}. Terms governing the use of our website and professional drafting and permit services.`,
  robots: { index: false },
};

// NOTE: This terms of service is a placeholder for launch purposes.
// It should be reviewed and finalized by a qualified attorney before
// the site goes live or any service agreements are executed through it.

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" heading="Terms of Service." />

      <Section variant="default">
        <div className="mx-auto max-w-2xl">

          {/* Last updated */}
          <p className="mb-10 border-b border-border pb-8 text-[11px] font-medium uppercase tracking-widest text-muted">
            Last updated: April 2026
          </p>

          <div className="flex flex-col gap-10">

            <LegalSection heading="1. These Terms">
              <p>
                These Terms of Service govern your use of the {company.legalName} website at {company.website} and the professional services we provide. By accessing this site or engaging our services, you agree to these terms. Please read them carefully.
              </p>
            </LegalSection>

            <LegalSection heading="2. Services">
              <p>
                CADTRI provides professional architectural drafting and permit support services, including but not limited to: architectural drawing packages, permit set preparation, plan check correction response, structural drawing coordination, code and compliance review, and architectural renderings.
              </p>
              <p>
                All services are subject to a separate written scope of work and fee agreement executed prior to the commencement of work. These terms govern the general engagement framework; specific deliverables, timelines, and fees are defined in the project agreement.
              </p>
            </LegalSection>

            <LegalSection heading="3. Project Agreements">
              <p>
                No work begins until a scope of work is agreed upon in writing and any applicable deposit is received. CADTRI reserves the right to decline any project inquiry without explanation.
              </p>
              <p>
                Project timelines are estimates based on information provided at intake. Delays resulting from incomplete documentation, client revisions, third-party consultants, or building department review periods are outside CADTRI&apos;s control and do not constitute a breach of agreement.
              </p>
            </LegalSection>

            <LegalSection heading="4. Intellectual Property">
              <p>
                All drawings, documents, and deliverables produced by CADTRI remain the intellectual property of CADTRI until all fees for the applicable engagement are paid in full. Upon receipt of full payment, ownership of the project deliverables transfers to the client as specified in the project agreement.
              </p>
              <p>
                CADTRI retains the right to use completed work for portfolio, marketing, and professional development purposes unless otherwise agreed in writing.
              </p>
            </LegalSection>

            <LegalSection heading="5. Payments and Fees">
              <p>
                Payment terms are specified in each project agreement. CADTRI typically requires a deposit prior to commencing work. Final deliverables are released upon receipt of all outstanding fees.
              </p>
              <p>
                Invoices not paid within the agreed terms may be subject to a late fee. CADTRI reserves the right to suspend work on any project with outstanding balances.
              </p>
            </LegalSection>

            <LegalSection heading="6. Revisions and Corrections">
              <p>
                The number of included revision rounds is specified in each project agreement. Revisions requested beyond the agreed scope may be subject to additional fees, which will be communicated and agreed upon before work proceeds.
              </p>
              <p>
                Plan check correction response is included in applicable service engagements as specified. Correction rounds beyond the scope defined in the project agreement may be billed separately.
              </p>
            </LegalSection>

            <LegalSection heading="7. Limitation of Liability">
              <p>
                CADTRI&apos;s liability in connection with any engagement is limited to the total fees paid for that engagement. CADTRI is not responsible for project delays, permit rejections, or construction issues resulting from factors outside our direct control, including building department decisions, third-party engineering, or client-provided information that is inaccurate or incomplete.
              </p>
              <p>
                This website and its content are provided &ldquo;as is&rdquo; without warranty of any kind. CADTRI makes no guarantees regarding permit approval outcomes.
              </p>
            </LegalSection>

            <LegalSection heading="8. Governing Law">
              <p>
                These terms are governed by the laws of the State of California. Any disputes arising from these terms or from a service engagement with CADTRI shall be resolved in accordance with California law in the applicable jurisdiction.
              </p>
            </LegalSection>

            <LegalSection heading="9. Updates to These Terms">
              <p>
                We may update these terms periodically. The revised date at the top of this page reflects the most recent update. Continued use of this website or our services constitutes acceptance of the current terms.
              </p>
            </LegalSection>

            <LegalSection heading="10. Contact">
              <p>
                For questions about these terms, contact us at:{" "}
                <a
                  href={`mailto:${company.email}`}
                  className="text-secondary underline-offset-2 hover:underline"
                >
                  {company.email}
                </a>
              </p>
            </LegalSection>

          </div>
        </div>
      </Section>
    </>
  );
}

// ─── Legal section wrapper ─────────────────────────────────────────────────────

function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <h2
        className="text-[11px] font-semibold uppercase tracking-widest text-foreground"
      >
        {heading}
      </h2>
      <div className="flex flex-col gap-3 text-sm font-light leading-relaxed text-muted">
        {children}
      </div>
    </div>
  );
}
