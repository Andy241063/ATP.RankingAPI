/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        atp: {
          dark: '#0b1340',
          bright: '#00b1f4',
          slate: '#111827'
        }
      }
    }
  },
  plugins: []
};
