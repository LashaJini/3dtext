const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => {
  const PORT = 3000;

  return {
    entry: "./index",
    output: {
      path: path.join(__dirname, "dist"),
      filename: "main.js",
    },
    devServer: {
      contentBase: path.join(__dirname, "/public/"),
      port: PORT,
      compress: true,
    },
    devtool: "source-map",
    resolve: {
      extensions: [".js"],
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.pug$/,
          use: ["pug-loader"],
        },
        {
          test: /\.(jpe?g|png|gif|glb|gltf)$/,
          use: ["file-loader"],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new CopyPlugin({
        patterns: [
          { from: "public", to: "" },
        ],
        options: {
          concurrency: 100,
        },
      }),
      new HtmlWebpackPlugin({
        template: "./views/pug/index.pug",
        inject: true,
      }),
    ],
  };
};
