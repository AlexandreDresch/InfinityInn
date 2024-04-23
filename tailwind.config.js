/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0C0B11"
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        nunito: ["Nunito Sans", "serif"]
      }
    },
  },
  plugins: [],
}