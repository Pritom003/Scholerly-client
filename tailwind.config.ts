import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        fadeOut: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(40px)' },
        },
      },
      animation: {
        'fade-out': 'fadeOut 0.3s ease-in-out forwards',
      },
      colors: {
        testBg: '#fef3c7', // light amber, just for testing
      },
    },
  },
  plugins: [],
}

export default config
