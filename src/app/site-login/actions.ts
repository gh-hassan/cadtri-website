"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SITE_PASSWORD = process.env.SITE_PASSWORD ?? "HASHMD";
const COOKIE_VALUE = "granted";

export async function siteLogin(formData: FormData) {
  const password = formData.get("password") as string;

  if (password !== SITE_PASSWORD) {
    redirect("/site-login?error=1");
  }

  const jar = await cookies();
  jar.set("cadtri_preview", COOKIE_VALUE, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  redirect("/");
}
