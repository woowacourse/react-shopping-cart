import React from "react";
import { Story, Meta } from "@storybook/react";

import Product, { IProductProps } from ".";
import ProductImage from "../ProductImage";

export default {
  title: "Product",
  component: Product,
} as Meta;

const Template: Story<IProductProps> = (args) => <Product {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  Image: (
    <ProductImage
      size="282px"
      alt="dummy"
      src="http://via.placeholder.com/282x282"
    />
  ),
  name: "브랜브랜 철봉",
  price: "1000000",
  link: "./",
  onClickCart: (event) => console.log("Test"),
};
