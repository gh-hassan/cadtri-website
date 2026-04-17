import { testimonials, showTestimonials } from "@/content/testimonials";

/**
 * Testimonials section — cream background, numbered quote grid.
 *
 * Set showTestimonials = true in src/content/testimonials.ts and replace
 * the placeholder entries with real client quotes before enabling.
 *
 * Design: gap-as-border grid of 3 quotes. Each cell has an oversized orange
 * opening quotation mark (typographic, not an icon), the quote body in
 * Outfit Light, and a ruled attribution line below.
 */
export function HomeTestimonials() {
  if (!showTestimonials) return null;

  return (
    <section className="border-t border-border bg-primary py-24">
      <div className="container mx-auto max-w-container px-6">

        {/* Section header */}
        <div className="mb-14 grid items-end gap-8 border-b border-white/10 pb-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Client Feedback
            </p>
            <h2
              className="font-bold text-3xl text-primary-foreground sm:text-4xl"
              style={{ letterSpacing: "-0.025em" }}
            >
              What project teams say.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-light leading-relaxed text-white/50">
              CADTRI works with general contractors, developers, architects, and
              property owners who need permit-ready documentation on a
              professional timeline.
            </p>
          </div>
        </div>

        {/* Testimonials grid */}
        <div className="grid gap-px bg-white/10 sm:grid-cols-3">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className="flex flex-col justify-between gap-8 bg-primary px-8 py-8"
            >
              {/* Opening quote + text */}
              <div>
                <span
                  className="mb-4 block font-extrabold leading-none text-secondary"
                  style={{ fontSize: "4rem", lineHeight: 1 }}
                  aria-hidden
                >
                  &ldquo;
                </span>
                <p className="font-light leading-relaxed text-white/80 sm:text-[15px]">
                  {item.quote}
                </p>
              </div>

              {/* Attribution */}
              <div className="border-t border-white/10 pt-6">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-primary-foreground">
                  {item.name}
                </p>
                <p className="mt-1 text-[11px] font-light text-white/40">
                  {item.role}{item.company ? `, ${item.company}` : ""}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
