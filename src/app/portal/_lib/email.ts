import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendMagicLinkEmail(to: string, magicLink: string) {
  await resend.emails.send({
    from: "CADTRI <hello@cadtri.com>",
    to,
    subject: "Your CADTRI Client Portal Link",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; color: #222;">
        <p style="font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; color: #FF6D1F; font-weight: 600;">CADTRI Client Portal</p>
        <h1 style="font-size: 24px; font-weight: 800; margin: 8px 0 24px;">Your sign-in link</h1>
        <p style="color: #7A6E5F; line-height: 1.6;">Click the button below to access your client portal. This link expires in 15 minutes and can only be used once.</p>
        <a href="${magicLink}" style="display:inline-block; margin: 24px 0; padding: 14px 28px; background: #FF6D1F; color: #fff; text-decoration: none; font-weight: 600; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase;">
          Access Portal
        </a>
        <p style="font-size: 12px; color: #7A6E5F;">If you did not request this link, you can safely ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #E2D4B8; margin: 32px 0;" />
        <p style="font-size: 11px; color: #7A6E5F;">CADTRI &mdash; Architectural Drafting &amp; Permit Support</p>
      </div>
    `,
  });
}
