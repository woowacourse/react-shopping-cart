import React from "react";
import { Story, Meta } from "@storybook/react";

import Header, { HeaderProps } from ".";
import { PATH } from "../../../constants/path";

export default {
  title: "Header",
  component: Header,
} as Meta;

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  navigation: [
    { path: PATH.CART, name: "장바구니" },
    { path: PATH.ORDER_LIST, name: "주문목록" },
  ],
};
