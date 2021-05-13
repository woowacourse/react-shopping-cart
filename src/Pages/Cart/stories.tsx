import React from "react";
import { Story, Meta } from "@storybook/react";
import Cart from ".";

export default {
  title: "Pages/Cart",
  component: Cart,
} as Meta;

const Template: Story = () => <Cart />;

export const Basic = Template.bind({});
