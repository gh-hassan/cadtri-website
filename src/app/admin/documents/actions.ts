"use server";

import { redirect } from "next/navigation";
import { db } from "@/app/portal/_lib/supabase";
import { requireAdminSession } from "../_lib/session";
import { notifyDocumentAdded } from "../_lib/notifications";

export async function createDocument(formData: FormData) {
  await requireAdminSession();

  const client_id  = formData.get("client_id") as string;
  const project_id = (formData.get("project_id") as string | null) || null;
  const kind       = formData.get("kind") as string;
  const title      = (formData.get("title") as string).trim();
  const notes      = (formData.get("notes") as string | null)?.trim() || null;
  const issued_on  = (formData.get("issued_on") as string | null) || null;
  const amount_raw = formData.get("amount") as string | null;
  const amount_cents = amount_raw && amount_raw !== "" ? Math.round(parseFloat(amount_raw) * 100) : null;

  // Handle: URL link vs file upload
  const uploadType = formData.get("upload_type") as "url" | "file";
  let url = "";
  let storage_path: string | null = null;

  if (uploadType === "url") {
    url = (formData.get("url") as string).trim();
  } else {
    const file = formData.get("file") as File | null;
    if (!file || file.size === 0) return { error: "No file selected." };
    if (file.size > 52428800) return { error: "File must be under 50MB." };

    const ext = file.name.split(".").pop();
    const path = `${client_id}/${project_id ?? "general"}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const arrayBuffer = await file.arrayBuffer();

    const { data: uploaded, error: uploadError } = await db.storage
      .from("project-files")
      .upload(path, arrayBuffer, { contentType: file.type, upsert: false });

    if (uploadError) return { error: uploadError.message };

    storage_path = uploaded.path;
    // Get a signed URL valid for 10 years (files are private)
    const { data: signed } = await db.storage.from("project-files").createSignedUrl(uploaded.path, 60 * 60 * 24 * 365 * 10);
    url = signed?.signedUrl ?? "";
  }

  const { error } = await db.from("documents").insert({ client_id, project_id, kind, title, url, storage_path, notes, issued_on, amount_cents });
  if (error) return { error: error.message };

  // Fetch project name for notification
  let projectName: string | null = null;
  if (project_id) {
    const { data: p } = await db.from("projects").select("name").eq("id", project_id).single();
    projectName = p?.name ?? null;
  }

  try { await notifyDocumentAdded(client_id, project_id, projectName, title, kind); } catch {}

  redirect(project_id ? `/admin/projects/${project_id}` : "/admin/documents");
}
