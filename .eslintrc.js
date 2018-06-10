const path = require('path');

module.exports = {
  root: true,
  // Configuración para resolver los alias declarados en webpack.config.js
  settings: {
    'import/resolver': {
      webpack: path.join(__dirname, 'webpack.config.js'),
      node: {
        paths: ['src']
      }
    }
  },
  parser: 'vue-eslint-parser',
  'parserOptions': {
    'parser': 'babel-eslint',
    'ecmaVersion': 2017,
    'sourceType': 'module',
    'allowImportExportEverywhere': true,
  },
  extends: [
    'airbnb-base',
    'plugin:vue/recommended',
  ],
  plugins: [
    'vue',
  ],
  rules: {
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'import/extensions': [ 2, {
      'js': 'never', 'vue': 'never', 'json': 'always',
    }],
    'max-len':
      [
        'error', 120, 2
      ],
    'no-plusplus': ['error', { 'allowForLoopAfterthoughts': true }],
    'object-property-newline': 'error',
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
