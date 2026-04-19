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
    <Section variant="default" className="border-t border-border py-28 lg:py-32">

      {/* Horizontal intro block */}
      <div className="grid items-end gap-10 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20 lg:pb-16">

        {/* Left: eyebrow + heading */}
        <div>
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            {whyCadtri.eyebrow}
          </p>
          <h2
            className="font-bold text-3xl text-foreground sm:text-4xl"
            style={{ letterSpacing: "-0.025em" }}
          >
            {whyCadtri.heading}
          </h2>
        </div>

        {/* Right: subheading, bottom-aligned */}
        <div className="flex items-end">
          <p className="font-light leading-relaxed text-muted sm:text-lg">
            {whyCadtri.subheading}
          </p>
        </div>
      </div>

      {/* 2×2 differentiator grid */}
      <div className="grid gap-px border-x border-b border-border bg-border sm:grid-cols-2">
        {whyCadtri.items.map((item) => (
          <div
            key={item.number}
            className="group flex flex-col gap-5 bg-background px-8 py-10 transition-colors duration-300 hover:bg-surface"
          >
            <span
              className="select-none font-extrabold leading-none text-foreground/[0.06] transition-all duration-300 group-hover:text-foreground/[0.13]"
              style={{ fontSize: "clamp(3.5rem, 7vw, 5.5rem)" }}
              aria-hidden
            >
              {item.number}
            </span>

            <div className="flex flex-col gap-2.5">
              <h3
                className="text-sm font-semibold uppercase text-foreground transition-colors duration-200 group-hover:text-secondary"
                style={{ letterSpacing: "0.06em" }}
              >
                {item.title}
              </h3>
              <p className="text-sm font-light leading-relaxed text-muted transition-colors duration-200 group-hover:text-foreground/70">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

    </Section>
  );
}
