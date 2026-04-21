import { requireSession } from "../../_lib/session";
import { db } from "../../_lib/supabase";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ExternalLink, ArrowLeft } from "lucide-react";

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  proposal:    { label: "Proposal",    color: "text-secondary bg-secondary/10" },
  in_progress: { label: "In Progress", color: "text-blue-600 bg-blue-50" },
  plan_check:  { label: "Plan Check",  color: "text-amber-600 bg-amber-50" },
  approved:    { label: "Approved",    color: "text-green-700 bg-green-50" },
  completed:   { label: "Completed",   color: "text-muted bg-surface" },
  on_hold:     { label: "On Hold",     color: "text-muted bg-surface" },
  cancelled:   { label: "Cancelled",   color: "text-muted bg-surface" },
};

const KIND_GROUPS = [
  { kind: "proposal",     label: "Proposals" },
  { kind: "invoice",      label: "Invoices" },
  { kind: "project_file", label: "Project Files" },
  { kind: "other",        label: "Other Documents" },
];

function formatDate(d: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatAmount(cents: number | null, currency = "USD") {
  if (!cents) return null;
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(cents / 100);
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await requireSession();

  const [{ data: project }, { data: docs }] = await Promise.all([
    db.from("projects")
      .select("id, name, address, status, status_note, started_at, target_date, client_id")
      .eq("id", id)
      .single(),
    db.from("documents")
      .select("id, kind, title, url, issued_on, amount_cents, currency, notes")
      .eq("project_id", id)
      .order("created_at", { ascending: false }),
  ]);

  // Ensure project belongs to this client
  if (!project || project.client_id !== session.clientId) notFound();

  const status = STATUS_LABELS[project.status] ?? { label: project.status, color: "text-muted bg-surface" };

  return (
    <main className="mx-auto max-w-[1280px] px-6 py-12">
      <Link
        href="/portal/projects"
        className="mb-8 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-widest text-muted hover:text-foreground"
      >
        <ArrowLeft size={12} strokeWidth={2} /> All Projects
      </Link>

      {/* Project header */}
      <div className="mb-10 border border-border bg-surface p-8">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="mb-1 text-[11px] font-medium uppercase tracking-widest text-secondary">Project</p>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground">{project.name}</h1>
            {project.address && <p className="mt-1 text-sm font-light text-muted">{project.address}</p>}
          </div>
          <span className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${status.color}`}>
            {status.label}
          </span>
        </div>

        {project.status_note && (
          <p className="mb-4 text-sm font-light leading-relaxed text-muted">{project.status_note}</p>
        )}

        <div className="flex flex-wrap gap-8">
          {project.started_at && (
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">Start Date</p>
              <p className="mt-0.5 text-sm font-medium text-foreground">{formatDate(project.started_at)}</p>
            </div>
          )}
          {project.target_date && (
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">Target Date</p>
              <p className="mt-0.5 text-sm font-medium text-foreground">{formatDate(project.target_date)}</p>
            </div>
          )}
        </div>
      </div>

      {/* Documents grouped by kind */}
      <div className="space-y-10">
        {KIND_GROUPS.map(({ kind, label }) => {
          const group = docs?.filter((d) => d.kind === kind) ?? [];
          if (!group.length) return null;
          return (
            <section key={kind}>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-muted">{label}</p>
              <div className="divide-y divide-border border border-border">
                {group.map((doc) => (
                  <a
                    key={doc.id}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start justify-between gap-4 bg-surface px-6 py-4 transition-colors hover:bg-border"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium text-foreground">{doc.title}</p>
                      <div className="mt-0.5 flex flex-wrap items-center gap-3">
                        {doc.issued_on && (
                          <span className="text-[11px] text-muted">{formatDate(doc.issued_on)}</span>
                        )}
                        {doc.amount_cents && (
                          <span className="text-[11px] font-semibold text-foreground">
                            {formatAmount(doc.amount_cents, doc.currency)}
                          </span>
                        )}
                        {doc.notes && (
                          <span className="text-[11px] font-light text-muted">{doc.notes}</span>
                        )}
                      </div>
                    </div>
                    <ExternalLink size={14} strokeWidth={1.5} className="mt-0.5 shrink-0 text-muted group-hover:text-secondary" />
                  </a>
                ))}
              </div>
            </section>
          );
        })}

        {!docs?.length && (
          <p className="text-sm font-light text-muted">No documents added to this project yet.</p>
        )}
      </div>
    </main>
  );
}
