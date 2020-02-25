module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true
  },
  plugins: ['prettier'],
  extends: ['standard', require.resolve('eslint-config-prettier')],
  rules: {
    'prettier/prettier': 'warn',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2019
  }
}
