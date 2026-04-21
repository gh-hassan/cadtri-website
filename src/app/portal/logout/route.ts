import { NextRequest, NextResponse } from "next/server";
import { clearCookieOptions } from "../_lib/session";

export async function POST(req: NextRequest) {
  const res = NextResponse.redirect(new URL("/portal/login", req.url));
  res.cookies.set(clearCookieOptions());
  return res;
}
