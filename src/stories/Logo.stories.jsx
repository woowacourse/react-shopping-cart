import React from "react";
import Logo from "../components/Logo";

export default {
  title: "Component/Logo",
  component: Logo,
  argTypes: {
    children: { controls: "text" },
  },
};

const Template = (args) => <Logo {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "안녕",
};
