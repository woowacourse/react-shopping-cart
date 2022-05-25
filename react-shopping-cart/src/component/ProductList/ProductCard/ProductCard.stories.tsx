import ProductCard from "component/ProductList/ProductCard/ProductCard";
import { Meta, Story } from "@storybook/react";
import { Product } from "type";

export default {
  title: "ProductCard",
  component: ProductCard,
} as Meta;

const Template: Story<Product> = (args) => <ProductCard {...args} />;

export const DefaultProductCard = Template.bind({});
DefaultProductCard.args = {
  id: 3,
  thumbnail:
    "https://cdn-mart.baemin.com/goods/custom/20200525/11157-main-01.png",
  name: "PET보틀-정사각(420ml)",
  price: 43400,
};
