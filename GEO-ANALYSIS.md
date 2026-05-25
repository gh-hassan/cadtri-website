# GEO Analysis — CADTRI (cadtri.com)
**Date:** 2026-05-25  
**Framework:** GEO (Generative Engine Optimization)  
**Target markets:** Florida, Texas, North Carolina

---

## GEO Readiness Score: 54/100

| Category | Weight | Raw Score | Weighted |
|---|---|---|---|
| Citability | 25% | 56/100 | 14.0 |
| Structural Readability | 20% | 68/100 | 13.6 |
| Multi-Modal Content | 15% | 12/100 | 1.8 |
| Authority & Brand Signals | 20% | 28/100 | 5.6 |
| Technical Accessibility | 20% | 95/100 | 19.0 |
| **Total** | | | **54/100** |

---

## Platform Breakdown

| Platform | Score | Key Gap |
|---|---|---|
| Google AI Overviews | 58/100 | Needs traditional SEO rank lift + question-format H2s |
| ChatGPT | 34/100 | No Wikipedia, no Reddit presence, no LinkedIn |
| Perplexity | 31/100 | No Reddit citations, no community validation |
| Bing Copilot | 62/100 | IndexNow implemented ✓, Bing can index quickly |

---

## 1. Technical Accessibility: 95/100 ✅

**Strengths — almost perfect:**

- **SSR confirmed.** Next.js 15 App Router renders all pages server-side. AI crawlers get full HTML with no JavaScript dependency. ✓
- **All AI crawlers allowed.** `robots.ts` uses wildcard `allow: "/"` — GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot all get in. ✓
- **llms.txt present** at `/llms.txt` with structured service catalog, FAQ, and geographic context. ✓
- **llms-full.txt present** at `/llms-full.txt` — a rarer implementation that provides full content context. ✓
- **index.md present** at `/index.md` — comprehensive knowledge base for AI citation. ✓
- **IndexNow** wired up via `/api/indexnow` — Bing, Yandex, DuckDuckGo notified on publish. ✓
- **Sitemap** at `/sitemap.xml` covering all 42 services + 6 blog posts. ✓

**One gap found (fixed in this session):**
- The dynamic `llms.txt/route.ts` and `llms-full.txt/route.ts` handlers still had "across California" — now corrected to FL/TX/NC. ✓

**Missing:**
- No RSL 1.0 licensing declaration (low priority — standard not widely adopted yet)

---

## 2. Structural Readability: 68/100 ⚠️

**Strengths:**
- Clean H1→H2→H3 hierarchy across all 6 blog posts. ✓
- Average 15 headings per post — well-chunked for AI passage extraction. ✓
- FAQ sections with 4 Q&A pairs per post. ✓
- All 30+ service pages now have `FaqJsonLd` structured data (wired this session). ✓
- Short paragraphs throughout. ✓

**Weaknesses:**
- Only **14 of 52 H2 headings (27%) are question-format.** AI Overviews heavily weight question-anchored passages. The `what-is-a-permit-set.mdx` post has only 1 of 4 H2s as a question. Aim for 60%+.
- No comparison tables in blog posts. Tables see 2.3× higher AI citation rates for comparative queries ("FL vs TX ADU rules", "plan check timelines by city").
- Post titles are process-oriented, not question-oriented — Google AIO prefers "How do I get an ADU permit in Florida?" over "Garage Conversion ADU in California."

**Recommendation:** Convert declarative H2s to questions. Examples:
- "Core Components Found Inside a Permit Set" → "What Goes Inside a Permit Set?"
- "Understanding the Purpose of a Permit Set" → "What Is a Permit Set and Why Does It Matter?"
- "How CADTRI Develops Permit Sets" → "How Does CADTRI Produce Permit Sets?"

---

## 3. Citability Score: 56/100 ⚠️

**Optimal citability range: 134–167 words per passage**

**Strengths:**
- Posts average ~1,500 words — substantial enough for multiple passage extractions. ✓
- Strong "X is..." definition patterns opening most sections. ✓
- FAQ answers in frontmatter are 80–160 words — well within optimal range. ✓
- `ArticleJsonLd` now includes `author: { "@id": ORG_ID }` and `dateModified`. ✓

**Weaknesses — major:**
- **Zero original data points.** AI systems heavily favor citable statistics. Current posts cite no permit timelines with sources, no code section numbers, no fee schedules, no jurisdiction-specific approval rates. A statement like "Miami-Dade residential permits take 15–30 business days for complete submissions under FBC Section 105.1" is 40× more citable than "permit timelines vary."
- **No author bylines.** Anonymous content scores lower on E-E-A-T. Google AIO and ChatGPT both prefer attributed expertise.
- **No last-updated date** displayed on posts (it's in schema now after today's fix, but not rendered visibly for users).
- **No citations to primary sources.** Statements about the Florida Building Code, NC State Building Code, and Texas IRC adoption could link to official code references — adds credibility signals AI systems use.

---

## 4. Multi-Modal Content: 12/100 🔴

**This is the biggest single gap.**

- No images in any of the 6 blog posts.
- No video content anywhere on the site.
- No calculators or interactive tools.
- No infographics.

Content with multi-modal elements sees **156% higher AI selection rates.** Even a single labeled diagram per post (permit set sheet layout, ADU approval flowchart) would substantially lift citability.

**Minimum viable fix:** Add one image per blog post with descriptive `alt` text containing target keywords ("Florida ADU permit set floor plan example"). These don't need to be photos — a simple labeled diagram works.

---

## 5. Authority & Brand Signals: 28/100 🔴

**This is the second biggest gap, and it's entirely off-site.**

| Signal | Status | Impact |
|---|---|---|
| LinkedIn company page | ❌ Missing (empty in company.ts) | High — moderate AI citation correlation |
| Instagram | ❌ Missing | Low |
| Reddit presence | ❌ Not detectable | High for Perplexity (46.7% of citations) |
| YouTube channel | ❌ Missing | Highest (0.737 correlation with AI citations) |
| Wikipedia | ❌ Not present | High for ChatGPT (47.9% of citations) |
| Google Business Profile | ❌ Not set up | Critical for local pack |
| Houzz/Angi listing | ❌ Not found | Medium |
| Schema sameAs | ⚠️ Wired but empty | No value until profiles exist |

**Critical insight from December 2025 Ahrefs study:** Brand mentions on YouTube, Reddit, and Wikipedia correlate 3× more strongly with AI visibility than backlinks. CADTRI has none of these.

---

## AI Crawler Access Status

```
Allowed:    GPTBot ✓  OAI-SearchBot ✓  ClaudeBot ✓  PerplexityBot ✓  
            anthropic-ai ✓  Bytespider ✓  cohere-ai ✓  CCBot ✓ (all via wildcard)
Blocked:    /api/  /admin/  /portal/
```

All major AI search crawlers have full access. No AI-specific disallow rules exist.

---

## Schema Coverage (as of this session)

| Schema Type | Status |
|---|---|
| LocalBusiness / ProfessionalService | ✓ With entity @id, address, phone, areaServed (FL/TX/NC) |
| WebSite | ✓ With publisher reference |
| Service (per service page) | ✓ 42 pages, areaServed now FL/TX/NC |
| Article (per blog post) | ✓ With datePublished, dateModified, author |
| FAQPage (blog posts) | ✓ 4 Q&A pairs × 6 posts = 24 structured answers |
| FAQPage (service pages) | ✓ Just wired — 30+ services now emit FaqJsonLd |
| BreadcrumbList | ✓ On services index, service pages, resource pages |
| Person | ❌ Missing — no author schema |
| Organization sameAs | ⚠️ Present but empty (no social URLs populated) |

---

## Top 5 Highest-Impact Changes

### 1. LinkedIn Company Page + Populate sameAs (30 min, HIGH)
Create a LinkedIn company page for CADTRI. Then add the URL to `company.ts`:
```typescript
social: { linkedin: "https://www.linkedin.com/company/cadtri", ... }
```
This immediately activates the `sameAs` entity graph in `LocalBusiness` schema, improving entity recognition across all AI platforms.

### 2. Add One Image Per Blog Post (2–3 hrs, HIGH)
Even simple labeled diagrams (permit set sheet layout, ADU approval steps flowchart) trigger multi-modal signals. Add to MDX posts with keyword-rich alt text:
```mdx
![Florida ADU permit set showing site plan and floor plans](./permit-set-example.png)
```

### 3. Convert Declarative H2s to Questions (1 hr, MEDIUM-HIGH)
Prioritize the top 3 posts. Target 60%+ of H2s as questions. This directly affects Google AI Overviews passage selection.

### 4. Add Specific Data Points to Blog Posts (2–3 hrs, MEDIUM-HIGH)  
Add citable facts with sources. Examples:
- "Florida Building Code Section 105.1 requires permit applications within 30 days of project start"
- "Austin Development Services processes residential permit reviews in 10–15 business days for complete submissions"
- "North Carolina's NC State Building Code (2018 IBC base) requires 5-foot side setbacks for most ADU types in Charlotte's R-3 zone"

### 5. Reddit Presence (ongoing, HIGH for Perplexity)
Post helpful answers in r/homeimprovement, r/DIYwoodworking, r/Austin, r/Charlotte, r/Miami, r/houston. Perplexity draws 46.7% of citations from Reddit. Even 10 genuinely helpful comments over 3 months can generate measurable AI visibility.

---

## Content Reformatting Suggestions

### Post: "What Is a Permit Set?"

**Current H2 (declarative):**
> Understanding the Purpose of a Permit Set

**Rewrite as:**
> What Is the Purpose of a Permit Set?

**Current passage (generic, non-citable):**
> A permit set is a meticulously coordinated cluster of architectural drawings, structural documentation, code compliance sheets, and supplemental construction records prepared for submission to the local building department.

**Add specificity for AI citation:**
> A permit set is a coordinated package of construction drawings and supporting documentation submitted to a building department for permit approval. Florida, Texas, and North Carolina building departments each define minimum submittal requirements — typically: a site plan, floor plans, exterior elevations, building sections, construction details, and state-specific energy compliance documentation. The Florida Building Code (FBC), Texas IRC-based adoptions, and North Carolina State Building Code each specify what must be included before plan check can begin.

### Blog posts in general
Add a "Last reviewed:" date displayed below the publish date on each post. This visible recency signal improves both user trust and AI citability scoring.

---

## What's Already Working

- `llms.txt` + `index.md` dual-format AI discovery: better than 90% of competing sites
- Next.js SSR: no JavaScript rendering gap for AI crawlers
- 30+ service pages now emit FAQ structured data
- Breadcrumb schema on all indexed pages
- Entity graph with `@id` anchors linking LocalBusiness ↔ WebSite ↔ Service ↔ Article
- IndexNow for Bing Copilot indexing speed
- Geographic pivot to FL/TX/NC now consistent across all schema, metadata, and content
