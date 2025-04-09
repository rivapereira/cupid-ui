import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Segoe UI"', 'sans-serif'],
      },
      colors: {
        pink: {
          50: '#fff5f7',
          100: '#ffe0eb',
          200: '#fab6cf',
          300: '#f68bb3',
          400: '#f26197',
          500: '#ee367b',
          600: '#d4266a',
          700: '#aa1f55',
          800: '#801841',
          900: '#56112c',
        },
      },
    },
  },
  plugins: [],
};

export default config;
