import { Metadata } from "next";
import { CadtriLogo } from "@/components/shared/logo";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin — CADTRI",
  robots: { index: false, follow: false },
};

const NAV = [
  { href: "/admin",           label: "Overview" },
  { href: "/admin/clients",   label: "Clients" },
  { href: "/admin/projects",  label: "Projects" },
  { href: "/admin/documents", label: "Documents" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { getAdminSession } = await import("./_lib/session");
  const isAuthenticated = await getAdminSession();

  return (
    <div className="min-h-screen bg-background">
      {isAuthenticated && (
        <header className="sticky top-0 z-40 border-b border-white/10 bg-primary">
          <div className="mx-auto flex h-[64px] max-w-[1280px] items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <CadtriLogo variant="dark" />
              <span className="h-4 w-px bg-white/20" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">Admin</span>
            </div>
            <nav className="flex items-center gap-6">
              {NAV.map((n) => (
                <Link key={n.href} href={n.href} className="text-[11px] font-medium uppercase tracking-widest text-white/50 transition-colors hover:text-white">
                  {n.label}
                </Link>
              ))}
              <form action="/admin/logout" method="POST">
                <button type="submit" className="text-[11px] font-medium uppercase tracking-widest text-white/30 transition-colors hover:text-white">
                  Sign out
                </button>
              </form>
            </nav>
          </div>
        </header>
      )}
      {children}
    </div>
  );
}
