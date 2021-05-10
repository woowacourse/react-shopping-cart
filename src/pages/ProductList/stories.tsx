import React from "react";
import { Story, Meta } from "@storybook/react";
import ProductList from ".";

export default {
  title: "Pages/ProductList",
  component: ProductList,
} as Meta;

const Template: Story = () => <ProductList />;

export const Basic = Template.bind({});
