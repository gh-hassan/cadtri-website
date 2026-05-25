import type { MetadataRoute } from "next";
import { company } from "@/content/company";
import { services } from "@/content/services";
import { industries } from "@/content/industries";
import { getAllPosts } from "@/lib/posts";

const base = company.website;

// Update these dates only when the corresponding content actually changes.
// Using new Date() on every build trains Google to distrust the lastmod signal.
const SITE_LAUNCH    = new Date("2026-05-25");
const SERVICES_DATE  = new Date("2026-05-25");
const INDUSTRIES_DATE = new Date("2026-05-25");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base,                 lastModified: SITE_LAUNCH },
    { url: `${base}/about`,      lastModified: SITE_LAUNCH },
    { url: `${base}/services`,   lastModified: SERVICES_DATE },
    { url: `${base}/industries`, lastModified: INDUSTRIES_DATE },
    { url: `${base}/process`,    lastModified: SITE_LAUNCH },
    { url: `${base}/resources`,  lastModified: SITE_LAUNCH },
    { url: `${base}/pricing`,    lastModified: SITE_LAUNCH },
    { url: `${base}/strategy`,   lastModified: SITE_LAUNCH },
    { url: `${base}/contact`,    lastModified: SITE_LAUNCH },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: SERVICES_DATE,
  }));

  const industryRoutes: MetadataRoute.Sitemap = industries.map((i) => ({
    url: `${base}/industries/${i.slug}`,
    lastModified: INDUSTRIES_DATE,
  }));

  const posts = getAllPosts();
  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${base}/resources/${p.slug}`,
    lastModified: new Date(p.date),
  }));

  return [...staticRoutes, ...serviceRoutes, ...industryRoutes, ...postRoutes];
}
