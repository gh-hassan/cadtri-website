// Inline CTA button or link — used throughout sections
// Placeholder — to be designed
interface CallToActionProps {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "outline";
}

export function CallToAction({ label, href, variant = "primary" }: CallToActionProps) {
  return <a href={href}>{label}</a>;
}
