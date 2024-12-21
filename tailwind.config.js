/** @type {import('tailwindcss').Config} */
import tailwindcssAnimated from "tailwindcss-animated";
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [tailwindcssAnimated, daisyui],
  daisyui: {
    themes: [
      "business", // Set the default theme to "cupcake"
    ],
  },
};
