import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // All values reference CSS custom properties from globals.css :root
        // Change the token values there — Tailwind picks them up automatically
        primary: {
          DEFAULT: "var(--color-primary)",
          hover:   "var(--color-primary-hover)",
          foreground: "var(--color-primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          hover:   "var(--color-secondary-hover)",
          foreground: "var(--color-secondary-foreground)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
        },
        background: "var(--color-background)",
        surface:    "var(--color-surface)",
        foreground: "var(--color-foreground)",
        muted: {
          DEFAULT:    "var(--color-muted)",
          foreground: "var(--color-muted-foreground)",
        },
        border: {
          DEFAULT: "var(--color-border)",
          strong:  "var(--color-border-strong)",
        },
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        error:   "var(--color-error)",
      },
      fontFamily: {
        sans:    ["var(--font-sans)"],
        heading: ["var(--font-heading)"],
      },
      borderRadius: {
        // Override Tailwind defaults to use our token scale
        sm:   "var(--radius-sm)",    // 4px
        DEFAULT: "var(--radius-md)", // 8px
        md:   "var(--radius-md)",    // 8px
        lg:   "var(--radius-lg)",    // 12px
        xl:   "var(--radius-xl)",    // 16px
        full: "var(--radius-full)",  // 9999px
      },
      boxShadow: {
        sm:      "var(--shadow-sm)",
        DEFAULT: "var(--shadow-md)",
        md:      "var(--shadow-md)",
        lg:      "var(--shadow-lg)",
        xl:      "var(--shadow-xl)",
      },
      transitionDuration: {
        fast: "150ms",
        base: "200ms",
        slow: "300ms",
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter:  "-0.025em",
        tight:    "-0.015em",
        normal:   "0em",
        wide:     "0.04em",
        wider:    "0.08em",
        widest:   "0.15em",
      },
      maxWidth: {
        container: "var(--container-max)",
      },
    },
  },
  plugins: [],
};

export default config;
