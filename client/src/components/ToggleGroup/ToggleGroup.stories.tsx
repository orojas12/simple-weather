import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import ToggleGroup from "./ToggleGroup";

const meta: Meta<typeof ToggleGroup> = {
  component: ToggleGroup,
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;
export const Multiple: Story = {
  render: () => (
    <ToggleGroup onChange={action("onChange")}>
      <ToggleGroup.Toggle name="toggle1">Toggle</ToggleGroup.Toggle>
      <ToggleGroup.Toggle name="toggle2">Toggle</ToggleGroup.Toggle>
      <ToggleGroup.Toggle name="toggle3">Toggle</ToggleGroup.Toggle>
    </ToggleGroup>
  ),
};

export const Exclusive: Story = {
  render: () => (
    <ToggleGroup exclusive onChange={action("onChange")}>
      <ToggleGroup.Toggle name="toggle1">Toggle</ToggleGroup.Toggle>
      <ToggleGroup.Toggle name="toggle2">Toggle</ToggleGroup.Toggle>
      <ToggleGroup.Toggle name="toggle3">Toggle</ToggleGroup.Toggle>
    </ToggleGroup>
  ),
};

export const EnforceSelect: Story = {
  render: () => (
    <ToggleGroup enforceSelection onChange={action("onChange")}>
      <ToggleGroup.Toggle name="toggle1" default>
        Toggle
      </ToggleGroup.Toggle>
      <ToggleGroup.Toggle name="toggle2">Toggle</ToggleGroup.Toggle>
      <ToggleGroup.Toggle name="toggle3">Toggle</ToggleGroup.Toggle>
    </ToggleGroup>
  ),
};

export const ExclusiveEnforceSelect: Story = {
  render: () => (
    <ToggleGroup exclusive enforceSelection onChange={action("onChange")}>
      <ToggleGroup.Toggle name="toggle1" default>
        Toggle
      </ToggleGroup.Toggle>
      <ToggleGroup.Toggle name="toggle2">Toggle</ToggleGroup.Toggle>
      <ToggleGroup.Toggle name="toggle3">Toggle</ToggleGroup.Toggle>
    </ToggleGroup>
  ),
};
