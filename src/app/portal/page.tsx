import { requireSession } from "./_lib/session";
import { db } from "./_lib/supabase";
import { fetchIndustryNews } from "@/lib/news";
import Link from "next/link";
import { FileText, FolderOpen, Receipt, ArrowRight, ExternalLink, Newspaper } from "lucide-react";

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  proposal:    { label: "Proposal",    color: "text-secondary bg-secondary/10" },
  in_progress: { label: "In Progress", color: "text-blue-600 bg-blue-50" },
  plan_check:  { label: "Plan Check",  color: "text-amber-600 bg-amber-50" },
  approved:    { label: "Approved",    color: "text-green-700 bg-green-50" },
  completed:   { label: "Completed",   color: "text-muted bg-surface" },
  on_hold:     { label: "On Hold",     color: "text-muted bg-surface" },
  cancelled:   { label: "Cancelled",   color: "text-muted bg-surface" },
};

const KIND_LABELS: Record<string, string> = {
  invoice:      "Invoice",
  proposal:     "Proposal",
  project_file: "Project File",
  other:        "Document",
};

function formatDate(d: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatAmount(cents: number | null, currency = "USD") {
  if (!cents) return null;
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(cents / 100);
}

export default async function PortalDashboardPage() {
  const session = await requireSession();

  const [{ data: client }, { data: projects }, { data: recentDocs }, news] = await Promise.all([
    db.from("clients").select("company_name, contact_name").eq("id", session.clientId).single(),
    db.from("projects").select("id, name, address, status, status_note, target_date")
      .eq("client_id", session.clientId)
      .neq("status", "completed")
      .neq("status", "cancelled")
      .order("created_at", { ascending: false }),
    db.from("documents").select("id, kind, title, url, issued_on, amount_cents, currency, project_id")
      .eq("client_id", session.clientId)
      .order("created_at", { ascending: false })
      .limit(10),
    fetchIndustryNews().catch(() => []),
  ]);

  const name = client?.company_name ?? session.email;

  return (
    <main className="mx-auto max-w-[1280px] px-6 py-12">

      {/* Welcome */}
      <div className="mb-12">
        <p className="mb-1 text-[11px] font-medium uppercase tracking-widest text-secondary">
          Client Portal
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground lg:text-4xl">
          Welcome back, {name}
        </h1>
      </div>

      {/* Quick links */}
      <div className="mb-12 grid gap-px border border-border bg-border sm:grid-cols-3">
        {[
          { label: "All Projects", href: "/portal/projects", icon: FolderOpen, count: null },
          { label: "Invoices",     href: "/portal/invoices",  icon: Receipt,    count: null },
          { label: "Proposals",    href: "/portal/proposals", icon: FileText,   count: null },
        ].map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group flex items-center justify-between bg-surface px-6 py-5 transition-colors hover:bg-border"
          >
            <div className="flex items-center gap-3">
              <Icon size={16} strokeWidth={1.5} className="text-secondary" />
              <span className="text-[11px] font-semibold uppercase tracking-widest text-foreground">
                {label}
              </span>
            </div>
            <ArrowRight size={14} strokeWidth={1.5} className="text-muted transition-transform group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>

      <div className="grid gap-12 lg:grid-cols-[1fr_380px]">

        {/* Active projects */}
        <section>
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-widest text-muted">
            Active Projects
          </p>
          {!projects?.length ? (
            <p className="text-sm font-light text-muted">No active projects at the moment.</p>
          ) : (
            <div className="space-y-3">
              {projects.map((p) => {
                const status = STATUS_LABELS[p.status] ?? { label: p.status, color: "text-muted bg-surface" };
                return (
                  <Link
                    key={p.id}
                    href={`/portal/projects/${p.id}`}
                    className="group block border border-border bg-surface p-6 transition-colors hover:bg-border"
                  >
                    <div className="mb-3 flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-foreground">{p.name}</p>
                        {p.address && <p className="mt-0.5 text-xs font-light text-muted">{p.address}</p>}
                      </div>
                      <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${status.color}`}>
                        {status.label}
                      </span>
                    </div>
                    {p.status_note && (
                      <p className="mb-3 text-sm font-light text-muted">{p.status_note}</p>
                    )}
                    <div className="flex items-center justify-between">
                      {p.target_date && (
                        <p className="text-[11px] text-muted">
                          Target: {formatDate(p.target_date)}
                        </p>
                      )}
                      <span className="ml-auto flex items-center gap-1 text-[11px] font-medium text-secondary transition-colors group-hover:text-foreground">
                        View project <ArrowRight size={11} strokeWidth={2} />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* Recent documents */}
        <section>
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-widest text-muted">
            Recent Documents
          </p>
          {!recentDocs?.length ? (
            <p className="text-sm font-light text-muted">No documents uploaded yet.</p>
          ) : (
            <div className="divide-y divide-border border border-border">
              {recentDocs.map((doc) => (
                <a
                  key={doc.id}
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start justify-between gap-4 bg-surface px-5 py-4 transition-colors hover:bg-border"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{doc.title}</p>
                    <div className="mt-0.5 flex items-center gap-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-secondary">
                        {KIND_LABELS[doc.kind] ?? doc.kind}
                      </span>
                      {doc.issued_on && (
                        <span className="text-[10px] text-muted">{formatDate(doc.issued_on)}</span>
                      )}
                      {doc.amount_cents && (
                        <span className="text-[10px] font-semibold text-foreground">
                          {formatAmount(doc.amount_cents, doc.currency)}
                        </span>
                      )}
                    </div>
                  </div>
                  <ExternalLink size={13} strokeWidth={1.5} className="mt-0.5 shrink-0 text-muted group-hover:text-secondary" />
                </a>
              ))}
            </div>
          )}
        </section>

      </div>

      {/* Industry News */}
      {news.length > 0 && (
        <section className="mt-16 border-t border-border pt-12">
          <div className="mb-6 flex items-center gap-3">
            <Newspaper size={15} strokeWidth={1.5} className="text-secondary" />
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">
              Industry News
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block border border-border bg-surface p-5 transition-colors hover:bg-border"
              >
                <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-secondary">
                  {item.source}
                </p>
                <p className="mb-2 line-clamp-2 text-sm font-medium leading-snug text-foreground group-hover:underline">
                  {item.title}
                </p>
                {item.description && (
                  <p className="line-clamp-2 text-xs font-light leading-relaxed text-muted">
                    {item.description}
                  </p>
                )}
                <div className="mt-3 flex items-center gap-1 text-[10px] font-medium text-secondary">
                  Read more <ExternalLink size={10} strokeWidth={2} />
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

    </main>
  );
}
