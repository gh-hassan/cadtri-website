import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { company } from "@/content/company";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${company.legalName}. How we collect, use, and protect information submitted through our website.`,
  robots: { index: false },
};

// NOTE: This privacy policy is a placeholder for launch purposes.
// It should be reviewed and finalized by a qualified attorney before
// the site goes live or any personal data is actively collected.

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" heading="Privacy Policy." />

      <Section variant="default">
        <div className="mx-auto max-w-2xl">

          {/* Last updated */}
          <p className="mb-10 border-b border-border pb-8 text-[11px] font-medium uppercase tracking-widest text-muted">
            Last updated: April 2026
          </p>

          <div className="flex flex-col gap-10">

            <LegalSection heading="1. This Policy">
              <p>
                This Privacy Policy describes how {company.legalName} (&ldquo;CADTRI,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, and handles information provided through our website at {company.website}. By using this website or submitting an inquiry, you agree to the practices described in this policy.
              </p>
            </LegalSection>

            <LegalSection heading="2. Information We Collect">
              <p>
                We collect information you voluntarily provide when submitting a project inquiry through our contact form. This may include your name, email address, company or organization name, project type, and project description.
              </p>
              <p>
                We may also collect basic technical information through website analytics, including page views, general geographic location, browser type, and referring pages. This data is aggregated and not linked to individual identities.
              </p>
            </LegalSection>

            <LegalSection heading="3. How We Use Your Information">
              <p>
                Information submitted through our contact form is used solely to respond to your inquiry, confirm project scope, and communicate about potential or active engagements with CADTRI.
              </p>
              <p>
                We do not sell, rent, or share your personal information with third parties for marketing purposes. Your contact details are used only in the context of your project relationship with CADTRI.
              </p>
            </LegalSection>

            <LegalSection heading="4. Data Retention">
              <p>
                We retain inquiry and project-related correspondence for as long as reasonably necessary to manage our business operations and comply with applicable recordkeeping requirements. You may request deletion of your personal information by contacting us directly.
              </p>
            </LegalSection>

            <LegalSection heading="5. Cookies and Analytics">
              <p>
                Our website may use cookies and similar tracking technologies to understand how visitors interact with our site. Analytics data is used to improve site performance and content. You may disable cookies in your browser settings, though some site functionality may be affected.
              </p>
            </LegalSection>

            <LegalSection heading="6. Third-Party Services">
              <p>
                We may use third-party tools to operate this website, including hosting, analytics, and form processing services. These services are governed by their own privacy policies. We do not authorize these providers to use your information for purposes beyond operating the services they provide to us.
              </p>
            </LegalSection>

            <LegalSection heading="7. Your Rights">
              <p>
                You may request access to, correction of, or deletion of personal information we hold about you. To make a request, contact us at the email address below. We will respond within a reasonable time frame.
              </p>
            </LegalSection>

            <LegalSection heading="8. Updates to This Policy">
              <p>
                We may update this policy periodically. When we do, we will revise the date at the top of this page. Continued use of this website after any changes constitutes acceptance of the updated policy.
              </p>
            </LegalSection>

            <LegalSection heading="9. Contact">
              <p>
                For privacy-related questions or requests, contact us at:{" "}
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
