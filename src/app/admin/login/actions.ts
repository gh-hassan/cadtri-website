"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signAdminSession, adminCookieOptions } from "../_lib/session";

export async function adminLogin(formData: FormData) {
  const password = formData.get("password") as string;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || password !== adminPassword) {
    return { error: "Incorrect password." };
  }

  const token = await signAdminSession();
  const store = await cookies();
  store.set(adminCookieOptions(token));
  redirect("/admin");
}
