import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { NotificationProvider } from "@/context";

import Notifications from "./Notifications";

const meta: Meta<typeof Notifications> = {
  component: Notifications,
};

type Story = StoryObj<typeof Notification>;

export const Multiple: Story = {
  decorators: [
    (Story) => {
      return (
        <NotificationProvider
          initialState={[
            {
              id: "1",
              type: "success",
              message: "This is a success notification",
            },
            {
              id: "2",
              type: "error",
              message: "This is an error notification",
            },
            {
              id: "3",
              type: "success",
              message: "This is a success notification",
            },
          ]}
        >
          <Story />
        </NotificationProvider>
      );
    },
  ],
  render: () => <Notifications />,
};

export const Single: Story = {
  decorators: [
    (Story) => {
      return (
        <NotificationProvider
          initialState={[
            {
              id: "1",
              type: "success",
              message: "This is a success notification",
            },
          ]}
        >
          <Story />
        </NotificationProvider>
      );
    },
  ],
  render: () => <Notifications />,
};

export default meta;
