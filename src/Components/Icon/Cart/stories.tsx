import React from "react";
import { Story, Meta } from "@storybook/react";

import Cart, { ICartProps } from ".";

export default {
  title: "Icon/Cart",
  component: Cart,
} as Meta;

const Template: Story<ICartProps> = (args) => <Cart {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  size: "51px",
  color: "red",
};
