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
        customRed: "#E3000F",
        customBlueBg: "#F0F4F9",
        customGray: "#E5E7EB",
        customDarkGray: "#6B7280",
        customDarkBlue: "#1565d8",
        customBlue: "#007bff",
        customMidGray: "#B5B5B5",
        customGreen: "#339900",
        customTextGray: "#545454"
      },
    },
  },
  plugins: [],
} satisfies Config;
