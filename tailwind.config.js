// const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['index.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#DAF9F0',
          200: '#B8F3E1',
          300: '#95EDD2',
          400: '#72E7C4',
          DEFAULT: '#4FE1B5',
          600: '#28DAA5',
          700: '#1FB588',
          800: '#188E6B',
          900: '#12674D',
        },
        accent: {
          DEFAULT: '#FBC36F',
        },
        danger: {
          DEFAULT: '#FB6F88',
        },
        grey: {
          200: '#F0F0F0',
          300: '#D4D4D4',
          DEFAULT: '#808080',
          600: '#616161',
          700: '#434343',
        },
      },
      borderRadius: {
        '4xl': '2.5rem',
      },
      backgroundImage: {
        attraction: "url('src/assets/images/attraction.png')",
      },
      spacing: {
        pt: '66.6%',
        tw: '440px',
        wh: '560px',
      },
      boxShadow: {
        card: '0px 4px 15px rgba(0, 0, 0, 0.2)',
        card2: '0px 2px 10px rgba(128, 128, 128, 0.7)',
      },
    },
  },
  plugins: [],
};
