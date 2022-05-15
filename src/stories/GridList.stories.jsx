import React from "react";
import GridList from "../pages/ProductListPage/GridList";
import ProductCard from "../pages/ProductListPage/ProductCard";

export default {
  title: "Component/GridList",
  component: GridList,
};

const dummyProduct = {
  id: 1,
  thumbnailUrl: "https://cdn-mart.baemin.com/goods/85/1537405626217m0.jpg",
  name: "PET보틀-정사각(420ml)",
  price: 43400,
};

const dummyProductList = [];
dummyProductList.length = 22;
dummyProductList.fill(dummyProduct);

const Template = (args) => (
  <GridList {...args}>
    {dummyProductList.map((product) => (
      <ProductCard product={product} />
    ))}
  </GridList>
);

export const Default = Template.bind({});
