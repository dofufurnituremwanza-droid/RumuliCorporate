/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0A1826',
          900: '#10243A', // Primary Midnight navy
          800: '#16314D',
          700: '#1D4064',
          600: '#26517D',
        },
        amber: {
          brand: '#E3A129', // Engineering amber
          hover: '#C88B1E',
          light: '#FDF6E9',
          muted: '#F5E2BE',
        },
        steel: {
          DEFAULT: '#667482', // Steel grey
          light: '#8E9AA7',
          dark: '#4B5763',
          border: '#DCE1E6',
        },
        surface: {
          offwhite: '#F4F5F6',
          muted: '#EAECEF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

