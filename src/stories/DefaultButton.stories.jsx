import React from "react";
import DefaultButton from "components/common/DefaultButton";

export default {
  title: "Component/Common/DefaultButton",
  component: DefaultButton,
  argTypes: {
    children: { controls: "text" },
    bgColor: { controls: "text" },
  },
};

const Template = (args) => <DefaultButton {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: "Sample",
  bgColor: "",
};
