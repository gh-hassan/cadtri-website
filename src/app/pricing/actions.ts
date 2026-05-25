"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY?.trim());

export interface PricingFormData {
  path:            "active" | "future" | "";
  clientType:      string;
  projectType:     string;
  projectStage:    string;
  projectSize:     string;
  timeline:        string;
  budget:          string;
  city:            string;
  state:           string;
  county:          string;
  services:        string[];
  futureTimeframe: string;
  name:            string;
  email:           string;
  phone:           string;
  notes:           string;
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

  const isFuture = data.path === "future";
  const emailTitle = isFuture ? "New Planning Inquiry" : "New Pricing Request";
  const emailTag   = isFuture
    ? `<span style="display:inline-block;background:#FF6D1F22;border:1px solid #FF6D1F55;color:#FF6D1F;font-size:9px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;padding:3px 8px;border-radius:4px;">Warm Lead — Planning Stage</span>`
    : `<span style="display:inline-block;background:#FF6D1F22;border:1px solid #FF6D1F55;color:#FF6D1F;font-size:9px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;padding:3px 8px;border-radius:4px;">Hot Lead — Active Project</span>`;

  const bodyRows = isFuture
    ? `
              ${row("Name",             escapeHtml(data.name))}
              ${row("Email",            escapeHtml(data.email))}
              ${row("Phone",            data.phone ? escapeHtml(data.phone) : "")}
              ${row("Role",             escapeHtml(data.clientType))}
              ${row("Project Interest", escapeHtml(data.projectType))}
              ${row("Expected Start",   escapeHtml(data.futureTimeframe))}
              ${row("Location",         escapeHtml([data.city, data.state].filter(Boolean).join(", ")))}
              ${row("Notes",            data.notes ? escapeHtml(data.notes) : "")}
    `
    : `
              ${row("Name",             escapeHtml(data.name))}
              ${row("Email",            escapeHtml(data.email))}
              ${row("Phone",            data.phone ? escapeHtml(data.phone) : "")}
              ${row("Client Type",      escapeHtml(data.clientType))}
              ${row("Project Type",     escapeHtml(data.projectType))}
              ${row("Project Stage",    escapeHtml(data.projectStage))}
              ${row("Project Size",     escapeHtml(data.projectSize))}
              ${row("Timeline",         escapeHtml(data.timeline))}
              ${row("Budget Range",     escapeHtml(data.budget))}
              ${row("Location",         escapeHtml([data.city, data.county, data.state].filter(Boolean).join(", ")))}
              ${row("Services Needed",  escapeHtml(data.services.join(", ") || "Not specified"))}
              ${row("Additional Notes", data.notes ? escapeHtml(data.notes) : "")}
              ${attachments.length > 0 ? row("Attachment", `${attachments[0].filename} (see attached)`) : ""}
    `;

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
            <p style="margin:8px 0 0;font-size:20px;font-weight:700;letter-spacing:-0.02em;color:#FAF3E1;">${emailTitle}</p>
            <p style="margin:10px 0 0;">${emailTag}</p>
          </td>
        </tr>

        <tr><td style="height:1px;background:#E2D4B8;"></td></tr>

        <tr>
          <td style="padding:32px 36px 12px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              ${bodyRows}
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

  if (!process.env.RESEND_API_KEY) {
    console.error("[pricing] RESEND_API_KEY is not set");
    return { status: "error", message: "Server configuration error. Please email us directly at info@cadtri.com." };
  }

  try {
    console.log("[pricing] Sending to Resend for:", data.email);

    // Run both sends in parallel — halves total execution time and avoids cold-start timeouts
    const [internalResult, confirmResult] = await Promise.allSettled([
      resend.emails.send({
        from:        "CADTRI Pricing <no-reply@cadtri.com>",
        to:          ["info@cadtri.com"],
        replyTo:     data.email,
        subject:     isFuture
          ? `Planning Inquiry: ${data.projectType} / ${data.name}`
          : `Pricing Request: ${data.projectType} / ${data.name}`,
        html,
        attachments: attachments.length > 0 ? attachments : undefined,
      }),
      resend.emails.send({
        from:    "CADTRI <no-reply@cadtri.com>",
        to:      [data.email],
        replyTo: "info@cadtri.com",
        subject: isFuture
          ? "Your planning inquiry is in | CADTRI"
          : "Your pricing request is in | CADTRI",
        html: buildConfirmationHtml(data),
      }),
    ]);

    // Internal email must succeed
    if (internalResult.status === "rejected" || internalResult.value?.error) {
      const msg = internalResult.status === "rejected"
        ? String(internalResult.reason)
        : JSON.stringify(internalResult.value.error);
      console.error("[pricing] Internal email failed:", msg);
      return { status: "error", message: "Could not send your request. Please email us directly at info@cadtri.com." };
    }
    console.log("[pricing] Internal email sent, id:", internalResult.value?.data?.id);

    // Confirmation is best-effort — log but never block success
    if (confirmResult.status === "rejected") {
      console.error("[pricing] Confirmation email failed (non-fatal):", String(confirmResult.reason));
    } else if (confirmResult.value?.error) {
      console.error("[pricing] Confirmation email error (non-fatal):", JSON.stringify(confirmResult.value.error));
    } else {
      console.log("[pricing] Confirmation email sent, id:", confirmResult.value?.data?.id);
    }

    return { status: "success" };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[pricing] Exception:", msg);
    return { status: "error", message: "Could not send your request. Please email us directly at info@cadtri.com." };
  }
}

// ─── User confirmation email ──────────────────────────────────────────────────

function confirmRow(label: string, value: string): string {
  if (!value) return "";
  return `
    <tr>
      <td style="padding:0 0 14px;width:36%;vertical-align:top;">
        <p style="margin:0;font-size:10px;font-weight:600;letter-spacing:0.09em;text-transform:uppercase;color:#7A6E5F;font-family:'Plus Jakarta Sans',system-ui,Arial,sans-serif;">${label}</p>
      </td>
      <td style="padding:0 0 14px;vertical-align:top;">
        <p style="margin:0;font-size:14px;line-height:1.5;color:#222222;font-weight:400;font-family:'Plus Jakarta Sans',system-ui,Arial,sans-serif;">${value}</p>
      </td>
    </tr>`;
}

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@700;800&family=Plus+Jakarta+Sans:wght@300;400;600&display=swap');`;

function buildConfirmationHtml(data: PricingFormData): string {
  const isFuture = data.path === "future";
  const location = [data.city, data.state].filter(Boolean).join(", ");

  const h1      = isFuture ? "Your inquiry<br>is in." : "Your request<br>is in.";
  const subText = isFuture
    ? `We received your planning inquiry for <strong style="color:#222222;font-weight:600;">${escapeHtml(data.projectType || "your project")}</strong>${location ? ` in ${escapeHtml(location)}` : ""}. Our team will follow up with relevant information within one business day.`
    : `We received your pricing request for <strong style="color:#222222;font-weight:600;">${escapeHtml(data.projectType || "your project")}</strong>${location ? ` in ${escapeHtml(location)}` : ""}. We review every request manually and will send a tailored estimate within one business day.`;

  const nextSteps = isFuture
    ? [
        "Our team will review your inquiry and project interest.",
        "We will send you relevant information about scope, timeline, and cost.",
        "Reply to this email or contact us at info@cadtri.com with any questions.",
      ]
    : [
        "Our team reviews every request manually. No automated estimates.",
        "You will receive a tailored pricing estimate within one business day.",
        "We may reach out to clarify project details if needed.",
      ];

  const summaryRows = isFuture
    ? [
        confirmRow("Role",             escapeHtml(data.clientType)),
        confirmRow("Project",          escapeHtml(data.projectType)),
        confirmRow("Expected Start",   escapeHtml(data.futureTimeframe)),
        confirmRow("Location",         escapeHtml(location)),
        confirmRow("Notes",            data.notes ? escapeHtml(data.notes) : ""),
      ].join("")
    : [
        confirmRow("Project Type",     escapeHtml(data.projectType)),
        confirmRow("Stage",            escapeHtml(data.projectStage)),
        confirmRow("Timeline",         escapeHtml(data.timeline)),
        confirmRow("Budget",           escapeHtml(data.budget)),
        confirmRow("Location",         escapeHtml(location)),
        confirmRow("Services",         escapeHtml(data.services.slice(0, 4).join(", ") + (data.services.length > 4 ? ` +${data.services.length - 4} more` : ""))),
        confirmRow("Notes",            data.notes ? escapeHtml(data.notes) : ""),
      ].join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <style>${FONT_IMPORT}</style>
</head>
<body style="margin:0;padding:0;background:#FAF3E1;font-family:'Plus Jakarta Sans',system-ui,-apple-system,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr><td align="center">
      <table role="presentation" style="width:100%;max-width:560px;background:#ffffff;border:1px solid #E2D4B8;" cellpadding="0" cellspacing="0">

        <!-- ── Dark header ── -->
        <tr>
          <td style="background:#222222;padding:36px 44px 36px;">

            <!-- Logo: matches site — CAD on orange chip, TRI plain -->
            <table cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
              <tr>
                <td style="background:#FF6D1F;padding:5px 9px 4px;">
                  <span style="font-family:'Unbounded','Arial Black',Arial,sans-serif;font-size:13px;font-weight:800;letter-spacing:0.04em;text-transform:uppercase;color:#FAF3E1;line-height:1;">CAD</span>
                </td>
                <td style="padding-left:7px;vertical-align:middle;">
                  <span style="font-family:'Unbounded','Arial Black',Arial,sans-serif;font-size:13px;font-weight:800;letter-spacing:0.04em;text-transform:uppercase;color:#FAF3E1;line-height:1;">TRI</span><span style="font-family:'Unbounded',Arial,sans-serif;font-size:8px;color:#FAF3E1;opacity:0.45;vertical-align:super;line-height:1;">&#8482;</span>
                </td>
              </tr>
            </table>

            <!-- Heading — Unbounded ExtraBold, matches site h1 style -->
            <p style="margin:0;font-family:'Unbounded','Arial Black',Arial,sans-serif;font-size:36px;font-weight:800;letter-spacing:-0.03em;line-height:1.08;color:#FAF3E1;">
              ${h1}
            </p>

          </td>
        </tr>

        <!-- Orange accent bar — same as site's primary accent -->
        <tr><td style="height:3px;background:#FF6D1F;line-height:3px;font-size:3px;">&nbsp;</td></tr>

        <!-- ── Greeting ── -->
        <tr>
          <td style="padding:40px 44px 0;">
            <p style="margin:0 0 4px;font-family:'Plus Jakarta Sans',system-ui,Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#FF6D1F;">
              ${isFuture ? "Planning Inquiry" : "Pricing Request"}
            </p>
            <p style="margin:0;font-family:'Plus Jakarta Sans',system-ui,Arial,sans-serif;font-size:22px;font-weight:600;letter-spacing:-0.02em;color:#222222;line-height:1.2;">
              Hi ${escapeHtml(data.name)},
            </p>
            <p style="margin:14px 0 0;font-family:'Plus Jakarta Sans',system-ui,Arial,sans-serif;font-size:15px;line-height:1.75;color:#7A6E5F;font-weight:300;">
              ${subText}
            </p>
          </td>
        </tr>

        <!-- ── Submission summary ── -->
        <tr>
          <td style="padding:32px 44px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FAF3E1;border:1px solid #E2D4B8;">
              <tr>
                <td style="padding:24px 28px 10px;">
                  <p style="margin:0 0 18px;font-family:'Plus Jakarta Sans',system-ui,Arial,sans-serif;font-size:10px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#7A6E5F;">
                    Submission Summary
                  </p>
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    ${summaryRows}
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ── What happens next ── -->
        <tr>
          <td style="padding:36px 44px 0;">
            <p style="margin:0 0 20px;font-family:'Plus Jakarta Sans',system-ui,Arial,sans-serif;font-size:10px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#7A6E5F;">
              What happens next
            </p>
            ${nextSteps.map((s, i) => `
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
              <tr>
                <td style="width:30px;vertical-align:top;padding-top:1px;">
                  <table cellpadding="0" cellspacing="0"><tr>
                    <td style="width:22px;height:22px;background:#222222;text-align:center;font-family:'Plus Jakarta Sans',system-ui,Arial,sans-serif;font-size:10px;font-weight:700;color:#FF6D1F;line-height:22px;">${i + 1}</td>
                  </tr></table>
                </td>
                <td style="padding-left:14px;vertical-align:top;">
                  <p style="margin:2px 0 0;font-family:'Plus Jakarta Sans',system-ui,Arial,sans-serif;font-size:14px;line-height:1.65;color:#222222;font-weight:300;">${s}</p>
                </td>
              </tr>
            </table>`).join("")}
          </td>
        </tr>

        <!-- Divider -->
        <tr><td style="padding:32px 44px 0;"><table width="100%"><tr><td style="height:1px;background:#E2D4B8;font-size:1px;line-height:1px;">&nbsp;</td></tr></table></td></tr>

        <!-- ── Footer ── -->
        <tr>
          <td style="padding:24px 44px 36px;">
            <p style="margin:0;font-family:'Plus Jakarta Sans',system-ui,Arial,sans-serif;font-size:13px;line-height:1.65;color:#7A6E5F;font-weight:300;">
              Questions? Reply to this email or write to <a href="mailto:info@cadtri.com" style="color:#FF6D1F;text-decoration:none;font-weight:600;">info@cadtri.com</a>.
            </p>
            <p style="margin:10px 0 0;font-family:'Plus Jakarta Sans',system-ui,Arial,sans-serif;font-size:11px;color:#7A6E5F;font-weight:300;line-height:1.6;">
              CADTRI | Architectural Drafting and Permit Support<br/>cadtri.com
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
