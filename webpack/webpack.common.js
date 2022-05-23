const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { join, resolve } = require("path");

module.exports = {
  mode: "development",
  entry: join(__dirname, "../src/index.jsx"),
  devtool: "source-map",
  devServer: {
    historyApiFallback: true,
  },
  output: {
    filename: "main.js",
    path: join(__dirname, "../dist"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.module\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]___[hash:base64:5]",
              },
              importLoaders: 1,
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.(scss)$/,
        exclude: /\.module\.scss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png)$/,
        type: "asset/resource",
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
      template: join(__dirname, "../public/index.html"),
    }),
    new CleanWebpackPlugin(),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "../src"),
      "@hooks": resolve(__dirname, "../src/hooks"),
      "@shared": resolve(__dirname, "../src/components"),
      "@scss": resolve(__dirname, "../src/scss"),
      "@home": resolve(__dirname, "../src/pages/home"),
      "@cart": resolve(__dirname, "../src/pages/cart"),
      "@redux": resolve(__dirname, "../src/redux"),
      "@assets": resolve(__dirname, "../src/assets"),
    },
    extensions: [".js", ".jsx", ".scss"],
  },
};
