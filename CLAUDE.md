# CADTRI Website — Project Context

CADTRI is a professional architectural drafting and permit support company. This is their marketing website built with Next.js 15 App Router.

## Dev Commands

```bash
npm run dev      # starts on http://localhost:3000 (Turbopack enabled)
npm run build    # production build
npx tsc --noEmit # type check
```

## Preview Server

Config at `.claude/launch.json`. Start with:
```
preview_start("cadtri-dev")  →  http://localhost:3000
```
After running `next build`, always restart the dev server — the build overwrites dev cache.
If the dev server shows "Module not found" errors after new files are added, stop it fully (`preview_stop` + `pkill -f "next dev"`) and restart fresh.

## Tech Stack

- **Framework**: Next.js 15.5.15 App Router, React 19, TypeScript
- **Styling**: Tailwind CSS v3 with CSS custom properties design system
- **Fonts**: Unbounded (headings, `--font-unbounded`) + Plus Jakarta Sans (body/UI, `--font-jakarta`) via `next/font/google`
- **Icons**: lucide-react
- **Utilities**: clsx, tailwind-merge, class-variance-authority
- **Email**: Resend (contact form server action in `app/contact/actions.ts`)
- **CAPTCHA**: Cloudflare Turnstile (site key + secret in `.env.local`)

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
- **Unbounded 800 ExtraBold**: hero h1 (`font-extrabold`) — `--font-heading`
- **Unbounded 700 Bold**: section h2/h3 (`font-bold`) — `--font-heading`
- **Plus Jakarta Sans 300 Light**: body paragraphs (`font-light`) — `--font-sans`
- Heading base: `letter-spacing: -0.03em`, `line-height: 1.08` (set in globals.css)
- Always use `clamp()` for fluid heading sizes, e.g. `fontSize: "clamp(2rem, 5vw, 4rem)"`
- **`text-primary/50` does not work** — CSS variable colors don't support Tailwind opacity modifiers. Use `text-white/50` on dark backgrounds instead.
- `globals.css @layer base` sets `h1,h2...{ color: var(--color-foreground) }` directly on elements — always add explicit `text-primary-foreground` utility on headings inside dark sections to prevent them going invisible.

### Eyebrow Pattern
```tsx
<p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-secondary">
  Label
</p>
```
**No decorative orange dash span before the text.** The `<span className="inline-block h-px w-6 shrink-0 bg-secondary" />` pattern was removed site-wide. Do NOT add it back.

### Layout Patterns
- **Gap-as-border grid**: `grid gap-px border-x border-b border-border bg-border sm:grid-cols-N` — cells use `bg-surface` or `bg-background`. Parent bg bleeds through gaps as 1px warm dividers.
- **Horizontal split intro**: `grid items-end gap-8 border-b border-border pb-14 lg:grid-cols-2 lg:gap-20` — heading left, description/CTA right, bottom rule becomes visual seam.
- **Numeric indexing**: Orange `01`–`0N` tabular-nums (`text-[11px] font-medium tabular-nums text-secondary`) as visual thread through lists.
- **Section wrapper**: `<Section variant="default|surface|dark" compact?>` — handles bg, py-24 (or py-14 compact), container.
- **Container**: `container mx-auto max-w-container px-6` (max-width 1280px).

### Global Copy Rules
- **No em dashes** anywhere in visible copy — use periods, colons, or rewrite. En dashes in ranges (e.g. "3–5 Days") are fine.
- Premium, restrained tone — no fake metrics, no fake testimonials, no fake logos
- Copy is commercially strong and AI-search-friendly

## File Structure

```
src/
├── app/
│   ├── layout.tsx                root layout — Unbounded + Plus Jakarta Sans fonts, SiteHeader, SiteFooter, JSON-LD
│   ├── globals.css               design tokens + Tailwind base reset + mega menu animations
│   ├── page.tsx                  homepage
│   ├── not-found.tsx             custom 404
│   ├── opengraph-image.tsx       generated OG image for homepage
│   ├── sitemap.ts                all indexable routes
│   ├── robots.ts                 allow all, disallow /api/
│   ├── about/page.tsx            custom dark hero + stats strip + standards + team + clients
│   ├── process/page.tsx          4-step workflow + pre-submission checks + prep list
│   ├── book/page.tsx             Cal.com scheduling embed (needs real Cal.com link)
│   ├── services/
│   │   ├── page.tsx              services index — editorial row directory
│   │   └── [slug]/page.tsx       dynamic service detail (generateStaticParams from services array)
│   │   └── [slug]/opengraph-image.tsx  per-service generated OG images
│   ├── resources/
│   │   ├── page.tsx              blog/resources listing
│   │   └── [slug]/page.tsx       MDX post renderer
│   ├── portfolio/
│   │   ├── page.tsx              gated portfolio — code + request-access form
│   │   ├── portfolio-gate.tsx    client component — unlock/request UI
│   │   └── actions.ts            server actions — verify code, send access request
│   ├── contact/
│   │   ├── page.tsx              inquiry form with Cloudflare Turnstile CAPTCHA
│   │   ├── contact-form.tsx      client component — form UI
│   │   └── actions.ts            server action — Resend email delivery
│   ├── industries/page.tsx       redirect("/about")
│   ├── industries/[slug]/page.tsx redirect("/about")
│   ├── privacy-policy/page.tsx   robots: index:false
│   └── terms/page.tsx            robots: index:false
│
├── components/
│   ├── layout/
│   │   ├── site-header.tsx       sticky header — mega menu (desktop), accordion (mobile)
│   │   └── site-footer.tsx       dark charcoal 2-col footer
│   ├── sections/                 homepage section components
│   │   ├── home-hero.tsx
│   │   ├── home-trust-strip.tsx
│   │   ├── home-services.tsx
│   │   ├── home-why-us.tsx
│   │   ├── home-process.tsx
│   │   ├── home-industries.tsx
│   │   ├── home-portfolio.tsx
│   │   ├── home-testimonials.tsx
│   │   └── home-resources.tsx
│   ├── service-layouts/          one component per service layout type (33 total)
│   │   ├── process-layout.tsx
│   │   ├── visual-layout.tsx
│   │   ├── package-layout.tsx
│   │   ├── technical-layout.tsx
│   │   ├── strategy-layout.tsx
│   │   ├── feasibility-layout.tsx
│   │   ├── addition-layout.tsx
│   │   ├── conversion-layout.tsx
│   │   ├── admin-layout.tsx
│   │   ├── bid-layout.tsx
│   │   ├── outdoor-layout.tsx
│   │   ├── remodel-layout.tsx
│   │   ├── compliance-layout.tsx
│   │   ├── accessory-layout.tsx
│   │   ├── energy-layout.tsx
│   │   ├── historic-layout.tsx
│   │   ├── bim-layout.tsx
│   │   ├── zoning-layout.tsx
│   │   ├── pathway-layout.tsx
│   │   ├── assessment-layout.tsx
│   │   ├── scope-layout.tsx
│   │   ├── options-layout.tsx
│   │   ├── gap-layout.tsx
│   │   ├── demolition-layout.tsx
│   │   ├── redline-layout.tsx
│   │   ├── tenant-layout.tsx
│   │   ├── interior-layout.tsx
│   │   ├── siteplan-layout.tsx
│   │   ├── record-layout.tsx
│   │   ├── deferred-layout.tsx
│   │   ├── firesafety-layout.tsx
│   │   └── signage-layout.tsx
│   └── shared/
│       ├── button.tsx            CVA-based — variants: primary/secondary/outline/ghost, sizes: sm/md/lg
│       ├── section.tsx           Section wrapper with variant and compact props
│       ├── page-header.tsx       dark charcoal header used on interior pages
│       ├── cta-band.tsx          full-width CTA — dark/light variants, asymmetric layout
│       └── mdx-components.tsx    MDX renderer components for resources/blog posts
│
├── content/
│   ├── company.ts                single source of truth for name, email, phone, website, tagline
│   ├── homepage.ts               all homepage copy and data
│   ├── services.ts               42-service content model — ServiceLayout union type drives layout routing
│   ├── navigation.ts             navLinks + servicesMegaMenu (5 categories) + footerColumns
│   ├── team.ts                   team members array (conditionally rendered on About page)
│   ├── testimonials.ts           client testimonials
│   ├── industries.ts             industry data (used for redirects)
│   └── posts/                   MDX blog/resource articles
│       ├── what-is-a-permit-set.mdx
│       ├── adu-permit-california.mdx
│       ├── plan-check-corrections-guide.mdx
│       ├── title-24-energy-compliance-guide.mdx
│       ├── pre-application-meeting-guide.mdx
│       └── garage-conversion-adu-guide.mdx
│
└── lib/
    ├── metadata.ts               siteMetadata with metadataBase, OG, Twitter, robots defaults
    ├── json-ld.tsx               JSON-LD structured data (LocalBusiness + Service schemas)
    ├── posts.ts                  MDX post loader — reads /content/posts/*.mdx
    └── utils.ts                  cn() helper (clsx + tailwind-merge)
```

## Services (42 total)

### ServiceLayout union type
`standard | process | visual | package | technical | strategy | feasibility | addition | conversion | admin | bid | outdoor | remodel | compliance | accessory | energy | historic | bim | zoning | pathway | assessment | scope | options | gap | demolition | redline | tenant | interior | siteplan | record | deferred | firesafety | signage`

### Full service catalog

| # | Slug | Title | Category | Layout |
|---|------|-------|----------|--------|
| 1 | `architectural-drafting` | Architectural Drafting | Drawings | standard |
| 2 | `permit-set-preparation` | Permit Set Preparation | Permitting | process |
| 3 | `city-comments-response` | City Comments Response | Permitting | process |
| 4 | `structural-coordination` | Structural Coordination | Coordination | technical |
| 5 | `code-compliance-review` | Code and Compliance Review | Review | standard |
| 6 | `renderings-visualization` | Renderings and Visualization | Visualization | visual |
| 7 | `adu-permit-packages` | ADU Permit Packages | Permitting | package |
| 8 | `solar-ev-permit-packages` | Solar and EV Permit Packages | Permitting | package |
| 9 | `mep-coordination` | MEP Coordination | Coordination | technical |
| 10 | `entitlement-support` | Entitlement Support | Coordination | process |
| 11 | `pre-application-meeting-prep` | Pre-Application Meeting Prep | Coordination | process |
| 12 | `as-built-documentation` | As-Built Documentation | Drawings | standard |
| 13 | `tenant-improvement-packages` | Tenant Improvement Packages | Permitting | package |
| 14 | `digital-walkthroughs` | Digital Walkthroughs | Visualization | visual |
| 15 | `3d-staging` | 3D Staging | Visualization | visual |
| 16 | `project-strategy` | Project Strategy | Strategy | strategy |
| 17 | `feasibility-study` | Feasibility Study | Strategy | feasibility |
| 18 | `home-addition-packages` | Home Addition Packages | Permitting | addition |
| 19 | `garage-conversion-packages` | Garage Conversion Packages | Permitting | conversion |
| 20 | `construction-administration` | Construction Administration Support | Coordination | admin |
| 21 | `contractor-bid-package` | Contractor Bid Package | Drawings | bid |
| 22 | `pool-spa-permits` | Pool and Spa Permit Packages | Permitting | outdoor |
| 23 | `interior-remodel-packages` | Interior Remodel Packages | Permitting | remodel |
| 24 | `short-term-rental-permits` | Short-Term Rental Conversion Permits | Permitting | compliance |
| 25 | `accessory-structure-permits` | Accessory Structure Permits | Permitting | accessory |
| 26 | `title-24-energy-compliance` | Title 24 Energy Compliance | Permitting | energy |
| 27 | `historic-district-submissions` | Historic District Submissions | Coordination | historic |
| 28 | `bim-coordination` | BIM Coordination | Coordination | bim |
| 29 | `zoning-code-research` | Zoning Code Research | Strategy | zoning |
| 30 | `permit-pathway-analysis` | Permit Pathway Analysis | Strategy | pathway |
| 31 | `pre-purchase-assessment` | Pre-Purchase Assessment | Strategy | assessment |
| 32 | `scope-definition` | Scope Definition | Strategy | scope |
| 33 | `design-options-study` | Design Options Study | Strategy | options |
| 34 | `compliance-gap-analysis` | Compliance Gap Analysis | Strategy | gap |
| 35 | `deferred-submittal-packages` | Deferred Submittal Packages | Drawings | deferred |
| 36 | `fire-life-safety-drawings` | Fire and Life Safety Drawings | Drawings | firesafety |
| 37 | `signage-permit-drawings` | Signage Permit Drawings | Drawings | signage |
| 38 | `interior-detail-package` | Interior Detail Package | Drawings | interior |
| 39 | `site-plan-package` | Site Plan Package | Drawings | siteplan |
| 40 | `record-drawing-updates` | Record Drawing Updates | Drawings | record |
| 41 | `demolition-permit-drawings` | Demolition Permit Drawings | Drawings | demolition |
| 42 | `redline-to-cad` | Redline to CAD Conversion | Drawings | redline |

**Removed:** `virtual-design-consultation` (Strategy / consultation) — deleted from services, navigation, and slug page.

## Mega Menu

5 categories in `servicesMegaMenu` (navigation.ts): Strategy, Drawings, Permitting, Coordination, Visualization.
Header shows "View all 42 services →".
Mobile accordion uses the same `servicesMegaMenu` data.
Animations: `mega-panel-enter` (320ms expo-out) + `mega-col-enter` (380ms expo-out, staggered 35ms per column) defined in globals.css.

## Navigation Notes

- `navLinks` keys use `link.label` not `link.href` — two items share href `/about` (About + Industries)
- Industries has `activePath: "/industries"` so it never falsely highlights as active when on `/about`
- `isActive(link)` function in site-header reads `link.activePath ?? link.href`
- Mega menu dropdown state uses `openDropdown: string | null` keyed by nav label — not a shared boolean. Each nav item's dropdown is independent.

## Key Decisions Made

- **Two-font system** — Unbounded (headings) + Plus Jakarta Sans (body). Outfit removed entirely.
- **No orange dash decorators** — `<span className="inline-block h-px w-6 shrink-0 bg-secondary" />` removed site-wide. Do not add back.
- **Industries pages removed** — `/industries` and `/industries/[slug]` both redirect to `/about`
- **Portfolio is gated** — access code system + request-access form. No real photography yet.
- **Contact form wired** — Resend server action + Cloudflare Turnstile CAPTCHA (credentials in `.env.local`)
- **Legal pages not indexed** — privacy-policy and terms have `robots: { index: false }`
- **OG images generated** — `app/opengraph-image.tsx` (homepage) and `app/services/[slug]/opengraph-image.tsx` (per service)
- **JSON-LD** — LocalBusiness + Service structured data in `lib/json-ld.tsx`, rendered in root layout
- **No git push until user says so** — work stays local only

## Still Needed Before Launch

1. **Favicon** — `/public/brand/favicon.ico` and `/public/brand/apple-touch-icon.png` missing (referenced in metadata.ts, brand dir exists but files are absent)
2. **Social links** — `company.ts` has empty LinkedIn and Instagram strings — renders dead links in footer
3. **Address** — `company.ts` street and zip are blank — affects LocalBusiness JSON-LD schema
4. **Book page** — `app/book/page.tsx` has a Cal.com embed that needs the real Cal.com username/link
5. **Portfolio photography** — real project images to replace placeholder cards
6. **Legal pages** — privacy policy and terms are stubs flagged for attorney review
7. **Verify Resend + Turnstile credentials** — confirm production keys in `.env.local` before go-live
