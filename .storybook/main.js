const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  framework: '@storybook/react',
  addons: ['@storybook/addon-controls'],
  core: {
    builder: '@storybook/builder-webpack5',
  },
  babel: async (options) => ({
    ...options,
    presets: [
      ...options.presets,
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
        },
        'preset-react-jsx-transform',
      ],
    ],
  }),
  webpackFinal: async (config) => {
    config.module.rules = config.module.rules.filter((rule) => !rule.test.test(/\.svg$/));
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg|webp)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      ],
    });

    return config;
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript-plugin',
  },
};
