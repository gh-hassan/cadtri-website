"use server";

import { db } from "../_lib/supabase";
import { generateToken } from "../_lib/tokens";
import { sendMagicLinkEmail } from "../_lib/email";

export async function requestMagicLink(formData: FormData) {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  if (!email) return { success: false, error: "Email is required." };

  // Lookup client — always return generic success to avoid enumeration
  const { data: client } = await db
    .from("clients")
    .select("id, email, is_active")
    .eq("email", email)
    .single();

  if (client?.is_active) {
    const { raw, hash } = generateToken();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();

    await db.from("auth_tokens").insert({
      token_hash: hash,
      client_id: client.id,
      expires_at: expiresAt,
    });

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
    const magicLink = `${siteUrl}/portal/verify?token=${raw}`;
    await sendMagicLinkEmail(client.email, magicLink);
  }

  // Always return success — never reveal whether the email exists
  return { success: true };
}
