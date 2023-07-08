const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: "./src/main.js",
  plugins: [new MiniCssExtractPlugin({filename: "index.css"})],
  output: {
    path: path.resolve("dist"),
    filename: "main.js",
    publicPath: "/dist/",
  },
  resolve: {
    extensions: [".js"],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "./")
    },
    compress: true,
    port: 3339,
    host: '0.0.0.0',
  },
};