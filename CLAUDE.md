# CADTRI Website — Project Context

CADTRI is a professional architectural drafting and permit support company. This is their marketing website built with Next.js 15 App Router.

## Dev Commands

```bash
npm run dev      # starts on http://localhost:3000 (Turbopack enabled)
npm run build    # production build
npx tsc --noEmit # type check
```

## Tech Stack

- **Framework**: Next.js 15 App Router, React 19, TypeScript
- **Styling**: Tailwind CSS v3 with CSS custom properties design system
- **Font**: Outfit (Google Fonts via next/font) — single typeface, hierarchy via weight/size/tracking
- **Icons**: lucide-react
- **Utilities**: clsx, tailwind-merge, class-variance-authority

## Design System

### Brand Palette (globals.css)
```
--color-primary:            #222222   charcoal — dark sections, headings
--color-primary-foreground: #FAF3E1   warm cream — text on dark bg
--color-secondary:          #FF6D1F   burnt orange — CTAs, eyebrows, accents
--color-background:         #FAF3E1   warm cream — page bg
--color-surface:            #F5E7C6   slightly deeper cream — alternate sections
--color-muted:              #7A6E5F   warm taupe — body copy
--color-border:             #E2D4B8   warm tan — borders and dividers
```

### Typography Rules
- Outfit 800 ExtraBold: hero h1 (`font-extrabold`)
- Outfit 700 Bold: section h2/h3 (`font-bold`)
- Outfit 300 Light: body paragraphs (`font-light`)
- Eyebrow labels: `text-[11px] font-medium uppercase tracking-widest text-secondary`
- **`text-primary/50` does not work** — CSS variable colors don't support Tailwind opacity modifiers. Use `text-white/50` on dark backgrounds instead.
- `globals.css @layer base` sets `h1,h2...{ color: var(--color-foreground) }` directly on elements — always add explicit `text-primary-foreground` utility on headings inside dark sections to prevent them going invisible.

### Layout Patterns
- **Gap-as-border grid**: `grid gap-px border-x border-b border-border bg-border sm:grid-cols-N` — cells use `bg-surface` or `bg-background`. Parent bg bleeds through gaps as 1px warm dividers.
- **Horizontal split intro**: `grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20` — heading left, description/CTA right, bottom rule becomes visual seam.
- **Numeric indexing**: Orange `01`–`0N` tabular-nums (`text-[11px] font-medium tabular-nums text-secondary`) as visual thread through lists.
- **Section wrapper**: `<Section variant="default|surface|dark" compact?>` — handles bg, py-24 (or py-14 compact), container.
- **Container**: `container mx-auto max-w-container px-6` (max-width 1280px).

### Global Copy Rules
- **No em dashes** anywhere in visible copy — use periods, colons, or rewrite
- Premium, restrained tone — no fake metrics, no fake testimonials, no fake logos
- Copy is commercially strong and AI-search-friendly

## File Structure

```
src/
├── app/
│   ├── layout.tsx              root layout — Outfit font, SiteHeader, skip link, SiteFooter
│   ├── globals.css             design tokens + Tailwind base reset
│   ├── page.tsx                homepage (imports section components)
│   ├── about/page.tsx
│   ├── services/
│   │   ├── page.tsx            services index (editorial row directory)
│   │   └── [slug]/page.tsx     dynamic service detail (generateStaticParams)
│   ├── process/page.tsx
│   ├── portfolio/page.tsx      placeholder project cards — real images pending
│   ├── contact/page.tsx        inquiry form — server action NOT yet wired
│   ├── industries/page.tsx     redirect("/about")
│   ├── industries/[slug]/page.tsx  redirect("/about")
│   ├── privacy-policy/page.tsx robots: index:false
│   ├── terms/page.tsx          robots: index:false
│   ├── sitemap.ts              all 12 indexable routes
│   └── robots.ts               allow all, disallow /api/
│
├── components/
│   ├── layout/
│   │   ├── site-header.tsx     sticky header — desktop dropdown, mobile accordion
│   │   └── site-footer.tsx     dark navy 4-col footer
│   ├── sections/               homepage section components (read from content/homepage.ts)
│   │   ├── home-hero.tsx
│   │   ├── home-trust-strip.tsx
│   │   ├── home-services.tsx
│   │   ├── home-why-us.tsx
│   │   ├── home-process.tsx
│   │   ├── home-industries.tsx
│   │   └── home-portfolio.tsx
│   └── shared/
│       ├── button.tsx          CVA-based — variants: primary/secondary/outline/ghost, sizes: sm/md/lg
│       ├── section.tsx         Section wrapper with variant and compact props
│       ├── page-header.tsx     dark charcoal header used on all interior pages
│       └── cta-band.tsx        full-width CTA — dark/light variants, asymmetric layout
│
├── content/
│   ├── company.ts              single source of truth for name, email, website, tagline
│   ├── homepage.ts             all homepage copy and data (hero, trust, services, why, process, industries, portfolio, cta)
│   ├── services.ts             6-service content model — slug, title, category, tagline, overview, includes[], audience[], whyItMatters, relatedSlugs[]
│   └── navigation.ts           navLinks (header) + footerColumns — includes activePath field on Industries
│
└── lib/
    ├── metadata.ts             siteMetadata with metadataBase, OG, Twitter, robots defaults
    └── utils.ts                cn() helper (clsx + tailwind-merge)
```

## Services (6 total)

| Slug | Title | Category |
|------|-------|----------|
| `architectural-drafting` | Architectural Drafting | Drawings |
| `permit-set-preparation` | Permit Set Preparation | Permitting |
| `city-comments-response` | City Comments Response | Permitting |
| `structural-coordination` | Structural Coordination | Coordination |
| `code-compliance-review` | Code and Compliance Review | Review |
| `renderings-visualization` | Renderings and Visualization | Visualization |

## Navigation Notes

- `navLinks` keys use `link.label` not `link.href` — two items share href `/about` (About + Industries)
- Industries has `activePath: "/industries"` so it never falsely highlights as active when on `/about`
- `isActive(link)` function in site-header reads `link.activePath ?? link.href`

## Key Decisions Made

- **Outfit only** — replaced Cormorant Garamond/DM Sans dual-font system mid-project; single typeface throughout
- **Industries pages removed** — `/industries` and `/industries/[slug]` both redirect to `/about`; no dedicated pages built yet
- **Portfolio is placeholder** — 6 representative project type cards, no real photos. `portfolioItems` in homepage.ts has `note` fields that are intentionally NOT rendered.
- **Contact form unconnected** — form HTML is complete and production-ready but has no server action. See TODO comment in `contact/page.tsx`.
- **Legal pages not indexed** — both privacy-policy and terms have `robots: { index: false }` and carry attorney-review NOTE comments

## Still Needed Before Launch

1. Wire contact form (Resend, Formspree, or `/api/contact` route)
2. Add `/public/brand/favicon.ico` and `/public/brand/apple-touch-icon.png` (referenced in metadata.ts)
3. Add OG/social share image (`app/opengraph-image.png` or generated `.tsx`)
4. Replace portfolio placeholder divs with real `<Image />` when photography is available
5. Fill empty fields in `company.ts` — phone, address, social links
6. Attorney review of privacy-policy and terms pages
7. Add analytics (Plausible, Fathom, or GA4)

## Preview Server

Config at `.claude/launch.json`. Start with:
```
preview_start("cadtri-dev")  →  http://localhost:3000
```
After running `next build`, always restart the dev server — the build overwrites dev cache.
