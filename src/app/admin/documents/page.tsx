import { requireAdminSession } from "../_lib/session";
import { db } from "@/app/portal/_lib/supabase";
import Link from "next/link";
import { Plus, ExternalLink } from "lucide-react";

const KIND_LABEL: Record<string, string> = {
  invoice:      "Invoice",
  proposal:     "Proposal",
  project_file: "File",
  other:        "Doc",
};

function formatDate(d: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function DocumentsPage() {
  await requireAdminSession();

  const { data: docs } = await db
    .from("documents")
    .select("id, kind, title, url, issued_on, amount_cents, currency, clients(company_name), projects(name)")
    .order("created_at", { ascending: false });

  return (
    <main className="mx-auto max-w-[1280px] px-6 py-10">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="mb-1 text-[11px] font-medium uppercase tracking-widest text-secondary">Admin / Documents</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Documents</h1>
        </div>
        <Link href="/admin/documents/new" className="inline-flex items-center gap-2 bg-secondary px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white hover:opacity-90">
          <Plus size={13} strokeWidth={2.5} /> Add document
        </Link>
      </div>

      {!docs?.length ? (
        <p className="text-sm font-light text-muted">No documents yet.</p>
      ) : (
        <div className="divide-y divide-border border border-border">
          {docs.map((d) => {
            const client = (Array.isArray(d.clients) ? d.clients[0] : d.clients) as { company_name: string } | null;
            const project = (Array.isArray(d.projects) ? d.projects[0] : d.projects) as { name: string } | null;
            return (
              <div key={d.id} className="grid items-center gap-4 bg-surface px-6 py-4 sm:grid-cols-[80px_1fr_160px_120px_80px_40px]">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-secondary">
                  {KIND_LABEL[d.kind] ?? d.kind}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{d.title}</p>
                  <p className="text-[11px] text-muted">
                    {client?.company_name ?? "—"}
                    {project ? <> · {project.name}</> : null}
                  </p>
                </div>
                <span className="text-[11px] text-muted">{formatDate(d.issued_on)}</span>
                {d.amount_cents ? (
                  <span className="text-sm font-semibold text-foreground">
                    {new Intl.NumberFormat("en-US", { style: "currency", currency: d.currency ?? "USD" }).format(d.amount_cents / 100)}
                  </span>
                ) : (
                  <span />
                )}
                <span />
                <a href={d.url} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-secondary">
                  <ExternalLink size={13} strokeWidth={1.5} />
                </a>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
