import { cn } from "@/lib/utils";

interface StatCardProps {
  /** The featured number or value — e.g. "500+" or "12" */
  value:       string;
  /** Short label beneath the value — e.g. "Projects Completed" */
  label:       string;
  /** Optional sentence expanding on the stat */
  description?: string;
  className?:  string;
}

/**
 * Trust / credibility stat card.
 * Displays a prominent metric with a label.
 * Architectural detail: left accent line in secondary (gold) color.
 *
 * Usage — grid of 3–4 across a section:
 *   <StatCard value="500+" label="Projects Completed" />
 *   <StatCard value="18"   label="Years of Experience" />
 *   <StatCard value="47"   label="Jurisdictions Served" />
 */
export function StatCard({ value, label, description, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1.5 border-l-2 border-secondary pl-6",
        className,
      )}
    >
      <p className="text-4xl font-bold tracking-tighter text-foreground">
        {value}
      </p>
      <p className="text-xs font-semibold uppercase tracking-widest text-secondary">
        {label}
      </p>
      {description && (
        <p className="mt-1 text-sm leading-relaxed text-muted">{description}</p>
      )}
    </div>
  );
}
