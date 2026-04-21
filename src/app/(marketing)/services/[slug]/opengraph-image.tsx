import { ImageResponse } from "next/og";
import { getServiceBySlug, services } from "@/content/services";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
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
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "80px",
          background: "#222222",
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          position: "relative",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "#FF6D1F",
          }}
        />

        {/* Top-left brand mark */}
        <div
          style={{
            position: "absolute",
            top: "72px",
            left: "80px",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          <span
            style={{
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#FF6D1F",
            }}
          >
            CADTRI
          </span>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 400,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#7A6E5F",
            }}
          >
            Drafting and Permit Services
          </span>
        </div>

        {/* Category label top-right */}
        <div
          style={{
            position: "absolute",
            top: "72px",
            right: "80px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              width: "24px",
              height: "1px",
              background: "#FF6D1F",
            }}
          />
          <span
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#FF6D1F",
            }}
          >
            {category}
          </span>
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <h1
            style={{
              margin: 0,
              fontSize: "62px",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "#FAF3E1",
              maxWidth: "860px",
            }}
          >
            {title}
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: "20px",
              fontWeight: 300,
              lineHeight: 1.5,
              color: "#7A6E5F",
              maxWidth: "620px",
            }}
          >
            {tagline}
          </p>
        </div>

        {/* Bottom-right URL */}
        <span
          style={{
            position: "absolute",
            bottom: "80px",
            right: "80px",
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "0.06em",
            color: "#7A6E5F",
          }}
        >
          cadtri.com
        </span>
      </div>
    ),
    { ...size },
  );
}
