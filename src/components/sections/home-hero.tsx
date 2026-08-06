import { Check } from "lucide-react";
import { Button } from "@/components/shared/button";
import { heroContent } from "@/content/homepage";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-primary">
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-secondary/20 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/10 blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative container mx-auto max-w-container px-6">

        {/* ── Main heading block ──────────────────────────────────────────── */}
        <div className="pb-14 pt-20 lg:pb-20 lg:pt-28 animate-fade-in">

          {/* Eyebrow with animation */}
          <p className="mb-8 flex items-center gap-3 text-xs font-medium uppercase tracking-widest text-secondary animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <span className="inline-block w-6 h-px bg-secondary" />
            {heroContent.eyebrow}
          </p>

          {/* Display heading with staggered animation */}
          <h1
            className="leading-[1.0] text-primary-foreground
                       text-[52px] sm:text-[70px] lg:text-[88px] xl:text-[100px]"
            style={{ letterSpacing: "-0.035em" }}
          >
            <span className="block font-extrabold animate-slide-up" style={{ animationDelay: "0.2s" }}>
              {heroContent.heading[0]}
            </span>
            <span
              className="block font-light text-white/50 animate-slide-up"
              style={{ letterSpacing: "-0.02em", animationDelay: "0.3s" }}
            >
              {heroContent.heading[1]}
            </span>
          </h1>
        </div>

        {/* ── Description + CTAs ──────────────────────────────────────────── */}
        <div className="grid gap-10 py-14 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-24 lg:py-16 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <p className="max-w-lg text-lg font-light leading-relaxed text-white/55 lg:text-xl">
            {heroContent.description}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Button
              href="/pricing"
              variant="secondary"
              size="lg"
              className="shadow-lg shadow-secondary/25 hover:shadow-secondary/40 transition-all duration-300 hover:scale-105"
            >
              Get a Pricing Estimate
            </Button>
            <Button
              href={heroContent.secondaryCta.href}
              variant="ghost"
              size="lg"
              className="text-white/40 hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              {heroContent.secondaryCta.label} →
            </Button>
          </div>
        </div>

        {/* ── Thin rule with gradient ───────────────────────────────────────── */}
        <div className="border-t border-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* ── Credentials + indicators ────────────────────────────────────── */}
        <div className="grid gap-12 py-14 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-24 lg:py-16 animate-slide-up" style={{ animationDelay: "0.5s" }}>

          {/* Two-column checklist with enhanced interactivity */}
          <ul className="grid gap-y-4 sm:grid-cols-2 sm:gap-x-10">
            {heroContent.credentials.map((item, idx) => (
              <li
                key={item}
                className="group flex cursor-default items-center gap-3 text-sm font-light text-white/40 transition-all duration-300 hover:text-white/80 hover:translate-x-1"
                style={{ animationDelay: `${0.6 + idx * 0.08}s` }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-secondary/20 rounded-full blur-sm group-hover:bg-secondary/40 transition-colors duration-300" />
                  <Check
                    size={12}
                    strokeWidth={2.5}
                    className="shrink-0 text-secondary relative transition-transform duration-300 group-hover:scale-150"
                    aria-hidden
                  />
                </div>
                {item}
              </li>
            ))}
          </ul>

          {/* Indicator stats — enhanced with gradient and better interactivity */}
          <div className="grid grid-cols-2 gap-px border border-white/10 bg-gradient-to-br from-white/5 to-white/0 lg:w-[300px] rounded-lg overflow-hidden">
            {heroContent.indicators.map((item, idx) => (
              <div
                key={item.label}
                className="group relative flex flex-col gap-2 bg-primary px-5 py-6 transition-all duration-300 hover:bg-white/[0.08] cursor-pointer border border-transparent hover:border-secondary/30"
                style={{ animationDelay: `${0.6 + idx * 0.08}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/0 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span
                  className="text-sm font-bold text-primary-foreground transition-colors duration-300 group-hover:text-secondary relative"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {item.value}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-widest text-white/30 transition-colors duration-300 group-hover:text-white/60 relative">
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
