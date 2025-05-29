export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": ["ts-jest"],
  },
  moduleNameMapper: {
    "^.+\\.svg$": "jest-svg-transformer",
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  globals: {
    "import.meta": {
      env: {
        VITE_BASE_URL: process.env.VITE_BASE_URL,
        VITE_USER_TOKEN: process.env.VITE_USER_TOKEN,
      },
    },
  },
};
