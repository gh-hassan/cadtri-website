"use server";

import { redirect } from "next/navigation";
import { db } from "@/app/portal/_lib/supabase";
import { requireAdminSession } from "../_lib/session";
import { notifyProjectCreated, notifyStatusChanged } from "../_lib/notifications";

export async function createProject(formData: FormData) {
  await requireAdminSession();
  const client_id  = formData.get("client_id") as string;
  const name       = (formData.get("name") as string).trim();
  const address    = (formData.get("address") as string | null)?.trim() || null;
  const status     = formData.get("status") as string;
  const status_note = (formData.get("status_note") as string | null)?.trim() || null;
  const started_at  = (formData.get("started_at") as string | null) || null;
  const target_date = (formData.get("target_date") as string | null) || null;

  const { error } = await db.from("projects").insert({ client_id, name, address, status, status_note, started_at, target_date });
  if (error) return { error: error.message };

  // Email notification
  try { await notifyProjectCreated(client_id, name, address ?? undefined); } catch {}

  redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  await requireAdminSession();
  const name        = (formData.get("name") as string).trim();
  const address     = (formData.get("address") as string | null)?.trim() || null;
  const newStatus   = formData.get("status") as string;
  const status_note = (formData.get("status_note") as string | null)?.trim() || null;
  const started_at  = (formData.get("started_at") as string | null) || null;
  const target_date = (formData.get("target_date") as string | null) || null;

  // Fetch current status to detect changes
  const { data: current } = await db.from("projects").select("status, client_id").eq("id", id).single();

  const { error } = await db.from("projects").update({ name, address, status: newStatus, status_note, started_at, target_date, updated_at: new Date().toISOString() }).eq("id", id);
  if (error) return { error: error.message };

  // Notify client if status changed
  if (current && current.status !== newStatus) {
    try { await notifyStatusChanged(current.client_id, id, name, newStatus, status_note ?? undefined); } catch {}
  }

  redirect(`/admin/projects/${id}`);
}
