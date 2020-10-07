/* eslint-disable */
module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.ts',
    './src/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
        opensans: ['Open Sans', 'sans-serif'],
      },
      fontSize: {
        '5.5xl': '3.5rem',
        '7xl': '5rem',
        '8xl': '7rem',
        '9xl': '9rem',
        '10xl': '11rem',
      },
      margin: {
        '28': '7rem',
      },
    },
    aspectRatio: {
      '16/9': [16, 9],
    },
  },
  variants: {},
  plugins: [
    require('tailwindcss-aspect-ratio'),
    require('@tailwindcss/custom-forms'),
  ],
}
