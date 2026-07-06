import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { getBlogPostBySlug, formatDate } from "@/lib/posts";
import { BreadcrumbJsonLd, ArticleJsonLd } from "@/lib/json-ld";
import { company } from "@/content/company";

interface Props {
  params: Promise<{ slug: string }>;
}

// Blog posts are published from the admin portal at runtime.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: { absolute: post.metaTitle ?? `${post.title} | CADTRI Blog` },
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: post.title, href: `/blog/${slug}` },
        ]}
      />
      <ArticleJsonLd
        title={post.title}
        description={post.description}
        url={`${company.website}/blog/${slug}`}
        datePublished={post.date}
        dateModified={post.dateModified}
        category={post.category}
        image={post.image}
      />

      {/* Article header */}
      <div className="bg-primary px-6 pb-20 pt-16">
        <div className="container mx-auto max-w-container">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <Link
              href="/blog"
              className="text-[10px] font-medium uppercase tracking-widest text-white/40 hover:text-secondary"
            >
              Blog
            </Link>
            <span className="text-[10px] text-white/20" aria-hidden>/</span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-secondary">
              {post.category}
            </span>
          </div>

          <h1
            className="mb-6 max-w-3xl font-bold text-3xl text-primary-foreground sm:text-4xl lg:text-5xl"
            style={{ letterSpacing: "-0.03em", lineHeight: 1.08 }}
          >
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4">
            <span className="text-[11px] font-light text-white/40">{formatDate(post.date)}</span>
            <span className="text-white/20" aria-hidden>·</span>
            <span className="text-[11px] font-light text-white/40">{post.readingTime}</span>
          </div>
        </div>
      </div>

      {/* Featured image */}
      {post.image && (
        <div className="bg-primary px-6 pb-0">
          <div className="container mx-auto max-w-container">
            <div className="relative -mb-16 aspect-[16/8] w-full overflow-hidden border border-border bg-surface">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image}
                alt={post.imageAlt || post.title}
                title={post.imageTitle || undefined}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      )}

      {/* Article body */}
      <Section variant="default">
        <div className={post.image ? "pt-16" : ""}>
          <div className="grid gap-16 lg:grid-cols-[1fr_280px] lg:gap-20">
            <article className="max-w-prose">
              <div
                className="prose-cadtri"
                dangerouslySetInnerHTML={{ __html: post.contentHtml ?? "" }}
              />
            </article>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 flex flex-col gap-8">
                <div className="border border-border p-6">
                  <p className="mb-3 text-[10px] font-medium uppercase tracking-widest text-secondary">
                    About CADTRI
                  </p>
                  <p className="text-sm font-light leading-relaxed text-muted">
                    CADTRI delivers complete, permit-ready architectural drawing
                    packages for residential and commercial projects.
                  </p>
                  <Link
                    href="/contact"
                    className="mt-4 inline-block text-[11px] font-medium uppercase tracking-wider text-secondary hover:text-foreground"
                  >
                    Request a Proposal →
                  </Link>
                </div>
                <div className="bg-primary p-6">
                  <p className="mb-3 text-[10px] font-medium uppercase tracking-widest text-secondary">
                    Get in Touch
                  </p>
                  <p className="text-sm font-light leading-relaxed text-white/60">
                    Confirm scope, timeline, and what the jurisdiction requires.
                  </p>
                  <Link
                    href="/contact"
                    className="mt-4 inline-block text-[11px] font-medium uppercase tracking-wider text-secondary hover:text-primary-foreground"
                  >
                    Contact Us →
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </Section>

      <CtaBand
        heading="Ready to start your project?"
        subheading="Tell us your scope and we will confirm the relevant services, documentation requirements, and timeline. No commitment required."
        primaryAction={{ label: "Request a Proposal", href: "/contact" }}
        secondaryAction={{ label: "View Services", href: "/services" }}
        variant="dark"
      />
    </>
  );
}
