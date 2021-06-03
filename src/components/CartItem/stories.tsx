import React from "react";
import { Story, Meta } from "@storybook/react";

import CartItem, { CartItemProps } from ".";

export default {
  title: "CartItem",
  component: CartItem,
} as Meta;

const Template: Story<CartItemProps> = (args) => <CartItem {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  id: "1",
  name: "브랜브랜의 철봉",
  price: 1000000,
  quantity: 11,
  imageUrl: "http://via.placeholder.com/400x400",
  isChecked: false,
};
