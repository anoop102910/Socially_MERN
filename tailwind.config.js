/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "dark-mode",
  // darkMode:"false",

  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: "Roboto",
        pacifico: "Pacifico",
        mont: "Montserrat",
        opensans: "Open Sans",
        urbanist:"Urbanist"
      },
      colors: {
        dark: {
          100: "#121212",
          200: "#282828",
          300: "#3f3f3f",
          400: "#575757",
          500: "#717171",
          600: "#8b8b8b",
        },
        primary: {
          100: "#382bf0",
          200: "#5e43f3",
          300: "#7a5af5",
          400: "#9171f8",
          500: "#a688fa",
          600: "#ba9ffb",
        },
      },
    },
  },
  plugins: [],
};
