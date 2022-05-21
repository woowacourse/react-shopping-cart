import React from "react";
import GridContainer from "components/common/GridContainer";
import ProductCard from "components/pages/ProductListPage/ProductCard";

export default {
  title: "Component/Common/GridContainer",
  component: GridContainer,
  argTypes: {
    colNo: { controls: "number" },
  },
};

const dummy = {
  id: 1,
  thumbnailUrl: "https://cdn-mart.baemin.com/goods/85/1537405626217m0.jpg",
  name: "PET보틀-정사각(420ml)",
  price: 43400,
};

const Template = (args) => (
  <GridContainer {...args}>
    <ProductCard product={dummy} />
    <ProductCard product={dummy} />
    <ProductCard product={dummy} />
    <ProductCard product={dummy} />
    <ProductCard product={dummy} />
    <ProductCard product={dummy} />
    <ProductCard product={dummy} />
  </GridContainer>
);

export const Default = Template.bind({});

Default.args = {
  colNo: 4,
};
