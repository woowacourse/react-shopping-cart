import React from 'react';
import ProductItem from './ProductItem';

export default {
  title: 'units/ProductItem',
  component: ProductItem,
};

const Template = (args) => <ProductItem {...args} />;

export const Default = Template.bind({});
Default.args = {};
