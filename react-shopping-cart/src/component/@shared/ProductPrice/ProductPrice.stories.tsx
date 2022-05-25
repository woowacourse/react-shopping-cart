import ProductPrice from "component/@shared/ProductPrice/ProductPrice";
import { Meta, Story } from "@storybook/react";
import { StyledType } from "styled-components";

export default {
  title: "ProductPrice",
  component: ProductPrice,
} as Meta;

const Template: Story<StyledType> = (args) => (
  <ProductPrice {...args}>43,400원</ProductPrice>
);

export const CardProductPrice = Template.bind({});
CardProductPrice.args = {
  type: "card",
};

export const DetailProductPrice = Template.bind({});
DetailProductPrice.args = {
  type: "detail",
};

export const ShoppingCartProductPrice = Template.bind({});
ShoppingCartProductPrice.args = {
  type: "shoppingCart",
};
