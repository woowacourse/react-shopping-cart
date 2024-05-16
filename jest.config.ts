// jest.config.js
module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": ["ts-jest"],
  },
  setupFiles: ["dotenv/config"],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "\\.svg\\?react$": "<rootDir>/src/svgMock.tsx",
    "\\.png$": "<rootDir>/src/svgMock.tsx",
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@/styles/(.*)$": "<rootDir>/src/styles/$1",
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/types/(.*)$": "<rootDir>/src/types/$1",
    "^@/pages/(.*)$": "<rootDir>/src/pages/$1",
    "^@/hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@/recoil/(.*)$": "<rootDir>/src/recoil/$1",
    "^@/apis/(.*)$": "<rootDir>/src/apis/$1",
    "^@/utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@/constants/(.*)$": "<rootDir>/src/constants/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // 추가된 부분
};
