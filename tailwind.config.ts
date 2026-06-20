import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0A',
        surface: '#111111',
        'border-subtle': '#1F1F1F',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        float1: 'float1 8s ease-in-out infinite',
        float2: 'float2 10s ease-in-out infinite',
        float3: 'float3 7s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2.5s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float1: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(30px, -40px) scale(1.05)' },
        },
        float2: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(-20px, 30px) scale(0.95)' },
        },
        float3: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(15px, -20px)' },
        },
        glowPulse: {
          '0%, 100%': {
            boxShadow:
              '0 0 20px rgba(249,115,22,0.3), 0 0 60px rgba(249,115,22,0.1)',
          },
          '50%': {
            boxShadow:
              '0 0 40px rgba(249,115,22,0.6), 0 0 100px rgba(249,115,22,0.2)',
          },
        },
      },
    },
  },
  plugins: [],
}

export default config
