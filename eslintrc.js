module.exports = {
    env: {
      node: true,
      es2021: true,
      jest: true
    },
    extends: ['eslint:recommended'],
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module'
    },
    rules: {
      'no-console': ['error', { allow: ['log', 'warn', 'error'] }],
      'no-unused-vars': ['warn'],
      'no-async-promise-executor': 'warn',
      'no-extra-semi': 'error',
      'semi': ['error', 'always'],
      'quotes': ['error', 'single']
    }
  };