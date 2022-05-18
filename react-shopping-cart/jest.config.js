module.exports = {
  roots: ["<rootDir>"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.js$": "babel-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["tsx", "js", "json", "node", "ts", "svg"],
  collectCoverage: true,
  clearMocks: true,
  coverageDirectory: "coverage",
  moduleDirectories: ["node_modules", "src"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    // jest가 절대경로를 인식하기 위함
    "^src/(.*)$": "<rootDir>/src/$1",
    "^.+\\.svg$": "jest-svg-transformer",
  },
};
