export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  description: string;
}

const FEEDS = [
  { url: "https://www.constructiondive.com/feeds/news/", source: "Construction Dive" },
  { url: "https://www.enr.com/rss/news", source: "ENR" },
  { url: "https://www.architectmagazine.com/rss/all.rss.xml", source: "Architect Magazine" },
];

function extractText(xml: string, tag: string): string {
  const cdataMatch = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, "i").exec(xml);
  if (cdataMatch) return cdataMatch[1].trim();
  const match = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i").exec(xml);
  return match ? match[1].replace(/<[^>]+>/g, "").trim() : "";
}

function parseItems(xml: string, source: string): NewsItem[] {
  const items: NewsItem[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match: RegExpExecArray | null;

  while ((match = itemRegex.exec(xml)) !== null && items.length < 4) {
    const block = match[1];
    const title = extractText(block, "title");
    const link  = extractText(block, "link");
    const pubDate = extractText(block, "pubDate");
    const description = extractText(block, "description").slice(0, 200);

    if (title && link) {
      items.push({ title, link, pubDate, source, description });
    }
  }

  return items;
}

export async function fetchIndustryNews(): Promise<NewsItem[]> {
  const results = await Promise.allSettled(
    FEEDS.map(async ({ url, source }) => {
      const res = await fetch(url, {
        next: { revalidate: 3600 },
        headers: { "User-Agent": "CADTRIPortal/1.0" },
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) return [];
      const xml = await res.text();
      return parseItems(xml, source);
    })
  );

  const all: NewsItem[] = [];
  for (const r of results) {
    if (r.status === "fulfilled") all.push(...r.value);
  }

  // Sort by date descending, newest first
  return all.sort((a, b) => {
    const da = a.pubDate ? new Date(a.pubDate).getTime() : 0;
    const db = b.pubDate ? new Date(b.pubDate).getTime() : 0;
    return db - da;
  }).slice(0, 6);
}
