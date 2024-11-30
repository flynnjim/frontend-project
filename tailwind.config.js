/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accentcolor: "#aaaaaa",
        bgcolor: "#FFF8E3",
        listcolor: "#C9DABF",
        cardcolor: "#9CA986",
        textcolor: "#0f172a",
        hovercolor: "#fdf3e8",
        commentcolor: "#dbe7e7",
        'fluorescent-yellow': '#ffee00',
        'buttonpink': "#E6A4B4"
      },
      container: {
        padding: {
          DEFAULT: "20px",
          sm: "20px",
          md: "30px",
          xl: "40px",
        },
        center: true,
      },
    },
    screens: {
      sm: "480px",
      md: "768px",
      custom: '900px',
      lg: "1024px",
      xl: "1280px",
    },
  },
  plugins: [],
};