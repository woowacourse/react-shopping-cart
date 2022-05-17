import React from "react";
import Logo from "../../components/Header/Logo";

export default {
  title: "Component/Logo",
  component: Logo,
};

const Template = (args) => <Logo {...args} />;

export const Default = Template.bind({});
