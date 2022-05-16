const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { join } = require("path");

module.exports = {
  mode: "development",
  entry: join(__dirname, "/src/index.jsx"),
  devtool: "source-map",
  devServer: {
    historyApiFallback: true,
  },
  output: {
    filename: "main.js",
    path: join(__dirname, "/dist"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(scss)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png)$/,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
    new HtmlWebpackPlugin({
      template: join(__dirname, "public/index.html"),
    }),
    new CleanWebpackPlugin(),
  ],
  resolve: {
    alias: {
      "@": join(__dirname, "src"),
    },
    extensions: [".js", ".jsx", ".scss"],
  },
};
