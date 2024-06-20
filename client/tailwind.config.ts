import type { Config } from "tailwindcss";

export const colors = {
  transparent: "transparent",
  white: "#fff",
  black: "#333",
  error: "#D75265",
  placeholder: "#9E9E9E",
  dark_blue: "#005595",
  // green: "#57BDA8",
  green: "#00a693",
  bg: "#DDF1FC",
  gray: {
    200: "#EEEEEE",
    400: "#BDBDBD",
    500: "#9E9E9E",
    600: "#757575",
    700: "#616161",
  },
};

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors,
  },
  plugins: [],
};
export default config;
