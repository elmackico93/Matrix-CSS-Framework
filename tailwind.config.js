/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'matrix': {
          'bg': 'var(--m-bg)',
          'text': 'var(--m-text)',
          'text-dim': 'var(--m-text-dim)',
          'text-bright': 'var(--m-text-bright)',
          'text-white': 'var(--m-text-white)',
          'border': 'var(--m-border)',
          'panel': 'var(--m-panel)',
          'primary': 'var(--m-primary)',
          'secondary': 'var(--m-secondary)',
          'danger': 'var(--m-danger)',
          'warning': 'var(--m-warning)',
          'success': 'var(--m-success)',
          'info': 'var(--m-info)',
          'light': 'var(--m-light)',
          'dark': 'var(--m-dark)',
          'glow': 'var(--m-glow)',
          'overlay': 'var(--m-overlay)'
        }
      },
      fontFamily: {
        'matrix': 'var(--m-font-main)',
        'matrix-alt': 'var(--m-font-alt)',
        'matrix-hacker': 'var(--m-font-hacker)'
      },
      animation: {
        'cursor-blink': 'blink 1s step-end infinite',
        'progress-bar-stripes': 'progressBarStripes 1s linear infinite',
        'glow-pulse': 'glowPulse 2s infinite',
        'glitch': 'glitch 0.3s ease infinite',
        'pulse': 'pulse 3s infinite',
        // Add new card animations
        'terminal-scan': 'scanline 3s linear infinite',
        'flicker': 'flicker 5s infinite'
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 }
        },
        progressBarStripes: {
          '0%': { backgroundPosition: '1rem 0' },
          '100%': { backgroundPosition: '0 0' }
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 5px var(--m-glow)' },
          '50%': { boxShadow: '0 0 20px var(--m-glow), 0 0 30px var(--m-glow)' }
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(2px, -2px)' },
          '60%': { transform: 'translate(-2px, -2px)' },
          '80%': { transform: 'translate(2px, 2px)' }
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' }
        },
        // Add card animation keyframes
        scanline: {
          '0%': { top: '-100%' },
          '100%': { top: '100%' }
        },
        flicker: {
          '0%, 100%': { opacity: 1 },
          '3%': { opacity: 0.8 },
          '6%': { opacity: 1 },
          '7%': { opacity: 0.9 },
          '9%': { opacity: 1 },
          '65%': { opacity: 1 },
          '66%': { opacity: 0.8 },
          '69%': { opacity: 1 },
          '92%': { opacity: 1 },
          '93%': { opacity: 0.8 },
          '95%': { opacity: 1 }
        }
      },
      backgroundImage: {
        'matrix-code': "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='10' y='20' font-family='monospace' font-size='14' fill='rgba(0, 255, 65, 0.2)'%3E01%3C/text%3E%3Ctext x='40' y='50' font-family='monospace' font-size='14' fill='rgba(0, 255, 65, 0.15)'%3E10%3C/text%3E%3Ctext x='70' y='80' font-family='monospace' font-size='14' fill='rgba(0, 255, 65, 0.2)'%3E01%3C/text%3E%3Ctext x='20' y='90' font-family='monospace' font-size='14' fill='rgba(0, 255, 65, 0.15)'%3E10%3C/text%3E%3C/svg%3E\")",
        'hex-grid': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 2.5l12.5 7.5v15L15 32.5 2.5 25V10L15 2.5z' stroke='rgba(0, 255, 65, 0.1)' fill='none' stroke-width='0.5' transform='translate(15, 15)'/%3E%3C/svg%3E\")"
      }
    },
  },
  plugins: [],
  safelist: [
    'bg-matrix-primary',
    'bg-matrix-secondary',
    'bg-matrix-danger',
    'text-matrix-text',
    'text-matrix-text-bright',
    'border-matrix-border',
    'border-matrix-primary',
    'animate-glow-pulse',
    'animate-glitch',
    'animate-pulse',
    'clip-path-cyber',
    // Add card-related classes to safelist
    'animate-terminal-scan',
    'animate-flicker',
    'bg-matrix-code',
    'bg-hex-grid',
    'bg-opacity-30',
    'backdrop-blur-sm',
    'border-l-4',
    'border-l-matrix-primary',
    'border-l-matrix-success',
    'border-l-matrix-warning',
    'border-l-matrix-danger',
    'border-l-matrix-info'
  ]
}