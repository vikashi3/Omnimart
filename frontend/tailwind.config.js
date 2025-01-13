/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2A9D8F',
        secondary: '#264653',
        accent: '#E76F51',
        neutral: '#F0F3F5',
        highlight: '#F4A261',
        golden: '#E9C46A',
      },
    },
  },
  plugins: [],
};
