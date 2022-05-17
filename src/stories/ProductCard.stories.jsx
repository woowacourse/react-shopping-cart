import React from "react";
import ProductCard from "../pages/ProductListPage/ProductCard";

export default {
  title: "Component/ProductCard",
  component: ProductCard,
  argTypes: {
    productInfo: { controls: "object" },
  },
};

const Template = (args) => <ProductCard {...args} />;

export const Default = Template.bind({});

Default.args = {
  productInfo: {
    id: 1,
    thumbnailUrl: "https://cdn-mart.baemin.com/goods/85/1537405626217m0.jpg",
    name: "PET보틀-정사각(420ml)",
    price: 43400,
  },
};
