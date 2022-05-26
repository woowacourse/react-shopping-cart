import React from 'react';
import {BrowserRouter} from 'react-router-dom';

import CartItem from 'component/CartItem';
import {MOCK_PRODUCT_LIST} from 'mocks/mockData';

export default {
  component: CartItem,
  title: 'CartItem',
  argTypes: {
    initialChecked: {
      control: {
        type: 'boolean',
      },
    },
  },
};

const Template = (args) => (
  <BrowserRouter>
    <CartItem {...args} />
  </BrowserRouter>
);

export const Defaults = Template.bind({});
Defaults.args = {
  cartInfo: {
    image: MOCK_PRODUCT_LIST[0].image,
    name: MOCK_PRODUCT_LIST[0].name,
    price: MOCK_PRODUCT_LIST[0].price,
    quantity: 1,
  },
  initialChecked: false,
};
