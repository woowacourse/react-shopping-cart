import React from "react";
import { Story, Meta } from "@storybook/react";

import CartIcon, { CartIconProps } from ".";

export default {
  title: "CartIcon",
  component: CartIcon,
} as Meta;

const Template: Story<CartIconProps> = (args) => <CartIcon {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  size: "51px",
  color: "red",
};
