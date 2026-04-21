"use server";

import { Resend } from "resend";
import { db } from "@/app/portal/_lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY!);

type EventType = "project_created" | "status_changed" | "document_added" | "welcome";

const STATUS_DISPLAY: Record<string, string> = {
  proposal:    "Proposal",
  in_progress: "In Progress",
  plan_check:  "Plan Check",
  approved:    "Approved",
  completed:   "Completed",
  on_hold:     "On Hold",
  cancelled:   "Cancelled",
};

function emailWrapper(body: string) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#FAF3E1;font-family:sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF3E1;padding:40px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
        <!-- Header -->
        <tr>
          <td style="background:#222222;padding:24px 32px;">
            <p style="margin:0;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#FF6D1F;font-weight:600;">CADTRI Client Portal</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="background:#ffffff;padding:40px 32px;border:1px solid #E2D4B8;border-top:none;">
            ${body}
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:24px 0;text-align:center;">
            <p style="margin:0;font-size:11px;color:#7A6E5F;letter-spacing:0.08em;">
              CADTRI &mdash; Architectural Drafting &amp; Permit Support<br>
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/portal" style="color:#FF6D1F;text-decoration:none;">Access your portal</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

async function logNotification(clientId: string, eventType: EventType, subject: string, metadata?: object) {
  await db.from("notification_log").insert({ client_id: clientId, event_type: eventType, subject, metadata });
}

export async function notifyProjectCreated(clientId: string, projectName: string, address?: string) {
  const { data: client } = await db.from("clients").select("email, company_name").eq("id", clientId).single();
  if (!client) return;

  const subject = `New project added: ${projectName}`;
  const portalUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/portal/projects`;

  const body = `
    <h1 style="margin:0 0 8px;font-size:22px;font-weight:800;color:#222222;">New project added</h1>
    <p style="margin:0 0 24px;font-size:14px;color:#7A6E5F;line-height:1.6;">We have added a new project to your portal.</p>
    <table style="width:100%;border:1px solid #E2D4B8;margin-bottom:24px;">
      <tr><td style="padding:16px 20px;background:#F5E7C6;">
        <p style="margin:0;font-size:12px;font-weight:700;color:#FF6D1F;text-transform:uppercase;letter-spacing:0.1em;">Project</p>
        <p style="margin:4px 0 0;font-size:16px;font-weight:700;color:#222222;">${projectName}</p>
        ${address ? `<p style="margin:4px 0 0;font-size:13px;color:#7A6E5F;">${address}</p>` : ""}
      </td></tr>
    </table>
    <a href="${portalUrl}" style="display:inline-block;padding:14px 28px;background:#FF6D1F;color:#ffffff;text-decoration:none;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">View in Portal</a>`;

  await resend.emails.send({ from: "CADTRI <hello@cadtri.com>", to: client.email, subject, html: emailWrapper(body) });
  await logNotification(clientId, "project_created", subject, { projectName });
}

export async function notifyStatusChanged(clientId: string, projectId: string, projectName: string, newStatus: string, statusNote?: string) {
  const { data: client } = await db.from("clients").select("email, company_name").eq("id", clientId).single();
  if (!client) return;

  const displayStatus = STATUS_DISPLAY[newStatus] ?? newStatus;
  const subject = `Project update: ${projectName} is now ${displayStatus}`;
  const portalUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/portal/projects/${projectId}`;

  const body = `
    <h1 style="margin:0 0 8px;font-size:22px;font-weight:800;color:#222222;">Project status updated</h1>
    <p style="margin:0 0 24px;font-size:14px;color:#7A6E5F;line-height:1.6;">Your project status has been updated.</p>
    <table style="width:100%;border:1px solid #E2D4B8;margin-bottom:24px;">
      <tr><td style="padding:16px 20px;background:#F5E7C6;">
        <p style="margin:0;font-size:12px;font-weight:700;color:#FF6D1F;text-transform:uppercase;letter-spacing:0.1em;">Project</p>
        <p style="margin:4px 0 0;font-size:16px;font-weight:700;color:#222222;">${projectName}</p>
        <p style="margin:8px 0 0;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#7A6E5F;">New Status</p>
        <p style="margin:4px 0 0;font-size:15px;font-weight:700;color:#222222;">${displayStatus}</p>
        ${statusNote ? `<p style="margin:8px 0 0;font-size:13px;color:#7A6E5F;line-height:1.5;">${statusNote}</p>` : ""}
      </td></tr>
    </table>
    <a href="${portalUrl}" style="display:inline-block;padding:14px 28px;background:#FF6D1F;color:#ffffff;text-decoration:none;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">View Project</a>`;

  await resend.emails.send({ from: "CADTRI <hello@cadtri.com>", to: client.email, subject, html: emailWrapper(body) });
  await logNotification(clientId, "status_changed", subject, { projectId, projectName, newStatus });
}

export async function notifyDocumentAdded(clientId: string, projectId: string | null, projectName: string | null, docTitle: string, docKind: string) {
  const { data: client } = await db.from("clients").select("email, company_name").eq("id", clientId).single();
  if (!client) return;

  const kindDisplay: Record<string, string> = { invoice: "Invoice", proposal: "Proposal", project_file: "Project File", other: "Document" };
  const subject = `New ${kindDisplay[docKind] ?? "document"} added${projectName ? `: ${projectName}` : ""}`;
  const portalUrl = projectId
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/portal/projects/${projectId}`
    : `${process.env.NEXT_PUBLIC_SITE_URL}/portal`;

  const body = `
    <h1 style="margin:0 0 8px;font-size:22px;font-weight:800;color:#222222;">New document available</h1>
    <p style="margin:0 0 24px;font-size:14px;color:#7A6E5F;line-height:1.6;">A new document has been added to your portal.</p>
    <table style="width:100%;border:1px solid #E2D4B8;margin-bottom:24px;">
      <tr><td style="padding:16px 20px;background:#F5E7C6;">
        <p style="margin:0;font-size:12px;font-weight:700;color:#FF6D1F;text-transform:uppercase;letter-spacing:0.1em;">${kindDisplay[docKind] ?? "Document"}</p>
        <p style="margin:4px 0 0;font-size:16px;font-weight:700;color:#222222;">${docTitle}</p>
        ${projectName ? `<p style="margin:4px 0 0;font-size:13px;color:#7A6E5F;">${projectName}</p>` : ""}
      </td></tr>
    </table>
    <a href="${portalUrl}" style="display:inline-block;padding:14px 28px;background:#FF6D1F;color:#ffffff;text-decoration:none;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">View in Portal</a>`;

  await resend.emails.send({ from: "CADTRI <hello@cadtri.com>", to: client.email, subject, html: emailWrapper(body) });
  await logNotification(clientId, "document_added", subject, { projectId, docTitle, docKind });
}
