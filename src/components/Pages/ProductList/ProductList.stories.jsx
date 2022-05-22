import React from 'react';
import ProductList from 'components/Pages/ProductList/index';

export default {
  title: 'components/Pages/ProductList',
  component: ProductList,
};

const Template = (args) => <ProductList {...args} />;

export const Default = Template.bind({});
