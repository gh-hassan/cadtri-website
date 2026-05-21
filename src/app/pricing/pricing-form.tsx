"use client";

import { useState, useCallback, useMemo, useRef } from "react";
import { ArrowLeft, Check, CheckCircle, Paperclip, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { submitPricingForm, type PricingFormData } from "./actions";

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

// Universal services — no state-specific items
const ALL_SERVICES = [
  "Architectural drawings",
  "Permit set preparation",
  "ADU permit package",
  "Structural coordination",
  "MEP coordination",
  "BIM coordination",
  "Plan check response",
  "As-built documentation",
  "Site plan package",
  "Tenant improvement package",
  "Feasibility study",
  "Zoning code research",
  "Permit pathway analysis",
  "Demolition permit drawings",
  "Signage permit drawings",
  "Not sure, need guidance",
];

// Smart pre-selection per project type
const SERVICE_MAP: Record<string, string[]> = {
  "Home Addition":             ["Architectural drawings", "Permit set preparation", "Structural coordination"],
  "ADU or Garage Conversion":  ["ADU permit package", "Architectural drawings", "Structural coordination"],
  "Interior Remodel":          ["Architectural drawings", "Plan check response"],
  "New Custom Home":           ["Architectural drawings", "Permit set preparation", "Structural coordination", "Site plan package"],
  "Pool or Spa":               ["Permit set preparation", "Structural coordination"],
  "Solar or EV Installation":  ["Permit set preparation"],
  "Accessory Structure":       ["Permit set preparation"],
  "Residential Project":       ["Architectural drawings", "Permit set preparation", "Structural coordination"],
  "Commercial Build-out":      ["Architectural drawings", "Plan check response", "MEP coordination"],
  "Mixed-Use Development":     ["Architectural drawings", "BIM coordination", "MEP coordination"],
  "Permit Coordination":       ["Plan check response", "Permit set preparation"],
  "As-Built Documentation":    ["As-built documentation"],
  "Drafting Support":          ["Architectural drawings", "Structural coordination"],
  "Permit Set Coordination":   ["Permit set preparation", "Plan check response"],
  "BIM Coordination":          ["BIM coordination", "MEP coordination"],
  "Structural Coordination":   ["Structural coordination"],
  "Plan Check Response":       ["Plan check response"],
  "Overflow Drafting":         ["Architectural drawings"],
  "Ground-Up Construction":    ["Architectural drawings", "Permit set preparation", "Structural coordination", "Site plan package"],
  "Multi-Family Development":  ["Architectural drawings", "Permit set preparation", "BIM coordination"],
  "ADU Development":           ["ADU permit package", "Architectural drawings"],
  "Commercial Development":    ["Architectural drawings", "BIM coordination", "MEP coordination"],
  "Feasibility and Planning":  ["Feasibility study", "Zoning code research", "Permit pathway analysis"],
  "Portfolio Permitting":      ["Permit set preparation", "Plan check response"],
  "Tenant Improvement":        ["Tenant improvement package", "Plan check response", "MEP coordination"],
  "New Business Location":     ["Architectural drawings", "Permit set preparation", "MEP coordination"],
  "ADA Compliance Upgrade":    ["Architectural drawings", "Plan check response"],
  "Signage Permit":            ["Signage permit drawings"],
  "Short-Term Rental Conversion": ["Permit set preparation", "Plan check response"],
};

const TOTAL_STEPS = 8;

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

  // File upload
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState<PricingFormData>({
    clientType:   "",
    projectType:  "",
    projectStage: "",
    projectSize:  "",
    city:         "",
    state:        "",
    timeline:     "",
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

  const handleSubmit = async () => {
    if (!data.name.trim() || !data.email.trim()) return;
    setSubmitting(true);
    setSubmitError("");

    const fd = new FormData();
    fd.append("data", JSON.stringify(data));
    if (file) fd.append("file", file);

    const result = await submitPricingForm(fd);
    setSubmitting(false);

    if (result.status === "success") {
      setDone(true);
    } else {
      setSubmitError(result.message ?? "Something went wrong. Please try again.");
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
  // Steps 6–8 use a wide centered layout; steps 1–5 use a two-column split
  const isWideStep = step >= 6;

  // Step meta used in left panel
  const STEP_META: Record<number, { question: string; hint?: string }> = {
    1: { question: "Which best describes you?" },
    2: { question: "What are you working on?" },
    3: { question: "Where are you in the process?" },
    4: { question: "How large is the project?" },
    5: { question: "What is your timeline?" },
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
          <div className="relative flex flex-col justify-center border-b border-white/[0.06] px-8 py-12 lg:w-[38%] lg:border-b-0 lg:border-r lg:px-14 lg:py-20">
            <p className="mb-5 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Step {step} of {TOTAL_STEPS}
            </p>
            <h2
              className="font-bold text-white"
              style={{
                fontSize: "clamp(1.75rem, 2.8vw, 3rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.06,
              }}
            >
              {meta?.question}
            </h2>
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

          {/* Right panel — options */}
          <div className="flex flex-1 flex-col justify-center overflow-y-auto px-8 py-12 lg:px-14 lg:py-20">

            {/* ── Step 1 ── */}
            {step === 1 && (
              <div className="animate-in grid gap-3 sm:grid-cols-2">
                {CLIENT_TYPES.map((opt) => (
                  <SelectCard
                    key={opt.label}
                    label={opt.label}
                    sub={opt.sub}
                    selected={data.clientType === opt.label}
                    onClick={() => selectSingle("clientType", opt.label)}
                  />
                ))}
                <OtherCard
                  stepKey="clientType"
                  active={otherActive === "clientType"}
                  value={otherText["clientType"] ?? ""}
                  onChange={(v) => setOtherText((p) => ({ ...p, clientType: v }))}
                  onActivate={() => selectOther("clientType")}
                  onConfirm={() => confirmOther("clientType", "clientType")}
                />
              </div>
            )}

            {/* ── Step 2 ── */}
            {step === 2 && (
              <div className="animate-in grid gap-3 sm:grid-cols-2">
                {(PROJECT_TYPES[data.clientType] ?? PROJECT_TYPES["General Contractor"]).map((label) => (
                  <SelectCard
                    key={label}
                    label={label}
                    selected={data.projectType === label}
                    onClick={() => selectSingle("projectType", label)}
                  />
                ))}
                <OtherCard
                  stepKey="projectType"
                  active={otherActive === "projectType"}
                  value={otherText["projectType"] ?? ""}
                  onChange={(v) => setOtherText((p) => ({ ...p, projectType: v }))}
                  onActivate={() => selectOther("projectType")}
                  onConfirm={() => confirmOther("projectType", "projectType")}
                />
              </div>
            )}

            {/* ── Step 3 ── */}
            {step === 3 && (
              <div className="animate-in grid gap-3 sm:grid-cols-2">
                {STAGE_OPTIONS.map((label) => (
                  <SelectCard
                    key={label}
                    label={label}
                    selected={data.projectStage === label}
                    onClick={() => selectSingle("projectStage", label)}
                  />
                ))}
                <OtherCard
                  stepKey="projectStage"
                  active={otherActive === "projectStage"}
                  value={otherText["projectStage"] ?? ""}
                  onChange={(v) => setOtherText((p) => ({ ...p, projectStage: v }))}
                  onActivate={() => selectOther("projectStage")}
                  onConfirm={() => confirmOther("projectStage", "projectStage")}
                />
              </div>
            )}

            {/* ── Step 4 ── */}
            {step === 4 && (
              <div className="animate-in grid gap-3 sm:grid-cols-2">
                {SIZE_OPTIONS.map((label) => (
                  <SelectCard
                    key={label}
                    label={label}
                    selected={data.projectSize === label}
                    onClick={() => selectSingle("projectSize", label)}
                  />
                ))}
                <OtherCard
                  stepKey="projectSize"
                  active={otherActive === "projectSize"}
                  value={otherText["projectSize"] ?? ""}
                  onChange={(v) => setOtherText((p) => ({ ...p, projectSize: v }))}
                  onActivate={() => selectOther("projectSize")}
                  onConfirm={() => confirmOther("projectSize", "projectSize")}
                />
              </div>
            )}

            {/* ── Step 5 ── */}
            {step === 5 && (
              <div className="animate-in grid gap-3 sm:grid-cols-2">
                {TIMELINE_OPTIONS.map((label) => (
                  <SelectCard
                    key={label}
                    label={label}
                    selected={data.timeline === label}
                    onClick={() => selectSingle("timeline", label)}
                  />
                ))}
                <OtherCard
                  stepKey="timeline"
                  active={otherActive === "timeline"}
                  value={otherText["timeline"] ?? ""}
                  onChange={(v) => setOtherText((p) => ({ ...p, timeline: v }))}
                  onActivate={() => selectOther("timeline")}
                  onConfirm={() => confirmOther("timeline", "timeline")}
                />
              </div>
            )}

          </div>
        </div>

      ) : (
        /* ── Steps 6–8: Wide centered layout ── */
        <div className="flex flex-1 flex-col items-center justify-center px-8 py-12 sm:px-12">
          <div className="w-full max-w-3xl">

            {/* Nav row */}
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

            {/* ── Step 6: Services — pills ── */}
            {step === 6 && (
              <div className="animate-in">
                <StepLabel n={6} />
                <Question>Which services do you need?</Question>
                <p className="mb-8 text-sm font-light text-white/40">
                  We pre-selected the most relevant ones. Add or remove as needed.
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {ALL_SERVICES.map((label) => {
                    const selected = data.services.includes(label);
                    const suggested = suggestedServices.includes(label);
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => toggleService(label)}
                        className={cn(
                          "inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-200",
                          selected
                            ? "border-secondary bg-secondary/15 text-secondary"
                            : suggested
                            ? "border-white/30 bg-white/[0.07] text-white/70 hover:border-secondary/60 hover:text-white"
                            : "border-white/15 bg-transparent text-white/40 hover:border-white/30 hover:text-white/70",
                        )}
                      >
                        {selected && <Check size={11} strokeWidth={2.5} />}
                        {label}
                      </button>
                    );
                  })}
                </div>
                <button
                  type="button"
                  disabled={data.services.length === 0}
                  onClick={() => advance(7)}
                  className={cn(
                    "mt-10 px-12 py-4 text-sm font-semibold uppercase tracking-widest transition-all duration-200",
                    data.services.length > 0
                      ? "bg-secondary text-white hover:bg-secondary/90"
                      : "bg-white/[0.06] text-white/20 cursor-not-allowed",
                  )}
                >
                  Continue
                </button>
              </div>
            )}

            {/* ── Step 7: Location ── */}
            {step === 7 && (
              <div className="animate-in">
                <StepLabel n={7} />
                <Question>Where is the project located?</Question>
                <p className="mb-8 text-sm font-light text-white/40">
                  Location affects permit requirements and project complexity.
                </p>
                <div className="grid gap-5 sm:grid-cols-[1fr_200px]">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-widest text-white/55">
                      City <span className="text-secondary">*</span>
                    </label>
                    <input
                      type="text"
                      value={data.city}
                      onChange={(e) => setData((p) => ({ ...p, city: e.target.value }))}
                      placeholder="e.g. Miami"
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
                      onChange={(e) => setData((p) => ({ ...p, state: e.target.value }))}
                      placeholder="e.g. Florida"
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

            {/* ── Step 8: Contact + file upload ── */}
            {step === 8 && (
              <div className="animate-in">
                <StepLabel n={8} label="Last step" />
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
}: {
  label: string;
  sub?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group w-full text-left border px-6 py-6 min-h-[88px] transition-all duration-200",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary",
        selected
          ? "border-secondary bg-secondary/10"
          : "border-white/15 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.08]",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
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
        <span className={cn(
          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all duration-150",
          selected ? "border-secondary bg-secondary" : "border-white/20 group-hover:border-white/45",
        )}>
          {selected && <Check size={10} strokeWidth={3} className="text-white" />}
        </span>
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
        className="w-full text-left border border-dashed border-white/15 bg-transparent px-6 py-5 text-base font-medium text-white/30 transition-all duration-200 hover:border-white/30 hover:text-white/55"
      >
        Something else, I&apos;ll describe it
      </button>
    );
  }

  return (
    <div className="col-span-full flex gap-2">
      <input
        type="text"
        autoFocus
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") onConfirm(); }}
        placeholder={`Describe your ${stepKey.replace(/([A-Z])/g, " $1").toLowerCase()}...`}
        className="flex-1 border border-secondary/50 bg-white/[0.08] px-4 py-3.5 text-sm font-light text-white placeholder:text-white/35 focus:border-secondary focus:outline-none transition-all"
      />
      <button
        type="button"
        disabled={!value.trim()}
        onClick={onConfirm}
        className={cn(
          "shrink-0 px-6 py-3.5 text-sm font-semibold uppercase tracking-wider transition-all",
          value.trim() ? "bg-secondary text-white" : "bg-white/[0.06] text-white/20 cursor-not-allowed",
        )}
      >
        Next
      </button>
    </div>
  );
}
