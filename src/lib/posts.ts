import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "src/content/posts");

export interface FaqEntry {
  q: string;
  a: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  dateModified?: string;
  category: string;
  readingTime: string;
  image?: string;
  faq?: FaqEntry[];
}

export interface Post extends PostMeta {
  content: string;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDir)) return [];

  const files = fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(postsDir, filename), "utf8");
    const { data } = matter(raw);
    return {
      slug,
      title: (data.title as string) ?? "",
      description: (data.description as string) ?? "",
      date: (data.date as string) ?? "",
      dateModified: (data.dateModified as string | undefined) ?? undefined,
      category: (data.category as string) ?? "",
      readingTime: (data.readingTime as string) ?? "",
      image: (data.image as string | undefined) ?? undefined,
      faq: (data.faq as FaqEntry[] | undefined) ?? undefined,
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getPostBySlug(slug: string): Post | undefined {
  const filepath = path.join(postsDir, `${slug}.mdx`);
  if (!fs.existsSync(filepath)) return undefined;

  const raw = fs.readFileSync(filepath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: (data.title as string) ?? "",
    description: (data.description as string) ?? "",
    date: (data.date as string) ?? "",
    dateModified: (data.dateModified as string | undefined) ?? undefined,
    category: (data.category as string) ?? "",
    readingTime: (data.readingTime as string) ?? "",
    image: (data.image as string | undefined) ?? undefined,
    faq: (data.faq as FaqEntry[] | undefined) ?? undefined,
    content,
  };
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
