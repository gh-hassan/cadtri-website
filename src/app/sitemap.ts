import type { MetadataRoute } from "next";
import { company } from "@/content/company";
import { services } from "@/content/services";
import { industries } from "@/content/industries";
import { getAllPosts } from "@/lib/posts";

const base = company.website;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base,                  lastModified: now, changeFrequency: "monthly",  priority: 1.0 },
    { url: `${base}/about`,       lastModified: now, changeFrequency: "monthly",  priority: 0.8 },
    { url: `${base}/services`,    lastModified: now, changeFrequency: "monthly",  priority: 0.9 },
    { url: `${base}/industries`,  lastModified: now, changeFrequency: "monthly",  priority: 0.8 },
    { url: `${base}/process`,     lastModified: now, changeFrequency: "monthly",  priority: 0.7 },
    { url: `${base}/resources`,   lastModified: now, changeFrequency: "weekly",   priority: 0.8 },
    { url: `${base}/book`,        lastModified: now, changeFrequency: "monthly",  priority: 0.7 },
    { url: `${base}/contact`,     lastModified: now, changeFrequency: "yearly",   priority: 0.8 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const industryRoutes: MetadataRoute.Sitemap = industries.map((i) => ({
    url: `${base}/industries/${i.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const posts = getAllPosts();
  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${base}/resources/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...industryRoutes, ...postRoutes];
}
