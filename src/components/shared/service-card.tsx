import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  description: string;
  href?: string;
  icon?: LucideIcon;
  className?: string;
}

/**
 * Service offering card.
 * Flat bordered card — warm cream on surface background creates visible contrast.
 * The icon uses the burnt orange accent; the "Learn more" label echoes it.
 */
export function ServiceCard({
  title,
  description,
  href,
  icon: Icon,
  className,
}: ServiceCardProps) {
  const cardBody = (
    <div
      className={cn(
        "group relative flex flex-col gap-7 bg-background p-8 rounded-sm",
        "border border-border",
        "transition-all duration-300",
        href && "cursor-pointer hover:shadow-lg hover:border-secondary/30 hover:-translate-y-1",
        className,
      )}
    >
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/0 via-secondary/0 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm pointer-events-none" />

      {/* Icon — lifts and brightens on hover */}
      {Icon && (
        <div className="relative z-10">
          <Icon
            size={28}
            strokeWidth={1.2}
            className="text-secondary transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110"
            aria-hidden
          />
        </div>
      )}

      {/* Text */}
      <div className="flex flex-col gap-3 relative z-10">
        <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-foreground transition-colors duration-300 group-hover:text-secondary">
          {title}
        </h3>
        <p className="font-sans text-sm leading-relaxed text-muted transition-colors duration-300 group-hover:text-foreground">
          {description}
        </p>
      </div>

      {/* Learn more — only when card is a link */}
      {href && (
        <p className="font-sans mt-auto flex items-center gap-2 text-[11px] font-medium uppercase tracking-widest text-secondary transition-all duration-300 group-hover:gap-3 relative z-10">
          Learn more <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>→</span>
        </p>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {cardBody}
      </Link>
    );
  }

  return cardBody;
}
