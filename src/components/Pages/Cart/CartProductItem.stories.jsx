import React from 'react';
import CartProductItem from 'components/Pages/Cart/CartProductItem';

export default {
  title: 'components/Pages/Cart/CartProductItem',
  component: CartProductItem,
};

const Template = (args) => <CartProductItem {...args} />;

export const Default = Template.bind({});

Default.args = {
  productInfo: {
    id: 1,
    thumbnail:
      'https://stickershop.line-scdn.net/stickershop/v1/product/789/LINEStorePC/main.png;compress=true',
    name: '[라인] 샐리 인형',
    price: 10000,
    quantity: 3,
  },
};
