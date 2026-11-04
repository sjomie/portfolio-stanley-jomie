/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#02040A',
        navy: {
          950: '#040A17',
          900: '#071126',
          800: '#0B1A37',
          700: '#12264D',
          600: '#1B3566',
        },
        ivory: '#F1EDE4',
        silver: { DEFAULT: '#A7B0BE', dim: '#6B7588' },
        electric: { DEFAULT: '#3E8BFF', soft: '#7FB2FF' },
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"Manrope"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: { widest2: '0.32em' },
    },
  },
  plugins: [],
}
