/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        carBounce: 'carBounce 0.4s ease-in-out infinite',
        wheelSpin: 'wheelSpin 0.4s linear infinite',
        glow: 'glow 0.8s ease-in-out infinite',
      },
      keyframes: {
        carBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        wheelSpin: {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 25px currentColor' },
          '50%': { boxShadow: '0 0 40px currentColor' },
        },
      },
    },
  },
  plugins: [],
}