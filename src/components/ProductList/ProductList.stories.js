import React from 'react';
import ProductList from '.';
import { reactFamily } from '../../mockData';

export default {
  title: 'ProductList',
  component: ProductList,
  argTypes: {},
};

const Template = (args) => <ProductList {...args} />;

export const Default = Template.bind({});
Default.args = {
  products: reactFamily,
};
