import { requireAdminSession } from "../../_lib/session";
import { db } from "@/app/portal/_lib/supabase";
import { DocumentForm } from "../document-form";

export default async function NewDocumentPage({ searchParams }: { searchParams: Promise<{ project?: string; client?: string }> }) {
  await requireAdminSession();
  const { project: preselectedProject, client: preselectedClient } = await searchParams;

  const [{ data: clients }, { data: projects }] = await Promise.all([
    db.from("clients").select("id, company_name").eq("is_active", true).order("company_name"),
    db.from("projects").select("id, name, client_id").order("name"),
  ]);

  return (
    <main className="mx-auto max-w-[640px] px-6 py-10">
      <div className="mb-8">
        <p className="mb-1 text-[11px] font-medium uppercase tracking-widest text-secondary">Admin / Documents</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Add Document</h1>
      </div>
      <DocumentForm
        clients={clients ?? []}
        projects={projects ?? []}
        preselectedProjectId={preselectedProject}
        preselectedClientId={preselectedClient}
      />
    </main>
  );
}
