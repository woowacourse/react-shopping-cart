import React from 'react';
import CartProductItem from 'components/Cart/CartProductItem';

export default {
  title: 'components/CartProductItem',
  component: CartProductItem,
};

const Template = (args) => <CartProductItem {...args} />;

export const Default = Template.bind({});

Default.args = {
  thumbnail:
    'https://stickershop.line-scdn.net/stickershop/v1/product/789/LINEStorePC/main.png;compress=true',
  title: '[라인] 샐리 인형',
  price: 10000,
};
