import { requireAdminSession } from "../../_lib/session";
import { db } from "@/app/portal/_lib/supabase";
import { notFound } from "next/navigation";
import { ClientForm } from "../client-form";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function EditClientPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await requireAdminSession();

  const [{ data: client }, { data: projects }] = await Promise.all([
    db.from("clients").select("id, email, company_name, contact_name, phone, is_active").eq("id", id).single(),
    db.from("projects").select("id, name, status").eq("client_id", id).order("created_at", { ascending: false }),
  ]);

  if (!client) notFound();

  const STATUS_COLOR: Record<string, string> = {
    proposal: "text-secondary", in_progress: "text-blue-600", plan_check: "text-amber-600",
    approved: "text-green-700", completed: "text-muted", on_hold: "text-muted", cancelled: "text-muted",
  };

  return (
    <main className="mx-auto max-w-[1280px] px-6 py-10">
      <div className="mb-8">
        <p className="mb-1 text-[11px] font-medium uppercase tracking-widest text-secondary">Admin / Clients</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">{client.company_name}</h1>
      </div>

      <div className="grid gap-10 lg:grid-cols-[400px_1fr]">
        <ClientForm client={client} />

        <section>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">Projects</p>
            <Link href={`/admin/projects/new?client=${id}`} className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-secondary hover:underline">
              <Plus size={11} strokeWidth={2.5} /> Add project
            </Link>
          </div>
          {!projects?.length ? (
            <p className="text-sm font-light text-muted">No projects yet.</p>
          ) : (
            <div className="divide-y divide-border border border-border">
              {projects.map((p) => (
                <Link key={p.id} href={`/admin/projects/${p.id}`} className="flex items-center justify-between bg-surface px-5 py-4 transition-colors hover:bg-border">
                  <p className="font-medium text-foreground">{p.name}</p>
                  <span className={`text-[10px] font-semibold uppercase tracking-wider ${STATUS_COLOR[p.status] ?? "text-muted"}`}>
                    {p.status.replace("_", " ")}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
