module.exports = {
  roots: ['<rootDir>'],
  moduleFileExtensions: ['jsx', 'js', 'json', 'svg'],
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest',
  },
  testMatch: [
    '<rootDir>/**/*.test.(js|jsx|ts|tsx)',
    '<rootDir>/(tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))',
  ],
  collectCoverage: true,
  clearMocks: true,
  coverageDirectory: 'coverage',
  moduleDirectories: ['node_modules', 'src'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^.+\\.svg$': 'jest-svg-transformer',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
};
