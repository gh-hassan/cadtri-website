import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (!_client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) throw new Error("Missing Supabase env vars");
    _client = createClient(url, key, { auth: { persistSession: false } });
  }
  return _client;
}

// Service-role client — server-only, never sent to the browser.
// Bypasses RLS; queries are always scoped to the authenticated client_id.
// Proxy defers env validation to first request, not module init (build-safe).
export const db = new Proxy({} as SupabaseClient, {
  get(_t, prop) {
    return (getClient() as never as Record<string | symbol, unknown>)[prop];
  },
});
