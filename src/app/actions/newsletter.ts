"use server";

import { Resend } from "resend";
import { company } from "@/content/company";

const resend = new Resend(process.env.RESEND_API_KEY);

export type NewsletterState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

export async function subscribeNewsletter(
  _prev: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  const email = (formData.get("email") as string | null)?.trim();
  const consent = formData.get("consent");

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  if (!consent) {
    return { status: "error", message: "Please confirm your consent to continue." };
  }

  try {
    await resend.emails.send({
      from: "CADTRI Website <noreply@cadtri.com>",
      to: company.email,
      subject: "New Newsletter Subscriber",
      text: `New subscriber: ${email}\n\nThey consented to receive marketing communications from CADTRI.`,
    });

    return { status: "success" };
  } catch {
    return {
      status: "error",
      message: "Something went wrong. Please try again or email us directly.",
    };
  }
}
