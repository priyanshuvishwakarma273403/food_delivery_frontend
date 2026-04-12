/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E23744',
          dark: '#c12e3a',
          light: '#ee5b68',
        },
        secondary: {
          DEFAULT: '#FC8019',
          dark: '#e67316',
          light: '#fd9947',
        },
        background: '#F5F5F5',
        card: '#FFFFFF',
        text: {
          primary: '#1C1C1C',
          secondary: '#686B78',
        },
        status: {
          success: '#26A541',
          error: '#E23744',
          warning: '#FC8019',
          info: '#2563eb',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)',
        'premium-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      }
    }
  },
  plugins: [],
}
