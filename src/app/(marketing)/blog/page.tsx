import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { getBlogPosts, formatDate } from "@/lib/posts";
import { BreadcrumbJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: { absolute: "Blog | CADTRI Architectural Drafting & Permit Insights" },
  description:
    "Insights, guides, and updates on architectural drafting, BIM coordination, permit strategy, and construction documentation from the CADTRI team.",
  alternates: { canonical: "/blog" },
};

// Always reflect the latest published posts from the database.
export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
        ]}
      />

      <PageHeader
        eyebrow="Blog"
        heading="Insights from the drafting room."
        description="Practical thinking on architectural drafting, BIM coordination, permit strategy, and construction documentation, written for owners, architects, and contractors."
      />

      <Section variant="default">
        {posts.length === 0 ? (
          <div className="border border-border bg-surface px-8 py-20 text-center">
            <p className="text-lg font-light text-muted">
              No blog posts published yet. Check back soon.
            </p>
          </div>
        ) : (
          <>
            {/* Featured post */}
            {featured && (
              <Link
                href={`/blog/${featured.slug}`}
                className="group mb-16 grid gap-8 border-b border-border pb-16 lg:grid-cols-2 lg:gap-12"
              >
                <div className="relative aspect-[16/10] overflow-hidden border border-border bg-surface">
                  {featured.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={featured.image}
                      alt={featured.imageAlt || featured.title}
                      title={featured.imageTitle || undefined}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="text-[11px] font-medium uppercase tracking-widest text-muted/50">
                        CADTRI
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <span className="text-[10px] font-medium uppercase tracking-widest text-secondary">
                      {featured.category}
                    </span>
                    <span className="text-[10px] text-muted/40" aria-hidden>·</span>
                    <span className="text-[10px] font-light text-muted">{featured.readingTime}</span>
                    <span className="text-[10px] text-muted/40" aria-hidden>·</span>
                    <span className="text-[10px] font-light text-muted">{formatDate(featured.date)}</span>
                  </div>
                  <h2
                    className="mb-4 font-bold text-3xl text-foreground transition-colors group-hover:text-secondary sm:text-4xl"
                    style={{ letterSpacing: "-0.025em" }}
                  >
                    {featured.title}
                  </h2>
                  <p className="font-light leading-relaxed text-muted line-clamp-3">
                    {featured.description}
                  </p>
                  <span className="mt-6 inline-block text-[11px] font-medium uppercase tracking-widest text-secondary">
                    Read Article →
                  </span>
                </div>
              </Link>
            )}

            {/* Card grid */}
            {rest.length > 0 && (
              <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col bg-background transition-colors duration-200 hover:bg-surface"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                      {post.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={post.image}
                          alt={post.imageAlt || post.title}
                          title={post.imageTitle || undefined}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <span className="text-[11px] font-medium uppercase tracking-widest text-muted/40">
                            CADTRI
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-medium uppercase tracking-widest text-secondary">
                          {post.category}
                        </span>
                        <span className="text-[10px] text-muted/40" aria-hidden>·</span>
                        <span className="text-[10px] font-light text-muted">{post.readingTime}</span>
                      </div>
                      <h3
                        className="mb-2 font-bold text-lg text-foreground transition-colors group-hover:text-secondary"
                        style={{ letterSpacing: "-0.01em" }}
                      >
                        {post.title}
                      </h3>
                      <p className="text-sm font-light leading-relaxed text-muted line-clamp-3">
                        {post.description}
                      </p>
                      <span className="mt-4 text-[10px] font-light text-muted">
                        {formatDate(post.date)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </Section>

      <CtaBand
        heading="Have a project in mind?"
        subheading="Tell us your scope and we will confirm the relevant services, documentation requirements, and timeline."
        primaryAction={{ label: "Request a Proposal", href: "/contact" }}
        secondaryAction={{ label: "View Services", href: "/services" }}
        variant="dark"
      />
    </>
  );
}
