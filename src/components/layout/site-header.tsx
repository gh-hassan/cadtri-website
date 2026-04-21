"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks, servicesMegaMenu } from "@/content/navigation";
import { Button } from "@/components/shared/button";
import { CadtriLogo } from "@/components/shared/logo";

// ─── Constants ──────────────────────────────────────────────────────────────

const HEADER_H    = 73;  // h-[72px] + 1px border-b
const PILL_INSET  = "calc(50% - 420px)"; // 840px pill — fits nav + Request Proposal button

// ─── Component ──────────────────────────────────────────────────────────────

export function SiteHeader() {
  const [mobileOpen, setMobileOpen]         = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown]     = useState<string | null>(null);
  const [scrolled, setScrolled]             = useState(false);
  const [isDesktop, setIsDesktop]           = useState(false);
  const navRef    = useRef<HTMLDivElement>(null);
  const menuRef   = useRef<HTMLDivElement>(null);
  const pathname  = usePathname();

  // Pill mode = scrolled on desktop only
  const showPill = scrolled && isDesktop;

  // ── Side-effects ────────────────────────────────────────────────────────

  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
    setOpenDropdown(null);
    setScrolled(window.scrollY > 60);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    const onResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      if (desktop) setMobileOpen(false);
    };
    onResize();
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpenDropdown(null); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Close dropdown when clicking outside the nav
  useEffect(() => {
    const onClickOutside = (e: globalThis.MouseEvent) => {
      const target = e.target as Node;
      const inNav  = navRef.current?.contains(target);
      const inMenu = menuRef.current?.contains(target);
      if (!inNav && !inMenu) setOpenDropdown(null);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  // ── Dropdown click toggle ────────────────────────────────────────────────

  const toggleDropdown = useCallback((label: string, e: MouseEvent) => {
    e.preventDefault();
    setOpenDropdown((cur) => (cur === label ? null : label));
  }, []);

  // ── Helpers ─────────────────────────────────────────────────────────────

  const isActive = (link: { href: string; activePath?: string }) => {
    const path = link.activePath ?? link.href;
    return path === "/" ? pathname === "/" : pathname.startsWith(path);
  };

  const toggleMobileGroup = (href: string) =>
    setMobileExpanded((cur) => (cur === href ? null : href));

  // ── Dynamic Island styles ───────────────────────────────────────────────
  // clip-path morphs the full-width header bar into a centered floating pill.
  // filter:drop-shadow() is used instead of box-shadow because box-shadow is
  // clipped by clip-path; drop-shadow applies after the clip.

  const headerStyle: React.CSSProperties = {
    clipPath: showPill
      ? `inset(8px ${PILL_INSET} 8px ${PILL_INSET} round 9999px)`
      : "inset(0px 0% 0px 0% round 0px)",
    filter: showPill
      ? "drop-shadow(0 8px 40px rgba(0,0,0,0.55))"
      : "none",
    backgroundColor: showPill
      ? "rgba(22, 22, 22, 0.82)"
      : scrolled ? "#1a1a1a" : "#222222",
    backdropFilter: showPill ? "blur(20px)" : "none",
    transition: showPill
      ? [
          "clip-path 620ms cubic-bezier(0.16,1,0.3,1)",
          "filter 500ms cubic-bezier(0.16,1,0.3,1)",
          "background-color 400ms cubic-bezier(0.16,1,0.3,1)",
          "backdrop-filter 400ms cubic-bezier(0.16,1,0.3,1)",
        ].join(", ")
      : [
          "clip-path 420ms cubic-bezier(0.16,1,0.3,1)",
          "filter 280ms cubic-bezier(0.16,1,0.3,1)",
          "background-color 400ms cubic-bezier(0.16,1,0.3,1)",
          "backdrop-filter 280ms cubic-bezier(0.16,1,0.3,1)",
        ].join(", "),
  };

  // Fade logo and CTAs out when pill is active, in when returning
  const sideStyle = (delay = 0): React.CSSProperties => ({
    opacity: showPill ? 0 : 1,
    pointerEvents: showPill ? "none" : "auto",
    transition: showPill
      ? `opacity 120ms ease ${delay}ms`
      : `opacity 350ms cubic-bezier(0.16,1,0.3,1) ${delay + 180}ms`,
  });

  // ── Render ──────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── Sticky header bar ──────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 h-[72px]">
        {/*
          The pill background is a separate absolute layer so clip-path never
          clips the dropdown menus — those live in the sibling content layer.
        */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0",
            scrolled ? "border-b border-white/[0.08]" : "border-b border-transparent",
          )}
          style={headerStyle}
          aria-hidden
        />

        {/* Content layer — not clipped, dropdowns overflow freely */}
        <div className="relative mx-auto grid h-[72px] max-w-container grid-cols-[1fr_auto_1fr] items-center px-6">

          {/* ── Col 1: Wordmark — min-w-0 prevents this from inflating the 1fr track */}
          <div className="min-w-0" style={sideStyle(0)}>
            <CadtriLogo variant="dark" className="shrink-0" />
          </div>

          {/* ── Col 2: Desktop nav + pill-mode CTA (all centered as a unit) ── */}
          <div ref={navRef} className="hidden items-center lg:flex" aria-label="Primary navigation" role="navigation">
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative flex h-[72px] items-center"
              >
                <Link
                  href={link.href}
                  onClick={link.children ? (e) => toggleDropdown(link.label, e) : undefined}
                  className={cn(
                    "flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.12em]",
                    "transition-colors duration-200",
                    isActive(link) ? "text-white" : "text-white/50 hover:text-white",
                  )}
                  aria-haspopup={link.children ? "true" : undefined}
                  aria-expanded={link.children ? openDropdown === link.label : undefined}
                >
                  {link.label}
                  {link.children && (
                    <ChevronDown
                      size={10}
                      strokeWidth={2.5}
                      className={cn(
                        "mt-px transition-transform duration-200",
                        openDropdown === link.label && "rotate-180",
                      )}
                      aria-hidden
                    />
                  )}
                </Link>

                {isActive(link) && !showPill && (
                  <span
                    className="pointer-events-none absolute bottom-0 left-0 right-0 h-0.5 bg-secondary"
                    aria-hidden
                  />
                )}

                {/* ── Compact dropdown (non-Services) ──────────────────── */}
                {link.children && link.label !== "Services" && openDropdown === link.label && (
                  <div
                    className="absolute left-0 top-full z-50 min-w-[180px] border border-border bg-background shadow-[0_8px_24px_-4px_rgb(34_34_34/0.10)]"
                  >
                    <ul role="list" className="py-1.5">
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={cn(
                              "block px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.1em]",
                              "transition-colors duration-150",
                              pathname.startsWith(child.href)
                                ? "text-secondary"
                                : "text-muted hover:text-foreground hover:bg-surface",
                            )}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </nav>

            {/* Pill-mode Request Proposal — collapses to zero width when not active */}
            <div
              style={{
                maxWidth: showPill ? "240px" : "0px",
                overflow: "hidden",
                opacity: showPill ? 1 : 0,
                pointerEvents: showPill ? "auto" : "none",
                transition: showPill
                  ? "max-width 500ms cubic-bezier(0.16,1,0.3,1), opacity 350ms cubic-bezier(0.16,1,0.3,1) 200ms"
                  : "max-width 320ms cubic-bezier(0.16,1,0.3,1), opacity 100ms ease",
              }}
            >
              <div className="flex items-center gap-3 pl-3">
                <div className="h-4 w-px shrink-0 bg-white/20" aria-hidden />
                <Button href="/contact" variant="secondary" size="sm" className="shrink-0 rounded-full">
                  Request Proposal
                </Button>
              </div>
            </div>
          </div>

          {/* ── Col 3: CTAs + hamburger — min-w-0 keeps 1fr tracks equal */}
          <div className="flex min-w-0 items-center justify-end">

            {/* Desktop CTAs — full set fades out in pill mode */}
            <div
              className="hidden items-center gap-5 lg:flex"
              style={sideStyle(30)}
            >
              <Link
                href="/portal"
                className={cn(
                  "text-[11px] font-medium uppercase tracking-[0.12em] transition-colors duration-200",
                  isActive({ href: "/portal" }) ? "text-white" : "text-white/50 hover:text-white",
                )}
              >
                Portal
              </Link>
              <div className="h-4 w-px bg-white/20" aria-hidden />
              <Button href="/contact" variant="secondary" size="sm">
                Request Proposal
              </Button>
            </div>


            {/* Mobile hamburger — always visible on mobile (pill never shows on mobile) */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="flex items-center justify-center p-1 text-white transition-opacity duration-200 hover:opacity-50 lg:hidden"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>

        </div>
      </header>

      {/* ── Mega menu panel (Services only) ─────────────────────────────────
          Fixed below the sticky header. Expo-out easing for silky entrance,
          faster exit. Columns stagger in with individual delays.
      ───────────────────────────────────────────────────────────────────── */}
      {openDropdown === "Services" && (
        <div
          ref={menuRef}
          style={{ top: HEADER_H }}
          className="mega-panel-enter fixed inset-x-0 z-40 hidden border-b border-border bg-background lg:block"
          role="region"
          aria-label="Services mega menu"
        >
          <div className="absolute inset-0 shadow-[0_16px_40px_-8px_rgb(34_34_34/0.12)]" aria-hidden />

          <div className="relative mx-auto max-w-container px-6 pt-7 pb-0">

            {/* ── 5 category columns ───────────────────────────────────── */}
            <div className="grid grid-cols-5 divide-x divide-border">
              {servicesMegaMenu.map((cat, i) => (
                <div
                  key={cat.heading}
                  className="mega-col-enter px-6 pb-7 first:pl-0"
                  style={{ animationDelay: `${i * 35}ms` }}
                >
                  <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-secondary">
                    {cat.heading}
                  </p>

                  <ul className="space-y-0.5" role="list">
                    {cat.services.map((svc) => {
                      const active = pathname.startsWith(svc.href);
                      return (
                        <li key={svc.href}>
                          <Link
                            href={svc.href}
                            className={cn(
                              "group flex flex-col gap-0.5 py-2.5 pl-3 pr-2",
                              "border-l-2 transition-colors duration-150",
                              active
                                ? "border-secondary bg-surface"
                                : "border-transparent hover:border-secondary hover:bg-surface",
                            )}
                          >
                            <span className={cn(
                              "text-[12px] font-semibold leading-tight transition-colors duration-150",
                              active ? "text-secondary" : "text-foreground group-hover:text-secondary",
                            )}>
                              {svc.label}
                            </span>
                            <span className="text-[11px] font-light leading-snug text-muted">
                              {svc.description}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            {/* ── Footer action strip ──────────────────────────────────── */}
            <div className="flex items-center justify-between border-t border-border py-4">
              <Link
                href="/services"
                className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-muted transition-colors duration-150 hover:text-foreground"
              >
                View all 42 services
                <ArrowRight size={11} strokeWidth={2} aria-hidden />
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-secondary transition-colors duration-150 hover:text-foreground"
              >
                Request a Proposal
                <ArrowRight size={11} strokeWidth={2.5} aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── Mobile navigation panel ──────────────────────────────────────── */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-label="Mobile navigation"
        aria-modal="true"
        aria-hidden={!mobileOpen}
        style={{ top: HEADER_H }}
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 flex flex-col bg-background lg:hidden",
          "transition-[opacity,visibility] duration-300",
          mobileOpen ? "visible opacity-100" : "invisible pointer-events-none opacity-0",
        )}
      >
        <nav className="flex-1 overflow-y-auto" aria-label="Mobile navigation">
          <ul role="list">
            {navLinks.map((link) => (
              <li key={link.label} className="border-b border-border">
                <div className="flex items-stretch">
                  <Link
                    href={link.href}
                    className={cn(
                      "flex-1 px-6 py-5 text-sm font-semibold uppercase tracking-[0.1em]",
                      "transition-colors duration-150",
                      isActive(link) ? "text-foreground" : "text-muted hover:text-foreground",
                    )}
                  >
                    {link.label}
                  </Link>

                  {link.children && (
                    <button
                      type="button"
                      onClick={() => toggleMobileGroup(link.href)}
                      className="flex items-center px-6 text-muted transition-colors duration-150 hover:text-foreground"
                      aria-label={`${mobileExpanded === link.href ? "Collapse" : "Expand"} ${link.label}`}
                      aria-expanded={mobileExpanded === link.href}
                    >
                      <ChevronDown
                        size={14}
                        strokeWidth={2}
                        className={cn(
                          "transition-transform duration-200",
                          mobileExpanded === link.href && "rotate-180",
                        )}
                      />
                    </button>
                  )}
                </div>

                {link.children && mobileExpanded === link.href && (
                  <div className="bg-surface pb-4 pt-2">
                    {link.label === "Services" ? (
                      servicesMegaMenu.map((cat) => (
                        <div key={cat.heading} className="px-6 pt-4">
                          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-secondary">
                            {cat.heading}
                          </p>
                          <ul role="list">
                            {cat.services.map((svc) => (
                              <li key={svc.href}>
                                <Link
                                  href={svc.href}
                                  className={cn(
                                    "block py-2 text-xs font-medium uppercase tracking-[0.08em]",
                                    "transition-colors duration-150",
                                    pathname.startsWith(svc.href)
                                      ? "text-secondary"
                                      : "text-muted hover:text-foreground",
                                  )}
                                >
                                  {svc.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))
                    ) : (
                      <ul role="list" className="px-6 pt-2">
                        {link.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className={cn(
                                "block py-2.5 text-xs font-medium uppercase tracking-[0.08em]",
                                "transition-colors duration-150",
                                pathname.startsWith(child.href)
                                  ? "text-secondary"
                                  : "text-muted hover:text-foreground",
                              )}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-border bg-surface px-6 py-8">
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-widest text-muted">
            Ready to start your project?
          </p>
          <Button href="/contact" variant="primary" size="md" className="w-full">
            Request Proposal
          </Button>
          <Link
            href="/portal"
            className="mt-5 block text-center text-xs font-medium uppercase tracking-[0.12em] text-muted transition-colors duration-200 hover:text-foreground"
          >
            Client Portal
          </Link>
        </div>
      </div>
    </>
  );
}
