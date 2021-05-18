import React from "react";
import { Story, Meta } from "@storybook/react";

import Button, { ButtonProps } from ".";
import { COLOR, SIZE } from "../../constants/theme";

export default {
  title: "Button",
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  width: SIZE.BUTTON.PRODUCT_DETAIL.WIDTH,
  height: SIZE.BUTTON.PRODUCT_DETAIL.HEIGHT,
  backgroundColor: COLOR.BROWN,
  color: COLOR.WHITE,
  fontSize: SIZE.BUTTON.PRODUCT_DETAIL.FONT,
  children: "Basic버튼",
};
