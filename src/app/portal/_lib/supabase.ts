import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!url || !key) {
  throw new Error("Missing Supabase env vars");
}

// Service-role client — server-only, never sent to the browser.
// Bypasses RLS; queries are always scoped to the authenticated client_id.
export const db = createClient(url, key, {
  auth: { persistSession: false },
});
