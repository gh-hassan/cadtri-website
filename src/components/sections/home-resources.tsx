import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";

/**
 * Resources teaser section — shows the 3 most recent articles from /resources.
 * Rendered at build time (server component, no caching concerns).
 */
export function HomeResources() {
  const posts = getAllPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section className="border-t border-border bg-surface py-24">
      <div className="container mx-auto max-w-container px-6">

        {/* Split header */}
        <div className="mb-14 grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Resources
            </p>
            <h2
              className="font-bold text-3xl text-foreground sm:text-4xl"
              style={{ letterSpacing: "-0.025em" }}
            >
              Permit and documentation guides.
            </h2>
          </div>
          <div className="flex items-end justify-between gap-6">
            <p className="font-light leading-relaxed text-muted">
              Practical guides on the permit process, documentation
              requirements, and what to expect when working through California
              and Texas jurisdictions.
            </p>
            <Link
              href="/resources"
              className="shrink-0 text-[11px] font-medium uppercase tracking-wider text-secondary hover:text-foreground"
            >
              All Articles
            </Link>
          </div>
        </div>

        {/* Article list */}
        <ul className="divide-y divide-border border border-border" role="list">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/resources/${post.slug}`}
                className="group flex items-start gap-6 px-7 py-7 transition-colors duration-200 hover:bg-background lg:px-9"
              >
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-3">
                    <span className="text-[10px] font-medium uppercase tracking-widest text-secondary">
                      {post.category}
                    </span>
                    <span className="text-[10px] text-muted/50" aria-hidden>·</span>
                    <span className="text-[10px] font-light text-muted">
                      {post.readingTime}
                    </span>
                  </div>
                  <p
                    className="font-bold text-base text-foreground transition-colors duration-200 group-hover:text-secondary"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    {post.title}
                  </p>
                  <p className="mt-1.5 text-sm font-light text-muted line-clamp-2">
                    {post.description}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-3 pt-1">
                  <span
                    className="text-secondary transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden
                  >
                    →
                  </span>
                  <span className="text-[10px] font-light text-muted">
                    {formatDate(post.date)}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
}
