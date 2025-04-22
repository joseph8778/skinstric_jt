import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./stories/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        '1150Brk' : '1150px',
        '900Brk' : '900px',
        '520Brk' : '520px', 
        'smallest' : '420px'
      },
      fontFamily: {
        roobert: ['Roobert TRIAL', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
