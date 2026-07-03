import Link from "next/link";
import { Plus } from "lucide-react";
import { requireAdminSession } from "../_lib/session";
import { db } from "@/app/portal/_lib/supabase";

export default async function AdminBlogListPage() {
  await requireAdminSession();

  const { data: posts } = await db
    .from("blog_posts")
    .select("id, title, slug, category, status, updated_at, published_at")
    .order("updated_at", { ascending: false });

  return (
    <main className="mx-auto max-w-[1280px] px-6 py-10">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <p className="mb-1 text-[11px] font-medium uppercase tracking-widest text-secondary">Admin</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Blog Posts</h1>
        </div>
        <Link href="/admin/blog/new" className="inline-flex items-center gap-2 bg-secondary px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90">
          <Plus size={14} strokeWidth={2.5} />
          Write New Post
        </Link>
      </div>

      <div className="divide-y divide-border border border-border">
        {posts?.map((p) => (
          <Link key={p.id} href={`/admin/blog/${p.id}`} className="flex items-center justify-between gap-4 bg-surface px-6 py-5 transition-colors hover:bg-border">
            <div>
              <p className="text-sm font-medium text-foreground">{p.title}</p>
              <p className="mt-0.5 text-[11px] text-muted">/blog/{p.slug} · {p.category}</p>
            </div>
            <span className={`shrink-0 text-[10px] font-semibold uppercase tracking-wider ${p.status === "published" ? "text-green-700" : "text-muted"}`}>
              {p.status}
            </span>
          </Link>
        ))}
        {!posts?.length && (
          <p className="bg-surface px-6 py-8 text-center text-sm font-light text-muted">
            No posts yet. Click &ldquo;Write New Post&rdquo; to create your first one.
          </p>
        )}
      </div>
    </main>
  );
}
