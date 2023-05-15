const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  jest: {
    configure: {
      moduleNameMapper: {
        '^@components(.*)$': '<rootDir>/src/components$1',
        '^@assets/(.*)$': '<rootDir>/src/assets/$1',
        '^@pages/(.*)$': '<rootDir>/src/pages/$1',
        '^@components/(.*)$': '<rootDir>/src/components/$1',
        '^@styles/(.*)$': '<rootDir>/src/styles/$1',
        '^@recoil/(.*)$': '<rootDir>/src/recoil/$1',
        '^@type/(.*)$': '<rootDir>/src/types/$1',
        '^@utils/(.*)$': '<rootDir>/src/utils/$1',
        '^@constants/(.*)$': '<rootDir>/src/constants/$1',
      },
    },
  },
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
          webpackConfig.resolve.plugins.push(new TsconfigPathsPlugin({}));
          return webpackConfig;
        },
      },
    },
  ],
};
