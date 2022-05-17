import React from "react";
import CheckBox from "../components/common/CheckBox";

export default {
  title: "Component/CheckBox",
  component: CheckBox,
  argTypes: {},
};

const Template = (args) => <CheckBox {...args} />;

export const Default = Template.bind({});

Default.args = {};
