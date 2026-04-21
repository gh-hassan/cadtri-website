import { Metadata } from "next";
import { CadtriLogo } from "@/components/shared/logo";
import Link from "next/link";
import { getSession } from "./_lib/session";

export const metadata: Metadata = {
  title: "Client Portal — CADTRI",
  robots: { index: false, follow: false },
};

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  return (
    <div className="min-h-screen bg-background">
      {/* Portal header — only shown when authenticated */}
      {session && <header className="sticky top-0 z-40 border-b border-border bg-primary">
        <div className="mx-auto flex h-[64px] max-w-[1280px] items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <CadtriLogo variant="dark" />
            <span className="hidden h-4 w-px bg-white/20 sm:block" />
            <span className="hidden text-[10px] font-medium uppercase tracking-widest text-white/40 sm:block">
              Client Portal
            </span>
          </div>

          <nav className="flex items-center gap-6">
            <Link
              href="/portal"
              className="text-[11px] font-medium uppercase tracking-widest text-white/50 transition-colors hover:text-white"
            >
              Dashboard
            </Link>
            <Link
              href="/portal/projects"
              className="text-[11px] font-medium uppercase tracking-widest text-white/50 transition-colors hover:text-white"
            >
              Projects
            </Link>
            <Link
              href="/portal/invoices"
              className="text-[11px] font-medium uppercase tracking-widest text-white/50 transition-colors hover:text-white"
            >
              Invoices
            </Link>
            <Link
              href="/portal/proposals"
              className="text-[11px] font-medium uppercase tracking-widest text-white/50 transition-colors hover:text-white"
            >
              Proposals
            </Link>
            <form action="/portal/logout" method="POST">
              <button
                type="submit"
                className="text-[11px] font-medium uppercase tracking-widest text-white/30 transition-colors hover:text-white"
              >
                Sign out
              </button>
            </form>
          </nav>
        </div>
      </header>}

      {children}
    </div>
  );
}
