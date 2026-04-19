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
        "group flex flex-col gap-7 bg-background p-8",
        "border border-border",
        "transition-colors duration-base",
        href && "cursor-pointer hover:border-border-strong",
        className,
      )}
    >
      {/* Icon — lifts on hover */}
      {Icon && (
        <Icon
          size={22}
          strokeWidth={1.5}
          className="text-secondary transition-transform duration-200 group-hover:-translate-y-0.5"
          aria-hidden
        />
      )}

      {/* Text */}
      <div className="flex flex-col gap-3">
        <h3 className="font-sans text-sm font-medium uppercase tracking-wider text-foreground">
          {title}
        </h3>
        <p className="font-sans text-sm leading-relaxed text-muted">
          {description}
        </p>
      </div>

      {/* Learn more — only when card is a link */}
      {href && (
        <p className="font-sans mt-auto flex items-center gap-2 text-[11px] font-medium uppercase tracking-widest text-secondary transition-[gap] duration-base group-hover:gap-3">
          Learn more <span aria-hidden>→</span>
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
