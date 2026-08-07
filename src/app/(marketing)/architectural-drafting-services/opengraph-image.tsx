import { ImageResponse } from "next/og";
import { getServiceBySlug } from "@/content/services";
import { buildServiceOgImageElement } from "@/lib/service-og-image";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const service = getServiceBySlug("architectural-drafting")!;

  return new ImageResponse(
    buildServiceOgImageElement({
      title: service.title,
      category: service.category,
      tagline: service.tagline,
    }),
    { ...size },
  );
}
