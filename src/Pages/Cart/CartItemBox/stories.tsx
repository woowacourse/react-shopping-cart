import React from "react";
import { Story, Meta } from "@storybook/react";

import CartItemBox, { CartItemBoxProps } from ".";

export default {
  title: "Containers/CartItemBox",
  component: CartItemBox,
} as Meta;

const Template: Story<CartItemBoxProps> = (args) => <CartItemBox {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  id: "1",
  name: "브랜브랜의 철봉",
  price: 1000000,
  onClickDeleteButton: () => {},
};
