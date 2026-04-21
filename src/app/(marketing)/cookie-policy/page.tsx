import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { company } from "@/content/company";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `Cookie policy for ${company.legalName}. How we use cookies and similar technologies on our website.`,
  robots: { index: false },
};

export default function CookiePolicyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" heading="Cookie Policy." />

      <Section variant="default">
        <div className="mx-auto max-w-2xl">

          <p className="mb-10 border-b border-border pb-8 text-[11px] font-medium uppercase tracking-widest text-muted">
            Last updated: April 2026
          </p>

          <div className="flex flex-col gap-10">

            <LegalSection heading="1. What Are Cookies">
              <p>
                Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work efficiently and to provide information to site owners. This policy explains how {company.legalName} and the third-party services we use may set cookies when you visit {company.website}.
              </p>
            </LegalSection>

            <LegalSection heading="2. Analytics">
              <p>
                We use Plausible Analytics to understand how visitors interact with our website. Plausible is a privacy-first analytics tool that does not use cookies and does not collect personal data or track users across websites. No cookie is set for analytics purposes.
              </p>
            </LegalSection>

            <LegalSection heading="3. Security and Bot Protection">
              <p>
                Our contact form uses Cloudflare Turnstile to distinguish human visitors from automated bots. Turnstile may set a short-lived cookie or use browser storage to complete its challenge process. This data is used solely for security verification and is not used for tracking or advertising.
              </p>
            </LegalSection>

            <LegalSection heading="4. Scheduling Embed">
              <p>
                Our booking page embeds a scheduling tool provided by Cal.com. When you interact with the booking calendar, Cal.com may set cookies to maintain your session state and preferences during the scheduling flow. These cookies are governed by Cal.com&apos;s own privacy and cookie policies.
              </p>
            </LegalSection>

            <LegalSection heading="5. Essential Cookies">
              <p>
                Our portfolio access system uses a session cookie to remember that you have entered a valid access code during your visit. This cookie contains no personal information and expires when you close your browser or after a short period of inactivity. It cannot be disabled without affecting portfolio access functionality.
              </p>
            </LegalSection>

            <LegalSection heading="6. Managing Cookies">
              <p>
                Most browsers allow you to control cookies through their settings. You can set your browser to refuse cookies or delete cookies that have already been set. Doing so may affect the functionality of certain features on this website, including the booking calendar and portfolio access.
              </p>
              <p>
                For instructions on managing cookies in your browser, refer to your browser&apos;s help documentation.
              </p>
            </LegalSection>

            <LegalSection heading="7. Updates to This Policy">
              <p>
                We may update this cookie policy periodically to reflect changes in the technologies we use. The date at the top of this page reflects the most recent revision. Continued use of this website after any changes constitutes acceptance of the updated policy.
              </p>
            </LegalSection>

            <LegalSection heading="8. Contact">
              <p>
                For questions about how we use cookies, contact us at:{" "}
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

function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-[11px] font-semibold uppercase tracking-widest text-foreground">
        {heading}
      </h2>
      <div className="flex flex-col gap-3 text-sm font-light leading-relaxed text-muted">
        {children}
      </div>
    </div>
  );
}
