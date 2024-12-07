/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Include all your JS/TS/JSX/TSX files
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui')
  ],
};
