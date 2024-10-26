import TickerElement from '@/components/TickerElement.vue';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        backgroundColor: 'rgb(34, 35, 36)',
        mainGreen: '#102d1b',
        lightGreen: '#036027',
        redColor: '#f40808',
        greyColor: '#737b76'
      },
      fontFamily: {
        'serif': ['Bungee Spice', 'ui-serif'],
      }
    },  
  },
  plugins: [],
}

