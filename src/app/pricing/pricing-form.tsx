"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import {
  ArrowLeft, Check, CheckCircle, Paperclip, Plus, X,
  Home, HardHat, PenTool, TrendingUp, Briefcase,
  Warehouse, LayoutDashboard, Zap, Waves, Box,
  Building2, Layers, FileCheck, FileText,
  MessageSquare, BarChart2, Building,
  Lightbulb, Clock, CalendarDays, HelpCircle,
  Upload, MapPin, Key, List, Users, Type,
  Minimize2, Maximize2, Square, FolderOpen,
  Wallet, Coins, Banknote, PiggyBank, DollarSign, CreditCard, BarChart, TrendingDown,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { submitPricingForm, type PricingFormData } from "./actions";

// ─── Card icon map — one icon per selectable option ───────────────────────────
const CARD_ICONS: Record<string, LucideIcon> = {
  // Step 1 — client type
  "Homeowner":             Home,
  "General Contractor":    HardHat,
  "Architect or Designer": PenTool,
  "Developer or Investor": TrendingUp,
  "Business Owner":        Briefcase,
  // Step 2 — project type (homeowner)
  "Home Addition":              Maximize2,
  "ADU or Garage Conversion":   Warehouse,
  "Interior Remodel":           LayoutDashboard,
  "New Custom Home":            Home,
  "Pool or Spa":                Waves,
  "Solar or EV Installation":   Zap,
  "Accessory Structure":        Box,
  // Step 2 — project type (contractor)
  "Residential Project":        Home,
  "Commercial Build-out":       Building2,
  "Mixed-Use Development":      Layers,
  "Permit Coordination":        FileCheck,
  "As-Built Documentation":     FileText,
  // Step 2 — project type (architect)
  "Drafting Support":           PenTool,
  "Permit Set Coordination":    FileCheck,
  "BIM Coordination":           Layers,
  "Structural Coordination":    Building,
  "Plan Check Response":        MessageSquare,
  "Overflow Drafting":          List,
  // Step 2 — project type (developer)
  "Ground-Up Construction":     Building,
  "Multi-Family Development":   Building2,
  "ADU Development":            Home,
  "Commercial Development":     Briefcase,
  "Feasibility and Planning":   BarChart2,
  "Portfolio Permitting":       FolderOpen,
  // Step 2 — project type (business owner)
  "Tenant Improvement":         LayoutDashboard,
  "New Business Location":      MapPin,
  "ADA Compliance Upgrade":     Users,
  "Signage Permit":             Type,
  "Short-Term Rental Conversion": Key,
  // Step 3 — stage
  "Just an idea, no drawings yet":            Lightbulb,
  "Have sketches or rough concepts":          PenTool,
  "Have existing drawings":                   FileText,
  "Ready to submit, need a permit package":   Upload,
  // Step 4 — size
  "Under 500 sq ft":      Minimize2,
  "500 to 1,500 sq ft":   Square,
  "1,500 to 3,000 sq ft": Maximize2,
  "3,000 sq ft or more":  Building2,
  "Not sure yet":         HelpCircle,
  // Step 5 — timeline
  "Urgent, within 2 weeks":    Zap,
  "Soon, 1 to 2 months":       Clock,
  "Planning ahead, 3+ months": CalendarDays,
  // Step 6 — budget (service pricing ranges)
  "$2,000":   Wallet,
  "$5,000":   Coins,
  "$8,000":   PiggyBank,
  "$10,000":  Banknote,
  "$15,000":  CreditCard,
  "$20,000":  BarChart,
  "$30,000":  BarChart2,
  "$50,000":  TrendingUp,
  "$100,000": Building,
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const CLIENT_TYPES = [
  { label: "Homeowner",             sub: "Improving or expanding my property" },
  { label: "General Contractor",    sub: "Need permit drawings for a client" },
  { label: "Architect or Designer", sub: "Drafting support or permit coordination" },
  { label: "Developer or Investor", sub: "New construction or conversion" },
  { label: "Business Owner",        sub: "Commercial space or new location" },
];

const PROJECT_TYPES: Record<string, string[]> = {
  "Homeowner":             ["Home Addition", "ADU or Garage Conversion", "Interior Remodel", "New Custom Home", "Pool or Spa", "Solar or EV Installation", "Accessory Structure"],
  "General Contractor":    ["Residential Project", "Commercial Build-out", "Mixed-Use Development", "Permit Coordination", "As-Built Documentation"],
  "Architect or Designer": ["Drafting Support", "Permit Set Coordination", "BIM Coordination", "Structural Coordination", "Plan Check Response", "Overflow Drafting"],
  "Developer or Investor": ["Ground-Up Construction", "Multi-Family Development", "ADU Development", "Commercial Development", "Feasibility and Planning", "Portfolio Permitting"],
  "Business Owner":        ["Tenant Improvement", "New Business Location", "ADA Compliance Upgrade", "Signage Permit", "Short-Term Rental Conversion"],
};

const STAGE_OPTIONS = [
  "Just an idea, no drawings yet",
  "Have sketches or rough concepts",
  "Have existing drawings",
  "Ready to submit, need a permit package",
];

const SIZE_OPTIONS = [
  "Under 500 sq ft",
  "500 to 1,500 sq ft",
  "1,500 to 3,000 sq ft",
  "3,000 sq ft or more",
  "Not sure yet",
];

const TIMELINE_OPTIONS = [
  "Urgent, within 2 weeks",
  "Soon, 1 to 2 months",
  "Planning ahead, 3+ months",
  "Not sure yet",
];

const BUDGET_OPTIONS = [
  "$2,000",
  "$5,000",
  "$8,000",
  "$10,000",
  "$15,000",
  "$20,000",
  "$30,000",
  "$50,000",
  "$100,000",
];

// All 42 CADTRI services — exact titles from the website
const ALL_SERVICES = [
  "Architectural Drafting",
  "Permit Set Preparation",
  "City Comments Response",
  "Structural Coordination",
  "Code and Compliance Review",
  "Renderings and Visualization",
  "ADU Permit Packages",
  "Solar and EV Permit Packages",
  "MEP Coordination",
  "Entitlement Support",
  "Pre-Application Meeting Prep",
  "As-Built Documentation",
  "Tenant Improvement Packages",
  "Digital Walkthroughs",
  "3D Staging",
  "Project Strategy",
  "Feasibility Study",
  "Home Addition Packages",
  "Garage Conversion Packages",
  "Construction Administration Support",
  "Contractor Bid Package",
  "Pool and Spa Permit Packages",
  "Interior Remodel Packages",
  "Short-Term Rental Conversion Permits",
  "Accessory Structure Permits",
  "Title 24 Energy Compliance",
  "Historic District Submissions",
  "BIM Coordination",
  "Zoning Code Research",
  "Permit Pathway Analysis",
  "Pre-Purchase Assessment",
  "Scope Definition",
  "Design Options Study",
  "Compliance Gap Analysis",
  "Deferred Submittal Packages",
  "Fire and Life Safety Drawings",
  "Signage Permit Drawings",
  "Interior Detail Package",
  "Site Plan Package",
  "Record Drawing Updates",
  "Demolition Permit Drawings",
  "Redline to CAD Conversion",
];

// Honeycomb row sizes: 6+5+6+5+6+5+6+3 = 42
const HONEYCOMB_ROWS = [6, 5, 6, 5, 6, 5, 6, 3] as const;

// Smart pre-selection per project type (matched to exact service titles)
const SERVICE_MAP: Record<string, string[]> = {
  "Home Addition":              ["Architectural Drafting", "Permit Set Preparation", "Structural Coordination", "Home Addition Packages"],
  "ADU or Garage Conversion":   ["ADU Permit Packages", "Garage Conversion Packages", "Architectural Drafting"],
  "Interior Remodel":           ["Architectural Drafting", "Interior Remodel Packages", "City Comments Response"],
  "New Custom Home":            ["Architectural Drafting", "Permit Set Preparation", "Structural Coordination", "Site Plan Package"],
  "Pool or Spa":                ["Pool and Spa Permit Packages", "Structural Coordination"],
  "Solar or EV Installation":   ["Solar and EV Permit Packages"],
  "Accessory Structure":        ["Accessory Structure Permits", "Permit Set Preparation"],
  "Residential Project":        ["Architectural Drafting", "Permit Set Preparation", "Structural Coordination"],
  "Commercial Build-out":       ["Architectural Drafting", "City Comments Response", "MEP Coordination"],
  "Mixed-Use Development":      ["Architectural Drafting", "BIM Coordination", "MEP Coordination"],
  "Permit Coordination":        ["City Comments Response", "Permit Set Preparation"],
  "As-Built Documentation":     ["As-Built Documentation"],
  "Drafting Support":           ["Architectural Drafting", "Structural Coordination"],
  "Permit Set Coordination":    ["Permit Set Preparation", "City Comments Response"],
  "BIM Coordination":           ["BIM Coordination", "MEP Coordination"],
  "Structural Coordination":    ["Structural Coordination"],
  "Plan Check Response":        ["City Comments Response"],
  "Overflow Drafting":          ["Architectural Drafting"],
  "Ground-Up Construction":     ["Architectural Drafting", "Permit Set Preparation", "Structural Coordination", "Site Plan Package"],
  "Multi-Family Development":   ["Architectural Drafting", "Permit Set Preparation", "BIM Coordination"],
  "ADU Development":            ["ADU Permit Packages", "Architectural Drafting"],
  "Commercial Development":     ["Architectural Drafting", "BIM Coordination", "MEP Coordination"],
  "Feasibility and Planning":   ["Feasibility Study", "Zoning Code Research", "Permit Pathway Analysis"],
  "Portfolio Permitting":       ["Permit Set Preparation", "City Comments Response"],
  "Tenant Improvement":         ["Tenant Improvement Packages", "City Comments Response", "MEP Coordination"],
  "New Business Location":      ["Architectural Drafting", "Permit Set Preparation", "MEP Coordination"],
  "ADA Compliance Upgrade":     ["Architectural Drafting", "City Comments Response"],
  "Signage Permit":             ["Signage Permit Drawings"],
  "Short-Term Rental Conversion": ["Short-Term Rental Conversion Permits", "City Comments Response"],
};

const TOTAL_STEPS = 9;

// ─── Smart budget estimation ───────────────────────────────────────────────────

// Base cost per service (USD, national average for drafting/permit work)
const SERVICE_BASE_COSTS: Record<string, number> = {
  "Architectural Drafting":               2500,
  "Permit Set Preparation":               2000,
  "City Comments Response":               800,
  "Structural Coordination":              1500,
  "Code and Compliance Review":           1000,
  "Renderings and Visualization":         2800,
  "ADU Permit Packages":                  4000,
  "Solar and EV Permit Packages":         1200,
  "MEP Coordination":                     2000,
  "Entitlement Support":                  3500,
  "Pre-Application Meeting Prep":         700,
  "As-Built Documentation":              1500,
  "Tenant Improvement Packages":          3000,
  "Digital Walkthroughs":                2500,
  "3D Staging":                          2000,
  "Project Strategy":                    1200,
  "Feasibility Study":                   1500,
  "Home Addition Packages":              3500,
  "Garage Conversion Packages":          2500,
  "Construction Administration Support": 2000,
  "Contractor Bid Package":              1000,
  "Pool and Spa Permit Packages":        1500,
  "Interior Remodel Packages":           2000,
  "Short-Term Rental Conversion Permits":1200,
  "Accessory Structure Permits":         1500,
  "Title 24 Energy Compliance":          1000,
  "Historic District Submissions":       2500,
  "BIM Coordination":                    3000,
  "Zoning Code Research":                800,
  "Permit Pathway Analysis":             800,
  "Pre-Purchase Assessment":             600,
  "Scope Definition":                    600,
  "Design Options Study":                1200,
  "Compliance Gap Analysis":             800,
  "Deferred Submittal Packages":         1500,
  "Fire and Life Safety Drawings":       2000,
  "Signage Permit Drawings":             800,
  "Interior Detail Package":             2000,
  "Site Plan Package":                   1500,
  "Record Drawing Updates":              1200,
  "Demolition Permit Drawings":          1200,
  "Redline to CAD Conversion":           800,
};

// Project size multiplier
const SIZE_MULT: Record<string, number> = {
  "Under 500 sq ft":      0.70,
  "500 to 1,500 sq ft":   1.00,
  "1,500 to 3,000 sq ft": 1.30,
  "3,000 sq ft or more":  1.70,
  "Not sure yet":         1.00,
};

// Project stage multiplier (how much work is already done)
const STAGE_MULT: Record<string, number> = {
  "Just an idea, no drawings yet":            1.30,
  "Have sketches or rough concepts":          1.10,
  "Have existing drawings":                   0.85,
  "Ready to submit, need a permit package":   0.70,
};

// Timeline urgency surcharge
const TIMELINE_MULT: Record<string, number> = {
  "Urgent, within 2 weeks":    1.25,
  "Soon, 1 to 2 months":       1.05,
  "Planning ahead, 3+ months": 1.00,
  "Not sure yet":              1.00,
};

// State cost multiplier relative to national average
const STATE_COST_MULT: Record<string, number> = {
  "california": 1.40, "ca": 1.40,
  "new york":   1.35, "ny": 1.35,
  "massachusetts": 1.30, "ma": 1.30,
  "washington": 1.25, "wa": 1.25,
  "new jersey": 1.20, "nj": 1.20,
  "connecticut":1.20, "ct": 1.20,
  "colorado":   1.15, "co": 1.15,
  "oregon":     1.15, "or": 1.15,
  "florida":    1.10, "fl": 1.10,
  "virginia":   1.10, "va": 1.10,
  "maryland":   1.10, "md": 1.10,
  "illinois":   1.10, "il": 1.10,
  "georgia":    1.05, "ga": 1.05,
  "texas":      1.00, "tx": 1.00,
  "arizona":    1.00, "az": 1.00,
  "nevada":     1.00, "nv": 1.00,
};

// Extra city-level bump (stacks on top of state)
const CITY_COST_BUMP: Record<string, number> = {
  "new york":      0.30,
  "san francisco": 0.30,
  "los angeles":   0.20,
  "miami":         0.10,
  "boston":        0.20,
  "seattle":       0.15,
  "chicago":       0.10,
  "washington":    0.15,
  "denver":        0.10,
  "san jose":      0.20,
  "san diego":     0.15,
  "honolulu":      0.20,
};

function computeEstimate(
  services:     string[],
  city:         string,
  state:        string,
  projectSize:  string,
  projectStage: string,
  timeline:     string,
): number {
  if (!services.length) return 0;
  const base = services.reduce((sum, s) => sum + (SERVICE_BASE_COSTS[s] ?? 1000), 0);

  // Location
  const stateKey  = Object.keys(STATE_COST_MULT).find((k) => state.toLowerCase().includes(k));
  const stateMult = stateKey ? STATE_COST_MULT[stateKey] : 1.0;
  const cityLower = city.toLowerCase();
  const cityBump  = Object.entries(CITY_COST_BUMP).find(([k]) => cityLower.includes(k))?.[1] ?? 0;

  // Complexity
  const sizeMult     = SIZE_MULT[projectSize]   ?? 1.0;
  const stageMult    = STAGE_MULT[projectStage] ?? 1.0;
  const timelineMult = TIMELINE_MULT[timeline]  ?? 1.0;

  return Math.round(base * (stateMult + cityBump) * sizeMult * stageMult * timelineMult);
}

function niceRound(n: number): number {
  if (n <=  2000) return Math.round(n / 250) * 250;
  if (n <=  5000) return Math.round(n / 500) * 500;
  if (n <= 20000) return Math.round(n / 1000) * 1000;
  if (n <= 50000) return Math.round(n / 2500) * 2500;
  return Math.round(n / 5000) * 5000;
}

function fmtBudget(n: number): string {
  return "$" + n.toLocaleString("en-US");
}

function smartBudgetOptions(estimate: number): { label: string; value: number; recommended: boolean }[] {
  const defaults = [2000, 5000, 8000, 10000, 15000, 20000, 30000, 50000, 100000];

  let opts: { label: string; value: number; recommended: boolean }[];

  if (estimate <= 0) {
    opts = defaults.map((v) => ({ label: fmtBudget(v), value: v, recommended: false }));
  } else {
    const multipliers = [0.4, 0.6, 0.8, 1.0, 1.25, 1.6, 2.2];
    const seen = new Set<number>();
    opts = [];
    for (const m of multipliers) {
      const v = niceRound(estimate * m);
      if (v < 500 || seen.has(v)) continue;
      seen.add(v);
      opts.push({ label: fmtBudget(v), value: v, recommended: false });
    }
    opts.sort((a, b) => a.value - b.value);
  }

  // Always prepend a "Less than $X" escape option using the lowest number
  const lowest = opts[0]?.value ?? defaults[0];
  return [
    { label: `Less than ${fmtBudget(lowest)}`, value: 0, recommended: false },
    ...opts,
  ];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const inputClass =
  "w-full border border-white/25 bg-white/10 px-4 py-3.5 text-sm font-light text-white " +
  "placeholder:text-white/40 focus:border-secondary focus:bg-white/[0.14] focus:outline-none " +
  "transition-all duration-150 rounded-none";

// ─── Component ────────────────────────────────────────────────────────────────

export function PricingForm() {
  const [step, setStep]             = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone]             = useState(false);
  const [submitError, setSubmitError] = useState("");

  // "Other" state per step
  const [otherActive, setOtherActive] = useState<string | null>(null);
  const [otherText, setOtherText]     = useState<Record<string, string>>({});

  // Custom service input (step 7)
  const [customServiceText, setCustomServiceText] = useState("");
  const [showCustomInput, setShowCustomInput]     = useState(false);
  const customInputRef = useRef<HTMLInputElement>(null);

  // Custom budget input (step 6)
  const [customBudget, setCustomBudget]           = useState("");
  const [showCustomBudget, setShowCustomBudget]   = useState(false);
  const customBudgetRef = useRef<HTMLInputElement>(null);

  // IP geolocation for step 7
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationDetected, setLocationDetected] = useState(false);

  // File upload
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState<PricingFormData>({
    clientType:   "",
    projectType:  "",
    projectStage: "",
    projectSize:  "",
    timeline:     "",
    budget:       "",
    city:         "",
    state:        "",
    county:       "",
    services:     [],
    name:         "",
    email:        "",
    phone:        "",
    notes:        "",
  });

  const progress = Math.round(((step - 1) / TOTAL_STEPS) * 100);

  const suggestedServices = useMemo(
    () => SERVICE_MAP[data.projectType] ?? [],
    [data.projectType],
  );

  const hasExistingDrawings =
    data.projectStage.toLowerCase().includes("existing drawings") ||
    data.projectStage.toLowerCase().includes("ready to submit");

  const advance = useCallback((next: number, updates?: Partial<PricingFormData>) => {
    setOtherActive(null);
    setData((prev) => {
      const merged = { ...prev, ...updates };
      // Pre-select services when entering step 6
      if (next === 6 && merged.services.length === 0) {
        merged.services = SERVICE_MAP[merged.projectType] ?? [];
      }
      return merged;
    });
    setStep(next);
  }, []);

  const selectSingle = useCallback(
    (field: keyof PricingFormData, value: string) => {
      setTimeout(() => advance(step + 1, { [field]: value }), 180);
    },
    [step, advance],
  );

  const selectOther = useCallback((stepKey: string) => {
    setOtherActive(stepKey);
  }, []);

  const confirmOther = useCallback(
    (field: keyof PricingFormData, stepKey: string) => {
      const val = (otherText[stepKey] ?? "").trim();
      if (!val) return;
      advance(step + 1, { [field]: val });
    },
    [otherText, step, advance],
  );

  const toggleService = useCallback((label: string) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.includes(label)
        ? prev.services.filter((s) => s !== label)
        : [...prev.services, label],
    }));
  }, []);

  const addCustomService = useCallback(() => {
    const val = customServiceText.trim();
    if (!val) return;
    setData((prev) => ({
      ...prev,
      services: prev.services.includes(val) ? prev.services : [...prev.services, val],
    }));
    setCustomServiceText("");
    setShowCustomInput(false);
  }, [customServiceText]);

  useEffect(() => {
    if (showCustomInput) customInputRef.current?.focus();
  }, [showCustomInput]);

  useEffect(() => {
    if (showCustomBudget) customBudgetRef.current?.focus();
  }, [showCustomBudget]);

  // Auto-detect city, county, and state from IP when entering step 7
  useEffect(() => {
    if (step !== 7 || data.city || data.state) return;
    setLocationLoading(true);

    (async () => {
      try {
        // Step 1 — get city, state, and lat/lon from IP
        const ipRes  = await fetch("https://ipapi.co/json/");
        const loc    = await ipRes.json();
        if (!loc.city || !loc.region) return;

        setData((p) => ({
          ...p,
          city:  p.city  || loc.city,
          state: p.state || loc.region,
        }));

        // Step 2 — use lat/lon to reverse-geocode county via Nominatim
        if (loc.latitude && loc.longitude) {
          const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${loc.latitude}&lon=${loc.longitude}`,
            { headers: { "User-Agent": "CADTRI-PricingForm/1.0" } },
          );
          const geo = await geoRes.json();
          const county = geo?.address?.county as string | undefined;
          if (county) {
            setData((p) => ({ ...p, county: p.county || county }));
          }
        }

        setLocationDetected(true);
      } catch {
        // fail silently — user fills in manually
      } finally {
        setLocationLoading(false);
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const handleSubmit = async () => {
    if (!data.name.trim() || !data.email.trim()) return;
    setSubmitting(true);
    setSubmitError("");

    try {
      const fd = new FormData();
      fd.append("data", JSON.stringify(data));
      if (file) fd.append("file", file);

      const result = await submitPricingForm(fd);

      if (result.status === "success") {
        setDone(true);
      } else {
        setSubmitError(result.message ?? "Something went wrong. Please try again.");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("[pricing] client submit error:", msg);
      setSubmitError("Something went wrong. Please email us directly at info@cadtri.com.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success screen ────────────────────────────────────────────────────────
  if (done) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-8 py-20 text-center">
        <CheckCircle size={44} strokeWidth={1.5} className="mb-8 text-secondary" />
        <h2
          className="mb-5 font-bold text-white"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.03em" }}
        >
          Request received.
        </h2>
        <p className="max-w-md text-base font-light leading-relaxed text-white/50">
          We will review your project details and send a tailored estimate
          within one business day.
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

  // ── Layout wrapper ────────────────────────────────────────────────────────
  // Steps 6–9 use a wide centered layout; steps 1–5 use a two-column split
  const isWideStep = step >= 6;

  // Step meta used in left panel
  const STEP_META: Record<number, { question: string; description: string }> = {
    1: {
      question: "Which best describes you?",
      description: "We tailor the rest of the form to your role so you only see options that are relevant to your type of project.",
    },
    2: {
      question: "What are you working on?",
      description: "Select the project type that fits closest. This helps us match you with the right service package and scope.",
    },
    3: {
      question: "Where are you in the process?",
      description: "Knowing your current stage lets us quote accurately and identify what drawings or documents you may already have.",
    },
    4: {
      question: "How large is the project?",
      description: "Approximate square footage is fine. Project size affects drafting time, permit fees, and overall scope.",
    },
    5: {
      question: "What is your timeline?",
      description: "We work to accommodate urgent timelines. Knowing your target date helps us plan production and review cycles.",
    },
  };

  const meta = STEP_META[step];

  return (
    <div className="flex flex-1 flex-col">
      {/* Progress bar — flush to top */}
      <div className="h-[3px] w-full bg-white/[0.08]">
        <div
          className="h-full bg-secondary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {!isWideStep ? (
        /* ── Steps 1–5: Two-column split on lg+ ── */
        <div className="flex flex-1 flex-col lg:flex-row lg:items-stretch">

          {/* Left panel — question + nav */}
          <div className="relative flex flex-col border-b border-white/[0.06] px-8 pb-10 pt-12 lg:w-[38%] lg:border-b-0 lg:border-r lg:px-14 lg:pb-20 lg:pt-16">
            <div>
              <p className="mb-5 text-[11px] font-medium uppercase tracking-widest text-secondary">
                Step {step} of {TOTAL_STEPS}
              </p>
              <h2
                className="font-bold text-white"
                style={{
                  fontSize: "clamp(1.75rem, 2.8vw, 2.75rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.06,
                }}
              >
                {meta?.question}
              </h2>
              <p className="mt-5 text-sm font-light leading-relaxed text-white/40">
                {meta?.description}
              </p>
            </div>
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="mt-10 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-white/30 transition-colors hover:text-white/70 lg:absolute lg:bottom-14 lg:left-14 lg:mt-0"
              >
                <ArrowLeft size={12} strokeWidth={2} />
                Back
              </button>
            )}
          </div>

          {/* Right panel — fills full height, cards stretch to fill */}
          <div className="flex flex-1 flex-col overflow-y-auto px-8 pb-10 pt-12 lg:px-14 lg:pb-20 lg:pt-16">

            {/* ── Step 1 ── */}
            {step === 1 && (
              <div className="animate-in flex flex-col gap-3">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {CLIENT_TYPES.map((opt) => (
                    <SelectCard key={opt.label} label={opt.label} sub={opt.sub}
                      icon={CARD_ICONS[opt.label]}
                      selected={data.clientType === opt.label}
                      onClick={() => selectSingle("clientType", opt.label)} />
                  ))}
                </div>
                <OtherCard stepKey="clientType" active={otherActive === "clientType"}
                  value={otherText["clientType"] ?? ""}
                  onChange={(v) => setOtherText((p) => ({ ...p, clientType: v }))}
                  onActivate={() => selectOther("clientType")}
                  onConfirm={() => confirmOther("clientType", "clientType")} />
              </div>
            )}

            {/* ── Step 2 ── */}
            {step === 2 && (
              <div className="animate-in flex flex-col gap-3">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {(PROJECT_TYPES[data.clientType] ?? PROJECT_TYPES["General Contractor"]).map((label) => (
                    <SelectCard key={label} label={label}
                      icon={CARD_ICONS[label]}
                      selected={data.projectType === label}
                      onClick={() => selectSingle("projectType", label)} />
                  ))}
                </div>
                <OtherCard stepKey="projectType" active={otherActive === "projectType"}
                  value={otherText["projectType"] ?? ""}
                  onChange={(v) => setOtherText((p) => ({ ...p, projectType: v }))}
                  onActivate={() => selectOther("projectType")}
                  onConfirm={() => confirmOther("projectType", "projectType")} />
              </div>
            )}

            {/* ── Step 3 ── */}
            {step === 3 && (
              <div className="animate-in flex flex-col gap-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  {STAGE_OPTIONS.map((label) => (
                    <SelectCard key={label} label={label}
                      icon={CARD_ICONS[label]}
                      selected={data.projectStage === label}
                      onClick={() => selectSingle("projectStage", label)} />
                  ))}
                </div>
                <OtherCard stepKey="projectStage" active={otherActive === "projectStage"}
                  value={otherText["projectStage"] ?? ""}
                  onChange={(v) => setOtherText((p) => ({ ...p, projectStage: v }))}
                  onActivate={() => selectOther("projectStage")}
                  onConfirm={() => confirmOther("projectStage", "projectStage")} />
              </div>
            )}

            {/* ── Step 4 ── */}
            {step === 4 && (
              <div className="animate-in flex flex-col gap-3">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {SIZE_OPTIONS.map((label) => (
                    <SelectCard key={label} label={label}
                      icon={CARD_ICONS[label]}
                      selected={data.projectSize === label}
                      onClick={() => selectSingle("projectSize", label)} />
                  ))}
                </div>
                <OtherCard stepKey="projectSize" active={otherActive === "projectSize"}
                  value={otherText["projectSize"] ?? ""}
                  onChange={(v) => setOtherText((p) => ({ ...p, projectSize: v }))}
                  onActivate={() => selectOther("projectSize")}
                  onConfirm={() => confirmOther("projectSize", "projectSize")} />
              </div>
            )}

            {/* ── Step 5 ── */}
            {step === 5 && (
              <div className="animate-in flex flex-col gap-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  {TIMELINE_OPTIONS.map((label) => (
                    <SelectCard key={label} label={label}
                      icon={CARD_ICONS[label]}
                      selected={data.timeline === label}
                      onClick={() => selectSingle("timeline", label)} />
                  ))}
                </div>
                <OtherCard stepKey="timeline" active={otherActive === "timeline"}
                  value={otherText["timeline"] ?? ""}
                  onChange={(v) => setOtherText((p) => ({ ...p, timeline: v }))}
                  onActivate={() => selectOther("timeline")}
                  onConfirm={() => confirmOther("timeline", "timeline")} />
              </div>
            )}

          </div>
        </div>

      ) : (
        /* ── Steps 6–9: Fixed top-anchored layout ── */
        <div className="flex flex-1 flex-col overflow-y-auto px-8 pb-16 pt-12 sm:px-12 lg:px-20 lg:pt-16">

          {/* Fixed nav row — always at the same position */}
          <div className="mb-10 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-white/30 transition-colors hover:text-white/70"
            >
              <ArrowLeft size={12} strokeWidth={2} />
              Back
            </button>
            <span className="text-[11px] tabular-nums tracking-widest text-white/25">
              {step} / {TOTAL_STEPS}
            </span>
          </div>

          {/* Step 6 uses full width for honeycomb; others are constrained */}
          <div className={cn("w-full", step !== 6 && "max-w-3xl")}>

            {/* ── Step 6: Services — honeycomb ── */}
            {step === 6 && (
              <div className="animate-in">
                <StepLabel n={6} />
                <Question>Which services do you need?</Question>
                <p className="mb-6 text-sm font-light text-white/40">
                  Select all that apply. Pre-selected based on your project type.
                </p>

                {/* Honeycomb staggered rows */}
                <div className="space-y-2">
                  {(() => {
                    let cursor = 0;
                    return HONEYCOMB_ROWS.map((rowSize, rowIdx) => {
                      const row = ALL_SERVICES.slice(cursor, cursor + rowSize);
                      cursor += rowSize;
                      return (
                        <div
                          key={rowIdx}
                          className="flex gap-2"
                          style={rowIdx % 2 === 1 ? { paddingLeft: "4%" } : {}}
                        >
                          {row.map((label) => {
                            const selected = data.services.includes(label);
                            const suggested = suggestedServices.includes(label);
                            return (
                              <button
                                key={label}
                                type="button"
                                onClick={() => toggleService(label)}
                                className={cn(
                                  "flex-1 rounded-xl border px-3 py-3 text-xs font-medium leading-snug transition-all duration-200",
                                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary",
                                  selected
                                    ? "border-secondary bg-secondary/15 text-secondary"
                                    : suggested
                                    ? "border-white/30 bg-white/[0.07] text-white/75 hover:border-secondary/50 hover:text-white"
                                    : "border-white/12 bg-white/[0.03] text-white/45 hover:border-white/25 hover:text-white/70",
                                )}
                              >
                                {selected && (
                                  <Check size={9} strokeWidth={3} className="inline mb-0.5 mr-1" />
                                )}
                                {label}
                              </button>
                            );
                          })}
                        </div>
                      );
                    });
                  })()}
                </div>

                {/* Custom services added by the user */}
                {data.services.filter((s) => !ALL_SERVICES.includes(s)).length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {data.services
                      .filter((s) => !ALL_SERVICES.includes(s))
                      .map((label) => (
                        <button
                          key={label}
                          type="button"
                          onClick={() => toggleService(label)}
                          className="inline-flex items-center gap-2 rounded-xl border border-secondary bg-secondary/15 px-4 py-2 text-xs font-medium text-secondary"
                        >
                          <Check size={9} strokeWidth={3} />
                          {label}
                          <X size={9} strokeWidth={2.5} className="opacity-60" />
                        </button>
                      ))}
                  </div>
                )}

                {/* Add your own + Continue row */}
                <div className="mt-5 flex items-center gap-4">
                  {showCustomInput ? (
                    <div className="inline-flex items-center gap-0 rounded-xl border border-secondary/60 bg-white/[0.07] pl-4 pr-1 py-1">
                      <input
                        ref={customInputRef}
                        type="text"
                        value={customServiceText}
                        onChange={(e) => setCustomServiceText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") addCustomService();
                          if (e.key === "Escape") { setShowCustomInput(false); setCustomServiceText(""); }
                        }}
                        placeholder="e.g. Historic preservation"
                        className="w-48 bg-transparent text-sm font-medium text-white placeholder:text-white/30 focus:outline-none"
                      />
                      <button type="button" onClick={addCustomService} disabled={!customServiceText.trim()}
                        className={cn("ml-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all",
                          customServiceText.trim() ? "bg-secondary text-white" : "bg-white/10 text-white/30")}>
                        <Check size={12} strokeWidth={2.5} />
                      </button>
                      <button type="button" onClick={() => { setShowCustomInput(false); setCustomServiceText(""); }}
                        className="ml-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-white/30 hover:text-white/60">
                        <X size={11} strokeWidth={2} />
                      </button>
                    </div>
                  ) : (
                    <button type="button" onClick={() => setShowCustomInput(true)}
                      className="inline-flex items-center gap-2 rounded-xl border border-dashed border-white/20 px-4 py-2 text-xs font-medium text-white/35 hover:border-white/35 hover:text-white/60 transition-all duration-200">
                      <Plus size={11} strokeWidth={2.5} />
                      Add your own
                    </button>
                  )}

                  <button
                    type="button"
                    disabled={data.services.length === 0}
                    onClick={() => advance(7)}
                    className={cn(
                      "ml-auto px-10 py-3 text-sm font-semibold uppercase tracking-widest transition-all duration-200",
                      data.services.length > 0
                        ? "bg-secondary text-white hover:bg-secondary/90"
                        : "bg-white/[0.06] text-white/20 cursor-not-allowed",
                    )}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* ── Step 7: Location ── */}
            {step === 7 && (
              <div className="animate-in">
                <StepLabel n={7} />
                <Question>Where is the project located?</Question>
                <div className="mb-8 flex items-center gap-2">
                  <p className="text-sm font-light text-white/40">
                    Location affects permit requirements and project complexity.
                  </p>
                  {locationLoading && (
                    <span className="text-xs text-white/30 animate-pulse">Detecting...</span>
                  )}
                  {locationDetected && !locationLoading && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.05] px-2 py-0.5 text-[10px] font-medium text-white/40">
                      <span className="h-1.5 w-1.5 rounded-full bg-secondary/70" />
                      Auto-detected
                    </span>
                  )}
                </div>
                <div className="grid gap-5 sm:grid-cols-3">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-widest text-white/55">
                      City <span className="text-secondary">*</span>
                    </label>
                    <input
                      type="text"
                      value={data.city}
                      onChange={(e) => {
                        setLocationDetected(false);
                        setData((p) => ({ ...p, city: e.target.value }));
                      }}
                      placeholder={locationLoading ? "Detecting..." : "e.g. Miami"}
                      className={inputClass}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-widest text-white/55">
                      County{" "}
                      <span className="text-white/30 font-light normal-case tracking-normal">optional</span>
                    </label>
                    <input
                      type="text"
                      value={data.county}
                      onChange={(e) => setData((p) => ({ ...p, county: e.target.value }))}
                      placeholder="e.g. Miami-Dade"
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
                      onChange={(e) => {
                        setLocationDetected(false);
                        setData((p) => ({ ...p, state: e.target.value }));
                      }}
                      placeholder={locationLoading ? "Detecting..." : "e.g. Florida"}
                      className={inputClass}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  disabled={data.city.trim().length < 2 || data.state.trim().length < 2}
                  onClick={() => advance(8)}
                  className={cn(
                    "mt-10 px-12 py-4 text-sm font-semibold uppercase tracking-widest transition-all duration-200",
                    data.city.trim().length >= 2 && data.state.trim().length >= 2
                      ? "bg-secondary text-white hover:bg-secondary/90"
                      : "bg-white/[0.06] text-white/20 cursor-not-allowed",
                  )}
                >
                  Continue
                </button>
              </div>
            )}

            {/* ── Step 8: Budget ── */}
            {step === 8 && (
              <div className="animate-in">
                <StepLabel n={8} />
                <Question>What is your project budget?</Question>
                <p className="mb-10 text-sm font-light text-white/40">
                  No commitment. This just helps us tailor the right package for you.
                </p>

                <div className="flex max-w-sm flex-col gap-4">
                  <div className="relative">
                    <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-lg font-light text-white/40">
                      $
                    </span>
                    <input
                      type="text"
                      autoFocus
                      value={data.budget.replace(/^\$/, "")}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9,]/g, "");
                        setData((p) => ({ ...p, budget: val ? `$${val}` : "" }));
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && data.budget.trim()) {
                          advance(9);
                        }
                      }}
                      placeholder="e.g. 8,500"
                      className={cn(
                        inputClass,
                        "rounded-2xl border-white/20 bg-white/[0.06] py-5 pl-10 pr-5 text-xl font-light",
                        "focus:border-secondary focus:bg-white/[0.1]",
                      )}
                    />
                  </div>

                  <p className="text-xs font-light text-white/25">
                    Type any number. Press Enter or click Continue when done.
                  </p>

                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      disabled={!data.budget.trim()}
                      onClick={() => advance(9)}
                      className={cn(
                        "px-10 py-3.5 text-sm font-semibold uppercase tracking-widest transition-all duration-200",
                        data.budget.trim()
                          ? "bg-secondary text-white hover:bg-secondary/90"
                          : "bg-white/[0.06] text-white/20 cursor-not-allowed",
                      )}
                    >
                      Continue
                    </button>
                    <button
                      type="button"
                      onClick={() => advance(9, { budget: "Prefer not to say" })}
                      className="text-xs font-light text-white/25 underline underline-offset-4 transition-colors hover:text-white/50"
                    >
                      Skip this question
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── Step 9: Contact + file upload ── */}
            {step === 9 && (
              <div className="animate-in">
                <StepLabel n={9} label="Last step" />
                <Question>Where should we send your estimate?</Question>
                <p className="mb-8 text-sm font-light text-white/40">
                  We review every request manually and respond within one business day.
                </p>

                <div className="flex flex-col gap-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold uppercase tracking-widest text-white/55">
                        Full Name <span className="text-secondary">*</span>
                      </label>
                      <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData((p) => ({ ...p, name: e.target.value }))}
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
                        onChange={(e) => setData((p) => ({ ...p, email: e.target.value }))}
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
                      onChange={(e) => setData((p) => ({ ...p, phone: e.target.value }))}
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
                      onChange={(e) => setData((p) => ({ ...p, notes: e.target.value }))}
                      rows={3}
                      placeholder="Any details that would help us give a more accurate estimate"
                      className={cn(inputClass, "resize-none")}
                    />
                  </div>

                  {/* File upload */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-widest text-white/55">
                      {hasExistingDrawings ? "Upload your drawings" : "Attach a reference file"}{" "}
                      <span className="text-white/30 font-light normal-case tracking-normal">
                        optional, max 10 MB
                      </span>
                    </label>

                    {file ? (
                      <div className="flex items-center justify-between border border-white/20 bg-white/[0.06] px-4 py-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <Paperclip size={13} strokeWidth={1.5} className="shrink-0 text-secondary" />
                          <span className="truncate text-sm font-light text-white/70">{file.name}</span>
                          <span className="shrink-0 text-xs text-white/30">
                            {(file.size / 1024 / 1024).toFixed(1)} MB
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setFile(null)}
                          className="ml-3 shrink-0 text-white/30 hover:text-white/70 transition-colors"
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
                    onClick={handleSubmit}
                    className={cn(
                      "py-4 text-sm font-semibold uppercase tracking-widest transition-all duration-200",
                      data.name.trim() && data.email.trim() && !submitting
                        ? "bg-secondary text-white hover:bg-secondary/90"
                        : "bg-white/[0.06] text-white/20 cursor-not-allowed",
                    )}
                  >
                    {submitting ? "Sending your request..." : "Send My Request"}
                  </button>

                  <p className="text-center text-xs font-light text-white/25">
                    No spam. We only use this to send your pricing estimate.
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

// ─── Small shared sub-components ─────────────────────────────────────────────

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
      style={{
        fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
        letterSpacing: "-0.03em",
        lineHeight: 1.1,
      }}
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
        "group relative w-full border rounded-2xl px-5 py-6 min-h-[140px] sm:min-h-[160px]",
        "flex flex-col items-center justify-center gap-4 transition-all duration-200",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary",
        selected
          ? "border-secondary bg-secondary/10"
          : "border-white/15 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.08]",
      )}
    >
      {/* Radio — absolute top-right */}
      <span className={cn(
        "absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full border transition-all duration-150",
        selected ? "border-secondary bg-secondary" : "border-white/20 group-hover:border-white/45",
      )}>
        {selected && <Check size={10} strokeWidth={3} className="text-white" />}
      </span>

      {/* Icon — large, centered */}
      <div className={cn(
        "transition-colors duration-200",
        selected ? "text-white/50" : "text-white/20 group-hover:text-white/35",
      )}>
        {Icon ? <Icon size={40} strokeWidth={1.25} /> : <div className="h-10 w-10" />}
      </div>

      {/* Label + sub — centered below icon */}
      <div className="text-center">
        <p className={cn(
          "text-base font-semibold leading-snug transition-colors duration-150",
          selected ? "text-secondary" : "text-white",
        )}>
          {label}
        </p>
        {sub && (
          <p className="mt-1.5 text-sm font-light leading-relaxed text-white/40">{sub}</p>
        )}
      </div>
    </button>
  );
}

function OtherCard({
  stepKey,
  active,
  value,
  onChange,
  onActivate,
  onConfirm,
}: {
  stepKey: string;
  active: boolean;
  value: string;
  onChange: (v: string) => void;
  onActivate: () => void;
  onConfirm: () => void;
}) {
  if (!active) {
    return (
      <button
        type="button"
        onClick={onActivate}
        className="w-full text-left border border-dashed border-white/15 bg-transparent rounded-2xl px-6 py-4 text-base font-medium text-white/30 transition-all duration-200 hover:border-white/30 hover:text-white/55"
      >
        Something else, I&apos;ll describe it
      </button>
    );
  }

  return (
    <div className="flex gap-2">
      <input
        type="text"
        autoFocus
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") onConfirm(); }}
        placeholder={`Describe your ${stepKey.replace(/([A-Z])/g, " $1").toLowerCase()}...`}
        className="flex-1 rounded-2xl border border-secondary/50 bg-white/[0.08] px-4 py-3.5 text-sm font-light text-white placeholder:text-white/35 focus:border-secondary focus:outline-none transition-all"
      />
      <button
        type="button"
        disabled={!value.trim()}
        onClick={onConfirm}
        className={cn(
          "shrink-0 rounded-2xl px-6 py-3.5 text-sm font-semibold uppercase tracking-wider transition-all",
          value.trim() ? "bg-secondary text-white" : "bg-white/[0.06] text-white/20 cursor-not-allowed",
        )}
      >
        Next
      </button>
    </div>
  );
}
