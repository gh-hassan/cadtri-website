import type { MetadataRoute } from "next";
import { company } from "@/content/company";
import { services } from "@/content/services";
import { getAllPosts, getBlogPosts } from "@/lib/posts";

const base = company.website;

// Update these dates only when the corresponding content actually changes.
// Using new Date() on every build trains Google to distrust the lastmod signal.
const SITE_LAUNCH   = "2026-05-25";
const SERVICES_DATE = "2026-05-25";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base,                lastModified: SITE_LAUNCH },
    { url: `${base}/about`,     lastModified: SITE_LAUNCH },
    { url: `${base}/services`,  lastModified: SERVICES_DATE },
    { url: `${base}/process`,   lastModified: SITE_LAUNCH },
    { url: `${base}/resources`, lastModified: SITE_LAUNCH },
    { url: `${base}/blog`,      lastModified: SITE_LAUNCH },
    { url: `${base}/pricing`,   lastModified: SITE_LAUNCH },
    { url: `${base}/strategy`,  lastModified: SITE_LAUNCH },
    { url: `${base}/contact`,   lastModified: SITE_LAUNCH },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: SERVICES_DATE,
  }));

  const posts = await getAllPosts();
  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${base}/resources/${p.slug}`,
    lastModified: p.date,
  }));

  const blogPosts = await getBlogPosts();
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: p.date,
  }));

  return [...staticRoutes, ...serviceRoutes, ...postRoutes, ...blogRoutes];
}
