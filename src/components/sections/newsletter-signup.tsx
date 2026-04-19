"use client";

import { useActionState } from "react";
import { ArrowRight } from "lucide-react";
import { subscribeNewsletter, type NewsletterState } from "@/app/actions/newsletter";

const idle: NewsletterState = { status: "idle" };

export function NewsletterSignup() {
  const [state, action, pending] = useActionState(subscribeNewsletter, idle);

  return (
    <section className="border-t border-border bg-surface">
      <div className="mx-auto max-w-container px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20 lg:items-center">

          {/* Left: heading */}
          <div>
            <p className="mb-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
              Stay Informed
            </p>
            <h2
              className="font-bold text-2xl text-foreground sm:text-3xl"
              style={{ letterSpacing: "-0.025em", lineHeight: 1.1 }}
            >
              Permit guides, code updates, and project insights.
            </h2>
            <p className="mt-4 text-sm font-light leading-relaxed text-muted">
              Occasional emails on permitting trends, ADU regulations, and
              practical guidance for California projects. No spam.
            </p>
          </div>

          {/* Right: form */}
          <div>
            {state.status === "success" ? (
              <div className="border border-border bg-background px-6 py-8 text-center">
                <p className="font-semibold text-foreground">You&apos;re on the list.</p>
                <p className="mt-2 text-sm font-light text-muted">
                  We&apos;ll be in touch with useful content — no fluff.
                </p>
              </div>
            ) : (
              <form action={action} className="flex flex-col gap-4">
                {/* Email row */}
                <div className="flex gap-3">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="your@email.com"
                    className="min-w-0 flex-1 border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-secondary/40"
                  />
                  <button
                    type="submit"
                    disabled={pending}
                    className="flex shrink-0 items-center gap-2 bg-secondary px-5 py-3 text-[12px] font-semibold uppercase tracking-widest text-white transition-opacity hover:opacity-80 disabled:opacity-50"
                  >
                    {pending ? "..." : (
                      <>
                        Subscribe
                        <ArrowRight className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                </div>

                {/* Consent checkbox */}
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    name="consent"
                    value="yes"
                    required
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-secondary"
                  />
                  <span className="text-[11px] font-light leading-relaxed text-muted">
                    I agree to receive marketing emails and updates from CADTRI.
                    You can unsubscribe at any time. View our{" "}
                    <a
                      href="/privacy-policy"
                      className="text-foreground underline underline-offset-2 hover:text-secondary"
                    >
                      Privacy Policy
                    </a>
                    .
                  </span>
                </label>

                {/* Error */}
                {state.status === "error" && (
                  <p className="text-[12px] text-red-600">{state.message}</p>
                )}
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
