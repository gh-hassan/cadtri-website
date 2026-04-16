import { redirect } from "next/navigation";

// Industries index page redirects to /about where all client types are covered.
// Both /industries and /industries/[slug] point here until dedicated pages are built.
export default function IndustriesPage() {
  redirect("/about");
}
