import React from "react";
import Button from "../components/common/Button";

export default {
  title: "Component/Button",
  component: Button,
  argTypes: {
    children: { controls: "text" },
    bgColor: { controls: "text" },
  },
};

const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: "Sample",
  bgColor: "",
};
