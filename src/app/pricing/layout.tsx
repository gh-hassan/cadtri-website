import Link from "next/link";
import { CadtriLogo } from "@/components/shared/logo";

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-primary">
      {/* Minimal top bar — just the logo, no nav, no footer */}
      <div className="border-b border-white/[0.07] px-6 py-5">
        <div className="mx-auto max-w-2xl">
          <CadtriLogo variant="dark" />
        </div>
      </div>
      {children}
    </div>
  );
}
