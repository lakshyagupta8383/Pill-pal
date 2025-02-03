/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // Make sure to include all the directories where Tailwind will be used
  ],
  theme: {
    extend: {
      colors: {
        'orange-start': '#ff8a00',
        'orange-middle': '#fcc981',
        'blue-end': '#007EBB'
      }
    },
  },
  plugins: [],
};
