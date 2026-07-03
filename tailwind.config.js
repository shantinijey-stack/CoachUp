/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Baloo 2", "Nunito", "system-ui", "sans-serif"],
        body: ["Nunito", "system-ui", "sans-serif"],
      },
      colors: {
        cream: "#FFF9F0",
        sunshine: "#FFC94D",
        tangerine: "#FF9351",
        coral: "#FF6B6B",
        lagoon: "#2EC4B6",
        deepsea: "#1B4965",
        berry: "#9B5DE5",
        sky: "#4CC9F0",
        meadow: "#80ED99",
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(27, 73, 101, 0.25)",
        pop: "0 6px 0 0 rgba(27, 73, 101, 0.15)",
        card: "0 8px 24px -8px rgba(27, 73, 101, 0.18)",
      },
      borderRadius: {
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
