import React from "react";
import { Story, Meta } from "@storybook/react";

import Product, { ProductProps } from ".";
import ProductImage from "../ProductImage";

export default {
  title: "Product",
  component: Product,
} as Meta;

const Template: Story<ProductProps> = (args) => <Product {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  imageUrl: "http://via.placeholder.com/282x282",
  imageSize: "282px",
  name: "브랜브랜 철봉",
  price: 1000000,
  id: "1",
  onClickCart: () => {},
};
