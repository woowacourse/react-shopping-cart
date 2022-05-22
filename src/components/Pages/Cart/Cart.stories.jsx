import React from 'react';
import Cart from 'components/Pages/Cart';

export default {
  title: 'components/Pages/Cart/Cart',
  component: Cart,
};

const Template = (args) => <Cart {...args} />;

export const Default = Template.bind({});

Default.args = {
  cartList: [],
};
