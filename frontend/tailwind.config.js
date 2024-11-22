/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        lightgreen: "#618E87",
        gray: "#B4B4B4",
        blue: "#477BFF",
      },
    },
  },
  plugins: [],
}
