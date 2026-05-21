"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface PricingFormData {
  clientType:   string;
  projectType:  string;
  projectStage: string;
  projectSize:  string;
  timeline:     string;
  budget:       string;
  city:         string;
  state:        string;
  services:     string[];
  name:         string;
  email:        string;
  phone:        string;
  notes:        string;
}

export type PricingFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value: string): string {
  if (!value) return "";
  return `
    <tr>
      <td style="padding:0 0 16px;">
        <p style="margin:0 0 3px;font-size:10px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#7A6E5F;">${label}</p>
        <p style="margin:0;font-size:14px;line-height:1.6;color:#222222;">${value}</p>
      </td>
    </tr>`;
}

export async function submitPricingForm(formData: FormData): Promise<PricingFormState> {
  const raw  = formData.get("data") as string | null;
  const file = formData.get("file") as File | null;

  if (!raw) return { status: "error", message: "Missing form data." };

  let data: PricingFormData;
  try {
    data = JSON.parse(raw) as PricingFormData;
  } catch {
    return { status: "error", message: "Invalid form data." };
  }

  if (!data.name || !data.email) {
    return { status: "error", message: "Name and email are required." };
  }

  // Build file attachment if present
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const attachments: any[] = [];
  if (file && file.size > 0) {
    if (file.size > 10 * 1024 * 1024) {
      return { status: "error", message: "File must be under 10 MB." };
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    attachments.push({ filename: file.name, content: buffer });
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#F5E7C6;font-family:system-ui,-apple-system,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr><td align="center">
      <table role="presentation" style="width:100%;max-width:560px;background:#fff;border:1px solid #E2D4B8;" cellpadding="0" cellspacing="0">

        <tr>
          <td style="background:#222222;padding:28px 36px;">
            <p style="margin:0;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#FF6D1F;">CADTRI</p>
            <p style="margin:8px 0 0;font-size:20px;font-weight:700;letter-spacing:-0.02em;color:#FAF3E1;">New Pricing Request</p>
          </td>
        </tr>

        <tr><td style="height:1px;background:#E2D4B8;"></td></tr>

        <tr>
          <td style="padding:32px 36px 12px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              ${row("Name",             escapeHtml(data.name))}
              ${row("Email",            escapeHtml(data.email))}
              ${row("Phone",            data.phone ? escapeHtml(data.phone) : "")}
              ${row("Client Type",      escapeHtml(data.clientType))}
              ${row("Project Type",     escapeHtml(data.projectType))}
              ${row("Project Stage",    escapeHtml(data.projectStage))}
              ${row("Project Size",     escapeHtml(data.projectSize))}
              ${row("Timeline",         escapeHtml(data.timeline))}
              ${row("Budget Range",     escapeHtml(data.budget))}
              ${row("Location",         escapeHtml(`${data.city}, ${data.state}`))}
              ${row("Services Needed",  escapeHtml(data.services.join(", ") || "Not specified"))}
              ${row("Additional Notes", data.notes ? escapeHtml(data.notes) : "")}
              ${attachments.length > 0 ? row("Attachment", `${attachments[0].filename} (see attached)`) : ""}
            </table>
          </td>
        </tr>

        <tr>
          <td style="background:#F5E7C6;padding:20px 36px;border-top:1px solid #E2D4B8;">
            <p style="margin:0;font-size:11px;color:#7A6E5F;">
              Submitted via cadtri.com/pricing. Reply to respond directly to ${escapeHtml(data.name)}.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  try {
    await resend.emails.send({
      from:        "CADTRI Pricing <no-reply@cadtri.com>",
      to:          ["info@cadtri.com"],
      replyTo:     data.email,
      subject:     `Pricing Request: ${data.projectType} / ${data.name}`,
      html,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    return { status: "success" };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[pricing] Resend error:", msg);
    return {
      status:  "error",
      message: "Could not send your request. Please email us directly at info@cadtri.com.",
    };
  }
}
