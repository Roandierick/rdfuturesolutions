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
        display: ["var(--font-display)", "serif"],
        heading: ["var(--font-display)", "serif"],
        mono: ["var(--font-mono)", "monospace"],
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
          black: "var(--rd-black)",
        },
      },
      boxShadow: {
        editorial: "0 2px 20px rgba(41,82,204,0.06)",
        "editorial-lg": "0 18px 50px rgba(41,82,204,0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
