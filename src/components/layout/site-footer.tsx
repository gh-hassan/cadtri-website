import Link from "next/link";
import { company } from "@/content/company";
import { Button } from "@/components/shared/button";
import { CadtriLogo } from "@/components/shared/logo";

// ─── Constants ──────────────────────────────────────────────────────────────

const navLinks = [
  { label: "About",     href: "/about"     },
  { label: "Services",  href: "/services"  },
  { label: "Process",   href: "/process"   },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact",   href: "/contact"   },
] as const;

const legalLinks = [
  { label: "Privacy Policy",   href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms"          },
  { label: "Cookie Policy",    href: "/cookie-policy"  },
] as const;

// ─── Component ──────────────────────────────────────────────────────────────

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary" aria-label="Site footer">
      <div className="mx-auto max-w-container px-6">

        {/* ── Main row ────────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-10 border-b border-white/10 py-14 lg:flex-row lg:items-center lg:justify-between">

          {/* Brand */}
          <div className="shrink-0">
            <CadtriLogo variant="dark" />
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-widest text-secondary">
              {company.tagline}
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul role="list" className="flex flex-wrap items-center gap-x-8 gap-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/50 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA */}
          <div className="flex shrink-0 items-center gap-5">
            {company.email && (
              <a
                href={`mailto:${company.email}`}
                className="hidden text-sm text-white/40 transition-colors duration-200 hover:text-white xl:block"
              >
                {company.email}
              </a>
            )}
            <div className="hidden h-4 w-px bg-white/15 xl:block" aria-hidden />
            <Button href="/contact" variant="secondary" size="sm">
              Request Proposal
            </Button>
          </div>
        </div>

        {/* ── Bottom bar ──────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/25">
            &copy; {currentYear} {company.legalName}. All rights reserved.
          </p>
          <ul role="list" className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-xs text-white/25 transition-colors duration-200 hover:text-white/60"
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
