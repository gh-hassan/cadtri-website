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
- **Font**: Outfit (Google Fonts via next/font) — single typeface, hierarchy via weight/size/tracking
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
- **Eyebrow pattern**: `<p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-secondary"><span className="inline-block h-px w-6 shrink-0 bg-secondary" aria-hidden />Label</p>`

### Global Copy Rules
- **No em dashes** anywhere in visible copy — use periods, colons, or rewrite. En dashes in ranges (e.g. "3–5 Days") are fine.
- Premium, restrained tone — no fake metrics, no fake testimonials, no fake logos
- Copy is commercially strong and AI-search-friendly

## File Structure

```
src/
├── app/
│   ├── layout.tsx              root layout — Outfit font, SiteHeader, skip link, SiteFooter
│   ├── globals.css             design tokens + Tailwind base reset + mega menu animations
│   ├── page.tsx                homepage (imports section components)
│   ├── about/page.tsx
│   ├── services/
│   │   ├── page.tsx            services index (editorial row directory)
│   │   └── [slug]/page.tsx     dynamic service detail (generateStaticParams from services array)
│   ├── process/page.tsx
│   ├── portfolio/page.tsx      placeholder project cards — real images pending
│   ├── contact/
│   │   ├── page.tsx            inquiry form with Cloudflare Turnstile CAPTCHA
│   │   ├── contact-form.tsx    client component — form UI
│   │   └── actions.ts          server action — Resend email delivery
│   ├── industries/page.tsx     redirect("/about")
│   ├── industries/[slug]/page.tsx  redirect("/about")
│   ├── privacy-policy/page.tsx robots: index:false
│   ├── terms/page.tsx          robots: index:false
│   ├── sitemap.ts              all indexable routes
│   └── robots.ts               allow all, disallow /api/
│
├── components/
│   ├── layout/
│   │   ├── site-header.tsx     sticky header — mega menu (desktop), accordion (mobile)
│   │   └── site-footer.tsx     dark charcoal 2-col footer
│   ├── sections/               homepage section components
│   │   ├── home-hero.tsx
│   │   ├── home-trust-strip.tsx
│   │   ├── home-services.tsx
│   │   ├── home-why-us.tsx
│   │   ├── home-process.tsx
│   │   ├── home-industries.tsx
│   │   └── home-portfolio.tsx
│   ├── service-layouts/        one component per service layout type
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
│   │   ├── consultation-layout.tsx
│   │   ├── energy-layout.tsx
│   │   ├── historic-layout.tsx
│   │   └── bim-layout.tsx
│   └── shared/
│       ├── button.tsx          CVA-based — variants: primary/secondary/outline/ghost, sizes: sm/md/lg
│       ├── section.tsx         Section wrapper with variant and compact props
│       ├── page-header.tsx     dark charcoal header used on all interior pages
│       └── cta-band.tsx        full-width CTA — dark/light variants, asymmetric layout
│
├── content/
│   ├── company.ts              single source of truth for name, email, website, tagline
│   ├── homepage.ts             all homepage copy and data
│   ├── services.ts             29-service content model — ServiceLayout union type drives layout routing
│   └── navigation.ts           navLinks + servicesMegaMenu (5 categories) + footerColumns
│
└── lib/
    ├── metadata.ts             siteMetadata with metadataBase, OG, Twitter, robots defaults
    └── utils.ts                cn() helper (clsx + tailwind-merge)
```

## Services (29 total)

### ServiceLayout union type
`standard | process | visual | package | technical | strategy | feasibility | addition | conversion | admin | bid | outdoor | remodel | compliance | accessory | consultation | energy | historic | bim`

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
| 13 | `digital-walkthroughs` | Digital Walkthroughs | Visualization | visual |
| 14 | `3d-staging` | 3D Staging | Visualization | visual |
| 15 | `project-strategy` | Project Strategy | Strategy | strategy |
| 16 | `feasibility-study` | Feasibility Study | Strategy | feasibility |
| 17 | `home-addition-packages` | Home Addition Packages | Permitting | addition |
| 18 | `garage-conversion-packages` | Garage Conversion Packages | Permitting | conversion |
| 19 | `construction-administration` | Construction Administration Support | Coordination | admin |
| 20 | `contractor-bid-package` | Contractor Bid Package | Drawings | bid |
| 21 | `pool-spa-permits` | Pool and Spa Permit Packages | Permitting | outdoor |
| 22 | `interior-remodel-packages` | Interior Remodel Packages | Permitting | remodel |
| 23 | `short-term-rental-permits` | Short-Term Rental Conversion Permits | Permitting | compliance |
| 24 | `accessory-structure-permits` | Accessory Structure Permits | Permitting | accessory |
| 25 | `virtual-design-consultation` | Virtual Design Consultation | Strategy | consultation |
| 26 | `title-24-energy-compliance` | Title 24 Energy Compliance | Permitting | energy |
| 27 | `historic-district-submissions` | Historic District Submissions | Coordination | historic |
| 28 | `bim-coordination` | BIM Coordination | Coordination | bim |

## Mega Menu

5 categories in `servicesMegaMenu` (navigation.ts): Strategy, Drawings, Permitting, Coordination, Visualization.
Footer strip shows "View all 29 services →" and "Request a Proposal →".
Mobile accordion uses the same `servicesMegaMenu` data.
Animations: `mega-panel-enter` (320ms expo-out) + `mega-col-enter` (380ms expo-out, staggered 35ms per column) defined in globals.css.

## Navigation Notes

- `navLinks` keys use `link.label` not `link.href` — two items share href `/about` (About + Industries)
- Industries has `activePath: "/industries"` so it never falsely highlights as active when on `/about`
- `isActive(link)` function in site-header reads `link.activePath ?? link.href`

## Key Decisions Made

- **Outfit only** — single typeface throughout; hierarchy via weight, size, and tracking
- **Industries pages removed** — `/industries` and `/industries/[slug]` both redirect to `/about`
- **Portfolio is placeholder** — 6 representative project type cards, no real photos
- **Contact form wired** — Resend server action + Cloudflare Turnstile CAPTCHA (credentials in `.env.local`)
- **Legal pages not indexed** — privacy-policy and terms have `robots: { index: false }`
- **No git push until user says so** — work stays local only

## Still Needed Before Launch

1. Add `/public/brand/favicon.ico` and `/public/brand/apple-touch-icon.png` (referenced in metadata.ts)
2. Add OG/social share image (`app/opengraph-image.png` or generated `.tsx`)
3. Replace portfolio placeholder divs with real `<Image />` when photography is available
4. Fill empty fields in `company.ts` — phone, address, social links
5. Attorney review of privacy-policy and terms pages
6. Add analytics (Plausible, Fathom, or GA4)
7. Verify Resend + Turnstile credentials are production-ready before launch
