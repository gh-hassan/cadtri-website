import { requireSession } from "../_lib/session";
import { db } from "../_lib/supabase";
import { ExternalLink } from "lucide-react";

function formatDate(d: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatAmount(cents: number | null, currency = "USD") {
  if (!cents) return "—";
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(cents / 100);
}

export default async function InvoicesPage() {
  const session = await requireSession();

  const { data: invoices } = await db
    .from("documents")
    .select("id, title, url, issued_on, amount_cents, currency, notes, projects(name)")
    .eq("client_id", session.clientId)
    .eq("kind", "invoice")
    .order("issued_on", { ascending: false });

  return (
    <main className="mx-auto max-w-[1280px] px-6 py-12">
      <div className="mb-10">
        <p className="mb-1 text-[11px] font-medium uppercase tracking-widest text-secondary">Client Portal</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Invoices</h1>
      </div>

      {!invoices?.length ? (
        <p className="text-sm font-light text-muted">No invoices yet. We will post them here as they are issued.</p>
      ) : (
        <div className="border border-border">
          {/* Table header */}
          <div className="grid grid-cols-[1fr_160px_120px_40px] gap-4 border-b border-border bg-surface px-6 py-3">
            {["Invoice", "Project", "Amount", ""].map((h) => (
              <span key={h} className="text-[10px] font-semibold uppercase tracking-wider text-muted">{h}</span>
            ))}
          </div>
          {invoices.map((inv) => {
            const project = (Array.isArray(inv.projects) ? inv.projects[0] : inv.projects) as { name: string } | null;
            return (
              <a
                key={inv.id}
                href={inv.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-[1fr_160px_120px_40px] items-center gap-4 border-b border-border bg-background px-6 py-4 last:border-0 transition-colors hover:bg-surface"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-foreground">{inv.title}</p>
                  <p className="mt-0.5 text-[11px] text-muted">{formatDate(inv.issued_on)}</p>
                </div>
                <p className="truncate text-sm font-light text-muted">{project?.name ?? "—"}</p>
                <p className="text-sm font-semibold text-foreground">{formatAmount(inv.amount_cents, inv.currency)}</p>
                <ExternalLink size={13} strokeWidth={1.5} className="text-muted group-hover:text-secondary" />
              </a>
            );
          })}
        </div>
      )}
    </main>
  );
}
