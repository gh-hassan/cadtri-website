"use client";

import { useState } from "react";
import { createClient, updateClient } from "./actions";

interface Props {
  client?: {
    id: string;
    email: string;
    company_name: string;
    contact_name: string | null;
    phone: string | null;
    is_active: boolean;
  };
}

export function ClientForm({ client }: Props) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const result = client ? await updateClient(client.id, fd) : await createClient(fd);
    if (result?.error) { setError(result.error); setLoading(false); }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 border border-border bg-surface p-8">
      {[
        { name: "company_name", label: "Company name", type: "text", required: true, defaultValue: client?.company_name },
        { name: "email", label: "Email address", type: "email", required: true, defaultValue: client?.email },
        { name: "contact_name", label: "Contact name", type: "text", required: false, defaultValue: client?.contact_name ?? "" },
        { name: "phone", label: "Phone", type: "tel", required: false, defaultValue: client?.phone ?? "" },
      ].map((f) => (
        <div key={f.name}>
          <label htmlFor={f.name} className="mb-1.5 block text-[11px] font-medium uppercase tracking-widest text-muted">
            {f.label}{f.required && <span className="ml-1 text-secondary">*</span>}
          </label>
          <input
            id={f.name}
            name={f.name}
            type={f.type}
            required={f.required}
            defaultValue={f.defaultValue ?? ""}
            className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-secondary focus:outline-none"
          />
        </div>
      ))}

      {client && (
        <div>
          <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-widest text-muted">Status</label>
          <select name="is_active" defaultValue={client.is_active ? "true" : "false"}
            className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-secondary focus:outline-none">
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}

      <button type="submit" disabled={loading}
        className="w-full bg-secondary px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90 disabled:opacity-40">
        {loading ? "Saving…" : client ? "Save changes" : "Create client"}
      </button>
    </form>
  );
}
