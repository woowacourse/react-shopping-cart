import React from "react";
import ProductCartItem from "../components/pages/ProductCartPage/ProductCartItem";

export default {
  title: "Component/ProductCartItem",
  component: ProductCartItem,
  argTypes: {
    product: { controls: "object" },
    amount: { controls: "number" },
  },
};

const Template = (args) => <ProductCartItem {...args} />;

export const Default = Template.bind({});

Default.args = {
  product: {
    id: 1,
    thumbnailUrl: "https://cdn-mart.baemin.com/goods/85/1537405626217m0.jpg",
    name: "PET보틀-정사각(420ml)",
    price: 43400,
    quantity: 10,
  },
  amount: 10,
};
