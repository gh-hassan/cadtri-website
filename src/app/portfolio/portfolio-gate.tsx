"use client";

import { useActionState, useState } from "react";
import { Lock, Mail, ArrowRight, CheckCircle } from "lucide-react";
import { requestPortfolioAccess, verifyPortfolioCode } from "./actions";
import type { PortfolioActionState } from "./actions";

const idle: PortfolioActionState = { status: "idle" };

// ─── Code entry form ──────────────────────────────────────────────────────────

function CodeForm() {
  const [state, action, pending] = useActionState(verifyPortfolioCode, idle);

  if (state.status === "success") {
    // Page will reload via router.refresh — show brief confirmation
    if (typeof window !== "undefined") window.location.reload();
    return null;
  }

  return (
    <form action={action} className="space-y-4">
      <div>
        <label
          htmlFor="code"
          className="mb-1.5 block text-[11px] font-medium uppercase tracking-widest text-muted"
        >
          Access Code
        </label>
        <input
          id="code"
          name="code"
          type="text"
          required
          autoComplete="off"
          placeholder="Enter your code"
          className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-secondary/40"
        />
      </div>

      {state.status === "error" && (
        <p className="text-[12px] text-red-600">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center gap-2 bg-primary px-6 py-3 text-[12px] font-semibold uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-80 disabled:opacity-50"
      >
        {pending ? "Verifying..." : "Unlock Portfolio"}
        {!pending && <ArrowRight className="h-3.5 w-3.5" />}
      </button>
    </form>
  );
}

// ─── Request access form ──────────────────────────────────────────────────────

function RequestForm() {
  const [state, action, pending] = useActionState(
    requestPortfolioAccess,
    idle,
  );

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 py-4 text-center">
        <CheckCircle className="h-8 w-8 text-secondary" />
        <div>
          <p className="font-semibold text-foreground">Request sent.</p>
          <p className="mt-1 text-sm font-light text-muted">
            We will review your request and email you an access code shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="req-name"
            className="mb-1.5 block text-[11px] font-medium uppercase tracking-widest text-muted"
          >
            Name <span className="text-secondary">*</span>
          </label>
          <input
            id="req-name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-secondary/40"
          />
        </div>
        <div>
          <label
            htmlFor="req-email"
            className="mb-1.5 block text-[11px] font-medium uppercase tracking-widest text-muted"
          >
            Email <span className="text-secondary">*</span>
          </label>
          <input
            id="req-email"
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-secondary/40"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="req-company"
          className="mb-1.5 block text-[11px] font-medium uppercase tracking-widest text-muted"
        >
          Company / Firm
        </label>
        <input
          id="req-company"
          name="company"
          type="text"
          placeholder="Optional"
          className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-secondary/40"
        />
      </div>

      {state.status === "error" && (
        <p className="text-[12px] text-red-600">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center gap-2 bg-secondary px-6 py-3 text-[12px] font-semibold uppercase tracking-widest text-white transition-opacity hover:opacity-80 disabled:opacity-50"
      >
        {pending ? "Sending..." : "Request Access"}
        {!pending && <Mail className="h-3.5 w-3.5" />}
      </button>
    </form>
  );
}

// ─── Gate ─────────────────────────────────────────────────────────────────────

export function PortfolioGate() {
  const [view, setView] = useState<"choose" | "code" | "request">("choose");

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6 py-20">
      <div className="w-full max-w-md">

        {/* Icon + heading */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center border border-border bg-surface">
            <Lock className="h-5 w-5 text-muted" />
          </div>
          <p className="mb-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
            Portfolio Access
          </p>
          <h1
            className="font-bold text-2xl text-foreground sm:text-3xl"
            style={{ letterSpacing: "-0.025em" }}
          >
            Our work is available by request.
          </h1>
          <p className="mt-4 font-light leading-relaxed text-muted text-sm">
            We share project documentation with qualified clients and firms.
            Request access and we will send you a code, or enter one you
            already have.
          </p>
        </div>

        {/* Divider */}
        <div className="mb-8 h-px bg-border" />

        {view === "choose" && (
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              onClick={() => setView("code")}
              className="flex flex-col gap-1.5 border border-border bg-background p-5 text-left transition-colors hover:border-secondary/50 hover:bg-surface"
            >
              <Lock className="h-4 w-4 text-secondary" />
              <span className="text-[12px] font-semibold uppercase tracking-wider text-foreground">
                I have a code
              </span>
              <span className="text-[11px] font-light text-muted">
                Enter your access code to unlock the portfolio.
              </span>
            </button>

            <button
              onClick={() => setView("request")}
              className="flex flex-col gap-1.5 border border-border bg-background p-5 text-left transition-colors hover:border-secondary/50 hover:bg-surface"
            >
              <Mail className="h-4 w-4 text-secondary" />
              <span className="text-[12px] font-semibold uppercase tracking-wider text-foreground">
                Request access
              </span>
              <span className="text-[11px] font-light text-muted">
                Submit your details and we will email you a code.
              </span>
            </button>
          </div>
        )}

        {view === "code" && (
          <div>
            <CodeForm />
            <button
              onClick={() => setView("choose")}
              className="mt-5 text-[11px] font-medium text-muted underline-offset-2 hover:text-foreground hover:underline"
            >
              Back
            </button>
          </div>
        )}

        {view === "request" && (
          <div>
            <RequestForm />
            <button
              onClick={() => setView("choose")}
              className="mt-5 text-[11px] font-medium text-muted underline-offset-2 hover:text-foreground hover:underline"
            >
              Back
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
