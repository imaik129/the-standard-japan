/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0A',
        surface: {
          DEFAULT: '#111111',
          elevated: '#1A1A1A',
        },
        content: '#F5F5F0',
        accent: '#C8102E',
        muted: '#666666',
        border: '#2A2A2A',
        edu: {
          background: '#FAFAF8',
          surface: '#FFFFFF',
          'surface-muted': '#F3F2EE',
          content: '#1A1A1A',
          muted: '#5C5C58',
          border: '#E5E4DF',
          accent: '#8B2942',
        },
        'edu-ja': {
          background: '#F8FAFC',
          surface: '#FFFFFF',
          highlight: '#FFF9E8',
          'highlight-border': '#E8D48A',
          accent: '#1E5A8C',
          'accent-soft': '#E8F4FC',
          border: '#D4E4F0',
          muted: '#4A5568',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        accent: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        ja: ['var(--font-noto-sans-jp)', 'Hiragino Sans', 'Yu Gothic UI', 'sans-serif'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.content'),
            maxWidth: '72ch',
            a: {
              color: theme('colors.accent'),
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            },
            h1: { color: theme('colors.content'), fontFamily: 'var(--font-playfair)' },
            h2: { color: theme('colors.content'), fontFamily: 'var(--font-playfair)' },
            h3: { color: theme('colors.content'), fontFamily: 'var(--font-playfair)' },
            h4: { color: theme('colors.content') },
            strong: { color: theme('colors.content') },
            blockquote: {
              color: theme('colors.content'),
              borderLeftColor: theme('colors.accent'),
              borderLeftWidth: '3px',
              fontStyle: 'italic',
              paddingLeft: '1.5rem',
            },
            code: {
              color: theme('colors.accent'),
              backgroundColor: theme('colors.surface.elevated'),
              padding: '0.2em 0.4em',
              borderRadius: '3px',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            hr: { borderColor: theme('colors.border') },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
