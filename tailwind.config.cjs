/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F97316',
          rgb: '249,115,22',
        },
        base: '#080808',
        surface: '#111111',
        elevated: '#1A1A1A',
        border: '#262626',
        muted: '#404040',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'shine': 'shine 2s infinite linear',
      },
      keyframes: {
        shine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}
