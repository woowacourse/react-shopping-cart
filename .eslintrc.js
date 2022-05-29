module.exports = {
  env: {
    browser: true,
    es2022: true,
    jest: true,
  },
  parser: "@babel/eslint-parser",
  plugins: ["prettier"],
  extends: [
    "airbnb",
    "airbnb/hooks",
    "plugin:react/recommended",
    "plugin:import/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "latest",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "max-depth": ["error", 3],
    "no-unused-expressions": [
      "error",
      {
        allowShortCircuit: true,
      },
    ],
    "prettier/prettier": ["error"],
    "react/jsx-props-no-spreading": "off",
    "no-shadow": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        scss: "never",
      },
    ],
    "import/prefer-default-export": "off",
    "react/prop-types": "off",
    "no-underscore-dangle": "off",
    "no-use-before-define": ["off"],
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "mock/*.js",
          "**/webpack.*.js",
          "*.config.js",
          "**/*.test.js",
        ],
      },
    ],
    "no-func-assign": "off",
    "dot-notation": "off",
  },
  settings: {
    "import/resolver": {
      webpack: {
        config: "./webpack/webpack.common.js",
      },
    },
  },
};
