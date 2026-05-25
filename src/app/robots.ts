import type { MetadataRoute } from "next";
import { company } from "@/content/company";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/portal/"],
    },
    sitemap: `${company.website}/sitemap.xml`,
    // LLM crawler hints — see /llms.txt and /llms-full.txt
    host: company.website,
  };
}
