module.exports = {
  setupFilesAfterEnv: ["./src/setupTests.js"],
  moduleNameMapper: {
    "@/(.*)$": "<rootDir>/src/$1",
  },
};
