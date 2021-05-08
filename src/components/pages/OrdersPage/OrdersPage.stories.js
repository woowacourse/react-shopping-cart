import React from 'react';
import OrdersPage from '.';
import { reactFamilyOrders } from '../../../mockData';

export default {
  title: 'pages/OrdersPage',
  component: OrdersPage,
  argTypes: {},
};

const Template = (args) => <OrdersPage {...args} />;

export const Default = Template.bind({});
Default.args = {
  orders: reactFamilyOrders,
};
