/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3183c8",
          100: "#63a2d8",
          200: "#aad4f5",
          300: "#eff8ff",
        },
        default: {
          DEFAULT: "#5f6b7a",
          100: "#8895a7",
          200: "#b8c4ce",
          300: "#cfd6de",
          400: "#f8f9fa",
        },
        danger: {
          DEFAULT: "#dc3030",
          100: "#e46464",
          200: "#f5aaaa",
          300: "#fce8e8",
        },
        success: {
          DEFAULT: "#259d58",
          100: "#38c172",
          200: "#74d99f",
          300: "#a8eec1",
          400: "#e3fcec",
        },
        warning: {
          DEFAULT: "#caa53d",
          100: "#f4ca64",
          200: "#fae29f",
          300: "#fdf3d7",
          400: "#fffcf4",
        },
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(100%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        slideOut: {
          "0%": { transform: "translateX(0)", opacity: 1 },
          "100%": { transform: "translateX(100%)", opacity: 0 },
        },
      },
      animation: {
        slideIn: "slideIn 0.5s ease-out",
        slideOut: "slideOut 0.5s ease-in",
      },
    },
  },
  plugins: [],
};
