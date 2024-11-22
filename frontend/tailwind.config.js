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
        lightgray: "#F1F1F1",
        smoke: "#CBCBCB",
        blue: "#477BFF",
        darkblue: "#49669C",
      },
      screens: {
        xl: "1366px",
      },
    },
  },
  plugins: [],
}
