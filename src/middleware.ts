import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const PORTAL_PUBLIC = ["/portal/login", "/portal/verify"];
const ADMIN_PUBLIC  = ["/admin/login", "/admin/logout"];

const portalSecret = new TextEncoder().encode(process.env.PORTAL_JWT_SECRET!);
const adminSecret  = new TextEncoder().encode(`${process.env.PORTAL_JWT_SECRET!}_admin`);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ── Portal ──────────────────────────────────────────────────────────────────
  if (pathname.startsWith("/portal")) {
    if (PORTAL_PUBLIC.some((p) => pathname.startsWith(p))) return NextResponse.next();

    const token = req.cookies.get("cadtri_session")?.value;
    if (!token) return NextResponse.redirect(new URL("/portal/login", req.url));

    try {
      await jwtVerify(token, portalSecret, { algorithms: ["HS256"] });
      return NextResponse.next();
    } catch {
      const res = NextResponse.redirect(new URL("/portal/login", req.url));
      res.cookies.delete("cadtri_session");
      return res;
    }
  }

  // ── Admin ───────────────────────────────────────────────────────────────────
  if (pathname.startsWith("/admin")) {
    if (ADMIN_PUBLIC.some((p) => pathname.startsWith(p))) return NextResponse.next();

    const token = req.cookies.get("cadtri_admin")?.value;
    if (!token) return NextResponse.redirect(new URL("/admin/login", req.url));

    try {
      await jwtVerify(token, adminSecret, { algorithms: ["HS256"] });
      return NextResponse.next();
    } catch {
      const res = NextResponse.redirect(new URL("/admin/login", req.url));
      res.cookies.delete("cadtri_admin");
      return res;
    }
  }

  return NextResponse.next();
}

export const config = { matcher: ["/portal/:path*", "/admin/:path*"] };
