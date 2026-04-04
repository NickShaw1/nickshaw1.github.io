import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base:    '#0a0a0a',
          surface: '#111111',
          elevated:'#1a1a1a',
          border:  'rgba(255,255,255,0.07)',
        },
        accent: {
          DEFAULT: '#0AFF9D',
          dark:    '#07C97D',
        },
        link: '#F5A623',
        text: {
          primary:   '#F0EDE6',
          secondary: '#9e9e9e',
          muted:     '#9a9a9a',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', '-apple-system', 'sans-serif'],
        mono:    ['"Space Mono"', '"Courier New"', 'Courier', 'monospace'],
      },
      fontSize: {
        'hero':    ['clamp(2.25rem,5vw,4rem)',   { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'page-h':  ['clamp(2rem,3.5vw,2.5rem)',  { lineHeight: '1.1' }],
        'sect-h':  ['clamp(1.5rem,2.5vw,1.75rem)',{ lineHeight: '1.2' }],
        'card-h':  ['1.0625rem',                  { lineHeight: '1.4' }],
      },
      borderRadius: {
        tag:  '4px',
        card: '8px',
        lg:   '12px',
        pill: '9999px',
      },
      transitionDuration: {
        hover:  '150',
        base:   '300',
        slow:   '600',
      },
      transitionTimingFunction: {
        'ease-out-smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.3' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
        'shimmer-sweep': {
          '0%':   { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
      },
      animation: {
        'pulse-dot':     'pulse 2s ease-in-out infinite',
        shimmer:         'shimmer 1.8s linear infinite',
        'shimmer-sweep': 'shimmer-sweep 3s ease-in-out infinite',
      },
      maxWidth: {
        prose: '680px',
      },
    },
  },
  plugins: [],
}

export default config
