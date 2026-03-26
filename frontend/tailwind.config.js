/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/entregador/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/funcionarios/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/loja/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/checkout/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8b5cf6',
        'primary-dark': '#7c3aed',
        'primary-light': '#a78bfa',
      },
    },
  },
  plugins: [],
}
