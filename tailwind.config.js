/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black': '#000104',
        'white': '#FFFFFF',
        'blue': '#0000FF',
        'darkGrey': '#1E2024',
        'grey': '#454545',
        'lightGrey': '#8D939E',
        'orange': '#FF4E00',
      },
      borderRadius: {
        '8': '8px',
      },
      fontSize: {
        '1.8rem': '1.8rem'
      },
      animation: {
        spin: 'spin 1500ms linear infinite',
      },
      maxWidth: {
        '4/5': '80%', // Correção aqui, removendo as aspas em torno do valor
      }
    },
  },
  plugins: [],
}