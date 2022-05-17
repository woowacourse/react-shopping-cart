import React from "react";
import Button from "../components/common/Button";

export default {
  title: "Component/Button",
  component: Button,
  argTypes: {
    children: { controls: "text" },
    width: { controls: "text" },
    height: { controls: "text" },
    fontSize: { controls: "text" },
    fontWeight: { controls: "text" },
    color: { controls: "text" },
    borderStyle: { controls: "text" },
    borderColor: { controls: "text" },
    bgColor: { controls: "text" },
  },
};

const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: "Sample",
  width: "200px",
  height: "40px",
  fontSize: "",
  fontWeight: "",
  color: "",
  borderStyle: "",
  borderColor: "",
  bgColor: "",
};
