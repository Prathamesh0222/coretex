/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        spotlight: "spotlight 2s ease .75s 1 forwards",
      },
      keyframes: {
        spotlight: {
          "0%": {
            opacity: 0,
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: 1,
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
      },
      extend: {
        fontFamily: {
          poppins: ["Poppins", "san-serif"],
        },
      },
      colors: {
        gray: {
          100: "#fefffe",
          200: "#f8fafc",
          600: "#545560",
        },
        purple: {
          200: "#e1e7fe",
          500: "#5149b9",
          600: "#5047e5",
        },
        dark: {
          300: "#1f232d",
          400: "#15171e",
          500: "#0f1016",
        },
      },
    },
  },
  plugins: [],
};
