import Link from "next/link";
import { company } from "@/content/company";
import { footerColumns } from "@/content/navigation";
import { Button } from "@/components/shared/button";

// ─── Constants ──────────────────────────────────────────────────────────────

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
] as const;

// ─── Component ──────────────────────────────────────────────────────────────

/**
 * Site-wide footer.
 * Dark navy background (bg-primary) — intentional contrast to body content.
 * Four-column layout: Brand | Services | Company | Start a Project
 * Text opacity on dark backgrounds uses Tailwind's built-in `white` color
 * with the `/N` opacity modifier (CSS variables don't support this pattern).
 */
export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary" aria-label="Site footer">
      <div className="mx-auto max-w-container px-6">

        {/* ── Main content grid ──────────────────────────────────────────── */}
        <div
          className={[
            "grid grid-cols-1 gap-12 py-16",
            "sm:grid-cols-2",
            "lg:grid-cols-[2fr_1fr_1fr_1.5fr] lg:gap-10",
          ].join(" ")}
        >

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="text-sm font-bold uppercase tracking-[0.22em] text-white transition-opacity duration-base hover:opacity-60"
              aria-label={`${company.name} homepage`}
            >
              {company.name}
            </Link>

            <p className="mt-3 text-[10px] font-semibold uppercase tracking-widest text-secondary">
              {company.tagline}
            </p>

            <p className="mt-5 max-w-[280px] text-sm leading-relaxed text-white/50">
              {company.description}
            </p>
          </div>

          {/* Link columns — driven by footerColumns content data */}
          {footerColumns.map((column) => (
            <div key={column.heading}>
              <p className="mb-6 text-[10px] font-semibold uppercase tracking-widest text-white/30">
                {column.heading}
              </p>
              <ul role="list" className="flex flex-col gap-3.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/55 transition-colors duration-base hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Start a Project column */}
          <div className="lg:border-l lg:border-white/10 lg:pl-8">
            <p className="mb-6 text-[10px] font-semibold uppercase tracking-widest text-white/30">
              Start a Project
            </p>

            <p className="mb-7 text-sm leading-relaxed text-white/50">
              We handle the complete drawing and permit scope so your project
              team can stay focused on building.
            </p>

            <Button href="/contact" variant="secondary" size="sm">
              Request Proposal
            </Button>

            {company.email && (
              <a
                href={`mailto:${company.email}`}
                className="mt-5 block text-sm text-white/45 transition-colors duration-base hover:text-white"
              >
                {company.email}
              </a>
            )}
          </div>
        </div>

        {/* ── Horizontal rule ────────────────────────────────────────────── */}
        <div className="h-px bg-white/10" aria-hidden />

        {/* ── Bottom bar ──────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/30">
            &copy; {currentYear} {company.legalName}. All rights reserved.
          </p>

          <ul role="list" className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-xs text-white/30 transition-colors duration-base hover:text-white/70"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </footer>
  );
}
