import React from 'react';
import OrdersPage from '.';
import { HEADER } from '../../../constants/appInfo';
import { reactFamily } from '../../../mockData';

export default {
  title: 'pages/OrdersPage',
  component: OrdersPage,
  argTypes: {},
};

const Template = (args) => <OrdersPage {...args} />;

export const Default = Template.bind({});
Default.args = {
  orders: [
    { id: 0, products: reactFamily.map((item) => ({ ...item, amount: 1 })) },
    { id: 1, products: reactFamily.map((item) => ({ ...item, amount: 1 })) },
  ],
};
