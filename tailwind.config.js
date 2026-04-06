import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#011844',
        primaryContainer: '#1a2e5a',
        secondary: '#4a5d8b',
        surface: '#f7f9fc',
        surfaceLow: '#f2f4f7',
        surfaceLowest: '#ffffff',
        surfaceHigh: '#e8edf5',
        outlineVariant: '#b8c2d3',
        onSurface: '#191c1e',
      },
      boxShadow: {
        ambient: '0 12px 40px 0 rgba(1, 24, 68, 0.06)',
      },
      fontFamily: {
        display: ['Manrope', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #011844 0%, #1a2e5a 100%)',
        'paper-grid': 'radial-gradient(circle at 1px 1px, rgba(74, 93, 139, 0.11) 1px, transparent 0)',
      },
      borderRadius: {
        sharp: '0.125rem',
        card: '0.375rem',
      },
      letterSpacing: {
        editorial: '-0.02em',
        label: '0.05em',
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        rise: 'rise 0.8s ease-out both',
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        amc: {
          primary: '#011844',
          'primary-content': '#f7f9fc',
          secondary: '#4a5d8b',
          accent: '#8c9ec4',
          neutral: '#11213f',
          'base-100': '#ffffff',
          'base-200': '#f7f9fc',
          'base-300': '#f2f4f7',
          'base-content': '#191c1e',
          info: '#264f96',
          success: '#204c42',
          warning: '#9c6b18',
          error: '#a53333',
        },
      },
      {
        amcDark: {
          primary: '#d9e2f5',
          'primary-content': '#07152f',
          secondary: '#afbdd8',
          accent: '#7e94be',
          neutral: '#101a31',
          'base-100': '#172235',
          'base-200': '#101a2c',
          'base-300': '#0c1424',
          'base-content': '#e7edf8',
          info: '#6f95d2',
          success: '#79b2a2',
          warning: '#d9b15a',
          error: '#de8b8b',
        },
      },
    ],
    logs: false,
  },
}