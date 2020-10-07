module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    [
      'babel-plugin-istanbul',
      {
        extension: ['.ts', '.vue'],
      },
    ],
  ],
}
