import React from 'react';
import ProductList from './ProductList';

export default {
  component: ProductList,
  title: 'ProductList',
};

const Template = args => {
  return <ProductList {...args} />;
};

export const DefaultProductList = Template.bind({});

DefaultProductList.args = {};
