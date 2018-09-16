module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  env: {
    browser: true,
    node: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-console': 'off',

    'react/prop-types': 'off',
  }
};
