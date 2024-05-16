module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
<<<<<<< HEAD
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
=======
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
>>>>>>> 590ab49cb0a90eaaa908d14b8336f046b62bbdb8
  },
}
