// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Roboto', 'sans-serif'],
      },
      colors: {
        primary: '#b71b1c',
        secondary: '#1d1d1d',
        base: {
          100: '#ffffff',
          200: '#f3f3f3',
          300: '#e5e5e5'
        }
      },
    },
  },
  plugins: [],
}