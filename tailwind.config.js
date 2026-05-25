/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        magic: ['MedievalSharp', 'IM Fell English', 'serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      colors: {
        paper: '#e9d9b4',
        'paper-deep': '#c9a978',
        'paper-edge': '#6e4a1f',
        ink: '#2b1d10',
        'ink-soft': '#4a3320',
        'ink-faded': '#7a5a35',
        gold: '#c8a24b',
        'gold-bright': '#f4d384',
        wax: '#7a1f1f',
        'wax-dark': '#4a0f0f',
      },
    },
  },
  plugins: [],
}
