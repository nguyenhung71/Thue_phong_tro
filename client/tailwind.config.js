module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      width: {
        "1100": "1100px",
      },
      colors: {
        primary: "#F5F5F5",
        secondary: "#1266dd",
        accent: "#f23859",
      },
      maxWidth: {
        "600": "600px",
      },
      cursor: {
        pointer: "pointer",
      },
    },
  },
  plugins: [],
};