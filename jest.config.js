module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(png)$": "<rootDir>/__mocks__/fileMock.js",
    "^.+\\.svg$": "jest-transformer-svg",
  },
  "transform": {
    "^.+\\.svg$": "jest-transformer-svg"
  }
};
