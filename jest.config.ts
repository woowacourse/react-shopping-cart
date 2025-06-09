export default {
  transformIgnorePatterns: [
    "node_modules/(?!(@dev-dino22/modal-components|react-router-dom)/)"
  ],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": ["babel-jest", { presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"] }]
  },
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  }
};
