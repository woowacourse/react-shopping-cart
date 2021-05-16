import React, { InputHTMLAttributes } from "react";
import { Story, Meta } from "@storybook/react";

import CheckBox from ".";

export default {
  title: "CheckBox",
  component: CheckBox,
} as Meta;

const Template: Story<InputHTMLAttributes<HTMLInputElement>> = (args) => <CheckBox {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  checked: true,
  onChange: () => {},
};
