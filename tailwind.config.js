/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        secondary: "#f3f4f6",
        danger: "#ef4444",
        success: "#10b981",
        warning: "#f59e0b"
      }
    }
  },
  plugins: []
};