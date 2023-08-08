/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx,css}"],
  theme: {
    extend: {
      screens: {
        xss: "100px",
        sx: "320px",
        xs: "375px",
        msm: "435px",
        ms: "500px",
        sm: "576px",
        md: "768px",
        mmd: "800px",
        lg: "992px",
        xl: "1200px",
        xll: "1440px",
        xxl: "1536px",
      },
    },
  },
  plugins: [],
};
