import { requireAdminSession } from "../../_lib/session";
import { ClientForm } from "../client-form";

export default async function NewClientPage() {
  await requireAdminSession();
  return (
    <main className="mx-auto max-w-[640px] px-6 py-10">
      <div className="mb-8">
        <p className="mb-1 text-[11px] font-medium uppercase tracking-widest text-secondary">Admin / Clients</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Add Client</h1>
      </div>
      <ClientForm />
    </main>
  );
}
