import React from 'react';
import CompletedOrder from './index.js';
import { totalOrders } from '../../../mockData';

export default {
  title: 'components/pages/CompletedOrder',
  component: CompletedOrder,
};

export const Primary = args => <CompletedOrder {...args} />;

Primary.args = {
  orders: totalOrders,
};
