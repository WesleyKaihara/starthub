/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#735EF3',
          light: '#A89CF7',
          dark: '#5B47D1',
          hover: '#5B47D1', 
          focus: '#4432B0',
          100: '#EDEBFC',
          200: '#D1CDF7',
          300: '#B5AEF2',
          400: '#998FF0',
          500: '#735EF3',
          600: '#5B47D1',
          700: '#4432B0',
          800: '#2E1C8F',
          900: '#17076E'
        },
        secondary: '#f9f9f9',
        dark: '#4d4d4d',
      },
    },
  },
  plugins: [],
}
