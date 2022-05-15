import React from "react";
import GridList from "../pages/ProductListPage/GridList";
import ProductCard from "../pages/ProductListPage/ProductCard";

export default {
  title: "Component/GridList",
  component: GridList,
};

const dummy = {
  id: 1,
  thumbnailUrl: "https://cdn-mart.baemin.com/goods/85/1537405626217m0.jpg",
  name: "PET보틀-정사각(420ml)",
  price: 43400,
};

const Template = (args) => (
  <GridList {...args}>
    <ProductCard productInfo={dummy} />
    <ProductCard productInfo={dummy} />
    <ProductCard productInfo={dummy} />
    <ProductCard productInfo={dummy} />
    <ProductCard productInfo={dummy} />
    <ProductCard productInfo={dummy} />
    <ProductCard productInfo={dummy} />
    <ProductCard productInfo={dummy} />
    <ProductCard productInfo={dummy} />
    <ProductCard productInfo={dummy} />
    <ProductCard productInfo={dummy} />
    <ProductCard productInfo={dummy} />
    <ProductCard productInfo={dummy} />
    <ProductCard productInfo={dummy} />
  </GridList>
);

export const Default = Template.bind({});
