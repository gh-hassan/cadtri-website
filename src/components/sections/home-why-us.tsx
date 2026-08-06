import { Section } from "@/components/shared/section";
import { whyCadtri } from "@/content/homepage";

/**
 * "Why CADTRI" differentiator section — cream background.
 *
 * Horizontal split intro: heading left, subheading right (bottom-aligned),
 * separated from the grid below by a thin warm rule.
 *
 * Large editorial numbers use Outfit ExtraBold (800) at very low opacity —
 * geometric numerals at this weight have strong form even nearly invisible.
 * The number functions as typographic texture, not navigational content.
 *
 * Extra vertical space (py-28 lg:py-32) gives the editorial numbers room
 * to breathe and separates this section tonally from the denser sections.
 */
export function HomeWhyUs() {
  return (
    <Section variant="default" className="border-t border-border py-28 lg:py-32 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute -left-40 -bottom-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Horizontal intro block */}
      <div className="grid items-end gap-10 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20 lg:pb-16 relative animate-slide-up">

        {/* Left: eyebrow + heading */}
        <div>
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <span className="inline-block w-4 h-px bg-secondary" />
            {whyCadtri.eyebrow}
          </p>
          <h2
            className="font-bold text-3xl text-foreground sm:text-4xl animate-slide-up"
            style={{ letterSpacing: "-0.025em", animationDelay: "0.2s" }}
          >
            {whyCadtri.heading}
          </h2>
        </div>

        {/* Right: subheading, bottom-aligned */}
        <div className="flex items-end animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <p className="font-light leading-relaxed text-muted sm:text-lg">
            {whyCadtri.subheading}
          </p>
        </div>
      </div>

      {/* 2×2 differentiator grid */}
      <div className="grid gap-px border-x border-b border-border bg-border sm:grid-cols-2 relative">
        {whyCadtri.items.map((item, idx) => (
          <div
            key={item.number}
            className="group relative flex flex-col gap-5 bg-background px-8 py-10 transition-all duration-300 hover:bg-surface hover:shadow-lg hover:-translate-y-1 cursor-default animate-scale-in"
            style={{ animationDelay: `${0.4 + idx * 0.1}s` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/0 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <span
              className="select-none font-extrabold leading-none text-foreground/[0.06] transition-all duration-300 group-hover:text-foreground/[0.15] group-hover:scale-110 relative"
              style={{ fontSize: "clamp(3.5rem, 7vw, 5.5rem)" }}
              aria-hidden
            >
              {item.number}
            </span>

            <div className="flex flex-col gap-2.5 relative">
              <h3
                className="text-sm font-semibold uppercase text-foreground transition-colors duration-300 group-hover:text-secondary"
                style={{ letterSpacing: "0.06em" }}
              >
                {item.title}
              </h3>
              <p className="text-sm font-light leading-relaxed text-muted transition-colors duration-300 group-hover:text-foreground/80">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

    </Section>
  );
}
