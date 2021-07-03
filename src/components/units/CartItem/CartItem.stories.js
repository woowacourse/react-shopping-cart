import React from 'react';
import CartItem from './CartItem';
import defaultImageUrl from '../../../assets/images/default_product_item.png';

export default {
  title: 'units/CartItem',
  component: CartItem,
  parameters: { actions: { argTypesRegex: '^on.*' } },
};

const Template = (args) => <CartItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  cartItem: {
    cartId: 1,
    productId: 2,
    name: '맛있는 아쌈 밀크티',
    price: 10000,
    image: defaultImageUrl,
    quantity: 3,
    checked: true,
  },
};

export const NoImage = Template.bind({});
NoImage.args = {
  cartItem: {
    cartId: 1231234,
    productId: 123123,
    name: '맛있는 아쌈 밀크티',
    price: 10000,
    quantity: 3,
    checked: true,
  },
};
