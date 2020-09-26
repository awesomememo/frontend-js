const path = require("path");

module.exports = {
  entry: {
    index: ["@babel/polyfill", "./src/index.js"],
    insertWord: ["@babel/polyfill", "./src/insertWord.js"],
    wordList: ["@babel/polyfill", "./src/wordList.js"],
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["@babel/preset-env"],
        },
      },
    ],
  },
};
