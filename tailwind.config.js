/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Plus Jakarta Sans','system-ui','sans-serif'],
        sans:    ['Inter','system-ui','sans-serif'],
      },
      colors: {
        brand: { DEFAULT:'#2563eb', dark:'#1e3a8a', light:'#eff6ff' },
      },
      animation: {
        'fade-up':   'fadeUp 0.6s ease-out forwards',
        'fade-in':   'fadeIn 0.5s ease-out forwards',
        'slide-in':  'slideIn 0.5s ease-out forwards',
        'pulse-dot': 'pulseDot 1.5s ease-in-out infinite',
      },
      keyframes: {
        fadeUp:   { '0%':{ opacity:0, transform:'translateY(20px)' }, '100%':{ opacity:1, transform:'translateY(0)' } },
        fadeIn:   { '0%':{ opacity:0 }, '100%':{ opacity:1 } },
        slideIn:  { '0%':{ opacity:0, transform:'translateX(-16px)' }, '100%':{ opacity:1, transform:'translateX(0)' } },
        pulseDot: { '0%,100%':{ opacity:1, transform:'scale(1)' }, '50%':{ opacity:0.4, transform:'scale(1.5)' } },
      },
    },
  },
  plugins: [],
}
