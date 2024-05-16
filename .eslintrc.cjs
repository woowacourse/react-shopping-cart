const { allowedNodeEnvironmentFlags } = require('process');

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'import'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'import/newline-after-import': ['error', { count: 1 }],
    'import/order': [
      'error',
      {
        groups: [['builtin', 'external'], 'internal', 'parent', 'sibling', 'index', 'type'],
        'newlines-between': 'always',
        warnOnUnassignedImports: true,
        distinctGroup: false,
        pathGroups: [
          {
            pattern: '*react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '.**/*.css',
            group: 'type',
            position: 'after',
          },
        ],
        alphabetize: {
          order: 'asc',
        },
      },
    ],
  },
};
