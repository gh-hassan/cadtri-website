import { Check } from "lucide-react";
import { Button } from "@/components/shared/button";
import { heroContent } from "@/content/homepage";

/**
 * Homepage hero — dark charcoal background.
 *
 * Typography: Outfit weight contrast — ExtraBold headline anchors the
 * composition; Light second line creates deliberate typographic tension.
 *
 * Layout: eyebrow → heading → thin rule → description/CTAs → thin rule →
 * credentials/indicators. Three distinct registers with clear roles.
 *
 * The hero has no bottom border — the color break (charcoal to cream)
 * and the trust strip's own framing create the section boundary.
 */
export function HomeHero() {
  return (
    <section className="bg-primary">
      <div className="container mx-auto max-w-container px-6">

        {/* ── Main heading block ──────────────────────────────────────────── */}
        <div className="pb-14 pt-20 lg:pb-20 lg:pt-28">

          {/* Eyebrow */}
          <p className="mb-8 flex items-center gap-3 text-xs font-medium uppercase tracking-widest text-secondary">
            {heroContent.eyebrow}
          </p>

          {/* Display heading — Outfit weight contrast */}
          <h1
            className="leading-[1.0] text-primary-foreground
                       text-[52px] sm:text-[70px] lg:text-[88px] xl:text-[100px]"
            style={{ letterSpacing: "-0.035em" }}
          >
            <span className="block font-extrabold">
              {heroContent.heading[0]}
            </span>
            <span
              className="block font-light text-white/50"
              style={{ letterSpacing: "-0.02em" }}
            >
              {heroContent.heading[1]}
            </span>
          </h1>
        </div>

        {/* ── Thin rule ───────────────────────────────────────────────────── */}
        <div className="border-t border-white/10" />

        {/* ── Description + CTAs ──────────────────────────────────────────── */}
        <div className="grid gap-10 py-14 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-24 lg:py-16">
          <p className="max-w-lg text-lg font-light leading-relaxed text-white/55 lg:text-xl">
            {heroContent.description}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Button href={heroContent.primaryCta.href} variant="secondary" size="lg">
              {heroContent.primaryCta.label}
            </Button>
            <Button
              href={heroContent.secondaryCta.href}
              variant="ghost"
              size="lg"
              className="text-white/40 hover:text-white"
            >
              {heroContent.secondaryCta.label} →
            </Button>
          </div>
        </div>

        {/* ── Thin rule ───────────────────────────────────────────────────── */}
        <div className="border-t border-white/10" />

        {/* ── Credentials + indicators ────────────────────────────────────── */}
        <div className="grid gap-12 py-14 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-24 lg:py-16">

          {/* Two-column checklist */}
          <ul className="grid gap-y-3 sm:grid-cols-2 sm:gap-x-10">
            {heroContent.credentials.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm font-light text-white/40">
                <Check
                  size={11}
                  strokeWidth={2.5}
                  className="shrink-0 text-secondary"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>

          {/* Indicator stats — 2×2, gap-as-border */}
          <div className="grid grid-cols-2 gap-px border border-white/10 bg-white/10 lg:w-[300px]">
            {heroContent.indicators.map((item) => (
              <div key={item.label} className="flex flex-col gap-2 bg-primary px-5 py-6">
                <span
                  className="text-sm font-bold text-primary-foreground"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {item.value}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-widest text-white/30">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
      {/* No bottom border — color contrast + trust strip framing create the break */}
    </section>
  );
}
