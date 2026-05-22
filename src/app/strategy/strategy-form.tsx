"use client";

import { useState, useRef, useCallback } from "react";
import {
  ArrowLeft, Check, CheckCircle, Paperclip, X,
  Home, Building2, Warehouse, LayoutDashboard, Building,
  TrendingUp, DollarSign, CalendarDays, HelpCircle,
  Zap, Clock, MapPin, Lightbulb, Layers,
  HardHat, AlertCircle,
  CheckSquare, Target, Briefcase,
  PenTool, FileText, FileCheck, Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { submitStrategyForm, type StrategyFormData } from "./actions";

// ─── Constants ─────────────────────────────────────────────────────────────────

const PROPERTY_TYPES = [
  { label: "Single Family Home",   icon: Home },
  { label: "Duplex or Triplex",    icon: Building },
  { label: "Multi-Family (4+)",    icon: Building2 },
  { label: "Vacant Lot",           icon: MapPin },
  { label: "Commercial Property",  icon: Briefcase },
  { label: "Mixed-Use",            icon: Layers },
];

const INVESTMENT_GOALS = [
  { label: "Maximize Rental Income",      sub: "Long-term tenants, monthly cash flow",   icon: DollarSign },
  { label: "Maximize Resale Value",        sub: "Build equity, sell for profit",          icon: TrendingUp },
  { label: "Short-Term Rental (Airbnb)",   sub: "Vacation or furnished rental income",    icon: CalendarDays },
  { label: "Personal Use with Income",     sub: "Live in part, rent the rest",            icon: Home },
];

const INVESTMENT_HORIZONS = [
  { label: "2 to 3 years",   icon: Zap },
  { label: "5 to 10 years",  icon: Clock },
  { label: "20+ years",      icon: CalendarDays },
  { label: "Not sure yet",   icon: HelpCircle },
];

const BUILDING_INTENTS = [
  { label: "Add an ADU",                  sub: "Accessory dwelling unit",           icon: Warehouse },
  { label: "Build an Addition",           sub: "Expand the main structure",         icon: Home },
  { label: "Ground-Up New Construction",  sub: "Build from scratch on vacant lot",  icon: Building2 },
  { label: "Convert Existing Space",      sub: "Garage, basement, or attic",        icon: LayoutDashboard },
  { label: "Multi-Unit Development",      sub: "Duplex, triplex, or more",          icon: Building },
  { label: "Not sure, need guidance",    sub: "Tell me what makes most sense",     icon: HelpCircle },
];

const EXPERIENCE_LEVELS = [
  { label: "First-time investor",    icon: Lightbulb },
  { label: "A few projects done",    icon: CheckSquare },
  { label: "Experienced developer",  icon: TrendingUp },
];

const BIGGEST_QUESTIONS = [
  { label: "What can I actually build here?",    icon: HelpCircle },
  { label: "Will this cash flow?",               icon: DollarSign },
  { label: "How long will permits take?",        icon: Clock },
  { label: "Is this worth buying at all?",       icon: AlertCircle },
  { label: "What is the full cost to develop?",  icon: Building2 },
  { label: "All of the above",                   icon: Target },
];

const PROJECT_TYPES: { label: string; icon: LucideIcon }[] = [
  { label: "ADU",                       icon: Warehouse },
  { label: "Home Addition",             icon: Home },
  { label: "Garage Conversion",         icon: LayoutDashboard },
  { label: "New Construction",          icon: Building2 },
  { label: "Interior Remodel",          icon: Layers },
  { label: "Tenant Improvement",        icon: Briefcase },
  { label: "Multi-Family Development",  icon: Building },
];

const CURRENT_STAGES: { label: string; sub: string; icon: LucideIcon }[] = [
  { label: "Just starting out",                      sub: "No drawings, no team yet",              icon: Lightbulb },
  { label: "Designer working on drawings",           sub: "Design phase in progress",              icon: PenTool },
  { label: "Drawings done, about to submit",         sub: "Ready to go to the city",               icon: FileText },
  { label: "Permits submitted, in plan check",       sub: "Waiting on city review",                icon: Clock },
  { label: "Received plan check corrections",        sub: "City sent back comments",               icon: AlertCircle },
  { label: "Permits approved, finding contractor",   sub: "Ready to break ground",                 icon: CheckSquare },
  { label: "Under construction",                     sub: "Build is active",                       icon: HardHat },
  { label: "Construction stalled",                   sub: "Project hit a wall",                    icon: AlertCircle },
];

const MAIN_CHALLENGES: { label: string; icon: LucideIcon }[] = [
  { label: "Don't know where to start",          icon: HelpCircle },
  { label: "Stuck in plan check corrections",    icon: AlertCircle },
  { label: "Can't find a reliable contractor",   icon: HardHat },
  { label: "Over budget",                        icon: DollarSign },
  { label: "Behind schedule",                    icon: Clock },
  { label: "Design is not finalized",            icon: PenTool },
  { label: "Unclear on city requirements",       icon: FileCheck },
  { label: "Team not communicating well",        icon: Users },
];

const NEEDS_MOST: { label: string; icon: LucideIcon }[] = [
  { label: "A step-by-step execution roadmap",  icon: Target },
  { label: "How to speed the project up",       icon: Zap },
  { label: "How to cut costs",                  icon: DollarSign },
  { label: "How to handle plan check",          icon: FileCheck },
  { label: "How to manage my contractor",       icon: HardHat },
  { label: "All of the above",                  icon: Layers },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────

const inputClass =
  "w-full border border-white/25 bg-white/10 px-4 py-3.5 text-sm font-light text-white " +
  "placeholder:text-white/40 focus:border-secondary focus:bg-white/[0.14] focus:outline-none " +
  "transition-all duration-150 rounded-none";

// ─── Initial data ──────────────────────────────────────────────────────────────

const INITIAL_DATA: StrategyFormData = {
  path: "", city: "", state: "", lotSize: "", propertyType: "",
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

  const TOTAL_STEPS = 7;
  const progress = Math.round(((step - 1) / TOTAL_STEPS) * 100);

  const set = useCallback(<K extends keyof StrategyFormData>(key: K, val: StrategyFormData[K]) => {
    setData((d) => ({ ...d, [key]: val }));
  }, []);

  const pick = useCallback(
    <K extends keyof StrategyFormData>(key: K, val: StrategyFormData[K], nextStep: number) => {
      setTimeout(() => {
        setData((d) => ({ ...d, [key]: val }));
        setStep(nextStep);
      }, 180);
    },
    [],
  );

  const goBack = useCallback(() => {
    if (step > 1) {
      setStep((s) => s - 1);
    } else {
      setData((d) => ({ ...d, path: "" }));
    }
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

      if (result.status === "success") {
        setDone(true);
      } else {
        setSubmitError(result.message ?? "Something went wrong. Please try again.");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("[strategy] client submit error:", msg);
      setSubmitError("Something went wrong. Please email us directly at info@cadtri.com.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success screen ──────────────────────────────────────────────────────────
  if (done) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-8 py-20 text-center">
        <CheckCircle size={44} strokeWidth={1.5} className="mb-8 text-secondary" />
        <h2
          className="mb-5 font-bold text-white"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.03em" }}
        >
          Strategy request received.
        </h2>
        <p className="max-w-md text-base font-light leading-relaxed text-white/50">
          We will review your details and send your tailored strategy within two business days.
        </p>
        <p className="mt-8 text-xs text-white/30">
          Questions? Email{" "}
          <a href="mailto:info@cadtri.com" className="text-secondary hover:underline">
            info@cadtri.com
          </a>
        </p>
      </div>
    );
  }

  // ── Gate screen ─────────────────────────────────────────────────────────────
  if (!data.path) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-8 py-16 lg:py-24">
        <p className="mb-6 text-[11px] font-medium uppercase tracking-widest text-secondary">
          Free Strategy
        </p>
        <h2
          className="mb-5 text-center font-bold text-white"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.03em", lineHeight: 1.08 }}
        >
          What are you working on?
        </h2>
        <p className="mb-12 max-w-lg text-center text-sm font-light leading-relaxed text-white/40">
          Tell us about your situation and we will send you a free tailored strategy. No commitment, no sales pitch.
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

  // ═══════════════════════════════════════════════════════
  // ONGOING PROJECT PATH
  // ═══════════════════════════════════════════════════════
  if (data.path === "project") {
    const isProjectWide = step >= 4;

    const PROJECT_STEP_META: Record<number, { q: string; desc: string }> = {
      1: { q: "What type of project?",       desc: "Project type and location shape the entire permit process and execution timeline." },
      2: { q: "Where are you right now?",    desc: "Your current stage determines what comes next and where the biggest leverage points are." },
      3: { q: "What do you have in place?",  desc: "Knowing what exists helps us identify gaps and the fastest path forward." },
    };
    const projMeta = PROJECT_STEP_META[step];

    return (
      <div className="flex flex-1 flex-col">
        <div className="h-[3px] w-full bg-white/[0.08]">
          <div className="h-full bg-secondary transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
        </div>

        {!isProjectWide ? (
          <div className="flex flex-1 flex-col lg:flex-row lg:items-stretch">
            {/* Left panel */}
            <div className="relative flex flex-col border-b border-white/[0.06] px-8 pb-10 pt-12 lg:w-[38%] lg:border-b-0 lg:border-r lg:px-14 lg:pb-20 lg:pt-16">
              <div>
                <p className="mb-5 text-[11px] font-medium uppercase tracking-widest text-secondary">Step {step} of {TOTAL_STEPS}</p>
                <h2 className="font-bold text-white" style={{ fontSize: "clamp(1.75rem, 2.8vw, 2.75rem)", letterSpacing: "-0.03em", lineHeight: 1.06 }}>
                  {projMeta?.q}
                </h2>
                <p className="mt-5 text-sm font-light leading-relaxed text-white/40">{projMeta?.desc}</p>
              </div>
              <button type="button" onClick={goBack}
                className="mt-10 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-white/30 transition-colors hover:text-white/70 lg:absolute lg:bottom-14 lg:left-14 lg:mt-0">
                <ArrowLeft size={12} strokeWidth={2} />Back
              </button>
            </div>

            {/* Right panel */}
            <div className="flex flex-1 flex-col overflow-y-auto px-8 pb-10 pt-12 lg:px-14 lg:pb-20 lg:pt-16">

              {/* Step 1: Project type + location */}
              {step === 1 && (
                <div className="animate-in flex flex-col gap-8">
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {PROJECT_TYPES.map(({ label, icon }) => (
                      <SelectCard key={label} label={label} icon={icon}
                        selected={data.projectType === label}
                        onClick={() => set("projectType", label)} />
                    ))}
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 max-w-lg">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold uppercase tracking-widest text-white/55">City <span className="text-secondary">*</span></label>
                      <input type="text"
                        value={data.projectLocation.split(",")[0]?.trim() ?? ""}
                        onChange={e => {
                          const state = data.projectLocation.split(",")[1]?.trim() ?? "";
                          set("projectLocation", e.target.value + (state ? `, ${state}` : ""));
                        }}
                        placeholder="e.g. San Diego" className={inputClass} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold uppercase tracking-widest text-white/55">State <span className="text-secondary">*</span></label>
                      <input type="text"
                        value={data.projectLocation.split(",")[1]?.trim() ?? ""}
                        onChange={e => {
                          const city = data.projectLocation.split(",")[0]?.trim() ?? "";
                          set("projectLocation", city + (e.target.value ? `, ${e.target.value}` : ""));
                        }}
                        placeholder="e.g. California" className={inputClass} />
                    </div>
                  </div>
                  <button type="button"
                    disabled={!data.projectType || data.projectLocation.replace(/,/g, "").trim().length < 4}
                    onClick={() => setStep(2)}
                    className={cn("px-12 py-4 text-sm font-semibold uppercase tracking-widest transition-all max-w-xs",
                      data.projectType && data.projectLocation.replace(/,/g, "").trim().length >= 4
                        ? "bg-secondary text-white hover:bg-secondary/90"
                        : "bg-white/[0.06] text-white/20 cursor-not-allowed")}>
                    Continue
                  </button>
                </div>
              )}

              {/* Step 2: Current stage */}
              {step === 2 && (
                <div className="animate-in flex flex-col gap-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {CURRENT_STAGES.map(({ label, sub, icon }) => (
                      <SelectCard key={label} label={label} sub={sub} icon={icon}
                        selected={data.currentStage === label}
                        onClick={() => { setTimeout(() => { setData(d => ({ ...d, currentStage: label })); setStep(3); }, 180); }} />
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: What they have */}
              {step === 3 && (
                <div className="animate-in flex flex-col gap-6 max-w-lg">
                  <p className="text-sm font-light text-white/40">Check everything that applies to your project right now.</p>
                  {[
                    { key: "hasDrawings"   as const, label: "Architectural drawings",        yes: "Complete", no: "Not yet" },
                    { key: "hasArchitect"  as const, label: "Architect or designer hired",   yes: "Yes",      no: "No" },
                    { key: "hasContractor" as const, label: "General contractor selected",   yes: "Yes",      no: "No" },
                    { key: "hasPermits"    as const, label: "Permits submitted or approved", yes: "Yes",      no: "No" },
                  ].map(({ key, label, yes, no }) => (
                    <div key={key} className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                      <p className="text-sm font-medium text-white/70">{label}</p>
                      <div className="flex gap-2">
                        {[yes, no].map(opt => (
                          <button key={opt} type="button" onClick={() => set(key, opt)}
                            className={cn("px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all",
                              data[key] === opt
                                ? "bg-secondary text-white"
                                : "border border-white/15 text-white/40 hover:border-white/30 hover:text-white/70")}>
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
              <button type="button" onClick={goBack}
                className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-white/30 transition-colors hover:text-white/70">
                <ArrowLeft size={12} strokeWidth={2} />Back
              </button>
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
                      <SelectCard key={label} label={label} icon={icon}
                        selected={data.mainChallenge === label}
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
                  <p className="mb-8 text-sm font-light text-white/40">Approximate is fine. Tell us below if there is a hard deadline.</p>
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
                      <SelectCard key={label} label={label} icon={icon}
                        selected={data.needsMost === label}
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
                  <ContactFields data={data} set={set} submitError={submitError}
                    setSubmitError={setSubmitError} submitting={submitting}
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

  // ── Investment path ─────────────────────────────────────────────────────────
  const isWide = step >= 5;

  const STEP_META: Record<number, { question: string; description: string }> = {
    1: {
      question: "Where is the property?",
      description: "Location determines zoning laws, ADU eligibility, permit timelines, and local market conditions.",
    },
    2: {
      question: "What is on the property now?",
      description: "The existing structure and lot size determine what can realistically be built and what approvals are needed.",
    },
    3: {
      question: "What is your main goal?",
      description: "Your investment objective shapes everything: what to build, how to finance it, and what the exit looks like.",
    },
    4: {
      question: "What is your investment horizon?",
      description: "Short-term and long-term strategies look very different. This helps us recommend the right development approach.",
    },
  };

  const meta = STEP_META[step];

  return (
    <div className="flex flex-1 flex-col">
      {/* Progress bar */}
      <div className="h-[3px] w-full bg-white/[0.08]">
        <div
          className="h-full bg-secondary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {!isWide ? (
        /* ── Steps 1–4: Two-column split on lg+ ── */
        <div className="flex flex-1 flex-col lg:flex-row lg:items-stretch">
          {/* Left panel */}
          <div className="relative flex flex-col border-b border-white/[0.06] px-8 pb-10 pt-12 lg:w-[38%] lg:border-b-0 lg:border-r lg:px-14 lg:pb-20 lg:pt-16">
            <div>
              <p className="mb-5 text-[11px] font-medium uppercase tracking-widest text-secondary">
                Step {step} of {TOTAL_STEPS}
              </p>
              <h2
                className="font-bold text-white"
                style={{ fontSize: "clamp(1.75rem, 2.8vw, 2.75rem)", letterSpacing: "-0.03em", lineHeight: 1.06 }}
              >
                {meta?.question}
              </h2>
              <p className="mt-5 text-sm font-light leading-relaxed text-white/40">
                {meta?.description}
              </p>
            </div>
            <button
              type="button"
              onClick={goBack}
              className="mt-10 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-white/30 transition-colors hover:text-white/70 lg:absolute lg:bottom-14 lg:left-14 lg:mt-0"
            >
              <ArrowLeft size={12} strokeWidth={2} />
              Back
            </button>
          </div>

          {/* Right panel */}
          <div className="flex flex-1 flex-col overflow-y-auto px-8 pb-10 pt-12 lg:px-14 lg:pb-20 lg:pt-16">

            {/* ── Step 1: Location ── */}
            {step === 1 && (
              <div className="animate-in flex flex-col gap-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-widest text-white/55">
                      City <span className="text-secondary">*</span>
                    </label>
                    <input
                      type="text"
                      value={data.city}
                      onChange={(e) => set("city", e.target.value)}
                      placeholder="e.g. Los Angeles"
                      className={inputClass}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-widest text-white/55">
                      State <span className="text-secondary">*</span>
                    </label>
                    <input
                      type="text"
                      value={data.state}
                      onChange={(e) => set("state", e.target.value)}
                      placeholder="e.g. California"
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Already purchased toggle */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-white/55">
                    Already purchased?{" "}
                    <span className="text-white/30 font-light normal-case tracking-normal">optional</span>
                  </label>
                  <div className="flex gap-3">
                    {["Already purchased", "Still evaluating"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => set("alreadyPurchased", opt)}
                        className={cn(
                          "flex-1 border px-4 py-3 text-sm font-medium transition-all duration-200",
                          data.alreadyPurchased === opt
                            ? "border-secondary bg-secondary/10 text-secondary"
                            : "border-white/15 bg-white/[0.04] text-white/50 hover:border-white/25 hover:text-white/80",
                        )}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  disabled={data.city.trim().length < 2 || data.state.trim().length < 2}
                  onClick={() => setStep(2)}
                  className={cn(
                    "mt-2 px-12 py-4 text-sm font-semibold uppercase tracking-widest transition-all duration-200",
                    data.city.trim().length >= 2 && data.state.trim().length >= 2
                      ? "bg-secondary text-white hover:bg-secondary/90"
                      : "bg-white/[0.06] text-white/20 cursor-not-allowed",
                  )}
                >
                  Continue
                </button>
              </div>
            )}

            {/* ── Step 2: Property type ── */}
            {step === 2 && (
              <div className="animate-in grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {PROPERTY_TYPES.map(({ label, icon }) => (
                  <SelectCard
                    key={label}
                    label={label}
                    icon={icon}
                    selected={data.propertyType === label}
                    onClick={() => pick("propertyType", label, 3)}
                  />
                ))}
              </div>
            )}

            {/* ── Step 3: Investment goal ── */}
            {step === 3 && (
              <div className="animate-in grid gap-3 sm:grid-cols-2">
                {INVESTMENT_GOALS.map(({ label, sub, icon }) => (
                  <SelectCard
                    key={label}
                    label={label}
                    sub={sub}
                    icon={icon}
                    selected={data.investmentGoal === label}
                    onClick={() => pick("investmentGoal", label, 4)}
                  />
                ))}
              </div>
            )}

            {/* ── Step 4: Investment horizon ── */}
            {step === 4 && (
              <div className="animate-in grid gap-3 sm:grid-cols-2">
                {INVESTMENT_HORIZONS.map(({ label, icon }) => (
                  <SelectCard
                    key={label}
                    label={label}
                    icon={icon}
                    selected={data.investmentHorizon === label}
                    onClick={() => pick("investmentHorizon", label, 5)}
                  />
                ))}
              </div>
            )}

          </div>
        </div>

      ) : (
        /* ── Steps 5–7: Wide centered layout ── */
        <div className="flex flex-1 flex-col overflow-y-auto px-8 pb-16 pt-12 sm:px-12 lg:px-20 lg:pt-16">

          {/* Fixed nav row */}
          <div className="mb-10 flex items-center justify-between">
            <button
              type="button"
              onClick={goBack}
              className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-white/30 transition-colors hover:text-white/70"
            >
              <ArrowLeft size={12} strokeWidth={2} />
              Back
            </button>
            <span className="text-[11px] tabular-nums tracking-widest text-white/25">
              {step} / {TOTAL_STEPS}
            </span>
          </div>

          <div className="w-full max-w-3xl">

            {/* ── Step 5: Building intent + budget ── */}
            {step === 5 && (
              <div className="animate-in">
                <StepLabel n={5} />
                <Question>What are you thinking of building?</Question>
                <p className="mb-8 text-sm font-light text-white/40">
                  Choose the option closest to your plan. Not sure is a valid answer.
                </p>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {BUILDING_INTENTS.map(({ label, sub, icon }) => (
                    <SelectCard
                      key={label}
                      label={label}
                      sub={sub}
                      icon={icon}
                      selected={data.buildingIntent === label}
                      onClick={() => set("buildingIntent", label)}
                    />
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-white/55">
                    Total budget (purchase + construction){" "}
                    <span className="text-white/30 font-light normal-case tracking-normal">optional</span>
                  </label>
                  <input
                    type="text"
                    value={data.totalBudget}
                    onChange={(e) => set("totalBudget", e.target.value)}
                    placeholder="e.g. $750,000"
                    className={inputClass}
                  />
                </div>

                <button
                  type="button"
                  disabled={!data.buildingIntent}
                  onClick={() => setStep(6)}
                  className={cn(
                    "mt-8 px-12 py-4 text-sm font-semibold uppercase tracking-widest transition-all duration-200",
                    data.buildingIntent
                      ? "bg-secondary text-white hover:bg-secondary/90"
                      : "bg-white/[0.06] text-white/20 cursor-not-allowed",
                  )}
                >
                  Continue
                </button>
              </div>
            )}

            {/* ── Step 6: Experience + known issues ── */}
            {step === 6 && (
              <div className="animate-in">
                <StepLabel n={6} />
                <Question>A little about your experience.</Question>
                <p className="mb-8 text-sm font-light text-white/40">
                  This helps us calibrate how detailed the strategy should be.
                </p>

                <div className="grid gap-3 sm:grid-cols-3">
                  {EXPERIENCE_LEVELS.map(({ label, icon }) => (
                    <SelectCard
                      key={label}
                      label={label}
                      icon={icon}
                      selected={data.experienceLevel === label}
                      onClick={() => set("experienceLevel", label)}
                    />
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-white/55">
                    Any known issues with the property?{" "}
                    <span className="text-white/30 font-light normal-case tracking-normal">optional</span>
                  </label>
                  <input
                    type="text"
                    value={data.knownIssues}
                    onChange={(e) => set("knownIssues", e.target.value)}
                    placeholder="e.g. flood zone, easements, unpermitted structures"
                    className={inputClass}
                  />
                </div>

                <button
                  type="button"
                  disabled={!data.experienceLevel}
                  onClick={() => setStep(7)}
                  className={cn(
                    "mt-8 px-12 py-4 text-sm font-semibold uppercase tracking-widest transition-all duration-200",
                    data.experienceLevel
                      ? "bg-secondary text-white hover:bg-secondary/90"
                      : "bg-white/[0.06] text-white/20 cursor-not-allowed",
                  )}
                >
                  Continue
                </button>
              </div>
            )}

            {/* ── Step 7: Biggest question + contact ── */}
            {step === 7 && (
              <div className="animate-in">
                <StepLabel n={7} label="Last step" />
                <Question>What do you most need answered?</Question>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {BIGGEST_QUESTIONS.map(({ label, icon }) => (
                    <SelectCard
                      key={label}
                      label={label}
                      icon={icon}
                      selected={data.biggestQuestion === label}
                      onClick={() => set("biggestQuestion", label)}
                    />
                  ))}
                </div>

                <div className="mt-10">
                  <ContactFields
                    data={data}
                    set={set}
                    submitError={submitError}
                    setSubmitError={setSubmitError}
                    submitting={submitting}
                    file={file}
                    setFile={setFile}
                    fileRef={fileRef}
                    onSubmit={handleSubmit}
                    submitLabel="Get My Free Strategy"
                  />
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

// ─── ContactFields ────────────────────────────────────────────────────────────

function ContactFields({
  data,
  set,
  submitError,
  setSubmitError,
  submitting,
  file,
  setFile,
  fileRef,
  onSubmit,
  submitLabel = "Submit",
}: {
  data: StrategyFormData;
  set: <K extends keyof StrategyFormData>(key: K, val: StrategyFormData[K]) => void;
  submitError: string;
  setSubmitError: (msg: string) => void;
  submitting: boolean;
  file: File | null;
  setFile: (f: File | null) => void;
  fileRef: React.RefObject<HTMLInputElement | null>;
  onSubmit: () => void;
  submitLabel?: string;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-white/55">
            Full Name <span className="text-secondary">*</span>
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Your name"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-white/55">
            Email Address <span className="text-secondary">*</span>
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="you@company.com"
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-widest text-white/55">
          Phone{" "}
          <span className="text-white/30 font-light normal-case tracking-normal">optional</span>
        </label>
        <input
          type="tel"
          value={data.phone}
          onChange={(e) => set("phone", e.target.value)}
          placeholder="(555) 000-0000"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-widest text-white/55">
          Anything else we should know?{" "}
          <span className="text-white/30 font-light normal-case tracking-normal">optional</span>
        </label>
        <textarea
          value={data.notes}
          onChange={(e) => set("notes", e.target.value)}
          rows={3}
          placeholder="Property address, specific constraints, questions for us"
          className={cn(inputClass, "resize-none")}
        />
      </div>

      {/* File upload */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-widest text-white/55">
          Attach a reference file{" "}
          <span className="text-white/30 font-light normal-case tracking-normal">optional, max 10 MB</span>
        </label>

        {file ? (
          <div className="flex items-center justify-between border border-white/20 bg-white/[0.06] px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <Paperclip size={13} strokeWidth={1.5} className="shrink-0 text-secondary" />
              <span className="truncate text-sm font-light text-white/70">{file.name}</span>
              <span className="shrink-0 text-xs text-white/30">
                {(file.size / 1024 / 1024).toFixed(1)} MB
              </span>
            </div>
            <button
              type="button"
              onClick={() => setFile(null)}
              className="ml-3 shrink-0 text-white/30 transition-colors hover:text-white/70"
              aria-label="Remove file"
            >
              <X size={14} strokeWidth={2} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-3 border border-dashed border-white/20 bg-white/[0.03] px-4 py-4 text-sm font-light text-white/40 transition-all hover:border-white/35 hover:bg-white/[0.06] hover:text-white/60"
          >
            <Paperclip size={14} strokeWidth={1.5} className="shrink-0" />
            Click to attach drawings, sketches, or reference files
          </button>
        )}

        <input
          ref={fileRef}
          type="file"
          accept=".pdf,.dwg,.dxf,.png,.jpg,.jpeg,.doc,.docx"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0] ?? null;
            if (f && f.size > 10 * 1024 * 1024) {
              setSubmitError("File must be under 10 MB.");
              return;
            }
            setFile(f);
            setSubmitError("");
          }}
        />
      </div>

      {submitError && (
        <p className="border-l-2 border-secondary pl-4 text-sm font-light text-white/70">
          {submitError}
        </p>
      )}

      <button
        type="button"
        disabled={!data.name.trim() || !data.email.trim() || submitting}
        onClick={onSubmit}
        className={cn(
          "py-4 text-sm font-semibold uppercase tracking-widest transition-all duration-200",
          data.name.trim() && data.email.trim() && !submitting
            ? "bg-secondary text-white hover:bg-secondary/90"
            : "bg-white/[0.06] text-white/20 cursor-not-allowed",
        )}
      >
        {submitting ? "Sending..." : submitLabel}
      </button>

      <p className="text-center text-xs font-light text-white/25">
        No spam. We use this only to send your strategy.
      </p>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StepLabel({ n, label }: { n: number; label?: string }) {
  return (
    <p className="mb-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
      {label ?? `Step ${n}`}
    </p>
  );
}

function Question({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="mb-10 font-bold text-white"
      style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", letterSpacing: "-0.03em", lineHeight: 1.1 }}
    >
      {children}
    </h2>
  );
}

function SelectCard({
  label,
  sub,
  selected,
  onClick,
  icon: Icon,
}: {
  label: string;
  sub?: string;
  selected: boolean;
  onClick: () => void;
  icon?: LucideIcon;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative w-full rounded-2xl border px-5 py-6 min-h-[140px] sm:min-h-[160px]",
        "flex flex-col items-center justify-center gap-4 transition-all duration-200",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary",
        selected
          ? "border-secondary bg-secondary/10"
          : "border-white/15 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.08]",
      )}
    >
      {/* Radio — absolute top-right */}
      <span
        className={cn(
          "absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full border transition-all duration-150",
          selected ? "border-secondary bg-secondary" : "border-white/20 group-hover:border-white/45",
        )}
      >
        {selected && <Check size={10} strokeWidth={3} className="text-white" />}
      </span>

      {/* Icon */}
      <div
        className={cn(
          "transition-colors duration-200",
          selected ? "text-white/50" : "text-white/20 group-hover:text-white/35",
        )}
      >
        {Icon ? <Icon size={40} strokeWidth={1.25} /> : <div className="h-10 w-10" />}
      </div>

      {/* Label + sub */}
      <div className="text-center">
        <p
          className={cn(
            "text-base font-semibold leading-snug transition-colors duration-150",
            selected ? "text-secondary" : "text-white",
          )}
        >
          {label}
        </p>
        {sub && (
          <p className="mt-1.5 text-sm font-light leading-relaxed text-white/40">{sub}</p>
        )}
      </div>
    </button>
  );
}

function PathCard({
  icon: Icon,
  label,
  sub,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  sub: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative w-full rounded-2xl border border-white/15 bg-white/[0.04] px-8 py-10",
        "flex flex-col items-start gap-5 text-left transition-all duration-200",
        "hover:border-secondary/50 hover:bg-white/[0.08]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary",
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-white/40 transition-colors group-hover:border-secondary/30 group-hover:text-secondary/70">
        <Icon size={22} strokeWidth={1.5} />
      </div>
      <div>
        <p className="text-lg font-semibold leading-snug text-white transition-colors group-hover:text-secondary">
          {label}
        </p>
        <p className="mt-2 text-sm font-light leading-relaxed text-white/40">{sub}</p>
      </div>
      <ArrowLeft
        size={16}
        strokeWidth={2}
        className="absolute right-6 top-1/2 -translate-y-1/2 rotate-180 text-white/20 transition-all duration-200 group-hover:translate-x-1 group-hover:text-secondary/60"
      />
    </button>
  );
}

