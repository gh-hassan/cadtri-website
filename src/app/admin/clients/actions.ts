"use server";

import { redirect } from "next/navigation";
import { db } from "@/app/portal/_lib/supabase";
import { requireAdminSession } from "../_lib/session";

export async function createClient(formData: FormData) {
  await requireAdminSession();
  const email = (formData.get("email") as string).trim().toLowerCase();
  const company_name = (formData.get("company_name") as string).trim();
  const contact_name = (formData.get("contact_name") as string | null)?.trim() || null;
  const phone = (formData.get("phone") as string | null)?.trim() || null;

  const { error } = await db.from("clients").insert({ email, company_name, contact_name, phone });
  if (error) return { error: error.message };
  redirect("/admin/clients");
}

export async function updateClient(id: string, formData: FormData) {
  await requireAdminSession();
  const email = (formData.get("email") as string).trim().toLowerCase();
  const company_name = (formData.get("company_name") as string).trim();
  const contact_name = (formData.get("contact_name") as string | null)?.trim() || null;
  const phone = (formData.get("phone") as string | null)?.trim() || null;
  const is_active = formData.get("is_active") === "true";

  const { error } = await db.from("clients").update({ email, company_name, contact_name, phone, is_active, updated_at: new Date().toISOString() }).eq("id", id);
  if (error) return { error: error.message };
  redirect("/admin/clients");
}
