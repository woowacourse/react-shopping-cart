module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  framework: "@storybook/react",
  addons: ["@storybook/addon-controls"],
  core: {
    builder: "@storybook/builder-webpack5",
  },
  babel: async (options) => ({
    ...options,
    presets: [
      ...options.presets,
      [
        "@babel/preset-react",
        {
          runtime: "automatic",
        },
        "preset-react-jsx-transform",
      ],
    ],
  }),
  typescript: {
    reactDocgen: "react-docgen-typescript-plugin",
  },
};
