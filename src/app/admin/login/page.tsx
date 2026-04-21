import { Metadata } from "next";
import { AdminLoginForm } from "./login-form";
import { CadtriLogo } from "@/components/shared/logo";

export const metadata: Metadata = {
  title: "Admin — CADTRI",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-primary px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <CadtriLogo variant="dark" className="mx-auto mb-6" />
          <p className="mb-1 text-[11px] font-medium uppercase tracking-widest text-secondary">
            Admin Panel
          </p>
          <h1 className="text-2xl font-extrabold tracking-tight text-primary-foreground">
            Restricted access
          </h1>
        </div>
        <div className="border border-white/10 bg-white/5 p-8">
          <AdminLoginForm />
        </div>
      </div>
    </main>
  );
}
