import { createRequire } from 'module'
const require = createRequire(import.meta.url)
import theme from './src/config/theme.js'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: theme.colors,
      fontFamily: {
        sans: theme.fonts.sans,
      },
      direction: theme.direction,
    },
  },
  plugins: [
    require('tailwindcss-rtl'),
  ],
}

