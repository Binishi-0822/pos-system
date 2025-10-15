/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary-color-1" : "#1D1615",
        "primary-color-2" : "#20211A",
        "primary-color-3" : "#292827",
        "secondary-color-1": "#FFFFFF",
        "secondary-color-2": "#AFEEEE",
        "secondary-color-3": "#7FFFD4",
      }
    },
  },
  plugins: [],
}