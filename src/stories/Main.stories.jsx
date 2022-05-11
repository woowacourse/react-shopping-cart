import React from "react";
import Main from "../components/Main";

export default {
  title: "Component/Main",
  component: Main,
};

const Template = (args) => <Main {...args} />;

export const Default = Template.bind({});
