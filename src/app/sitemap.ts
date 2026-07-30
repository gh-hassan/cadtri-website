import type { MetadataRoute } from "next";
import { execSync } from "child_process";
import { company } from "@/content/company";
import { services } from "@/content/services";
import { industries } from "@/content/industries";
import { getAllPosts, getBlogPosts } from "@/lib/posts";

const base = company.website;

// Update these dates only when the corresponding content actually changes.
// Using new Date() on every build trains Google to distrust the lastmod signal.
const SITE_LAUNCH         = "2026-05-25";
const PERMITTING_DATE     = "2026-07-27";
const COORDINATION_DATE   = "2026-07-27";
const PERMIT_DWGS_DATE    = "2026-07-27";
const STRUCTURAL_DWG_DATE = "2026-07-27";
const MEP_DWG_DATE        = "2026-07-27";
const RENDERINGS_DATE     = "2026-07-27";

// Derives lastModified from the file's actual last commit date instead of a
// hand-maintained constant, so pages backed by content files that change
// independently (services, about, homepage) get an accurate, self-updating
// signal rather than one flat date across dozens of URLs. Falls back to
// SITE_LAUNCH if git history isn't available (e.g. a shallow CI clone).
const gitDateCache = new Map<string, string>();
function gitLastModified(relativePath: string): string {
  if (gitDateCache.has(relativePath)) return gitDateCache.get(relativePath)!;
  let date = SITE_LAUNCH;
  try {
    const out = execSync(`git log -1 --format=%cI -- "${relativePath}"`, {
      cwd: process.cwd(),
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
    if (out) date = out;
  } catch {
    // no git history available at build time — keep fallback
  }
  gitDateCache.set(relativePath, date);
  return date;
}

const SERVICES_DATE = gitLastModified("src/content/services.tsx");
const ABOUT_DATE     = gitLastModified("src/app/(marketing)/about/page.tsx");
const HOME_DATE      = gitLastModified("src/app/(marketing)/page.tsx");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base,                            lastModified: HOME_DATE },
    { url: `${base}/about`,                 lastModified: ABOUT_DATE },
    { url: `${base}/services`,              lastModified: SERVICES_DATE },
    { url: `${base}/industries`,            lastModified: SITE_LAUNCH },
    { url: `${base}/permitting`,            lastModified: PERMITTING_DATE },
    { url: `${base}/coordination`,          lastModified: COORDINATION_DATE },
    { url: `${base}/permit-drawings`,       lastModified: PERMIT_DWGS_DATE },
    { url: `${base}/structural-drafting`,   lastModified: STRUCTURAL_DWG_DATE },
    { url: `${base}/mep-drafting`,          lastModified: MEP_DWG_DATE },
    { url: `${base}/renderings-walkthroughs`, lastModified: RENDERINGS_DATE },
    { url: `${base}/process`,               lastModified: SITE_LAUNCH },
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

  const industryRoutes: MetadataRoute.Sitemap = industries.map((i) => ({
    url: `${base}/industries/${i.slug}`,
    lastModified: SITE_LAUNCH,
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

  return [...staticRoutes, ...serviceRoutes, ...industryRoutes, ...postRoutes, ...blogRoutes];
}
