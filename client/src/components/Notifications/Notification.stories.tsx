import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Notification from "./Notification";

const meta: Meta<typeof Notification> = {
  component: Notification,
};

export default meta;

type Story = StoryObj<typeof Notification>;

export const Success: Story = {
  render: () => (
    <Notification
      id="1"
      type="success"
      message="This is a success notification"
      onClick={(id: string) => action("Dismissed notification with id: " + id)}
    />
  ),
};

export const Error: Story = {
  render: () => (
    <Notification
      id="2"
      type="error"
      message="This is an error notification"
      onClick={(id: string) => action("Dismissed notification with id: " + id)}
    />
  ),
};
