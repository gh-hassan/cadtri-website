import { NextRequest, NextResponse } from "next/server";
import { db } from "../_lib/supabase";
import { hashToken } from "../_lib/tokens";
import { signSession } from "../_lib/jwt";
import { sessionCookieOptions } from "../_lib/session";

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("token");
  const loginUrl = new URL("/portal/login", req.url);

  if (!raw) return NextResponse.redirect(loginUrl);

  const hash = hashToken(raw);

  const { data: tokenRow } = await db
    .from("auth_tokens")
    .select("client_id, expires_at, used_at")
    .eq("token_hash", hash)
    .single();

  if (!tokenRow || tokenRow.used_at || new Date(tokenRow.expires_at) < new Date()) {
    return NextResponse.redirect(loginUrl);
  }

  // Mark token used
  await db
    .from("auth_tokens")
    .update({ used_at: new Date().toISOString() })
    .eq("token_hash", hash);

  // Get client email
  const { data: client } = await db
    .from("clients")
    .select("email")
    .eq("id", tokenRow.client_id)
    .single();

  if (!client) return NextResponse.redirect(loginUrl);

  const jwt = await signSession({ clientId: tokenRow.client_id, email: client.email });
  const res = NextResponse.redirect(new URL("/portal", req.url));
  res.cookies.set(sessionCookieOptions(jwt));
  return res;
}
