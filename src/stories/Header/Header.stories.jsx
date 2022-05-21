import React from "react";
import Header from "../../components/common/Header";

export default {
  title: "Component/Header/Header",
  component: Header,
};

const Template = (args) => <Header {...args} />;

export const Default = Template.bind({});
