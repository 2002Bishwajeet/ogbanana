/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#F0F0F0",
        primary: "#FFDE00", // Safety Yellow
        secondary: "#FF90E8", // Hot Pink
        accent: "#23A094", // Teal
        card: "#FFFFFF",
        main: "#000000",
      },
      borderColor: {
        main: "#000000",
      },
    },
  },
  plugins: [],
};
