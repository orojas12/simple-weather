import React from "react";
import type { Preview } from "@storybook/react";
import "../src/index.css";
import "../src/app.css";

const preview: Preview = {
  parameters: {
    layout: "centered",
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) =>
      React.createElement("div", {
        children: React.createElement("div", {
          style: {
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            left: "0",
            top: "0",
          },
          children: React.createElement(Story),
        }),
        className: "BaseLayout",
      }),
  ],
};

export default preview;
