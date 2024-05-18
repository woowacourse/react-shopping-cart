export default {
  test: {
    environment: "jsdom",
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "^.+\\.svg$": "jest-svg-transformer",
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
  },
  setupFiles: ["./vitest.polyfills.js"],
  testEnvironmentOptions: { customExportConditions: [""] },
};
