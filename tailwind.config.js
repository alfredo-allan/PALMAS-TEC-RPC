/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Ativa o dark mode por classe
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#F05800",
          "orange-light": "#FEEFE4",
          "orange-border": "#A96B3B",
        },
      },
      fontFamily: {
        sora: ["Sora", "sans-serif"],
      },
    },
  },
  plugins: [],
};
