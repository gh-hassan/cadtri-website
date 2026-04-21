import { requireSession } from "../_lib/session";
import { db } from "../_lib/supabase";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  proposal:    { label: "Proposal",    color: "text-secondary bg-secondary/10" },
  in_progress: { label: "In Progress", color: "text-blue-600 bg-blue-50" },
  plan_check:  { label: "Plan Check",  color: "text-amber-600 bg-amber-50" },
  approved:    { label: "Approved",    color: "text-green-700 bg-green-50" },
  completed:   { label: "Completed",   color: "text-muted bg-surface" },
  on_hold:     { label: "On Hold",     color: "text-muted bg-surface" },
  cancelled:   { label: "Cancelled",   color: "text-muted bg-surface" },
};

function formatDate(d: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function ProjectsPage() {
  const session = await requireSession();

  const { data: projects } = await db
    .from("projects")
    .select("id, name, address, status, status_note, started_at, target_date")
    .eq("client_id", session.clientId)
    .order("created_at", { ascending: false });

  return (
    <main className="mx-auto max-w-[1280px] px-6 py-12">
      <div className="mb-10">
        <p className="mb-1 text-[11px] font-medium uppercase tracking-widest text-secondary">
          Client Portal
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">All Projects</h1>
      </div>

      {!projects?.length ? (
        <p className="text-sm font-light text-muted">No projects yet. We will add them as work begins.</p>
      ) : (
        <div className="space-y-3">
          {projects.map((p) => {
            const status = STATUS_LABELS[p.status] ?? { label: p.status, color: "text-muted bg-surface" };
            return (
              <Link
                key={p.id}
                href={`/portal/projects/${p.id}`}
                className="group flex items-start justify-between gap-6 border border-border bg-surface p-6 transition-colors hover:bg-border"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-foreground">{p.name}</p>
                  {p.address && <p className="mt-0.5 text-xs font-light text-muted">{p.address}</p>}
                  {p.status_note && <p className="mt-2 text-sm font-light text-muted">{p.status_note}</p>}
                  <div className="mt-3 flex items-center gap-6">
                    {p.started_at && (
                      <p className="text-[11px] text-muted">Started: {formatDate(p.started_at)}</p>
                    )}
                    {p.target_date && (
                      <p className="text-[11px] text-muted">Target: {formatDate(p.target_date)}</p>
                    )}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${status.color}`}>
                    {status.label}
                  </span>
                  <ArrowRight size={14} strokeWidth={1.5} className="text-muted transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
