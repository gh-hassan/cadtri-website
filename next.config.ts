import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },

  async redirects() {
    return [
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
        destination: "/resources/how-to-get-adu-permit-in-california",
        permanent: true,
      },
      {
        source: "/resources/garage-conversion-adu-guide",
        destination: "/resources/garage-conversion-adu-california",
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
        destination: "/resources/title-24-energy-compliance-california",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
