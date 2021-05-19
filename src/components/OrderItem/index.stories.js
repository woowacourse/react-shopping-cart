import React from 'react';
import OrderItem from './index.js';

export default {
  title: 'components/OrderItem',
  component: OrderItem,
};

export const Primary = args => <OrderItem {...args}>Text</OrderItem>;
