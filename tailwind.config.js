export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: { ink: '#0b0a1f', 'ink-light': '#121130', brand: { teal: '#2fe6ac', purple: '#8659e6' } },
      boxShadow: { glow: '0 0 20px -5px rgba(47,230,172,0.3)', 'glow-purple': '0 0 20px -5px rgba(134,89,230,0.3)', 'glow-lg': '0 0 40px -10px rgba(47,230,172,0.4)' },
      animation: { 'spin-slow': 'spin 20s linear infinite' },
    },
  },
  plugins: [],
};
