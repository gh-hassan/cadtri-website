"use client";

import { useState } from "react";
import { createDocument } from "./actions";
import { Upload, Link as LinkIcon } from "lucide-react";

interface Props {
  clients: { id: string; company_name: string }[];
  projects: { id: string; name: string; client_id: string }[];
  preselectedProjectId?: string;
  preselectedClientId?: string;
}

const KINDS = [
  { value: "invoice",      label: "Invoice" },
  { value: "proposal",     label: "Proposal" },
  { value: "project_file", label: "Project File" },
  { value: "other",        label: "Other" },
];

export function DocumentForm({ clients, projects, preselectedProjectId, preselectedClientId }: Props) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadType, setUploadType] = useState<"url" | "file">("url");
  const [selectedClient, setSelectedClient] = useState(preselectedClientId ?? "");
  const [kind, setKind] = useState("invoice");

  const filteredProjects = projects.filter((p) => !selectedClient || p.client_id === selectedClient);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    fd.set("upload_type", uploadType);
    const result = await createDocument(fd);
    if (result?.error) { setError(result.error); setLoading(false); }
  }

  const inputCls = "w-full border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-secondary focus:outline-none";
  const labelCls = "mb-1.5 block text-[11px] font-medium uppercase tracking-widest text-muted";

  return (
    <form onSubmit={handleSubmit} className="space-y-5 border border-border bg-surface p-8">
      {/* Client */}
      <div>
        <label htmlFor="client_id" className={labelCls}>Client <span className="text-secondary">*</span></label>
        <select id="client_id" name="client_id" required value={selectedClient} onChange={(e) => setSelectedClient(e.target.value)} className={inputCls}>
          <option value="">Select client…</option>
          {clients.map((c) => <option key={c.id} value={c.id}>{c.company_name}</option>)}
        </select>
      </div>

      {/* Project (optional) */}
      <div>
        <label htmlFor="project_id" className={labelCls}>Project (optional)</label>
        <select id="project_id" name="project_id" defaultValue={preselectedProjectId ?? ""} className={inputCls}>
          <option value="">Not project-specific</option>
          {filteredProjects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>

      {/* Kind */}
      <div>
        <label htmlFor="kind" className={labelCls}>Document type <span className="text-secondary">*</span></label>
        <select id="kind" name="kind" required value={kind} onChange={(e) => setKind(e.target.value)} className={inputCls}>
          {KINDS.map((k) => <option key={k.value} value={k.value}>{k.label}</option>)}
        </select>
      </div>

      {/* Title */}
      <div>
        <label htmlFor="title" className={labelCls}>Title <span className="text-secondary">*</span></label>
        <input id="title" name="title" type="text" required className={inputCls} placeholder={kind === "invoice" ? "Invoice #1042" : kind === "proposal" ? "Project Proposal — ADU Addition" : "Title…"} />
      </div>

      {/* Invoice-specific */}
      {kind === "invoice" && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="amount" className={labelCls}>Amount (USD)</label>
            <input id="amount" name="amount" type="number" step="0.01" min="0" className={inputCls} placeholder="2500.00" />
          </div>
          <div>
            <label htmlFor="issued_on" className={labelCls}>Invoice date</label>
            <input id="issued_on" name="issued_on" type="date" className={inputCls} />
          </div>
        </div>
      )}

      {kind === "proposal" && (
        <div>
          <label htmlFor="issued_on" className={labelCls}>Proposal date</label>
          <input id="issued_on" name="issued_on" type="date" className={inputCls} />
        </div>
      )}

      {/* Notes */}
      <div>
        <label htmlFor="notes" className={labelCls}>Notes (shown to client)</label>
        <input id="notes" name="notes" type="text" className={inputCls} placeholder="Optional note…" />
      </div>

      {/* Upload type toggle */}
      <div>
        <p className={labelCls}>File source</p>
        <div className="flex gap-2">
          {(["url", "file"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setUploadType(t)}
              className={`flex flex-1 items-center justify-center gap-2 border px-4 py-3 text-xs font-semibold uppercase tracking-widest transition-colors ${uploadType === t ? "border-secondary bg-secondary/10 text-secondary" : "border-border bg-background text-muted hover:border-secondary"}`}
            >
              {t === "url" ? <><LinkIcon size={13} strokeWidth={2} /> External URL</> : <><Upload size={13} strokeWidth={2} /> Upload file</>}
            </button>
          ))}
        </div>
      </div>

      {uploadType === "url" ? (
        <div>
          <label htmlFor="url" className={labelCls}>URL <span className="text-secondary">*</span></label>
          <input id="url" name="url" type="url" required className={inputCls} placeholder="https://drive.google.com/…" />
        </div>
      ) : (
        <div>
          <label htmlFor="file" className={labelCls}>File (max 50 MB) <span className="text-secondary">*</span></label>
          <input id="file" name="file" type="file" required accept=".pdf,.jpg,.jpeg,.png,.webp,.zip,.xlsx"
            className="w-full border border-border bg-background px-4 py-3 text-sm text-muted file:mr-4 file:border-0 file:bg-secondary file:px-3 file:py-1.5 file:text-xs file:font-semibold file:uppercase file:tracking-widest file:text-white hover:file:opacity-90" />
          <p className="mt-1.5 text-[11px] text-muted">Accepted: PDF, JPG, PNG, ZIP, XLSX</p>
        </div>
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}

      <button type="submit" disabled={loading} className="w-full bg-secondary px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90 disabled:opacity-40">
        {loading ? "Uploading…" : "Add document"}
      </button>
    </form>
  );
}
