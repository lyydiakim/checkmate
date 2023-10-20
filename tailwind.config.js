/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "430px",
      // => @media (min-width: 640px) { ... }
    },

    extend: {
      //for gradient hover effect
      backgroundSize: {
        "size-200": "200% 200%",
      },
    },

    fontFamily: {
      // questrial: ['questrial', 'sans-serif'],
    },
  },
  plugins: [],
};
