import React from "react";
import { Story, Meta } from "@storybook/react";

import Cart from "./Cart";

export default {
  title: "Animation",
  component: Cart,
} as Meta;

const Template: Story = (args) => <Cart {...args} />;

export const AddCardItemLoading = Template.bind({});

AddCardItemLoading.args = {};
