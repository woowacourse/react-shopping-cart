import React from 'react';
import {BrowserRouter} from 'react-router-dom';

import CartItem from 'component/CartItem';
import {MOCK_PRODUCT_LIST} from 'mocks/mockData';

export default {
  component: CartItem,
  title: 'CartItem',
  argTypes: {
    id: {table: {disable: true}},
    handleDeleteIconClick: {action: 'click', table: {disable: true}},
    handleCheckedTrue: {action: 'click', table: {disable: true}},
    handleCheckedFalse: {action: 'click', table: {disable: true}},
    handleIncrease: {action: 'click', table: {disable: true}},
    handleDecrease: {action: 'click', table: {disable: true}},
  },
};

const Template = (args) => (
  <BrowserRouter>
    <CartItem {...args} />
  </BrowserRouter>
);

export const Defaults = Template.bind({});
Defaults.args = {
  itemImgURL: MOCK_PRODUCT_LIST[0].image,
  itemName: MOCK_PRODUCT_LIST[0].name,
  itemPrice: MOCK_PRODUCT_LIST[0].price,
  quantity: 1,
};
