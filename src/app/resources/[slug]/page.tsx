import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { mdxComponents } from "@/components/shared/mdx-components";
import { getAllPosts, getPostBySlug, formatDate } from "@/lib/posts";
import { BreadcrumbJsonLd } from "@/lib/json-ld";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article Not Found" };
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function ResourceArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Resources", href: "/resources" },
          { name: post.title, href: `/resources/${slug}` },
        ]}
      />

      {/* Article header */}
      <div className="bg-primary px-6 pb-20 pt-16">
        <div className="container mx-auto max-w-container">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <Link
              href="/resources"
              className="text-[10px] font-medium uppercase tracking-widest text-white/40 hover:text-secondary"
            >
              Resources
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
            <span className="text-[11px] font-light text-white/40">
              {formatDate(post.date)}
            </span>
            <span className="text-white/20" aria-hidden>·</span>
            <span className="text-[11px] font-light text-white/40">
              {post.readingTime}
            </span>
          </div>
        </div>
      </div>

      {/* Article body */}
      <Section variant="default">
        <div className="grid gap-16 lg:grid-cols-[1fr_280px] lg:gap-20">

          {/* Main content */}
          <article className="max-w-prose">
            <MDXRemote source={post.content} components={mdxComponents} />
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 flex flex-col gap-8">

              {/* About CADTRI */}
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

              {/* Book a call */}
              <div className="bg-primary p-6">
                <p className="mb-3 text-[10px] font-medium uppercase tracking-widest text-secondary">
                  Free Consultation
                </p>
                <p className="text-sm font-light leading-relaxed text-white/60">
                  15 minutes. Confirm scope, timeline, and what the jurisdiction requires.
                </p>
                <Link
                  href="/book"
                  className="mt-4 inline-block text-[11px] font-medium uppercase tracking-wider text-secondary hover:text-primary-foreground"
                >
                  Book a Call →
                </Link>
              </div>

            </div>
          </aside>
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
