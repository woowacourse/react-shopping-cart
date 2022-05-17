import React from "react";
import BoxButton from "../components/common/BoxButton";

export default {
  title: "Component/BoxButton",
  component: BoxButton,
  argTypes: {
    children: { controls: "text" },
    bgColor: { controls: "text" },
  },
};

const Template = (args) => <BoxButton {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: "Sample",
  bgColor: "",
};
