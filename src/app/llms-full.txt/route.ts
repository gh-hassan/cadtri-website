import { company } from "@/content/company";
import { services } from "@/content/services";
import { industries } from "@/content/industries";
import { getAllPosts } from "@/lib/posts";
import fs from "fs";
import path from "path";

const base = company.website;

export function GET() {
  const posts = getAllPosts();

  // Build service sections with full overview text (plain string fields only)
  const serviceSections = services
    .map((s) => {
      const overview =
        typeof s.overview === "string" ? s.overview : s.tagline;
      const whyItMatters =
        typeof s.whyItMatters === "string" ? s.whyItMatters : "";
      const includesList = s.includes
        .map((item) => {
          const desc =
            typeof item.description === "string" ? item.description : "";
          return `  - ${item.title}${desc ? ": " + desc : ""}`;
        })
        .join("\n");

      return `### ${s.title}

URL: ${base}/services/${s.slug}
Category: ${s.category}
Tagline: ${s.tagline}

${overview}
${whyItMatters ? "\n" + whyItMatters : ""}

Deliverables:
${includesList}`;
    })
    .join("\n\n---\n\n");

  // Build industry sections
  const industrySections = industries
    .map((i) => {
      const delivers = i.whatWeDeliver.map((d) => `  - ${d}`).join("\n");
      return `### ${i.title}

URL: ${base}/industries/${i.slug}
${i.metaDescription}

What CADTRI delivers for ${i.title} projects:
${delivers}`;
    })
    .join("\n\n---\n\n");

  // Build resource sections — read raw MDX content for full text
  const resourceSections = posts
    .map((p) => {
      let rawContent = "";
      try {
        const filePath = path.join(
          process.cwd(),
          "src/content/posts",
          `${p.slug}.mdx`
        );
        const raw = fs.readFileSync(filePath, "utf-8");
        // Strip frontmatter and markdown syntax for plain text
        rawContent = raw
          .replace(/^---[\s\S]*?---\n/, "")
          .replace(/^#{1,6}\s+/gm, "")
          .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
          .replace(/\*\*([^*]+)\*\*/g, "$1")
          .replace(/\*([^*]+)\*/g, "$1")
          .replace(/`([^`]+)`/g, "$1")
          .trim();
      } catch {
        rawContent = p.description;
      }
      return `### ${p.title}

URL: ${base}/resources/${p.slug}
Category: ${p.category}
Description: ${p.description}

${rawContent}`;
    })
    .join("\n\n---\n\n");

  const content = `# ${company.name} — Full Content Index

> ${company.description}

Generated: ${new Date().toISOString()}
Concise version: ${base}/llms.txt
Sitemap: ${base}/sitemap.xml

---

## Company

Name: ${company.name}
Legal Name: ${company.legalName}
Website: ${base}
Email: ${company.email}
Phone: ${company.phone}
Location: ${company.address.city}, ${company.address.state}, ${company.address.country}
Tagline: ${company.tagline}

CADTRI is a professional architectural drafting and permit coordination company. We produce permit-ready construction drawings for residential, commercial, hospitality, and mixed-use projects across California. Our 42 services cover every phase of the permit and documentation process, from initial feasibility and zoning research through permit-ready production, engineering coordination, and plan check correction response.

---

## Services (42 total)

${serviceSections}

---

## Industries

${industrySections}

---

## Resources

${resourceSections}

---

## Process

URL: ${base}/process

CADTRI follows a four-step permit drafting process:

1. Inquiry and Scope Review — Project type, jurisdiction, and scope are reviewed. Deliverables, timeline, and fee are confirmed before production begins.
2. Document Review and Jurisdiction Research — Existing drawings are reviewed. The applicable building department checklist, zoning standards, and code edition are researched before drafting starts.
3. Production and Coordination — Architectural drawings are produced to permit-ready standard. Structural, MEP, Title 24, and civil documentation is coordinated into a single submission package.
4. Submission Support and Follow Through — The complete package is delivered. CADTRI supports city submission, tracks review status, and prepares correction responses if plan check comments are issued.

---

## Get a Pricing Estimate

URL: ${base}/pricing

An 8-step interactive form that collects project details and sends a tailored pricing estimate within one business day. Covers all client types: homeowners, contractors, architects, developers, and business owners. Supports file attachments for existing drawings.

## Contact

URL: ${base}/contact

Email: ${company.email}
Phone: ${company.phone}
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
