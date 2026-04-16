import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        sand: "#efe6d1",
        ink: "#112119",
        moss: "#52664e",
        clay: "#b4573b",
        gold: "#e0b25d",
        night: "#06080f",
        panel: "#11141d",
        steel: "#8a94a7",
        ember: "#ff6b3d",
        mist: "#f5f7fb"
      },
      boxShadow: {
        soft: "0 24px 80px rgba(0, 0, 0, 0.35)"
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"]
      },
      backgroundImage: {
        grid: "radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.08) 1px, transparent 0)"
      }
    }
  },
  plugins: []
};

export default config;
