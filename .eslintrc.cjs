module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:react/recommended', 'plugin:react-hooks/recommended', 'prettier', 'plugin:storybook/recommended'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  rules: {
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': ['error', {
      argsIgnorePattern: '^_'
    }],
    'no-console': ['warn', {
      allow: ['warn', 'error']
    }],
    'prefer-const': 'warn',
    eqeqeq: 'error',
    'no-multi-spaces': 'error',
    'no-var': 'error',
    'prefer-arrow-callback': 'error',
    'object-shorthand': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    "quotes": ["error", "single"],
    '@typescript-eslint/no-empty-function': 'off',
    "react/function-component-definition": [2, {
      "namedComponents": "arrow-function"
    }],
    "react-hooks/exhaustive-deps": "off",
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
