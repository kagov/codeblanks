require('dotenv').config();
const enablePurge = process.env.ENABLE_PURGE || true;
module.exports = {
  purge: {
    enabled: enablePurge,
    content: [
      './src/**/*.html',
      './src/**/*.scss'
    ]
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}