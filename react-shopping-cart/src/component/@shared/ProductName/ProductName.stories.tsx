import ProductName from "component/@shared/ProductName/ProductName";
import { Meta, Story } from "@storybook/react";
import { StyledType } from "styled-components";

export default {
  title: "ProductName",
  component: ProductName,
} as Meta;

const Template: Story<StyledType> = (args) => (
  <ProductName {...args}>PET보틀-정사각(420ml)</ProductName>
);

export const CardProductName = Template.bind({});
CardProductName.args = {
  type: "card",
};

export const DetailProductName = Template.bind({});
DetailProductName.args = {
  type: "detail",
};

export const ShoppingCartProductName = Template.bind({});
ShoppingCartProductName.args = {
  type: "shoppingCart",
};
