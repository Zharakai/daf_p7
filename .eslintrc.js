const path = require('path');

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: ['plugin:vue/vue3-essential', 'airbnb-base', 'plugin:jsdoc/recommended'],
  plugins: ['prettier', 'jsdoc'],
  // add your custom rules here
  rules: {
    'jsdoc/tag-lines': 0,
  },
  settings: {
    'import/resolver': {
      alias: {
        extensions: ['.js', '.vue', '.json'],
        map: [
          ['~', path.resolve(__dirname, './src/')],
          ['@', path.resolve(__dirname, './src/')],
        ],
      },
    },
  },
};
