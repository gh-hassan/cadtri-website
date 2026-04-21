import { requireAdminSession } from "../_lib/session";
import { db } from "@/app/portal/_lib/supabase";
import Link from "next/link";
import { Plus, ExternalLink } from "lucide-react";

export default async function AdminClientsPage() {
  await requireAdminSession();

  const { data: clients } = await db
    .from("clients")
    .select("id, email, company_name, contact_name, phone, is_active, created_at")
    .order("created_at", { ascending: false });

  return (
    <main className="mx-auto max-w-[1280px] px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="mb-1 text-[11px] font-medium uppercase tracking-widest text-secondary">Admin</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Clients</h1>
        </div>
        <Link href="/admin/clients/new" className="inline-flex items-center gap-2 bg-secondary px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90">
          <Plus size={12} strokeWidth={2.5} /> Add Client
        </Link>
      </div>

      <div className="border border-border">
        <div className="grid grid-cols-[1fr_200px_160px_80px_40px] gap-4 border-b border-border bg-surface px-6 py-3">
          {["Company", "Contact", "Email", "Status", ""].map((h) => (
            <span key={h} className="text-[10px] font-semibold uppercase tracking-wider text-muted">{h}</span>
          ))}
        </div>
        {clients?.map((c) => (
          <div key={c.id} className="grid grid-cols-[1fr_200px_160px_80px_40px] items-center gap-4 border-b border-border bg-background px-6 py-4 last:border-0 transition-colors hover:bg-surface">
            <div>
              <p className="font-semibold text-foreground">{c.company_name}</p>
              <p className="text-[11px] text-muted">{c.contact_name ?? "—"}</p>
            </div>
            <p className="truncate text-sm text-muted">{c.phone ?? "—"}</p>
            <p className="truncate text-sm text-muted">{c.email}</p>
            <span className={`text-[10px] font-semibold uppercase tracking-wider ${c.is_active ? "text-green-700" : "text-muted"}`}>
              {c.is_active ? "Active" : "Inactive"}
            </span>
            <Link href={`/admin/clients/${c.id}`} className="text-muted hover:text-secondary">
              <ExternalLink size={14} strokeWidth={1.5} />
            </Link>
          </div>
        ))}
        {!clients?.length && (
          <p className="px-6 py-8 text-sm font-light text-muted">No clients yet. <Link href="/admin/clients/new" className="text-secondary hover:underline">Add one</Link>.</p>
        )}
      </div>
    </main>
  );
}
