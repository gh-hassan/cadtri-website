import type { MetadataRoute } from "next";
import { company } from "@/content/company";

// AI crawlers get explicit, named rules rather than relying on the wildcard
// fallback — a deliberate access policy, matching the RSL-1.0 license
// declared in /llms.txt (robots: allow).
const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  const disallow = ["/api/", "/admin/", "/portal/"];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow,
      })),
    ],
    sitemap: `${company.website}/sitemap.xml`,
    // LLM crawler hints — see /llms.txt and /llms-full.txt
    host: company.website,
  };
}
