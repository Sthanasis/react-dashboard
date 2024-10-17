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
      },
      animation: {
        ripple: 'ripple',
      },
    },
  },
  plugins: [],
  presets: [theme],
};
