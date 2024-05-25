/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**"],
  theme: {
    screens: {
      // default tailwind screen sizes for different devices
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      // color created or customised for the use of the project
      colors: {
        myBlue: "#0A32B3",
        myPink: "#BD365D",
      },
      backgroundImage: (theme) => ({
        //backgroup image to be use for all the pages
        pattern: "url('')",
      }),
    },
  },
  plugins: [],
};
