import React from 'react';
import CheckoutPage from '.';
import { HEADER } from '../../../constants/appInfo';
import { mockData } from '../../../mockData';
import ShoppingCart from '../../common/Icon/ShoppingCart';
import Header from '../../Header';
import Navigation from '../../Navigation';
import Main from '../../Main';

export default {
  title: 'pages/CheckoutPage',
  component: CheckoutPage,
  argTypes: {},
};

const Template = (args) => <CheckoutPage {...args} />;

export const Default = Template.bind({});
Default.args = {
  products: mockData.map((item) => ({ ...item, amount: 1, isChecked: false })),
};
