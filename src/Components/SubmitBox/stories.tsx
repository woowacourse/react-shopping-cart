import React from "react";
import { Story, Meta } from "@storybook/react";

import SubmitBox, { SubmitBoxProps } from ".";

export default {
  title: "SubmitBox",
  component: SubmitBox,
} as Meta;

const Template: Story<SubmitBoxProps> = (args) => <SubmitBox {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  width: "28rem",
  height: "20rem",
  title: "결제금액",
  target: {
    name: "총 결제금액",
    value: "325,600원",
  },
  buttonName: "325,600원 결제하기",
};
