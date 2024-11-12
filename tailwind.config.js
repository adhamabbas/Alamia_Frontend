/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        lightGreen:"#0B9E82",
        darkGreen:"#085A4B",
        navyColor: "#132837",
        greyColor: "#D9D9D9",
        goldColor: "#E2B215"
      }
    },
  },
  plugins: [],
}

