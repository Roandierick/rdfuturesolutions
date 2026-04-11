import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["var(--font-body)", "sans-serif"],
        heading: ["var(--font-heading)", "sans-serif"],
      },
      colors: {
        rd: {
          cyan: "var(--rd-cyan)",
          blue: "var(--rd-blue)",
          purple: "var(--rd-purple)",
          bg: "var(--rd-bg)",
          soft: "var(--rd-bg-soft)",
          card: "var(--rd-bg-card)",
          text: "var(--rd-text)",
          body: "var(--rd-text-body)",
          muted: "var(--rd-text-muted)",
          border: "var(--rd-border)",
        },
      },
      boxShadow: {
        card: "0 2px 16px rgba(41,82,204,0.07)",
        "card-hover": "0 4px 24px rgba(41,82,204,0.13)",
      },
    },
  },
  plugins: [],
};
export default config;
