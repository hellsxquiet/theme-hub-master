/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./popup.tsx",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366F1', // Indigo 500
          dark: '#4F46E5',    // Indigo 600
          light: '#818CF8',   // Indigo 400
        },
        background: {
          DEFAULT: '#FAFAFA', // Zinc 50
          dark: '#09090B',    // Zinc 950
          card: '#FFFFFF',
          'card-dark': '#18181B', // Zinc 900
        },
        surface: {
          DEFAULT: '#F4F4F5', // Zinc 100
          dark: '#27272A',    // Zinc 800
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(0, 0, 0, 0.03)',
        'soft-lg': '0 10px 30px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 20px rgba(99, 102, 241, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}