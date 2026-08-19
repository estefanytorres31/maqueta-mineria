/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/renderer/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm:  '640px',
      md:  '768px',
      lg:  '990px',
      xl:  '1200px',
      '2xl': '1440px',
      '3xl': '1780px',
      '4k':  '2400px',
    },
    extend: {
      colors: {
        'industrial': {
          950: '#06080C',
          900: '#0A0F17',
          850: '#0D141E',
          800: '#111A26',
          750: '#162233',
          700: '#1C2B3F',
          600: '#253A54',
          500: '#334A68',
        },
        'electric': {
          500: '#1E88E5',
          400: '#42A5F5',
          300: '#64B5F6',
          600: '#1976D2',
          700: '#1565C0',
        },
        'status': {
          ok: '#10B981',
          warning: '#F59E0B',
          danger: '#EF4444',
          offline: '#6B7280',
        },
        'fuel': {
          primary: '#F59E0B',
          secondary: '#D97706',
        }
      },
      fontFamily: {
        'sans': ['"Segoe UI Variable"', '"Segoe UI"', 'Inter', 'system-ui', '-apple-system', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        'mono': ['Cascadia Mono', 'Cascadia Code', '"JetBrains Mono"', 'Consolas', '"Courier New"', 'monospace'],
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(30, 136, 229, 0.35)',
        'glow-green': '0 0 15px rgba(16, 185, 129, 0.3)',
        'glow-orange': '0 0 15px rgba(245, 158, 11, 0.3)',
        'glow-red': '0 0 15px rgba(239, 68, 68, 0.4)',
        'panel': '0 4px 24px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(30, 136, 229, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(30, 136, 229, 0.5)' },
        }
      }
    },
  },
  plugins: [],
}
