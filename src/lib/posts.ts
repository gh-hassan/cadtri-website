import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { db } from "@/app/portal/_lib/supabase";

const postsDir = path.join(process.cwd(), "src/content/posts");

export interface FaqEntry {
  q: string;
  a: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  metaTitle?: string;
  description: string;
  date: string;
  dateModified?: string;
  category: string;
  readingTime: string;
  image?: string;
  imageAlt?: string;
  imageTitle?: string;
  faq?: FaqEntry[];
  source?: "mdx" | "db";
}

export interface Post extends PostMeta {
  content: string;
  contentHtml?: string;
}

interface DbBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content_html: string;
  category: string;
  reading_time: string;
  image: string | null;
  image_alt: string | null;
  image_title: string | null;
  status: "draft" | "published";
  meta_title: string | null;
  meta_description: string | null;
  focus_keyword: string | null;
  published_at: string | null;
  updated_at: string;
}

function dbPostToPostMeta(p: DbBlogPost): PostMeta {
  return {
    slug: p.slug,
    title: p.title,
    metaTitle: p.meta_title ?? undefined,
    description: p.meta_description ?? p.excerpt,
    date: p.published_at ?? p.updated_at,
    category: p.category,
    readingTime: p.reading_time,
    image: p.image ?? undefined,
    imageAlt: p.image_alt ?? undefined,
    imageTitle: p.image_title ?? undefined,
    source: "db",
  };
}

function getMdxPosts(): PostMeta[] {
  if (!fs.existsSync(postsDir)) return [];

  const files = fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".mdx"));

  return files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(postsDir, filename), "utf8");
    const { data } = matter(raw);
    return {
      slug,
      title: (data.title as string) ?? "",
      metaTitle: (data.metaTitle as string | undefined) ?? undefined,
      description: (data.description as string) ?? "",
      date: (data.date as string) ?? "",
      dateModified: (data.dateModified as string | undefined) ?? undefined,
      category: (data.category as string) ?? "",
      readingTime: (data.readingTime as string) ?? "",
      image: (data.image as string | undefined) ?? undefined,
      faq: (data.faq as FaqEntry[] | undefined) ?? undefined,
      source: "mdx" as const,
    };
  });
}

async function getDbPosts(): Promise<PostMeta[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return [];
  try {
    const { data, error } = await db
      .from("blog_posts")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false });
    if (error || !data) return [];
    return (data as DbBlogPost[]).map(dbPostToPostMeta);
  } catch {
    return [];
  }
}

// ─── Resource guides (MDX files) ────────────────────────────────────────────
// /resources and /resources/[slug] are backed by the MDX files only.

export async function getAllPosts(): Promise<PostMeta[]> {
  return getMdxPosts().sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const filepath = path.join(postsDir, `${slug}.mdx`);
  if (!fs.existsSync(filepath)) return undefined;

  const raw = fs.readFileSync(filepath, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: (data.title as string) ?? "",
    metaTitle: (data.metaTitle as string | undefined) ?? undefined,
    description: (data.description as string) ?? "",
    date: (data.date as string) ?? "",
    dateModified: (data.dateModified as string | undefined) ?? undefined,
    category: (data.category as string) ?? "",
    readingTime: (data.readingTime as string) ?? "",
    image: (data.image as string | undefined) ?? undefined,
    faq: (data.faq as FaqEntry[] | undefined) ?? undefined,
    source: "mdx",
    content,
  };
}

// ─── Blog posts (database, published from the admin portal) ──────────────────
// /blog and /blog/[slug] are backed by the blog_posts table only.

export async function getBlogPosts(): Promise<PostMeta[]> {
  return getDbPosts();
}

export async function getBlogPostBySlug(slug: string): Promise<Post | undefined> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return undefined;
  try {
    const { data, error } = await db
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();
    if (error || !data) return undefined;

    const p = data as DbBlogPost;
    return {
      ...dbPostToPostMeta(p),
      content: "",
      contentHtml: p.content_html,
    };
  } catch {
    return undefined;
  }
}

export function formatDate(dateStr: string): string {
  // MDX dates are date-only ("2026-03-10"); DB dates are full ISO timestamps.
  const d = dateStr.includes("T") ? new Date(dateStr) : new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
