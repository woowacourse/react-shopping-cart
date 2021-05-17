import React from "react";
import { Story, Meta } from "@storybook/react";

import CartAnimation from ".";

export default {
  title: "CartAnimation",
  component: CartAnimation,
} as Meta;

const Template: Story = (args) => <CartAnimation {...args} />;

export const Basic = Template.bind({});

Basic.args = {};
