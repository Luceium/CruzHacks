import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        notification: {
          '0%': { 
            top: "-192px",
            marginBottom: "-96px"
          },
          '100%': { 
            top: "0",
            marginBottom: "0"
          },
        }
      },
      animation: {
        notification: 'notification 0.5s ease-in-out',
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#1D2248",

          "secondary": "#D3A715",

          "accent": "#a7f3d0",

          "neutral": "#101c0f",

          "base-100": "#fffcda",

          "info": "#67e8f9",

          "success": "#bef264",

          "warning": "#e29400",

          "error": "#e8195a",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
export default config;
