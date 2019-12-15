module.exports = {
  module: {
    rules: [{ test: /\.js$/, loader: "babel-loader" }]
  },
  entry: "./js/script.js",
  output: { path: __dirname },
  devtool: "inline-source-map",
  devServer: {
    host: "0.0.0.0"
  }
};
