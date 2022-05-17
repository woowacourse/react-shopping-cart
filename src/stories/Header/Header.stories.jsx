import React from "react";
import Header from "../../components/Header";

export default {
  title: "Component/Header",
  component: Header,
};

const Template = (args) => <Header {...args} />;

export const Default = Template.bind({});
