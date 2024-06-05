import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      white: "#fff",
      black: "#333",
      error: "#D75265",
      placeholder: "#757575",
      dark_blue: "#005595",
      green: "#57BDA8",
      bg: "#DDF1FC",
    },
  },
  plugins: [],
};
export default config;
