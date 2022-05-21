import React from "react";
import ProductCard from "components/pages/ProductListPage/ProductCard";

export default {
  title: "Component/ProductCard",
  component: ProductCard,
  argTypes: {
    product: { controls: "object" },
  },
};

const Template = (args) => <ProductCard {...args} />;

export const Default = Template.bind({});

Default.args = {
  product: {
    id: 1,
    thumbnailUrl: "https://cdn-mart.baemin.com/goods/85/1537405626217m0.jpg",
    name: "PET보틀-정사각(420ml)",
    price: 43400,
  },
};
