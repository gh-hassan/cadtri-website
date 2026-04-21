import { requireAdminSession } from "./_lib/session";
import { db } from "@/app/portal/_lib/supabase";
import Link from "next/link";
import { Users, FolderOpen, FileText, Bell, Plus } from "lucide-react";

export default async function AdminOverviewPage() {
  await requireAdminSession();

  const [
    { count: clientCount },
    { count: projectCount },
    { count: docCount },
    { data: recentProjects },
    { data: recentNotifications },
  ] = await Promise.all([
    db.from("clients").select("*", { count: "exact", head: true }),
    db.from("projects").select("*", { count: "exact", head: true }),
    db.from("documents").select("*", { count: "exact", head: true }),
    db.from("projects").select("id, name, status, clients(company_name)").order("created_at", { ascending: false }).limit(5),
    db.from("notification_log").select("id, event_type, subject, sent_at, clients(company_name)").order("sent_at", { ascending: false }).limit(5),
  ]);

  const STATUS_COLOR: Record<string, string> = {
    proposal:    "text-secondary",
    in_progress: "text-blue-600",
    plan_check:  "text-amber-600",
    approved:    "text-green-700",
    completed:   "text-muted",
    on_hold:     "text-muted",
    cancelled:   "text-muted",
  };

  const EVENT_LABELS: Record<string, string> = {
    project_created: "Project created",
    status_changed:  "Status changed",
    document_added:  "Document added",
    welcome:         "Welcome sent",
  };

  return (
    <main className="mx-auto max-w-[1280px] px-6 py-10">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <p className="mb-1 text-[11px] font-medium uppercase tracking-widest text-secondary">Admin</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Overview</h1>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-10 grid gap-px border border-border bg-border sm:grid-cols-3">
        {[
          { label: "Total Clients",   value: clientCount ?? 0,  icon: Users,      href: "/admin/clients" },
          { label: "Total Projects",  value: projectCount ?? 0, icon: FolderOpen, href: "/admin/projects" },
          { label: "Total Documents", value: docCount ?? 0,     icon: FileText,   href: "/admin/documents" },
        ].map(({ label, value, icon: Icon, href }) => (
          <Link key={label} href={href} className="group flex items-center justify-between bg-surface px-6 py-6 transition-colors hover:bg-border">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">{label}</p>
              <p className="mt-1 text-3xl font-extrabold tracking-tight text-foreground">{value}</p>
            </div>
            <Icon size={20} strokeWidth={1.5} className="text-secondary opacity-60 group-hover:opacity-100" />
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mb-10 flex flex-wrap gap-3">
        {[
          { label: "Add Client",   href: "/admin/clients/new" },
          { label: "Add Project",  href: "/admin/projects/new" },
          { label: "Add Document", href: "/admin/documents/new" },
        ].map((a) => (
          <Link key={a.href} href={a.href} className="inline-flex items-center gap-2 border border-border bg-surface px-5 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-foreground transition-colors hover:bg-border">
            <Plus size={12} strokeWidth={2.5} className="text-secondary" />
            {a.label}
          </Link>
        ))}
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Recent projects */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">Recent Projects</p>
            <Link href="/admin/projects" className="text-[11px] text-secondary hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-border border border-border">
            {recentProjects?.map((p) => {
              const client = (Array.isArray(p.clients) ? p.clients[0] : p.clients) as { company_name: string } | null;
              return (
                <Link key={p.id} href={`/admin/projects/${p.id}`} className="flex items-center justify-between bg-surface px-5 py-4 transition-colors hover:bg-border">
                  <div>
                    <p className="text-sm font-medium text-foreground">{p.name}</p>
                    <p className="text-[11px] text-muted">{client?.company_name ?? "—"}</p>
                  </div>
                  <span className={`text-[10px] font-semibold uppercase tracking-wider ${STATUS_COLOR[p.status] ?? "text-muted"}`}>
                    {p.status.replace("_", " ")}
                  </span>
                </Link>
              );
            })}
            {!recentProjects?.length && <p className="px-5 py-4 text-sm font-light text-muted">No projects yet.</p>}
          </div>
        </section>

        {/* Recent notifications */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">Recent Emails Sent</p>
            <Bell size={14} strokeWidth={1.5} className="text-muted" />
          </div>
          <div className="divide-y divide-border border border-border">
            {recentNotifications?.map((n) => {
              const client = (Array.isArray(n.clients) ? n.clients[0] : n.clients) as { company_name: string } | null;
              return (
                <div key={n.id} className="bg-surface px-5 py-4">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm font-medium text-foreground">{n.subject}</p>
                    <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-secondary">
                      {EVENT_LABELS[n.event_type] ?? n.event_type}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-muted">
                    {client?.company_name} &middot; {new Date(n.sent_at).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              );
            })}
            {!recentNotifications?.length && <p className="px-5 py-4 text-sm font-light text-muted">No emails sent yet.</p>}
          </div>
        </section>
      </div>
    </main>
  );
}
