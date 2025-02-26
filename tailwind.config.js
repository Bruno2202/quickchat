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
        'blue': '#187CFF',
        'lightBlue': '#92D6FF',
        'darkGrey': '#1E2024',
        'grey': '#3A3D45',
        'lightGrey': '#8D939E',
        'orange': '#FF4E00',
        'yellow': '#D79E0A',
        'green': '#45FF0A'
      },
      borderRadius: {
        '8': '8px',
      },
      fontSize: {
        '1.8rem': '1.8rem',
        '3rem': '3rem'
      },
      animation: {
        spin: 'spin 1500ms linear infinite',
      },
      maxWidth: {
        '4/5': '80%',
      },
      fontFamily: {
        kumbh: ["Kumbh Sans"],
      },
      animation: {
        bounce200: "bounce 1s infinite 200ms",
        bounce400: "bounce 1s infinite 400ms",
      },
    },
  },
  plugins: [],
}