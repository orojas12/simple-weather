const path = require("path");

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
    host: "127.0.0.1",
    port: 3000,
    historyApiFallback: true,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8080",
      },
    },
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
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    alias: {
      components: path.resolve(__dirname, "src/components"),
      icons: path.resolve(__dirname, "src/icons"),
      pages: path.resolve(__dirname, "src/pages"),
      hooks: path.resolve(__dirname, "src/hooks"),
      layout: path.resolve(__dirname, "src/layout"),
      services: path.resolve(__dirname, "src/services"),
    },
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
