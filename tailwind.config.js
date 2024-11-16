module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: { 
        // Shrikhand, Oi, Kavoon, Ultra
        serif: ['Ultra', 'serif'],
        sans: ['Poppins', 'sans-serif']
      },
      colors: {
        'darker-white': '#f1f1f1'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
