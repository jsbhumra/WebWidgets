/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./widgets/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "media",
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            primary: {
              DEFAULT: "#f68f30",
              foreground: "#000000",
            },
            focus: "#f68f30",
            primaryOrange: "#f09032",
            bgBlue: "#282a37",
            bgGradientLight: "#131642",
            bgGradientDark: "#070823",
          },
        },
        light: {
          colors: {
            primary: {
              DEFAULT: "#f68f30",
              foreground: "#000000",
            },
            focus: "#f68f30",
            primaryOrange: "#f09032",
            bgBlue: "#282a37",
            bgGradientLight: "#131642",
            bgGradientDark: "#070823",
          },
        },
      },
    }),
  ],
};
