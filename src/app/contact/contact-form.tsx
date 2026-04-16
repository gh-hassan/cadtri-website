"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Turnstile } from "@marsidev/react-turnstile";
import { CheckCircle, ChevronDown } from "lucide-react";
import { submitContactForm, type ContactFormState } from "./actions";
import { Button } from "@/components/shared/button";

const initialState: ContactFormState = { status: "idle" };

const inputClass =
  "w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted/50 transition-colors duration-150 focus:border-secondary focus:outline-none";

// ─── Submit button ─────────────────────────────────────────────────────────────
// Separate component so useFormStatus has access to the parent form context

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="secondary"
      size="md"
      disabled={pending}
      aria-busy={pending}
      className="w-full sm:w-auto"
    >
      {pending ? "Sending..." : "Send Inquiry"}
    </Button>
  );
}

// ─── Field wrapper ─────────────────────────────────────────────────────────────

function FormField({
  label,
  id,
  required,
  children,
}: {
  label: string;
  id: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-[11px] font-medium uppercase tracking-widest text-foreground"
      >
        {label}
        {required && (
          <span className="ml-1 text-secondary" aria-label="required">
            *
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

// ─── Contact form ──────────────────────────────────────────────────────────────

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState);

  // Success state
  if (state.status === "success") {
    return (
      <div className="flex flex-col items-start gap-5 border border-border bg-surface px-8 py-10">
        <CheckCircle
          size={28}
          strokeWidth={1.5}
          className="text-secondary"
          aria-hidden
        />
        <div>
          <p
            className="font-bold text-lg text-foreground"
            style={{ letterSpacing: "-0.02em" }}
          >
            Inquiry received.
          </p>
          <p className="mt-2 text-sm font-light leading-relaxed text-muted">
            Thank you for reaching out. We will review your project details and
            respond within one business day with a clear scope and next steps.
          </p>
        </div>
        <p className="text-xs font-light text-muted">
          Need to reach us directly? Email{" "}
          <a
            href="mailto:info@cadtri.com"
            className="text-secondary transition-colors hover:underline"
          >
            info@cadtri.com
          </a>
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="flex flex-col gap-6"
      noValidate
      aria-label="Project inquiry form"
    >
      {/* Honeypot: hidden from humans, bots fill it in */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 overflow-hidden opacity-0"
        autoComplete="off"
      />

      {/* Name + Email */}
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField label="Full Name" id="name" required>
          <input
            type="text"
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder="Your full name"
            className={inputClass}
          />
        </FormField>
        <FormField label="Email Address" id="email" required>
          <input
            type="email"
            id="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className={inputClass}
          />
        </FormField>
      </div>

      {/* Company */}
      <FormField label="Company or Organization" id="company">
        <input
          type="text"
          id="company"
          name="company"
          autoComplete="organization"
          placeholder="Optional"
          className={inputClass}
        />
      </FormField>

      {/* Project type */}
      <FormField label="Project Type" id="projectType" required>
        <div className="relative">
          <select
            id="projectType"
            name="projectType"
            required
            defaultValue=""
            className={`${inputClass} appearance-none pr-10`}
          >
            <option value="" disabled>
              Select a project type
            </option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="mixed-use">Mixed-Use</option>
            <option value="adu">ADU or Accessory Structure</option>
            <option value="tenant-improvement">Tenant Improvement</option>
            <option value="other">Other</option>
          </select>
          <ChevronDown
            size={14}
            strokeWidth={1.5}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
            aria-hidden
          />
        </div>
      </FormField>

      {/* Project scope */}
      <FormField label="Project Scope" id="scope" required>
        <textarea
          id="scope"
          name="scope"
          required
          rows={5}
          placeholder="Describe your project: type, location, size, current stage, and any specific documentation needs or deadlines."
          className={`${inputClass} resize-none`}
        />
      </FormField>

      {/* Cloudflare Turnstile — invisible for real users, challenge only if bot suspected */}
      <Turnstile
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
        options={{ appearance: "interaction-only", theme: "light" }}
      />

      {/* Error message */}
      {state.status === "error" && state.message && (
        <p
          className="border-l-2 border-secondary pl-4 text-sm font-light text-foreground"
          role="alert"
        >
          {state.message}
        </p>
      )}

      {/* Submit */}
      <div className="pt-2">
        <SubmitButton />
        <p className="mt-4 text-xs font-light text-muted">
          We respond to all inquiries within one business day. Your information
          is used only to respond to your project request.
        </p>
      </div>
    </form>
  );
}
