import { requireAdminSession } from "../../_lib/session";
import { db } from "@/app/portal/_lib/supabase";
import { ProjectForm } from "../project-form";

export default async function NewProjectPage({ searchParams }: { searchParams: Promise<{ client?: string }> }) {
  await requireAdminSession();
  const { client: preselectedClient } = await searchParams;

  const { data: clients } = await db.from("clients").select("id, company_name").eq("is_active", true).order("company_name");

  return (
    <main className="mx-auto max-w-[640px] px-6 py-10">
      <div className="mb-8">
        <p className="mb-1 text-[11px] font-medium uppercase tracking-widest text-secondary">Admin / Projects</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Add Project</h1>
      </div>
      <ProjectForm clients={clients ?? []} preselectedClientId={preselectedClient} />
    </main>
  );
}
