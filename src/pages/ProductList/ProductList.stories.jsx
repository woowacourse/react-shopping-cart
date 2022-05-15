import React from 'react';
import ProductList from 'pages/ProductList/index';

export default {
  title: 'pages/ProductList',
  component: ProductList,
};

const Template = (args) => <ProductList {...args} />;

export const Default = Template.bind({});
