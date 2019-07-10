module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'no-unused-expressions': ['error', { allowTernary: true }],
    'object-curly-newline': 0,
    'no-underscore-dangle': 0,
    'consistent-return': 0,
    'arrow-parens': 0,
    'operator-linebreak': 0,
  },
};
