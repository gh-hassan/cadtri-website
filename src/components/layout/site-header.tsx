"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks } from "@/content/navigation";
import { company } from "@/content/company";
import { Button } from "@/components/shared/button";

// ─── Constants ──────────────────────────────────────────────────────────────

/** Must match the header's h-[72px] + 1px border-b */
const HEADER_OFFSET = 73;

// ─── Component ──────────────────────────────────────────────────────────────

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = usePathname();

  // Close mobile menu on navigation
  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Auto-close at desktop breakpoint
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isActive = (link: { href: string; activePath?: string }) => {
    const path = link.activePath ?? link.href;
    return path === "/" ? pathname === "/" : pathname.startsWith(path);
  };

  const toggleMobileGroup = (href: string) =>
    setMobileExpanded((current) => (current === href ? null : href));

  return (
    <>
      {/* ── Header bar ───────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-border bg-background">
        <div className="mx-auto flex h-[72px] max-w-container items-center justify-between px-6">

          {/* Wordmark */}
          <Link
            href="/"
            className={cn(
              "shrink-0 text-sm font-bold uppercase tracking-[0.22em] text-foreground",
              "transition-opacity duration-base hover:opacity-50",
            )}
            aria-label={`${company.name} homepage`}
          >
            {company.name}
          </Link>

          {/* ── Desktop navigation ───────────────────────────────────────── */}
          <nav
            className="hidden items-center gap-8 lg:flex"
            aria-label="Primary navigation"
          >
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="group relative flex h-[72px] items-center"
              >
                {/* Nav link — also acts as dropdown trigger on hover */}
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.12em]",
                    "transition-colors duration-base",
                    isActive(link)
                      ? "text-foreground"
                      : "text-muted hover:text-foreground",
                  )}
                >
                  {link.label}
                  {link.children && (
                    <ChevronDown
                      size={10}
                      strokeWidth={2.5}
                      className="mt-px transition-transform duration-base group-hover:rotate-180"
                      aria-hidden
                    />
                  )}
                </Link>

                {/* Active indicator — burnt orange underline on active links */}
                {isActive(link) && (
                  <span
                    className="pointer-events-none absolute bottom-0 left-0 right-0 h-0.5 bg-secondary"
                    aria-hidden
                  />
                )}

                {/* Dropdown panel */}
                {link.children && (
                  <div
                    className={cn(
                      "absolute left-0 top-full z-50 pt-3",
                      // Hidden by default; revealed on hover or keyboard focus-within
                      "invisible translate-y-2 opacity-0",
                      "group-hover:visible group-hover:translate-y-0 group-hover:opacity-100",
                      "group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100",
                      "transition-all duration-base",
                    )}
                    role="menu"
                    aria-label={`${link.label} submenu`}
                  >
                    <div className="min-w-[240px] border border-border bg-background shadow-md">
                      {link.children.map((child, index) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          role="menuitem"
                          className={cn(
                            "block px-6 py-3.5",
                            "text-[11px] font-medium uppercase tracking-[0.1em] text-muted",
                            "transition-colors duration-fast hover:bg-surface hover:text-foreground",
                            index < link.children!.length - 1 &&
                              "border-b border-border/60",
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* ── Desktop CTAs ─────────────────────────────────────────────── */}
          <div className="hidden items-center gap-5 lg:flex">
            {/* Structural separator */}
            <div className="h-4 w-px bg-border" aria-hidden />

            <Link
              href="/contact"
              className={cn(
                "text-[11px] font-medium uppercase tracking-[0.12em]",
                "transition-colors duration-base",
                isActive({ href: "/contact" })
                  ? "text-foreground"
                  : "text-muted hover:text-foreground",
              )}
            >
              Contact
            </Link>

            <Button href="/contact" variant="secondary" size="sm">
              Request Proposal
            </Button>
          </div>

          {/* ── Mobile toggle ─────────────────────────────────────────────── */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className={cn(
              "flex items-center justify-center p-1 text-foreground",
              "transition-opacity duration-base hover:opacity-50",
              "lg:hidden",
            )}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? (
              <X size={20} strokeWidth={1.5} />
            ) : (
              <Menu size={20} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </header>

      {/* ── Mobile navigation panel ──────────────────────────────────────────
          Fixed below the sticky header; body scroll is locked while open.
      ─────────────────────────────────────────────────────────────────────── */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-label="Mobile navigation"
        aria-modal="true"
        aria-hidden={!mobileOpen}
        style={{ top: HEADER_OFFSET }}
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 flex flex-col bg-background",
          "transition-[opacity,visibility] duration-slow lg:hidden",
          mobileOpen
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0",
        )}
      >
        {/* Scrollable link list */}
        <nav className="flex-1 overflow-y-auto" aria-label="Mobile navigation">
          <ul role="list">
            {navLinks.map((link) => (
              <li key={link.label} className="border-b border-border">
                {/* Row: link + optional expand toggle */}
                <div className="flex items-stretch">
                  <Link
                    href={link.href}
                    className={cn(
                      "flex-1 px-6 py-5 text-sm font-semibold uppercase tracking-[0.1em]",
                      "transition-colors duration-fast",
                      isActive(link)
                        ? "text-foreground"
                        : "text-muted hover:text-foreground",
                    )}
                  >
                    {link.label}
                  </Link>

                  {link.children && (
                    <button
                      type="button"
                      onClick={() => toggleMobileGroup(link.href)}
                      className={cn(
                        "flex items-center px-6 text-muted",
                        "transition-colors duration-fast hover:text-foreground",
                      )}
                      aria-label={`${mobileExpanded === link.href ? "Collapse" : "Expand"} ${link.label}`}
                      aria-expanded={mobileExpanded === link.href}
                    >
                      <ChevronDown
                        size={14}
                        strokeWidth={2}
                        className={cn(
                          "transition-transform duration-base",
                          mobileExpanded === link.href && "rotate-180",
                        )}
                      />
                    </button>
                  )}
                </div>

                {/* Accordion sub-links */}
                {link.children && mobileExpanded === link.href && (
                  <ul role="list" className="bg-surface pb-3 pt-1">
                    {link.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className={cn(
                            "block px-8 py-3 text-xs font-medium uppercase tracking-[0.1em]",
                            "transition-colors duration-fast",
                            isActive(child)
                              ? "text-foreground"
                              : "text-muted hover:text-foreground",
                          )}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA area — anchored to the bottom of the panel */}
        <div className="border-t border-border bg-surface px-6 py-8">
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-widest text-muted">
            Ready to start your project?
          </p>
          <Button href="/contact" variant="primary" size="md" className="w-full">
            Request Proposal
          </Button>
          <Link
            href="/contact"
            className={cn(
              "mt-5 block text-center text-xs font-medium uppercase tracking-[0.12em]",
              "transition-colors duration-base",
              "text-muted hover:text-foreground",
            )}
          >
            Contact us directly
          </Link>
        </div>
      </div>
    </>
  );
}
