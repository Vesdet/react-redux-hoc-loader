const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");

module.exports = (env, argv) => {
  const { mode = "production" } = argv;
  return {
    name: "react-redux-loader",
    entry: [
      "./example/index.js"
    ],
    output: {
      path: path.join(__dirname, "..", "dist-example"),
      filename: "index.js"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: [ __dirname, path.join(__dirname, "..", "src/") ],
          loader: "babel-loader"
        }
      ]
    },
    plugins: [
      new DefinePlugin({ "process.env.NODE_ENV": JSON.stringify(mode) }),
      new HtmlWebpackPlugin({ inject: "head", title: "React-redux loader" })
    ]
  };
};