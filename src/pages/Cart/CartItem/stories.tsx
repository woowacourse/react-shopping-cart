import React from "react";
import { Story, Meta } from "@storybook/react";

import CartItem, { ICartItemProps } from ".";

export default {
  title: "Containers/CartItem",
  component: CartItem,
} as Meta;

const Template: Story<ICartItemProps> = (args) => <CartItem {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  id: "1",
  name: "브랜브랜의 철봉",
  price: 1000000,
  onClickDeleteButton: () => {},
};
