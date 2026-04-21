import { requireAdminSession } from "../_lib/session";
import { db } from "@/app/portal/_lib/supabase";
import Link from "next/link";
import { Plus, ExternalLink } from "lucide-react";

const STATUS_COLOR: Record<string, string> = {
  proposal: "text-secondary bg-secondary/10", in_progress: "text-blue-600 bg-blue-50",
  plan_check: "text-amber-600 bg-amber-50", approved: "text-green-700 bg-green-50",
  completed: "text-muted bg-surface", on_hold: "text-muted bg-surface", cancelled: "text-muted bg-surface",
};

export default async function AdminProjectsPage() {
  await requireAdminSession();

  const { data: projects } = await db
    .from("projects")
    .select("id, name, status, address, clients(company_name), created_at")
    .order("created_at", { ascending: false });

  return (
    <main className="mx-auto max-w-[1280px] px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="mb-1 text-[11px] font-medium uppercase tracking-widest text-secondary">Admin</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Projects</h1>
        </div>
        <Link href="/admin/projects/new" className="inline-flex items-center gap-2 bg-secondary px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90">
          <Plus size={12} strokeWidth={2.5} /> Add Project
        </Link>
      </div>

      <div className="divide-y divide-border border border-border">
        {projects?.map((p) => {
          const client = (Array.isArray(p.clients) ? p.clients[0] : p.clients) as { company_name: string } | null;
          const sc = STATUS_COLOR[p.status] ?? "text-muted bg-surface";
          return (
            <div key={p.id} className="flex items-center gap-6 bg-background px-6 py-4 transition-colors hover:bg-surface">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground">{p.name}</p>
                <p className="text-[11px] text-muted">{client?.company_name ?? "—"}{p.address ? ` · ${p.address}` : ""}</p>
              </div>
              <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${sc}`}>
                {p.status.replace("_", " ")}
              </span>
              <Link href={`/admin/projects/${p.id}`} className="shrink-0 text-muted hover:text-secondary">
                <ExternalLink size={14} strokeWidth={1.5} />
              </Link>
            </div>
          );
        })}
        {!projects?.length && <p className="px-6 py-8 text-sm font-light text-muted">No projects yet.</p>}
      </div>
    </main>
  );
}
