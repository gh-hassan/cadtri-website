"use client";

import { useState } from "react";
import { createProject, updateProject } from "./actions";

const STATUSES = [
  { value: "proposal",    label: "Proposal" },
  { value: "in_progress", label: "In Progress" },
  { value: "plan_check",  label: "Plan Check" },
  { value: "approved",    label: "Approved" },
  { value: "completed",   label: "Completed" },
  { value: "on_hold",     label: "On Hold" },
  { value: "cancelled",   label: "Cancelled" },
];

interface Client { id: string; company_name: string; }

interface Project {
  id: string; name: string; address: string | null; status: string;
  status_note: string | null; started_at: string | null; target_date: string | null;
  client_id: string;
}

interface Props {
  clients: Client[];
  project?: Project;
  preselectedClientId?: string;
}

export function ProjectForm({ clients, project, preselectedClientId }: Props) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const result = project ? await updateProject(project.id, fd) : await createProject(fd);
    if (result?.error) { setError(result.error); setLoading(false); }
  }

  const inputCls = "w-full border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-secondary focus:outline-none";
  const labelCls = "mb-1.5 block text-[11px] font-medium uppercase tracking-widest text-muted";

  return (
    <form onSubmit={handleSubmit} className="space-y-5 border border-border bg-surface p-8">
      {!project && (
        <div>
          <label htmlFor="client_id" className={labelCls}>Client <span className="text-secondary">*</span></label>
          <select id="client_id" name="client_id" required defaultValue={preselectedClientId ?? ""} className={inputCls}>
            <option value="">Select a client…</option>
            {clients.map((c) => <option key={c.id} value={c.id}>{c.company_name}</option>)}
          </select>
        </div>
      )}

      <div>
        <label htmlFor="name" className={labelCls}>Project name <span className="text-secondary">*</span></label>
        <input id="name" name="name" type="text" required defaultValue={project?.name ?? ""} className={inputCls} />
      </div>

      <div>
        <label htmlFor="address" className={labelCls}>Address</label>
        <input id="address" name="address" type="text" defaultValue={project?.address ?? ""} className={inputCls} />
      </div>

      <div>
        <label htmlFor="status" className={labelCls}>Status <span className="text-secondary">*</span></label>
        <select id="status" name="status" required defaultValue={project?.status ?? "in_progress"} className={inputCls}>
          {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="status_note" className={labelCls}>Status note (shown to client)</label>
        <textarea id="status_note" name="status_note" rows={2} defaultValue={project?.status_note ?? ""} className={inputCls} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="started_at" className={labelCls}>Start date</label>
          <input id="started_at" name="started_at" type="date" defaultValue={project?.started_at ?? ""} className={inputCls} />
        </div>
        <div>
          <label htmlFor="target_date" className={labelCls}>Target date</label>
          <input id="target_date" name="target_date" type="date" defaultValue={project?.target_date ?? ""} className={inputCls} />
        </div>
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <button type="submit" disabled={loading} className="w-full bg-secondary px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90 disabled:opacity-40">
        {loading ? "Saving…" : project ? "Save changes" : "Create project"}
      </button>
    </form>
  );
}
