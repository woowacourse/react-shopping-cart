import React from 'react';
import ProductList from 'components/ProductList/index';

export default {
  title: 'components/ProductList',
  component: ProductList,
};

const Template = (args) => <ProductList {...args} />;

export const Default = Template.bind({});
