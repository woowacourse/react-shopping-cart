module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:react-hooks/recommended"],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],

    "import/extensions": ["error", { js: "ignorePackages" }],
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal", ["parent", "sibling"], "index", "object", "type", "unknown"],
        pathGroups: [
          {
            pattern: "next",
            group: "builtin",
            position: "before",
          },
          {
            pattern: "@/core/**",
            group: "unknown",
          },
          {
            pattern: "**/*.css.ts",
            group: "unknown",
            position: "after",
          },
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
  },
};
