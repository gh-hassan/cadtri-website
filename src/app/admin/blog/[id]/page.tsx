import { notFound } from "next/navigation";
import { requireAdminSession } from "../../_lib/session";
import { db } from "@/app/portal/_lib/supabase";
import { BlogForm } from "../blog-form";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPostPage({ params }: Props) {
  await requireAdminSession();
  const { id } = await params;

  const { data: post } = await db.from("blog_posts").select("*").eq("id", id).single();
  if (!post) notFound();

  return (
    <main className="mx-auto max-w-[1280px] px-6 py-10">
      <div className="mb-8">
        <p className="mb-1 text-[11px] font-medium uppercase tracking-widest text-secondary">Admin · Blog</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Edit Post</h1>
      </div>
      <BlogForm initial={post} />
    </main>
  );
}
