import React from 'react';
import CartItem from './CartItem';
import defaultImageUrl from '../../../assets/images/default_product_item.png';

export default {
  title: 'units/CartItem',
  component: CartItem,
};

const Template = (args) => <CartItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: '맛있는 아쌈 밀크티',
  price: 10000,
  imageUrl: defaultImageUrl,
  checked: true,
};

export const NoImage = Template.bind({});
NoImage.args = {
  title: '이미지가 없는 상품',
  price: 35000,
  checked: true,
};
