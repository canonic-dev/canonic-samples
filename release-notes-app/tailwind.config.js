// tailwind.config.js
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"], // This will removed unused css code in production.
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    screens: {
      mobile: { max: "639px" },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
