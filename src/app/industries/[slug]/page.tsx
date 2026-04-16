import { redirect } from "next/navigation";

// Industry-specific pages are not yet built.
// All industry nav links point to /about where client types are covered.
// This redirect ensures any direct URL visits don't hit a broken page.

export default async function IndustryPage() {
  redirect("/about");
}
