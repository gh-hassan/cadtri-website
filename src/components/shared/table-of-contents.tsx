"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface TocItem {
  id: string;
  label: string;
}

/**
 * Sticky in-page jump nav for long-form pillar pages.
 * Sits below the 72px site header; highlights the section currently in view.
 */
export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-140px 0px -70% 0px", threshold: 0 },
    );

    const els = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <div className="sticky top-[72px] z-30 border-b border-border bg-background/95 backdrop-blur">
      <div className="container mx-auto max-w-container px-6">
        <nav
          aria-label="On this page"
          className="flex items-center gap-6 overflow-x-auto py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <span className="mr-1 shrink-0 text-[10px] font-medium uppercase tracking-widest text-muted">
            On This Page
          </span>
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                "shrink-0 whitespace-nowrap border-b-2 pb-1 text-[11px] font-medium uppercase tracking-widest transition-colors duration-150",
                activeId === item.id
                  ? "border-secondary text-secondary"
                  : "border-transparent text-muted hover:text-foreground",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
