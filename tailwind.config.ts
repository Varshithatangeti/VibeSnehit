const config = {
    theme: {
    extend: {
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'spin-slow' : 'spin 6s linear infinite',
      },
      keyframes: {
        'gradient': {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
      },
    },
  },
  plugins: [],
}

export default config