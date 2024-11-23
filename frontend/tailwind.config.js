/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        "teal-500": "#618E87",
        lightgreen: "#618E87",
        gray: "#B4B4B4",
        gray2: "#E2E2E2",
        white2: "FCFCFC",
        lightgray: "#F1F1F1",
        whitespace: "#EDEDED",
        smoke: "#CBCBCB",
        blue: "#477BFF",
        darkblue: "#49669C",
        darkgray: "#D4D4D4"
      },
      screens: {
        xl: "1366px",
      },
    },
  },
  plugins: [],
}
