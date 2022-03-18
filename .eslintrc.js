const path = require('path');

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  extends: ['plugin:vue/vue3-essential', 'airbnb-base'],
  plugins: ['prettier', 'jsdoc'],
  // add your custom rules here
  rules: {
    'jsdoc/tag-lines': 0,
    'jsdoc/check-param-names': 1,
    'jsdoc/check-tag-names': 1,
    'jsdoc/check-types': 1,
    'jsdoc/newline-after-description': 1,
    'jsdoc/require-description-complete-sentence': 1,
    'jsdoc/require-hyphen-before-param-description': 1,
    'jsdoc/require-param': 1,
    'jsdoc/require-param-description': 1,
    'jsdoc/require-param-name': 1,
    'jsdoc/require-param-type': 1,
    'jsdoc/require-returns-description': 1,
    'jsdoc/require-returns-type': 1,
    'jsdoc/require-jsdoc': ['warn', {
      publicOnly: false,
      require: {
        ArrowFunctionExpression: true,
        ClassDeclaration: true,
        ClassExpression: true,
        FunctionDeclaration: true,
        FunctionExpression: true,
        MethodDefinition: true,
      },
    }],
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
