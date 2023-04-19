import path from "path";
import type { StorybookConfig } from "@storybook/react-webpack5";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  typescript: {
    reactDocgen: "react-docgen",
  },
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        plugins: [
          new TsconfigPathsPlugin({
            configFile: path.resolve(__dirname, "../tsconfig.json"),
          }),
        ],
        extensions: [".tsx", ".ts", ".jsx", ".js"],
      },
    };
  },
};
export default config;
