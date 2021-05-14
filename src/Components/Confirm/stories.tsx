import React from "react";
import { Story, Meta } from "@storybook/react";

import Confirm, { ConfirmProps } from ".";

export default {
  title: "Confirm",
  component: Confirm,
} as Meta;

const Template: Story<ConfirmProps> = (args) => <Confirm {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  title: "title",
  onConfirm: () => {},
  onReject: () => {},
};
