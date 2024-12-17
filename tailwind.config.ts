/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}","./app/utils/root.tsx"],

  theme: {
    extend: {fontFamily: {sans: [
      'Inter',
      'ui-sans-serif',
      'system-ui',
      'sans-serif',
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol',
      'Noto Color Emoji',
    ],},
    screens: {
      'sm': '640px',
    }
  },
  plugins: [] },
};