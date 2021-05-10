import React from 'react';
import OrderPayment from './index.js';
import { products } from '../../../mockData';

export default {
  title: 'components/pages/OrderPayment',
  component: OrderPayment,
};

export const Primary = args => <OrderPayment {...args} />;

Primary.args = {
  products,
};
