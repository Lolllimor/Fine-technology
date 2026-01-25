/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        whiteGlowPulse: {
          '0%': {
            boxShadow:
              '0 0 4px rgba(255,255,255,0.08), 0 0 8px rgba(255,255,255,0.06), 0 0 12px rgba(255,255,255,0.04)',
          },
          '50%': {
            boxShadow:
              '0 0 8px rgba(255,255,255,0.1), 0 0 16px rgba(255,255,255,0.08), 0 0 24px rgba(255,255,255,0.06)',
          },
          '100%': {
            boxShadow:
              '0 0 4px rgba(255,255,255,0.08), 0 0 8px rgba(255,255,255,0.06), 0 0 12px rgba(255,255,255,0.04)',
          },
        },
      },
      animation: {
        whiteGlow: 'whiteGlowPulse 4s ease-in-out infinite',
      },
    },
  }, 
  plugins: [require('tailwindcss-animate')],
};
