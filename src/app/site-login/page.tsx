import { siteLogin } from "./actions";

export const metadata = { robots: { index: false } };

export default function SiteLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--color-primary)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 360,
          padding: "2.5rem",
          background: "var(--color-background)",
          borderRadius: 4,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
            fontSize: "1.25rem",
            color: "var(--color-primary)",
            marginBottom: "0.25rem",
            letterSpacing: "-0.03em",
          }}
        >
          CADTRI
        </p>
        <p
          style={{
            fontSize: "0.75rem",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--color-muted)",
            marginBottom: "2rem",
          }}
        >
          Preview Access
        </p>

        <form action={siteLogin}>
          <label
            htmlFor="password"
            style={{
              display: "block",
              fontSize: "0.75rem",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--color-muted)",
              marginBottom: "0.5rem",
            }}
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoFocus
            style={{
              width: "100%",
              padding: "0.625rem 0.75rem",
              border: "1px solid var(--color-border)",
              borderRadius: 2,
              background: "var(--color-surface)",
              color: "var(--color-primary)",
              fontSize: "0.9375rem",
              outline: "none",
              boxSizing: "border-box",
            }}
          />

          <button
            type="submit"
            style={{
              marginTop: "1.25rem",
              width: "100%",
              padding: "0.625rem",
              background: "var(--color-secondary)",
              color: "#fff",
              border: "none",
              borderRadius: 2,
              fontSize: "0.8125rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              cursor: "pointer",
            }}
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
