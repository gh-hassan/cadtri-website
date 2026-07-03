"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/app/portal/_lib/supabase";
import { requireAdminSession } from "../_lib/session";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

interface PostInput {
  title: string;
  slug: string;
  excerpt: string;
  content_html: string;
  category: string;
  reading_time: string;
  image: string | null;
  meta_title: string | null;
  meta_description: string | null;
  focus_keyword: string | null;
}

function readInput(formData: FormData): PostInput {
  const title = (formData.get("title") as string).trim();
  const slugRaw = (formData.get("slug") as string | null)?.trim();
  return {
    title,
    slug: slugify(slugRaw || title),
    excerpt: (formData.get("excerpt") as string | null)?.trim() ?? "",
    content_html: (formData.get("content_html") as string | null) ?? "",
    category: (formData.get("category") as string | null) ?? "Permitting",
    reading_time: (formData.get("reading_time") as string | null)?.trim() || "5 min read",
    image: (formData.get("image") as string | null)?.trim() || null,
    meta_title: (formData.get("meta_title") as string | null)?.trim() || null,
    meta_description: (formData.get("meta_description") as string | null)?.trim() || null,
    focus_keyword: (formData.get("focus_keyword") as string | null)?.trim() || null,
  };
}

export async function createBlogPost(formData: FormData) {
  await requireAdminSession();
  const input = readInput(formData);
  const status = (formData.get("status") as string) === "published" ? "published" : "draft";

  if (!input.title) return { error: "Title is required." };

  const { data, error } = await db
    .from("blog_posts")
    .insert({
      ...input,
      status,
      published_at: status === "published" ? new Date().toISOString() : null,
    })
    .select("id")
    .single();

  if (error) return { error: error.message };

  revalidatePath("/blog");
  redirect(`/admin/blog/${data.id}`);
}

export async function updateBlogPost(id: string, formData: FormData) {
  await requireAdminSession();
  const input = readInput(formData);
  const status = (formData.get("status") as string) === "published" ? "published" : "draft";

  if (!input.title) return { error: "Title is required." };

  const { data: existing } = await db.from("blog_posts").select("status, published_at, slug").eq("id", id).single();

  const { error } = await db
    .from("blog_posts")
    .update({
      ...input,
      status,
      published_at: status === "published" ? existing?.published_at ?? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/blog");
  if (existing?.slug) revalidatePath(`/blog/${existing.slug}`);
  if (input.slug !== existing?.slug) revalidatePath(`/blog/${input.slug}`);
  redirect("/admin/blog");
}

export async function deleteBlogPost(id: string) {
  await requireAdminSession();
  const { error } = await db.from("blog_posts").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/blog");
  redirect("/admin/blog");
}
