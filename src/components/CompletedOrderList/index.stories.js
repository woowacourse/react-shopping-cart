import React from 'react';
import CompletedOrderList from './index.js';

export default {
  title: 'components/CompletedOrderList',
  component: CompletedOrderList,
};

export const Primary = args => (
  <CompletedOrderList {...args}></CompletedOrderList>
);

Primary.args = {
  order: {
    id: 0,
    products: [
      {
        id: 0,
        imageAlt: undefined,
        image: undefined,
        name: '안녕',
        price: 1000,
        quantity: 0,
        checked: true,
      },

      {
        id: 1,
        imageAlt: undefined,
        image: undefined,
        name: '안녕2',
        price: 1200,
        quantity: 0,
        checked: true,
      },
    ],
  },
};
