"use client";

import { useEffect } from "react";
import type { Metadata } from "next";

// Cal.com username — set this to your Cal.com username and event slug.
// Example: if your booking link is cal.com/cadtri/consultation, set:
//   CAL_LINK = "cadtri/consultation"
const CAL_LINK = "cadtri/15min";
const BRAND_COLOR = "#FF6D1F";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Cal?: (...args: any[]) => void;
  }
}

function CalEmbed() {
  useEffect(() => {
    // Load the Cal.com embed script once
    if (document.getElementById("cal-embed-script")) return;

    const script = document.createElement("script");
    script.id = "cal-embed-script";
    script.src = "https://app.cal.com/embed/embed.js";
    script.async = true;

    script.onload = () => {
      window.Cal?.("inline", {
        elementOrSelector: "#cal-inline",
        calLink: CAL_LINK,
        config: { layout: "month_view" },
      });
      window.Cal?.("ui", {
        styles: { branding: { brandColor: BRAND_COLOR } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    };

    document.head.appendChild(script);
  }, []);

  return (
    <div
      id="cal-inline"
      style={{ width: "100%", height: "700px", overflow: "scroll" }}
    />
  );
}

export default function BookPage() {
  return (
    <>
      {/* Page header — manual markup (client page can't use RSC PageHeader) */}
      <div className="bg-primary px-6 py-20">
        <div className="container mx-auto max-w-container">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            Book a Consultation
          </p>
          <h1
            className="max-w-2xl font-bold text-4xl text-primary-foreground sm:text-5xl"
            style={{ letterSpacing: "-0.03em", lineHeight: 1.1 }}
          >
            Schedule a free 15-minute consultation.
          </h1>
          <p className="mt-5 max-w-xl font-light leading-relaxed text-white/60">
            Tell us about your project scope and we will confirm which services
            apply, what the documentation requires, and what the timeline looks
            like. No commitment required.
          </p>
        </div>
      </div>

      {/* Cal.com embed */}
      <div className="border-t border-border bg-background px-6 py-16">
        <div className="container mx-auto max-w-container">
          <CalEmbed />
          <p className="mt-6 text-center text-[11px] font-light text-muted">
            Prefer email?{" "}
            <a
              href="mailto:info@cadtri.com"
              className="text-secondary underline underline-offset-2 hover:text-foreground"
            >
              info@cadtri.com
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
