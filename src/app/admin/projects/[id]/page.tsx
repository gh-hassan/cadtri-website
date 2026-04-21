import { requireAdminSession } from "../../_lib/session";
import { db } from "@/app/portal/_lib/supabase";
import { notFound } from "next/navigation";
import { ProjectForm } from "../project-form";
import Link from "next/link";
import { Plus, ExternalLink } from "lucide-react";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await requireAdminSession();

  const [{ data: project }, { data: docs }] = await Promise.all([
    db.from("projects").select("id, name, address, status, status_note, started_at, target_date, client_id, clients(company_name)").eq("id", id).single(),
    db.from("documents").select("id, kind, title, url, issued_on, amount_cents, currency").eq("project_id", id).order("created_at", { ascending: false }),
  ]);

  if (!project) notFound();

  const client = (Array.isArray(project.clients) ? project.clients[0] : project.clients) as { company_name: string } | null;

  const KIND_LABEL: Record<string, string> = { invoice: "Invoice", proposal: "Proposal", project_file: "File", other: "Doc" };

  return (
    <main className="mx-auto max-w-[1280px] px-6 py-10">
      <div className="mb-8">
        <p className="mb-1 text-[11px] font-medium uppercase tracking-widest text-secondary">Admin / Projects / {client?.company_name}</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">{project.name}</h1>
      </div>

      <div className="grid gap-10 lg:grid-cols-[400px_1fr]">
        <ProjectForm clients={[]} project={{ ...project, address: project.address ?? null, status_note: project.status_note ?? null, started_at: project.started_at ?? null, target_date: project.target_date ?? null }} />

        <section>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">Documents</p>
            <Link href={`/admin/documents/new?project=${id}&client=${project.client_id}`} className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-secondary hover:underline">
              <Plus size={11} strokeWidth={2.5} /> Add document
            </Link>
          </div>
          {!docs?.length ? (
            <p className="text-sm font-light text-muted">No documents yet.</p>
          ) : (
            <div className="divide-y divide-border border border-border">
              {docs.map((d) => (
                <div key={d.id} className="flex items-center gap-4 bg-surface px-5 py-4">
                  <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-secondary">{KIND_LABEL[d.kind] ?? d.kind}</span>
                  <p className="flex-1 truncate text-sm font-medium text-foreground">{d.title}</p>
                  {d.amount_cents && (
                    <span className="text-sm font-semibold text-foreground">
                      {new Intl.NumberFormat("en-US", { style: "currency", currency: d.currency ?? "USD" }).format(d.amount_cents / 100)}
                    </span>
                  )}
                  <a href={d.url} target="_blank" rel="noopener noreferrer" className="shrink-0 text-muted hover:text-secondary">
                    <ExternalLink size={13} strokeWidth={1.5} />
                  </a>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
