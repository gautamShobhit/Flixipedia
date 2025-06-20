/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        euclid: ['"Euclid Circular A"', "sans-serif"],
        outfit: ["Outfit", "sans-serif"], // 👈 your custom font
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
