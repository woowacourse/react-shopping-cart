import React from 'react';
import { products } from '../../../mockData';
import Products from './index.js';

export default {
  title: 'components/pages/Products',
  component: Products,
};

export const Primary = args => <Products {...args} />;

Primary.args = {
  products,
};
