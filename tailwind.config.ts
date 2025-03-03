import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    keyframes: {
      fade: {
        "0%": { opacity: "1" },
        "100%": { opacity: "0" }
      }
    },
    animation: {
      fade: "fade 1.2s linear infinite"
    }

  },
  plugins: [],
} satisfies Config;
