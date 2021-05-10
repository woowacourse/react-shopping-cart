import React from 'react';
import ShoppingCart from './index.js';
import { products } from '../../../mockData';

export default {
  title: 'components/pages/ShoppingCart',
  component: ShoppingCart,
};

export const Primary = args => <ShoppingCart {...args} />;

Primary.args = {
  products,
};
