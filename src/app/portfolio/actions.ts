"use server";

import { Resend } from "resend";
import { cookies } from "next/headers";

const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type PortfolioActionState = {
  status: "idle" | "success" | "error";
  message?: string;
};

// ─── Request access ───────────────────────────────────────────────────────────

export async function requestPortfolioAccess(
  _prev: PortfolioActionState,
  formData: FormData,
): Promise<PortfolioActionState> {
  const name = ((formData.get("name") as string | null) ?? "").trim();
  const email = ((formData.get("email") as string | null) ?? "").trim();
  const company = ((formData.get("company") as string | null) ?? "").trim();

  if (name.length < 2) {
    return { status: "error", message: "Please enter your name." };
  }
  if (!EMAIL_RE.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  try {
    await resend.emails.send({
      from: "CADTRI Website <no-reply@cadtri.com>",
      to: ["info@cadtri.com"],
      replyTo: email,
      subject: `Portfolio Access Request: ${name}`,
      html: buildRequestEmail({ name, email, company }),
    });

    return { status: "success" };
  } catch (err) {
    console.error("[portfolio] Resend error:", err);
    return {
      status: "error",
      message: "Could not send request. Please email us at info@cadtri.com.",
    };
  }
}

// ─── Verify code ──────────────────────────────────────────────────────────────

export async function verifyPortfolioCode(
  _prev: PortfolioActionState,
  formData: FormData,
): Promise<PortfolioActionState> {
  const code = ((formData.get("code") as string | null) ?? "").trim();
  const validCode = (process.env.PORTFOLIO_ACCESS_CODE ?? "").trim();

  if (!validCode) {
    return { status: "error", message: "Portfolio access is not configured." };
  }

  if (code.toLowerCase() !== validCode.toLowerCase()) {
    return {
      status: "error",
      message: "Invalid access code. Please check your email and try again.",
    };
  }

  const cookieStore = await cookies();
  cookieStore.set("portfolio_session", validCode, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });

  return { status: "success" };
}

// ─── Email template ───────────────────────────────────────────────────────────

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildRequestEmail(fields: {
  name: string;
  email: string;
  company: string;
}): string {
  const { name, email, company } = fields;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
</head>
<body style="margin:0;padding:0;background:#F5E7C6;font-family:system-ui,-apple-system,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" style="width:100%;max-width:560px;background:#ffffff;border:1px solid #E2D4B8;" cellpadding="0" cellspacing="0">

          <!-- Header -->
          <tr>
            <td style="background:#222222;padding:28px 36px;">
              <p style="margin:0;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#FF6D1F;">CADTRI</p>
              <p style="margin:8px 0 0;font-size:20px;font-weight:700;letter-spacing:-0.02em;color:#FAF3E1;">Portfolio Access Request</p>
            </td>
          </tr>

          <!-- Divider -->
          <tr><td style="height:1px;background:#E2D4B8;"></td></tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 36px 12px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:0 0 20px;">
                    <p style="margin:0 0 4px;font-size:10px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#7A6E5F;">Name</p>
                    <p style="margin:0;font-size:14px;line-height:1.6;color:#222222;">${escapeHtml(name)}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 0 20px;">
                    <p style="margin:0 0 4px;font-size:10px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#7A6E5F;">Email</p>
                    <p style="margin:0;font-size:14px;line-height:1.6;color:#222222;"><a href="mailto:${escapeHtml(email)}" style="color:#FF6D1F;text-decoration:none;">${escapeHtml(email)}</a></p>
                  </td>
                </tr>
                ${company ? `<tr><td style="padding:0 0 20px;"><p style="margin:0 0 4px;font-size:10px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#7A6E5F;">Company</p><p style="margin:0;font-size:14px;line-height:1.6;color:#222222;">${escapeHtml(company)}</p></td></tr>` : ""}
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#F5E7C6;padding:20px 36px;border-top:1px solid #E2D4B8;">
              <p style="margin:0;font-size:11px;color:#7A6E5F;">
                Submitted via cadtri.com/portfolio. Reply to this email to send ${escapeHtml(name)} their access code.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
