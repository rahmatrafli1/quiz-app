const webpack = require("webpack");
require("dotenv").config();

const amount = process.env.QUIZ_AMOUNT;
const type = process.env.QUIZ_TYPE;

if (!/^(?:[1-9]|[1-4]\d|50)$/.test(amount || "")) {
  throw new Error("QUIZ_AMOUNT must be an integer between 1 and 50.");
}

if (!["multiple", "boolean"].includes(type)) {
  throw new Error("QUIZ_TYPE must be multiple or boolean.");
}

module.exports = {
  output: {
    filename: "[name].pack.js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
    alias: {},
  },
  module: {
    rules: [
      {
        use: {
          loader: "babel-loader",
          options: {
            presets: ["babel-preset-env", "babel-preset-react"],
          },
        },
        exclude: /node_modules/,
        test: /\.jsx?$/,
      },
    ],
  },
  entry: {
    index: "./index",
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.QUIZ_AMOUNT": JSON.stringify(amount),
      "process.env.QUIZ_TYPE": JSON.stringify(type),
    }),
  ],
};
