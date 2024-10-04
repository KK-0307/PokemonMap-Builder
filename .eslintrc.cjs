/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ['@cis-1962/eslint-config/node'],
  env: {
    browser: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
};
