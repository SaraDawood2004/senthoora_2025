// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#fca5a5',
          DEFAULT: '#ef4444',
          dark: '#b91c1c',
        },
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '49.99%': { opacity: 0 },
          '50%': { opacity: 0 },
        },
      },
      animation: {
        'blink-interval': 'blink 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
