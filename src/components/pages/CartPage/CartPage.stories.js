import React from 'react';
import CartPage from '.';
import { HEADER } from '../../../constants/appInfo';
import { reactFamily } from '../../../mockData';
import ShoppingCart from '../../common/Icon/ShoppingCart';
import Header from '../../Header';
import Navigation from '../../Navigation';
import Main from '../../Main';

export default {
  title: 'pages/CartPage',
  component: CartPage,
  argTypes: {},
};

const Template = (args) => <CartPage {...args} />;

export const Default = Template.bind({});
Default.args = {
  products: reactFamily.map((item) => ({ ...item, amount: 1, isChecked: false })),
};
