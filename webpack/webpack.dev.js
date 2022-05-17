const { merge } = require("webpack-merge");
const webpack = require("webpack");
const { join } = require("path");
const common = require("./webpack.common");

require("dotenv").config({ path: join(__dirname, "../env/.env.dev") });

module.exports = merge(common, {
  mode: "development",
  devServer: {
    historyApiFallback: true,
  },
  output: {},
  module: {},
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify({
        API_URL: process.env.API_URL,
      }),
    }),
  ],
  resolve: {},
});
