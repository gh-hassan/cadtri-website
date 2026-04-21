import { requireSession } from "../_lib/session";
import { db } from "../_lib/supabase";
import { ExternalLink } from "lucide-react";

function formatDate(d: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function ProposalsPage() {
  const session = await requireSession();

  const { data: proposals } = await db
    .from("documents")
    .select("id, title, url, issued_on, notes, projects(name)")
    .eq("client_id", session.clientId)
    .eq("kind", "proposal")
    .order("issued_on", { ascending: false });

  return (
    <main className="mx-auto max-w-[1280px] px-6 py-12">
      <div className="mb-10">
        <p className="mb-1 text-[11px] font-medium uppercase tracking-widest text-secondary">Client Portal</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Proposals</h1>
      </div>

      {!proposals?.length ? (
        <p className="text-sm font-light text-muted">No proposals on file yet.</p>
      ) : (
        <div className="space-y-3">
          {proposals.map((p) => {
            const project = (Array.isArray(p.projects) ? p.projects[0] : p.projects) as { name: string } | null;
            return (
              <a
                key={p.id}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between gap-4 border border-border bg-surface px-6 py-5 transition-colors hover:bg-border"
              >
                <div className="min-w-0">
                  <p className="font-medium text-foreground">{p.title}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-3">
                    {project?.name && (
                      <span className="text-[11px] text-muted">{project.name}</span>
                    )}
                    {p.issued_on && (
                      <span className="text-[11px] text-muted">{formatDate(p.issued_on)}</span>
                    )}
                    {p.notes && (
                      <span className="text-[11px] font-light text-muted">{p.notes}</span>
                    )}
                  </div>
                </div>
                <ExternalLink size={14} strokeWidth={1.5} className="mt-0.5 shrink-0 text-muted group-hover:text-secondary" />
              </a>
            );
          })}
        </div>
      )}
    </main>
  );
}
