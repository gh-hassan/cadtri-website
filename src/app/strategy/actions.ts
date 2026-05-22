"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY?.trim());

export interface StrategyFormData {
  path: "investment" | "project" | "";
  city: string; state: string; lotSize: string; propertyType: string;
  alreadyPurchased: string; zoning: string; overlays: string[];
  investmentGoal: string; investmentHorizon: string; totalBudget: string;
  buildingIntent: string; experienceLevel: string; knownIssues: string; biggestQuestion: string;
  projectType: string; projectLocation: string; projectSqFt: string; projectBudget: string;
  currentStage: string; hasDrawings: string; hasArchitect: string; hasContractor: string;
  hasPermits: string; mainChallenge: string; targetDate: string; hardDeadline: string;
  teamComposition: string[]; needsMost: string;
  name: string; email: string; phone: string; notes: string;
}

export type StrategyFormState = { status: "idle" | "success" | "error"; message?: string; };

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value: string): string {
  if (!value) return "";
  return `<tr>
    <td style="padding:0 0 16px;">
      <p style="margin:0 0 3px;font-size:10px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#7A6E5F;">${label}</p>
      <p style="margin:0;font-size:14px;line-height:1.6;color:#222222;">${value}</p>
    </td>
  </tr>`;
}

function confirmRow(label: string, value: string): string {
  if (!value) return "";
  return `<tr>
    <td style="padding:0 0 14px;width:36%;vertical-align:top;">
      <p style="margin:0;font-size:10px;font-weight:600;letter-spacing:0.09em;text-transform:uppercase;color:#7A6E5F;font-family:'Plus Jakarta Sans',system-ui,Arial,sans-serif;">${label}</p>
    </td>
    <td style="padding:0 0 14px;vertical-align:top;">
      <p style="margin:0;font-size:14px;line-height:1.5;color:#222222;font-weight:400;font-family:'Plus Jakarta Sans',system-ui,Arial,sans-serif;">${value}</p>
    </td>
  </tr>`;
}

function buildInternalHtml(data: StrategyFormData): string {
  const isInvestment = data.path === "investment";
  const tag = isInvestment
    ? `<span style="display:inline-block;background:#FF6D1F22;border:1px solid #FF6D1F55;color:#FF6D1F;font-size:9px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;padding:3px 8px;border-radius:4px;">Investment Analysis</span>`
    : `<span style="display:inline-block;background:#FF6D1F22;border:1px solid #FF6D1F55;color:#FF6D1F;font-size:9px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;padding:3px 8px;border-radius:4px;">Project Execution Strategy</span>`;

  const bodyRows = isInvestment
    ? [
        row("Name",               esc(data.name)),
        row("Email",              esc(data.email)),
        row("Phone",              data.phone ? esc(data.phone) : ""),
        row("Location",           esc([data.city, data.state].filter(Boolean).join(", "))),
        row("Property Type",      esc(data.propertyType)),
        row("Purchased?",         esc(data.alreadyPurchased)),
        row("Investment Goal",    esc(data.investmentGoal)),
        row("Investment Horizon", esc(data.investmentHorizon)),
        row("Total Budget",       esc(data.totalBudget)),
        row("Building Intent",    esc(data.buildingIntent)),
        row("Experience Level",   esc(data.experienceLevel)),
        row("Known Issues",       data.knownIssues ? esc(data.knownIssues) : ""),
        row("Biggest Question",   esc(data.biggestQuestion)),
        row("Notes",              data.notes ? esc(data.notes) : ""),
      ].join("")
    : [
        row("Name",             esc(data.name)),
        row("Email",            esc(data.email)),
        row("Phone",            data.phone ? esc(data.phone) : ""),
        row("Project Type",     esc(data.projectType)),
        row("Location",         esc(data.projectLocation)),
        row("Current Stage",    esc(data.currentStage)),
        row("Drawings",         esc(data.hasDrawings)),
        row("Architect Hired",  esc(data.hasArchitect)),
        row("Contractor Hired", esc(data.hasContractor)),
        row("Permits",          esc(data.hasPermits)),
        row("Main Challenge",   esc(data.mainChallenge)),
        row("Target Date",      esc(data.targetDate)),
        row("Hard Deadline",    data.hardDeadline ? esc(data.hardDeadline) : ""),
        row("Needs Most",       esc(data.needsMost)),
        row("Notes",            data.notes ? esc(data.notes) : ""),
      ].join("");

  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#F5E7C6;font-family:system-ui,Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
<tr><td align="center">
<table role="presentation" style="width:100%;max-width:560px;background:#fff;border:1px solid #E2D4B8;" cellpadding="0" cellspacing="0">
  <tr><td style="background:#222222;padding:28px 36px;">
    <p style="margin:0;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#FF6D1F;">CADTRI</p>
    <p style="margin:8px 0 4px;font-size:20px;font-weight:700;letter-spacing:-0.02em;color:#FAF3E1;">New Strategy Request</p>
    <p style="margin:8px 0 0;">${tag}</p>
  </td></tr>
  <tr><td style="height:1px;background:#E2D4B8;"></td></tr>
  <tr><td style="padding:32px 36px 12px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${bodyRows}</table>
  </td></tr>
  <tr><td style="background:#F5E7C6;padding:20px 36px;border-top:1px solid #E2D4B8;">
    <p style="margin:0;font-size:11px;color:#7A6E5F;">Submitted via cadtri.com/strategy. Reply to respond directly to ${esc(data.name)}.</p>
  </td></tr>
</table>
</td></tr></table></body></html>`;
}

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@700;800&family=Plus+Jakarta+Sans:wght@300;400;600&display=swap');`;

function buildConfirmationHtml(data: StrategyFormData): string {
  const isInvestment = data.path === "investment";
  const eyebrow      = isInvestment ? "Investment Analysis" : "Project Strategy";
  const location     = isInvestment
    ? [data.city, data.state].filter(Boolean).join(", ")
    : data.projectLocation;
  const projectLabel = isInvestment ? data.propertyType : data.projectType;

  const subText = `We received your strategy request for <strong style="color:#222222;font-weight:600;">${esc(projectLabel || "your project")}</strong>${location ? ` in ${esc(location)}` : ""}. Our team will review your details and send a tailored strategy within two business days.`;

  const nextSteps = [
    "Our team reviews every request manually and prepares a custom strategy.",
    "You will receive your tailored strategy within two business days.",
    "Reply to this email or contact us at info@cadtri.com with any questions.",
  ];

  const summaryPairs = isInvestment
    ? [
        ["Property Type",      data.propertyType],
        ["Location",           [data.city, data.state].filter(Boolean).join(", ")],
        ["Investment Goal",    data.investmentGoal],
        ["Building Intent",    data.buildingIntent],
      ]
    : [
        ["Project Type",   data.projectType],
        ["Location",       data.projectLocation],
        ["Current Stage",  data.currentStage],
        ["Main Challenge", data.mainChallenge],
      ];

  const summaryHtml = summaryPairs
    .filter(([, v]) => v)
    .map(([l, v]) => confirmRow(l, esc(v)))
    .join("");

  return `<!DOCTYPE html><html lang="en">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><style>${FONT_IMPORT}</style></head>
<body style="margin:0;padding:0;background:#FAF3E1;font-family:'Plus Jakarta Sans',system-ui,-apple-system,Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
<tr><td align="center">
<table role="presentation" style="width:100%;max-width:560px;background:#ffffff;border:1px solid #E2D4B8;" cellpadding="0" cellspacing="0">
  <tr><td style="background:#222222;padding:36px 44px 36px;">
    <table cellpadding="0" cellspacing="0" style="margin-bottom:28px;"><tr>
      <td style="background:#FF6D1F;padding:5px 9px 4px;"><span style="font-family:'Unbounded','Arial Black',Arial,sans-serif;font-size:13px;font-weight:800;letter-spacing:0.04em;text-transform:uppercase;color:#FAF3E1;line-height:1;">CAD</span></td>
      <td style="padding-left:7px;vertical-align:middle;"><span style="font-family:'Unbounded','Arial Black',Arial,sans-serif;font-size:13px;font-weight:800;letter-spacing:0.04em;text-transform:uppercase;color:#FAF3E1;line-height:1;">TRI&#8482;</span></td>
    </tr></table>
    <p style="margin:0;font-family:'Unbounded','Arial Black',Arial,sans-serif;font-size:36px;font-weight:800;letter-spacing:-0.03em;line-height:1.08;color:#FAF3E1;">Your strategy<br>request is in.</p>
  </td></tr>
  <tr><td style="height:3px;background:#FF6D1F;line-height:3px;font-size:3px;">&nbsp;</td></tr>
  <tr><td style="padding:40px 44px 0;">
    <p style="margin:0 0 4px;font-family:'Plus Jakarta Sans',system-ui,Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#FF6D1F;">${eyebrow}</p>
    <p style="margin:0;font-family:'Plus Jakarta Sans',system-ui,Arial,sans-serif;font-size:22px;font-weight:600;letter-spacing:-0.02em;color:#222222;line-height:1.2;">Hi ${esc(data.name)},</p>
    <p style="margin:14px 0 0;font-family:'Plus Jakarta Sans',system-ui,Arial,sans-serif;font-size:15px;line-height:1.75;color:#7A6E5F;font-weight:300;">${subText}</p>
  </td></tr>
  <tr><td style="padding:32px 44px 0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FAF3E1;border:1px solid #E2D4B8;">
      <tr><td style="padding:24px 28px 10px;">
        <p style="margin:0 0 18px;font-family:'Plus Jakarta Sans',system-ui,Arial,sans-serif;font-size:10px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#7A6E5F;">Submission Summary</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${summaryHtml}</table>
      </td></tr>
    </table>
  </td></tr>
  <tr><td style="padding:36px 44px 0;">
    <p style="margin:0 0 20px;font-family:'Plus Jakarta Sans',system-ui,Arial,sans-serif;font-size:10px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#7A6E5F;">What happens next</p>
    ${nextSteps.map((s, i) => `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px;"><tr>
      <td style="width:30px;vertical-align:top;padding-top:1px;"><table cellpadding="0" cellspacing="0"><tr><td style="width:22px;height:22px;background:#222222;text-align:center;font-family:'Plus Jakarta Sans',system-ui,Arial,sans-serif;font-size:10px;font-weight:700;color:#FF6D1F;line-height:22px;">${i + 1}</td></tr></table></td>
      <td style="padding-left:14px;vertical-align:top;"><p style="margin:2px 0 0;font-family:'Plus Jakarta Sans',system-ui,Arial,sans-serif;font-size:14px;line-height:1.65;color:#222222;font-weight:300;">${s}</p></td>
    </tr></table>`).join("")}
  </td></tr>
  <tr><td style="padding:32px 44px 0;"><table width="100%"><tr><td style="height:1px;background:#E2D4B8;font-size:1px;line-height:1px;">&nbsp;</td></tr></table></td></tr>
  <tr><td style="padding:24px 44px 36px;">
    <p style="margin:0;font-family:'Plus Jakarta Sans',system-ui,Arial,sans-serif;font-size:13px;line-height:1.65;color:#7A6E5F;font-weight:300;">Questions? Reply to this email or write to <a href="mailto:info@cadtri.com" style="color:#FF6D1F;text-decoration:none;font-weight:600;">info@cadtri.com</a>.</p>
    <p style="margin:10px 0 0;font-family:'Plus Jakarta Sans',system-ui,Arial,sans-serif;font-size:11px;color:#7A6E5F;font-weight:300;line-height:1.6;">CADTRI | Architectural Drafting and Permit Support<br/>cadtri.com</p>
  </td></tr>
</table>
</td></tr></table></body></html>`;
}

export async function submitStrategyForm(formData: FormData): Promise<StrategyFormState> {
  const raw  = formData.get("data") as string | null;
  const file = formData.get("file") as File | null;
  if (!raw) return { status: "error", message: "Missing form data." };

  let data: StrategyFormData;
  try { data = JSON.parse(raw) as StrategyFormData; }
  catch { return { status: "error", message: "Invalid form data." }; }

  if (!data.name || !data.email) return { status: "error", message: "Name and email are required." };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const attachments: any[] = [];
  if (file && file.size > 0) {
    if (file.size > 10 * 1024 * 1024) return { status: "error", message: "File must be under 10 MB." };
    attachments.push({ filename: file.name, content: Buffer.from(await file.arrayBuffer()) });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("[strategy] RESEND_API_KEY is not set");
    return { status: "error", message: "Server configuration error. Please email us directly at info@cadtri.com." };
  }

  try {
    const isInvestment = data.path === "investment";
    const { data: sent, error } = await resend.emails.send({
      from:    "CADTRI Strategy <no-reply@cadtri.com>",
      to:      ["info@cadtri.com"],
      replyTo: data.email,
      subject: isInvestment
        ? `Investment Strategy: ${data.propertyType} in ${data.city} / ${data.name}`
        : `Project Strategy: ${data.projectType} / ${data.name}`,
      html:    buildInternalHtml(data),
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    if (error) {
      console.error("[strategy] Resend error:", JSON.stringify(error));
      return { status: "error", message: "Could not send your request. Please email us directly at info@cadtri.com." };
    }

    console.log("[strategy] Email sent, id:", sent?.id);

    // Confirmation to submitter (best-effort, never blocks success)
    try {
      await resend.emails.send({
        from:    "CADTRI <no-reply@cadtri.com>",
        to:      [data.email],
        replyTo: "info@cadtri.com",
        subject: "Your strategy request is in | CADTRI",
        html:    buildConfirmationHtml(data),
      });
    } catch (confirmErr) {
      console.error("[strategy] Confirmation email failed:", confirmErr instanceof Error ? confirmErr.message : String(confirmErr));
    }

    return { status: "success" };
  } catch (err) {
    console.error("[strategy] Exception:", err instanceof Error ? err.message : String(err));
    return { status: "error", message: "Could not send your request. Please email us directly at info@cadtri.com." };
  }
}
