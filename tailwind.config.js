module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        brand: {
          'green': '#43C821',
          'grey': '#EAEAEA'
        }
      },
      margin: {
        'sm': '12px',
        'md': '24px',
        'lg': '36px',
      },
      padding: {
        'sm': '12px',
        'md': '24px',
        'lg': '36px',
        'xl': '100px',
      },
    },
  },
  plugins: [],
}