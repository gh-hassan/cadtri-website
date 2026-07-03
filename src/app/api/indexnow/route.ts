import { NextRequest, NextResponse } from "next/server";
import { company } from "@/content/company";
import { services } from "@/content/services";
import { industries } from "@/content/industries";
import { getAllPosts } from "@/lib/posts";

const KEY = process.env.INDEXNOW_KEY ?? "ba31e0a349b14384859bded1e188c968";
const BASE = company.website;

// IndexNow supports: Bing, Yandex, DuckDuckGo, Seznam, Naver, Yep
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

async function getAllUrls(): Promise<string[]> {
  const posts = await getAllPosts();

  const staticUrls = [
    BASE,
    `${BASE}/about`,
    `${BASE}/services`,
    `${BASE}/industries`,
    `${BASE}/process`,
    `${BASE}/resources`,
    `${BASE}/contact`,

  ];

  const serviceUrls = services.map((s) => `${BASE}/services/${s.slug}`);
  const industryUrls = industries.map((i) => `${BASE}/industries/${i.slug}`);
  const postUrls = posts.map((p) => `${BASE}/resources/${p.slug}`);

  return [...staticUrls, ...serviceUrls, ...industryUrls, ...postUrls];
}

// Protect this endpoint — only callable with the correct secret or from Vercel deploy hooks
function isAuthorized(req: NextRequest): boolean {
  const secret = req.nextUrl.searchParams.get("secret");
  const envSecret = process.env.INDEXNOW_SUBMIT_SECRET;
  if (!envSecret) return false;
  return secret === envSecret;
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const urls = await getAllUrls();

  const body = {
    host: new URL(BASE).hostname,
    key: KEY,
    keyLocation: `${BASE}/${KEY}.txt`,
    urlList: urls,
  };

  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(body),
    });

    return NextResponse.json({
      success: res.ok,
      status: res.status,
      urlsSubmitted: urls.length,
      urls,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "IndexNow submission failed", detail: String(err) },
      { status: 500 }
    );
  }
}

// GET — returns the list of URLs that would be submitted (for debugging)
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const urls = await getAllUrls();
  return NextResponse.json({ urlCount: urls.length, urls });
}
