import React from "react";
import { Story, Meta } from "@storybook/react";

import Header from ".";

export default {
  title: "Header",
  component: Header,
} as Meta;

const Template: Story = () => <Header />;

export const Basic = Template.bind({});
