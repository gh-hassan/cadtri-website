"use client";

import { useState } from "react";
import { RichTextEditor } from "@/components/shared/rich-text-editor";
import { SeoPanel } from "@/components/shared/seo-panel";
import { createBlogPost, updateBlogPost, deleteBlogPost, uploadBlogImage } from "./actions";

const CATEGORIES = ["Permitting", "Residential", "Compliance", "Strategy", "Coordination"];

interface InitialPost {
  id?: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  content_html?: string;
  category?: string;
  reading_time?: string;
  image?: string;
  status?: "draft" | "published";
  meta_title?: string;
  meta_description?: string;
  focus_keyword?: string;
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function BlogForm({ initial }: { initial?: InitialPost }) {
  const isEditing = !!initial?.id;

  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(isEditing);
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [category, setCategory] = useState(initial?.category ?? CATEGORIES[0]);
  const [readingTime, setReadingTime] = useState(initial?.reading_time ?? "5 min read");
  const [image, setImage] = useState(initial?.image ?? "");
  const [contentHtml, setContentHtml] = useState(initial?.content_html ?? "");
  const [metaTitle, setMetaTitle] = useState(initial?.meta_title ?? "");
  const [metaDescription, setMetaDescription] = useState(initial?.meta_description ?? "");
  const [focusKeyword, setFocusKeyword] = useState(initial?.focus_keyword ?? "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  function handleTitleChange(v: string) {
    setTitle(v);
    if (!slugTouched) setSlug(slugify(v));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    const fd = new FormData();
    fd.set("file", file);
    const result = await uploadBlogImage(fd);
    if (result.error) setError(result.error);
    else if (result.url) setImage(result.url);
    setUploading(false);
    e.target.value = "";
  }

  async function handleSubmit(status: "draft" | "published") {
    if (!title.trim()) { setError("Title is required."); return; }
    setLoading(true);
    setError("");

    const fd = new FormData();
    fd.set("title", title);
    fd.set("slug", slug || slugify(title));
    fd.set("excerpt", excerpt);
    fd.set("content_html", contentHtml);
    fd.set("category", category);
    fd.set("reading_time", readingTime);
    fd.set("image", image);
    fd.set("meta_title", metaTitle);
    fd.set("meta_description", metaDescription);
    fd.set("focus_keyword", focusKeyword);
    fd.set("status", status);

    const result = isEditing
      ? await updateBlogPost(initial!.id!, fd)
      : await createBlogPost(fd);

    if (result?.error) { setError(result.error); setLoading(false); }
  }

  async function handleDelete() {
    if (!isEditing || !window.confirm("Delete this post permanently?")) return;
    setLoading(true);
    const result = await deleteBlogPost(initial!.id!);
    if (result?.error) { setError(result.error); setLoading(false); }
  }

  const inputCls = "w-full border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-secondary focus:outline-none";
  const labelCls = "mb-1.5 block text-[11px] font-medium uppercase tracking-widest text-muted";

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      {/* Main column */}
      <div className="space-y-6">
        <div className="border border-border bg-surface p-6">
          <div className="mb-5">
            <label htmlFor="title" className={labelCls}>Title <span className="text-secondary">*</span></label>
            <input id="title" value={title} onChange={(e) => handleTitleChange(e.target.value)} className={inputCls} placeholder="Article title" />
          </div>

          <div className="mb-5">
            <label htmlFor="slug" className={labelCls}>Slug</label>
            <div className="flex items-center gap-2">
              <span className="text-[13px] text-muted">/blog/</span>
              <input
                id="slug"
                value={slug}
                onChange={(e) => { setSlug(slugify(e.target.value)); setSlugTouched(true); }}
                className={inputCls}
                placeholder="article-slug"
              />
            </div>
          </div>

          <div className="mb-5">
            <label htmlFor="excerpt" className={labelCls}>Excerpt</label>
            <textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} className={inputCls} placeholder="Short summary shown in resource listings" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className={labelCls}>Category</label>
              <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className={inputCls}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="reading_time" className={labelCls}>Reading time</label>
              <input id="reading_time" value={readingTime} onChange={(e) => setReadingTime(e.target.value)} className={inputCls} placeholder="5 min read" />
            </div>
          </div>

          <div className="mt-5">
            <label className={labelCls}>Featured image</label>

            {/* Preview */}
            {image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image} alt="Featured preview" className="mb-3 aspect-[16/9] w-full border border-border object-cover" />
            )}

            <div className="flex flex-wrap items-center gap-3">
              <label className={`inline-flex cursor-pointer items-center gap-2 border border-border bg-background px-4 py-2.5 text-xs font-semibold uppercase tracking-widest transition-colors hover:bg-border ${uploading ? "opacity-40" : "text-foreground"}`}>
                {uploading ? "Uploading…" : image ? "Replace image" : "Upload image"}
                <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} className="hidden" />
              </label>
              {image && (
                <button type="button" onClick={() => setImage("")} className="text-[11px] font-medium uppercase tracking-widest text-red-500 hover:underline">
                  Remove
                </button>
              )}
            </div>
            <p className="mt-2 text-[11px] text-muted">JPG, PNG, or WebP. Max 5 MB.</p>

            {/* Optional manual URL */}
            <input id="image" value={image} onChange={(e) => setImage(e.target.value)} className={`${inputCls} mt-3`} placeholder="…or paste an image URL" />
          </div>
        </div>

        <div>
          <label className={labelCls}>Content</label>
          <RichTextEditor content={contentHtml} onChange={setContentHtml} />
        </div>

        {error && <p className="text-xs text-red-500">{error}</p>}

        <div className="flex items-center justify-between border-t border-border pt-6">
          <div className="flex gap-3">
            <button type="button" disabled={loading} onClick={() => handleSubmit("draft")} className="border border-border bg-surface px-6 py-3 text-xs font-bold uppercase tracking-widest text-foreground transition-colors hover:bg-border disabled:opacity-40">
              Save Draft
            </button>
            <button type="button" disabled={loading} onClick={() => handleSubmit("published")} className="bg-secondary px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90 disabled:opacity-40">
              {initial?.status === "published" ? "Update & Republish" : "Publish"}
            </button>
          </div>
          {isEditing && (
            <button type="button" disabled={loading} onClick={handleDelete} className="text-[11px] font-medium uppercase tracking-widest text-red-500 hover:underline disabled:opacity-40">
              Delete post
            </button>
          )}
        </div>
      </div>

      {/* SEO sidebar */}
      <div>
        <SeoPanel
          slug={slug}
          metaTitle={metaTitle}
          metaDescription={metaDescription}
          focusKeyword={focusKeyword}
          onMetaTitleChange={setMetaTitle}
          onMetaDescriptionChange={setMetaDescription}
          onFocusKeywordChange={setFocusKeyword}
        />
      </div>
    </div>
  );
}
