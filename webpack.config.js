const path = require("path");

module.exports = {
  entry: {
    index: ["@babel/polyfill", "./src/index.js"],
    insertWord: ["@babel/polyfill", "./src/insertWord.js"],
    wordList: ["@babel/polyfill", "./src/wordList.js"],
    login: ["@babel/polyfill", "./src/login.js"],
    register: ["@babel/polyfill", "./src/register.js"],
    settings: ["@babel/polyfill", "./src/settings.js"]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["@babel/preset-env"]
        }
      }
    ]
  }
};
