/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",   // <-- ensures Tailwind scans your files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
