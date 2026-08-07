import { ImageResponse } from "next/og";
import { getServiceBySlug, services } from "@/content/services";
import { buildServiceOgImageElement } from "@/lib/service-og-image";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// "architectural-drafting" is excluded — it now lives at the dedicated
// /architectural-drafting-services route, which has its own opengraph-image.
export function generateStaticParams() {
  return services
    .filter((s) => s.slug !== "architectural-drafting")
    .map((s) => ({ slug: s.slug }));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  const title = service?.title ?? "Service";
  const category = service?.category ?? "Services";
  const tagline = service?.tagline ?? "Permit-ready documentation.";

  return new ImageResponse(
    buildServiceOgImageElement({ title, category, tagline }),
    { ...size },
  );
}
