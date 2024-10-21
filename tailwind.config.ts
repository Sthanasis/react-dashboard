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
        fadeInBottom: {
          from: { opacity: '0', transform: 'translateX(-100%)' },
          to: { opacity: '1', transform: 'translateX(0%)' },
        },
        fadeOutBottom: {
          from: { opacity: '1', transform: 'translateX(0%)' },
          to: { opacity: '0', transform: 'translateX(-100%)' },
        },
      },
      animation: {
        ripple: 'ripple',
        indeterminateFirst: 'indeterminateFirst 1s ease-out infinite',
        indeterminateSecond: 'indeterminateSecond 1s ease-in infinite',
        fadeInBottom: 'fadeInBottom 400ms ease-in linear',
        fadeOutBottom: 'fadeOutBottom 400ms ease-out linear',
      },
    },
  },
  plugins: [],
  presets: [theme],
};
