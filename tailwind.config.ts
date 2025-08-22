import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        pokered: '#ef5350',
        pokeyellow: '#ffcb05',
        pokeblue: '#2a75bb'
      },
      backgroundImage: {
        'radial-poke': 'radial-gradient(1000px 600px at 80% -20%, rgba(255,203,5,0.25), transparent), radial-gradient(800px 500px at -10% 20%, rgba(42,117,187,0.25), transparent), radial-gradient(600px 400px at 50% 120%, rgba(239,83,80,0.2), transparent)'
      }
    }
  },
  plugins: []
} satisfies Config
