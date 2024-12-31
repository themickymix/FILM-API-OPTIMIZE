/** @type {import('tailwindcss').Config} */
import tailwindcssAnimated from "tailwindcss-animated";
import daisyui from "daisyui";
import lineClamp from "@tailwindcss/line-clamp";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    tailwindcssAnimated,
    daisyui,
    lineClamp, // Add the line-clamp plugin here
  ],
  daisyui: {
    themes: [
      {
        myCustomTheme: {
          primary: "#1C1C1D", // Dark shade for primary
          secondary: "#2E2E2F", // Slightly lighter shade
          accent: "#39393A", // Accent with some contrast
          neutral: "#1C1C1D", // Neutral matching primary
          "base-100": "#1C1C1D", // Base background color
          "base-200": "#2A2A2B", // Slightly elevated background
          "base-300": "#333334", // Borders and surfaces
          info: "#3ABFF8", // Optional utility color
          success: "#36D399", // Optional utility color
          warning: "#FBBD23", // Optional utility color
          error: "#F87272", // Optional utility color
        },
      },
      "business", // Include "business" theme as a fallback
    ],
  },
};
