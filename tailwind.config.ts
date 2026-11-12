import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#4f46e5', // indigo-600
          dark: '#4338ca',    // indigo-700
          light: '#eef2ff',   // indigo-50 — for soft backgrounds
        },
      },
    },
  },
  plugins: [],
};
export default config;
