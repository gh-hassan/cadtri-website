import { CadtriLogo } from "@/components/shared/logo";

export default function StrategyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-primary">
      <div className="shrink-0 border-b border-white/[0.07] px-8 py-5">
        <CadtriLogo variant="dark" />
      </div>
      <div className="flex min-h-0 flex-1 flex-col">
        {children}
      </div>
    </div>
  );
}
