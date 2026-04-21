import { Metadata } from "next";
import { LoginForm } from "./login-form";
import { CadtriLogo } from "@/components/shared/logo";

export const metadata: Metadata = {
  title: "Client Portal — CADTRI",
  robots: { index: false, follow: false },
};

export default function PortalLoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <CadtriLogo variant="light" className="mx-auto mb-6" />
          <p className="mb-1 text-[11px] font-medium uppercase tracking-widest text-secondary">
            Client Portal
          </p>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
            Sign in to your account
          </h1>
          <p className="mt-2 text-sm font-light text-muted">
            Enter your email and we will send you a secure sign-in link.
          </p>
        </div>

        <div className="border border-border bg-surface p-8">
          <LoginForm />
        </div>

        <p className="mt-8 text-center text-[11px] font-light text-muted">
          Not a client yet?{" "}
          <a href="/contact" className="font-medium text-secondary hover:underline">
            Get in touch
          </a>
        </p>
      </div>
    </main>
  );
}
