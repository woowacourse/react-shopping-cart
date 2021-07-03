import React from "react";
import { Story, Meta } from "@storybook/react";
import OrderLog from ".";

export default {
  title: "Pages/OrderLog",
  component: OrderLog,
} as Meta;

const Template: Story = () => <OrderLog />;

export const Basic = Template.bind({});
