import React from "react";
import Header from "../components/Header";

export default {
  title: "Component/Header",
  component: Header,
  argTypes: {
    children: { controls: "text" },
  },
};

const Template = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "안녕",
};
