import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("daisyui")],
  themes: [
    {
      mytheme: {
        primary: "#0059ff",

        secondary: "#00b3ff",

        accent: "#00e900",

        neutral: "#1e0403",

        "base-100": "#182532",

        info: "#007dc7",

        success: "#00de76",

        warning: "#f16100",

        error: "#ff849c",
      },
    },
  ],
};
export default config;
