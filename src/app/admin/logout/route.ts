import { NextRequest, NextResponse } from "next/server";
import { clearAdminCookie } from "../_lib/session";

export async function POST(req: NextRequest) {
  const res = NextResponse.redirect(new URL("/admin/login", req.url));
  res.cookies.set(clearAdminCookie());
  return res;
}
