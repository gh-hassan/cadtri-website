import type { MDXComponents } from "mdx/types";
import Link from "next/link";

// Custom MDX components — styles prose content to match the CADTRI design system.
// Outfit typeface throughout, matching the brand's typographic hierarchy.

export const mdxComponents: MDXComponents = {
  h2: ({ children }) => (
    <h2
      className="mb-5 mt-14 font-bold text-2xl text-foreground first:mt-0"
      style={{ letterSpacing: "-0.02em" }}
    >
      {children}
    </h2>
  ),

  h3: ({ children }) => (
    <h3
      className="mb-4 mt-10 font-semibold text-lg text-foreground"
      style={{ letterSpacing: "-0.01em" }}
    >
      {children}
    </h3>
  ),

  p: ({ children }) => (
    <p className="mb-6 font-light leading-relaxed text-muted sm:text-[17px]">
      {children}
    </p>
  ),

  ul: ({ children }) => (
    <ul className="mb-6 flex flex-col gap-3 pl-0" role="list">
      {children}
    </ul>
  ),

  ol: ({ children }) => (
    <ol className="mb-6 flex flex-col gap-3 pl-0 [counter-reset:list]" role="list">
      {children}
    </ol>
  ),

  li: ({ children }) => (
    <li className="flex items-start gap-4 text-sm font-light leading-relaxed text-muted sm:text-[16px]">
      <span>{children}</span>
    </li>
  ),

  blockquote: ({ children }) => (
    <blockquote className="my-8 border-l-2 border-secondary pl-6">
      <div className="font-light italic leading-relaxed text-foreground sm:text-lg">
        {children}
      </div>
    </blockquote>
  ),

  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),

  a: ({ href, children }) => {
    const isInternal = href?.startsWith("/");
    if (isInternal && href) {
      return (
        <Link
          href={href}
          className="font-medium text-secondary underline underline-offset-2 hover:text-foreground"
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-secondary underline underline-offset-2 hover:text-foreground"
      >
        {children}
      </a>
    );
  },

  hr: () => <hr className="my-12 border-border" />,
};
