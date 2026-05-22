# Strategy Form Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a "Get Your First Strategy Free" lead magnet form at `/strategy` with two paths — investment/pre-purchase analysis and ongoing project execution strategy — that emails rich structured inputs to CADTRI so they can manually generate and send a Claude-powered strategy to the client.

**Architecture:** New `/strategy` route modelled exactly on `/pricing` (same layout, same form pattern, same Resend email delivery). Gate screen → two 7-step paths → server action emails CADTRI + sends confirmation to client. No AI automation on submit — CADTRI manually runs inputs through Claude.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind CSS v3, Resend (`resend@^6`), lucide-react icons.

---

## Reference Files (read before each task)
- `src/app/pricing/pricing-form.tsx` — form pattern, SelectCard, OtherCard, PathCard components, gate + two-path structure
- `src/app/pricing/actions.ts` — server action pattern, email HTML helpers, confirmation email
- `src/app/pricing/layout.tsx` — minimal dark layout with CadtriLogo
- `src/app/pricing/page.tsx` — page shell with maxDuration

---

## Task 1: Route Scaffold

**Files:**
- Create: `src/app/strategy/layout.tsx`
- Create: `src/app/strategy/page.tsx`
- Create: `src/app/strategy/actions.ts` (shell only)

**Step 1: Create layout — copy pricing layout exactly**

```tsx
// src/app/strategy/layout.tsx
import { CadtriLogo } from "@/components/shared/logo";

export default function StrategyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-primary">
      <div className="shrink-0 border-b border-white/[0.07] px-8 py-5">
        <CadtriLogo variant="dark" />
      </div>
      <div className="flex min-h-0 flex-1 flex-col">
        {children}
      </div>
    </div>
  );
}
```

**Step 2: Create page shell**

```tsx
// src/app/strategy/page.tsx
import type { Metadata } from "next";
import { StrategyForm } from "./strategy-form";

export const maxDuration = 30;

export const metadata: Metadata = {
  title: "Get Your Free Project Strategy",
  description:
    "Tell us about your property or project and receive a free tailored strategy from CADTRI — whether you are evaluating an investment or need a clear execution roadmap.",
};

export default function StrategyPage() {
  return <StrategyForm />;
}
```

**Step 3: Create actions.ts shell**

```ts
// src/app/strategy/actions.ts
"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface StrategyFormData {
  path: "investment" | "project" | "";

  // Investment path
  city:             string;
  state:            string;
  lotSize:          string;
  propertyType:     string;
  alreadyPurchased: string;
  zoning:           string;
  overlays:         string[];
  investmentGoal:   string;
  investmentHorizon: string;
  totalBudget:      string;
  buildingIntent:   string;
  experienceLevel:  string;
  knownIssues:      string;
  biggestQuestion:  string;

  // Ongoing project path
  projectType:      string;
  projectLocation:  string;
  projectSqFt:      string;
  projectBudget:    string;
  currentStage:     string;
  hasDrawings:      string;
  hasArchitect:     string;
  hasContractor:    string;
  hasPermits:       string;
  mainChallenge:    string;
  targetDate:       string;
  hardDeadline:     string;
  teamComposition:  string[];
  needsMost:        string;

  // Common
  name:  string;
  email: string;
  phone: string;
  notes: string;
}

export type StrategyFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitStrategyForm(formData: FormData): Promise<StrategyFormState> {
  // Implement in Task 7
  return { status: "error", message: "Not yet implemented." };
}
```

**Step 4: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```
Expected: no errors.

**Step 5: Commit**

```bash
git add src/app/strategy/
git commit -m "feat: scaffold /strategy route with layout, page, and actions shell"
```

---

## Task 2: Investment Path — Steps 1–4 (Property + Zoning + Goal + Budget)

**Files:**
- Create: `src/app/strategy/strategy-form.tsx` (starts here, added to across tasks)

**Step 1: Create strategy-form.tsx with all constants, state, and investment steps 1–4**

```tsx
// src/app/strategy/strategy-form.tsx
"use client";

import { useState, useRef, useCallback } from "react";
import {
  ArrowLeft, Check, CheckCircle, Paperclip, X,
  Home, Building2, Warehouse, LayoutDashboard, Building,
  TrendingUp, DollarSign, CalendarDays, HelpCircle,
  Zap, Clock, MapPin, Users, Lightbulb, Layers,
  FileText, FileCheck, HardHat, PenTool, AlertCircle,
  CheckSquare, Target, Briefcase,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { submitStrategyForm, type StrategyFormData } from "./actions";

// ─── Constants ────────────────────────────────────────────────────────────────

const PROPERTY_TYPES = [
  { label: "Single Family Home",   icon: Home },
  { label: "Duplex or Triplex",    icon: Building },
  { label: "Multi-Family (4+)",    icon: Building2 },
  { label: "Vacant Lot",          icon: MapPin },
  { label: "Commercial Property", icon: Briefcase },
  { label: "Mixed-Use",           icon: Layers },
];

const OVERLAY_OPTIONS = [
  "HOA Restrictions",
  "Historic District",
  "Coastal Zone",
  "Flood Zone",
  "Fire Hazard Zone",
  "None that I know of",
];

const INVESTMENT_GOALS = [
  { label: "Maximize Rental Income",       sub: "Long-term tenants, monthly cash flow",        icon: DollarSign },
  { label: "Maximize Resale Value",         sub: "Build equity, sell for profit",               icon: TrendingUp },
  { label: "Short-Term Rental (Airbnb)",    sub: "Vacation or furnished rental income",         icon: CalendarDays },
  { label: "Personal Use with Income",      sub: "Live in part, rent the rest",                 icon: Home },
];

const INVESTMENT_HORIZONS = [
  { label: "2 to 3 years",     icon: Zap },
  { label: "5 to 10 years",    icon: Clock },
  { label: "20+ years",        icon: CalendarDays },
  { label: "Not sure yet",     icon: HelpCircle },
];

const BUILDING_INTENTS = [
  { label: "Add an ADU",                  sub: "Accessory dwelling unit",          icon: Warehouse },
  { label: "Build an Addition",           sub: "Expand the main structure",        icon: Home },
  { label: "Ground-Up New Construction",  sub: "Build from scratch on vacant lot", icon: Building2 },
  { label: "Convert Existing Space",      sub: "Garage, basement, or attic",       icon: LayoutDashboard },
  { label: "Multi-Unit Development",      sub: "Duplex, triplex, or more",         icon: Building },
  { label: "Not sure — need guidance",    sub: "Tell me what makes the most sense",icon: HelpCircle },
];

const EXPERIENCE_LEVELS = [
  { label: "First-time investor",       icon: Lightbulb },
  { label: "A few projects done",       icon: CheckSquare },
  { label: "Experienced developer",     icon: TrendingUp },
];

const BIGGEST_QUESTIONS = [
  { label: "What can I actually build here?",      icon: HelpCircle },
  { label: "Will this cash flow?",                 icon: DollarSign },
  { label: "How long will permits take?",          icon: Clock },
  { label: "Is this worth buying at all?",         icon: AlertCircle },
  { label: "What is the full cost to develop?",   icon: Building2 },
  { label: "All of the above",                     icon: Target },
];

// ─── Ongoing project constants ────────────────────────────────────────────────

const PROJECT_TYPES = [
  { label: "ADU",                       icon: Warehouse },
  { label: "Home Addition",             icon: Home },
  { label: "Garage Conversion",         icon: LayoutDashboard },
  { label: "New Construction",          icon: Building2 },
  { label: "Interior Remodel",          icon: Layers },
  { label: "Tenant Improvement",        icon: Briefcase },
  { label: "Multi-Family Development",  icon: Building },
];

const CURRENT_STAGES = [
  { label: "Just starting out",                      sub: "No drawings, no team yet",                icon: Lightbulb },
  { label: "Designer working on drawings",           sub: "Design phase in progress",                icon: PenTool },
  { label: "Drawings done, about to submit",         sub: "Ready to go to the city",                 icon: FileText },
  { label: "Permits submitted — in plan check",      sub: "Waiting on city review",                  icon: Clock },
  { label: "Received plan check corrections",        sub: "City sent back comments",                 icon: AlertCircle },
  { label: "Permits approved — finding contractor",  sub: "Ready to break ground",                   icon: CheckSquare },
  { label: "Under construction",                     sub: "Build is active",                         icon: HardHat },
  { label: "Construction stalled",                   sub: "Project hit a wall",                      icon: AlertCircle },
];

const MAIN_CHALLENGES = [
  { label: "Don't know where to start",           icon: HelpCircle },
  { label: "Stuck in plan check corrections",     icon: AlertCircle },
  { label: "Can't find a reliable contractor",    icon: HardHat },
  { label: "Over budget",                         icon: DollarSign },
  { label: "Behind schedule",                     icon: Clock },
  { label: "Design is not finalized",             icon: PenTool },
  { label: "Unclear on city requirements",        icon: FileCheck },
  { label: "Team not communicating well",         icon: Users },
];

const NEEDS_MOST = [
  { label: "A step-by-step execution roadmap",   icon: Target },
  { label: "How to speed the project up",        icon: Zap },
  { label: "How to cut costs",                   icon: DollarSign },
  { label: "How to handle plan check",           icon: FileCheck },
  { label: "How to manage my contractor",        icon: HardHat },
  { label: "All of the above",                   icon: Layers },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const inputClass =
  "w-full border border-white/25 bg-white/10 px-4 py-3.5 text-sm font-light text-white " +
  "placeholder:text-white/40 focus:border-secondary focus:bg-white/[0.14] focus:outline-none " +
  "transition-all duration-150 rounded-none";

const INITIAL_DATA: StrategyFormData = {
  path: "",
  city: "", state: "", lotSize: "", propertyType: "",
  alreadyPurchased: "", zoning: "", overlays: [],
  investmentGoal: "", investmentHorizon: "", totalBudget: "",
  buildingIntent: "", experienceLevel: "", knownIssues: "", biggestQuestion: "",
  projectType: "", projectLocation: "", projectSqFt: "", projectBudget: "",
  currentStage: "", hasDrawings: "", hasArchitect: "", hasContractor: "",
  hasPermits: "", mainChallenge: "", targetDate: "", hardDeadline: "",
  teamComposition: [], needsMost: "",
  name: "", email: "", phone: "", notes: "",
};

// ─── Component ────────────────────────────────────────────────────────────────

export function StrategyForm() {
  const [step, setStep]               = useState(1);
  const [submitting, setSubmitting]   = useState(false);
  const [done, setDone]               = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [file, setFile]               = useState<File | null>(null);
  const fileRef                       = useRef<HTMLInputElement>(null);
  const [data, setData]               = useState<StrategyFormData>(INITIAL_DATA);

  const TOTAL_STEPS = data.path === "investment" ? 7 : 7;
  const progress    = Math.round(((step - 1) / TOTAL_STEPS) * 100);

  const set = useCallback(<K extends keyof StrategyFormData>(key: K, val: StrategyFormData[K]) => {
    setData(d => ({ ...d, [key]: val }));
  }, []);

  const pick = useCallback((key: keyof StrategyFormData, val: string, nextStep: number) => {
    setTimeout(() => { setData(d => ({ ...d, [key]: val })); setStep(nextStep); }, 180);
  }, []);

  const goBack = useCallback(() => {
    if (step > 1) setStep(s => s - 1);
    else setData(d => ({ ...d, path: "" }));
  }, [step]);

  const handleSubmit = async () => {
    if (!data.name.trim() || !data.email.trim()) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const fd = new FormData();
      fd.append("data", JSON.stringify(data));
      if (file) fd.append("file", file);
      const result = await submitStrategyForm(fd);
      if (result.status === "success") setDone(true);
      else setSubmitError(result.message ?? "Something went wrong. Please try again.");
    } catch {
      setSubmitError("Something went wrong. Please email us directly at info@cadtri.com.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success ──
  if (done) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-8 py-20 text-center">
        <CheckCircle size={44} strokeWidth={1.5} className="mb-8 text-secondary" />
        <h2 className="mb-5 font-bold text-white" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.03em" }}>
          Strategy request received.
        </h2>
        <p className="max-w-md text-base font-light leading-relaxed text-white/50">
          We will review your details and send your tailored strategy within two business days.
        </p>
        <p className="mt-8 text-xs text-white/30">
          Questions? Email{" "}
          <a href="mailto:info@cadtri.com" className="text-secondary hover:underline">info@cadtri.com</a>
        </p>
      </div>
    );
  }

  // ── Gate ──
  if (!data.path) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-8 py-16 lg:py-24">
        <p className="mb-6 text-[11px] font-medium uppercase tracking-widest text-secondary">
          Free Strategy
        </p>
        <h2 className="mb-5 text-center font-bold text-white" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.03em", lineHeight: 1.08 }}>
          What are you working on?
        </h2>
        <p className="mb-12 max-w-lg text-center text-sm font-light leading-relaxed text-white/40">
          Tell us about your situation and we will send you a free tailored strategy — no commitment, no sales pitch.
        </p>
        <div className="grid w-full max-w-2xl gap-5 sm:grid-cols-2">
          <PathCard
            icon={TrendingUp}
            label="I am evaluating a property"
            sub="Thinking about buying or already own a property and want to know how to maximize its value."
            onClick={() => { set("path", "investment"); setStep(1); }}
          />
          <PathCard
            icon={HardHat}
            label="I have an active project"
            sub="Currently designing, permitting, or building and need a clear roadmap to get it done efficiently."
            onClick={() => { set("path", "project"); setStep(1); }}
          />
        </div>
      </div>
    );
  }

  // ── Progress bar ──
  const ProgressBar = () => (
    <div className="h-[3px] w-full bg-white/[0.08]">
      <div className="h-full bg-secondary transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
    </div>
  );

  const BackButton = ({ wide }: { wide?: boolean }) => (
    <button type="button" onClick={goBack}
      className={cn("flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-white/30 transition-colors hover:text-white/70",
        wide ? "" : "mt-10 lg:absolute lg:bottom-14 lg:left-14 lg:mt-0")}>
      <ArrowLeft size={12} strokeWidth={2} />Back
    </button>
  );

  // ═══════════════════════════════════════════════════════
  // INVESTMENT PATH
  // ═══════════════════════════════════════════════════════
  if (data.path === "investment") {
    const isWide = step >= 5;

    const STEP_META: Record<number, { q: string; desc: string }> = {
      1: { q: "Where is the property?",         desc: "Location determines zoning laws, ADU eligibility, permit timelines, and local market conditions." },
      2: { q: "What is on the property now?",    desc: "The existing structure and lot size determine what can realistically be built and what approvals are needed." },
      3: { q: "What is your main goal?",         desc: "Your investment objective shapes everything — what to build, how to finance it, and what the exit looks like." },
      4: { q: "What is your investment horizon?", desc: "Short-term and long-term strategies look very different. This helps us recommend the right development approach." },
    };
    const meta = STEP_META[step];

    return (
      <div className="flex flex-1 flex-col">
        <ProgressBar />
        {!isWide ? (
          <div className="flex flex-1 flex-col lg:flex-row lg:items-stretch">
            {/* Left panel */}
            <div className="relative flex flex-col border-b border-white/[0.06] px-8 pb-10 pt-12 lg:w-[38%] lg:border-b-0 lg:border-r lg:px-14 lg:pb-20 lg:pt-16">
              <div>
                <p className="mb-5 text-[11px] font-medium uppercase tracking-widest text-secondary">Step {step} of {TOTAL_STEPS}</p>
                <h2 className="font-bold text-white" style={{ fontSize: "clamp(1.75rem, 2.8vw, 2.75rem)", letterSpacing: "-0.03em", lineHeight: 1.06 }}>
                  {meta?.q}
                </h2>
                <p className="mt-5 text-sm font-light leading-relaxed text-white/40">{meta?.desc}</p>
              </div>
              <BackButton />
            </div>

            {/* Right panel */}
            <div className="flex flex-1 flex-col overflow-y-auto px-8 pb-10 pt-12 lg:px-14 lg:pb-20 lg:pt-16">

              {/* Step 1: Location */}
              {step === 1 && (
                <div className="animate-in flex flex-col gap-5 max-w-lg">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold uppercase tracking-widest text-white/55">City <span className="text-secondary">*</span></label>
                      <input type="text" value={data.city} onChange={e => set("city", e.target.value)} placeholder="e.g. Los Angeles" className={inputClass} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold uppercase tracking-widest text-white/55">State <span className="text-secondary">*</span></label>
                      <input type="text" value={data.state} onChange={e => set("state", e.target.value)} placeholder="e.g. California" className={inputClass} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-widest text-white/55">
                      Already purchased? <span className="text-white/30 font-light normal-case tracking-normal">or still evaluating</span>
                    </label>
                    <div className="flex gap-3">
                      {["Already purchased", "Still evaluating"].map(opt => (
                        <button key={opt} type="button" onClick={() => set("alreadyPurchased", opt)}
                          className={cn("flex-1 border px-4 py-3 text-sm font-medium transition-all", data.alreadyPurchased === opt ? "border-secondary bg-secondary/10 text-secondary" : "border-white/15 bg-white/[0.04] text-white hover:border-white/30")}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button type="button" disabled={data.city.trim().length < 2 || data.state.trim().length < 2}
                    onClick={() => setStep(2)}
                    className={cn("mt-4 px-12 py-4 text-sm font-semibold uppercase tracking-widest transition-all",
                      data.city.trim().length >= 2 && data.state.trim().length >= 2 ? "bg-secondary text-white hover:bg-secondary/90" : "bg-white/[0.06] text-white/20 cursor-not-allowed")}>
                    Continue
                  </button>
                </div>
              )}

              {/* Step 2: Property type */}
              {step === 2 && (
                <div className="animate-in flex flex-col gap-3">
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {PROPERTY_TYPES.map(({ label, icon }) => (
                      <SelectCard key={label} label={label} icon={icon} selected={data.propertyType === label}
                        onClick={() => pick("propertyType", label, 3)} />
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Investment goal */}
              {step === 3 && (
                <div className="animate-in flex flex-col gap-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {INVESTMENT_GOALS.map(({ label, sub, icon }) => (
                      <SelectCard key={label} label={label} sub={sub} icon={icon} selected={data.investmentGoal === label}
                        onClick={() => pick("investmentGoal", label, 4)} />
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Horizon */}
              {step === 4 && (
                <div className="animate-in flex flex-col gap-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {INVESTMENT_HORIZONS.map(({ label, icon }) => (
                      <SelectCard key={label} label={label} icon={icon} selected={data.investmentHorizon === label}
                        onClick={() => pick("investmentHorizon", label, 5)} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Wide layout — steps 5–7 */
          <div className="flex flex-1 flex-col overflow-y-auto px-8 pb-16 pt-12 sm:px-12 lg:px-20 lg:pt-16">
            <div className="mb-10 flex items-center justify-between">
              <BackButton wide />
              <span className="text-[11px] tabular-nums tracking-widest text-white/25">{step} / {TOTAL_STEPS}</span>
            </div>
            <div className="w-full max-w-3xl">

              {/* Step 5: Building intent + budget */}
              {step === 5 && (
                <div className="animate-in">
                  <StepLabel n={5} />
                  <Question>What are you thinking of building?</Question>
                  <p className="mb-8 text-sm font-light text-white/40">Choose the option closest to your plan. Not sure is a valid answer.</p>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-10">
                    {BUILDING_INTENTS.map(({ label, sub, icon }) => (
                      <SelectCard key={label} label={label} sub={sub} icon={icon} selected={data.buildingIntent === label}
                        onClick={() => set("buildingIntent", label)} />
                    ))}
                  </div>
                  <div className="flex flex-col gap-2 max-w-sm">
                    <label className="text-xs font-semibold uppercase tracking-widest text-white/55">
                      Total budget (purchase + construction) <span className="text-white/30 font-light normal-case tracking-normal">optional</span>
                    </label>
                    <input type="text" value={data.totalBudget} onChange={e => set("totalBudget", e.target.value)}
                      placeholder="e.g. $800,000 or $1.2M" className={inputClass} />
                  </div>
                  <button type="button" disabled={!data.buildingIntent} onClick={() => setStep(6)}
                    className={cn("mt-8 px-12 py-4 text-sm font-semibold uppercase tracking-widest transition-all",
                      data.buildingIntent ? "bg-secondary text-white hover:bg-secondary/90" : "bg-white/[0.06] text-white/20 cursor-not-allowed")}>
                    Continue
                  </button>
                </div>
              )}

              {/* Step 6: Experience + situation */}
              {step === 6 && (
                <div className="animate-in">
                  <StepLabel n={6} />
                  <Question>A little about your experience.</Question>
                  <p className="mb-8 text-sm font-light text-white/40">This helps us calibrate how detailed the strategy should be.</p>
                  <div className="grid gap-3 sm:grid-cols-3 mb-10">
                    {EXPERIENCE_LEVELS.map(({ label, icon }) => (
                      <SelectCard key={label} label={label} icon={icon} selected={data.experienceLevel === label}
                        onClick={() => set("experienceLevel", label)} />
                    ))}
                  </div>
                  <div className="flex flex-col gap-2 max-w-2xl mb-6">
                    <label className="text-xs font-semibold uppercase tracking-widest text-white/55">
                      Any known issues with the property? <span className="text-white/30 font-light normal-case tracking-normal">optional</span>
                    </label>
                    <input type="text" value={data.knownIssues} onChange={e => set("knownIssues", e.target.value)}
                      placeholder="e.g. unpermitted addition, HOA restrictions, flood zone" className={inputClass} />
                  </div>
                  <button type="button" disabled={!data.experienceLevel} onClick={() => setStep(7)}
                    className={cn("mt-4 px-12 py-4 text-sm font-semibold uppercase tracking-widest transition-all",
                      data.experienceLevel ? "bg-secondary text-white hover:bg-secondary/90" : "bg-white/[0.06] text-white/20 cursor-not-allowed")}>
                    Continue
                  </button>
                </div>
              )}

              {/* Step 7: Biggest question + contact */}
              {step === 7 && (
                <div className="animate-in">
                  <StepLabel n={7} label="Last step" />
                  <Question>What do you most need answered?</Question>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-10">
                    {BIGGEST_QUESTIONS.map(({ label, icon }) => (
                      <SelectCard key={label} label={label} icon={icon} selected={data.biggestQuestion === label}
                        onClick={() => set("biggestQuestion", label)} />
                    ))}
                  </div>
                  <ContactFields data={data} set={set} submitError={submitError} submitting={submitting}
                    file={file} setFile={setFile} fileRef={fileRef} onSubmit={handleSubmit}
                    submitLabel="Get My Free Strategy" />
                </div>
              )}

            </div>
          </div>
        )}
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════
  // ONGOING PROJECT PATH — placeholder, implemented in Task 3
  // ═══════════════════════════════════════════════════════
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-white/40 text-sm">
      Project path — coming in Task 3
    </div>
  );
}
```

**Step 2: Add sub-components at the bottom of strategy-form.tsx**

```tsx
// Append to strategy-form.tsx

function StepLabel({ n, label }: { n: number; label?: string }) {
  return <p className="mb-3 text-[11px] font-medium uppercase tracking-widest text-secondary">{label ?? `Step ${n}`}</p>;
}

function Question({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-10 font-bold text-white" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
      {children}
    </h2>
  );
}

function SelectCard({ label, sub, selected, onClick, icon: Icon }: {
  label: string; sub?: string; selected: boolean; onClick: () => void; icon?: LucideIcon;
}) {
  return (
    <button type="button" onClick={onClick}
      className={cn("group relative w-full border rounded-2xl px-5 py-6 min-h-[140px] flex flex-col items-center justify-center gap-4 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary",
        selected ? "border-secondary bg-secondary/10" : "border-white/15 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.08]")}>
      <span className={cn("absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full border transition-all duration-150",
        selected ? "border-secondary bg-secondary" : "border-white/20 group-hover:border-white/45")}>
        {selected && <Check size={10} strokeWidth={3} className="text-white" />}
      </span>
      <div className={cn("transition-colors duration-200", selected ? "text-white/50" : "text-white/20 group-hover:text-white/35")}>
        {Icon ? <Icon size={40} strokeWidth={1.25} /> : <div className="h-10 w-10" />}
      </div>
      <div className="text-center">
        <p className={cn("text-base font-semibold leading-snug transition-colors duration-150", selected ? "text-secondary" : "text-white")}>{label}</p>
        {sub && <p className="mt-1.5 text-sm font-light leading-relaxed text-white/40">{sub}</p>}
      </div>
    </button>
  );
}

function PathCard({ icon: Icon, label, sub, onClick }: { icon: LucideIcon; label: string; sub: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}
      className={cn("group relative w-full rounded-2xl border border-white/15 bg-white/[0.04] px-8 py-10 flex flex-col items-start gap-5 text-left transition-all duration-200 hover:border-secondary/50 hover:bg-white/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary")}>
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-white/40 transition-colors group-hover:border-secondary/30 group-hover:text-secondary/70">
        <Icon size={22} strokeWidth={1.5} />
      </div>
      <div>
        <p className="text-lg font-semibold leading-snug text-white transition-colors group-hover:text-secondary">{label}</p>
        <p className="mt-2 text-sm font-light leading-relaxed text-white/40">{sub}</p>
      </div>
      <ArrowLeft size={16} strokeWidth={2} className="absolute right-6 top-1/2 -translate-y-1/2 rotate-180 text-white/20 transition-all duration-200 group-hover:translate-x-1 group-hover:text-secondary/60" />
    </button>
  );
}

function ContactFields({ data, set, submitError, submitting, file, setFile, fileRef, onSubmit, submitLabel }: {
  data: StrategyFormData;
  set: <K extends keyof StrategyFormData>(key: K, val: StrategyFormData[K]) => void;
  submitError: string;
  submitting: boolean;
  file: File | null;
  setFile: (f: File | null) => void;
  fileRef: React.RefObject<HTMLInputElement | null>;
  onSubmit: () => void;
  submitLabel?: string;
}) {
  const inputClass = "w-full border border-white/25 bg-white/10 px-4 py-3.5 text-sm font-light text-white placeholder:text-white/40 focus:border-secondary focus:bg-white/[0.14] focus:outline-none transition-all duration-150 rounded-none";
  return (
    <div className="flex flex-col gap-5 max-w-2xl">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-white/55">Full Name <span className="text-secondary">*</span></label>
          <input type="text" value={data.name} onChange={e => set("name", e.target.value)} placeholder="Your name" className={inputClass} />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-white/55">Email Address <span className="text-secondary">*</span></label>
          <input type="email" value={data.email} onChange={e => set("email", e.target.value)} placeholder="you@company.com" className={inputClass} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-widest text-white/55">Phone <span className="text-white/30 font-light normal-case tracking-normal">optional</span></label>
        <input type="tel" value={data.phone} onChange={e => set("phone", e.target.value)} placeholder="(555) 000-0000" className={inputClass} />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-widest text-white/55">Anything else we should know? <span className="text-white/30 font-light normal-case tracking-normal">optional</span></label>
        <textarea value={data.notes} onChange={e => set("notes", e.target.value)} rows={3}
          placeholder="Property address, specific constraints, questions for us"
          className={cn(inputClass, "resize-none")} />
      </div>
      {/* File upload */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-widest text-white/55">
          Attach a document <span className="text-white/30 font-light normal-case tracking-normal">optional, max 10 MB</span>
        </label>
        {file ? (
          <div className="flex items-center justify-between border border-white/20 bg-white/[0.06] px-4 py-3">
            <div className="flex items-center gap-3 min-w-0">
              <Paperclip size={13} strokeWidth={1.5} className="shrink-0 text-secondary" />
              <span className="truncate text-sm font-light text-white/70">{file.name}</span>
              <span className="shrink-0 text-xs text-white/30">{(file.size / 1024 / 1024).toFixed(1)} MB</span>
            </div>
            <button type="button" onClick={() => setFile(null)} className="ml-3 shrink-0 text-white/30 hover:text-white/70"><X size={14} strokeWidth={2} /></button>
          </div>
        ) : (
          <button type="button" onClick={() => fileRef.current?.click()}
            className="flex items-center gap-3 border border-dashed border-white/20 bg-white/[0.03] px-4 py-4 text-sm font-light text-white/40 hover:border-white/35 hover:bg-white/[0.06] hover:text-white/60 transition-all">
            <Paperclip size={14} strokeWidth={1.5} className="shrink-0" />
            Click to attach drawings, plans, or reference documents
          </button>
        )}
        <input ref={fileRef} type="file" accept=".pdf,.dwg,.dxf,.png,.jpg,.jpeg,.doc,.docx" className="hidden"
          onChange={e => {
            const f = e.target.files?.[0] ?? null;
            if (f && f.size > 10 * 1024 * 1024) { setFile(null); return; }
            setFile(f);
          }} />
      </div>
      {submitError && <p className="border-l-2 border-secondary pl-4 text-sm font-light text-white/70">{submitError}</p>}
      <button type="button" disabled={!data.name.trim() || !data.email.trim() || submitting} onClick={onSubmit}
        className={cn("py-4 text-sm font-semibold uppercase tracking-widest transition-all duration-200",
          data.name.trim() && data.email.trim() && !submitting ? "bg-secondary text-white hover:bg-secondary/90" : "bg-white/[0.06] text-white/20 cursor-not-allowed")}>
        {submitting ? "Sending..." : (submitLabel ?? "Send")}
      </button>
      <p className="text-center text-xs font-light text-white/25">No spam. We use this only to send your strategy.</p>
    </div>
  );
}
```

**Step 3: TypeScript check**
```bash
npx tsc --noEmit
```
Expected: no errors.

**Step 4: Commit**
```bash
git add src/app/strategy/strategy-form.tsx
git commit -m "feat: strategy form — investment path steps 1-7 + shared sub-components"
```

---

## Task 3: Ongoing Project Path — All 7 Steps

**Files:**
- Modify: `src/app/strategy/strategy-form.tsx` — replace the project path placeholder

**Step 1: Replace the project path placeholder with the full implementation**

Find the comment `// ONGOING PROJECT PATH — placeholder` and replace the entire `return` block with:

```tsx
  // ═══════════════════════════════════════════════════════
  // ONGOING PROJECT PATH
  // ═══════════════════════════════════════════════════════
  // data.path === "project"
  const isProjectWide = step >= 4;

  const PROJECT_STEP_META: Record<number, { q: string; desc: string }> = {
    1: { q: "What type of project?",      desc: "Project type and location shape the entire permit process and execution timeline." },
    2: { q: "Where are you right now?",   desc: "Your current stage determines what comes next and where the biggest leverage points are." },
    3: { q: "What do you have in place?", desc: "Knowing what exists helps us identify gaps and the fastest path forward." },
  };
  const projMeta = PROJECT_STEP_META[step];

  return (
    <div className="flex flex-1 flex-col">
      <ProgressBar />
      {!isProjectWide ? (
        <div className="flex flex-1 flex-col lg:flex-row lg:items-stretch">
          <div className="relative flex flex-col border-b border-white/[0.06] px-8 pb-10 pt-12 lg:w-[38%] lg:border-b-0 lg:border-r lg:px-14 lg:pb-20 lg:pt-16">
            <div>
              <p className="mb-5 text-[11px] font-medium uppercase tracking-widest text-secondary">Step {step} of {TOTAL_STEPS}</p>
              <h2 className="font-bold text-white" style={{ fontSize: "clamp(1.75rem, 2.8vw, 2.75rem)", letterSpacing: "-0.03em", lineHeight: 1.06 }}>
                {projMeta?.q}
              </h2>
              <p className="mt-5 text-sm font-light leading-relaxed text-white/40">{projMeta?.desc}</p>
            </div>
            <BackButton />
          </div>

          <div className="flex flex-1 flex-col overflow-y-auto px-8 pb-10 pt-12 lg:px-14 lg:pb-20 lg:pt-16">

            {/* Step 1: Project type + location */}
            {step === 1 && (
              <div className="animate-in flex flex-col gap-8">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {PROJECT_TYPES.map(({ label, icon }) => (
                    <SelectCard key={label} label={label} icon={icon} selected={data.projectType === label}
                      onClick={() => set("projectType", label)} />
                  ))}
                </div>
                <div className="grid gap-4 sm:grid-cols-2 max-w-lg">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-widest text-white/55">City <span className="text-secondary">*</span></label>
                    <input type="text" value={data.projectLocation.split(",")[0]?.trim() ?? ""}
                      onChange={e => set("projectLocation", e.target.value + (data.projectLocation.includes(",") ? "," + data.projectLocation.split(",").slice(1).join(",") : ""))}
                      placeholder="e.g. San Diego" className={inputClass} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-widest text-white/55">State <span className="text-secondary">*</span></label>
                    <input type="text" value={data.projectLocation.split(",")[1]?.trim() ?? ""}
                      onChange={e => set("projectLocation", (data.projectLocation.split(",")[0] ?? "") + ", " + e.target.value)}
                      placeholder="e.g. California" className={inputClass} />
                  </div>
                </div>
                <button type="button"
                  disabled={!data.projectType || data.projectLocation.replace(",","").trim().length < 4}
                  onClick={() => setStep(2)}
                  className={cn("px-12 py-4 text-sm font-semibold uppercase tracking-widest transition-all max-w-xs",
                    data.projectType && data.projectLocation.replace(",","").trim().length >= 4 ? "bg-secondary text-white hover:bg-secondary/90" : "bg-white/[0.06] text-white/20 cursor-not-allowed")}>
                  Continue
                </button>
              </div>
            )}

            {/* Step 2: Current stage */}
            {step === 2 && (
              <div className="animate-in flex flex-col gap-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  {CURRENT_STAGES.map(({ label, sub, icon }) => (
                    <SelectCard key={label} label={label} sub={sub} icon={icon} selected={data.currentStage === label}
                      onClick={() => pick("currentStage", label, 3)} />
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: What they have */}
            {step === 3 && (
              <div className="animate-in flex flex-col gap-6 max-w-lg">
                <p className="text-sm font-light text-white/40">Check everything that applies to your project right now.</p>
                {[
                  { key: "hasDrawings" as const,   label: "Architectural drawings",         yes: "Complete", no: "Not yet" },
                  { key: "hasArchitect" as const,  label: "Architect or designer hired",    yes: "Yes", no: "No" },
                  { key: "hasContractor" as const, label: "General contractor selected",    yes: "Yes", no: "No" },
                  { key: "hasPermits" as const,    label: "Permits submitted or approved",  yes: "Yes", no: "No" },
                ].map(({ key, label, yes, no }) => (
                  <div key={key} className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                    <p className="text-sm font-medium text-white/70">{label}</p>
                    <div className="flex gap-2">
                      {[yes, no].map(opt => (
                        <button key={opt} type="button" onClick={() => set(key, opt)}
                          className={cn("px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all",
                            data[key] === opt ? "bg-secondary text-white" : "border border-white/15 text-white/40 hover:border-white/30 hover:text-white/70")}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                <button type="button" onClick={() => setStep(4)}
                  className="mt-4 px-12 py-4 text-sm font-semibold uppercase tracking-widest bg-secondary text-white hover:bg-secondary/90 transition-all max-w-xs">
                  Continue
                </button>
              </div>
            )}

          </div>
        </div>
      ) : (
        /* Wide layout — steps 4–7 */
        <div className="flex flex-1 flex-col overflow-y-auto px-8 pb-16 pt-12 sm:px-12 lg:px-20 lg:pt-16">
          <div className="mb-10 flex items-center justify-between">
            <BackButton wide />
            <span className="text-[11px] tabular-nums tracking-widest text-white/25">{step} / {TOTAL_STEPS}</span>
          </div>
          <div className="w-full max-w-3xl">

            {/* Step 4: Main challenge */}
            {step === 4 && (
              <div className="animate-in">
                <StepLabel n={4} />
                <Question>What is the main challenge right now?</Question>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-8">
                  {MAIN_CHALLENGES.map(({ label, icon }) => (
                    <SelectCard key={label} label={label} icon={icon} selected={data.mainChallenge === label}
                      onClick={() => set("mainChallenge", label)} />
                  ))}
                </div>
                <button type="button" disabled={!data.mainChallenge} onClick={() => setStep(5)}
                  className={cn("px-12 py-4 text-sm font-semibold uppercase tracking-widest transition-all",
                    data.mainChallenge ? "bg-secondary text-white hover:bg-secondary/90" : "bg-white/[0.06] text-white/20 cursor-not-allowed")}>
                  Continue
                </button>
              </div>
            )}

            {/* Step 5: Timeline */}
            {step === 5 && (
              <div className="animate-in">
                <StepLabel n={5} />
                <Question>What is your target completion date?</Question>
                <p className="mb-8 text-sm font-light text-white/40">Approximate is fine. If there is a hard deadline, tell us below.</p>
                <div className="flex flex-col gap-5 max-w-sm">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-widest text-white/55">Target completion</label>
                    <input type="text" value={data.targetDate} onChange={e => set("targetDate", e.target.value)}
                      placeholder="e.g. End of 2026, or March 2027" className={inputClass} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-widest text-white/55">
                      Hard deadline? <span className="text-white/30 font-light normal-case tracking-normal">optional</span>
                    </label>
                    <input type="text" value={data.hardDeadline} onChange={e => set("hardDeadline", e.target.value)}
                      placeholder="e.g. Lease expires June 2026, escrow close" className={inputClass} />
                  </div>
                </div>
                <button type="button" disabled={!data.targetDate.trim()} onClick={() => setStep(6)}
                  className={cn("mt-8 px-12 py-4 text-sm font-semibold uppercase tracking-widest transition-all",
                    data.targetDate.trim() ? "bg-secondary text-white hover:bg-secondary/90" : "bg-white/[0.06] text-white/20 cursor-not-allowed")}>
                  Continue
                </button>
              </div>
            )}

            {/* Step 6: What they need most */}
            {step === 6 && (
              <div className="animate-in">
                <StepLabel n={6} />
                <Question>What do you need most from this strategy?</Question>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-8">
                  {NEEDS_MOST.map(({ label, icon }) => (
                    <SelectCard key={label} label={label} icon={icon} selected={data.needsMost === label}
                      onClick={() => set("needsMost", label)} />
                  ))}
                </div>
                <button type="button" disabled={!data.needsMost} onClick={() => setStep(7)}
                  className={cn("px-12 py-4 text-sm font-semibold uppercase tracking-widest transition-all",
                    data.needsMost ? "bg-secondary text-white hover:bg-secondary/90" : "bg-white/[0.06] text-white/20 cursor-not-allowed")}>
                  Continue
                </button>
              </div>
            )}

            {/* Step 7: Contact */}
            {step === 7 && (
              <div className="animate-in">
                <StepLabel n={7} label="Last step" />
                <Question>Where should we send your strategy?</Question>
                <p className="mb-8 text-sm font-light text-white/40">
                  We will review your project details and send a tailored strategy within two business days.
                </p>
                <ContactFields data={data} set={set} submitError={submitError} submitting={submitting}
                  file={file} setFile={setFile} fileRef={fileRef} onSubmit={handleSubmit}
                  submitLabel="Get My Free Strategy" />
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
```

**Step 2: TypeScript check**
```bash
npx tsc --noEmit
```

**Step 3: Commit**
```bash
git add src/app/strategy/strategy-form.tsx
git commit -m "feat: strategy form — ongoing project path steps 1-7"
```

---

## Task 4: Server Action — CADTRI Email + User Confirmation

**Files:**
- Modify: `src/app/strategy/actions.ts` — replace placeholder with full implementation

**Step 1: Replace actions.ts with full implementation**

```ts
"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface StrategyFormData {
  path: "investment" | "project" | "";
  city: string; state: string; lotSize: string; propertyType: string;
  alreadyPurchased: string; zoning: string; overlays: string[];
  investmentGoal: string; investmentHorizon: string; totalBudget: string;
  buildingIntent: string; experienceLevel: string; knownIssues: string; biggestQuestion: string;
  projectType: string; projectLocation: string; projectSqFt: string; projectBudget: string;
  currentStage: string; hasDrawings: string; hasArchitect: string; hasContractor: string;
  hasPermits: string; mainChallenge: string; targetDate: string; hardDeadline: string;
  teamComposition: string[]; needsMost: string;
  name: string; email: string; phone: string; notes: string;
}

export type StrategyFormState = { status: "idle" | "success" | "error"; message?: string; };

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function row(label: string, value: string): string {
  if (!value) return "";
  return `<tr>
    <td style="padding:0 0 16px;">
      <p style="margin:0 0 3px;font-size:10px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#7A6E5F;">${label}</p>
      <p style="margin:0;font-size:14px;line-height:1.6;color:#222222;">${value}</p>
    </td>
  </tr>`;
}

function buildInternalHtml(data: StrategyFormData): string {
  const isInvestment = data.path === "investment";
  const tag = isInvestment
    ? `<span style="display:inline-block;background:#FF6D1F22;border:1px solid #FF6D1F55;color:#FF6D1F;font-size:9px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;padding:3px 8px;border-radius:4px;">Investment Analysis</span>`
    : `<span style="display:inline-block;background:#FF6D1F22;border:1px solid #FF6D1F55;color:#FF6D1F;font-size:9px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;padding:3px 8px;border-radius:4px;">Project Execution Strategy</span>`;

  const bodyRows = isInvestment ? `
    ${row("Name",               esc(data.name))}
    ${row("Email",              esc(data.email))}
    ${row("Phone",              data.phone ? esc(data.phone) : "")}
    ${row("Location",           esc([data.city, data.state].filter(Boolean).join(", ")))}
    ${row("Property Type",      esc(data.propertyType))}
    ${row("Purchased?",         esc(data.alreadyPurchased))}
    ${row("Investment Goal",    esc(data.investmentGoal))}
    ${row("Investment Horizon", esc(data.investmentHorizon))}
    ${row("Total Budget",       esc(data.totalBudget))}
    ${row("Building Intent",    esc(data.buildingIntent))}
    ${row("Experience Level",   esc(data.experienceLevel))}
    ${row("Known Issues",       data.knownIssues ? esc(data.knownIssues) : "")}
    ${row("Biggest Question",   esc(data.biggestQuestion))}
    ${row("Notes",              data.notes ? esc(data.notes) : "")}
  ` : `
    ${row("Name",             esc(data.name))}
    ${row("Email",            esc(data.email))}
    ${row("Phone",            data.phone ? esc(data.phone) : "")}
    ${row("Project Type",     esc(data.projectType))}
    ${row("Location",         esc(data.projectLocation))}
    ${row("Current Stage",    esc(data.currentStage))}
    ${row("Drawings",         esc(data.hasDrawings))}
    ${row("Architect Hired",  esc(data.hasArchitect))}
    ${row("Contractor Hired", esc(data.hasContractor))}
    ${row("Permits",          esc(data.hasPermits))}
    ${row("Main Challenge",   esc(data.mainChallenge))}
    ${row("Target Date",      esc(data.targetDate))}
    ${row("Hard Deadline",    data.hardDeadline ? esc(data.hardDeadline) : "")}
    ${row("Needs Most",       esc(data.needsMost))}
    ${row("Notes",            data.notes ? esc(data.notes) : "")}
  `;

  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#F5E7C6;font-family:system-ui,Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
<tr><td align="center">
<table role="presentation" style="width:100%;max-width:560px;background:#fff;border:1px solid #E2D4B8;" cellpadding="0" cellspacing="0">
  <tr><td style="background:#222222;padding:28px 36px;">
    <p style="margin:0;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#FF6D1F;">CADTRI</p>
    <p style="margin:8px 0 4px;font-size:20px;font-weight:700;letter-spacing:-0.02em;color:#FAF3E1;">New Strategy Request</p>
    <p style="margin:8px 0 0;">${tag}</p>
  </td></tr>
  <tr><td style="height:1px;background:#E2D4B8;"></td></tr>
  <tr><td style="padding:32px 36px 12px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${bodyRows}</table>
  </td></tr>
  <tr><td style="background:#F5E7C6;padding:20px 36px;border-top:1px solid #E2D4B8;">
    <p style="margin:0;font-size:11px;color:#7A6E5F;">Submitted via cadtri.com/strategy. Reply to respond directly to ${esc(data.name)}.</p>
  </td></tr>
</table>
</td></tr></table></body></html>`;
}

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@700;800&family=Plus+Jakarta+Sans:wght@300;400;600&display=swap');`;

function buildConfirmationHtml(data: StrategyFormData): string {
  const isInvestment = data.path === "investment";
  const h1      = isInvestment ? "Your strategy<br>request is in." : "Your strategy<br>request is in.";
  const eyebrow = isInvestment ? "Investment Analysis" : "Project Strategy";
  const subText = isInvestment
    ? `We received your investment analysis request for <strong style="color:#222222;font-weight:600;">${esc(data.propertyType || "your property")}</strong> in ${esc([data.city, data.state].filter(Boolean).join(", "))}. Our team will review your details and send a tailored strategy within two business days.`
    : `We received your project strategy request for <strong style="color:#222222;font-weight:600;">${esc(data.projectType || "your project")}</strong> in ${esc(data.projectLocation)}. Our team will review your details and send a tailored execution strategy within two business days.`;

  const nextSteps = [
    "Our team reviews every request manually and prepares a custom strategy.",
    "You will receive your tailored strategy within two business days.",
    "Reply to this email or contact us at info@cadtri.com with any questions.",
  ];

  const summaryRows = isInvestment ? [
    ["Property Type",      data.propertyType],
    ["Location",           [data.city, data.state].filter(Boolean).join(", ")],
    ["Investment Goal",    data.investmentGoal],
    ["Building Intent",    data.buildingIntent],
  ] : [
    ["Project Type",   data.projectType],
    ["Location",       data.projectLocation],
    ["Current Stage",  data.currentStage],
    ["Main Challenge", data.mainChallenge],
  ];

  const summaryHtml = summaryRows
    .filter(([, v]) => v)
    .map(([l, v]) => `<tr>
      <td style="padding:0 0 14px;width:36%;vertical-align:top;"><p style="margin:0;font-size:10px;font-weight:600;letter-spacing:0.09em;text-transform:uppercase;color:#7A6E5F;font-family:'Plus Jakarta Sans',system-ui,Arial,sans-serif;">${l}</p></td>
      <td style="padding:0 0 14px;vertical-align:top;"><p style="margin:0;font-size:14px;line-height:1.5;color:#222222;font-weight:400;font-family:'Plus Jakarta Sans',system-ui,Arial,sans-serif;">${esc(v)}</p></td>
    </tr>`).join("");

  return `<!DOCTYPE html><html lang="en">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><style>${FONT_IMPORT}</style></head>
<body style="margin:0;padding:0;background:#FAF3E1;font-family:'Plus Jakarta Sans',system-ui,-apple-system,Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
<tr><td align="center">
<table role="presentation" style="width:100%;max-width:560px;background:#ffffff;border:1px solid #E2D4B8;" cellpadding="0" cellspacing="0">
  <tr><td style="background:#222222;padding:36px 44px 36px;">
    <table cellpadding="0" cellspacing="0" style="margin-bottom:28px;"><tr>
      <td style="background:#FF6D1F;padding:5px 9px 4px;"><span style="font-family:'Unbounded','Arial Black',Arial,sans-serif;font-size:13px;font-weight:800;letter-spacing:0.04em;text-transform:uppercase;color:#FAF3E1;line-height:1;">CAD</span></td>
      <td style="padding-left:7px;vertical-align:middle;"><span style="font-family:'Unbounded','Arial Black',Arial,sans-serif;font-size:13px;font-weight:800;letter-spacing:0.04em;text-transform:uppercase;color:#FAF3E1;line-height:1;">TRI&#8482;</span></td>
    </tr></table>
    <p style="margin:0;font-family:'Unbounded','Arial Black',Arial,sans-serif;font-size:36px;font-weight:800;letter-spacing:-0.03em;line-height:1.08;color:#FAF3E1;">${h1}</p>
  </td></tr>
  <tr><td style="height:3px;background:#FF6D1F;line-height:3px;font-size:3px;">&nbsp;</td></tr>
  <tr><td style="padding:40px 44px 0;">
    <p style="margin:0 0 4px;font-family:'Plus Jakarta Sans',system-ui,Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#FF6D1F;">${eyebrow}</p>
    <p style="margin:0;font-family:'Plus Jakarta Sans',system-ui,Arial,sans-serif;font-size:22px;font-weight:600;letter-spacing:-0.02em;color:#222222;line-height:1.2;">Hi ${esc(data.name)},</p>
    <p style="margin:14px 0 0;font-family:'Plus Jakarta Sans',system-ui,Arial,sans-serif;font-size:15px;line-height:1.75;color:#7A6E5F;font-weight:300;">${subText}</p>
  </td></tr>
  <tr><td style="padding:32px 44px 0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FAF3E1;border:1px solid #E2D4B8;">
      <tr><td style="padding:24px 28px 10px;">
        <p style="margin:0 0 18px;font-family:'Plus Jakarta Sans',system-ui,Arial,sans-serif;font-size:10px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#7A6E5F;">Submission Summary</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${summaryHtml}</table>
      </td></tr>
    </table>
  </td></tr>
  <tr><td style="padding:36px 44px 0;">
    <p style="margin:0 0 20px;font-family:'Plus Jakarta Sans',system-ui,Arial,sans-serif;font-size:10px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#7A6E5F;">What happens next</p>
    ${nextSteps.map((s, i) => `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px;"><tr>
      <td style="width:30px;vertical-align:top;padding-top:1px;"><table cellpadding="0" cellspacing="0"><tr><td style="width:22px;height:22px;background:#222222;text-align:center;font-family:'Plus Jakarta Sans',system-ui,Arial,sans-serif;font-size:10px;font-weight:700;color:#FF6D1F;line-height:22px;">${i + 1}</td></tr></table></td>
      <td style="padding-left:14px;vertical-align:top;"><p style="margin:2px 0 0;font-family:'Plus Jakarta Sans',system-ui,Arial,sans-serif;font-size:14px;line-height:1.65;color:#222222;font-weight:300;">${s}</p></td>
    </tr></table>`).join("")}
  </td></tr>
  <tr><td style="padding:32px 44px 0;"><table width="100%"><tr><td style="height:1px;background:#E2D4B8;font-size:1px;line-height:1px;">&nbsp;</td></tr></table></td></tr>
  <tr><td style="padding:24px 44px 36px;">
    <p style="margin:0;font-family:'Plus Jakarta Sans',system-ui,Arial,sans-serif;font-size:13px;line-height:1.65;color:#7A6E5F;font-weight:300;">Questions? Reply to this email or write to <a href="mailto:info@cadtri.com" style="color:#FF6D1F;text-decoration:none;font-weight:600;">info@cadtri.com</a>.</p>
    <p style="margin:10px 0 0;font-family:'Plus Jakarta Sans',system-ui,Arial,sans-serif;font-size:11px;color:#7A6E5F;font-weight:300;line-height:1.6;">CADTRI | Architectural Drafting and Permit Support<br/>cadtri.com</p>
  </td></tr>
</table>
</td></tr></table></body></html>`;
}

export async function submitStrategyForm(formData: FormData): Promise<StrategyFormState> {
  const raw  = formData.get("data") as string | null;
  const file = formData.get("file") as File | null;
  if (!raw) return { status: "error", message: "Missing form data." };

  let data: StrategyFormData;
  try { data = JSON.parse(raw) as StrategyFormData; }
  catch { return { status: "error", message: "Invalid form data." }; }

  if (!data.name || !data.email) return { status: "error", message: "Name and email are required." };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const attachments: any[] = [];
  if (file && file.size > 0) {
    if (file.size > 10 * 1024 * 1024) return { status: "error", message: "File must be under 10 MB." };
    attachments.push({ filename: file.name, content: Buffer.from(await file.arrayBuffer()) });
  }

  if (!process.env.RESEND_API_KEY) return { status: "error", message: "Server configuration error. Please email us directly at info@cadtri.com." };

  try {
    const isInvestment = data.path === "investment";
    const { data: sent, error } = await resend.emails.send({
      from:    "CADTRI Strategy <no-reply@cadtri.com>",
      to:      ["info@cadtri.com"],
      replyTo: data.email,
      subject: isInvestment
        ? `Investment Strategy Request: ${data.propertyType} in ${data.city} / ${data.name}`
        : `Project Strategy Request: ${data.projectType} / ${data.name}`,
      html: buildInternalHtml(data),
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    if (error) return { status: "error", message: "Could not send your request. Please email us directly at info@cadtri.com." };
    console.log("[strategy] Email sent, id:", sent?.id);

    // Confirmation to submitter (best-effort)
    try {
      await resend.emails.send({
        from:    "CADTRI <no-reply@cadtri.com>",
        to:      [data.email],
        replyTo: "info@cadtri.com",
        subject: "Your strategy request is in | CADTRI",
        html:    buildConfirmationHtml(data),
      });
    } catch (e) {
      console.error("[strategy] Confirmation email failed:", e instanceof Error ? e.message : String(e));
    }

    return { status: "success" };
  } catch (err) {
    console.error("[strategy] Exception:", err instanceof Error ? err.message : String(err));
    return { status: "error", message: "Could not send your request. Please email us directly at info@cadtri.com." };
  }
}
```

**Step 2: TypeScript check**
```bash
npx tsc --noEmit
```

**Step 3: Commit**
```bash
git add src/app/strategy/actions.ts
git commit -m "feat: strategy form server action — email to CADTRI + confirmation to user"
```

---

## Task 5: Sitemap + Homepage CTA + Navigation

**Files:**
- Modify: `src/app/sitemap.ts` — add `/strategy`
- Modify: `src/app/(marketing)/page.tsx` — add CTA button
- Modify: `src/content/navigation.ts` — add to nav if appropriate

**Step 1: Add to sitemap**

In `src/app/sitemap.ts`, find the `staticRoutes` array and add:
```ts
{ url: `${base}/strategy`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
```

**Step 2: Add homepage CTA**

In `src/app/(marketing)/page.tsx` or the hero section component, add a secondary CTA button:

```tsx
<Button href="/strategy" variant="outline" size="lg">
  Get a Free Project Strategy
</Button>
```

Place this next to or below the existing primary CTA ("Get a Pricing Estimate" or similar).

**Step 3: TypeScript check + build**
```bash
npx tsc --noEmit
npm run build
```
Expected: no errors.

**Step 4: Commit**
```bash
git add src/app/sitemap.ts src/app/(marketing)/page.tsx
git commit -m "feat: add /strategy to sitemap and homepage CTA"
```

---

## Done

The `/strategy` route is live with:
- Gate screen with two clear paths
- Investment path: 7 steps covering property, zoning, goals, budget, intent, experience, and contact
- Ongoing project path: 7 steps covering type, stage, assets, challenges, timeline, needs, and contact
- CADTRI internal email with structured data tagged by path type
- User confirmation email matching site brand (Unbounded heading, Plus Jakarta Sans body, cream/charcoal palette)
- File upload support on both paths
- Sitemap entry and homepage CTA
