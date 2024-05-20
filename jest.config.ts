export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        diagnostics: {
          ignoreCodes: [1343],
        },
        astTransformers: {
          before: [
            {
              path: "node_modules/ts-jest-mock-import-meta", // or, alternatively, 'ts-jest-mock-import-meta' directly, without node_modules.
              options: {
                metaObjectReplacement: { url: "https://www.url.com" },
              },
            },
          ],
        },
        tsconfig: "tsconfig.json",
      },
    ],
  },
  moduleNameMapper: {
    "^.+\\.svg$": "jest-svg-transformer",
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
  },
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  setupFilesAfterEnv: ["./src/setupTest.ts", "./src/setupEnv.ts"],
  setupFiles: ["./jest.polyfills.js"],

  testEnvironmentOptions: {
    customExportConditions: [""],
  },
};
