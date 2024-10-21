import theme from './src/theme/tw.preset';
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        ripple: {
          from: { opacity: '.75', transform: 'scale(0)' },
          to: { opacity: '0', transform: 'scale(2)' },
        },
        indeterminateSecond: {
          '0%': { left: '-150%', width: '100%' },
          '100%': { left: '100%', width: '10%' },
        },
        indeterminateFirst: {
          '0%': { left: '-100%', width: '100%' },
          '100%': { left: '100%', width: '10%' },
        },
      },
      animation: {
        ripple: 'ripple',
        indeterminateFirst: 'indeterminateFirst 1s ease-out infinite',
        indeterminateSecond: 'indeterminateSecond 1s ease-in infinite',
      },
    },
  },
  plugins: [],
  presets: [theme],
};
