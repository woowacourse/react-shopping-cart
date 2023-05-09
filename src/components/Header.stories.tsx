import React from "react";
import Header from "./Header";
import { StoryFn } from "@storybook/react";

export default {
  title: "Header",
  component: Header,
};

const Template: StoryFn<React.ComponentProps<typeof Header>> = (args) => (
  <Header {...args} />
);

export const Controls = Template.bind({});
Controls.args = {
  cartCount: 2,
};
