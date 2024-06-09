/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    // colors: {
    //   "my-color": "#7186C7",
    //   "my-color2": "#F1F4FC",
    //   "my-color3": "#D0D6E6",
    //   "my-color4": "#B8BDC9",
    // },
    extend: {
      gridTemplateRows: {
        "[auto,auto,1fr]": "auto auto 1fr",
      },
    },
  },
  plugins: [],
};
