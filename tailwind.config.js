/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Font Sans untuk tulisan deskripsi (Bersih & Modern)
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        // Font Serif untuk Nama Brand (Mewah & Klasik)
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        // Kita tambahkan warna khusus Amdaay agar mudah dipanggil
        amdaay: {
          light: '#FDFBF7',
          dark: '#44403c', // stone-800
          accent: '#78716c', // stone-500
        }
      }
    },
  },
  plugins: [],
}