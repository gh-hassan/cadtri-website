"use client";

import { useState } from "react";
import { Button } from "@/components/shared/button";
import { requestMagicLink } from "./actions";

export function LoginForm() {
  const [state, setState] = useState<"idle" | "loading" | "sent">("idle");
  const [email, setEmail] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    const fd = new FormData(e.currentTarget);
    await requestMagicLink(fd);
    setState("sent");
  }

  if (state === "sent") {
    return (
      <div className="text-center">
        <p className="mb-2 text-sm font-semibold text-foreground">Check your inbox</p>
        <p className="text-sm font-light leading-relaxed text-muted">
          If <span className="text-foreground">{email}</span> is registered, a sign-in link is on its way. It expires in 15 minutes.
        </p>
        <button
          onClick={() => setState("idle")}
          className="mt-6 text-[11px] font-medium uppercase tracking-widest text-muted underline-offset-2 hover:text-foreground hover:underline"
        >
          Try a different email
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-[11px] font-medium uppercase tracking-widest text-muted"
        >
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted/50 focus:border-secondary focus:outline-none"
        />
      </div>
      <Button
        type="submit"
        variant="primary"
        size="md"
        className="w-full"
        disabled={state === "loading"}
      >
        {state === "loading" ? "Sending…" : "Send sign-in link"}
      </Button>
    </form>
  );
}
