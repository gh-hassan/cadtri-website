"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const PROJECT_TYPES: Record<string, string> = {
  residential: "Residential",
  commercial: "Commercial",
  "mixed-use": "Mixed-Use",
  adu: "ADU or Accessory Structure",
  "tenant-improvement": "Tenant Improvement",
  other: "Other",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function verifyTurnstile(token: string): Promise<boolean> {
  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: token,
        }),
        cache: "no-store",
      },
    );
    const data = (await res.json()) as { success: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Honeypot: bots fill in the hidden field, humans leave it empty
  const honeypot = formData.get("website");
  if (typeof honeypot === "string" && honeypot.trim().length > 0) {
    return { status: "success" }; // silently succeed to fool bots
  }

  // Extract and sanitize fields
  const name = ((formData.get("name") as string | null) ?? "").trim();
  const email = ((formData.get("email") as string | null) ?? "").trim();
  const company = ((formData.get("company") as string | null) ?? "").trim();
  const projectType = (formData.get("projectType") as string | null) ?? "";
  const scope = ((formData.get("scope") as string | null) ?? "").trim();
  const turnstileToken =
    (formData.get("cf-turnstile-response") as string | null) ?? "";

  // Validate required fields
  if (name.length < 2) {
    return { status: "error", message: "Please enter your full name." };
  }
  if (!EMAIL_RE.test(email)) {
    return {
      status: "error",
      message: "Please enter a valid email address.",
    };
  }
  if (!PROJECT_TYPES[projectType]) {
    return { status: "error", message: "Please select a project type." };
  }
  if (scope.length < 20) {
    return {
      status: "error",
      message:
        "Please provide a more detailed project description (at least 20 characters).",
    };
  }

  // Verify Turnstile CAPTCHA
  if (!turnstileToken) {
    return {
      status: "error",
      message: "Please complete the verification check.",
    };
  }
  const captchaOk = await verifyTurnstile(turnstileToken);
  if (!captchaOk) {
    return {
      status: "error",
      message: "Verification failed. Please refresh and try again.",
    };
  }

  // Send email via Resend
  try {
    await resend.emails.send({
      from: "CADTRI Website <no-reply@cadtri.com>",
      to: ["info@cadtri.com"],
      replyTo: email,
      subject: `Project Inquiry: ${PROJECT_TYPES[projectType]} / ${name}`,
      html: buildEmailHtml({
        name,
        email,
        company,
        projectType: PROJECT_TYPES[projectType],
        scope,
      }),
    });

    return { status: "success" };
  } catch (err) {
    console.error("[contact] Resend error:", err);
    return {
      status: "error",
      message:
        "We could not send your message. Please email us directly at info@cadtri.com.",
    };
  }
}

// ─── Email helpers ────────────────────────────────────────────────────────────

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function fieldBlock(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:0 0 20px;">
        <p style="margin:0 0 4px;font-size:10px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#7A6E5F;">${label}</p>
        <p style="margin:0;font-size:14px;line-height:1.6;color:#222222;">${value}</p>
      </td>
    </tr>`;
}

function buildEmailHtml(fields: {
  name: string;
  email: string;
  company: string;
  projectType: string;
  scope: string;
}): string {
  const { name, email, company, projectType, scope } = fields;

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
              <p style="margin:8px 0 0;font-size:20px;font-weight:700;letter-spacing:-0.02em;color:#FAF3E1;">New Project Inquiry</p>
            </td>
          </tr>

          <!-- Divider -->
          <tr><td style="height:1px;background:#E2D4B8;"></td></tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 36px 12px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${fieldBlock("Name", escapeHtml(name))}
                ${fieldBlock(
                  "Email",
                  `<a href="mailto:${escapeHtml(email)}" style="color:#FF6D1F;text-decoration:none;">${escapeHtml(email)}</a>`,
                )}
                ${company ? fieldBlock("Company", escapeHtml(company)) : ""}
                ${fieldBlock("Project Type", escapeHtml(projectType))}
                ${fieldBlock(
                  "Project Scope",
                  `<span style="white-space:pre-wrap;">${escapeHtml(scope)}</span>`,
                )}
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#F5E7C6;padding:20px 36px;border-top:1px solid #E2D4B8;">
              <p style="margin:0;font-size:11px;color:#7A6E5F;">
                Submitted via cadtri.com. Reply to this email to respond directly to ${escapeHtml(name)}.
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
