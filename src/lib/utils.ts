import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Merges Tailwind classes safely — required by shadcn/ui components.
// Usage: cn("px-4 py-2", isActive && "bg-primary", className)
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
