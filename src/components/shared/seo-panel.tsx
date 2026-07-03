"use client";

interface Props {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  onMetaTitleChange: (v: string) => void;
  onMetaDescriptionChange: (v: string) => void;
  onFocusKeywordChange: (v: string) => void;
}

function CounterBar({ length, min, max }: { length: number; min: number; max: number }) {
  const status = length === 0 ? "empty" : length < min || length > max ? "warn" : "good";
  const color = status === "good" ? "bg-green-600" : status === "warn" ? "bg-amber-500" : "bg-border";
  const pct = Math.min(100, (length / max) * 100);
  return (
    <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-border">
      <div className={`h-full transition-all ${color}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

export function SeoPanel({
  slug, metaTitle, metaDescription, focusKeyword,
  onMetaTitleChange, onMetaDescriptionChange, onFocusKeywordChange,
}: Props) {
  const titleLen = metaTitle.length;
  const descLen = metaDescription.length;
  const keywordInTitle = focusKeyword && metaTitle.toLowerCase().includes(focusKeyword.toLowerCase());
  const keywordInDesc = focusKeyword && metaDescription.toLowerCase().includes(focusKeyword.toLowerCase());

  const inputCls = "w-full border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-secondary focus:outline-none";
  const labelCls = "mb-1.5 block text-[11px] font-medium uppercase tracking-widest text-muted";

  return (
    <div className="space-y-6 border border-border bg-surface p-6">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-bold uppercase tracking-widest text-secondary">SEO Settings</p>
      </div>

      {/* Focus keyword */}
      <div>
        <label htmlFor="focus_keyword" className={labelCls}>Focus Keyword</label>
        <input
          id="focus_keyword"
          value={focusKeyword}
          onChange={(e) => onFocusKeywordChange(e.target.value)}
          className={inputCls}
          placeholder="e.g. permit set checklist"
        />
        {focusKeyword && (
          <div className="mt-2 space-y-1 text-[11px]">
            <p className={keywordInTitle ? "text-green-700" : "text-amber-600"}>
              {keywordInTitle ? "✓" : "○"} Keyword {keywordInTitle ? "found" : "missing"} in meta title
            </p>
            <p className={keywordInDesc ? "text-green-700" : "text-amber-600"}>
              {keywordInDesc ? "✓" : "○"} Keyword {keywordInDesc ? "found" : "missing"} in meta description
            </p>
          </div>
        )}
      </div>

      {/* Meta title */}
      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="meta_title" className={labelCls}>Meta Title</label>
          <span className={`text-[11px] font-medium ${titleLen > 60 ? "text-red-500" : titleLen < 30 && titleLen > 0 ? "text-amber-600" : "text-muted"}`}>
            {titleLen}/60
          </span>
        </div>
        <input
          id="meta_title"
          value={metaTitle}
          onChange={(e) => onMetaTitleChange(e.target.value)}
          className={inputCls}
          placeholder="Up to 60 characters"
        />
        <CounterBar length={titleLen} min={30} max={60} />
      </div>

      {/* Meta description */}
      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="meta_description" className={labelCls}>Meta Description</label>
          <span className={`text-[11px] font-medium ${descLen > 160 ? "text-red-500" : descLen < 70 && descLen > 0 ? "text-amber-600" : "text-muted"}`}>
            {descLen}/160
          </span>
        </div>
        <textarea
          id="meta_description"
          value={metaDescription}
          onChange={(e) => onMetaDescriptionChange(e.target.value)}
          rows={3}
          className={inputCls}
          placeholder="Up to 160 characters"
        />
        <CounterBar length={descLen} min={70} max={160} />
      </div>

      {/* SERP preview */}
      <div>
        <p className={labelCls}>Search Preview</p>
        <div className="border border-border bg-background p-4">
          <p className="text-[13px] text-[#1a0dab]" style={{ fontFamily: "arial, sans-serif" }}>
            www.cadtri.com › resources › {slug || "your-post-slug"}
          </p>
          <p className="mt-0.5 truncate text-lg text-[#1a0dab]" style={{ fontFamily: "arial, sans-serif" }}>
            {metaTitle || "Your meta title will appear here"}
          </p>
          <p className="mt-0.5 text-sm text-[#4d5156]" style={{ fontFamily: "arial, sans-serif" }}>
            {metaDescription || "Your meta description will appear here, summarizing the article for search engines."}
          </p>
        </div>
      </div>
    </div>
  );
}
