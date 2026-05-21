"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * PageTransition — wraps page content with a quick fade + upward reveal
 * on every route change. Uses the Web Animations API (no dependencies).
 *
 * Design intent: authoritative and restrained — the page appears, it
 * doesn't perform. 300ms expo-out keeps it crisp. 8px translate is
 * barely perceptible but removes the jarring snap of instant changes.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const ref     = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect the user's reduced-motion preference.
    // CSS @media (prefers-reduced-motion) doesn't reach the Web Animations API,
    // so we check it manually and skip if set.
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    // Cancel any in-progress animation before starting a new one
    el.getAnimations().forEach((a) => a.cancel());

    el.animate(
      [
        { opacity: 0, transform: "translateY(10px)" },
        { opacity: 1, transform: "translateY(0px)"  },
      ],
      {
        duration: 300,
        easing:   "cubic-bezier(0.16, 1, 0.3, 1)", // expo-out — snappy deceleration
        fill:     "both",
      },
    );
  }, [pathname]);

  return (
    <div ref={ref} style={{ willChange: "opacity, transform" }}>
      {children}
    </div>
  );
}
