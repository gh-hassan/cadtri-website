import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    // Allow-lists every third party actually loaded site-wide: Cloudflare
    // Turnstile (contact/pricing CAPTCHA), GTM/GA + Plausible (analytics),
    // Crisp (live chat, multiple subdomains incl. websockets), and the
    // pricing form's IP-geolocation calls. Tightened from a default-deny
    // baseline rather than left unset.
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://www.googletagmanager.com https://plausible.io https://client.crisp.chat",
      "style-src 'self' 'unsafe-inline' https://client.crisp.chat",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data: https://client.crisp.chat",
      "connect-src 'self' https://challenges.cloudflare.com https://ipapi.co https://nominatim.openstreetmap.org https://www.google-analytics.com https://plausible.io https://*.crisp.chat wss://*.crisp.chat",
      "frame-src 'self' https://challenges.cloudflare.com",
      "object-src 'none'",
      "base-uri 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  async redirects() {
    return [
      // ── Apex domain → www (SEO canonicalization, Aug 2026) ─────────────────
      // cadtri.com served identical content to www.cadtri.com with no host
      // redirect, so Google indexed/crawled both hosts as separate duplicate
      // URLs despite the correct <link rel="canonical"> pointing to www.
      // GSC flagged this as "Crawled – not indexed" and "Duplicate without
      // user-selected canonical" for /services/pre-purchase-assessment and
      // /services/digital-walkthroughs. This 301 collapses every apex
      // request onto the canonical www host in a single hop.
      {
        source: "/:path*",
        has: [{ type: "host", value: "cadtri.com" }],
        destination: "https://www.cadtri.com/:path*",
        permanent: true,
      },

      // ── /book removed — redirect to /contact ─────────────────────────────
      {
        source: "/book",
        destination: "/contact",
        permanent: true,
      },

      // ── Old resource article URLs → new SEO-optimised slugs ───────────────
      // These were renamed in May 2026. 301s preserve any existing link equity
      // and prevent Google from indexing the old URLs as 404s.
      {
        source: "/resources/adu-permit-california",
        destination: "/resources/adu-permit-process-guide",
        permanent: true,
      },
      {
        source: "/resources/garage-conversion-adu-guide",
        destination: "/resources/garage-conversion-permit-guide",
        permanent: true,
      },
      {
        source: "/resources/plan-check-corrections-guide",
        destination: "/resources/how-to-respond-to-plan-check-corrections",
        permanent: true,
      },
      {
        source: "/resources/pre-application-meeting-guide",
        destination: "/resources/pre-application-meeting-construction",
        permanent: true,
      },
      {
        source: "/resources/title-24-energy-compliance-guide",
        destination: "/resources/energy-code-compliance-guide",
        permanent: true,
      },

      // ── Content rewritten to match actual FL/TX/NC markets (July 2026) ────
      // These 3 guides were originally California-specific (Title 24, HCD)
      // despite CADTRI operating in Florida, Texas, and North Carolina. The
      // content was rewritten and the slugs renamed to match; these redirects
      // preserve link equity and indexing for the previously-live CA-named URLs.
      {
        source: "/resources/how-to-get-adu-permit-in-california",
        destination: "/resources/adu-permit-process-guide",
        permanent: true,
      },
      {
        source: "/resources/garage-conversion-adu-california",
        destination: "/resources/garage-conversion-permit-guide",
        permanent: true,
      },
      {
        source: "/resources/title-24-energy-compliance-california",
        destination: "/resources/energy-code-compliance-guide",
        permanent: true,
      },

      // ── Blog cannibalization cleanup (SEO audit, July 2026) ────────────────
      // Each pair independently covered the same search intent with zero
      // cross-linking. Consolidating onto one canonical URL per topic.
      {
        source: "/blog/what-is-a-permit-set",
        destination: "/resources/what-is-a-permit-set",
        permanent: true,
      },
      {
        source: "/blog/plan-check-corrections-how-to-respond",
        destination: "/resources/how-to-respond-to-plan-check-corrections",
        permanent: true,
      },
      {
        source: "/blog/how-much-do-permit-drawings-cost-a-2026-breakdown-by-project-type",
        destination: "/blog/permit-drawings-cost-2026",
        permanent: true,
      },
      {
        source: "/blog/why-building-permits-get-rejected-and-how-to-pass-plan-check-the-first-time",
        destination: "/blog/why-building-permits-rejected",
        permanent: true,
      },
      {
        source: "/blog/adu-permit-rules-in-texas-by-city-austin-houston-dallas-and-san-antonio-2026",
        destination: "/blog/adu-permits-texas-2026-guide",
        permanent: true,
      },
      {
        source: "/blog/garage-conversion-permit-requirements-cost-and-timeline-in-florida-and-texas",
        destination: "/blog/garage-conversion-permits-drawings-costs",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
