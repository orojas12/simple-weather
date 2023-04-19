/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const config = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    open: true,
    host: "0.0.0.0",
    port: 3000,
    allowedHosts: ["all"],
    client: {
      webSocketURL: "ws://localhost:8080/ws",
    },
    historyApiFallback: true,
  },
  devtool: "inline-source-map",
  plugins: [],
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/i,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
