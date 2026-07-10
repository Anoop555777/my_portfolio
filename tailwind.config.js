/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0B0B0E',
        'ink-2': '#121216',
        paper: '#EDEDE6',
        accent: '#D9FF3D',
        muted: '#8F8F88',
      },
      borderColor: {
        line: 'rgba(237, 237, 230, 0.14)',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        sans: ['Sora', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'spin-slower': 'spin 18s linear infinite',
        'blink': 'blink 1.4s step-end infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
