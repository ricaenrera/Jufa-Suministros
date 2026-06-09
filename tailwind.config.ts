import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "azul-oscuro":  "#0A2472",
        "azul-medio":   "#1E56A0",
        "azul-claro":   "#3A7BD5",
        "gris-fondo":   "#F4F7FB",
        "gris-borde":   "#D9E4F0",
        "texto-oscuro": "#0d1b3e",
        "texto-medio":  "#4a5568",
        "texto-claro":  "#718096",
        "verde-wa":     "#25D366",
      },
      fontFamily: {
        condensed: ["var(--font-barlow)", "sans-serif"],
        sans:      ["var(--font-source)", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "10px",
        lg:      "16px",
      },
      boxShadow: {
        sm:    "0 2px 8px rgba(10,36,114,0.10)",
        md:    "0 6px 24px rgba(10,36,114,0.15)",
        hover: "0 10px 36px rgba(30,86,160,0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
