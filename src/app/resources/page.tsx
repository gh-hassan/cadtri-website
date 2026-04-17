import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { CtaBand } from "@/components/shared/cta-band";
import { getAllPosts, formatDate } from "@/lib/posts";
import { BreadcrumbJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Practical guides on California and Texas permit requirements, documentation standards, plan check processes, and what to expect at every stage of a construction project.",
};

export default function ResourcesPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Resources", href: "/resources" },
        ]}
      />

      <PageHeader
        eyebrow="Resources"
        heading="Permit and documentation guides."
        description="Practical reference material on the California and Texas permit process, documentation requirements, and what to expect at every stage of a construction project."
      />

      <Section variant="default">
        {posts.length === 0 ? (
          <p className="font-light text-muted">No articles published yet.</p>
        ) : (
          <>
            {/* Featured article */}
            {featured && (
              <div className="mb-14 border-b border-border pb-14">
                <Link
                  href={`/resources/${featured.slug}`}
                  className="group block"
                >
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <span className="text-[10px] font-medium uppercase tracking-widest text-secondary">
                      {featured.category}
                    </span>
                    <span className="text-[10px] text-muted/40" aria-hidden>·</span>
                    <span className="text-[10px] font-light text-muted">
                      {featured.readingTime}
                    </span>
                    <span className="text-[10px] text-muted/40" aria-hidden>·</span>
                    <span className="text-[10px] font-light text-muted">
                      {formatDate(featured.date)}
                    </span>
                  </div>
                  <h2
                    className="mb-4 max-w-3xl font-bold text-3xl text-foreground transition-colors group-hover:text-secondary sm:text-4xl"
                    style={{ letterSpacing: "-0.025em" }}
                  >
                    {featured.title}
                  </h2>
                  <p className="max-w-2xl font-light leading-relaxed text-muted">
                    {featured.description}
                  </p>
                  <span className="mt-5 inline-block text-[11px] font-medium uppercase tracking-widest text-secondary">
                    Read Article →
                  </span>
                </Link>
              </div>
            )}

            {/* Remaining articles */}
            {rest.length > 0 && (
              <ul className="divide-y divide-border border border-border" role="list">
                {rest.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/resources/${post.slug}`}
                      className="group flex items-start gap-6 px-7 py-7 transition-colors duration-200 hover:bg-surface lg:px-9"
                    >
                      <div className="flex-1">
                        <div className="mb-2 flex flex-wrap items-center gap-3">
                          <span className="text-[10px] font-medium uppercase tracking-widest text-secondary">
                            {post.category}
                          </span>
                          <span className="text-[10px] text-muted/40" aria-hidden>·</span>
                          <span className="text-[10px] font-light text-muted">
                            {post.readingTime}
                          </span>
                        </div>
                        <p
                          className="font-bold text-base text-foreground transition-colors group-hover:text-secondary"
                          style={{ letterSpacing: "-0.01em" }}
                        >
                          {post.title}
                        </p>
                        <p className="mt-1 text-sm font-light text-muted line-clamp-2">
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
