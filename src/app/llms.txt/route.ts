import { company } from "@/content/company";
import { services } from "@/content/services";
import { industries } from "@/content/industries";
import { getAllPosts } from "@/lib/posts";

const base = company.website;

export function GET() {
  const posts = getAllPosts();

  const content = `# ${company.name}

> ${company.description}

CADTRI is a professional architectural drafting and permit coordination company serving contractors, developers, architects, and property owners across California. We produce complete, permit-ready construction documents across 42 specialized services covering residential, commercial, hospitality, and mixed-use project types.

- Website: ${base}
- Contact: ${base}/contact

- Email: ${company.email}
- Phone: ${company.phone}

## Services

${services.map((s) => `- [${s.title}](${base}/services/${s.slug}): ${s.tagline}`).join("\n")}

## Industries

${industries.map((i) => `- [${i.title}](${base}/industries/${i.slug}): ${i.metaDescription}`).join("\n")}

## Resources

${posts.map((p) => `- [${p.title}](${base}/resources/${p.slug}): ${p.description}`).join("\n")}

## About

${base}/about

## Process

CADTRI follows a four-step permit drafting process: scope review and inquiry, document review and jurisdiction research, production and coordination, and submission support. Learn more: ${base}/process

## Optional

- Full content version: ${base}/llms-full.txt
- Sitemap: ${base}/sitemap.xml
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
