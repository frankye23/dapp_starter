/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
      colors:{
        gray:'#BAB4C6',
        normal:'#F2ECFF'
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      width: {
        '160': '40rem',
        '180': '45rem'
      },
      height: {
        '112': '28rem',
        '120':'30rem'
      }
    },
  },
  plugins: [
    require("daisyui")
  ],
}
