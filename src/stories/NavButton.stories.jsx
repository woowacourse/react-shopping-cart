import React from "react";
import NavButton from "../components/common/NavButton";

export default {
  title: "Component/NavButton",
  component: NavButton,
  argTypes: {
    children: { controls: "text" },
  },
};

const Template = (args) => <NavButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "안녕",
};
