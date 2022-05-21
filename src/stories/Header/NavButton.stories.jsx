import React from "react";
import NavButton from "components/layout/Header/NavButton";

export default {
  title: "Component/Header/NavButton",
  component: NavButton,
  argTypes: {
    children: { controls: "text" },
    linkTo: { controls: "text" },
  },
};

const Template = (args) => <NavButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "안녕",
  linkTo: "/somePath",
};
