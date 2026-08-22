/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lumera: {
          bg: "#FAF8F5",
          card: "rgba(255, 255, 255, 0.75)",
          pearl: "#F5F2EC",
          ivory: "#FBF9F5",
          champagne: "#E8DFD3",
          gold: "#D4AF37",
          goldSoft: "rgba(212, 175, 55, 0.15)",
          charcoal: "#1A1918",
          muted: "#6E6C68",
          border: "rgba(232, 223, 211, 0.6)",
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
