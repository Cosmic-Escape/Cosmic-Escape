/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          50:  "#f5f0ff",
          100: "#e6dbff",
          200: "#c7b6ff",
          300: "#a38cff",
          400: "#8364ff",  // ✔ this one you're using
          500: "#6b45ff",
          600: "#592fd1",
          700: "#4724a3",
          800: "#341975",
          900: "#230f4d",
        },
      },
    },
  },
  plugins: [],
};
