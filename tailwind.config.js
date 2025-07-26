/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Instrument Serif', 'serif'],
        'mono': ['Roboto Mono', 'monospace'],
        'sans': ['Roboto', 'system-ui', 'sans-serif'],
      },
      colors: {
        'wc-purple': '#cb9af7',
        'wc-green': '#5c6f1e',
        'wc-cream': '#f8f7f3',
      },
      dropShadow: {
        'cow': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        'marquee': 'marquee 20s linear infinite',
      }
    },
  },
  plugins: [],
} 