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
        primary: 'hsl(220 80% 50%)',
        accent: 'hsl(170 60% 45%)',
        bg: 'hsl(225 10% 12%)',
        surface: 'hsl(225 10% 16%)',
        'text-primary': 'hsl(225 10% 95%)',
        'text-secondary': 'hsl(225 10% 70%)',
        positive: 'hsl(142 76% 36%)',
        negative: 'hsl(0 84% 60%)',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
      },
      spacing: {
        'sm': '4px',
        'md': '8px',
        'lg': '16px',
        'xl': '24px',
      },
      boxShadow: {
        'card': '0 4px 12px hsla(0, 0%, 0%, 0.2)',
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
