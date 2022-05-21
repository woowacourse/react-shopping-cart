import React from 'react';

import CartProduct from 'templates/CartProduct';

export default {
  title: 'Template/CartProduct',
  component: CartProduct,
  argTypes: {
    imgSrc: { controls: 'text' },
    title: { controls: 'text' },
    price: { controls: 'number' },
  },
};

const Template = (args) => <CartProduct {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  imgSrc: process.env.PUBLIC_URL + '/img/fallback.png',
  title: '테스트 상품',
  price: 100000,
};
