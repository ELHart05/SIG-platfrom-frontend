/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        main: ['Poppins', 'sans-serif'],
      },
      colors: {
        greener: "#4ecdc4",
        "darker-green": "#43b1a9",
        "oranger": "#ed5565",
        "very-dark-gray": "#2b2b2b",
        "grayer": "#d6d9dc"
      }
    },
  },
  plugins: [],
}

