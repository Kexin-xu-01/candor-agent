import type { Config } from "tailwindcss";

/**
 * Design tokens live as CSS variables in app/globals.css (light + dark).
 * Tailwind just exposes them as utilities, so one accent colour drives the whole UI.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        faint: "var(--faint)",
        line: "var(--line)",
        "line-strong": "var(--line-strong)",
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
          soft: "var(--accent-soft)",
          line: "var(--accent-line)",
        },
        pause: {
          DEFAULT: "var(--pause)",
          soft: "var(--pause-soft)",
          line: "var(--pause-line)",
        },
        ok: "var(--ok)",
        bad: "var(--bad)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-body)"],
      },
      borderRadius: { card: "16px" },
      keyframes: {
        rise: { from: { opacity: "0", transform: "translateY(8px)" }, to: { opacity: "1", transform: "none" } },
        blink: { "0%,80%,100%": { opacity: ".25", transform: "scale(.8)" }, "40%": { opacity: "1", transform: "scale(1)" } },
        "sheet-in": { from: { transform: "translateX(100%)" }, to: { transform: "none" } },
        "sheet-out": { from: { transform: "none" }, to: { transform: "translateX(100%)" } },
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        "fade-out": { from: { opacity: "1" }, to: { opacity: "0" } },
      },
      animation: {
        rise: "rise .35s ease both",
        blink: "blink 1s infinite ease-in-out",
        "sheet-in": "sheet-in .25s ease both",
        "sheet-out": "sheet-out .2s ease both",
        "fade-in": "fade-in .2s ease both",
        "fade-out": "fade-out .2s ease both",
      },
    },
  },
  plugins: [],
};
export default config;
