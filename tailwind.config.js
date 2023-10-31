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
    extend: {
      //for gradient hover effect
      backgroundSize: {
        "size-200": "200% 200%",
      },
      colors: {
        'orange': '#ea580c',
        'teal': '#2dd4bf',

        },
    },

    fontFamily: {
      // questrial: ['questrial', 'sans-serif'],
    },
  },
  plugins: [],
};
