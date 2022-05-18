const webpack = require("webpack");
const { merge } = require("webpack-merge");
const { join } = require("path");
const common = require("./webpack.common");

require("dotenv").config({ path: join(__dirname, "../env/.env.prod") });

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  output: {},
  module: {},
  plugins: [
    new webpack.DefinePlugin({
      API_URL: JSON.stringify(process.env.API_URL),
    }),
  ],
  resolve: {},
});
