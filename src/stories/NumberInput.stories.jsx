import React from "react";
import NumberInput from "../components/common/NumberInput";

export default {
  title: "Component/NumberInput",
  component: NumberInput,
  argTypes: {},
};

const Template = (args) => <NumberInput {...args} />;

export const Default = Template.bind({});

Default.args = {};
