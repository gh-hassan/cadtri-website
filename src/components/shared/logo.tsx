"use client";

import Link from "next/link";

interface CadtriLogoProps {
  variant?: "light" | "dark";
  className?: string;
}

export function CadtriLogo({ variant = "light", className = "" }: CadtriLogoProps) {
  const triColor = variant === "dark" ? "text-white/90" : "text-foreground";

  return (
    <Link
      href="/"
      className={`group inline-flex items-baseline gap-1 ${className}`}
      aria-label="CADTRI homepage"
    >
      {/* CAD — orange block, heavy Unbounded */}
      <span
        className="inline-block bg-secondary px-2 py-1 text-[17px] font-extrabold tracking-tight text-white"
        style={{ fontFamily: "var(--font-unbounded)", lineHeight: 1 }}
      >
        CAD
      </span>

      <span
        className={`text-[16px] font-light tracking-[0.2em] transition-colors duration-500 ${triColor}`}
        style={{ fontFamily: "var(--font-unbounded)", lineHeight: 1, transitionTimingFunction: "var(--ease-expo-out)" }}
      >
        TRI<span className="align-super text-[8px] tracking-normal">™</span>
      </span>
    </Link>
  );
}
