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
        'hero-pattern':
          "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 75%, rgba(238,	255, 224, 1) 100%), url('/earth.png')",
        'tree-pattern':
          "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 95%, rgba(238,	255, 224, 1) 100% ), url('/trees.png')",
        'mirror-pattern':
          "linear-gradient(to top, rgba(238,	255, 224, 1), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 75%, rgba(238,	255, 224, 1) 100% ), url('/mirror.png')", 
      },
      fontFamily: {
        syncopate: ['Syncopate', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
